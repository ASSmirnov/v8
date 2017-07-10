import {NgModule} from "@angular/core";
import {MenuService, MessageBox, JqxDataAdapter, TimeService} from "./services";
import {HttpModule} from "@angular/http";

@NgModule({
    imports: [HttpModule],
    providers: [MenuService, MessageBox, JqxDataAdapter, TimeService]
  }
)
export class ServicesModule{}
