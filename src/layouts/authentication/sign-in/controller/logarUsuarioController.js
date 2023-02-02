import { logarUsuarioModel } from "../model/logarUsuarioModel";
import { isValidEmail} from "helper/validate";

export async function logarUsuario(dadosLogin, setLogin){
    const isvalidEmail = isValidEmail(dadosLogin.email);
    const messageErrorList = [];
    
    if(!isvalidEmail){ 
        messageErrorList.push("Email não é válido!");
        setLogin(false,null, null,messageErrorList);

        return false;
    }
    const result = await logarUsuarioModel(dadosLogin).catch(err => {
        messageErrorList.push(err.message);
        setLogin(false,null, null, messageErrorList);

    }  );

    const logou = result.reason === "success";

    if(!logou){
        messageErrorList.push("Email ou senha incorreto");
        setLogin(logou,null,null,messageErrorList);
    }else{
        setLogin(logou,result.data.message.token,result.data.message.id_usuario)
    }
}