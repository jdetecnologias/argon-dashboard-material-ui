export function logarUsuarioModel(dadosLoginUser) {
    return new Promise((resolve, reject)=>{
        const config = {
            method: 'POST',
            body: JSON.stringify(dadosLoginUser),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
        }

        fetch('https://gluco-scan-api.herokuapp.com/user/login',config).then(async response=>{
            const json = await response.json() ;
            resolve(json)
        }).catch(e=>{
            reject(e)
        })
    })
}