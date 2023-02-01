import { getCookie, setCookie } from "./cookies";

export function hasValidDadosLogin(){
    let dadoslogin = getCookie("dadosLogin");
      
    if(dadoslogin === ""){
        return false;
    }
       
    try{
        dadoslogin = JSON.parse(dadoslogin);
    }catch(e){
        return false;
    }
      
    return dadoslogin.token !== undefined;

}

export function cleanDadosLogin(){
    setCookie("dadosLogin", "");
}