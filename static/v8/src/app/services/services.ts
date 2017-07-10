import {Injectable, EventEmitter} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {IMenuDataItem, IMessage, IDataAdapterSettings, ILoadDataFunc, ITimeControlEvent} from "./interfacves";


@Injectable()
export class MenuService {

   url = "api/menu/";

   constructor (private http: Http) {}

   getMenu(): Observable<IMenuDataItem[]>{
     return this.http.get(this.url)
                     .map(this.extractData)
                     .catch(this.handleError);
   }

   private extractData(res: Response){
      let body = res.json();
      return body || [];
   }

   private handleError (error: Response | any) {
      let errMsg = `[${error.url}]: ${error.status} - ${error.statusText || ''}`;
      return Observable.throw(errMsg);
  }

}


class MessageResult{

  constructor(public message: IMessage){}

  private callback = (res)=>{};

  then(func){
    this.callback = func;
  }

  call(res: number){
    this.callback(res)
  }
}


@Injectable()
export class MessageBox {

   public broadcast = new EventEmitter<IMessage>();
   private messagesQueue: MessageResult[] = [];
   private ready = true;

   static OK = "OK";
   static YES = "Да";
   static NO = "Нет";

   public warning(text, title="Внимание"){
     return this.show(text, title, [MessageBox.OK], "warning")
   }

   public error(text, title="Ошибка"){
     return this.show(text, title, [MessageBox.OK], "error")
   }

   public confirm(text, title="Уверены?"){
     return this.show(text, title, [MessageBox.YES, MessageBox.NO], "question")
   }

   public show(text: string, title: string, buttons: string[], type?: string){
     let message = {message: text, title: title, buttons: buttons, type: type};
     let result = new MessageResult(message);
     this.messagesQueue.push(result);
     if (this.ready) {
       this.process()
     }
     return result;
   }

   private process(){
     this.ready = false;
     this.broadcast.emit(this.messagesQueue[0].message);
   }

   public skip(result: number){
     let mess = this.messagesQueue.shift();
     mess.call(result);
     this.ready = true;
     if (this.messagesQueue.length > 0){
       this.process();
     }
   }
}



@Injectable()
export class JqxDataAdapter{

  constructor (private http: Http) {}

  build(settings: IDataAdapterSettings){
     let source = {
        datatype: "json",
        datafields: settings.dataFields,
        url: settings.url
     };

     let http = this.http;
     let loadDataFunc: ILoadDataFunc;


     loadDataFunc = function(serverdata, source, callback){

       let self = this;

       if (settings.cached && typeof(self.data) !== 'undefined'){
         let data: any[];
         if (settings.filterFunc){
           data = settings.filterFunc(self.data);
           callback({records: data});
         } else {
           callback({records: self.data});
         }
         return
       }

       if(typeof(self.data) === 'undefined'){
         self.data = [];
       }

       http.get(settings.url).subscribe((res:Response) => {
          let data = JSON.parse(res.text());
          if (settings.cached){
            self.data = data;
          }
          if (settings.filterFunc){
              data = settings.filterFunc(data);
            }
            callback({records: data});

        });
     };

     return new $.jqx.dataAdapter(source, {loadServerData: loadDataFunc, async: false, autoBind: true});
  }
}

@Injectable()
export class TimeService{
  control: any;
  controlChange = new EventEmitter<ITimeControlEvent>();

  get from(){
    return this.control.from;
  }

  get to(){
    return this.control.to;
  }

  change(event: ITimeControlEvent){
    this.controlChange.emit(event);
  }
}
