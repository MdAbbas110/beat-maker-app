//cunstructor class properties
class Drumkit{
    constructor(){
        this.pads = document.querySelectorAll('.pad');
        this.playbtn = document.querySelector('.play')
        this.currentKick = "./sound/acoustic-open-hi-hat.wav";
        this.currentSnare = "./sound/hip-hop-classic-kick_E_major.wav";
        this.curretHihat = "./sound/heavy-kick_E.wav";
        this.kickAudio = document.querySelector('.kick-sound');
        this.snareAudio = document.querySelector('.snare-sound');
        this.hihatAudio = document.querySelector('.hihat-sound');
        this.index = 0;
        this.bpm = 150;
        this.isPlaying;
        this.selects = document.querySelectorAll('select');
        this.muteBtn = document.querySelectorAll('.mute');
        this.tempoSilder = document.querySelector('.tempo-slider');
    }
    activePad(){
        this.classList.toggle('active');//in css the class of active is there so working 
    }
    //repeat method that when the effect ends it will start agin kind of a loop here
    repeat(){
        let step = this.index % 8;
        const activeBars = document.querySelectorAll(`.b${step}`); 
        //LOOP over the pads
        activeBars.forEach(bar =>{
            bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`
            //check if pads are active of all those 3
            if(bar.classList.contains('active')){
                //check each sound
                if(bar.classList.contains('kick-pad')){
                    this.kickAudio.currentTime = 0; //it will start the time of actual audio tracks
                   this.kickAudio.play();
                }
                if(bar.classList.contains('snare-pad')){
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play(); 
                 }
                 if(bar.classList.contains('hihat-pad')){
                    this.hihatAudio.currentTime = 0;
                    this.hihatAudio.play(); 
                 }
            }
        })
        this.index++;
    }
    start(){
        const interval = (60/this.bpm)*1000;
        //it will check the state if not playing it will set it to null
        if(this.isPlaying){ 
            //clear the interval
            clearInterval(this.isPlaying);
            this.isPlaying = null;
        }
        else{
            //here setting an interval that loops over function multiple times keep invoking the function
        this.isPlaying = setInterval(() =>{ //*adding the arrow function coz normal function will refer this keyword to window
            this.repeat();
        }, interval)
      }
    }
    updateBtn(){
        
        if(!this.isPlaying){ //it means we are currently playing now set it to stop
            this.playbtn.innerText = 'Stop';
            this.playbtn.classList.add('active');
        } else{
            this.playbtn.innerText = 'Play';
            this.playbtn.classList.remove('active')
        }
    }
    chnageSound(e){
        const selectionName = e.target.name;
        const selectionvalue = e.target.value;
        switch(selectionName){
            case 'kick-select':
                this.kickAudio.src = selectionvalue;
                break;
            case 'snare-select':
                this.snareAudio.src = selectionvalue;
                break;
            case 'hihat-select':
                this.hihatAudio.src = selectionvalue;
        }
    }
    mute(e){
        const muteIndex = e.target.getAttribute('data-track');
        e.target.classList.toggle('active');
        if(e.target.classList.contains('active')){
            switch(muteIndex){
                case '0':
                    this.kickAudio.volume = 0;
                    break;
                case '1':
                    this.snareAudio.volume = 0;
                    break;
                case '1':
                    this.hihatAudio.volume = 0;
                    break;    
            }
        } else{
            switch(muteIndex){
                case '0':
                    this.kickAudio.volume = 1;
                    break;
                case '1':
                    this.snareAudio.volume = 1;
                    break;
                case '2':
                     this.hihatAudio.volume = 1;
                    break;    
            }
        }
    }
    changeTempo(e){
       const tempoText = document.querySelector('.tempo-nr');
       this.bpm = e.target.value;
       tempoText.innerText = e.target.value;
    }
    updateTempo(){
        clearInterval(this.isPlaying);
        this.isPlaying= null;
        const playbtn = document.querySelector('.play');
        if(playbtn.classList.contains('active')){
            this.start
        }
    }
}



const drumkit = new Drumkit();


//*Event Listeners

drumkit.pads.forEach(pad =>{
    pad.addEventListener('click',drumkit.activePad);
    pad.addEventListener('animationend', function(){
        this.style.animation ="";
    })
});

drumkit.playbtn.addEventListener('click',function(){
    drumkit.updateBtn();
    drumkit.start();
});

drumkit.selects.forEach(select =>{
    select.addEventListener('change', function(e){
        drumkit.chnageSound(e);
    })
});

drumkit.muteBtn.forEach(btn =>{
    btn.addEventListener('click',function(e){
        drumkit.mute(e);
    })
})
///        we used input here on eventListner not changed because it will update the value on each second of slide so the text will dynamically update
drumkit.tempoSilder.addEventListener('input',function(e){
        drumkit.changeTempo(e)
})

drumkit.tempoSilder.addEventListener('change',function(e){
    drumkit.updateTempo(e)
})