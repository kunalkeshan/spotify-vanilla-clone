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
};

const playerHead = document.getElementById("player");
let playBtn = document.getElementById("playBtn");
let pauseBtn = document.getElementById("pauseBtn");
let cardCollection = document.querySelectorAll(".card__collection_main");
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
        likeSong(likeBtn.id, likeBtn, name);
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

const likeSong = (id, likeBtn, songName) => {
    cardCollection = document.querySelectorAll(".card__collection_main");
    let likedSongs = cardCollection[0].children;
    likedSongs = Array.from(likedSongs);

    if(songs[id].liked){
        songs[id].liked = false;
        likeBtn.style.color = "grey";
        likedSongs.forEach(songCard => {
            const name = songCard.lastChild.firstChild.innerHTML;
            if(name == songName){
                songCard.style.display = "none";
                songCard.remove();
            }
        });
    } else {
        songs[id].liked = true;
        likeBtn.style.color = "red";
        cardCollection[0].append(createCard(songs[id]));
    }
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

    card.onclick = function(event){
        playerHead.style.display = "flex";
        currentSong = updatePlayer(song);
        playPauseFunc(currentSong);
    }

    return card;
}

const updateCollection = () => {
    cardCollection = document.querySelectorAll(".card__collection_main");
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
    updateCollection();
})