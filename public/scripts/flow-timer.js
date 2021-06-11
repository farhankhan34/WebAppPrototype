import Database from './service/database';
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
         
  

        let theDisplay = document.getElementById("clock-display-digits");
       // let theAMPM = document.getElementById("clock-display-ampm");
        

        if(FlowTimer.$stopWatchState == 'running') {
            FlowTimer.$stopWatchTime++;
            theDisplay.innerHTML = FlowTimer.$stopWatchTime;
           // theAMPM.setAttribute('class','hidden');
        }
        else{
            let dateTime = new Date();
            let hrs = dateTime.getHours();
            let mins = dateTime.getMinutes();
            let secs = dateTime.getSeconds();

           // let ampm = hrs >= 12 ? "PM" : "AM";
           // hrs = hrs % 12;
           // hrs = hrs ? hrs : 12;

            mins = mins < 10 ? '0'+mins : mins;
            secs = secs < 10 ? '0'+secs : secs;

            let time = hrs + ":" + mins + ":" + secs ;
            theDisplay.innerHTML = time;
          //  theAMPM.setAttribute('class','am-pm col-1');
          //  theAMPM.innerHTML =   ampm ; 
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
            $me.taskDetails.innerHTML = $runningTask.taskName ;
            
        }
        else{
            $runningTask.endTime = new Date();
            FlowTimer.$stopWatchTime = 0;
            FlowTimer.$stopWatchState = 'stop';
            $me.startStopButton.textContent = "Start";
            $me.taskDetails.innerHTML = $runningTask.taskName ;            
        }

        let timeSpentId = 'timespent_' + $runningTask.taskID;
        let domElem = document.getElementById(timeSpentId);
        domElem.innerHTML =  $runningTask.calcTimeSpent();

       // $runningTask.reRender();
        Database.updateTask($runningTask);
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
       
        let clockDigits =  document.createElement('div');
        clockDigits.setAttribute('id','clock-display-digits');       
        clockDigits.setAttribute('class','digits') ;       

        let ampmDisplay =  document.createElement('div');
        ampmDisplay.setAttribute('id','clock-display-ampm');       
        ampmDisplay.setAttribute('class','am-pm') ;       
        timerDiv.appendChild(ampmDisplay);

       // clockDisplay.appendChild(ampmDisplay);    
        clockDisplay.appendChild(clockDigits);        
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

       
        this.board.toolBoxSection.appendChild(timerDiv);

    }


}