declare var require;

export function getView(name){
  //noinspection TypeScriptUnresolvedFunction
  return new Promise((resolve, reject)=>{
    let callback = (module)=>resolve(module.View);
    let views = {
        "fuel_report":      ()=> require(["./fuel_report"], callback),
        "fuel_speed_chart": ()=> require(["./fuel_speed_chart"], callback),
        "modal_test":       ()=> require(["./modal_test"], callback)
      };
    let func = views[name];
    if (func){
        func()
    } else {
        reject(404)
    }
  })
}
