const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
//Empty array
let photosArray = [];

//Unsplash API
const count = 10;
const apiKey = '76BbMtpPf3odxJylAxw7t47Zctrm99ZKbV2oDXvDepg';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Helper Function to Set Attributes on Dom Elements
function setAttributes(element,attributes){
    for(const key in attributes){
        element.setAttribute(key,attributes[key]);
    }
}

//Check if all image is loaded
function imagesLoaded(){
    imageLoaded++;
    if(imageLoaded === totalImages){
        ready = true;
    }
}

//Create Element
function displayPhotos(){
    imageLoaded = 0;
    totalImages = photosArray.length;
    //Run function for each object in photoArray
    photosArray.forEach((photo) => {
        //Create <a> to link to Unsplash
        const item = document.createElement('a');
       // item.setAttribute('href',photo.links.html);
       // item.setAttribute('target','_blank');
       setAttributes(item,{
        href:photo.links.html,
        target: 'blank',
       });
        //Create <img> for photo
        const img = document.createElement('img');
        //img.setAttribute('src',photo.urls.regular);
        //img.setAttribute('alt',photo.alt_description);
       // img.setAttribute('title',photo.alt_description);
       setAttributes(img,{
        src:photo.urls.regular,
        alt: photo.alt_description,
        title: photo.alt_description,
       });
       //Event Listener,check when each is finished
      

        //Put <img> inside <a>,then put both image
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

//Get photos from Unsplash API
async function getPhotos(){
    try{
        const repsonse = await fetch(apiURL);
        photosArray = await repsonse.json();
        console.log(photosArray);
        displayPhotos();
    }catch(error){
        //Catch Error here
    }
}

//Check to see if scrolling near bottom of page,Load more photo
window.addEventListener('scroll',() => {
   if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000){
       ready = false;
       getPhotos();
   }
});

getPhotos();