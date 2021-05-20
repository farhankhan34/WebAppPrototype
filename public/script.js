import Board from './scripts/board';
import Task from './scripts/task';
 
//console.log('Blah!');

let button = document.getElementById("show-hide-task-form");
button.addEventListener("click", function(){
  
  if(document.getElementById("taskEntryForm").style.visibility == 'hidden'){
    document.getElementById("taskEntryForm").style.visibility  = 'visible';
    }
  else {
    document.getElementById("taskEntryForm").style.visibility  = 'hidden';
  }
});




/* test data */

let $taskName = "TEST Task"; 
let $dueDate = "17/05/20201";
let $eta = "3days";
let $completionTime = ""; 
let $priority = "3";
let $completionStatus = "new";
                         


 let toDo = Board.add('Todo');
 
 //console.log("object name " + toDo.name);
 //console.log("object id " + toDo.name);

 let doing =  Board.add('Doing');
 let done = Board.add('Done'); 
  
  Board.renderAll('container');

  $taskName = "I will to next"; 
  toDo.addTask(  $taskName, $dueDate, $eta,  $completionTime,   $priority,  $completionStatus   );

  $taskName = "Working on"; 
  doing.addTask( $taskName, $dueDate, $eta,  $completionTime,   $priority,  $completionStatus  );

  $taskName = "Working on Another Task"; 
  doing.addTask( $taskName, $dueDate, $eta,  $completionTime,   $priority,  $completionStatus  );


  $taskName = "Already Done"; 
  done.addTask( $taskName, $dueDate, $eta,  $completionTime,   $priority,  $completionStatus  );

 // Task.renderAll();



  
let addTaskButton = document.getElementById("addTask");
addTaskButton.addEventListener("click", function(){

let $taskName = document.getElementById("taskName").value; 
let $dueDate = document.getElementById("dueDate").value;
let $eta = "3days";
let $completionTime = ""; 
let $priority = "3";
let $completionStatus = "new";
toDo.addTask(  $taskName, $dueDate, $eta,  $completionTime,   $priority,  $completionStatus   );                     
//Task.renderAll();
});

 
  
  