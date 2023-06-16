function Map(){
    const  setting = {"query":"Maringá - PR, Brasil","width":1500,"height":400,"satellite":false,"zoom":13,"placeId":"ChIJ-QsrE9nQ7JQR6PC8YweXpEk","cid":"0x49a4970763bcf0e8","coords":[-23.4209686,-51.9330844],"lang":"pt","queryString":"Maringá - PR, Brasil","centerCoord":[-23.4209686,-51.9330844],"id":"map-9cd199b9cc5410cd3b1ad21cab2e54d3","embed_id":"942504"};
    const  d = document;
    const s = d.createElement('script');
    s.src = 'https://1map.com/js/script-for-user.js?embed_id=942504';
    s.async = true;
    s.onload = function (e) {
      window.OneMap.initMap(setting)
      const iframes = document.querySelectorAll('iframe')
      
      for(let i = 0; i < iframes.length;i++) {
          if(i > 0){
              iframes[i].parentNode.removeChild(iframes[i]);
          }
      }  
    };

    const to = d.getElementsByTagName('script')[0];
    to.parentNode.insertBefore(s, to);



    return (
            <div style={{position:"relative", left:"-40px"}} id="wrapper-9cd199b9cc5410cd3b1ad21cab2e54d3">
              <div id="map-9cd199b9cc5410cd3b1ad21cab2e54d3">
                </div>
                <a href="https://1map.com/pt/map-embed">1 Map</a>
            </div>
    )
}

export default Map;