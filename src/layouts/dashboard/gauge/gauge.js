function Gauge(){

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
          labels: [0, 85, 140, 250, 300],
          fractionDigits: 0
        },
        staticZones: [
           {strokeStyle: "#F03E3E", min: 0, max: 85},
           {strokeStyle: "#FFDD00", min: 85, max: 140},
           {strokeStyle: "#30B32D", min: 140, max: 250},
           {strokeStyle: "#FFDD00", min: 250, max: 300}
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
      demoGauge.maxValue = 300;
      demoGauge.set(112);

    }, 3000)

      `

  const indicadorElmemnt = document.querySelector("#indicadorSaude")
  const scrElmemnt = document.querySelector("script[ident=indicadorSaude")
  if(indicadorElmemnt && !scrElmemnt){
    d.head.insertAdjacentElement("afterbegin", stl);
    d.body.insertAdjacentElement("beforeend", scr);
  }

    return (
      <div style={{borderTop:"10px solid black"}}  >
        <div id="preview">
          <canvas width="250" height="150" id="indicadorSaude"></canvas>
          <div id="preview-textfield"></div>
        </div>
      </div>
    )
}

export default Gauge;