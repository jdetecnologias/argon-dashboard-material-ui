import { loginRedirect } from "./loginRedirect";

export function fetchAuth(url, config){
    return new Promise((resolve, reject)=>{
        fetch(url, config).then(result=>{
            if(result.status ===  401 ){
                loginRedirect();
            }else{
                resolve(result);
            }
        }).catch(err=>{
            reject(err);
        })
    })
}