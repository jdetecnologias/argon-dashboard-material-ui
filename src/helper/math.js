export function getAverage(values){
    if(values !== undefined && values !== null && values.length>0){
      const sum = values.reduce((sum, val,index)=>sum+val,0)
        
      return sum/values.length;
    }
  
    return 0;
  }