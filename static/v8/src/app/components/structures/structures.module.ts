import {jqxMenuComponent} from "jqwidgets-framework/jqwidgets-ts/angular_jqxmenu"
import {jqxChartComponent} from "jqwidgets-framework/jqwidgets-ts/angular_jqxchart"
import {jqxGridComponent} from "jqwidgets-framework/jqwidgets-ts/angular_jqxgrid"
import {jqxListBoxComponent} from "jqwidgets-framework/jqwidgets-ts/angular_jqxlistbox"
import {jqxDateTimeInputComponent} from "jqwidgets-framework/jqwidgets-ts/angular_jqxdatetimeinput"
import {Menu, Chart, MessageDialog, Grid, List, DateTime} from "./structures";
import {ServicesModule} from "../../services/services.module";
import {ContainersModule} from "../containers/containers.module";
import {ElementsModule} from "../elements/elements.module";
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    Menu,
    Chart,
    List,
    MessageDialog,
    Grid,
    DateTime,
    jqxMenuComponent,
    jqxChartComponent,
    jqxGridComponent,
    jqxListBoxComponent,
    jqxDateTimeInputComponent
  ],
  imports: [BrowserModule, FormsModule, ServicesModule, ContainersModule, ElementsModule],
  exports: [Menu, Chart, MessageDialog, Grid, List, DateTime]
})
export class StructuresModule { }
