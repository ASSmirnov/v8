import {Component} from "@angular/core";
import {MessageBox} from "../../services/services";
@Component({
  selector: "modal_test",
  template: `
  <vg-button-group>
        <vg-button (click)="onClick1($event)">Warning</vg-button>
        <vg-button (click)="onClick2($event)">Error</vg-button>
        <vg-button (click)="onClick3($event)">Confirm</vg-button>
  </vg-button-group>
`
})
export class View{

  constructor(private messageBox: MessageBox){}

  onClick1(event){
    event.stopPropagation();
    this.messageBox.warning("Тут явно что-то не так. А может и так", "Мы вас хотитм предупредить").then((num)=>{
      console.log(num);
    })
  }
  onClick2(event){
    event.stopPropagation();
    this.messageBox.error("Что-то пошло не так, обратитесь в техподдержку").then((num)=>{
      console.log(num);})
  }
  onClick3(event){
    event.stopPropagation();
    this.messageBox.confirm("Точно будем удалять все данные не далая бэкапы?", "Мы вас хотим спросить").then((num)=>{
      if(num === 0){
          this.messageBox.error("Не надо было нажимать ДА");
      }
    })
  }
}
