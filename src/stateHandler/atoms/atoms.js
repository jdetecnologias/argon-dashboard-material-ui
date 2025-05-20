import {
    atom
  } from 'recoil';

const appDataState = atom({
    key: 'appData', // unique ID (with respect to other atoms/selectors)
    default: ({}), // default value (aka initial value)
  });



const metaDataListState = atom({
  key:'metaDataList',
  default:  (
              [
                {prop:"valor_glicemia", label:"Glicemia", show:true,color:"success"},
                {prop:"heartRate", label:"Batimento cardiaco", show:false,color:"error"},
                {prop:"oxymetry", label:"Oximetria", show:false,color:"primary"},
                {prop:"bodyTemperature", label:"Temperatura corporal", show:false,color:"warning"},
                {prop:"weight", label:"Peso", show:false,color:"secondary"},
                {prop:"steps", label:"Passos", show:false,color:"info"},
                {prop:"bloodPressure", label:"Pressão arterial", show:false,color:"info"},
                {prop:"bloodPressureHigh", label:"Pressão sistólica", show:false, color:"success"},
                {prop:"bloodPressureLow", label:"Pressão diastólica", show:false, color:"error"},
                {prop:"eletroCardio", label:"Eletrocardiograma", show:false,color:"info"}
              ]
            )
});


export {appDataState, metaDataListState}