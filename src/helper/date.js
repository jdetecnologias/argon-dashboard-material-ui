export function mes(indiceMes){
    const mesArr = [
        "jan", "fev", "mar", "abr", "mai","jun", "jul", "ago", "set",   "out",  "nov", "dez"
    ]
    
    return mesArr[indiceMes]
}

export function formatDate(number){
    return number > 9 ? number : "0" + number
}