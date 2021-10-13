// document.addEventListener('DOMContentLoaded', function() {

//     var playBtn = document.querySelector("#playBtn")
//     var PauseBtn = document.querySelector("#pauseBtn")
//     var music = new Audio('./assets/Eternal.mp3')
//     var like = document.querySelector("#like")
//     var likedSong = document.querySelector(".liked")

//     playBtn.addEventListener("click", () => {
//         music.play()
//         console.log("music is playing")
//         playBtn.style.display = "none"
//         PauseBtn.style.display = "inline"
//     })

//     PauseBtn.addEventListener("click", () => {
//         music.pause()
//         console.log("music stopped")
//         playBtn.style.display = "inline"
//         PauseBtn.style.display = "none"
//     })

//     like.addEventListener("click", () => {

//         if (like.style.color === "red") {
//             like.style.color = "grey"
//             likedSong.innerHTML = '<div> </div>'
//         } else {
//             like.style.color = "red"
//             likedSong.innerHTML = '<div class="card"> <img src="images/artist_image.jpeg" alt="Eternal">  <div class="card_info"> <p class="card_name">Eternal Youth</p> <p class="card_artist">RUDE</p> </div> </div>'

//         }
//     })

// });

const fetchData = async (url = "") => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

const updatePlayer = ({name, artist, location, image, liked, id}) => {
    const songContainer = document.querySelector(".song");
    const artistContainer = document.querySelector(".artist");
    const likeBtn = document.getElementById("like");
    const artistImage = document.querySelector(".artist_image");
    const endTime = document.getElementById("end_time")
    const song = new Audio(location);
    var duration = null;

    songContainer.innerHTML = name;
    artistContainer.innerHTML = artist;
    
    likeBtn.style.color = "grey";
    if(liked){
        likeBtn.style.color = "red";
    }
    artistImage.src = image;

    song.onloadedmetadata = () => {
        duration = song.duration;
        duration = (duration/60).toPrecision(3);
        endTime.innerHTML = duration + "";
    }
    
}

const createCard = (song) => {
    // const card = 
    // `<div class="card"> 
    //     <img src="${song.image}" alt="${song.name}">  
    //     <div class="card_info"> 
    //         <p class="card_name">${song.name}</p> 
    //         <p class="card_artist">${song.artist}</p> 
    //     </div> 
    // </div>`;
    const card = document.createElement("div");
    const img = document.createElement("img");
    const cardInfo = document.createElement("div");
    const cardName = document.createElement("p");
    const cardArtist = document.createElement("p");

    card.className = "card";
    cardInfo.className = "card_info";
    cardName.className = "card_name";
    cardArtist.className = "card_artist";

    cardName.innerHTML = song.name;
    cardArtist.innerHTML = song.artist;
    img.src = song.image;
    img.alt = song.name;

    cardInfo.append(cardName, cardArtist);
    card.append(img, cardInfo);

    card.onclick = function(){
        updatePlayer(song)
    }

    return card;
}

const updateCollection = (songs) => {
    const cardCollection = document.querySelectorAll(".card__collection_main");
    cardCollection.forEach((collection, index) => {
        if(index === 0){
            songs.forEach((song) => {
                if(song.liked){
                    collection.append(createCard(song));
                }
            })
        } else {
            songs.forEach((song) => {
                collection.append(createCard(song));
            });
        }

        if(index%2 !== 0){
            collection.classList.toggle("reverse")
        }
    })
}

document.addEventListener("DOMContentLoaded", async() => {
    const PATH = "./data/data.json";
    const {songs} = await fetchData(PATH);
    updateCollection(songs);
})