import { fetchAuth } from "helper/fetchAuth";

export function GetLastAppData(userEmail) {
    return new Promise((resolve, reject)=>{
        const config = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                          }
        }
        const url = `https://gluco-scan-api.herokuapp.com/mobileApp/get/last/${userEmail}`;


        fetchAuth(url,config).then(async response=>{
            const json = await response.json() ;
            resolve(json)
        }).catch(e=>{
            reject(e)
        })
    })
}


export function getFilteredByAdmin(dadosUsuario) {
    return new Promise((resolve, reject)=>{
        const config = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
        }

        const listkeys = Object.keys(dadosUsuario);

        const listQueryParams = listkeys.map(key=>{
            return `${key}=${dadosUsuario[key]}`;
        })

        const queryParams = listQueryParams.join('&');

        fetchAuth('https://gluco-scan-api.herokuapp.com/admin/glycemia/get_filtered?'+queryParams,config).then(async response=>{
            const json = await response.json() ;
            resolve(json)
        }).catch(e=>{
            reject(e)
        })
    })
}