export function fetchAuth(url, config){
    return new Promise((resolve, reject)=>{
        fetch(url, config).then(result=>{
            console.log(result)
            if(result.status ===  401 ){
                location.href = "/authentication/sign-in";
            }else{
                resolve(result);
            }
        }).catch(err=>{
            reject(err);
        })
    })
}