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





/*
  $taskName = "I will to next";
//Save to local storage
 // window.localStorage.setItem($taskName, JSON.stringify($taskName));
  toDo.addTask(  $taskName, $dueDate, $eta,  $completionTime,   $priority,  $completionStatus   );

  $taskName = "Working on"; 
  doing.addTask( $taskName, $dueDate, $eta,  $completionTime,   $priority,  $completionStatus  );

  $taskName = "Working on Another Task"; 
  doing.addTask( $taskName, $dueDate, $eta,  $completionTime,   $priority,  $completionStatus  );
  


  $taskName = "Already Done"; 
  done.addTask( $taskName, $dueDate, $eta,  $completionTime,   $priority,  $completionStatus  );
*/



 // let $task5= JSON.parse(window.localStorage.getItem('T:5'));
 // toDo.addTask(  $task5.taskName, $task5.dueDate, $task5.eta,  $task5.completionTime,   $task5.priority,  $task5.completionStatus   );

/*

async function mainTest(){
        const {MongoClient} = require('mongodb');//.MongoClient;
        const uri = "mongodb+srv://farhankhan:s48sm9164694pfw@cluster0.tdaar.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
        const client = new MongoClient(uri);

    try {
        await client.connect();
        await listDatabases(client);
    }
    catch(e){
        console.error(e);
    }
    finally {
        await client.close();
    }
}
async function listDatabases(client){
    let databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log('- ${db.name}'));
};

mainTest().catch(console.error);

  */