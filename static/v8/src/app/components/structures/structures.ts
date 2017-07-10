/// <reference path='../../../../node_modules/jqwidgets-framework/jqwidgets-ts/jqwidgets.d.ts' />

import {
  Component, ViewChild, Input, EventEmitter, Output, OnInit
} from "@angular/core";
import {IMenu, IMenuItem} from "./interfaces";
import {BaseVistComponent, BaseVistDataComponent} from "../base";
import {JqxDataAdapter} from "../../services/services";

declare var $;

@Component({
  selector: "vg-menu",
  template: `<jqxMenu  [source]='source' 
                       [mode]="horizontal" 
                       (onItemclick)='onItemClick($event)' 
                       [theme]="theme"></jqxMenu>`
})
export class Menu extends BaseVistComponent implements IMenu{

  @Input() source: IMenuItem[];
  @Output() selectItem = new EventEmitter<string>();

  onItemClick(event){
    this.selectItem.emit(event.args.id);
  }
}


@Component({
  selector: "vg-chart",
  template: `<jqxChart #chart
                       [padding]="padding" 
                       [titlePadding]="titlePadding"
                       [source]="dataAdapter"
                       [xAxis]="xAxis"
                       [seriesGroups]="seriesGroups"
                       [valueAxis]="valueAxis"
                       [width]="1200" 
                       [height]="800"
                       [colorScheme]="'scheme02'"
                       [title]="title"
                       [description]="description"
                       [showLegend]="true" 
                       [enableAnimations]="true"
                       ></jqxChart>`
})
export class Chart extends BaseVistDataComponent implements OnInit {

  constructor(private adapter: JqxDataAdapter){super()}

  @Input() dataFields: {name: string, title: string, interval?: string}[];
  @Input() url: string;
  @Input() xtype: string;
  @Input() xfield: string;
  @Input() xinterval: number;
  @Input() selectorField: string;
  @Input() multiX = true;
  @Input() title;
  @Input() description;

  @ViewChild("chart") chart;

  padding: any = {left: 10, top: 5, right: 10, bottom: 5};
  titlePadding: any = {left: 50, top: 0, right: 0, bottom: 10};
  dataAdapter: any;
  xAxis: any;
  seriesGroups: any[];
  valueAxis: any;

  private setDataASdapter(){
    this.dataAdapter = this.adapter.build({url: this.url, dataFields: this.dataFields});
  }

  ngOnInit(): void {

    this.setDataASdapter();

    this.xAxis =
      {
        dataField: this.xfield,
        type: this.xtype,
        baseUnit: 'minute',
        valuesOnTicks: true,
        tickMarks: {
          visible: true,
          interval: 1,
          color: '#BCBCBC'
        },
        unitInterval: this.xinterval,
        gridLines: {
          visible: true,
          interval: 3,
          color: '#BCBCBC'
        },
        labels: {
          angle: -45,
          rotationPoint: 'topright',
          offset: {x: 0, y: -25}
        },
        rangeSelector: {
          size: 80,
          padding: {/*left: 0, right: 0,*/top: 0, bottom: 0},
          backgroundColor: 'white',
          dataField: this.selectorField,
          baseUnit: 'minute',
          gridLines: {visible: false},
          serieType: 'area',
        }
      };

    if (this.multiX) {
      let seriesGroups = [];
      for (let field of this.dataFields) {
        if (field.name === this.xfield) continue;
        let group = {
          type: 'line',
          valueAxis: {
            unitInterval: field.interval,
            padding: {left: 10},
            title: {text: field.title},
            gridLines: {visible: false}
          },
          series: [
            {dataField: field.name, displayText: field.title}
          ]
        };
        seriesGroups.push(group)
      }
      this.seriesGroups = seriesGroups;

    } else {

      this.valueAxis =
        {
          visible: true,
          title: {text: "Значение"},
          tickMarks: {color: '#BCBCBC'}
        };

      let series = [];
      for (let field of this.dataFields) {
        if (field.name !== this.xfield) {
          series.push({dataField: field.name, displayText: field.title})
        }
      }

      this.seriesGroups =
        [
          {
            type: 'line',
            series: series
          }
        ];

    }
  }

  refresh(){
    this.setDataASdapter();
    this.chart.refresh();
  }
}


