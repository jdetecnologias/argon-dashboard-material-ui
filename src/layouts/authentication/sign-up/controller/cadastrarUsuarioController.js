import { isValidPasswordLenght } from "helper/validate";
import { isValidEmail, isValidDate, isValidGenero } from "helper/validate";
import { cadastrarUsuarioModel } from "../model/cadastrarUsuarioModel";

export async function cadastrarUsuario(dadosUsuario, setStatusCadastro){
    const isvalidEmail = isValidEmail(dadosUsuario.email);
    const isvalidDate = isValidDate(dadosUsuario.dt_nasc);
    const isvalidGenero = isValidGenero(dadosUsuario.genero);
    const isvalidPassword = isValidPasswordLenght(dadosUsuario.senha);
    const messageErrorList = [];

    if(!isvalidPassword) messageErrorList.push("Senha não está correta, o mínimo são 6 caracteres!");
    if(!isvalidEmail) messageErrorList.push("Email inválido!");
    if(!isvalidDate) messageErrorList.push("Data não é válida!");
    if(!isvalidGenero) messageErrorList.push("Favor selecionar o gênero!");

    if(messageErrorList.length > 0){
        setStatusCadastro(false, messageErrorList);
        return false;
    }
    
    const result = await cadastrarUsuarioModel(dadosUsuario).catch(err => {
        messageErrorList.push(err.message);
        setStatusCadastro(false,messageErrorList);
    }  );

    const statusCadastro = result.reason === "success"

    if(!statusCadastro){
        if(result.errors && result.errors.length > 0){
            result.errors.forEach(element => {
                messageErrorList.push(element.message);
            });
        }else{
            messageErrorList.push("Erro ao tentar cadastrar o usuário no sistema, favor verificar se a conta já existe!");
        }

    }

    setStatusCadastro(statusCadastro,messageErrorList);
}