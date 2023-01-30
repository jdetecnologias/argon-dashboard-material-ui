import { confirmarUsuarioModel } from "../model/confirmarUsuarioModel";

export async function confirmarUsuario(dadosConfirmacao, setConfirmation){
    const result = await confirmarUsuarioModel(dadosConfirmacao).catch(err => {
        setConfirmation(false);
    }  );

    setConfirmation(result.reason === "success");
}