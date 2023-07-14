import PropTypes from "prop-types";

export default function DateTime(props){
    const {label, valueDate, valueTime, onChangeDate, onChangeTime} = props;
    return (
                <div className="grid grid-rows-2 text-xs  md:text-lg">
                    {label}
                <div>
                <input className="p-1" type="date" value={valueDate} onChange={(e)=>onChangeDate(e)}  placeholder={label}/>
                <input className="p-1 ml-1" type="time" value={valueTime} onChange={(e)=>onChangeTime(e)} />         
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