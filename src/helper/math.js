export function getAverage(values){
    if(values !== undefined && values !== null && values.length>0){
      const sum = values.reduce((sum, val,index)=>sum+val,0)
        
      return sum/values.length;
    }
  
    return 0;
  }

  export function getMax(values){
    if(values !== undefined && values !== null && values.length>0){
      const max = values.reduce((max, val,index)=>{
        if(max < val){
          return val;
        }else{
          return max;
        }
      },0)
        
      return max;
    }
    return 0;
  }

  export function getMin(values){
    if(values !== undefined && values !== null && values.length>0){
      const min = values.reduce((min, val,index)=>{
        if(min > val){
          return val;
        }else{
          return min;
        }
      },9999999)
        
      return min;
    }
    return 0;
  }