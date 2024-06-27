import PropTypes from 'prop-types'

export default function AppDataItemTopoGluco(props){
    const {
            value,
            icon,
        } = props;

    return (
            <div>
                <div className='grid sm:grid-cols-1 md:grid-cols-2 w-auto text-lg font-bold sm:place-items-center'>
                {icon?icon:""} <span>{value?value:0} </span>
                </div>
            </div>
            )
}

AppDataItemTopoGluco.propTypes = {
    value:PropTypes.string.isRequired,
    icon:PropTypes.node,
}