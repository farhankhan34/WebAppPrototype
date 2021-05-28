export default class MusicPlayer {
    
    static PlayPauseTrack(){
        let $thePlayer = new MusicPlayer();
        $thePlayer.playpauseTrack();
    }

    constructor($board)
        {
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
                 this.updateTimer;
          

                // Create the audio element for the player
                this.curr_track = document.createElement('audio');

                // Define the list of tracks that have to be played
                let track_list = [
                {
                    name: "Night Owl",
                    artist: "Broke For Free",
                    image: "Image URL",
                    path: "Night_Owl.mp3"
                },
                {
                    name: "Enthusiast",
                    artist: "Tours",
                    image: "Image URL",
                    path: "Enthusiast.mp3"
                },
                {
                    name: "Shipping Lanes",
                    artist: "Chad Crouch",
                    image: "Image URL",
                    path: "Shipping_Lanes.mp3",
                },
                ];

        }

        loadTrack(track_index) {
            // Clear the previous seek timer
            clearInterval(updateTimer);
            resetValues();
            
            // Load a new track
            curr_track.src = track_list[track_index].path;
            curr_track.load();
            
            // Update details of the track
            track_art.style.backgroundImage =
                "url(" + track_list[track_index].image + ")";
            track_name.textContent = track_list[track_index].name;
            track_artist.textContent = track_list[track_index].artist;
            now_playing.textContent =
                "PLAYING " + (track_index + 1) + " OF " + track_list.length;
            
            // Set an interval of 1000 milliseconds
            // for updating the seek slider
            updateTimer = setInterval(seekUpdate, 1000);
            
            // Move to the next track if the current finishes playing
            // using the 'ended' event
            curr_track.addEventListener("ended", nextTrack);
            
            // Apply a random background color
            random_bg_color();
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
            document.body.style.background = bgColor;
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
                    this.curr_track.currentTime = seekto;
                    }
                    
    setVolume() {
                    // Set the volume according to the
                    // percentage of the volume slider set
                    this.curr_track.volume = this.volume_slider.value / 100;
                    }
                    
    seekUpdate() {
                    let seekPosition = 0;
                    
                    // Check if the current track duration is a legible number
                    if (!isNaN(this.curr_track.duration)) {
                        seekPosition = this.curr_track.currentTime * (100 / this.curr_track.duration);
                        this.seek_slider.value = seekPosition;
                    
                        // Calculate the time left and the total duration
                        let currentMinutes = Math.floor(curr_track.currentTime / 60);
                        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
                        let durationMinutes = Math.floor(curr_track.duration / 60);
                        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
                    
                        // Add a zero to the single digit time values
                        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
                        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
                        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
                        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
                    
                        // Display the updated duration
                        this.curr_time.textContent = currentMinutes + ":" + currentSeconds;
                        this.total_duration.textContent = durationMinutes + ":" + durationSeconds;
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

    }

    
}
