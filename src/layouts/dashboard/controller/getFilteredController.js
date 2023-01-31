import { getFiltered } from "../model/getFilteredModel";

export async function getFitered(dadosUsuario,token, setDados){
    const result = await getFiltered(dadosUsuario, token).catch(err => {
        setDados([]);
    }  );
    console.log(result);
    const resultStatus = result.reason === "success";

    if(resultStatus){
        setDados(result.data.message);
    }else{
        setDados([]);
    }
}