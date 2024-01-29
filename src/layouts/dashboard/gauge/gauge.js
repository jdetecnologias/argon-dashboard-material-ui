import { useState, useEffect } from "react";
import { GetGlycemiaAverage } from "../model/getGlycemiaData";
import { getCookie } from "helper/cookies";

function cleanScript(){
  const scrElmemnt = document.querySelector("script[ident=indicadorSaude")

  if(scrElmemnt){
    scrElmemnt.parentNode.removeChild(scrElmemnt);
  }
}


function Gauge(){
  const [glycemiaAVG, setGlycemiaAvg] = useState(0)
  cleanScript()
  console.log(glycemiaAVG)
  useEffect(() => {
    const queryString = window.location.search;
    
    const urlParams = new URLSearchParams(queryString);
    const adminAccess = urlParams.get('adminAccess') !== null && urlParams.get('adminAccess') === 'true' ;
    let email = "";

    if(adminAccess){
      email = urlParams.get('email');
    }else{
        let dadosLogin = getCookie("dadosLogin");
        if(dadosLogin != ""){
          dadosLogin = JSON.parse(dadosLogin);  
          email = dadosLogin.email;
        }
    }
    if(email !== ""){
      GetGlycemiaAverage(email,48).then(result=>{
        if(result.data && result.data.message){
          setGlycemiaAvg(Number(result.data.message)+50);
        }
      }) 
    }
  },[])

  if(glycemiaAVG > 0){

    const d = document;
    const stl = d.createElement('style');
  
    stl.textContent = `
              #preview {
                position: relative;
                  color: #fff;
                  float: left;
                }
                #indicadorSaude{
                  width: 250px; top: 10px;
                  position: relative;
                }
                #preview-textfield{
                display:none
                }
    
    `
  
  
    const scr = d.createElement('script');
      scr.setAttribute("ident", "indicadorSaude");
      scr.text = `
      setTimeout(function(){
        const json = {"renderTicks":{},"currval":1244,"animationSpeed":32,"angle":0.15,"lineWidth":0.44,"radiusScale":1,"pointer":{"length":0.6,"color":"#000000","strokeWidth":0.035},"fontSize":41,"colorStart":"#6FADCF","colorStop":"#8FC0DA","strokeColor":"#E0E0E0"}
    
        demoGauge = new Gauge(document.getElementById("indicadorSaude"));
        
        var opts = {
          angle: 20,
          lineWidth: 0.2,
          radiusScale:0.9,
          pointer: {
            length: 0.6,
            strokeWidth: 0.05,
            color: '#000000'
          },
          staticLabels: {
            font: "10px sans-serif",
            labels: [0,70,100,140,200,250],
            fractionDigits: 0
          },
          staticZones: [
            {strokeStyle: "green", min: 0, max: 100},
             {strokeStyle: "orange", min: 100, max: 140},
             {strokeStyle: "red", min: 140, max: 250}
          ],
          limitMax: 4,
          limitMin: 1,
          highDpiSupport: true
        };
     
        Object.keys(json).forEach(key =>{
          opts[key] = json[key];
        })
    
        demoGauge.setOptions(opts);
        demoGauge.setTextField(document.getElementById("preview-textfield"));
        demoGauge.minValue = 0;
        demoGauge.maxValue = 250;
        demoGauge.set(${glycemiaAVG});
  
      }, 3000)
  
        `
  
    const indicadorElmemnt = document.querySelector("#indicadorSaude")
    const scrElmemnt = document.querySelector("script[ident=indicadorSaude")
    if(indicadorElmemnt && !scrElmemnt){
      d.head.insertAdjacentElement("afterbegin", stl);
      d.body.insertAdjacentElement("beforeend", scr);
    }
  }


    return (
      <div style={{borderTop:"10px solid black"}}  >
        <p className="text-center text-sm"> {glycemiaAVG > 0 ? `Média ${glycemiaAVG}` : 'Sem dados coletados' }</p>
        <div id="preview">
          <canvas width="250" height="150" id="indicadorSaude"></canvas>
          <div id="preview-textfield"></div>
        </div>
      </div>
    )
}

export default Gauge;