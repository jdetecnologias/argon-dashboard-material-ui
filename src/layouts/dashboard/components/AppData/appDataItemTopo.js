import PropTypes from 'prop-types'

export default function AppDataItemTopo(props){
    const {
            label,
            value,
            icon,
            iconLabel
        } = props;

    return (
            <div className='p-1'>
                <div>
                    {label?label:""}{iconLabel?iconLabel:""}
                </div>
                <div className='grid grid-cols-2 w-20 text-lg font-bold '>
                    {value?value:0} {icon?icon:""}
                </div>
            </div>
            )
}

AppDataItemTopo.propTypes = {
    label:PropTypes.string.isRequired, 
    value:PropTypes.string.isRequired,
    icon:PropTypes.node,
    iconLabel:PropTypes.node
}