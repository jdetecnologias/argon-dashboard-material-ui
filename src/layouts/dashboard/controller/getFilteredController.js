import dayjs from "dayjs";
import { getFiltered, getFilteredByAdmin } from "../model/getFilteredModel";

export async function getFitered(dadosUsuario,token, setDados){
    
    const isValidInitialDate =dayjs(dadosUsuario.data_inicio_filtro).isValid();
    const isValidEndDate = dayjs(dadosUsuario.data_fim_filtro).isValid();
    const isInitialDateBigger = dayjs(dadosUsuario.data_inicio_filtro).isAfter(dadosUsuario.data_fim_filtro);
    const messageErrorsList = [];
    
    if(isInitialDateBigger){
        messageErrorsList.push("Data inicial é maior que a data final!");
    }

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

export async function getFiteredByAdmin(dadosUsuario,setDados){
    
    const isValidInitialDate =dayjs(dadosUsuario.data_inicio_filtro).isValid();
    const isValidEndDate = dayjs(dadosUsuario.data_fim_filtro).isValid();
    const isInitialDateBigger = dayjs(dadosUsuario.data_inicio_filtro).isAfter(dadosUsuario.data_fim_filtro);
    const messageErrorsList = [];
    
    if(isInitialDateBigger){
        messageErrorsList.push("Data inicial é maior que a data final!");
    }

    if(!isValidInitialDate){
        messageErrorsList.push("Data inicial inválida");
    }

    if(!isValidEndDate){
        messageErrorsList.push("Data final inválida");
    }

    const result = await getFilteredByAdmin(dadosUsuario).catch(err => {
        messageErrorsList.push(err.message);
        setDados([],messageErrorsList);
    }  );

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