import Board from './board';
 

 let toDo = Board.add('Todo'); 
 let doing =  Board.add('Doing');
 let done = Board.add('Done');
 
 let $id_to_pass = 'app' ;
 Board.renderAll($id_to_pass);


 /* test data */
/* for development */
let $taskName = "TEST Task"; 
let $dueDate = "17/05/20201";
let $eta = "3days";
let $completionTime = ""; 
let $priority = "3";
let $completionStatus = "new";
 

  $taskName = "I will to next"; 
  toDo.addTask(  $taskName, $dueDate, $eta,  $completionTime,   $priority,  $completionStatus   );

  $taskName = "Working on"; 
  doing.addTask( $taskName, $dueDate, $eta,  $completionTime,   $priority,  $completionStatus  );

  $taskName = "Working on Another Task"; 
  doing.addTask( $taskName, $dueDate, $eta,  $completionTime,   $priority,  $completionStatus  );


  $taskName = "Already Done"; 
  done.addTask( $taskName, $dueDate, $eta,  $completionTime,   $priority,  $completionStatus  );



  