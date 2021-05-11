//method 1
/*function reverseString(str) {
  var newString = "";
  for(var i = str.length - 1; i >= 0; i--) {
    newString += str[i];
  }
  return newString;
}*/



/*let r=0;
function reverseString(str) {
  for (var s= str.length - 1; s >= 0; s--) {
    str[r] = str[s]; 
    //values r, t and s are assigned values s, t, and r
    r++;

    return str;

  }
}*/


/*var task = {
  dueDate:
  priority:
  eta:
  completionStatus:
}*/

//PART 3
/*
3.1 Create an array called taskList. 

3.2 Then write a function called addTask() which has all the required input parameters to create a task object, before adding it to the taskList array.

 Log this array out to the console, showing that it works for a single task, with hard-coded input parameters. Next week we will look at how to populate these parameters with user input.*/
let aPlaceToShow = document.getElementById("allTasks");

let taskList = []; //3.1

function addTask($taskName, $dueDate, $eta, $completionTime, $priority, $completionStatus) {
  var task = {
    taskName: $taskName,
    dueDate: $dueDate,
    eta: $eta,
    completionTime: $completionTime,
    priority: $priority,
    completionStatus: $completionStatus
  }
  console.log(JSON.stringify(task));
  taskList.push(task);
}

/*
addTask("30/03/2020",1,"6 days","50%");
addTask("1/04/2020",2,"7 days","30%");
addTask("3/04/2020",3,"9 days","20%");
*/

console.log(JSON.stringify(taskList));

// Submit Button Event Listener

let button = document.getElementById("submitTaskPress");

button.addEventListener("click", function() {
  let $taskName = document.getElementById("taskName").value;
  let $dueDate = document.getElementById("dueDate").value;
  let $eta = document.getElementById("etaInput").value;
  let $completionTime = document.getElementById("completionTimeInput").value;
  let $priority = document.getElementById("priorityInput").options[priorityInput.selectedIndex].value; 
addTask($taskName, $dueDate, $eta, $completionTime, $priority);

console.log(JSON.stringify(taskList));

aPlaceToShow.innerHTML = "";

 taskList.forEach(function(task){
   console.log(task.taskName);
   let taskDiv =  document.createElement('div');
   taskDiv.setAttribute('class','card');

   let taskText = document.createElement('h3');
   taskText.textContent = task.taskName;
   taskDiv.appendChild(taskText);

   aPlaceToShow.appendChild(taskDiv);

 });

});

function renderTask(task){
  //Create HTML elements
  let item = document.createElement


  //Extra task DOM elements

  //Event Listeners for DOM elements

  //Clear the input form


}


/***************************** 11 May 2021  ************************/
/*************** CREATING ALL BOARDS  ******************************/
/*
let allBoards = [{
      "label": "To Do"
    },
    {
      "label": "Doing"
    },
    {
      "label": "Review"
    },
    {
      "label": "Done"
    }
  ];
  */

    /******** RENDERING */
   // let container = document.getElementById("container");
    

    // allBoards.forEach(function(board){
    //   //console.log(board.label);

    //   /* add a swimline (column) as a board */
    //   let boardLane =  document.createElement('div');
    //   boardLane.setAttribute('class','board');

    //   /* add a label for the board */ 
    //   let boardLabel =  document.createElement('div');
    //   boardLabel.setAttribute('class','label');
    //   boardLabel.innerHTML = board.label;

    //   boardLane.appendChild(boardLabel);
    //   container.appendChild(boardLane);
   
    // });

  // import Board from './scripts/board';

  class Board {
    constructor(name) {
        this.name = name;          
    }
    render(container){
          /* add a swimline (column) as a board */
        let boardLane =  document.createElement('div');
        boardLane.setAttribute('class','board');

        /* add a label for the board */ 
        let boardLabel =  document.createElement('div');
        boardLabel.setAttribute('class','label');
        boardLabel.innerHTML =  this.name;

        boardLane.appendChild(boardLabel);
        container.appendChild(boardLane);
    }    
}


   

  let container = document.getElementById("container");

  let allBoards = [];
  
  var todoBoard = new Board('Todo');
  allBoards.push(todoBoard);
  var doingBoard = new Board('Doing');
  allBoards.push(doingBoard);
  var doneBoard = new Board('Done');
  allBoards.push(doneBoard);

  allBoards.forEach(function(board){
    board.render(container);
  });
  
 
  
  