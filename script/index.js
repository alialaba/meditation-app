const app = () => {
    const song = document.querySelector(".song");
    const play = document.querySelector(".play");
    const outline = document.querySelector(".moving-outline circle");
    const video = document.querySelector(".vid-container video");

    //sounds
    const sounds = document.querySelectorAll(".sound-picker button");
    //time display
    const timeDisplay = document.querySelector(".time-display");
    const timeSelect = document.querySelectorAll(".time-select button");
    //get the length of the outline
    const outlineLength = outline.getTotalLength();
    // console.log(outlineLength)
    //duration
    let fakeDuration = 600;
    //styling the moving outline for filling
    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;
    //pick different sounds
    sounds.forEach((sound) => {
            sound.addEventListener("click", function() {
                song.src = this.getAttribute("data-sound");
                video.src = this.getAttribute("data-video");
                checkPlaying(song);
            })
        })
        //play sound
    play.addEventListener("click", () => {
        checkPlaying(song);
    })

    //how to select duration
    //select sound
    timeSelect.forEach((option) => {
        option.addEventListener("click", function() {
            fakeDuration = this.getAttribute("data-time");
            timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}: ${Math.floor(fakeDuration % 60)}`;

        })
    })
    const checkPlaying = song => {
            if (song.paused) {
                song.play();
                video.play();
                play.src = "./svg/pause.svg";
            } else {
                song.pause();
                video.pause();
                play.src = "./svg/play.svg";
            }
        }
        //animate the circle;
    song.ontimeupdate = () => {
        //variable for current time
        let currentTime = song.currentTime;
        //variable for tiem elapse
        let elapsed = fakeDuration - currentTime;
        //checking it by minutes and seconds and we used Math.floor to get flat number e.g 1 instead of 1.25(main value) 
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);

        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;
        //setting the timeer
        timeDisplay.textContent = `${minutes}:${seconds}`;
        //stoping the play
        if (currentTime >= fakeDuration) {
            song.pause();
            song.currentTime = 0;
            play.src = "./svg/play.svg";
            video.pause();
        }

    }

}
app()