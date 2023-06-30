import PropTypes from "prop-types";

export  default function CardList(props){
    return (
        <div>
            <div className="row">
                <div className="col-12 text-center">
                    Médias (período)
                </div>
                {
                props.children
                }

            </div>
        </div>
    )
}

CardList.propTypes = {
    children: PropTypes.objectOf(PropTypes.element).isRequired,
  };
