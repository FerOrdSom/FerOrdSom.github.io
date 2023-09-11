const routes = {
    "about-nav" : "./pages/about-me.html",
    "projects-nav" : "./pages/projects.html",
    "blog-nav": "./pages/blog.html",
}
console.log(routes["projects-nav"]);
window.addEventListener("load", () => {
    var page = "./pages/about-me.html"; //this is part of the state of the page
    injectContent(page); //when state changes this runs loads content
    var navButtons = document.getElementsByClassName("nav-buttons");
    
    for (let i = 0; i < navButtons.length; i++){
        var contentElement = document.getElementById("content");
        navButtons[i].addEventListener("click", ()=>{
            let destination = navButtons[i].id;
            page = routes[destination];
            console.log(routes[destination]);
            contentElement.innerHTML = "";
            injectContent(page);
        })
        
    }
        
    
    // var state = {language : "es"};
    // var langFlag = document.getElementById("flag");
    // var langSelector = document.getElementById("lang");
    // var clicksOnFlag = 0;
    // langSelector.addEventListener("click", ()=>{
    //     clicksOnFlag++;
    //     if(clicksOnFlag % 2 == 0){
    //         langFlag.attributes.src.nodeValue = "images/es.png";
    //     }
    //     else{
    //         langFlag.attributes.src.nodeValue = "images/uk.png";
    //     }
    // })
    // console.log(state.language);
});

function injectContent(page) {
    var elmnt = document.getElementById("content");
    var xhttp = new XMLHttpRequest();
    //WTF it doesn't work if I use ()=>{...}????
    //ANSWER: Arrow functions don't have their own bindings to this, arguments, or super, and should not be used as methods.
    //with ()=>: this: [object Window]
    //with function (): this: [object XMLHttpRequest]
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4) { // 4 = operation complete            
            if (this.status == 200) { elmnt.innerHTML = this.responseText; }
            if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
        }
    }
    xhttp.open("GET", page, true);
    xhttp.send();
    return;
}









