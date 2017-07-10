import {NgModule} from "@angular/core";
import {HttpModule} from "@angular/http";
import {DateFormat} from "./filters"

@NgModule({
    declarations: [DateFormat],
    imports: [HttpModule],
    exports: [DateFormat]
  }
)
export class PipesModule{}
