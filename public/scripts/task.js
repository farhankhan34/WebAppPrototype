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

                //console.log(JSON.stringify($board));

                newTask.storeTask();


                /* add the newly created task into the task list */        
                Task.allTasks.push(newTask);
                newTask.render();
               console.log(Task.allTasks.length);

                //if(Task.allTasks.length <5)
                //return true;

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

    static getRunningTask(){
        return Task.allTasks.filter(task => task.board.boardID == "B:2");
    }

    static saveTask($event){        
        
        

         let $taskName =  document.getElementById("cardName").value;
         let $dueDate = document.getElementById("cardDueDate").value;
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
            
           // getElementById('taskEntryForm').parentNode.removeChild(getElementById('taskEntryForm'));

            var element = document.getElementById("taskEntryForm");
            element.parentNode.removeChild(element);
            
        
     }

     static onDragStart($event){
         console.log('Drag started : ' + JSON.stringify($event));

       // $event.taskOnMove.setData("taskId", $event.target.id);
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
        this.taskName = $taskName,
        this.dueDate = $dueDate,
        this.eta = $eta;
        this.completionTime = $completionTime;
        this.priority = $priority;
        this.completionStatus = $completionStatus;
        this.board = $board;
        // Give a unique id for each task
        this.taskID = 'T:' + Number(Task.allTasks.length + 1 ) ;
        this.startTime = 0;

        }
    toJSON(){
        return {
            "taskID": this.taskID,
            "boardID": this.board.boardID,
            "taskName": this.taskName ,
            "dueDate": this.dueDate,
            "etc": this.eta ,
            "completionTime": this.completionTime ,
            "priority": this.priority ,
            "completionStatus": this.completionStatus,
            "lastStartTime": this.startTime,
        }
    }

    storeTask(){
       // console.log(JSON.stringify(this));
        window.localStorage.setItem(this.taskID, JSON.stringify(this));

        let $totalNoOfTasks = Number(Task.allTasks.length + 1 ) ;
        window.localStorage.setItem('totalNoOfTasks', $totalNoOfTasks.toString());
    }



    render()  {

        let taskDiv =  document.createElement('div');
        taskDiv.setAttribute('class','card');
        taskDiv.setAttribute('id',this.taskID);

        taskDiv.setAttribute('draggable','true');
        

        taskDiv.ondragstart = function($event){
            $event.dataTransfer.setData("Text", $event.target.id);                    
            $event.target.style.opacity = "0.4";

            //Show the board name on console
            const result = Task.allTasks.filter(task => task.taskID == $event.target.id);
            console.log(JSON.stringify(result));
            
        };
        

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

        this.board.tasks.appendChild(taskDiv);

       // alert('Rendered!');
        

    }

    unRender() {
        this.board.tasks.innerHTML = '';
    }

  static taskAddForm($theBoard){
      
//    alert('Created by ' + $theBoard.name) ;

        let taskEntryForm =  document.createElement('div');
        taskEntryForm.setAttribute('class','card card-form-div');
        taskEntryForm.setAttribute('id','taskEntryForm');

        let cardForm = document.createElement('div');
        cardForm.setAttribute ('id', 'cardForm');
        taskEntryForm.appendChild(cardForm);

        let cardName = document.createElement('input');
        cardName.setAttribute ('id', 'cardName');
        cardName.setAttribute('type','text');
        cardForm.appendChild(cardName);

        let cardDueDate = document.createElement('input');
        cardDueDate.setAttribute('id','cardDueDate');
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





        $theBoard.boardLane.appendChild(taskEntryForm);

    }
}
