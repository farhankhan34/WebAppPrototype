import Task from './task';
import MusicPlayer from './music-player';
import Dictionary from './dictionary';
import FlowTimer from './flow-timer';

export default class Board {
    
    /************************************************************************
     *      static is common to all instances                               *
     *                                                                      */

    static allBoards = [];
   
    static add(name){
        var newBoard = new Board(name);
        Board.allBoards.push(newBoard);
        return newBoard;
    }
    static renderAll($containerId){
        let container = document.getElementById($containerId);
        Board.allBoards.forEach(
            function(board){
                     board.render(container);
                    }
          );
    }  

    static taskAddUI($event){
        //alert($event.currentTarget.boardObject.name);
        Task.taskAddForm($event.currentTarget.boardObject);
        
    }

    static onTaskDragOver($event){
        $event.preventDefault();
        console.log('It on over...');
    }
    
   static onTaskDropped($event) {
    $event.preventDefault();
    var taskId = $event.taskOnMove.getData("taskId");
    $event.target.appendChild(document.getElementById(taskId));
    console.log('Dropped!');
   }

    /************************************************************************
     *      specific to the object instances                                *
     *                                                                      */
    constructor(name) {         
        this.name = name;        
        this.boardID = 'B:' + Number( Board.allBoards.length + 1 );
    }

    addTask(
        $taskName, 
        $dueDate, 
        $eta, 
        $completionTime, 
        $priority, 
        $completionStatus        
    )
    {
        console.log("Board ID : " + this.boardID);

        Task.add(
            $taskName, 
            $dueDate, 
            $eta, 
            $completionTime, 
            $priority, 
            $completionStatus,
            this);
            
    }

    addMusicPlayer(){
        this.musicPlayer = new MusicPlayer(this);
        this.musicPlayer.render();
    }

    addDictionary(){
        this.dictionary = new Dictionary(this);
        this.dictionary.render();
    }

    addFlowTimer(){
        this.flowTimer = new FlowTimer(this);
        this.flowTimer.render();
    }

    render(container)  {



 /* add a swimline (column) as a board */
        this.boardLane =  document.createElement('div');
        this.boardLane.setAttribute('id',this.boardID);
        this.boardLane.setAttribute('class','board');
        this.boardLane.setAttribute('class','droptarget');

        //this.boardLane.addEventListener('ondrop',Board.onTaskDropped);
        //this.boardLane.addEventListener('ondragover',Board.onTaskDragOver);

        this.boardLane.addEventListener("drop", function($event) {
            $event.preventDefault();
            if ( $event.target.className == "droptarget" ) {
              
              let $taskID = $event.dataTransfer.getData("Text");
              let $taskElement = document.getElementById($taskID);
              $event.target.appendChild($taskElement);
              $taskElement.style.opacity = "1";
               
              //finally attache the new board object with the task
              const $taskOnMove = Task.allTasks.filter(task => task.taskID == $taskID);

              //console.log("old board id " +  JSON.stringify($taskOnMove[0].board.boardID));
              //console.log("New board id " + $event.target.id);

              $taskOnMove[0].board = $event.target;
            }
          });


          this.boardLane.addEventListener("dragover", function(event) {
            //var data = event.dataTransfer.getData("Text");
            //console.log("ID" + data);
            event.preventDefault();
          });


        /* add a label for the board */ 
        let boardLabel =  document.createElement('div');
        boardLabel.setAttribute('class','label');
        boardLabel.innerHTML =  this.name;

        this.boardLane.appendChild(boardLabel);
        

        /* add a Task Add button for the board */
        /* <input type="button" name="addTask" id="addTask" value="Add"> */
        let addTaskButton = document.createElement('button');
        addTaskButton.textContent = "+";
        addTaskButton.boardObject = this;
        addTaskButton.addEventListener('click',Board.taskAddUI,false);
        this.boardLane.appendChild(addTaskButton);


        /* add a label for the board */
        this.tasks =  document.createElement('div');
        this.tasks.setAttribute('class','all-tasks');
        this.tasks.innerHTML =  "Put all tasks in here!";

        this.boardLane.appendChild(this.tasks);
        container.appendChild(this.boardLane);

    }
}
