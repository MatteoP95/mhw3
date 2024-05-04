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



// sezione bottoni espandibili

const bottone_uno=document.querySelector("#bottone-uno");
const bottone_due=document.querySelector("#bottone-due");

bottone_uno.addEventListener("click", onClick);
bottone_due.addEventListener("click", onClick);


// const bottoni=document.querySelectorAll(".bottone_espansore");

// for(let x=0; x<bottoni.length; x++ ){ //come farlo funzionare?
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



//ricardo section

const ricardo_button=document.querySelector("#ricardo");
ricardo_button.addEventListener("click", ricardo_function);

const ricardo_img=document.createElement('img');
ricardo_img.setAttribute('src', 'https://media.giphy.com/media/IfrfAy8zbHnPfUIWki/giphy.gif?cid=790b7611prqky8etsfbeb81ye3bz4ydznxnassu6ywog3w71&ep=v1_gifs_search&rid=giphy.gif&ct=g')


function ricardo_function(event){
    console.log("RICARDO");

    const ricardo=event.currentTarget;

    ricardo.parentNode.appendChild(ricardo_img); 

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



// richieste API
function ricerca(event){
    event.preventDefault();

    const tipo = document.querySelector("#tipone").value;
    richiesta = endpoint_dnd + tipo + "/multi-classing";

    fetch(richiesta).then(onResponse).then(onJson);
}

function onResponse(response){
    console.log('Risposta ricevuta');

    return response.json();
}

function onJson(json){

    console.log(json);
    const container = document.querySelector("#risultati-multiclassing");

    let prerequisiti = json.prerequisites;

    container.innerHTML="";

    if(prerequisiti){
        console.log(prerequisiti);

        const elemento = document.createElement('div');
        elemento.classList.add('testo');

        elemento.textContent="serve: "
        container.appendChild(elemento);

        for(let prerequisito of prerequisiti){
            const elemento = document.createElement('div');
            elemento.classList.add('testo');

            if(prerequisito.ability_score.name==="DEX"){
                prerequisito.ability_score.name="Destrezza"
            }
            else if(prerequisito.ability_score.name==="CHA"){
                prerequisito.ability_score.name="Carisma"
            }
            else if(prerequisito.ability_score.name==="WIS"){
                prerequisito.ability_score.name="Saggezza"
            }
            else if(prerequisito.ability_score.name==="STR"){
                prerequisito.ability_score.name="Forza"
            }
            else if(prerequisito.ability_score.name==="INT"){
                prerequisito.ability_score.name="Intelligenza"
            }

            elemento.textContent=prerequisito.ability_score.name + " >= " + prerequisito.minimum_score;
            container.appendChild(elemento);
        }
    }
    else {
        prerequisiti=json.prerequisite_options.from.options;
        console.log(prerequisiti);

        const elemento = document.createElement('div');
        elemento.classList.add('testo');

        elemento.textContent="scegli "+ json.prerequisite_options.choose +" tra:";
        container.appendChild(elemento);

        for(let prerequisito of prerequisiti){
            const elemento = document.createElement('div');
            elemento.classList.add('testo');
            

            if(prerequisito.ability_score.name==="DEX"){
                prerequisito.ability_score.name="Destrezza"
            }
            else if(prerequisito.ability_score.name==="CHA"){
                prerequisito.ability_score.name="Carisma"
            }
            else if(prerequisito.ability_score.name==="WIS"){
                prerequisito.ability_score.name="Saggezza"
            }
            else if(prerequisito.ability_score.name==="STR"){
                prerequisito.ability_score.name="Forza"
            }
            else if(prerequisito.ability_score.name==="INT"){
                prerequisito.ability_score.name="Intelligenza"
            }

            elemento.textContent=prerequisito.ability_score.name + " >= " + prerequisito.minimum_score;
            container.appendChild(elemento);
        }
    }

}

const form = document.querySelector("#form");

form.addEventListener("submit", ricerca);

const endpoint_dnd = "https://www.dnd5eapi.co/api/classes/";

//-------------------------------------------------------------------------//
//oauth2.0

const client_id_spotify = '';
const client_secret_spotify = '';
const client_endpoint_spotify =  'https://accounts.spotify.com/api/token' ;
let token;

const canzoni_endpoint = 'https://api.spotify.com/v1/search?type=album&q=';


fetch(client_endpoint_spotify,{
   method: "post",
   body: 'grant_type=client_credentials',
   headers:{
    'Authorization': 'Basic ' + btoa(client_id_spotify + ':' + client_secret_spotify),
    'Content-Type': 'application/x-www-form-urlencoded'
   }
  }
).then(onTokenResponse).then(onTokenJson);

function onTokenResponse(response){
    return response.json();
}
function onTokenJson(json){

    token = json.access_token;
    console.log(token);
}



function onJsonSpotify(json){

    console.log("json ricevuto:");
    console.log(json);

    const library = document.querySelector('#contenuto_spotify');
    library.innerHTML = '';

    const risultati= json.albums.items;
    let num_risultati = risultati.length;

    for(let i=0; i<num_risultati; i++){
        const album_data= risultati[i];
        const immagine= album_data.images[0].url;
        const titolo = album_data.name;


        const album = document.createElement('div');
        album.classList.add('album');

        const img = document.createElement('img');
        img.src=immagine;

        const caption=document.createElement('span');
        caption.textContent=titolo;

        album.appendChild(img);
        album.appendChild(caption);
        library.appendChild(album);
    }

}

function onResponseSpotify(response){
    console.log("spotify risponde:");
    console.log(response);
    return response.json();
}

function ricerca_spotify(event){
    event.preventDefault();

    const input = document.querySelector("#input_spotify");
    const value = encodeURIComponent(input.value);
    
    fetch(canzoni_endpoint + value,{
            headers:{
                'Authorization': 'Bearer '+ token
            }
        }
    ).then(onResponseSpotify).then(onJsonSpotify);
}



const form_spotify = document.querySelector('#form_spotify');
form_spotify.addEventListener('submit', ricerca_spotify);
