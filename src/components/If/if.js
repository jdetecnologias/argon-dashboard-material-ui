import React from 'react'

export default props => {
	if(props.test){
		return props.children
	}
	else{
		return props.Else? props.Else:false
	}
	
}