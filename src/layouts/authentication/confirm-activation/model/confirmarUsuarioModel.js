export function confirmarUsuarioModel(dadosCodigoConfirmar) {
    return new Promise((resolve, reject)=>{
        const config = {
            method: 'POST',
            body: JSON.stringify(dadosCodigoConfirmar),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
        }

        fetch('https://gluco-scan-api.herokuapp.com/user/confirm_activation_code',config).then(async response=>{
            const json = await response.json() ;
            resolve(json)
        }).catch(e=>{
            reject(e)
        })
    })
}