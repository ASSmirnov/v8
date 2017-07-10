import {Component} from "@angular/core";

@Component({
  selector: "fuel_speed_report",
  template: "<vg-grid [dataFields]='dataFields' [columns]='columns' [url]='url'></vg-grid>",
})
export class View {
  dataFields = [{name: "fuel1", type: "float"},
                {name: "fuel2", type: "float"},
                {name: "fuel3", type: "float"},
                {name: "fuel4", type: "float"},
                {name: "speed", type: "int"},
                {name: "driver", type: "string"},
                {name: "date", type: "date"},
  ];
  columns = [{ text: 'Уровень топлива в баке 1', datafield: 'fuel1', width: 130},
             { text: 'Уровень топлива в баке 2', datafield: 'fuel2', width: 130},
             { text: 'Уровень топлива в баке 3', datafield: 'fuel3', width: 130},
             { text: 'Уровень топлива в баке 4', datafield: 'fuel4', width: 130},
             { text: 'Скорость', datafield: 'speed', width: 130},
             { text: 'Водитель', datafield: 'driver', width: 250},
             { text: 'Дата', datafield: 'date', width: 150},

  ];

  url = 'api/fuel_speed_report'
}
