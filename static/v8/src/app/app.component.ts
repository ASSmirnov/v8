import {Component, ViewChild, OnInit, AfterViewInit, ViewContainerRef, Input} from '@angular/core';
import {MenuService, MessageBox} from "./services/services";
import {Menu, MessageDialog} from "./components/structures/structures";
import {TabContainer} from "./components/containers/containers";
import {ViewsLoader} from "./views/views_loader";
import {getAppSingleton} from "./global";
import {IMenuDataItem} from "./services/interfacves";

@Component({
  selector: "vg-dynamic-view",
  template: "<div #container></div>"

})
export class DynamicViewComponent implements AfterViewInit{

  ngAfterViewInit(): void {
     if (this.componentFactory){
       this.container.createComponent(this.componentFactory)
     }
  }

   @ViewChild("container", {read: ViewContainerRef}) container;
   @Input() componentFactory;
}

@Component({
  selector: "vg-start-page",
  templateUrl: "./start_page.html",
  styles: [`:host>.container{             
              text-align: center;
}`]
})
export class StartPage{
}

interface IViewportItem{
    menuData: IMenuDataItem,
    factory: any,
    id: number
}

@Component({
  selector: "vg-viewport",
  template: `<vg-tab-container #tabContainer 
                               [height]="30" 
                               [showCloseButtons]="true"
                               (selected)="onTabSelect($event)"
                               (removed)="onTabRemoved($event)"
                               >
                <ul>
                   <li>VIST-ГРУПП Внедрение Информационных Систем и Технологий</li>
                </ul>
                <div></div>
             </vg-tab-container>
             <vg-start-page *ngIf="justStarted"></vg-start-page>
             <div class="container">
               <div *ngFor="let view of openViews">
                   <vg-dynamic-view [hidden]="view.id !== selectedView.id" [componentFactory]="view.factory"></vg-dynamic-view>
               </div>
             </div>
`,
  styles: [`:host /deep/ .container{padding-left: 40px}`]
})
export class ViewPort{

  @ViewChild("tabContainer") tabContainer: TabContainer;
  openViews: IViewportItem[] = [];
  private selectedView: IViewportItem = null;
  private justStarted = true;
  private viewsCounter = 0;

  constructor(private viewLoader: ViewsLoader){}

  addView(menuEntryId: string){

    let menuDataItem: IMenuDataItem = getAppSingleton().getView(menuEntryId);

     if (menuDataItem){
       this.viewLoader.getView(menuDataItem.module, menuDataItem.view).then(factory=>{
           if (this.justStarted) {
             this.tabContainer.removeTab(0);
           }
           let view = {menuData: menuDataItem, factory: factory, id: ++this.viewsCounter};
           this.openViews.push(view);
           this.selectedView = view;
           this.tabContainer.addTab(menuDataItem.label)
       })

     }
  }

  onTabSelect(index: number) {
    if (this.openViews[index].id !== this.selectedView.id ) {
      this.selectedView = this.openViews[index];
    }
  }

  onTabRemoved(index: number){
    if (this.justStarted){
      this.justStarted = false;
    } else {
      this.openViews.splice(index, 1);
    }
  }
}


@Component({
  selector: "vg-controls-port",
  template: `<div class="panel">
               <vg-control-vehicles></vg-control-vehicles><br>
               <vg-control-time></vg-control-time>
            </div>`,
  styles: [`:host .panel{
               position: fixed;
               left:0;
               top: 50vh;
               z-index: 10000;
           }`]
})
export class ControlsPort{

}



@Component({
  selector: 'app-root',
  templateUrl: "app.html",
})
export class AppComponent implements OnInit {

  @ViewChild("menu") menu: Menu;
  @ViewChild("viewport") viewPort: ViewPort;
  @ViewChild("modal") modal: MessageDialog;

  constructor(private menuService: MenuService,
              private messageBox: MessageBox){
    this.messageBox.broadcast.subscribe((message)=>this.showModal(message));
  }

  ngOnInit(): void {
      this.menu.source = [];
      this.menuService.getMenu()
                      .subscribe(menu=>this.initializeMenu(menu),
                                 error=>console.error("ERR", error)
      );
  }

  initializeMenu(menu: IMenuDataItem[]){

      let menu_id_counter = 0;
      let menuParse =(menuEntry: IMenuDataItem)=>{
          menuEntry.id = `menu_item_${++menu_id_counter}`;
          if (menuEntry.items){
            for(let item of menuEntry.items){
              menuParse(item);
            }
          } else {
              getAppSingleton().addView(menuEntry);
          }
      };
      for (let menuItem of menu){
        menuParse(menuItem);
      }
      this.menu.source = menu;
      this.menu.source.splice(0, 0, {label: "<div>LABEL HERE</div>", id: "0", disabled: true});
  }


  showModal(message){
    this.modal.message = message.message;
    this.modal.title = message.title;
    this.modal.buttons = message.buttons;
    this.modal.type = message.type;
    this.modal.open();
  }

  onModalClose(result: number){
    this.messageBox.skip(result);
  }

  onMenuItemSelect(menuEntryId: string){
     this.viewPort.addView(menuEntryId);
  }

}
