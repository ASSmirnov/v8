import {IMenuDataItem} from "./services/interfacves";
class AppSingleton {

    private static _instance:AppSingleton = new AppSingleton();

    public readonly theme = "web";

    // public readonly CONTROL_COMPACT_WIDTH = 72;
    // public readonly CONTROL_COMPACT_HEIGHT = 72;

    private views: {[id:string]:IMenuDataItem} = {};

    // public themes = [
    //     {label: "Серая", id: "theme_web", type: "theme"},
    //     {label: "Синяя", id: "theme_darkblue", type: "theme"},
    //     {label: "Редмонд", id: "theme_ui-redmond", type: "theme"},
    //     {label: "Черная", id: "theme_black", type: "theme"},
    //     {label: "Белая", id: "theme_arctic", type: "theme"},
    //     {label: "Плоская", id: "theme_flat", type: "theme"},
    //     {label: "Яркая", id: "theme_summer", type: "theme"},
    //     {label: "Голубая", id: "theme_energyblue", type: "theme"},
    //     {label: "Метро", id: "theme_metro", type: "theme"},
    //     {label: "Лёд", id: "theme_glacier", type: "theme"},
    //     {label: "Светлая", id: "theme_light", type: "theme"},
    //   ];

    constructor() {
        if(AppSingleton._instance){
            throw new Error("Error: Instantiation failed: Use AppSingleton.getInstance() instead of new.");
        }
        AppSingleton._instance = this;
    }

    static getInstance():AppSingleton
    {
        return AppSingleton._instance;
    }

    addView(view: IMenuDataItem){
      this.views[view.id] = view;
    }

    getView(id: string): IMenuDataItem{
      return this.views[id]
    }
}

export const getAppSingleton = ()=>AppSingleton.getInstance();
