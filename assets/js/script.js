/* Globali */
var prezzoAttuale=document.getElementById('prezzoAttuale')
var primaofferta=document.getElementById('primaOfferta');
var secondaOfferta = document.getElementById('secondaOfferta');
var terzaOfferta = document.getElementById('terzaOfferta');
var itemAmount=document.getElementById('itemAmount');
var btnRemove=document.getElementById('remove');
var btnAdd=document.getElementById('add');
var btnPreferiti=document.getElementById('iconButton');
var btnaddCart=document.getElementById('addCart');
var topProduct=document.getElementById('top_product');
var centerProduct=document.getElementById('center_product');
var bottomProduct=document.getElementById('bottom_product');
var topPrice=document.getElementById('top_price');
var centerPrice=document.getElementById('center_price');
var bottomPrice=document.getElementById('bottom_price');
var prezzoListino=document.getElementById('prezzo-listino');
var sconto=document.getElementById('sconto');
var tabUno=document.getElementById('tab_1');
var tabDue=document.getElementById('tab_2');
var tabTre=document.getElementById('tab_3');
var risparmio=document.querySelector('.risparmio');
var prezzo=0;
var offer_1;
var offer_2;
var offer_3;
/* Inizializzazione */
window.addEventListener('load', ()=>{
    topPrice.innerHTML=25.50;
    centerPrice.innerHTML=(27.20).toFixed(2);
    bottomPrice.innerHTML=33.75;
    prezzoListino.innerHTML= prezzo.toFixed(2);
    prezzoAttuale.innerHTML=prezzo;
    risparmio.classList.remove('risparmio');
    btnAdd.disabled=true; 
    btnRemove.disabled=true;
    addCart.disabled=true; 
    sconto.innerHTML='';
    offer_1=false;
    offer_2=false
    offer_3=false;
});
/* Prima card */
topProduct.addEventListener('click', ()=>{
    offer_1=true;
    offer_2=false
    offer_3=false;
    setting();
    let prezzo=30;
    prezzoListino.innerHTML= prezzo.toFixed(2);
    let prezzo_primo_tab=22.95;
    let prezzo_secondo_tab=21.68;
    let prezzo_terzo_tab=20.40;
    scontaTab(prezzo_primo_tab,prezzo_secondo_tab, prezzo_terzo_tab);
    let prezzo_listino=prezzoListino.innerHTML;
    let scontistica=15;
    getPrice(scontistica, prezzo_listino);
    let heading_uno=document.getElementById('heading_uno');
    setHeading(heading_uno.innerHTML);
});
/* Seconda card */
centerProduct.addEventListener('click', ()=>{
    offer_1=false;
    offer_2=true;
    offer_3=false;
    setting();
    let prezzo=40;
    prezzoListino.innerHTML= prezzo.toFixed(2);
    let prezzo_primo_tab=24.48;
    let prezzo_secondo_tab=23.12;
    let prezzo_terzo_tab=21.76;
    scontaTab(prezzo_primo_tab, prezzo_secondo_tab, prezzo_terzo_tab);
    let prezzo_listino=prezzoListino.innerHTML;
    let scontistica=32;
    getPrice(scontistica, prezzo_listino);
    let heading_due=document.getElementById('heading_due');
    setHeading(heading_due.innerHTML);
    
});
/* Terza card */
bottomProduct.addEventListener('click', ()=>{
    offer_1=false;
    offer_2=false;
    offer_3=true;
    setting();
    let prezzo=45;
    prezzoListino.innerHTML= prezzo.toFixed(2);
    let prezzo_primo_tab=30.38;
    let prezzo_secondo_tab=28.69;
    let prezzo_terzo_tab=27.00;
    scontaTab(prezzo_primo_tab,prezzo_secondo_tab, prezzo_terzo_tab);
    let prezzo_listino=prezzoListino.innerHTML;
    let scontistica=25;
    getPrice(scontistica, prezzo_listino);
    let heading_tre=document.getElementById('heading_tre');
    setHeading(heading_tre.innerHTML);
});
/* Set nome Articolo dentro il carrello*/
setHeading=(heading)=>{
    let articoloName=document.getElementById('articolo_name');
    articoloName.innerHTML=heading;
}

