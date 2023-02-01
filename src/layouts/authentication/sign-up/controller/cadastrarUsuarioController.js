import { isValidPasswordLenght } from "helper/validate";
import { isValidEmail, isValidDate, isValidGenero } from "helper/validate";
import { cadastrarUsuarioModel } from "../model/cadastrarUsuarioModel";

export async function cadastrarUsuario(dadosUsuario, setStatusCadastro){
    const isvalidEmail = isValidEmail(dadosUsuario.email);
    const isvalidDate = isValidDate(dadosUsuario.dt_nasc);
    const isvalidGenero = isValidGenero(dadosUsuario.genero);
    const isvalidPassword = isValidPasswordLenght(dadosUsuario.senha);

    if(!isvalidPassword){
        setStatusCadastro(false);
        return false;
    }

    if(!isvalidEmail){
        setStatusCadastro(false);
        return false;
    }

    if(!isvalidDate){
        setStatusCadastro(false);
        return false;
    }

    if(!isvalidGenero){
        setStatusCadastro(false);
        return false;
    }
    
    const result = await cadastrarUsuarioModel(dadosUsuario).catch(err => {
        setStatusCadastro(false);
    }  );

    setStatusCadastro(result.reason === "success");
}