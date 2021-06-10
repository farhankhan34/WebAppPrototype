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

    static getBoardById($boardID){
        return Board.allBoards.filter(board => board.boardID === $boardID)[0];
    }

    /************************************************************************
     *      specific to the object instances                                *
     *                                                                      */
    constructor(name) {         
        this.name = name;        
        this.boardID =  Number( Board.allBoards.length + 1 );
    }

  

    addMusicPlayer(){
        this.musicPlayer = new MusicPlayer(this);
        this.musicPlayer.render();
        this.musicPlayer.loadTrack(0);
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
        let $domBoardID = 'B:' + this.boardID;
        this.boardLane.setAttribute('id',$domBoardID);        
        this.boardLane.setAttribute('class','board');

        //Ref : https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes
        this.boardLane.setAttribute('data-web-app','board');
       

       /********* add control section   **********/ 
        let controlSection =  document.createElement('div');
        controlSection.setAttribute('class','board-controls');
        this.boardLane.appendChild(controlSection);


        /* add a label for the board */ 
        let boardLabel =  document.createElement('div');
        boardLabel.setAttribute('class','label');
        boardLabel.innerHTML =  this.name;
        controlSection.appendChild(boardLabel);
        

        /* add a Task Add button for the board */
        /* <input type="button" name="addTask" id="addTask" value="Add"> */

        let addTaskButton = document.createElement('button');
        addTaskButton.setAttribute('class','btn btn-add-task');
        addTaskButton.textContent = "+";
        addTaskButton.boardObject = this;
        addTaskButton.addEventListener('click',Board.taskAddUI,false);
        controlSection.appendChild(addTaskButton);

       /******************* end of control section ****************/

       /************ add a toolbox section ******************/
       this.toolBoxSection =  document.createElement('div');
       this.toolBoxSection.setAttribute('class','board-toolbox');
       this.boardLane.appendChild(this.toolBoxSection);



        /* add a placeholder for the all tasks */
        this.tasks =  document.createElement('div');
        this.tasks.setAttribute('class','all-tasks droptarget');
        //this.tasks.innerHTML =  "Put all tasks in here!";

        this.boardLane.appendChild(this.tasks);
        container.appendChild(this.boardLane);


        /*************** add drag and Drop functions  ******************/
        let $theBoard = this;
        this.boardLane.addEventListener("drop", function($event) {
           
            
            //console.log($event.target.getAttribute('data-web-app'));
            $event.preventDefault();
            if ( $event.target.getAttribute('data-web-app') == "board" ) {
              
              let $taskDomID = $event.dataTransfer.getData("Text");
              let $taskElement = document.getElementById($taskDomID);
              $event.target.appendChild($taskElement);
              $taskElement.style.opacity = "1";
               
              console.log("Task DOM ID " + $taskDomID);

              let $taskID = Number($taskDomID.replace('T:',''));
              //finally attache the new board object with the task
              const $taskOnMove = Task.allTasks.filter(task => task.taskID == $taskID);
              $taskOnMove[0].board = $theBoard;
              $taskOnMove[0].storeTask();
            }
            else{
                let $taskDomID = $event.dataTransfer.getData("Text");
                console.log("Task DOM id " + $taskDomID);             
                let $taskElement = document.getElementById($taskDomID);              
                $taskElement.style.opacity = "1";
                return false;
            }
          });


          this.boardLane.addEventListener("dragover", function(event) {            
            event.preventDefault();
          });
          /******************** end of drag and drop functions ***************/

    }
}
