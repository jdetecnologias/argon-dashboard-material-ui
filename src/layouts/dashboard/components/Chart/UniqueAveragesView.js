import PropTypes from "prop-types";


export default function UniqueAveragesView(props){
    const {maior,menor,average, atual, unitMesure, atualData, hasAverages} = props;
    const averagesClass = !hasAverages?"invisible ":" "

    return (
        <>
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
        </>
    )
}

UniqueAveragesView.propTypes = {
    maior: PropTypes.string.isRequired,
    menor: PropTypes.string.isRequired,
    atual: PropTypes.string.isRequired,
    unitMesure: PropTypes.string.isRequired,
    average: PropTypes.string.isRequired,
    atualData:PropTypes.string.isRequired,
    hasAverages: PropTypes.bool.isRequired
}