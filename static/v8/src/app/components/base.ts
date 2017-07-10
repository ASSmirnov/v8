import {getAppSingleton} from "../global";
import {Input} from "@angular/core";


export class BaseVistComponent {
  theme: string = getAppSingleton().theme;
}

export class BaseVistDataComponent{
  @Input() cached = false;
}

export class BaseVistControl {
  // compactWidth = getAppSingleton().CONTROL_COMPACT_WIDTH;
  // compactHeight = getAppSingleton().CONTROL_COMPACT_HEIGHT;
}


