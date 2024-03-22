// now we are going to give some functionality for play and pause our song
// Initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/Main agar Kahoon.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let masterSongInfo = document.getElementById('masterSongInfo');
let songItems = Array.from(document.getElementsByClassName('songItem'));
// here we are actually created an array which consists of all items as well as songs and their cover image in the songItemContainer.
let songs = [
    {songName:"Main Agar Kahoon",filePath:"songs/1.mp3", coverPath:"covers/main agar kahoon.jpg",singers:"Sonu Nigam, Shreya Ghoshal"},
    {songName:"Guzarish",filePath:"songs/2.mp3", coverPath:"covers/Guzarish.jpg",singers:"Javed Ali, Sonu Nigam"},
    {songName:"Dar Hai Tujhe Main ",filePath:"songs/3.mp3", coverPath:"covers/dar hai tujhe main.jpg",singers:"Arijit Singh,Tulsi Kumar"},
    {songName:"Bin Tere",filePath:"songs/4.mp3", coverPath:"covers/Bin Tere.jpg",singers:"Shafqat Amanat Ali, Sunidhi Chauhan"},
    {songName:"haa tu hai",filePath:"songs/5.mp3", coverPath:"covers/haa tu hai.jpg",singers:"K.K."},
    {songName:"Pashmeena",filePath:"songs/6.mp3", coverPath:"covers/Pashmeena.jpg",singers:"Amit Trivedi"},
    {songName:"Kun Faya Kun",filePath:"songs/7.mp3", coverPath:"covers/Kun Faya Kun.jpg",singers:"A.R. Rahman, Javed Ali, Mohit Chauhan"},
    {songName:"Sukranallah",filePath:"songs/8.mp3", coverPath:"covers/Sukranallah.jpg",singers:"Salim Merchant,Sonu Nigam, Shreya Ghoshal"},
    {songName:"Jaanam Dekh Lo",filePath:"songs/9.mp3", coverPath:"covers/Janam Dekh lo mit gayi dooriyan.jpg",singers:"Udit Narayan"},
    {songName:"Yuhi Chala chal rahi",filePath:"songs/10.mp3", coverPath:"covers/yuhi chala chal rahi.jpg",singers:"Udit Narayan, Hariharan, Kailash Kher"}
];
// here we are fetching all the items of an array to their specific position.
songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 
// audioElement.play()
// now we have to give the functionality for play and pause
function updateSongItemPlayIcon(isPlaying) {
    // Get the song item corresponding to the current song index
    let songItem = document.getElementById(songIndex.toString());
    if (songItem) {
        let playIcon = songItem.querySelector('.songItemPlay');
        if (playIcon) {
            // Update the class based on whether the song is playing or not
            playIcon.classList.remove(isPlaying ? 'fa-play-circle' : 'fa-pause-circle');
            playIcon.classList.add(isPlaying ? 'fa-pause-circle' : 'fa-play-circle');
        }
    }
}
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        // here afer playing the song we have to remove the play icon and add the pause icon.
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1; // here the player icon is active when the song is playing.
        updateSongItemPlayIcon(true);
    }
    else{
        // here we have to pause the audio if the audio is already playing.
        audioElement.pause();
        // here afer playing the song we have to remove the play icon and add the pause icon.
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0; // here the player icon is inactive when the song is stop playing.
        updateSongItemPlayIcon(false);

    }
    // Call the function to update the play/pause icon in the song item
    updateSongItemPlayIcon(audioElement.paused || audioElement.currentTime <= 0);
    
})

//Listen to events
audioElement.addEventListener('timeupdate',()=>{
    //handle the seekbar
     progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
     myProgressBar.value = progress;
})
// here we have to seek our audio means if we update the progress bar then the audio is automatically updated to that current position.
myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerHTML = songs[songIndex].songName + ' - ' + songs[songIndex].singers;  // here i have wrote this line of code because if any user picked a random song then the song title as well as song artist details also changes.
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        
    })
})
function playNextSongs(startIndex) {
    for (let i = startIndex + 1; i < songs.length; i++) {
        // Set a timeout to play each song after a delay
        setTimeout(() => {
            audioElement.src = `songs/${i+1}.mp3`;
            masterSongName.innerHTML = songs[i].songName + ' - ' + songs[i].singers;
            audioElement.currentTime = 0;
            audioElement.play();
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
        }, (i - startIndex) * 1000); // Adjust the delay as needed
    }
}
document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=9){
        songIndex = 0;
    }
    else{
       songIndex +=1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName + ' - ' + songs[songIndex].singers; // here i have wrote this line of code because if any user picked a random song then the song title as well as song artist details also changes.
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex = 0;
    }
    else{
       songIndex -=1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerHTML = songs[songIndex].songName + ' - ' + songs[songIndex].singers;  // here i have wrote this line of code because if any user picked a random song then the song title as well as song artist details also changes.
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})