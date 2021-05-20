
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
