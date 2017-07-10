import {Component, ViewChild, OnInit} from "@angular/core";
import {TimeService} from "../../services/services";

@Component({
  selector: "fuel_speed_chart",
  template: `<vg-chart #chart
                       [title]="title"
                       [description]="''"
                       [dataFields]="dataFields"
                       [xtype]="xtype"
                       [xfield]="xfield"
                       [xinterval]="xinterval"
                       [selectorField]="selectorField"
                       >
             </vg-chart>
`
})
export class View implements OnInit{

  @ViewChild("chart") chart;

  title = "График топлива и скорости";
  static readonly api_url = 'api/fuel_speed_chart';
  dataFields = [{ name: 'date',  title: "Дата"},
                { name: 'fuel',  title: "Уровень топлива", interval: 1000},
                { name: 'speed', title: "Скрорость", interval: 50},
        ];
  xtype = "date";
  xfield = "date";
  xinterval = 10;
  selectorField = "fuel";

  getUrl(from, to){
    return `${View.api_url}?from=${from}&to=${to}`
  }

  constructor(private timeService: TimeService){
    this.timeService.controlChange.subscribe((event)=>{
        this.chart.url = this.getUrl(event.from, event.to);
        this.chart.refresh();
    })
  }

  ngOnInit(): void {
    let from = this.timeService.from;
    let to = this.timeService.to;
    this.chart.url = this.getUrl(from, to);
  }

}
