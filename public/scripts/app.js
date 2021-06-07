import Board from './board';
import 'regenerator-runtime/runtime';
 

 let $toDo = Board.add('Todo');
 let $doing =  Board.add('Doing');
 let $done = Board.add('Done');
 
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

  $doing.addFlowTimer();
  $doing.addDictionary();
  $doing.addMusicPlayer();
  



let $totalNoOfTasks = Number( window.localStorage.getItem('totalNoOfTasks'));
console.log('$totalNoOfTasks -> ' + $totalNoOfTasks);
let i;
for (i = 1; i <= $totalNoOfTasks; i++) {
   let $taskKey =  'T:' + i;
   let $task= JSON.parse(window.localStorage.getItem($taskKey));
   let $board = $toDo;
    //console.log($task.boardID);
    if($task.boardID == 'B:1') $board = $toDo;
    if($task.boardID == 'B:2') $board = $doing;
    if($task.boardID == 'B:3') $board = $done;

    $board.addTask(  $task.taskName, $task.dueDate, $task.eta,  $task.completionTime,   $task.priority,  $task.completionStatus   );

}






