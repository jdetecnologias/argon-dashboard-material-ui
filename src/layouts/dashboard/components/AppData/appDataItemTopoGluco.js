import PropTypes from 'prop-types'

export default function AppDataItemTopoGluco(props){
    const {
            value,
            icon,
        } = props;

    return (
            <div>
                <div className='grid grid-cols-2 w-auto text-lg font-bold'>
                {icon?icon:""} <span className='flex items-center'>{value?value:0} </span>
                </div>
            </div>
            )
}

AppDataItemTopoGluco.propTypes = {
    value:PropTypes.string.isRequired,
    icon:PropTypes.node,
}