import {EventEmitter} from "@angular/core";
export interface IMenuItem {
  label:     string,
  id:        string,
  type?:     string,
  disabled?: boolean
  items?:    IMenuItem[]
}


export interface IMenu {
  source: IMenuItem[],
  selectItem: EventEmitter<string>
}
