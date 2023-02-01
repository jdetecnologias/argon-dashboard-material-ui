import { logarUsuarioModel } from "../model/logarUsuarioModel";
import { isValidEmail} from "helper/validate";

export async function logarUsuario(dadosLogin, setLogin){
    const isvalidEmail = isValidEmail(dadosLogin.email);

    if(!isvalidEmail){
        setLogin(false,null, null);
        return false;
    }
    const result = await logarUsuarioModel(dadosLogin).catch(err => {
        setLogin(false,null, null);
    }  );

    setLogin(result.reason === "success",result.data.message.token,result.data.message.id_usuario);
}