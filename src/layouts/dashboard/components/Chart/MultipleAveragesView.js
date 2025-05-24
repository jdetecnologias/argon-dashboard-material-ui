import PropTypes from "prop-types"
import colors from "assets/theme/base/colors";
import { getAverage } from "helper/math";
export default function MultipleAveragesView(props){
    const {datasets} = props;


    return datasets.map((dataset, key)=>{
                
               return (
                        <div key={key} className="text-sm">
                         <b style={{color:colors[dataset.color].main}}> {dataset.label}  {parseInt(getAverage(dataset.data))} </b>
                        </div>
                      )
            })
    
}

MultipleAveragesView.propTypes = {
    datasets: PropTypes.array.isRequired,
}