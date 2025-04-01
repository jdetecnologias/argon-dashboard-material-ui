export function getUnitMesure(dataName){
    const data = {};
    data["valor_glicemia"] = "mg/dl";
    data["heartRate"] = "bpm";
    data["oxymetry"] = "%";
    data["bodyTemperature"] = "°c";
    data["weight"] = "kg";
    data["steps"] = "passos";
    data["respirationRate"] = "irpm";


    return data[dataName]?data[dataName]:"";

}


export function hasAveragesData(dataName){
    const data = {};
    data["valor_glicemia"] = true;
    data["heartRate"] = true;
    data["oxymetry"] = true;
    data["bodyTemperature"] = true;
    data["weight"] = false;
    data["steps"] = false;
    data["respirationRate"] = true;


    return data[dataName]?data[dataName]:false;
}
