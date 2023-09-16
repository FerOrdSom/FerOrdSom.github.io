import routes from "../routes.js"; 

function injectContent(page) {
    var elmnt = document.getElementById("content");
    var xhttp = new XMLHttpRequest();
    //WTF it doesn't work if I use ()=>{...}????
    //ANSWER: Arrow functions don't have their own bindings to this, arguments, or super, and should not be used as methods.
    //with ()=>: this: [object Window]
    //with function (): this: [object XMLHttpRequest]
    xhttp.onreadystatechange = function () {
        elmnt.innerHTML = "ESPINER!!!!"; // load whatever spinner I decide
        setTimeout(() => { //to simulate loading time            
            if (this.readyState === 4) { // 4 = operation complete
                if (this.status == 200) { elmnt.innerHTML = this.responseText; }
                if (this.status == 404) { elmnt.innerHTML = "Page not found. Error 404"; }
            }    
        }, 1000);        
    }
    xhttp.open("GET", page, true);
    xhttp.send();
    return;
}

function populateNavButtons(routes) {
    var navButtons = document.getElementsByClassName("nav-buttons");

    for (let i = 0; i < navButtons.length; i++){
        var contentElement = document.getElementById("content");
        navButtons[i].addEventListener("click", ()=>{
            let destination = navButtons[i].id;            
            var page = routes[destination];
            contentElement.innerHTML = "";
            injectContent(page);

            /* This check may be excessive, injectContent already check for this by looking for server response*/
            // if (page != null){
                // contentElement.innerHTML = "";
                // injectContent(page);
            // }
            // else {
            //     contentElement.innerHTML='<h1 style="color : red">DEV: RE-ROUTE TO ERROR PAGE:\n route does\'t exist</h1>';
            // }
        });        
    }
}

function initialize() {
    populateNavButtons(routes);
    
    injectContent(Object.values(routes)[0]);
}

export {injectContent, populateNavButtons, initialize };