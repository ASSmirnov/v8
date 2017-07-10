import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ContainersModule } from "./components/containers/containers.module"
import { ElementsModule } from "./components/elements/elements.module"

import {AppComponent, StartPage, DynamicViewComponent, ViewPort, ControlsPort} from './app.component';
import {StructuresModule} from "./components/structures/structures.module";
import {ServicesModule} from "./services/services.module";
import {ViewsLoader} from "./views/views_loader";
import {ControlsModule} from "./controls/controls.module";

@NgModule({
  declarations: [
    AppComponent,
    StartPage,
    DynamicViewComponent,
    ViewPort,
    ControlsPort
  ],
  imports: [
    BrowserModule,
    ContainersModule,
    StructuresModule,
    ElementsModule,
    ServicesModule,
    ControlsModule
  ],
  providers: [ViewsLoader],
  bootstrap: [AppComponent]
})
export class AppModule { }
