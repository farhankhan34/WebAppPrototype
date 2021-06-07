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

    static startStopWatch(){ 
        FlowTimer.$stopWatchTime = 0;
        FlowTimer.$stopWatchState = 'running';

        let $runningTask = Task.getRunningTask();
        $runningTask[0].startTime = new Date();
        console.log(JSON.stringify($runningTask));

    }

    static stopStopWatch(){ 
        FlowTimer.$stopWatchState = 'stop';
    }

    render()  {
        
        let timerDiv =  document.createElement('div');
        timerDiv.setAttribute('class','flow-timer-div');

        

        /* Clock Display */
        
        let clockDisplay =  document.createElement('div');
        clockDisplay.setAttribute('id','clock-display');       
        clockDisplay.setAttribute('class','clock-display') ;       
        timerDiv.appendChild(clockDisplay);
           
        /*  creating start and stop buttons for stop watch */
        
        let startButton = document.createElement('button');
        startButton.textContent = "S";
        startButton.taskObject = this;
        startButton.addEventListener('click',FlowTimer.startStopWatch,false);
        timerDiv.appendChild(startButton);

        let stopButton = document.createElement('button');
        stopButton.textContent = "X";
        stopButton.taskObject = this;
        stopButton.addEventListener('click',FlowTimer.stopStopWatch,false);
        timerDiv.appendChild(stopButton);
        

        /* search results display box */
        /*
        let searchResults =  document.createElement('div');
        searchResults.setAttribute('id','search-results')
        searchResults.setAttribute('class','search-results');
        dictionaryDiv.appendChild(searchResults);
        */
        this.board.boardLane.appendChild(timerDiv);

    }


}