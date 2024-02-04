import PropTypes from "prop-types";

export  default function CardList(props){
    return (
        <div {...props}>
            <div className="row">
                <div className="col-12 text-center">
                    Médias (período)
                </div>
                <div className="grid 3xl:grid-cols-10 2xl:grid-cols-6 sm:grid-cols-3 justify-center gap-2">
                    {
                        props.children
                    }
                </div>

            </div>
        </div>
    )
}

CardList.propTypes = {
    children: PropTypes.objectOf(PropTypes.element).isRequired,
  };
