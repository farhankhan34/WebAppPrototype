import Task from './task';
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
        Board.allBoards.forEach(function(board){
            board.render(container);
          });
    }  

    static taskAddUI($event){
        //alert($event.currentTarget.boardObject.name);
        Task.taskAddForm($event.currentTarget.boardObject);
        
    }
    
    /************************************************************************
     *      specific to the object instances                                *
     *                                                                      */
    constructor(name) {
          

        this.name = name;
        if(Task.allBoards){
        this.boardID = Task.allBoards.length + 1;
        }
                  
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
        Task.add(
            $taskName, 
            $dueDate, 
            $eta, 
            $completionTime, 
            $priority, 
            $completionStatus,
            this);
            
    }

    render(container)  {
     
 /* add a swimline (column) as a board */
        this.boardLane =  document.createElement('div');
        this.boardLane.setAttribute('class','board');

        /* add a label for the board */ 
        let boardLabel =  document.createElement('div');
        boardLabel.setAttribute('class','label');
        boardLabel.innerHTML =  this.name;

        this.boardLane.appendChild(boardLabel);
        

        /* add a Task Add button for the borard */
        /* <input type="button" name="addTask" id="addTask" value="Add"> */

        let addTaskButton = document.createElement('button');
        addTaskButton.textContent = "+";                
        addTaskButton.boardObject = this;
        addTaskButton.addEventListener('click',Board.taskAddUI,false);        
        this.boardLane.appendChild(addTaskButton);

        container.appendChild(this.boardLane);

    }
}