@Component({
  selector: "vg-message-dialog",
  template: `<vg-window #window [width]="200" [height]="200" [title]="title">   
               <div body>
                     <div class="background-image" [ngClass]="type"></div> 
                     <div [innerHTML]="message"></div>
               </div>
               <div footer>
                   <vg-button-group>
                        <vg-button *ngFor="let button of buttons; let i=index" (click)="onClick($event, i)">{{button}}</vg-button>
                   </vg-button-group>
               </div>
             </vg-window>`,
  styleUrls: ["./modals.css"]
})
export class MessageDialog{
  @Input() title:   string;
  @Input() message: string;
  @Input() buttons: string[];
  @Input() type: string;
  @Output() onClose = new EventEmitter();

  @ViewChild("window") window;

  open(){
    this.window.open();
  }

  close(index: number){
    this.window.close();
    this.onClose.emit(index);
  }

  onClick(event, index: number){
    event.stopPropagation();
    this.close(index);
  }
}


@Component({
  selector: "vg-grid",
  template: `<jqxGrid [width]='1000'
                      [source]="dataAdapter"
                      [columns]="columns"
                      [pageable]="true" 
                      [autoheight]="true" 
                      [sortable]="true"
                      [altrows]="true"
                      [enabletooltips]="true"
                      [selectionmode]="'multiplecellsadvanced'">
</jqxGrid>`
})
export class Grid extends BaseVistDataComponent implements OnInit{

  constructor(private adapter: JqxDataAdapter){super()}

  @Input() url: string;
  @Input() dataFields;
  @Input() columns: {text: string, datafield: string, width?: number}[];

  dataAdapter: any;

  ngOnInit(): void {
    this.dataAdapter = this.adapter.build({url: this.url, dataFields: this.dataFields, cached: this.cached});
  }

}


@Component({
  selector: "vg-list",
  template: `<jqxListBox #list
                          [source]="dataAdapter"
                          [checkboxes]="checkboxes"
                          [width]="width"
                          [multiple]="multi"
                          [height]="height"
                          [displayMember]="displayField"
                          [valueMember]="valueFiled"
                          (onCheckChange)="checkChange($event)"
                          >
            </jqxListBox>`

})
export class List extends BaseVistDataComponent implements OnInit{

 @Input() width: number;
 @Input() height: number;
 @Input() checkboxes = true;
 @Input() multi = true;
 @Input() url: string;
 @Input() dataFields: {name: string}[];
 @Input() displayField;
 @Input() valueFiled;
 @Input() filter;
 @ViewChild("list") listbox;
 @Output() onCheckChange = new EventEmitter();

 dataAdapter: any;

 constructor(private adapter: JqxDataAdapter){super()}

 ngOnInit(): void {
    this.dataAdapter = this.adapter.build({url: this.url,
                                           dataFields: this.dataFields,
                                           filterFunc: this.filter,
                                           cached: this.cached});
 }

 select(index: number){
   this.listbox.checkIndex(index)
 }

 unSelect(index: number){
   this.listbox.uncheckIndex(index)
 }

 selectAll(){
   this.listbox.checkAll()
 }

 unSelectAll(){
   this.listbox.uncheckAll()
 }

 refresh(){
   this.listbox.refresh();
 }

 getSelected(){
   return this.listbox.getCheckedItems().map((e)=>{return e.originalItem})
 }

 get records(){
   return this.dataAdapter.records;
 }

 private checkChange(event){
   // TODO send selected object?
   this.onCheckChange.emit({index: event.args.item.index, checked: event.args.checked})
 }

}


@Component({
  selector: "vg-datetime",
  template: `<jqxDateTimeInput [width]="width" 
                               [height]="height" 
                               [showTimeButton]="showTime" 
                               [showCalendarButton]="showDate"
                               [formatString]="'dd.MM.yyyy HH:mm'"
                               [(ngModel)]='time'></jqxDateTimeInput>`
})
export class DateTime implements OnInit{
  @Input()  width;
  @Input()  height;
  @Input()  showTime = true;
  @Input()  showDate = true;
  @Output() timeChange = new EventEmitter();

  private value: any;

  @Input()
  get time(){
    return this.value
  };

  set time(val){
    this.value = val;
    this.timeChange.emit(val);
  }

  ngOnInit(): void {
    if (typeof(this.value) === "undefined"){
      this.time = new Date();
    }
  }
}
