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
                $container)
                {
                    /* create a new task using the supplied info */
                var newTask = new Task( $taskName, 
                                        $dueDate, 
                                        $eta, 
                                        $completionTime, 
                                        $priority, 
                                        $completionStatus,
                                        $container);
                
                //newTask.unRender();
                newTask.render();
                /* add the newly created task into the task list */        
                Task.allTasks.push(newTask);
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
        
        console.log($event);
        console.log($event.currentTarget);
        console.log($event.currentTarget.taskObject);

        //alert("Delete Task '" + $event.currentTarget.taskID + "' ?");
        //Task.allTasks.pop();

/*
        const result = Task.allTasks.filter(task => task.taskID != $event.currentTarget.taskObject.taskID);

        Task.allTasks = result;

        Task.unrenderAll();
        Task.renderAll();
  */      
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
        $container)
        {
        this.taskName = $taskName;
        this.dueDate = $dueDate,
        this.eta = $eta;
        this.completionTime = $completionTime;
        this.priority = $priority;
        this.completionStatus = $completionStatus;
        this.container = $container;
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

        this.container.appendChild(taskDiv);

    }

    unRender() {

        this.container.innerHTML = '';
    }
}
