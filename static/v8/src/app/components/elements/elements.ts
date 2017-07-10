/// <reference path='../../../../node_modules/jqwidgets-framework/jqwidgets-ts/jqwidgets.d.ts' />
import {jqxButtonComponent} from "jqwidgets-framework/jqwidgets-ts/angular_jqxbuttons"
import {Component, Output, EventEmitter, Input, ViewChild} from "@angular/core";
import {BaseVistComponent} from "../base";


@Component({
  selector: 'vg-button',
  entryComponents: [jqxButtonComponent],
  template: `
    <jqxButton [theme]="theme" 
               [width]="width" 
               [height]="height" 
               (onClick)="onClick($event)"><ng-content></ng-content></jqxButton>
  `,
})
export class Button extends BaseVistComponent {
  @Input() width;
  @Input() height;
  @Output() click = new EventEmitter();

  onClick(event){
    event.stopPropagation();
    this.click.emit(event);
  }
}



@Component({
  selector: "vg-switch",
  template: `<jqxSwitchButton #switch (onChecked)="onChecked()" 
                                      (onUnchecked)="onUnChecked()"
                                      [checked]="checked">
</jqxSwitchButton>`

})
export class Switch{
                              //   [onLabel]="'Вкл'"
                              // [offLabel]="offLabel"
  offLabel = "<span style='color: #ff0000'>Выкл</span>";  // Bad way, but jqx doesn't allow to use angular styles here

  @Input()  checked   = false;
  @Output() onCheckChanged   = new EventEmitter();
  @ViewChild("switch") switch;

  get isChecked(): boolean{
    return this.switch.checked();
  }

  onChecked(){
    this.onCheckChanged.emit(true)
  }

  onUnChecked(){
    this.onCheckChanged.emit(false)
  }

}

@Component({
  selector: "vg-checkbox",
  template: `<jqxCheckBox [checked]="checked" 
                          (onChecked)="onChange(true)" 
                          (onUnchecked)="onChange(false)"></jqxCheckBox>`
})
export class CheckBox{
  @Input()  checked;
  @Output() change = new EventEmitter();

  onChange(event){
    this.change.emit(event);
  }
}
