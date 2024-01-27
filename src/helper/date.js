export function mes(indiceMes){
    const mesArr = [
        "jan", "fev", "mar", "abr", "mai","jun", "jul", "ago", "set",   "out",  "nov", "dez"
    ]
    
    return mesArr[indiceMes]
}

export function formatDate(number){
    return number > 9 ? number : "0" + number
}

export function minutoToHour(minutos){
    const restoMinutos = minutos%60;
    const qtdHoras = (minutos-restoMinutos)/60;

    return `${qtdHoras}h${restoMinutos>0?`:${restoMinutos}m`:''}`;
    
}