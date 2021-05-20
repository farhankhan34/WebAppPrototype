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

    
    /************************************************************************
     *      specific to the object instances                                *
     *                                                                      */
    constructor(name) {
           /* add a swimline (column) as a board */
        this.boardLane =  document.createElement('div');
        this.boardLane.setAttribute('class','board');

        this.name = name;
                  
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
            this.boardLane);
            
    }

    render(container)  {
     

        /* add a label for the board */ 
        let boardLabel =  document.createElement('div');
        boardLabel.setAttribute('class','label');
        boardLabel.innerHTML =  this.name;

        this.boardLane.appendChild(boardLabel);
        container.appendChild(this.boardLane);
    }
}
