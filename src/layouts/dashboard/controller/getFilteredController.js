import dayjs from "dayjs";
import { getFiltered } from "../model/getFilteredModel";

export async function getFitered(dadosUsuario,token, setDados){
    
    const isValidInitialDate =dayjs(dadosUsuario.data_inicio_filtro).isValid();
    const isValidEndDate = dayjs(dadosUsuario.data_fim_filtro).isValid();
    const messageErrorsList = [];
    
    if(!isValidInitialDate){
        messageErrorsList.push("Data inicial inválida");
    }

    if(!isValidEndDate){
        messageErrorsList.push("Data final inválida");
    }

    const result = await getFiltered(dadosUsuario, token).catch(err => {
        messageErrorsList.push(err.message);
        setDados([],messageErrorsList);
    }  );
    console.log(result);
    const resultStatus = result.reason === "success";

    if(resultStatus){
        if(result.data.message.length < 1){
            messageErrorsList.push("Dados de glicemia não foram encontrados!")     
        }
        setDados(result.data.message,messageErrorsList);
    }else{
        messageErrorsList.push("Error ao obter os dados!");
        setDados([],messageErrorsList);
    }
}