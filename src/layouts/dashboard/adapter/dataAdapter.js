import { mes } from "helper/date";
import { formatDate } from "helper/date";

export function adapterGlycemia(listGlycemia){
    const labels = [];
    const data = [];

    listGlycemia.forEach(glycemia => {
        const date = new Date(glycemia.data_medicao_glicemica)

        const label = `${formatDate(date.getDate()+1)}/${mes(date.getMonth())}/${date.getFullYear()} ${formatDate(glycemia.hora_medicao)}:${formatDate(glycemia.minuto_medicao)}`
        labels.push(label);
        data.push(glycemia.valor_glicemia)
    })

    const dataChart = mountData(labels, data);
    
    return dataChart;
}


function mountData(labels, data){
    return ({
                labels,
                datasets: [
                    {
                        label: "Taxa glycêmica",
                        color: "success",
                        data
                    }
                ]
            });
}
