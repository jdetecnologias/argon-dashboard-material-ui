import PropTypes from "prop-types";


export default function UniqueAveragesView(props){
    const {showData, maior,menor,average, lightTheme, atual, unitMesure, atualData, hasAverages} = props;
    const averagesClass = !hasAverages?"invisible ":" "
    const avgDataClass = showData?"":" hidden";
    console.log("props",averagesClass,avgDataClass)
    return (
        <div  className={lightTheme?"col-span-2"+avgDataClass:"text-lime-300 col-span-2"+avgDataClass}>
            <div className={averagesClass+"text-sm font-black"}>
                Maior: {maior}
            </div>
            <div className={averagesClass+"text-sm font-black"}>
                Menor: {menor}
            </div>
            <div className={averagesClass+"text-sm font-black"}>
                Média:
            </div>
            <div className={"text-4xl text-center"}>
                {average}
            </div>
            <div className="text-sm font-black">
                Atual({atualData}) : {atual}
            </div>    
            <div className="text-4xl text-center">
               {unitMesure}
            </div>                        
        </div>
    )
}

UniqueAveragesView.propTypes = {
    showData: PropTypes.bool.isRequired,
    maior: PropTypes.string.isRequired,
    menor: PropTypes.string.isRequired,
    lightTheme: PropTypes.bool.isRequired,
    atual: PropTypes.string.isRequired,
    unitMesure: PropTypes.string.isRequired,
    average: PropTypes.string.isRequired,
    atualData:PropTypes.string.isRequired,
    hasAverages: PropTypes.bool.isRequired
}