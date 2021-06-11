export default class Database {
    static nextTaskID = Number(1);

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
                Database.updateUniqueTaskID($task.taskID);
                taskList.push($task);

                        //console.log("Key = " + $taskKey );
                        //console.log($task);
                        //console.log($task.boardID);
          
            }
     return taskList;       
    }

    static updateUniqueTaskID($newID){
        if( Database.nextTaskID <= Number($newID) ) Database.nextTaskID =  Number($newID) + 1;
    }
    static getNextTaskID(){
            Database.nextTaskID++;
            return  Database.nextTaskID;
    }

}