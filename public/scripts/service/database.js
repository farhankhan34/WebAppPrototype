export default class Database {
    constructor(){}
    static createTask($task){
        window.localStorage.setItem($task.taskID, JSON.stringify($task));
    }
    static readTask(){
        console.log("Not implemented ... ");
    }
    static updateTask($task){
        window.localStorage.setItem($task.taskID, JSON.stringify($task));
        }
    static deleteTask($taskID){
        window.localStorage.removeItem($taskID);
    }

    static readAllTasks(){
            let taskList = [];
            let keys = Object.keys(localStorage);
            let i = keys.length;

            while ( i-- ) {
                let $taskKey =  keys[i];                    
                let $task = JSON.parse(localStorage.getItem( $taskKey));
                taskList.push($task);

                        console.log("Key = " + $taskKey );
                        console.log($task);
                        console.log($task.boardID);
          
            }
     return taskList;       
    }

}