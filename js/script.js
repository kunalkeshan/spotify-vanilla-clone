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

const {songs} = {
    "songs": [
        {
            "name": "Eternal Youth",
            "artist": "Rude",
            "location": "./assets/Eternal.mp3",
            "image": "./images/artist_image.jpeg",
            "liked": true,
            "id": 0
        },
        {
            "name": "Never Gonna Give You Up",
            "artist": "Rick Astely",
            "location": "./assets/NGGYU.mp3",
            "image": "./images/content/nggyp.jpg",
            "liked": false,
            "id": 1
        },
        {
            "name": "Keeping It",
            "artist": "Sou",
            "location": "./assets/keepingIt.mp3",
            "image": "./images/content/keepingIt.png",
            "liked": false,
            "id": 2
        },
        {
            "name": "Eye of the Tiger",
            "artist": "Surviour",
            "location": "./assets/eyeTiger.mp3",
            "image": "./images/content/survivor.jpg",
            "liked": false,
            "id": 3
        },
        {
            "name": "Kenny G Collection",
            "artist": "Kenny G",
            "location": "./assets/kenny.mp3",
            "image": "./images/content/kennyg.jpg",
            "liked": false,
            "id": 4
        },
        {
            "name": "Noctornal",
            "artist": "The Midnight",
            "location": "./assets/noctornal.mp3",
            "image": "./images/content/noctornal.jpg",
            "liked": true,
            "id": 5
        },
        {
            "name": "Unravel",
            "artist": "TK",
            "location": "./assets/unravel.mp3",
            "image": "./images/content/unravel.jpg",
            "liked": false,
            "id": 6
        }
    ]
}

let playBtn = document.getElementById("playBtn");
let pauseBtn = document.getElementById("pauseBtn");
const playerHead = document.getElementById("player");
let currentSong = new Audio();

playerHead.style.display = "none"

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

    playBtn = document.getElementById("playBtn");
    pauseBtn = document.getElementById("pauseBtn");

    currentSong.setAttribute("src", location);

    const songContainer = document.querySelector(".song");
    const artistContainer = document.querySelector(".artist");
    const likeBtn = document.querySelector(".likeBtn");
    const artistImage = document.querySelector(".artist_image");
    const endTime = document.getElementById("end_time");
    

    songContainer.innerHTML = name;
    artistContainer.innerHTML = artist;
    artistImage.src = image;

    currentSong.pause();
    currentSong.currentTime = 0;

    currentSong.onloadedmetadata = () => {
        let duration = currentSong.duration;
        duration = (duration/60).toPrecision(3);
        endTime.innerHTML = duration + "";
    }
    
    likeBtn.id = id;
    likeBtn.style.color = "grey";
    if(liked){
        likeBtn.style.color = "red";
    }
    likeBtn.onclick = function () {
        likeSong(likeBtn.id, likeBtn);
    }    

    playBtn.style.display = "inline";
    pauseBtn.style.display = "none";

    return currentSong;
}

const playPauseFunc = (song) => {
    playBtn = document.getElementById("playBtn");
    pauseBtn = document.getElementById("pauseBtn");
    playBtn.addEventListener("click", () => {
        song.play();
        playBtn.style.display = "none";
        pauseBtn.style.display = "inline";
    });
    pauseBtn.addEventListener("click", () => {
        song.pause();
        playBtn.style.display = "inline";
        pauseBtn.style.display = "none";
    });
}

const likeSong = (id, likeBtn) => {
    const cardCollection = document.querySelectorAll(".card__collection_main");
    const likedSongs = cardCollection[0].childNodes

    songs.forEach((song, index) => {
        if(song.id == id){
            if(song.liked){
                song.liked = false;
                likeBtn.style.color = "grey";
            } else {
                song.liked = true;
                likeBtn.style.color = "red";
            }
            likedSongs.forEach(songCard => {
                if(songCard.hasChildNodes()){
                    console.log(song.name)
                    const name = songCard.lastChild.firstChild.innerHTML
                    if(name != song.name){
                        cardCollection[0].append(createCard(song));
                    } else {
                        songCard.style.display = "none";
                        songCard.remove();
                    }
                }
            });
        }
    })
    // if(likeBtnColor === "red"){
    //     likeBtn.style.color = "grey";
    // } else {
    //     likeBtn.style.color = "red";
    // }
}

const createCard = (song) => {
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
        playerHead.style.display = "flex";
        currentSong = updatePlayer(song);
        playPauseFunc(currentSong);
    }

    return card;
}

const updateCollection = () => {
    const cardCollection = document.querySelectorAll(".card__collection_main");
    cardCollection.forEach((collection, index) => {
        if(index === 0){
            songs.forEach((song) => {
                if(song.liked){
                    collection.append(createCard(song))
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
    // const PATH = "./data/data.json";
    // const {songs} = await fetchData(PATH);
    updateCollection();

})