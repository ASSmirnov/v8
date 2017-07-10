import {Component, ViewChild, ViewContainerRef} from "@angular/core";
import {BaseVistControl} from "../components/base";
import {TimeService} from "../services/services";


@Component({
  selector: "vg-control-vehicles",
  template: `<vg-popover #popover [title]="'Мобильные объекты'" [position]="'right'">
                 <vg-button button>
                    <div>
                      <div class="background-image vehicles-button"></div>
                      <div class="compact-content">
                          {{selectedCount}} из {{totalCount}}
                      </div>
                    </div>
                 </vg-button>
                 <div body class="vehicles-body">
                    <div class="vehicles-left-panel">
                        Самосвалы   <vg-switch #trucksSwitch [checked]="true" (onCheckChanged)="refresh()"></vg-switch><br>
                        Экскаваторы <vg-switch #shovsSwitch  [checked]="true" (onCheckChanged)="refresh()"></vg-switch><br>
                        Бульдозеры  <vg-switch #dosersSwitch [checked]="true" (onCheckChanged)="refresh()"></vg-switch><br>
                        Заправщики  <vg-switch #refuellersSwitch [checked]="true" (onCheckChanged)="refresh()"></vg-switch><br>
                        Бурстанки   <vg-switch #drillsSwitch [checked]="true" (onCheckChanged)="refresh()"></vg-switch><br>
                    </div>
                    <div>
                       <div class="form-group">
                               <label>Все</label>
                               <vg-checkbox [checked]="selectAll" (change)="onSelectAll($event)"></vg-checkbox>
                       </div><br>
                       <vg-list #vehiclesList 
                                [url]="url" 
                                [dataFields]="dataFields"
                                [displayField]="displayField"
                                [valueFiled]="valueField"
                                [height]="350"
                                [width]="250"
                                [filter]="filterVehicles"
                                (onCheckChange) = "listCheckChange($event)"
                                [cached]="true"
                                >
                       </vg-list>
                    </div>
                 </div>
             </vg-popover>
`,
  styleUrls: ["./controls.css"],
})
export class VehiclesControl extends BaseVistControl{
  @ViewChild('popover') popover;
  @ViewChild('vehiclesList') vehiclesList;
  @ViewChild('trucksSwitch') trucksSwitch;
  @ViewChild('shovsSwitch') shovsSwitch;
  @ViewChild('dosersSwitch') dosersSwitch;
  @ViewChild('refuellersSwitch') refuellersSwitch;
  @ViewChild('drillsSwitch') drillsSwitch;

  url = "api/vehicles";
  dataFields = [{name: "name"},
                {name: "id"},
                {name: "kind"}
  ];
  displayField = "name";
  valueField = "id";
  selectAll = false;
  selectedCount = 0;
  totalCount = 0;

  onSelectAll(event){
    if (event){
      this.vehiclesList.selectAll();
    } else {
      this.vehiclesList.unSelectAll();
    }

  }

  filterVehicles = (vehicles)=>{
    let res = [];
    let totalCount = 0;
    vehicles.forEach((v)=>{
      totalCount++;
      if ((v.kind === "truck" && this.trucksSwitch.isChecked)
        || (v.kind === "shov" && this.shovsSwitch.isChecked)
        || (v.kind === "dozer" && this.dosersSwitch.isChecked)
        || (v.kind === "refueller" && this.refuellersSwitch.isChecked)
        || (v.kind === "drill" && this.drillsSwitch.isChecked)){
        res.push(v);
      }
    });
    this.totalCount = totalCount;
    return res
  };

  refresh(){
    this.selectedCount = 0;
    this.vehiclesList.refresh();
    let selectedCount = 0;
    for(let i in this.vehiclesList.records){
      if(this.vehiclesList.records[i].checked){
        selectedCount++;
      }
    }
    this.selectedCount = selectedCount;
  }

  listCheckChange(event){
    if (event.checked){
      this.vehiclesList.records[event.index].checked = true;
      this.selectedCount++;
    } else {
      this.vehiclesList.records[event.index].checked = false;
      this.selectedCount--;
    }
  }
}


@Component({
  selector: "vg-control-time",
  template: `<vg-popover #popover 
                         [title]="'Время действия'" 
                         [position]="'right'" 
                         (onOpen)="onOpen()" 
                         (onClose)="onClose()">
                 <vg-button button>
                    <div>
                      <div class="background-image times-button"></div>
                      <div class="compact-content">
                          {{from}}<br>{{to}}
                      </div>
                    </div>
                 </vg-button>
                 <div body class="times-body">
                   C:  <vg-datetime [(time)]="from"></vg-datetime><br>
                   По: <vg-datetime [(time)]="to"></vg-datetime>
                 </div>
             </vg-popover>
`,
  styleUrls: ["./controls.css"],
})
export class TimeControl extends BaseVistControl{
  constructor(private timeService: TimeService){
    super();
    timeService.control = this;
  }
  from: Date;
  to:   Date ;

  onOpenFrom: Date;
  onOpenTo: Date;
  onOpen(){
    this.onOpenFrom = this.from;
    this.onOpenTo = this.to;
  }

  onClose(){

    if ((this.onOpenFrom !== this.from) || (this.onOpenTo !== this.to)){
      this.timeService.change({from: this.from, to: this.to})
    }
  }
}



