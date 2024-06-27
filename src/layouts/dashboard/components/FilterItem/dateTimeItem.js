import If from "components/If/if";
import PropTypes from "prop-types";

export default function DateTime(props){
    const {label, valueDate, valueTime, onChangeDate, onChangeTime} = props;

    return (
                <div className="grid grid-rows-2 text-xs">
                    <If test={label}>
                        {label}
                    </If>
                    <div>
                        <input 
                            className="p-1 border border-black" 
                            type="date" 
                            value={valueDate} 
                            onChange={(e)=>onChangeDate(e)}  
                            placeholder={label}/>
                        <input 
                            className="p-1 ml-1 border border-black" 
                            type="time" 
                            value={valueTime} 
                            onChange={(e)=>onChangeTime(e)} />                                 
                    </div>
                </div>
        )
}

DateTime.propTypes = {
    onChangeDate: PropTypes.func.isRequired,
    onChangeTime: PropTypes.func.isRequired,
    valueTime: PropTypes.string.isRequired,
    valueDate: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  };