import { mes } from "helper/date";
import { formatDate } from "helper/date";

export function adapterGlycemia(listGlycemia,options){
    const labels = [];
    const propsAllowed =  options.map(option=>option.prop);
    const dataSet = propsAllowed.map(prop=>{
        const obj = {}
        obj[prop] = []

        return obj;
    });

    listGlycemia.forEach(glycemia => {
        const date = new Date(glycemia.data_medicao_glicemica);

        const label = `${formatDate(date.getDate()+1)}/${mes(date.getMonth())}/${date.getFullYear()} ${formatDate(glycemia.hora_medicao)}:${formatDate(glycemia.minuto_medicao)}`
        labels.push(label);        
        [].concat(dataSet).forEach((_data,index)=>{
            const props_ = Object.keys(_data);
            const dataArr = _data[props_[0]];

            dataArr.push(glycemia[props_[0]]);
            
            dataSet[index][props_[0]] = dataArr;
        });
    });

    const dtset = propsAllowed.map(prop=>{
        return ({
            label:GetLabelname(options,prop),
            color: GetOptionColor(options,prop),
            data:GetData(dataSet,prop)
        });
    });

    return ({
        labels,
        datasets: dtset
    });
}

function GetLabelname(options, prop){
    for(const option of options){
        if(option.prop === prop){
            return option.label;
        }
    }
}

function GetOptionColor(options, prop){
    for(const option of options){
        if(option.prop === prop){
            return option.color;
        }
    }
}

function GetData(datas, prop){
    for(const data of datas){
        if(Object.keys(data)[0] === prop){
            return data[prop];
        }
    }
}