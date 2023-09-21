export const PrintContent = function(AquerySelector){
	const elementToPrint = document.querySelector(AquerySelector);
	
	let head =  document.querySelector('head').innerHTML;
	
	const style = `
					<style>
						@media print{
							
							${AquerySelector}, ${AquerySelector} * {
								visibility:visible;
								color:black;
							}
							
							${AquerySelector}{
								width:100%;
								left: 0;
								top: 0;
							}
						}
					
					</style>	
					` 
	
	const jsScript = `
						<script>
							document.querySelectorAll('.hidePrint').forEach(function(el){el.remove()})
						</script>
					`
				
	const getAttributes = function(elemento){
												return Object.values(elemento.attributes)
														.map(AttrObj=>AttrObj.name)
														.map(attr=>`${attr}="${elemento.getAttribute(attr)}"`)
														.join(" ");
											}
											
	const attr = getAttributes(elementToPrint);
	
	const contentToPrint = elementToPrint.innerHTML;
	
	const  newWin=window.open('','_blank');
	
	newWin.document.open();
	
	const html = `
					<html>
						<head>
							${head}
							${style}
						</head>
						<body onload="window.print()">
							<div ${attr}>
								${contentToPrint}
							</div>
						</body>
						${jsScript}
					</html>
				
				`
	
	newWin.document.write(html);
	
	newWin.document.close();
}


export const PrintContentCanvas = function(AquerySelector, _canvas){
	const elementToPrint = document.querySelector(AquerySelector);
    const canvas = document.querySelector(_canvas).toDataURL();
	
	let head =  document.querySelector('head').innerHTML;
	
	const style = `
					<style>
						@media print{
							
							${AquerySelector}, ${AquerySelector} * {
								visibility:visible;
								color:black;
							}
							
							${AquerySelector}{
								width:100%;
								left: 0;
								top: 0;
							}
						}
					
					</style>	
					` 
	
	const jsScript = `
						<script>
							document.querySelectorAll('.hidePrint').forEach(function(el){el.remove()})
                            const canvas_ = document.querySelector("${_canvas}");
                            const paiCanvas = canvas_.parentNode;
                            paiCanvas.removeChild(canvas_);
                            paiCanvas.innerHTML = '<img src="${canvas}"/>';
						</script>
					`
				
	const getAttributes = function(elemento){
												return Object.values(elemento.attributes)
														.map(AttrObj=>AttrObj.name)
														.map(attr=>`${attr}="${elemento.getAttribute(attr)}"`)
														.join(" ");
											}
											
	const attr = getAttributes(elementToPrint);
	
	const contentToPrint = elementToPrint.innerHTML;
	
	const  newWin=window.open('','_blank');
	
	newWin.document.open();
	
	const html = `
					<html>
						<head>
							${head}
							${style}
						</head>
						<body onload="window.print()">
							<div ${attr}>
								${contentToPrint}
							</div>
						</body>
						${jsScript}
					</html>
				
				`
	
	newWin.document.write(html);
	
	newWin.document.close();
}