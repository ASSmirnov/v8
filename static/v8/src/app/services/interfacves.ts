import {IMenuItem} from "../components/structures/interfaces";

export interface IMenuDataItem extends IMenuItem {
  module?: string,
  view?: string
}

export interface IMessage {
  title: string;
  message: string;
  buttons: string[];
  closeButton?: number;
  type?: string;
}

export interface IDataField {
  name: string,
  type?: string,
}

export interface IDataFields {
  [index: number]: IDataField
}

export interface IDataAdapterSettings {
  url: string;
  dataFields: IDataFields;
  filterFunc?: (data: any[]) => any[];
  cached?: boolean
}

export interface ILoadDataFunc {
  (serverdata, source, callback): void;
  data?: any[];
}

export interface ITimeControlEvent {
  from: Date;
  to: Date;
}
