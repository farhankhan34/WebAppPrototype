export default class Task {
    
    /************************************************************************
     *      static is common to all instances since they're called          *
     *      on the class itself.                                            */
    static allTasks = [];
   
    static add(
                $taskName, 
                $dueDate, 
                $eta, 
                $completionTime, 
                $priority, 
                $completionStatus,
                $board)
                {
                    /* create a new task using the supplied info */
                var newTask = new Task( $taskName, 
                                        $dueDate, 
                                        $eta, 
                                        $completionTime, 
                                        $priority, 
                                        $completionStatus,
                                        $board);
                
                //newTask.unRender();
               // newTask.render();
                /* add the newly created task into the task list */        
                Task.allTasks.push(newTask);

                alert(Task.allTasks.length);

                if(Task.allTasks.length <5)    newTask.render();
                return true;

                //Task.unrenderAll();
                //Task.renderAll();
    }

    static renderAll(){
       // let container = document.getElementById();
        Task.allTasks.forEach(function(task){
            task.render();
          });
    }  

    static unrenderAll(){
        // let container = document.getElementById();
         Task.allTasks.forEach(function(task){
             task.unRender();
           });
     }

    static removeTask($event){        
        
       // console.log($event);
       // console.log($event.currentTarget);
       // console.log($event.currentTarget.taskObject);

        alert("Delete Task '" + $event.currentTarget.taskID + "' ?");
        //Task.allTasks.pop();


        const result = Task.allTasks.filter(task => task.taskID != $event.currentTarget.taskObject.taskID);

        Task.allTasks = result;

        Task.unrenderAll();
        Task.renderAll();
       
    }

    static saveTask($event){        
        
        

         let $taskName = "TEST1";// document.getElementById("taskName").value; 
         let $dueDate = "12/02/2022";//document.getElementById("dueDate").value;
         let $eta = "3days";
         let $completionTime = ""; 
         let $priority = "3";
         let $completionStatus = "new";

         
         Task.add(
            $taskName, 
            $dueDate, 
            $eta, 
            $completionTime, 
            $priority, 
            $completionStatus,
            $event.currentTarget.boardObject);
            

            
        
     }

    /************************************************************************
     *      specific to the object instances                                *
     *                                                                      */
    constructor(
        $taskName, 
        $dueDate, 
        $eta, 
        $completionTime, 
        $priority, 
        $completionStatus,
        $board)
        {
        this.taskName = $taskName;
        this.dueDate = $dueDate,
        this.eta = $eta;
        this.completionTime = $completionTime;
        this.priority = $priority;
        this.completionStatus = $completionStatus;
        this.board = $board;
        // Give a unique id for each task
        this.taskID = Task.allTasks.length + 1;

        }

 

    render()  {      



        let taskDiv =  document.createElement('div');
        taskDiv.setAttribute('class','card');

        let taskText = document.createElement('h3');
        taskText.textContent = this.taskName;
        taskDiv.appendChild(taskText);

        let taskDate = document.createElement('p');
        taskDate.textContent = this.dueDate;
        taskDiv.appendChild(taskDate);

        let deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete Task";        

        /* I need a reference of the task object(this) that created this delete button */
        /* taskObject is to remeber this when we move out of the context */
        deleteButton.taskObject = this;

        deleteButton.addEventListener('click',Task.removeTask,false);        
        taskDiv.appendChild(deleteButton);

        this.board.boardLane.appendChild(taskDiv);

       // alert('Rendered!');
        

    }

    unRender() {

        //this.container.innerHTML = '';
    }

  static taskAddForm($theBoard){
      
    alert('Created by ' + $theBoard.name) ;

        let cardDiv =  document.createElement('div');
        cardDiv.setAttribute('class','card card-form-div');

        let cardForm = document.createElement('form');
        cardForm.setAttribute ('id', 'cardForm');
        cardDiv.appendChild(cardForm);

        let cardName = document.createElement('input');
        cardName.setAttribute ('id', 'cardName');
        cardName.setAttribute('type','text');
        cardForm.appendChild(cardName);

        let cardDueDate = document.createElement('input');
        cardDueDate.setAttribute('id','CardDueDate');
        cardDueDate.setAttribute('type','date');
        cardForm.appendChild(cardDueDate);

        let cardETA = document.createElement('input');
        cardETA.setAttribute('id','cardETA');
        cardETA.setAttribute('type','date');
        cardForm.appendChild(cardETA);

        let cardCompletionTime = document.createElement('input');
        cardCompletionTime.setAttribute('id','cardCompletionTime');
        cardForm.appendChild(cardCompletionTime)

        let saveButton = document.createElement('button');
        saveButton.textContent = "Save";      
        saveButton.boardObject = $theBoard;         

        saveButton.addEventListener('click',Task.saveTask,false);        
        cardForm.appendChild(saveButton);



        $theBoard.boardLane.appendChild(cardDiv);

    }
}
