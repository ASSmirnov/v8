/// <reference path='../../../../node_modules/jqwidgets-framework/jqwidgets-ts/jqwidgets.d.ts' />

import {jqxTabsComponent} from "jqwidgets-framework/jqwidgets-ts/angular_jqxtabs"
import {jqxWindowComponent} from "jqwidgets-framework/jqwidgets-ts/angular_jqxwindow"
import {ITabContainer} from "./interfaces"
import {
  ViewChild, Component, Input, AfterViewInit, Output, EventEmitter, OnInit, ViewContainerRef,
} from "@angular/core";
import {BaseVistComponent, BaseVistDataComponent} from "../base";
import {JqxDataAdapter} from "../../services/services";


declare var $;

@Component({
  selector: 'vg-tab-container',
  entryComponents: [jqxTabsComponent],
  template: `<jqxTabs #tabContainer [auto-create]='false'
                                    [height]="height" 
                                    [showCloseButtons]="showCloseButtons" 
                                    [theme]="theme"
                                    (onSelected)="onSelected($event)"
                                    (onRemoved)="onRemoved($event)">
               <ng-content></ng-content>
            </jqxTabs>`,
})
export class TabContainer extends BaseVistComponent implements ITabContainer, AfterViewInit{

  ngAfterViewInit(): void {
    this.tabsContainer.createComponent();
  }
  @ViewChild('tabContainer') tabsContainer: jqxTabsComponent;
  @Input() showCloseButtons = false;
  @Input() height;
  @Output() selected = new EventEmitter<number>();
  @Output() removed = new EventEmitter<number>();


  addTab(title: string, content = ""){
    this.tabsContainer.addLast(title, content)
  }

  removeTab(index: number){
    this.tabsContainer.removeAt(index);
  }

  onSelected(event){
    this.selected.emit(event.args.item);
  }

  onRemoved(event){
    this.removed.emit(event.args.item);
  }

}


@Component({
  selector: "vg-window",
  template: `<jqxWindow #window
             [autoOpen]="false"
             [width]="width"
             [height]="height"
             [resizable]="false"
             [theme]="theme"
             [showCollapseButton]="true"
             [isModal]="true"
             >
              <div [innerText]="title">
              </div>         
               <div>
                 <div>
                   <ng-content select="[body]"></ng-content>   
                 </div>
                 <div>
                    <ng-content select="[footer]"></ng-content>
                 </div>     
               </div>
</jqxWindow>`
})
export class Window extends BaseVistComponent{
  @Input() width: number;
  @Input() height: number;
  @Input() title: string;

  @ViewChild("window") window: jqxWindowComponent;

  open(){
    this.window.open();
  }

  close(){
    this.window.close();
  }
}

@Component({
  selector: "vg-button-group",
  template: "<jqxButtonGroup><ng-content></ng-content></jqxButtonGroup>"
})
export class ButtonGroup{
}


@Component({
  selector: "vg-popover",
  template: `
               <ng-content select="[button]"></ng-content>            
                  <jqxPopover #popover [auto-create]="false" 
                                       [isModal]="true" 
                                       (onClose)="onChildClose($event)" 
                                       (onOpen)="onChildOpen($event)">  
                    <div>
                        <ng-content select="[body]"></ng-content>
                    </div>
              </jqxPopover>
              `
})
export class PopOver extends BaseVistComponent implements AfterViewInit{

  constructor(private ref: ViewContainerRef){super()}

    @ViewChild("popover") popover;
    @ViewChild("button", {read: ViewContainerRef}) button;
    @Input() position;
    @Input() title;
    @Output() onOpen = new EventEmitter();
    @Output() onClose = new EventEmitter();

    open(){
      this.popover.open();
    }

    ngAfterViewInit(): void {
      let button_id = $(this.ref.element.nativeElement).find("button")[0].id;  // Sad but jqx needs ID of button-initiator
      this.popover.createComponent({
        title: this.title,
        selector: `#${button_id}`,
        showCloseButton: true,
        position: this.position,
        theme: this.theme
      });
    }

    onChildClose(event){
       event.stopPropagation();
       this.onClose.emit()
    }

    onChildOpen(event){
      event.stopPropagation();
      this.onOpen.emit()
    }
}


