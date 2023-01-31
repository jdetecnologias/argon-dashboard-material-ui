export function getFiltered(dadosUsuario, token) {
    return new Promise((resolve, reject)=>{
        const config = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
              }
        }

        console.log(config)

        const listkeys = Object.keys(dadosUsuario);

        const listQueryParams = listkeys.map(key=>{
            return `${key}=${dadosUsuario[key]}`;
        })

        const queryParams = listQueryParams.join('&');
        console.log(queryParams)
        fetch('http://localhost:8080/glycemia/get_filtered?'+queryParams,config).then(async response=>{
            const json = await response.json() ;
            resolve(json)
        }).catch(e=>{
            console.log(e);
            reject(e)
        })
    })
}