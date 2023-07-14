import PropTypes from "prop-types";

export function Glycemia(props){
    const {_className, colorFill} = props;
    return (
<svg 
	className={_className} 
    viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path style={{fill:colorFill,fillRule:"evenodd"}} d="M734.522026 655.334499c-26.720571 130.624013-116.116601 223.924979-262.943644 223.924979-157.217694 0-253.682723-106.880239-259.19118-254.508531-5.498224-147.346883 149.468197-348.011088 256.326946-455.822536 34.741245 34.56933 66.685795 73.535807 106.410542 123.864052 9.206686-16.138562 30.913057-54.205553 41.46539-68.133773-49.660027-62.232366-101.394295-118.309546-145.010675-161.825642C345.278861 190.609199 135.140886 438.58699 135.140886 623.934349c0 185.357592 150.635789 335.606571 336.438519 335.606571 176.48962 0 321.143161-135.605467 335.213621-308.032562C772.754792 661.661601 708.842157 651.601478 734.522026 655.334499zM761.972215 102.115726c-67.992557 67.871807-181.158966 232.706993-181.158966 331.171562 0 98.465592 81.108273 178.303942 181.158966 178.303942 100.056833 0 181.165106-79.83835 181.165106-178.303942C943.137321 334.822718 832.726675 171.739433 761.972215 102.115726zM452.004581 737.740324l31.685653 0c17.499559 0 31.68463-14.186094 31.68463-31.685653l0-47.52848 50.697659 0c17.499559 0 31.68463-14.186094 31.68463-31.685653l0-31.685653c0-17.499559-14.186094-31.685653-31.68463-31.685653l-50.697659 0 0-47.52848c0-17.499559-14.186094-31.685653-31.68463-31.685653l-31.685653 0c-17.499559 0-31.685653 14.186094-31.685653 31.685653l0 47.52848-44.3593 0c-17.499559 0-31.685653 14.186094-31.685653 31.685653l0 31.685653c0 17.499559 14.186094 31.685653 31.685653 31.685653l44.3593 0 0 47.52848C420.318928 723.55423 434.505022 737.740324 452.004581 737.740324z"  />
    </svg>)
}

Glycemia.propTypes = {
    _className: PropTypes.string.isRequired,
    colorFill:PropTypes.string.isRequired,
}