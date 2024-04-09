// sezione barra di ricerca

const ricerca=document.createElement('input');
ricerca.type='text';

const lente= document.querySelector(".fa-solid fa-magnifying-glass")

function bottone_to_ricerca(event){
    console.log("ricerca attiva");


    bottone.appendChild(ricerca);
    bottone.removeEventListener("click", bottone_to_ricerca);
    ricerca.addEventListener("focusout", ricerca_to_bottone);
}

function ricerca_to_bottone(event){
    console.log("ritorno al default");



    ricerca.removeEventListener("focusout", ricerca_to_bottone);
    bottone.addEventListener("click", bottone_to_ricerca);
    ricerca.parentNode.removeChild(ricerca);
}

const bottone = document.querySelector("#bottone_ricerca");

bottone.addEventListener('click', bottone_to_ricerca);



// sezione logo variabile

// const dice_url='https://media.tenor.com/mgLvfJ4Zk5cAAAAi/jp-jamesperrett.gif';
//non funziona come parametro?

function appearingGif(event){
    console.log("bravo, ci sei sopra");

    const txtonimg=event.currentTarget;
    txtonimg.style.backgroundImage="url('https://media.tenor.com/mgLvfJ4Zk5cAAAAi/jp-jamesperrett.gif')";

    txtonimg.removeEventListener("mouseover", appearingGif);
    txtonimg.addEventListener("mouseout", disappearingGif);
}

function disappearingGif(event){
    console.log("bravo, sei uscito");

    const txtonimg=event.currentTarget;
    txtonimg.style.backgroundImage="url('immagini/Logo1.png')"

    txtonimg.removeEventListener("mouseout", disappearingGif);
    txtonimg.addEventListener("mouseover", appearingGif);
}

const logo=document.querySelector("#testo-su-immagine");

logo.addEventListener("mouseover", appearingGif);



// sezione bottoni

const bottone_uno=document.querySelector("#bottone-uno");
const bottone_due=document.querySelector("#bottone-due");

bottone_uno.addEventListener("click", onClick);
bottone_due.addEventListener("click", onClick);


// const bottoni=document.querySelectorAll(".bottone_espansore");

// for(let x=0; x<bottoni.length; x++ ){
//     bottoni[x]=addEventListener("click", onClick);
// } // //non conosce il dataset di un elemento dell'array



function onClick(event){

    const aux=event.currentTarget.dataset.button;

    const element = document.querySelector('[data-content="' + aux + '"]');

    console.log(element.dataset.context)

    if(element.className === "nascosto"){
        event.currentTarget.textContent="Clicca per nascondere:"+ element.dataset.context;
    }
    else{
        event.currentTarget.textContent="Clicca per espandere:"+ element.dataset.context;
    }

    element.classList.toggle('nascosto');
    element.classList.toggle('espanso');
    console.log(element.className);
}



// ricardo
//https://media.giphy.com/media/IfrfAy8zbHnPfUIWki/giphy.gif?cid=790b7611prqky8etsfbeb81ye3bz4ydznxnassu6ywog3w71&ep=v1_gifs_search&rid=giphy.gif&ct=g

const ricardo_button=document.querySelector("#ricardo");
ricardo_button.addEventListener("click", ricardo_function);
// ricardo_button.addEventListener("click", ricardo_ricardo);


const ricardo_img=document.createElement('img');
ricardo_img.setAttribute('src', 'https://media.giphy.com/media/IfrfAy8zbHnPfUIWki/giphy.gif?cid=790b7611prqky8etsfbeb81ye3bz4ydznxnassu6ywog3w71&ep=v1_gifs_search&rid=giphy.gif&ct=g')
// ricardo_img.src=url('https://media.giphy.com/media/IfrfAy8zbHnPfUIWki/giphy.gif?cid=790b7611prqky8etsfbeb81ye3bz4ydznxnassu6ywog3w71&ep=v1_gifs_search&rid=giphy.gif&ct=g
// ');

function ricardo_function(event){
    console.log("RICARDO");

    const ricardo=event.currentTarget;

    console.log(ricardo.parentNode.childNodes); //33

    ricardo.parentNode.appendChild(ricardo_img);
    
    console.log(ricardo.parentNode.childNodes); //34


    ricardo.removeEventListener("click", ricardo_function);
    ricardo.addEventListener("click", tooSexy);
}

function tooSexy(event){
    console.log("too hot to handle");

    const ricardo=event.currentTarget;

    ricardo.parentNode.removeChild(ricardo_img);
    ricardo.innerHTML="";

    ricardo.removeEventListener("click", tooSexy);
}

// function ricardo_ricardo(event){
//     console.log("RICARDO RICARDO");

//     const ricardo=event.currentTarget;

//     if(console.log(ricardo.parentNode.childElementCount)===33){ //ritorna 17?
//         ricardo.parentNode.appendChild(ricardo_img);
//     }
//     else{
//         ricardo.parentNode.removeChild(ricardo_img);
//         ricardo.innerHTML="";
//         ricardo.removeEventListener("click", ricardo_ricardo);
//     }

// }