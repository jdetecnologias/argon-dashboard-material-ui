import { logarUsuarioModel } from "../model/logarUsuarioModel";

export async function logarUsuario(dadosLogin, setLogin){
    const result = await logarUsuarioModel(dadosLogin).catch(err => {
        setLogin(false,null, null);
    }  );

    setLogin(result.reason === "success",result.data.message.token,result.data.message.id_usuario);
}