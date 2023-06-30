import PropTypes from "prop-types";

export  default function ItemCard(props){
    const {label, value} = props;

    const _className = props.className+" cursor-pointer shadow rounded-5 text-center h-36";
    return (
            <div className={_className} onClick={()=>props.onClick()}>
                <div className="text-sm mt-3">
                    {label}
                </div>
                <div className="text-center averageCard mt-4">
                    {value}
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