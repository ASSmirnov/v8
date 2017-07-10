import {NgModule} from '@angular/core';
import {jqxTabsComponent} from "jqwidgets-framework/jqwidgets-ts/angular_jqxtabs"
import {jqxWindowComponent} from "jqwidgets-framework/jqwidgets-ts/angular_jqxwindow"
import {jqxButtonGroupComponent} from "jqwidgets-framework/jqwidgets-ts/angular_jqxbuttongroup"
import {jqxPopoverComponent} from "jqwidgets-framework/jqwidgets-ts/angular_jqxpopover"
import {TabContainer, Window, ButtonGroup, PopOver} from './containers';
import {BrowserModule} from '@angular/platform-browser';
import {ServicesModule} from "../../services/services.module";
import {ElementsModule} from "../elements/elements.module";

@NgModule({
  declarations: [
    TabContainer,
    Window,
    ButtonGroup,
    PopOver,
    jqxTabsComponent,
    jqxWindowComponent,
    jqxButtonGroupComponent,
    jqxPopoverComponent,
  ],
  imports: [BrowserModule, ServicesModule, ElementsModule],
  exports: [TabContainer, Window, ButtonGroup, PopOver],
})
export class ContainersModule { }
