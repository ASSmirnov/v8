import {
  Injectable, NgModule, Compiler, ComponentFactory
} from '@angular/core';
import {getView as core_get_view} from "./core/core.module"
import {getView as common_get_view} from "./common/common.module"
import {ElementsModule} from "../components/elements/elements.module";
import {StructuresModule} from "../components/structures/structures.module";
import {ContainersModule} from "../components/containers/containers.module";
import {ServicesModule} from "../services/services.module";

@Injectable()
export class ViewsLoader {

    constructor(private _compiler: Compiler){}


    viewFunctions = {
      "core": core_get_view,
      "common": common_get_view
    };

    private componentFactories = {};

    private getKey(module: string, name: string): string{
      return `${module}:${name}`
    }

    getView(module_name: string, name: string){

      //noinspection TypeScriptUnresolvedFunction
      return new Promise<ComponentFactory<any>>((resolve, reject)=>{

          let key = this.getKey(module_name, name);
          let factory: ComponentFactory<any>  = this.componentFactories[key];

          if (typeof(factory) !== 'undefined'){

              resolve(factory);

          } else {
             let viewFunction = this.viewFunctions[module_name];
             let promise;
             if (viewFunction) {
               promise = viewFunction(name);
             } else {
               promise = this.viewFunctions["common"]("404")
             }

             promise.then(view_class=>{

               @NgModule({ imports: [ElementsModule, StructuresModule, ContainersModule, ServicesModule], declarations: [view_class] })
               class DynamicModule {}

               let module = this._compiler.compileModuleAndAllComponentsSync(DynamicModule);
               //noinspection TypeScriptUnresolvedFunction
               let factory: ComponentFactory<any> = module.componentFactories.find(f => f.componentType === view_class);
               this.componentFactories[key] = factory;
               resolve(factory);

             });
          }
        });
    }
}
