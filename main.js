window.addEventListener("load", ()=>{
    var state = {language : "es"};
    var langFlag = document.getElementById("flag");
    var langSelector = document.getElementById("lang");
    var clicksOnFlag = 0;
    langSelector.addEventListener("click", ()=>{
        clicksOnFlag++;
        if(clicksOnFlag % 2 == 0){
            langFlag.attributes.src.nodeValue = "images/es.png";
        }
        else{
            langFlag.attributes.src.nodeValue = "images/uk.png";
        }
    })
    console.log(state.language);
})








