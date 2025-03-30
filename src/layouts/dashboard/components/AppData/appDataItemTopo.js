import PropTypes from 'prop-types'

export default function AppDataItemTopo(props){
    const {
            label,
            value,
            icon,
            iconLabel,
            showIcon
        } = props;

    return (
            <div className='p-1'>
                <div>
                    {label?label:""}{iconLabel?iconLabel:""}
                </div>
                <div className='grid grid-cols-2 w-20 text-lg font-bold text-center'>
                    {value?value:0} {icon&&showIcon?icon:""}
                </div>
            </div>
            )
}

AppDataItemTopo.propTypes = {
    label:PropTypes.string.isRequired, 
    value:PropTypes.string.isRequired,
    icon:PropTypes.node,
    iconLabel:PropTypes.node,
    showIcon:PropTypes.bool
}