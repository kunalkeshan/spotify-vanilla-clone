document.addEventListener('DOMContentLoaded', function() {

    var playBtn = document.querySelector("#playBtn")
    var PauseBtn = document.querySelector("#pauseBtn")
    var music = new Audio('assets/Eternal.mp3')
    var like = document.querySelector("#like")
    var likedSong = document.querySelector(".liked")

    playBtn.addEventListener("click", () => {
        music.play()
        console.log("music is playing")
        playBtn.style.display = "none"
        PauseBtn.style.display = "inline"
    })

    PauseBtn.addEventListener("click", () => {
        music.pause()
        console.log("music stopped")
        playBtn.style.display = "inline"
        PauseBtn.style.display = "none"
    })

    like.addEventListener("click", () => {

        if (like.style.color === "red") {
            like.style.color = "grey"
            likedSong.innerHTML = '<div> </div>'
        } else {
            like.style.color = "red"
            likedSong.innerHTML = '<div class="card"> <img src="images/artist_image.jpeg" alt="Eternal">  <div class="card_info"> <p class="card_name">Eternal Youth</p> <p class="card_artist">RUDE</p> </div> </div>'

        }
    })

})