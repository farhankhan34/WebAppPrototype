import Database from "./service/database";
import Board from './board';
import UI from './helper/ui';

export default class Task {
    
    /************************************************************************
     *      static is common to all instances since they're called          *
     *      on the class itself.                                            */
    
    
    static allTasks = [];
    static doingSomething = false;
   
    /************* get all tasks from persistent store *****************/
    static getAllTask(){
        let $tasks =   Database.readAllTasks();
        
        for ( const $taskIndex in $tasks) {                     
            let $task = $tasks[$taskIndex];
            let $board = Board.getBoardById($task.boardID);
            var $newTask = new Task($task.taskID, $task.taskName, $task.dueDate, $task.eta,  $task.completionTime,   $task.priority,  $task.completionStatus, $board);            
            $newTask.render();            
            Task.allTasks.push($newTask);
          }                 
        
    }

   static isDoing(){
    Task.doingSomething = false;
    Task.allTasks.forEach(function(task){
        console.log(task.board.boardID);
        if(task.board.boardID == 2 ) { Task.doingSomething = true;  };
      });
     return Task.doingSomething;
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

    static removeTask($taskObject){        
        

        let $yes = confirm("Do you want to delete Task '" + $taskObject.taskName + " ID " + $taskObject.taskID + "?");

        //alert(yes);

        if($yes == true)  {   
            const result = Task.allTasks.filter(task => task.taskID != $taskObject.taskID);
            Task.unrenderAll();
            Task.allTasks = result;
            Task.renderAll();            
            Database.deleteTask($taskObject.taskID);
        }
       
    }

    static getRunningTask(){
        let filtered = Task.allTasks.filter(task => task.board.boardID == 2);
        if(filtered && filtered[0]) return filtered[0];
        else return false;
    }

    /************ create a new task from the supplied info of the form */
    static saveTask($board){        
        
        
        /*** read form inputs ***/
         let $taskName =  document.getElementById("cardName").value;
         let $dueDate = document.getElementById("cardDueDate").value;
         let $eta = document.getElementById("cardETA").value;
         let $completionTime = 0; 
         let $priority = document.getElementById("cardPriority").value;
         let $completionStatus = "new";

       /*** remove the form as all data is read into memory**/    
         var element = document.getElementById("taskEntryForm");
         element.parentNode.removeChild(element);

        // let $board =  $event.currentTarget.boardObject;
         /* create a new task using the supplied info */
              var newTask = new Task(   0,
                                        $taskName, 
                                        $dueDate, 
                                        $eta, 
                                        $completionTime, 
                                        $priority, 
                                        $completionStatus,
                                        $board);

                /* add the newly created task into the task list */        
                Task.allTasks.push(newTask);
                newTask.render();
                Database.createTask(newTask);                
        
     }

     static onDragStart($event){
         console.log('Drag started : ' + JSON.stringify($event));

       // $event.taskOnMove.setData("taskId", $event.target.id);
     }

    /************************************************************************
     *      specific to the object instances                                *
     *                                                                      */
    constructor(
        $taskID,
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
        
        if( $taskID > 0 ) {
            // Let use stored task id
            this.taskID = $taskID;
        }
        else { 
            // Let Database service give us the unique task id             
            this.taskID = Database.getNextTaskID();            
        }
        this.startTime = 0;
        this.endTime = 0;
        this.showingDetails = false;
        
        }
    toJSON(){
        return {
            "taskID": this.taskID,
            "boardID": this.board.boardID,
            "taskName": this.taskName ,
            "dueDate": this.dueDate,
            "eta": this.eta ,
            "completionTime": this.completionTime ,
            "priority": this.priority ,
            "completionStatus": this.completionStatus,
            "lastStartTime": this.startTime,
            "lastEndTime": this.endTime,
        }
    }

   
    toggleView(){
       if(this.showingDetails == true) {        
        this.detailsButton.innerHTML ='<i class="fa fa-angle-up fa-2x"></i>';
        this.detailsBlock.setAttribute('class','task-details-block');
        this.showingDetails = false;
       }
       else{
        this.detailsButton.innerHTML ='<i class="fa fa-angle-down fa-2x"></i>';        
        this.detailsBlock.setAttribute('class','hidden');
        this.showingDetails = true;
       }

       
    }

    render()  {
        
        let taskDiv =  document.createElement('div');
        taskDiv.setAttribute('class','card');
        let $domTaskID = 'T:' + this.taskID;
        taskDiv.setAttribute('id',$domTaskID);
        taskDiv.setAttribute('draggable','true');
      
        /*****************TASK NAME AT THE TOP  *************/
        let heroLine = document.createElement('div');
        heroLine.setAttribute('class','task-hero');
        
        /************ TOOLBAR ON TASK  **********************/
        let toolBar = document.createElement('div');
        toolBar.setAttribute('class','task-toolbar');

        this.detailsButton = document.createElement('button');
        this.detailsButton.setAttribute('class','btn-icon');       
        if(this.showingDetails == true) { 
            this.detailsButton.innerHTML ='<i class="fa fa-angle-up fa-2x"></i>';
        }
        else{
            this.detailsButton.innerHTML ='<i class="fa fa-angle-down fa-2x"></i>';        
        }
        
        let deleteButton = document.createElement('button');
        deleteButton.setAttribute('class','btn-icon');
        deleteButton.innerHTML ='<i class="fa fa-times fa-2x"></i>';        

      
        let heroText = document.createElement('span');
        heroText.setAttribute('class','hero-text');
        heroText.textContent = this.taskName + " ID :" + this.taskID;
        
        this.detailsBlock = document.createElement('div');
        if(this.showingDetails == true) {
            this.detailsBlock.setAttribute('class','task-details-block');
        }
        else{
            this.detailsBlock.setAttribute('class','hidden');
        }

        /************ Task details are shown here *************/
        let taskDate = document.createElement('p');
        taskDate.textContent = "Due date: " + this.dueDate;

        let taskETA = document.createElement('p');
        taskETA.textContent = "Estimated Time: " + this.eta;

        let taskPriority = document.createElement('p');
        taskPriority.textContent = "Priority: " + this.priority;

        let taskStartTime = document.createElement('p');
        taskStartTime.textContent = "Start time: " + this.startTime;

        let taskEndTime = document.createElement('p');
        taskEndTime.textContent = "End time: " + this.endTime;




        /************* add to dom  **********************/
        heroLine.appendChild(heroText);
        toolBar.appendChild(this.detailsButton);
        toolBar.appendChild(deleteButton);

        taskDiv.appendChild(heroLine);
        taskDiv.appendChild(toolBar);

        this.detailsBlock.appendChild(taskDate);
        this.detailsBlock.appendChild(taskETA);
        this.detailsBlock.appendChild(taskStartTime);
        this.detailsBlock.appendChild(taskEndTime);
        taskDiv.appendChild(this.detailsBlock);

        this.board.tasks.appendChild(taskDiv);

         
        /* ******************** ADD EVENT HANDLERS *************************************/
        /* I need a reference of the task object(this) that created this delete button */
        /* taskObject is to remeber this when we move out of the context */
        let $taskObject = this;
        deleteButton.addEventListener('click',function(){Task.removeTask($taskObject);},false);    
        
        this.detailsButton.addEventListener('click', function(){$taskObject.toggleView();},false);
     
        /*************** drag & drop of tasks between boards (Drag starts here) ************************/
        taskDiv.ondragstart = function($event){
            console.log("$event.target.id = " + $event.target.id );
            $event.dataTransfer.setData("Text", $event.target.id);                    
            $event.target.style.opacity = "0.4";

            //Show the board name on console
            //const result = Task.allTasks.filter(task => task.taskID == $event.target.id);
            //console.log(JSON.stringify(result));            
        };
        

    }

    unRender() {
        this.board.tasks.innerHTML = '';
    }
    
    reRender() {
        this.unRender();
        this.render();
    }

  static taskAddForm($theBoard){
      
//    alert('Created by ' + $theBoard.name) ;

        let taskEntryForm =  document.createElement('div');
        taskEntryForm.setAttribute('class','task-entry-form');
        taskEntryForm.setAttribute('id','taskEntryForm');

        let deleteButton = document.createElement('button');
        deleteButton.setAttribute('class','close-task-icon');
        deleteButton.innerHTML ='<i class="fa fa-times fa-2x"></i>';      
          
             

      //  let hero = UI.createHero("New Task");
      //  taskEntryForm.appendChild(hero);
       
         //let toolBar = document.createElement('div');
         //toolBar.setAttribute('class','task-toolbar');             
         //toolBar.appendChild(deleteButton);

         taskEntryForm.appendChild(deleteButton);
      
     

        let cardName = UI.createControl('text','Name','cardName','task-name','Task name');
        taskEntryForm.appendChild(cardName);




        let cardDueDate = UI.createControlWithLabel('date','Due date','cardDueDate','due-date','Enter due date');
        taskEntryForm.appendChild(cardDueDate);


        let cardETA = UI.createControlWithLabel('number','ETA','cardETA','eta','in hours');
        taskEntryForm.appendChild(cardETA);

        
        let cardPriority = UI.createControlWithLabel('number','Task Priority','cardPriority','priority','Put 1-9,1 for low and  9 for max');
        taskEntryForm.appendChild(cardPriority);

        /*

        let saveButton = document.createElement('button');
        saveButton.textContent = "Save";      
        saveButton.boardObject = $theBoard;         

        saveButton.addEventListener('click',Task.saveTask);        
        taskEntryForm.appendChild(saveButton);
        */

               
        let saveButton = document.createElement('button');
        saveButton.innerHTML = '<i class="fa fa-check fa-2x"></i>';
        saveButton.setAttribute('class','save-task-icon');
        //saveButton.boardObject = $theBoard; 
        //saveButton.addEventListener('click',Task.saveTask,false);
        saveButton.addEventListener('click',function(){Task.saveTask($theBoard);},false);

        deleteButton.addEventListener('click',function(){
            var element = document.getElementById("taskEntryForm");
            element.parentNode.removeChild(element);
            },false);

        taskEntryForm.appendChild(saveButton);
                
              
        


        $theBoard.boardLane.appendChild(taskEntryForm);

    }
}
