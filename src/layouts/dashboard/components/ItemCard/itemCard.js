import { BodyTemperature } from "layouts/dashboard/assets/bodyTemperature";
import { FrequencyHeart } from "layouts/dashboard/assets/frequencyHeart";
import { Glycemia } from "layouts/dashboard/assets/glycemia";
import { Oximetry } from "layouts/dashboard/assets/oximetry";
import { Steps } from "layouts/dashboard/assets/steps";
import { Weight } from "layouts/dashboard/assets/weight";
import PropTypes from "prop-types";


export  default function ItemCard(props){
    const {label, value} = props;
        const icons ={ 
         "Glicemia": <Glycemia _className="w-20" colorFill="red"/>,
         "Frequência cardiaca": <FrequencyHeart _className="w-20" colorFill="red"/>,
         "Oximetria": <Oximetry _className="w-20" colorFill="red"/>,
         "Temperatura corporal": <BodyTemperature _className="w-20" colorFill="red"/>,
         "Peso": <Weight _className="w-20" colorFill="red"/>,
         "Passos": <Steps _className="w-20" colorFill="red"/>
        }
    const _className = props.className+" cursor-pointer content-evenly shadow rounded-5 text-center h-36 grid grid-rows-10";
    return (
            <div className={_className} onClick={()=>props.onClick()}>
                <div className="text-sm text-center row-span-1">
                    {label}
                </div>
                <div className="flex flex-row justify-center flex-wrap align-middle">            
                    {icons[label]}
                </div>
            </div>
    )
}

ItemCard.propTypes = {
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    onClick:PropTypes.func,
  };