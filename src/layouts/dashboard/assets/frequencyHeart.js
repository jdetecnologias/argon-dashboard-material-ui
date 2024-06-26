import PropTypes from "prop-types";

export function FrequencyHeart(props){
    const {_className, colorFill} = props;
    return (
    <svg id="Layer_1" 
        data-name="Layer 1" 
        className={_className}
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 122.88 107.39">
            <path style={{fill:colorFill,fillRule:"evenodd"}} d="M60.83,17.18c8-8.35,13.62-15.57,26-17C110-2.46,131.27,21.26,119.57,44.61c-2.19,4.37-5.86,9.27-10.24,14.32v-.61h-30l-1.06,1.1L73.5,64.36l-9.88-19-3.28-6.3L57.2,45.46l-9,18.16L39.38,50.75l-3.12-4.52-7,11.4H11C4.74,49.1.38,39.89,0,29.94-.63,11.74,13.73.08,30.25.3c14.76.19,21,7.53,30.58,16.88Zm42.48,48.34L102,66.93c-8.23,8.52-17.34,16.87-23.72,23.2l-17.4,17.26L46.46,93.55c-8.76-8.44-20.32-18-29.71-28.72H33.19l1.06-1.72,2.32-3.76L45.8,72.74l3.47,5L52,72.29,60.48,55,69.37,72.1l2.3,4.43L75.14,73l7.2-7.42Z"/>
    </svg>)
}

FrequencyHeart.propTypes = {
    _className: PropTypes.string.isRequired,
    colorFill:PropTypes.string.isRequired,
}