export function fetchAuth(url, config){
    return new Promise((resolve, reject)=>{
        fetch(url, config).then(result=>{
            console.log(result)
            if(result.status ===  401 ){
                alert("autenticação expirada, o site será redirecionado para página de login!")
                location.href = "/authentication/sign-in";
            }else{
                resolve(result);
            }
        }).catch(err=>{
            reject(err);
        })
    })
}