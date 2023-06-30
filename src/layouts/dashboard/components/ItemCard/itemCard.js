import PropTypes from "prop-types";

export  default function ItemCard(props){
    const {label, value} = props;

    const _className = props.className+" col-4  col-sm-3 col-xxl-1 m-1 shadow rounded-5 text-center lg:h-36";
    return (
            <div className={_className}>
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
  };