/* Calcolo prezzo e sconto su tab offerte */
/* Tab Sinistra */
primaofferta.addEventListener('click', ()=>{
    itemAmount.value=3;
    prezzoAttuale.innerHTML=tabUno.innerHTML;
    sconto.innerHTML= -10 + '%';
   
});
/* Tab Centrale */
secondaOfferta.addEventListener('click', ()=>{
    itemAmount.value=4;
    prezzoAttuale.innerHTML=tabDue.innerHTML;
    sconto.innerHTML= -15 + '%';
});
/* Tab Destra */
terzaOfferta.addEventListener('click', ()=>{
    itemAmount.value=5;
    prezzoAttuale.innerHTML=tabTre.innerHTML;
    sconto.innerHTML= -20 + '%';
});

/* Decrementa quantità prodotto */
btnRemove.addEventListener('click', ()=>{
    values=itemAmount.value;
    values>=2 ? (values--) + itemAmount.value===values : 1 ;
    itemAmount.value=values;
    scegliOfferta(values);
});
/* Aumenta quantità prodotto */
btnAdd.addEventListener('click', ()=>{
    values=itemAmount.value;
    values++;
    itemAmount.value=values;
    scegliOfferta(values);
    
});

/* Aggiungi ai preferiti */
btnPreferiti.addEventListener('click',()=>{
    btnPreferiti.classList.toggle('text-danger');
});

/* Visualizzazione carrello vendita */
btnaddCart.addEventListener('click', ()=>{
    let totale= document.getElementById('totale');
    let amount=document.getElementById('amount');
    let calcolo=calcolaTotale(prezzoAttuale.innerHTML, itemAmount.value);
    amount.innerHTML=+itemAmount.value;
    totale.innerHTML=calcolo + ' €.';
});

/* Calcolo prezzo iniziale scontato, da listino*/
getPrice=(scontistica,listino)=>{
    prezzoAttuale.innerHTML= (listino - (listino*scontistica)/100+0.0001).toFixed(2);
    sconto.innerHTML=scontistica + '%';
}
/* Calcolo totale su carrello vendita */
calcolaTotale=(prezzo, amount)=>{
    return amount !==3 || amount !==4 || amount !==5 ? (prezzo * amount).toFixed(2)
    : amount===3 ? (prezzo* 3) : amount===4 ? (prezzo * 4) : amount===5 ? (prezzo * 5): false   
}

/* Visualizzazione prezzo attuale*/
offers=(price, discount)=>{
    prezzo=Number(price);
    prezzoAttuale.innerHTML=(prezzo - (prezzo*discount)/100+ 0.0001).toFixed(2);
}
/* Scorrimento Offerte in base all'articolo scelto*/
scegliOfferta=(values)=>{
  offer_1 ? selectOffers(topPrice.innerHTML, values) : offer_2 ? 
  selectOffers(centerPrice.innerHTML, values): offer_3 ? selectOffers(bottomPrice.innerHTML, values) 
  : false  
}

selectOffers=(type_price, values)=>{
     values===1 || values ===2 ? defaultOffer(type_price) :
     values ===3 ? offers(type_price, 10) : values ===4 ? offers(type_price, 15)
     : values===5 ? offers(type_price, 20) : false;
}

/* Offerta non selezionate, prezzo di default in base all'articolo scelto */
defaultOffer=(type_price)=>{
     prezzoAttuale.innerHTML=Number(type_price).toFixed(2);
}
/* Visualizza sconto su tabs */
scontaTab=(prezzo1, prezzo2, prezzo3)=>{
    tabUno.innerHTML= (prezzo1).toFixed(2);
    tabDue.innerHTML= (prezzo2).toFixed(2);
    tabTre.innerHTML= (prezzo3).toFixed(2);
}
/* Se chiamata disabilita impostazione iniziale card destra */
setting=()=>{
    btnAdd.disabled=false; 
    btnRemove.disabled=false;
    addCart.disabled=false; 
    risparmio.classList.add('risparmio');
    itemAmount.value=1;
}