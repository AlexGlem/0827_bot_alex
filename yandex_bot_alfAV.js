// ==UserScript==
// @name         Yandex_Bot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Alfimova AV
// @match        https://yandex.ru/*
// @match        https://xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/*
// @match        https://crushdrummers.ru/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

let yandexInput = document.getElementById("text");
let btnYaGo = document.getElementsByClassName("button mini-suggest__button button_theme_search button_size_search i-bem button_js_inited")[0];
let sites = {
    "xn----7sbab5aqcbiddtdj1e1g.xn--p1ai": ["как звучит гобой","флейта","кларнет","валторна","саксофон"],
    "crushdrummers.ru": ["барабанное шоу","Шоу барабанщиков Crush","заказать барабанное шоу"]
}
let site = Object.keys(sites)[getIntRandom(0, Object.keys(sites).length)];
let words = sites[site];
//let words = ["как звучит гобой","флейта","кларнет","валторна","саксофон"];
let word = words[getIntRandom(0, words.length)];

if(btnYaGo != undefined){
    let i=0;
    let timerId = setInterval(function(){
        yandexInput.value = yandexInput.value + word[i++]; // пишем по буквам фразу в ПС
        document.cookie = "site="+site;
        if(i==word.length){
            clearInterval(timerId);
            btnYaGo.click();
        }
    }, 500);
}else if(location.hostname === "yandex.ru"){
    let links = document.links;
    let goNext = true;
    let site = getCookie("site");
    for(let i=0; i<links.length; i++){
        let link = links[i];
        if(link.href.indexOf(site) != -1){
            /*link.target = "_self";*/
            setTimeout(function(){
                link.click();
            },3000);
            goNext = false;
            break;
        }
    }
    if(goNext){
        let currentPage = document.getElementsByClassName('pager_item pageritem_current_yes pager_item_kind_page')[0];
        if(currentPage<10){
            let nextYa = document.getElementsByClassName("link link_theme_none link_target_serp pager__item pager__item_kind_next")[0];
            setTimeout(function(){
                nextYa.click();
            }, 3000);
        }else{
            location.href = "https://yandex.ru/";
        }
    }
}else{
    setInterval(function(){
        if(getIntRandom(0,100)<30) location.href = "https://yandex.ru/";
        let links = document.links;
        let randomIndex = getIntRandom(0, links.length);
        let link = links[randomIndex];
        if(link.href.indexOf(location.hostname) != -1){
            links[randomIndex].click();
        }else{
            location.href = location.origin;
        }
    }, 2000);
}

function getIntRandom(min, max){
        return Math.floor(Math.random()*(max-min)+min);
}

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

