import { fetchAuth } from "helper/fetchAuth";

export function GetGlycemiaAverage(email, interval, token) {
    return new Promise((resolve, reject)=>{
        const config = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
              }
        }

        const url = `http://localhost:8080/glycemia/avg?email=${email}&interval=${interval}`;

        fetchAuth(url,config).then(async response=>{
            const json = await response.json() ;
            resolve(json)
        }).catch(e=>{
            reject(e)
        })
    })
}


export function GetLastGlycemia(email) {
    return new Promise((resolve, reject)=>{
        const config = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
        }

        const url = `http://localhost:8080/glycemia/last/glicemia?email=${email}`;

        fetchAuth(url,config).then(async response=>{
            const json = await response.json() ;
            resolve(json)
        }).catch(e=>{
            reject(e)
        })
    })
}