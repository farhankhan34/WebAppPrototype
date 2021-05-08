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

taskList = []; //3.1

function addTask($taskName, $dueDate, $priority, $eta, $completionStatus) {
  var task = {
    taskName: $taskName,
    dueDate: $dueDate,
    priority: $priority,
    eta: $eta,
    completionStatus: $completionStatus
  }
  
  taskList.push(task);
}

/*
addTask("30/03/2020",1,"6 days","50%");
addTask("1/04/2020",2,"7 days","30%");
addTask("3/04/2020",3,"9 days","20%");
*/

console.log(JSON.stringify(taskList));

// Submit Button Event Listener

//let button = document.getElementById("myButton");

document.getElementById("submitTask").addEventListener("click", function() {
  let $taskName = document.getElementById("taskName").value;
  let $dueDate = document.getElementById("dueDate").value;
  let $eta = document.getElementById("eta").value;
  let $priority = document.getElementById("priority").value;
addTask($taskName, $dueDate, $eta, $priority);

//console.log(JSON.stringify(taskList));

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