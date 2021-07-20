// ==UserScript==
// @name         Yandex_Bot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Alfimova AV
// @match        https://yandex.ru/*
// @match        https://xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

let yandexInput = document.getElementById("text");
let btnYaGo = document.getElementsByClassName("button mini-suggest__button button_theme_search button_size_search i-bem button_js_inited")[0];
let words = ["как звучит гобой","флейта","кларнет","валторна","саксофон"];
let word = words[getIntRandom(0, words.length)];


if(btnYaGo != undefined){
    let i=0;
    let timerId = setInterval(function(){
        yandexInput.value = yandexInput.value + word[i++]; // пишем по буквам фразу в ПС
        if(i==word.length){
            clearInterval(timerId);
            btnYaGo.click();
        }
    }, 500);
}else if(location.hostname === "yandex.ru"){
    let links = document.links;
    let goNext = true;
    for(let i=0; i<links.length; i++){
        let link = links[i];
        if(link.href.indexOf("xn----7sbab5aqcbiddtdj1e1g.xn--p1ai") != -1){
            /*link.target = "_self";*/
            setTimeout(function(){
                link.click();
            },3000);
            goNext = false;
            break;
        }
    }
    if(goNext){
        let nextYa = document.getElementsByClassName("link link_theme_none link_target_serp pager__item pager__item_kind_next")[0];
        setTimeout(function(){
            nextYa.click();
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
