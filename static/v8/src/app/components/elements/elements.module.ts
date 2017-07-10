import { NgModule } from '@angular/core';
import {jqxButtonComponent} from "jqwidgets-framework/jqwidgets-ts/angular_jqxbuttons"
import {jqxSwitchButtonComponent} from "jqwidgets-framework/jqwidgets-ts/angular_jqxswitchbutton"
import {jqxCheckBoxComponent} from "jqwidgets-framework/jqwidgets-ts/angular_jqxcheckbox"
import {Button, Switch, CheckBox} from './elements';
import { BrowserModule } from '@angular/platform-browser';
import {ServicesModule} from "../../services/services.module";

@NgModule({
  declarations: [
    Button,
    Switch,
    CheckBox,
    jqxButtonComponent,
    jqxSwitchButtonComponent,
    jqxCheckBoxComponent
  ],
  imports: [BrowserModule, ServicesModule],
  exports: [Button, Switch, CheckBox],
  providers: [],
})
export class ElementsModule { }
