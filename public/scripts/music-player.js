/*
Code reference : https://www.geeksforgeeks.org/create-a-music-player-using-javascript/
The code is recycled from the above source
*/
export default class MusicPlayer {
    
    static thePlayer;
    static duration

  
    static PlayPauseTrack($thePlayer){      
         //Only one music play in the system; Single Pattern        
        if(!MusicPlayer.thePlayer) {
            MusicPlayer.thePlayer = new MusicPlayer();
        }
        //MusicPlayer.thePlayer.playPauseTrack();
        $thePlayer.playPauseTrack();
    }
    

    constructor($board)
        {           
            
                MusicPlayer.thePlayer = this;
                this.board = $board;
            
                  // Specify globally used values
                 this.trackIndex = 0;
                 this.isPlaying = false;
                 this.updateTimer = 0;
          

                
                // Define the list of tracks that have to be played
                this.track_list = [
                    {
                      name: "Shipping Lanes",
                      artist: "Chad Crouch",
                      image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
                      path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Chad_Crouch/Arps/Chad_Crouch_-_Shipping_Lanes.mp3",
                    },
                    {
                        name: "Night Owl",
                        artist: "Broke For Free",
                        image: "https://images.pexels.com/photos/2264753/pexels-photo-2264753.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
                        path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/WFMU/Broke_For_Free/Directionless_EP/Broke_For_Free_-_01_-_Night_Owl.mp3"
                      },
                      {
                        name: "Enthusiast",
                        artist: "Tours",
                        image: "https://images.pexels.com/photos/3100835/pexels-photo-3100835.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
                        path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Tours/Enthusiast/Tours_-_01_-_Enthusiast.mp3"
                      },
                      
                ];

              //  this.loadTrack(this.track_index);

        }

        loadTrack(track_index) {
            this.trackIndex =track_index;
            //console.log('Loading track ..' + this.trackIndex);
            // Clear the previous seek timer
            clearInterval(this.updateTimer);
            this.resetValues();
            
            // Load a new track
            this.currentTrack.src = this.track_list[this.trackIndex].path;
            this.currentTrack.load();
            
           // var x = this.currentTrack;
           // console.log('Duration = ' + x.duration);

           
            
            // Update details of the track
            //this.track_art.style.backgroundImage = "url(" + this.track_list[track_index].image + ")";
            this.trackName.textContent = this.track_list[this.trackIndex].name;
            this.trackArtist.textContent = this.track_list[this.trackIndex].artist;

            
            //this.now_playing.textContent = "PLAYING " + (this.track_index + 1) + " OF " + this.track_list.length;
            
            // Set an interval of 1000 milliseconds
            // for updating the seek slider
            this.updateTimer = setInterval(this.seekUpdate, 1000);
            
            // Move to the next track if the current finishes playing
            // using the 'ended' event
            this.currentTrack.addEventListener("ended", function(){MusicPlayer.thePlayer.nextTrack;});
            
            
            
           
            }
            
     
            
            // Function to reset all values to their default
     resetValues() {
        this.currentTime.textContent = "00:00";
        this.totalDuration.textContent = "00:00";
        this.sliderRange.value = 0;
        
            }
     
            
    playPauseTrack() {       
                // Switch between playing and pausing
                // depending on the current state
                if (!this.isPlaying) this.playTrack();
                else this.pauseTrack();
                }
                
    playTrack() {
      
                // Play the loaded track
                this.currentTrack.play();
                this.isPlaying = true;
                
                // Replace icon with the pause icon
                this.playpauseTrack.innerHTML = '<i class="fa fa-pause-circle fa-3x"></i>';
                }
                
    pauseTrack() {
                // Pause the loaded track
                this.currentTrack.pause();
                this.isPlaying = false;
                
                // Replace icon with the play icon
                this.playpauseTrack.innerHTML = '<i class="fa fa-play-circle fa-3x"></i>';
                }
                
    static nextTrack() {
                // Go back to the first track if the
                // current one is the last in the track list
                if (MusicPlayer.thePlayer.trackIndex < MusicPlayer.thePlayer.track_list.length - 1)
                MusicPlayer.thePlayer.trackIndex += 1;
                else MusicPlayer.thePlayer.trackIndex = 0;
                
                // Load and play the new track
                MusicPlayer.thePlayer.loadTrack(MusicPlayer.thePlayer.trackIndex);
                MusicPlayer.thePlayer.playTrack();
                }
                
    static prevTrack() {
                // Go back to the last track if the
                // current one is the first in the track list
                if (MusicPlayer.thePlayer.trackIndex > 0)
                MusicPlayer.thePlayer.trackIndex -= 1;
                else MusicPlayer.thePlayer.trackIndex = MusicPlayer.thePlayer.track_list.length;
                
                // Load and play the new track
                MusicPlayer.thePlayer.loadTrack(MusicPlayer.thePlayer.trackIndex);
                MusicPlayer.thePlayer.playTrack();
                }
    
    seekTo() {        
                    // Calculate the seek position by the
                    // percentage of the seek slider
                    // and get the relative duration to the track
                    this.seekto = this.currentTrack.duration * (this.sliderRange.value / 100);
                    
                    // Set the current track position to the calculated seek position
                    this.currentTrack.currentTime = this.seekto;
                    }
                    
