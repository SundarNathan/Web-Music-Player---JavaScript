
let idx=-1;
let songs=[];

// console.log(document.querySelector(".audioplayer"));

document.querySelector(".folder-input").addEventListener('change', function (event) {

    let nofile= document.querySelector(".nofiles")
    // no
    if(nofile!=null)
    nofile.remove();
    const fileList = event.target.files;
    const songList = document.querySelector(".songs");
    const audioPlayer = document.querySelector(".audioplayer");

    const formats = ['.mp3', '.m4a', '.wav'];

    let addnsong=Array.from(fileList).filter(file =>
        formats.some(format => file.name.endsWith(format))
    )
    let oldlen=songs.length
    songs.push(...(addnsong));

    if (addnsong.length === 0 ) {

        let div=document.createElement('div')
        alert("no songs were found")
        // div.className="nofiles";
        
        // songList.appendChild(div);
        
        return;
    }
    

    addnsong.forEach((song, index) => {
        const songDiv = document.createElement('div');
        songDiv.textContent = song.name;
        songDiv.dataset.index = index+oldlen;
        console.log(songDiv.dataset.index)
        
        songDiv.addEventListener('click', (event) => {

            const fileURL = URL.createObjectURL(song);
            let selectedChild = document.querySelector(`.songs [data-index="${idx}"]`);
            if(selectedChild)
            selectedChild.classList.remove("selectedSong")

            idx= index;
            selectedChild = document.querySelector(`.songs [data-index="${idx}"]`);
            if(selectedChild)
            selectedChild.classList.add("selectedSong")
            audioPlayer.src = fileURL;
            play();
        });

        songList.appendChild(songDiv);
        console.log(songs)
    });
});




function pause(){
 
    document.getElementById('pause').style.display='none'
    
    document.getElementById('play').style.display = 'inline';
    document.querySelector('.audioplayer').pause();
    
}

function play(){
    document.getElementById('play').style.display='none';

    document.getElementById('pause').style.display = 'inline';
    document.querySelector('.audioplayer').play();
    
}

document.getElementById("previous").addEventListener('click',function(){
   
    console.log("clicking")
    let selectedChild = document.querySelector(`.songs [data-index="${idx}"]`);
    if(selectedChild)
    selectedChild.classList.remove("selectedSong")
    
    if(songs.length>0)
    {
    if(idx-1>=0)
        idx--;
    else
        idx=songs.length-1;
    
         // Set the desired index value
    let selectedChild = document.querySelector(`.songs [data-index="${idx}"]`);
    if(selectedChild)
    selectedChild.classList.add("selectedSong")
    

    const audioPlayer = document.querySelector(".audioplayer");
    const fileURL= URL.createObjectURL(songs[idx]);
    audioPlayer.src=fileURL;
    play();}
    else
    alert("No songs Found");

})

let audioPlayer= document.querySelector(".audioplayer")
let progBar= document.querySelector('.progress-bar')

progBar.addEventListener('click',(event)=>{

    audioPlayer.currentTime= (event.offsetX/progBar.offsetWidth)*audioPlayer.duration
})

audioPlayer.addEventListener('timeupdate',function(){
    let perc=(audioPlayer.currentTime/audioPlayer.duration)*100;
    
    document.querySelector('.progress-filled').style.width=`${perc}%`;
    let tr=formatTime(audioPlayer.currentTime)
    let tt=formatTime(audioPlayer.duration)
    document.querySelector('.time').textContent=`${tr}/${tt}`;
})  

function formatTime(seconds){   
    const mins= Math.floor(seconds/60)
    const sec= Math.floor(seconds%60)
    return `${mins}:${sec<10?'0':''}${sec}`
}
document.getElementById("next").addEventListener('click',function(){   
    
    let selectedChild = document.querySelector(`.songs [data-index="${idx}"]`);
    if(selectedChild)
    selectedChild.classList.remove("selectedSong")

    if(songs.length>0)
    {
    if(idx+1<songs.length)
        idx++;
    else
        idx=0;

        let selectedChild = document.querySelector(`.songs [data-index="${idx}"]`);
        if(selectedChild)
        selectedChild.classList.add("selectedSong")
        
    const audioPlayer = document.querySelector(".audioplayer");
    const fileURL= URL.createObjectURL(songs[idx]);
    audioPlayer.src=fileURL;
    play();}
    else
    alert("No songs Found");

})

document.getElementById("file-button").addEventListener('click', function(){

    document.querySelector('.folder-input').click();
    
})

document.addEventListener('keydown',(e)=>{

    console.log('play '+e.code);
    
    if(e.code==='Space')
    {
        e.preventDefault();
        
        if(audioPlayer.paused)
            {document.getElementById('play').click();
                
            }
        else
            {document.getElementById('pause').click();}
    }

    if(e.code==='ArrowRight')
    {
        e.preventDefault();
        document.getElementById("next").click();
    }

    if(e.code==='ArrowLeft')
    {
        e.preventDefault();
        document.getElementById("previous").click();
    }
})





