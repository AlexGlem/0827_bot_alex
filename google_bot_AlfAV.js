// ==UserScript==
// @name         Google_Bot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Alfimova AV
// @match        https://www.google.com/*
// @match        https://xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

let googleInput = document.getElementsByName("q")[0];
let btnK = document.getElementsByName("btnK")[1];

if(btnK != undefined){
    googleInput.value = "как звучит гобой";
    setTimeout(function(){
        btnK.click();
    }, 1000);
}else if(location.hostname === "www.google.com"){
    let links = document.links;
    let goNext = true;
    for(let i=0; i<links.length; i++){
        let link = links[i];
        if(link.href.indexOf("xn----7sbab5aqcbiddtdj1e1g.xn--p1ai") != -1){
            setTimeout(function(){
                link.click();
            }, 3000);
            goNext = false;
            break;
        }
    }
    if(goNext){
        let pnnext = document.getElementById("pnnext");
        setTimeout(function(){
            pnnext.click();
        }, 3000);
    }
}else{
    let links = document.links;
    let randomIndex = getIntRandom(0, links.length);
    let link = links[randomIndex];
    if(link.href.indexOf(location.hostname) != -1){
        setTimeout(function(){
            links[randomIndex].click();
        }, 2000);
    }else{
        location.href = "https://xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/";
    }
}

function getIntRandom(min, max){
    return Math.floor(Math.random()*(max-min)+min);
}
