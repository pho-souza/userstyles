// ==UserScript==
// @name         Planalto_user_script
// @namespace    http://tampermonkey.net/
// @version      2024-04-25
// @description  try to take over the world!
// @author       You
// @match        *www.planalto.gov.br/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=gov.br
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  //window.onload = function() {

    var reg_items = {
        reg: '',
        last_item: true
    };
    var reg_exp = {};

    // Add all variables to list
    reg_exp.reg_capitulo = structuredClone(reg_items);
    reg_exp.reg_titulo = structuredClone(reg_items);
    reg_exp.reg_secao = structuredClone(reg_items);
    reg_exp.reg_subsecao = structuredClone(reg_items);
    reg_exp.reg_livro = structuredClone(reg_items);
    reg_exp.reg_inciso = structuredClone(reg_items);
    reg_exp.reg_artigo = structuredClone(reg_items);
    reg_exp.reg_paragrafo = structuredClone(reg_items);
    reg_exp.reg_item = structuredClone(reg_items);
    reg_exp.reg_alinea = structuredClone(reg_items);
    reg_exp.reg_breaks = structuredClone(reg_items);
    reg_exp.reg_pena = structuredClone(reg_items);
    reg_exp.reg_excecoes = structuredClone(reg_items);

    reg_exp.reg_capitulo.reg = /^([\s\n\t]?)(CAP.TULO)/;
    reg_exp.reg_titulo.reg = /^([\s\n\t]?)(T.TULO)/;
    reg_exp.reg_secao.reg = /^([\s\n\t]?)(Se.ão)/;
    reg_exp.reg_subsecao.reg = /^([\s\n\t]?)(Subse.ão)/;
    reg_exp.reg_livro.reg = /^([\s\n\t]?)(LIVRO )/;
    reg_exp.reg_inciso.reg = /^([\s\n\t]?)([IVXCDL]+ )/;
    reg_exp.reg_artigo.reg = /^([\s\n\t]?)(Art|ART|art)[.] /;
    reg_exp.reg_paragrafo.reg = /^([\s\n\t]?)(§|Parágrafo|PARÁGRAFO|parágrafo)/;
    reg_exp.reg_item.reg = /^([\s\n\t]?)([a-z]{1,3}\)[ \t]+)/gi;
    reg_exp.reg_alinea.reg = /^([\s\n\t]?)([0-9]{1,3}[.] )/;
    reg_exp.reg_breaks.reg = /^([\s\n\t]?)(\r\n|\r|\n|\t)+/g;
    reg_exp.reg_pena.reg = /^([\s\n\t]?)Pena/;

    for(var k in reg_exp){
        reg_exp[k].last_p = false;
    };

    reg_exp.reg_capitulo.last_p = true;
    reg_exp.reg_titulo.last_p = true;
    reg_exp.reg_secao.last_p = true;
    reg_exp.reg_subsecao.last_p = true;
    reg_exp.reg_livro.last_p = true;



  //alert(paragraphs.length);
    //var art1 = document.querySelector('p:startsWith("Art. 1º")');
    var livro = document.createElement('div');
    var corpo_lei = document.createElement('div');
    var capitulo = document.createElement('div');
    var secao = document.createElement('div');
    var subsecao = document.createElement('div');
    var artigo = document.createElement('div');
    var paragrafo = document.createElement('div');
    var inciso = document.createElement('div');
    var item = document.createElement('div');
    var alinea = document.createElement('div');
    //art1.parentNode.insertBefore(art1, law_div);

    // Properties
    corpo_lei.classList.add('corpo_lei');
    capitulo.classList.add('grupo','capitulo');
    secao.classList.add('grupo','secao');
    subsecao.classList.add('grupo','subsecao');
    artigo.classList.add('grupo','artigo');
    paragrafo.classList.add('grupo','paragrafo');
    inciso.classList.add('grupo','inciso');
    item.classList.add('grupo','item');
    alinea.classList.add('grupo','alinea');

    // Move all elements to div
    // Cria uma nova div
    var novaDiv = document.createElement('div');

    // Obtém uma referência ao body
    var body = document.body;

    // Enquanto o body ainda tiver um elemento filho
    while (body.firstChild) {
        // Mova o primeiro elemento filho do body para a nova div
        novaDiv.appendChild(body.firstChild);
    }

    // Adicione a nova div ao body
    body.appendChild(novaDiv);

    novaDiv.classList.add('corpo');

     var paragraphs = document.getElementsByTagName('p');
    //var spans = document.getElementsByTagName('span');
    //var fonts = document.getElementsByTagName('font');



    var comeco_corpo = null;
    for (let i = 0; i < paragraphs.length; i++) {
        let last_p = paragraphs[i-1]
        let p = paragraphs[i];

        if(comeco_corpo === null) {
            if (p.innerText.startsWith('Art. 1º')) {
                comeco_corpo = p;
                //console.log(art_1o.innerText);
                p.parentNode.insertBefore(corpo_lei, p);
            } else if(p.innerText.startsWith('CAPÍTULO')){
                comeco_corpo = p;
                //console.log(art_1o.innerText);
                p.parentNode.insertBefore(corpo_lei, p);
            } else if(p.innerText.startsWith('TÍTULO')){
                comeco_corpo = p;
                //console.log(art_1o.innerText);
                p.parentNode.insertBefore(corpo_lei, p);
            } else if(p.innerText.startsWith('LIVRO')){
                comeco_corpo = p;
                //console.log(art_1o.innerText);
                p.parentNode.insertBefore(corpo_lei, p);
            }
        }

        if(comeco_corpo !== null){
        if (p.innerText.match(reg_exp.reg_artigo.reg)) {
            p.classList.add('p','planalto_artigo');
            var art = artigo.cloneNode();
            p.parentNode.insertBefore(art, p);
            art.appendChild(p);
            corpo_lei.appendChild(art);
        } else if (p.innerText.match(reg_exp.reg_livro.reg)) {
            //let last_p = paragraphs[i-1]
            //p.classList.add('p','planalto_paragrafo');
            p.classList.add('p','planalto_paragrafo');
            var liv = livro.cloneNode();
            p.parentNode.insertBefore(liv, p);
            liv.appendChild(p);
            corpo_lei.appendChild(liv);
            if (last_p.innerText.match(reg_exp.reg_livro.reg)) liv.appendChild(last_p);
        } else if (p.innerText.match(reg_exp.reg_capitulo.reg)) {
            //let last_p = paragraphs[i-1];
            p.classList.add('p','planalto_capitulo');
            var cap = secao.cloneNode();
            p.parentNode.insertBefore(cap, p);
            cap.appendChild(p);
            corpo_lei.appendChild(cap);
            if (last_p.innerText.match(reg_exp.reg_capitulo.reg)) cap.appendChild(last_p);
        } else if (p.innerText.match(reg_exp.reg_subsecao.reg)) {
            //let last_p = paragraphs[i-1];
            p.classList.add('p','planalto_subsecao');
            var subsec = subsecao.cloneNode();
            p.parentNode.insertBefore(subsec, p);
            subsec.appendChild(p);
            corpo_lei.appendChild(subsec);
            if (last_p.innerText.match(reg_exp.reg_subsecao.reg)) subsec.appendChild(last_p);
        } else if (p.innerText.match(reg_exp.reg_titulo.reg)) {
            //let last_p = paragraphs[i-1];
            p.classList.add('p','planalto_titulo');
            var tit = subsecao.cloneNode();
            p.parentNode.insertBefore(tit, p);
            tit.appendChild(p);
            corpo_lei.appendChild(tit);
            if (last_p.innerText.match(reg_exp.reg_titulo.reg)) tit.appendChild(last_p);
        } else if (p.innerText.match(reg_exp.reg_secao.reg)) {
            //let last_p = paragraphs[i-1];
            p.classList.add('p','planalto_paragrafo');
            var sec = subsecao.cloneNode();
            p.parentNode.insertBefore(sec, p);
            sec.appendChild(p);
            corpo_lei.appendChild(sec);
            if (last_p.innerText.match(reg_exp.reg_secao.reg)) sec.appendChild(last_p);
        } else if (p.innerText.match(reg_exp.reg_paragrafo.reg)) {
            p.classList.add('p','planalto_paragrafo');
            var par = paragrafo.cloneNode();
            p.parentNode.insertBefore(par, p);
            par.appendChild(p);
            art.appendChild(par);
        } else if (p.innerText.match(reg_exp.reg_inciso.reg)) {
            //let last_p = paragraphs[i-1];
            p.classList.add('p','planalto_inciso');
            var inc = inciso.cloneNode();
            p.parentNode.insertBefore(inc, p);
            inc.appendChild(p);
            if (last_p.classList.contains('planalto_paragrafo')){
                p.classList.add('planalto_paragrafo');
                par.appendChild(inc);
            } else{
                art.appendChild(inc);
            }
        } else if (p.innerText.match(reg_exp.reg_alinea.reg)) {
            p.classList.add('p','planalto_alinea');
            var al = alinea.cloneNode();
            p.parentNode.insertBefore(al, p);
            al.appendChild(p);
            it.appendChild(al);
        } else if (p.innerText.match(reg_exp.reg_item.reg)) {
            p.classList.add('p','planalto_item');
            var it = item.cloneNode();
            p.parentNode.insertBefore(it, p);
            it.appendChild(p);
            inc.appendChild(it);
        } else {
            p.classList.add('p');
            //var excecao = item.cloneNode();
            corpo_lei.appendChild(p);
            //it.appendChild(p);
            //inc.appendChild(it);
        }
      }
    }
      //console.log(p.innerText);


/*
  const my_css = GM_getResourceText("IMPORTED_CSS");
  GM_addStyle(my_css);



    //document.body.appendChild(law_div);
  // Your code here...*/


})();
