import Task from './task';

export default class FlowTimer {
    static $theFlowTimer;
    static $stopWatchState = 'stop';
    static $stopWatchTime = 0;

    constructor($board)
    {
        let $theFlowTimer = this;
        this.board = $board;
        setInterval(FlowTimer.tick, 1000)
    }

    static tick(){
         
  

        let theDisplay = document.getElementById("clock-display");
        

        if(FlowTimer.$stopWatchState == 'running') {
            FlowTimer.$stopWatchTime++;
            theDisplay.innerHTML = FlowTimer.$stopWatchTime;
        }
        else{
            let dateTime = new Date();
            let hrs = dateTime.getHours();
            let mins = dateTime.getMinutes();
            let secs = dateTime.getSeconds();
            let time = hrs + ":" + mins + ":" + secs  ;
            theDisplay.innerHTML = time;
        }
  
    //    console.log(JSON.stringify(dateTime));
    }

    static onButtonWatchClicked($me){ 
        let $runningTask = Task.getRunningTask();
       // let $btnWatchStart  = document.getElementById("btn-watch-start") ;     

       if($runningTask == false) {alert('No runnung task!'); return false;}

        if( FlowTimer.$stopWatchState == 'stop') {
            $runningTask.startTime = new Date();
            FlowTimer.$stopWatchTime = 0;
            FlowTimer.$stopWatchState = 'running';
            $me.startStopButton.textContent = "Stop";            
            $me.taskDetails.innerHTML = $runningTask.taskName + " - Recording";

            $runningTask.reRender();
        }
        else{
            $runningTask.endTime = new Date();
            FlowTimer.$stopWatchTime = 0;
            FlowTimer.$stopWatchState = 'stop';
            $me.startStopButton.textContent = "Start";
            $me.taskDetails.innerHTML = $runningTask.taskName + " - Stopped";

            $runningTask.reRender();
        }


    }

    static stopWatch(){ 
        FlowTimer.$stopWatchState = 'stop';
    }

    render()  {
        
        let timerDiv =  document.createElement('div');
        timerDiv.setAttribute('class','flow-timer-div');

        this.taskDetails =  document.createElement('div');
        this.taskDetails.setAttribute('class','task-details');
        this.taskDetails.innerHTML = "No task running!";
        timerDiv.appendChild(this.taskDetails);
        

        /* Clock Display */
        
        let clockDisplay =  document.createElement('div');
        clockDisplay.setAttribute('id','clock-display');       
        clockDisplay.setAttribute('class','clock-display') ;       
        timerDiv.appendChild(clockDisplay);
           
        /*  creating start and stop buttons for stop watch */
        
        let toolboxDiv =  document.createElement('div');
        toolboxDiv.setAttribute('class','flow-timer-toolbox');
        this.startStopButton = document.createElement('button');
        this.startStopButton.textContent = "Start";        
        this.startStopButton.setAttribute('class','btn btn-start');    
       // this.startStopButton.setAttribute('id','btn-watch-start');    
        let taskObject = this;
        this.startStopButton.addEventListener('click',function(){FlowTimer.onButtonWatchClicked( taskObject);});

        toolboxDiv.appendChild(this.startStopButton);
        timerDiv.appendChild(toolboxDiv);

        /*
        let stopButton = document.createElement('button');
        stopButton.textContent = "Stop";
        stopButton.taskObject = this;
        stopButton.setAttribute('class','btn btn-stop');
        stopButton.addEventListener('click',FlowTimer.stopStopWatch,false);
        timerDiv.appendChild(stopButton);
        */
        

        /* search results display box */
        /*
        let searchResults =  document.createElement('div');
        searchResults.setAttribute('id','search-results')
        searchResults.setAttribute('class','search-results');
        dictionaryDiv.appendChild(searchResults);
        */
        this.board.toolBoxSection.appendChild(timerDiv);

    }


}