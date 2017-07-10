declare var require;


export function getView(name){
  //noinspection TypeScriptUnresolvedFunction
  return new Promise((resolve, reject)=>{
    let callback = (module)=>resolve(module.View);
    let views = {
        "404":      ()=> require(["./404"], callback),
        "500":      ()=> require(["./500"], callback)
    };
    let func = views[name];
    if (func){
        func()
    } else {
        reject(404)
    }
  })
}
