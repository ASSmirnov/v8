import {Component} from "@angular/core";

@Component({
  selector: "error_404",
  template: "<h1>404</h1>",
  styles: [`:host h1 {
              font-size: 800%;
}`]
})
export class View {}
