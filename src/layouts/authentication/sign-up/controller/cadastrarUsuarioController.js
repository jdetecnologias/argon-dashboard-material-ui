import { cadastrarUsuarioModel } from "../model/cadastrarUsuarioModel";

export async function cadastrarUsuario(dadosUsuario, setStatusCadastro){
    const result = await cadastrarUsuarioModel(dadosUsuario).catch(err => {
        setStatusCadastro(false);
    }  );

    setStatusCadastro(result.reason === "success");
}