export function cadastrarUsuarioModel(dadosUsuario){
    return new Promise((resolve, reject)=>{
        const config = {
            method: 'POST',
            body: JSON.stringify(dadosUsuario),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
        }

        fetch('https://gluco-scan-api.herokuapp.com/user/insert',config).then(async response=>{
            const json = await response.json() ;
            resolve(json)
        }).catch(e=>{
            reject(e)
        })
    })
}