    setVolume() {
                    // Set the volume according to the
                    // percentage of the volume slider set
                    this.currentTrack.volume = this.volume_slider.value / 100;
                    }
                    
    seekUpdate() {
                    let seekPosition = 0;
                                     
                    // 
                    if ( MusicPlayer.duration && !isNaN( MusicPlayer.duration)) {
                        seekPosition = MusicPlayer.thePlayer.currentTrack.currentTime * (100 /  MusicPlayer.duration);
                        MusicPlayer.thePlayer.sliderRange.value = seekPosition;
                    
                        // Calculate the time left and the total duration
                        let currentMinutes = Math.floor(MusicPlayer.thePlayer.currentTrack.currentTime / 60);
                        let currentSeconds = Math.floor(MusicPlayer.thePlayer.currentTrack.currentTime - currentMinutes * 60);
                        let durationMinutes = Math.floor(MusicPlayer.thePlayer.currentTrack.duration / 60);
                        let durationSeconds = Math.floor(MusicPlayer.thePlayer.currentTrack.duration - durationMinutes * 60);
                    
                        // Add a zero to the single digit time values
                        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
                        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
                        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
                        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
                    
                        // Display the updated duration
                        MusicPlayer.thePlayer.currentTime.textContent = currentMinutes + ":" + currentSeconds;
                        MusicPlayer.thePlayer.totalDuration.textContent = durationMinutes + ":" + durationSeconds;
                     }
                }
                    
  
 
    render()  {      

        // Create the audio element for the player
        this.currentTrack = new Audio(); // document.createElement('audio');
      //  this.currentTrack.setAttribute("controls", "controls");

        let track = this.currentTrack;
        this.currentTrack.addEventListener('loadedmetadata', function(event){
            MusicPlayer.duration = track.duration;
            //console.log("Duration 1 = " + track.duration );
        });
       


        let musicPlayerDiv =  document.createElement('div');
        musicPlayerDiv.setAttribute('class','player-div');
        
        let rowOne = document.createElement('div');
        rowOne.setAttribute('class','row');

        this.playpauseTrack=document.createElement('div') ;
        this.playpauseTrack.setAttribute('class','col-1 playpause-track');
        this.playpauseTrack.setAttribute('id','playpauseTrack');
        this.playpauseTrack.innerHTML = '<i class="fa fa-play-circle fa-3x"></i>';
        let $thePlayer = this;
        this.playpauseTrack.addEventListener('click',function(){ MusicPlayer.PlayPauseTrack($thePlayer);},false);        

       

        let detailsBlock = document.createElement('div');
        detailsBlock.setAttribute('class','col-11 track-details');

        this.trackName = document.createElement('div');
        this.trackName.setAttribute('class','track-name');
        detailsBlock.appendChild(this.trackName);

        this.trackArtist = document.createElement('div');
        this.trackArtist.setAttribute('class','track-artist');
        detailsBlock.appendChild(this.trackArtist);

        detailsBlock.appendChild(this.currentTrack);

        /************** player seek slider ********/
        
        this.seekSlider = document.createElement('div');
        this.seekSlider.setAttribute('class','slider_container');

        this.prevTrack = document.createElement('div');
        this.prevTrack.innerHTML = '<i class="fa fa-step-backward fa-1x"></i>';
        this.prevTrack.addEventListener('click',function(){ MusicPlayer.prevTrack();},false);  

        

        this.currentTime = document.createElement('div');
        this.currentTime.setAttribute('class','current-time');

        this.sliderRange = document.createElement('input');
        this.sliderRange.setAttribute('type','range');
        this.sliderRange.setAttribute('min','1');
        this.sliderRange.setAttribute('max','100');
        this.sliderRange.setAttribute('class','music-time-slider');
      
        this.totalDuration = document.createElement('div');
        this.totalDuration.setAttribute('class','total-duration');

        this.nextTrack = document.createElement('div');
        this.nextTrack.innerHTML = '<i class="fa fa-step-forward fa-1x"></i>';
        this.nextTrack.addEventListener('click',function(){ MusicPlayer.nextTrack();},false);  


        this.seekSlider.appendChild(this.prevTrack);
        this.seekSlider.appendChild(this.currentTime);
        this.seekSlider.appendChild(this.sliderRange);
        this.seekSlider.appendChild(this.totalDuration);
        this.seekSlider.appendChild(this.nextTrack);

        detailsBlock.appendChild(this.seekSlider);

      
        rowOne.appendChild(this.playpauseTrack);
        rowOne.appendChild(detailsBlock);
        musicPlayerDiv.appendChild(rowOne);

       
        this.board.toolBoxSection.appendChild(musicPlayerDiv); 

        /* event binding */
        //playpauseTrack
        /*
        let $playpauseTrack = document.getElementById('playpauseTrack');
        playpauseTrack.addEventListener('click',MusicPlayer.PlayPauseTrack,false);        

        let $seek_slider = document.getElementById('seek_slider');        
        
        $seek_slider.onchange = function($event){          
            MusicPlayer.thePlayer.seekTo();
        };
        */
        

    }

    
}
