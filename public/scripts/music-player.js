/*
Code reference : https://www.geeksforgeeks.org/create-a-music-player-using-javascript/
The code is recycled from the above source
*/
export default class MusicPlayer {
    
    static thePlayer;

    static PlayPauseTrack(){
        
        if(!MusicPlayer.thePlayer) {
            MusicPlayer.thePlayer = new MusicPlayer();
        }
        MusicPlayer.thePlayer.playpauseTrack();

    }

    constructor($board)
        {
            let $theMusicPlayer = this;
            this.board = $board;

            // Select all the elements in the HTML page
                // and assign them to a variable
                this.now_playing = document.querySelector(".now-playing");
                this.track_art = document.querySelector(".track-art");
                this.track_name = document.querySelector(".track-name");
                this.track_artist = document.querySelector(".track-artist");

                this.playpause_btn = document.querySelector(".playpause-track");
                this.next_btn = document.querySelector(".next-track");
                this.prev_btn = document.querySelector(".prev-track");

                this.seek_slider = document.querySelector(".seek_slider");
                this.volume_slider = document.querySelector(".volume_slider");
                this.curr_time = document.querySelector(".current-time");
                this.total_duration = document.querySelector(".total-duration");

              
                  // Specify globally used values
                 this.track_index = 0;
                 this.isPlaying = false;
                 this.updateTimer = 0;
          

                // Create the audio element for the player
                this.curr_track = document.createElement('audio');

                // Define the list of tracks that have to be played
                this.track_list = [
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
                      {
                        name: "Shipping Lanes",
                        artist: "Chad Crouch",
                        image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
                        path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Chad_Crouch/Arps/Chad_Crouch_-_Shipping_Lanes.mp3",
                      },
                ];

                this.loadTrack(this.track_index);

        }

        loadTrack(track_index) {
            // Clear the previous seek timer
            clearInterval(this.updateTimer);
            this.resetValues();
            
            // Load a new track
            this.curr_track.src = this.track_list[track_index].path;
            this.curr_track.load();
            
            // Update details of the track
            this.track_art.style.backgroundImage = "url(" + this.track_list[track_index].image + ")";
            this.track_name.textContent = this.track_list[track_index].name;
            this.track_artist.textContent = this.track_list[track_index].artist;
            this.now_playing.textContent = "PLAYING " + (this.track_index + 1) + " OF " + this.track_list.length;
            
            // Set an interval of 1000 milliseconds
            // for updating the seek slider
            this.updateTimer = setInterval(this.seekUpdate, 1000);
            
            // Move to the next track if the current finishes playing
            // using the 'ended' event
            this.curr_track.addEventListener("ended", function(){MusicPlayer.thePlayer.nextTrack;});
            
            
            
            // Apply a random background color
            this.random_bg_color();
            }
            
      random_bg_color() {
            // Get a random number between 64 to 256
            // (for getting lighter colors)
            let red = Math.floor(Math.random() * 256) + 64;
            let green = Math.floor(Math.random() * 256) + 64;
            let blue = Math.floor(Math.random() * 256) + 64;
            
            // Construct a color withe the given values
            let bgColor = "rgb(" + red + ", " + green + ", " + blue + ")";
            
            // Set the background to the new color            
            var $thePlayer = document.getElementById('deco-player');
            $thePlayer.style.background = bgColor;
            }
            
            // Function to reset all values to their default
     resetValues() {
        this.curr_time.textContent = "00:00";
        this.total_duration.textContent = "00:00";
        this.seek_slider.value = 0;
            }
     
            
    playpauseTrack() {
                // Switch between playing and pausing
                // depending on the current state
                if (!this.isPlaying) this.playTrack();
                else this.pauseTrack();
                }
                
    playTrack() {
                // Play the loaded track
                this.curr_track.play();
                this.isPlaying = true;
                
                // Replace icon with the pause icon
                this.playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
                }
                
    pauseTrack() {
                // Pause the loaded track
                this.curr_track.pause();
                this.isPlaying = false;
                
                // Replace icon with the play icon
                this.playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
                }
                
    nextTrack() {
                // Go back to the first track if the
                // current one is the last in the track list
                if (this.track_index < this.track_list.length - 1)
                    this.track_index += 1;
                else this.track_index = 0;
                
                // Load and play the new track
                loadTrack(this.track_index);
                playTrack();
                }
                
    prevTrack() {
                // Go back to the last track if the
                // current one is the first in the track list
                if (this.track_index > 0)
                this.track_index -= 1;
                else this.track_index = this.track_list.length;
                
                // Load and play the new track
                loadTrack(this.track_index);
                playTrack();
                }
    
    seekTo() {        
                    // Calculate the seek position by the
                    // percentage of the seek slider
                    // and get the relative duration to the track
                    this.seekto = this.curr_track.duration * (this.seek_slider.value / 100);
                    
                    // Set the current track position to the calculated seek position
                    this.curr_track.currentTime = this.seekto;
                    }
                    
    setVolume() {
                    // Set the volume according to the
                    // percentage of the volume slider set
                    this.curr_track.volume = this.volume_slider.value / 100;
                    }
                    
    seekUpdate() {
                    let seekPosition = 0;
                                     
                    // 
                    if (MusicPlayer.thePlayer && !isNaN(MusicPlayer.thePlayer.curr_track.duration)) {
                        seekPosition = MusicPlayer.thePlayer.curr_track.currentTime * (100 / MusicPlayer.thePlayer.curr_track.duration);
                        MusicPlayer.thePlayer.seek_slider.value = seekPosition;
                    
                        // Calculate the time left and the total duration
                        let currentMinutes = Math.floor(MusicPlayer.thePlayer.curr_track.currentTime / 60);
                        let currentSeconds = Math.floor(MusicPlayer.thePlayer.curr_track.currentTime - currentMinutes * 60);
                        let durationMinutes = Math.floor(MusicPlayer.thePlayer.curr_track.duration / 60);
                        let durationSeconds = Math.floor(MusicPlayer.thePlayer.curr_track.duration - durationMinutes * 60);
                    
                        // Add a zero to the single digit time values
                        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
                        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
                        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
                        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
                    
                        // Display the updated duration
                        MusicPlayer.thePlayer.curr_time.textContent = currentMinutes + ":" + currentSeconds;
                        MusicPlayer.thePlayer.total_duration.textContent = durationMinutes + ":" + durationSeconds;
                     }
                }
                    

 
    render()  {      

        
        let musicPlayerDiv =  document.createElement('div');
        musicPlayerDiv.setAttribute('class','player-div');
        //musicPlayerDiv.setAttribute('id',this.taskID);
       // let Text = document.createElement('h3');
       // Text.textContent = "Music Player will be shown in here!";
       // musicPlayerDiv.appendChild(Text);

        var $thePlayer = document.getElementById('deco-player');
        //console.log($thePlayer);
        let $theClone = $thePlayer.cloneNode(true);
        musicPlayerDiv.appendChild($theClone);
        $thePlayer.remove();

        this.board.boardLane.appendChild(musicPlayerDiv); 

        /* event binding */
        //playpauseTrack
        let $playpauseTrack = document.getElementById('playpauseTrack');
        playpauseTrack.addEventListener('click',MusicPlayer.PlayPauseTrack,false);        

        let $seek_slider = document.getElementById('seek_slider');        
        
        $seek_slider.onchange = function($event){          
            MusicPlayer.thePlayer.seekTo();
        };
        

    }

    
}
