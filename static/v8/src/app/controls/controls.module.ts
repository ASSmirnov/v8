import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ContainersModule } from "../components/containers/containers.module"
import { ElementsModule } from "../components/elements/elements.module"
import {VehiclesControl, TimeControl} from "./controls";
import {StructuresModule} from "../components/structures/structures.module";
import {FormsModule} from "@angular/forms";
import {PipesModule} from "../pipes/pipes.module";
import {ServicesModule} from "../services/services.module";

@NgModule({
  declarations: [
    VehiclesControl,
    TimeControl
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ContainersModule,
    StructuresModule,
    ElementsModule,
    PipesModule,
    ServicesModule
  ],
  exports: [
    VehiclesControl,
    TimeControl
  ]
})
export class ControlsModule { }
