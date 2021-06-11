// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"scripts/service/database.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Database = /*#__PURE__*/function () {
  function Database() {
    _classCallCheck(this, Database);
  }

  _createClass(Database, null, [{
    key: "createTask",
    value: function createTask($task) {
      window.localStorage.setItem($task.taskID, JSON.stringify($task));
    }
  }, {
    key: "readTask",
    value: function readTask() {
      console.log("Not implemented ... ");
    }
  }, {
    key: "updateTask",
    value: function updateTask($task) {
      window.localStorage.setItem($task.taskID, JSON.stringify($task));
    }
  }, {
    key: "deleteTask",
    value: function deleteTask($taskID) {
      window.localStorage.removeItem($taskID);
    }
  }, {
    key: "readAllTasks",
    value: function readAllTasks() {
      var taskList = [];
      var keys = Object.keys(localStorage);
      var i = keys.length;

      while (i--) {
        var $taskKey = keys[i];
        var $task = JSON.parse(localStorage.getItem($taskKey));
        Database.updateUniqueTaskID($task.taskID);
        taskList.push($task); //console.log("Key = " + $taskKey );
        //console.log($task);
        //console.log($task.boardID);
      }

      return taskList;
    }
  }, {
    key: "updateUniqueTaskID",
    value: function updateUniqueTaskID($newID) {
      if (Database.nextTaskID <= Number($newID)) Database.nextTaskID = Number($newID) + 1;
    }
  }, {
    key: "getNextTaskID",
    value: function getNextTaskID() {
      Database.nextTaskID++;
      return Database.nextTaskID;
    }
  }]);

  return Database;
}();

exports.default = Database;

_defineProperty(Database, "nextTaskID", Number(1));
},{}],"scripts/helper/ui.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UI = /*#__PURE__*/function () {
  function UI() {
    _classCallCheck(this, UI);
  }

  _createClass(UI, null, [{
    key: "createControl",
    value: function createControl($type, $label, $id, $css_style, $place_holder) {
      var itemDiv = document.createElement("Div");
      /*** the control block */

      var item = document.createElement('input');
      item.setAttribute('id', $id);
      item.setAttribute('type', $type);
      item.setAttribute('placeholder', $place_holder);
      itemDiv.appendChild(item);
      return itemDiv;
    }
  }, {
    key: "createControlWithLabel",
    value: function createControlWithLabel($type, $label, $id, $css_style, $place_holder) {
      var itemDiv = document.createElement("Div");
      /**** the label block ***/

      var itemLabel = document.createElement("Label");
      itemLabel.setAttribute('for', $id);
      itemLabel.innerHTML = $label + ": ";
      itemDiv.appendChild(itemLabel);
      /*** the control block */

      var item = document.createElement('input');
      item.setAttribute('id', $id);
      item.setAttribute('type', $type);
      item.setAttribute('placeholder', $place_holder);
      itemDiv.appendChild(item);
      return itemDiv;
    }
  }, {
    key: "createHero",
    value: function createHero($text) {
      /*****************TASK NAME AT THE TOP  *************/
      var heroLine = document.createElement('div');
      heroLine.setAttribute('class', 'hero-div');
      var heroText = document.createElement('span');
      heroText.setAttribute('class', 'hero-text');
      heroText.textContent = $text;
      heroLine.appendChild(heroText);
      return heroLine;
    }
  }, {
    key: "formatTimeElapsed",
    value: function formatTimeElapsed(seconds) {
      // let ampm = hrs >= 12 ? "PM" : "AM";
      // hrs = hrs % 12;
      // hrs = hrs ? hrs : 12;
      var secs = seconds % 60;
      secs = secs.toFixed(0);
      var minits = Math.floor(seconds / 60);
      var mins = minits % 60;
      var hrs = Math.floor(minits / 60);
      mins = mins < 10 ? '0' + mins : mins;
      secs = secs < 10 ? '0' + secs : secs;
      var formattedTime = hrs + ":" + mins + ":" + secs;
      return formattedTime;
    }
  }]);

  return UI;
}();

exports.default = UI;
},{}],"scripts/task.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _database = _interopRequireDefault(require("./service/database"));

var _board = _interopRequireDefault(require("./board"));

var _ui = _interopRequireDefault(require("./helper/ui"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Task = /*#__PURE__*/function () {
  /************************************************************************
   *      specific to the object instances                                *
   *                                                                      */
  function Task($taskID, $taskName, $dueDate, $eta, $completionTime, $priority, $completionStatus, $startTime, $endTime, $board) {
    _classCallCheck(this, Task);

    this.taskName = $taskName, this.dueDate = $dueDate, this.eta = $eta;
    this.completionTime = $completionTime;
    this.priority = $priority;
    this.completionStatus = $completionStatus;
    this.board = $board;

    if ($startTime) {
      this.startTime = new Date($startTime);
    }

    if ($endTime) {
      this.endTime = new Date($endTime);
    }

    if ($taskID > 0) {
      // Let use stored task id
      this.taskID = $taskID;
    } else {
      // Let Database service give us the unique task id             
      this.taskID = _database.default.getNextTaskID();
    }

    this.showingDetails = false;
  }

  _createClass(Task, [{
    key: "toJSON",
    value: function toJSON() {
      return {
        "taskID": this.taskID,
        "boardID": this.board.boardID,
        "taskName": this.taskName,
        "dueDate": this.dueDate,
        "eta": this.eta,
        "completionTime": this.completionTime,
        "priority": this.priority,
        "completionStatus": this.completionStatus,
        "startTime": this.startTime,
        "endTime": this.endTime
      };
    }
  }, {
    key: "toggleView",
    value: function toggleView() {
      //console.log(" this.showingDetails = " + this.showingDetails);
      if (this.showingDetails == false) {
        this.detailsButton.innerHTML = '<i class="fa fa-angle-up fa-2x"></i>';
        this.detailsBlock.setAttribute('class', 'task-details-block');
        this.showingDetails = true;
      } else {
        this.detailsButton.innerHTML = '<i class="fa fa-angle-down fa-2x"></i>';
        this.detailsBlock.setAttribute('class', 'hidden');
        this.showingDetails = false;
      }
    }
  }, {
    key: "calcTimeSpent",
    value: function calcTimeSpent() {
      if (this.startTime && this.endTime && typeof this.startTime.getTime === 'function' && typeof this.endTime.getTime === 'function') {
        var Difference_In_Time = (this.endTime.getTime() - this.startTime.getTime()) / 1000;

        if (Math.ceil(Difference_In_Time) > 0) {
          this.timeSpent.innerHTML = _ui.default.formatTimeElapsed(Difference_In_Time);
        } else {
          this.timeSpent.innerHTML = "";
        }
      }

      return this.timeSpent.innerHTML;
    }
  }, {
    key: "render",
    value: function render() {
      var taskDiv = document.createElement('div');
      taskDiv.setAttribute('class', 'card');
      var $domTaskID = 'T:' + this.taskID;
      taskDiv.setAttribute('id', $domTaskID);
      taskDiv.setAttribute('draggable', 'true');
      /*****************TASK NAME AT THE TOP  *************/

      var heroLine = document.createElement('div');
      heroLine.setAttribute('class', 'task-hero');
      /************ TOOLBAR ON TASK  **********************/

      var toolBar = document.createElement('div');
      toolBar.setAttribute('class', 'task-toolbar');
      this.detailsButton = document.createElement('button');
      this.detailsButton.setAttribute('class', 'btn-icon');

      if (this.showingDetails == true) {
        this.detailsButton.innerHTML = '<i class="fa fa-angle-up fa-2x"></i>';
      } else {
        this.detailsButton.innerHTML = '<i class="fa fa-angle-down fa-2x"></i>';
      }

      var deleteButton = document.createElement('button');
      deleteButton.setAttribute('class', 'btn-icon');
      deleteButton.innerHTML = '<i class="fa fa-times fa-2x"></i>';
      var heroText = document.createElement('span');
      heroText.setAttribute('class', 'hero-text');
      heroText.textContent = this.taskName; //+ " ID :" + this.taskID; for debug

      this.detailsBlock = document.createElement('div');

      if (this.showingDetails == true) {
        this.detailsBlock.setAttribute('class', 'task-details-block');
      } else {
        this.detailsBlock.setAttribute('class', 'hidden');
      }
      /************ Task details are shown here *************/


      var taskDate = document.createElement('p');
      taskDate.textContent = "Due date: " + this.dueDate;
      var taskETA = document.createElement('p');
      taskETA.textContent = "Estimated Time: " + this.eta;
      var taskPriority = document.createElement('p');
      taskPriority.textContent = "Priority: " + this.priority;
      var taskStartTime = document.createElement('p');
      taskStartTime.textContent = "Start time: " + this.startTime;
      var taskEndTime = document.createElement('p');
      taskEndTime.textContent = "End time: " + this.endTime;
      this.timeSpent = document.createElement('span');
      this.timeSpent.setAttribute('class', 'task-time-spent');
      var timeSpentId = 'timespent_' + this.taskID;
      this.timeSpent.setAttribute('id', timeSpentId);
      /************* add to dom  **********************/

      heroLine.appendChild(heroText);
      heroLine.appendChild(this.timeSpent);
      toolBar.appendChild(this.detailsButton);
      toolBar.appendChild(deleteButton);
      taskDiv.appendChild(heroLine);
      taskDiv.appendChild(toolBar);
      this.detailsBlock.appendChild(taskDate);
      this.detailsBlock.appendChild(taskETA);

      if (this.startTime) {
        this.detailsBlock.appendChild(taskStartTime);
      }

      if (this.endTime) {
        this.detailsBlock.appendChild(taskEndTime);
      }

      taskDiv.appendChild(this.detailsBlock);
      this.board.tasks.appendChild(taskDiv);
      /* ******************** ADD EVENT HANDLERS *************************************/

      /* I need a reference of the task object(this) that created this delete button */

      /* taskObject is to remeber this when we move out of the context */

      var $taskObject = this;
      deleteButton.addEventListener('click', function () {
        Task.removeTask($taskObject);
      }, false);
      this.detailsButton.addEventListener('click', function () {
        $taskObject.toggleView();
      }, false);
      /*************** drag & drop of tasks between boards (Drag starts here) ************************/

      taskDiv.ondragstart = function ($event) {
        console.log("$event.target.id = " + $event.target.id);
        $event.dataTransfer.setData("Text", $event.target.id);
        $event.target.style.opacity = "0.4"; //Show the board name on console
        //const result = Task.allTasks.filter(task => task.taskID == $event.target.id);
        //console.log(JSON.stringify(result));            
      };

      this.calcTimeSpent();
    }
  }, {
    key: "unRender",
    value: function unRender() {
      var $domBoardID = '#B\\:' + this.board.boardID + " .all-tasks";
      var tasksDOM = document.querySelector($domBoardID);

      if (tasksDOM) {
        tasksDOM.innerHTML = '';
      } else {
        console.log('unrendered failed at line 315');
      } //this.board.tasks.innerHTML = '';

    }
  }, {
    key: "reRender",
    value: function reRender() {
      this.unRender();
      this.render();
    }
  }], [{
    key: "getAllTask",
    value:
    /************************************************************************
     *      static is common to all instances since they're called          *
     *      on the class itself.                                            */

    /************* get all tasks from persistent store *****************/
    function getAllTask() {
      var $tasks = _database.default.readAllTasks();

      for (var $taskIndex in $tasks) {
        var $task = $tasks[$taskIndex];

        var $board = _board.default.getBoardById($task.boardID);

        var $newTask = new Task($task.taskID, $task.taskName, $task.dueDate, $task.eta, $task.completionTime, $task.priority, $task.completionStatus, $task.startTime, $task.endTime, $board);
        $newTask.render();
        Task.allTasks.push($newTask);
      }
    }
  }, {
    key: "isDoing",
    value: function isDoing() {
      Task.doingSomething = false;
      Task.allTasks.forEach(function (task) {
        console.log('Checking borad id of task = ' + task.board.boardID + ": Task ->" + task.taskID);

        if (task.board.boardID === 2) {
          Task.doingSomething = true;
        }

        ;
      });
      return Task.doingSomething;
    }
  }, {
    key: "renderAll",
    value: function renderAll() {
      // let container = document.getElementById();
      Task.allTasks.forEach(function (task) {
        task.render();
      });
    }
  }, {
    key: "unrenderAll",
    value: function unrenderAll() {
      // let container = document.getElementById();
      Task.allTasks.forEach(function (task) {
        task.unRender();
      });
    }
  }, {
    key: "removeTask",
    value: function removeTask($taskObject) {
      var $yes = confirm("Do you want to delete Task '" + $taskObject.taskName + " ID " + $taskObject.taskID + "?"); //alert(yes);

      if ($yes == true) {
        var result = Task.allTasks.filter(function (task) {
          return task.taskID != $taskObject.taskID;
        });
        Task.unrenderAll();
        Task.allTasks = result;
        Task.renderAll();

        _database.default.deleteTask($taskObject.taskID);
      }
    }
  }, {
    key: "getRunningTask",
    value: function getRunningTask() {
      var filtered = Task.allTasks.filter(function (task) {
        return task.board.boardID == 2;
      });
      if (filtered && filtered[0]) return filtered[0];else return false;
    }
    /************ create a new task from the supplied info of the form */

  }, {
    key: "saveTask",
    value: function saveTask($board) {
      /*** read form inputs ***/
      var $taskName = document.getElementById("cardName").value;
      var $dueDate = document.getElementById("cardDueDate").value;
      var $eta = document.getElementById("cardETA").value;
      var $completionTime = 0;
      var $priority = document.getElementById("cardPriority").value;
      var $completionStatus = "new";
      /*** remove the form as all data is read into memory**/

      var element = document.getElementById("taskEntryForm");
      element.parentNode.removeChild(element); // let $board =  $event.currentTarget.boardObject;

      /* create a new task using the supplied info */

      var newTask = new Task(0, $taskName, $dueDate, $eta, $completionTime, $priority, $completionStatus, 0, 0, $board);
      /* add the newly created task into the task list */

      Task.allTasks.push(newTask);
      newTask.render();

      _database.default.createTask(newTask);
    }
  }, {
    key: "onDragStart",
    value: function onDragStart($event) {
      console.log('Drag started : ' + JSON.stringify($event)); // $event.taskOnMove.setData("taskId", $event.target.id);
    }
  }, {
    key: "taskAddForm",
    value: function taskAddForm($theBoard) {
      //    alert('Created by ' + $theBoard.name) ;
      var taskEntryForm = document.createElement('div');
      taskEntryForm.setAttribute('class', 'task-entry-form');
      taskEntryForm.setAttribute('id', 'taskEntryForm');
      var deleteButton = document.createElement('button');
      deleteButton.setAttribute('class', 'close-task-icon');
      deleteButton.innerHTML = '<i class="fa fa-times fa-2x"></i>'; //  let hero = UI.createHero("New Task");
      //  taskEntryForm.appendChild(hero);
      //let toolBar = document.createElement('div');
      //toolBar.setAttribute('class','task-toolbar');             
      //toolBar.appendChild(deleteButton);

      taskEntryForm.appendChild(deleteButton);

      var cardName = _ui.default.createControl('text', 'Name', 'cardName', 'task-name', 'Task name');

      taskEntryForm.appendChild(cardName);

      var cardDueDate = _ui.default.createControlWithLabel('date', 'Due date', 'cardDueDate', 'due-date', 'Enter due date');

      taskEntryForm.appendChild(cardDueDate);

      var cardETA = _ui.default.createControlWithLabel('number', 'ETA', 'cardETA', 'eta', 'in hours');

      taskEntryForm.appendChild(cardETA);

      var cardPriority = _ui.default.createControlWithLabel('number', 'Task Priority', 'cardPriority', 'priority', 'Put 1-9,1 for low and  9 for max');

      taskEntryForm.appendChild(cardPriority);
      /*
       let saveButton = document.createElement('button');
      saveButton.textContent = "Save";      
      saveButton.boardObject = $theBoard;         
       saveButton.addEventListener('click',Task.saveTask);        
      taskEntryForm.appendChild(saveButton);
      */

      var saveButton = document.createElement('button');
      saveButton.innerHTML = '<i class="fa fa-check fa-2x"></i>';
      saveButton.setAttribute('class', 'save-task-icon'); //saveButton.boardObject = $theBoard; 
      //saveButton.addEventListener('click',Task.saveTask,false);

      saveButton.addEventListener('click', function () {
        Task.saveTask($theBoard);
      }, false);
      deleteButton.addEventListener('click', function () {
        var element = document.getElementById("taskEntryForm");
        element.parentNode.removeChild(element);
      }, false);
      taskEntryForm.appendChild(saveButton);
      $theBoard.boardLane.appendChild(taskEntryForm);
    }
  }]);

  return Task;
}();

exports.default = Task;

_defineProperty(Task, "allTasks", []);

_defineProperty(Task, "doingSomething", false);
},{"./service/database":"scripts/service/database.js","./board":"scripts/board.js","./helper/ui":"scripts/helper/ui.js"}],"scripts/music-player.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
Code reference : https://www.geeksforgeeks.org/create-a-music-player-using-javascript/
The code is recycled from the above source
*/
var MusicPlayer = /*#__PURE__*/function () {
  function MusicPlayer($board) {
    _classCallCheck(this, MusicPlayer);

    MusicPlayer.thePlayer = this;
    this.board = $board; // Specify globally used values

    this.trackIndex = 0;
    this.isPlaying = false;
    this.updateTimer = 0; // Define the list of tracks that have to be played

    this.track_list = [{
      name: "Shipping Lanes",
      artist: "Chad Crouch",
      image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
      path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Chad_Crouch/Arps/Chad_Crouch_-_Shipping_Lanes.mp3"
    }, {
      name: "Night Owl",
      artist: "Broke For Free",
      image: "https://images.pexels.com/photos/2264753/pexels-photo-2264753.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
      path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/WFMU/Broke_For_Free/Directionless_EP/Broke_For_Free_-_01_-_Night_Owl.mp3"
    }, {
      name: "Enthusiast",
      artist: "Tours",
      image: "https://images.pexels.com/photos/3100835/pexels-photo-3100835.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
      path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Tours/Enthusiast/Tours_-_01_-_Enthusiast.mp3"
    }]; //  this.loadTrack(this.track_index);
  }

  _createClass(MusicPlayer, [{
    key: "loadTrack",
    value: function loadTrack(track_index) {
      this.trackIndex = track_index; //console.log('Loading track ..' + this.trackIndex);
      // Clear the previous seek timer

      clearInterval(this.updateTimer);
      this.resetValues(); // Load a new track

      this.currentTrack.src = this.track_list[this.trackIndex].path;
      this.currentTrack.load(); // var x = this.currentTrack;
      // console.log('Duration = ' + x.duration);
      // Update details of the track
      //this.track_art.style.backgroundImage = "url(" + this.track_list[track_index].image + ")";

      this.trackName.textContent = this.track_list[this.trackIndex].name;
      this.trackArtist.textContent = this.track_list[this.trackIndex].artist; //this.now_playing.textContent = "PLAYING " + (this.track_index + 1) + " OF " + this.track_list.length;
      // Set an interval of 1000 milliseconds
      // for updating the seek slider

      this.updateTimer = setInterval(this.seekUpdate, 1000); // Move to the next track if the current finishes playing
      // using the 'ended' event

      this.currentTrack.addEventListener("ended", function () {
        MusicPlayer.thePlayer.nextTrack;
      });
    } // Function to reset all values to their default

  }, {
    key: "resetValues",
    value: function resetValues() {
      this.currentTime.textContent = "00:00";
      this.totalDuration.textContent = "00:00";
      this.sliderRange.value = 0;
    }
  }, {
    key: "playPauseTrack",
    value: function playPauseTrack() {
      // Switch between playing and pausing
      // depending on the current state
      if (!this.isPlaying) this.playTrack();else this.pauseTrack();
    }
  }, {
    key: "playTrack",
    value: function playTrack() {
      // Play the loaded track
      this.currentTrack.play();
      this.isPlaying = true; // Replace icon with the pause icon

      this.playpauseTrack.innerHTML = '<i class="fa fa-pause-circle fa-3x"></i>';
    }
  }, {
    key: "pauseTrack",
    value: function pauseTrack() {
      // Pause the loaded track
      this.currentTrack.pause();
      this.isPlaying = false; // Replace icon with the play icon

      this.playpauseTrack.innerHTML = '<i class="fa fa-play-circle fa-3x"></i>';
    }
  }, {
    key: "seekTo",
    value: function seekTo() {
      // Calculate the seek position by the
      // percentage of the seek slider
      // and get the relative duration to the track
      this.seekto = this.currentTrack.duration * (this.sliderRange.value / 100); // Set the current track position to the calculated seek position

      this.currentTrack.currentTime = this.seekto;
    }
  }, {
    key: "setVolume",
    value: function setVolume() {
      // Set the volume according to the
      // percentage of the volume slider set
      this.currentTrack.volume = this.volume_slider.value / 100;
    }
  }, {
    key: "seekUpdate",
    value: function seekUpdate() {
      var seekPosition = 0; // 

      if (MusicPlayer.duration && !isNaN(MusicPlayer.duration)) {
        seekPosition = MusicPlayer.thePlayer.currentTrack.currentTime * (100 / MusicPlayer.duration);
        MusicPlayer.thePlayer.sliderRange.value = seekPosition; // Calculate the time left and the total duration

        var currentMinutes = Math.floor(MusicPlayer.thePlayer.currentTrack.currentTime / 60);
        var currentSeconds = Math.floor(MusicPlayer.thePlayer.currentTrack.currentTime - currentMinutes * 60);
        var durationMinutes = Math.floor(MusicPlayer.thePlayer.currentTrack.duration / 60);
        var durationSeconds = Math.floor(MusicPlayer.thePlayer.currentTrack.duration - durationMinutes * 60); // Add a zero to the single digit time values

        if (currentSeconds < 10) {
          currentSeconds = "0" + currentSeconds;
        }

        if (durationSeconds < 10) {
          durationSeconds = "0" + durationSeconds;
        }

        if (currentMinutes < 10) {
          currentMinutes = "0" + currentMinutes;
        }

        if (durationMinutes < 10) {
          durationMinutes = "0" + durationMinutes;
        } // Display the updated duration


        MusicPlayer.thePlayer.currentTime.textContent = currentMinutes + ":" + currentSeconds;
        MusicPlayer.thePlayer.totalDuration.textContent = durationMinutes + ":" + durationSeconds;
      }
    }
  }, {
    key: "render",
    value: function render() {
      // Create the audio element for the player
      this.currentTrack = new Audio(); // document.createElement('audio');
      //  this.currentTrack.setAttribute("controls", "controls");

      var track = this.currentTrack;
      this.currentTrack.addEventListener('loadedmetadata', function (event) {
        MusicPlayer.duration = track.duration; //console.log("Duration 1 = " + track.duration );
      });
      var musicPlayerDiv = document.createElement('div');
      musicPlayerDiv.setAttribute('class', 'player-div');
      var rowOne = document.createElement('div');
      rowOne.setAttribute('class', 'row');
      this.playpauseTrack = document.createElement('div');
      this.playpauseTrack.setAttribute('class', 'col-1 playpause-track');
      this.playpauseTrack.setAttribute('id', 'playpauseTrack');
      this.playpauseTrack.innerHTML = '<i class="fa fa-play-circle fa-3x"></i>';
      var $thePlayer = this;
      this.playpauseTrack.addEventListener('click', function () {
        MusicPlayer.PlayPauseTrack($thePlayer);
      }, false);
      var detailsBlock = document.createElement('div');
      detailsBlock.setAttribute('class', 'col-11 track-details');
      this.trackName = document.createElement('div');
      this.trackName.setAttribute('class', 'track-name');
      detailsBlock.appendChild(this.trackName);
      this.trackArtist = document.createElement('div');
      this.trackArtist.setAttribute('class', 'track-artist');
      detailsBlock.appendChild(this.trackArtist);
      detailsBlock.appendChild(this.currentTrack);
      /************** player seek slider ********/

      this.seekSlider = document.createElement('div');
      this.seekSlider.setAttribute('class', 'slider_container');
      this.prevTrack = document.createElement('div');
      this.prevTrack.innerHTML = '<i class="fa fa-step-backward fa-1x"></i>';
      this.prevTrack.addEventListener('click', function () {
        MusicPlayer.prevTrack();
      }, false);
      this.currentTime = document.createElement('div');
      this.currentTime.setAttribute('class', 'current-time');
      this.sliderRange = document.createElement('input');
      this.sliderRange.setAttribute('type', 'range');
      this.sliderRange.setAttribute('min', '1');
      this.sliderRange.setAttribute('max', '100');
      this.sliderRange.setAttribute('class', 'music-time-slider');
      this.totalDuration = document.createElement('div');
      this.totalDuration.setAttribute('class', 'total-duration');
      this.nextTrack = document.createElement('div');
      this.nextTrack.innerHTML = '<i class="fa fa-step-forward fa-1x"></i>';
      this.nextTrack.addEventListener('click', function () {
        MusicPlayer.nextTrack();
      }, false);
      this.seekSlider.appendChild(this.prevTrack);
      this.seekSlider.appendChild(this.currentTime);
      this.seekSlider.appendChild(this.sliderRange);
      this.seekSlider.appendChild(this.totalDuration);
      this.seekSlider.appendChild(this.nextTrack);
      detailsBlock.appendChild(this.seekSlider);
      rowOne.appendChild(this.playpauseTrack);
      rowOne.appendChild(detailsBlock);
      musicPlayerDiv.appendChild(rowOne);
      this.board.toolBoxSection.appendChild(musicPlayerDiv);
      /* event binding */
      //playpauseTrack

      /*
      let $playpauseTrack = document.getElementById('playpauseTrack');
      playpauseTrack.addEventListener('click',MusicPlayer.PlayPauseTrack,false);        
       let $seek_slider = document.getElementById('seek_slider');        
      
      $seek_slider.onchange = function($event){          
          MusicPlayer.thePlayer.seekTo();
      };
      */
    }
  }], [{
    key: "PlayPauseTrack",
    value: function PlayPauseTrack($thePlayer) {
      //Only one music play in the system; Single Pattern        
      if (!MusicPlayer.thePlayer) {
        MusicPlayer.thePlayer = new MusicPlayer();
      } //MusicPlayer.thePlayer.playPauseTrack();


      $thePlayer.playPauseTrack();
    }
  }, {
    key: "nextTrack",
    value: function nextTrack() {
      // Go back to the first track if the
      // current one is the last in the track list
      if (MusicPlayer.thePlayer.trackIndex < MusicPlayer.thePlayer.track_list.length - 1) MusicPlayer.thePlayer.trackIndex += 1;else MusicPlayer.thePlayer.trackIndex = 0; // Load and play the new track

      MusicPlayer.thePlayer.loadTrack(MusicPlayer.thePlayer.trackIndex);
      MusicPlayer.thePlayer.playTrack();
    }
  }, {
    key: "prevTrack",
    value: function prevTrack() {
      // Go back to the last track if the
      // current one is the first in the track list
      if (MusicPlayer.thePlayer.trackIndex > 0) MusicPlayer.thePlayer.trackIndex -= 1;else MusicPlayer.thePlayer.trackIndex = MusicPlayer.thePlayer.track_list.length; // Load and play the new track

      MusicPlayer.thePlayer.loadTrack(MusicPlayer.thePlayer.trackIndex);
      MusicPlayer.thePlayer.playTrack();
    }
  }]);

  return MusicPlayer;
}();

exports.default = MusicPlayer;

_defineProperty(MusicPlayer, "thePlayer", void 0);

_defineProperty(MusicPlayer, "duration", void 0);
},{}],"scripts/dictionary.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
Dictionary : https://dictionaryapi.dev/
*/
var Dictionary = /*#__PURE__*/function () {
  function Dictionary($board) {
    _classCallCheck(this, Dictionary);

    var $theDictionary = this;
    this.board = $board;
  }

  _createClass(Dictionary, [{
    key: "render",
    value: function render() {
      var dictionaryDiv = document.createElement('div');
      dictionaryDiv.setAttribute('class', 'dictionary-div');
      var searchBox = document.createElement('div');
      searchBox.setAttribute('class', 'search-box');
      /* Search input */

      var searchInput = document.createElement('input');
      searchInput.setAttribute('id', 'search-input');
      searchInput.setAttribute('class', 'search-input');
      searchInput.setAttribute('placeholder', 'Search here ...');
      searchBox.appendChild(searchInput);
      var searchFunctionButtons = document.createElement('div');
      searchFunctionButtons.setAttribute('class', 'search-box-buttons');
      /*  creating search button */

      var searchButton = document.createElement('button');
      searchButton.innerHTML = '<i class="fa fa-search fa-2x"></i>';
      searchButton.setAttribute('class', 'search-icon');
      searchButton.taskObject = this;
      searchButton.addEventListener('click', Dictionary.lookUp, false);
      searchFunctionButtons.appendChild(searchButton);
      var clearButton = document.createElement('button');
      clearButton.innerHTML = '<i class="fa fa-times fa-2x"></i>';
      clearButton.setAttribute('class', 'search-icon');
      clearButton.taskObject = this;
      clearButton.addEventListener('click', Dictionary.clearSearchBox, false);
      searchFunctionButtons.appendChild(clearButton);
      searchBox.appendChild(searchFunctionButtons);
      dictionaryDiv.appendChild(searchBox);
      /* search results display box */

      var searchResults = document.createElement('div');
      searchResults.setAttribute('id', 'search-results');
      searchResults.setAttribute('class', 'search-results hidden');
      dictionaryDiv.appendChild(searchResults);
      this.board.toolBoxSection.appendChild(dictionaryDiv);
    }
  }], [{
    key: "lookUp",
    value: function lookUp() {
      var $searchInput = document.getElementById("search-input");
      var $searchResults = document.getElementById("search-results");
      $searchResults.setAttribute('class', 'search-results'); // alert('You are look for : '+  $searchInput.value  );

      var $dictionaryEndPoint = "https://api.dictionaryapi.dev/api/v2/entries/en_US/" + $searchInput.value;
      var $request = new XMLHttpRequest();
      $request.open("GET", $dictionaryEndPoint); // --> Handling Response

      $request.onload = function () {
        var $data = JSON.parse(this.response);

        if ($request.status >= 200 && $request.status < 400) {
          console.log("success!!");
          console.log(JSON.stringify($data));
          Dictionary.showMeaning($data);
        } else {
          var errorMessage = document.createElement('p');
          errorMessage.textContent = "Error: Unable to process your API request. Status: " + $request.status; //content.appendChild(errorMessage);

          console.log(errorMessage.textContent);
        }
      };

      $request.send();
    }
  }, {
    key: "showMeaning",
    value: function showMeaning($data) {
      /* get the display element and clean it */
      var $meaning = document.getElementById("search-results");
      $meaning.innerHTML = "";
      $data.forEach(function ($item) {
        // Create title heading element
        Dictionary.AddElementToSearchResult($meaning, 'h2', $item.word, 'Search'); // Phonetics inner loop

        $item.phonetics.forEach(function ($item_phonetics) {
          Dictionary.AddElementToSearchResult($meaning, 'h3', $item_phonetics.text, 'Phonetics');
        }); // meaning part

        $item.meanings.forEach(function ($item_meaning) {
          Dictionary.AddElementToSearchResult($meaning, 'p', $item_meaning.partOfSpeech, 'Part of speech'); // definitions

          $item_meaning.definitions.forEach(function ($definition) {
            // Definition part
            Dictionary.AddElementToSearchResult($meaning, 'p', $definition.definition, 'Definition'); // Example

            Dictionary.AddElementToSearchResult($meaning, 'p', $definition.example, 'Example');
          });
        });
      });
    }
  }, {
    key: "AddElementToSearchResult",
    value: function AddElementToSearchResult($parentElement, $elementType, $textContent, $label) {
      var $elementToAdd = document.createElement($elementType);
      $elementToAdd.textContent = $label + ": " + $textContent;
      $parentElement.appendChild($elementToAdd);
    }
  }, {
    key: "clearSearchBox",
    value: function clearSearchBox() {
      var $searchInput = document.getElementById("search-input");
      $searchInput.value = '';
      var $searchResults = document.getElementById("search-results");
      $searchResults.setAttribute('class', 'hidden');
    }
  }]);

  return Dictionary;
}();

exports.default = Dictionary;

_defineProperty(Dictionary, "$theDictionary", void 0);
},{}],"scripts/flow-timer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ui = _interopRequireDefault(require("./helper/ui"));

var _database = _interopRequireDefault(require("./service/database"));

var _task = _interopRequireDefault(require("./task"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FlowTimer = /*#__PURE__*/function () {
  function FlowTimer($board) {
    _classCallCheck(this, FlowTimer);

    var $theFlowTimer = this;
    this.board = $board;
    setInterval(FlowTimer.tick, 1000);
  }

  _createClass(FlowTimer, [{
    key: "render",
    value: function render() {
      var timerDiv = document.createElement('div');
      timerDiv.setAttribute('class', 'flow-timer-div');
      this.taskDetails = document.createElement('div');
      this.taskDetails.setAttribute('class', 'task-details');
      this.taskDetails.innerHTML = "No task running!";
      timerDiv.appendChild(this.taskDetails);
      /* Clock Display */

      var clockDisplay = document.createElement('div');
      clockDisplay.setAttribute('id', 'clock-display');
      clockDisplay.setAttribute('class', 'clock-display');
      var clockDigits = document.createElement('div');
      clockDigits.setAttribute('id', 'clock-display-digits');
      clockDigits.setAttribute('class', 'digits');
      var ampmDisplay = document.createElement('div');
      ampmDisplay.setAttribute('id', 'clock-display-ampm');
      ampmDisplay.setAttribute('class', 'am-pm');
      timerDiv.appendChild(ampmDisplay); // clockDisplay.appendChild(ampmDisplay);    

      clockDisplay.appendChild(clockDigits);
      timerDiv.appendChild(clockDisplay);
      /*  creating start and stop buttons for stop watch */

      var toolboxDiv = document.createElement('div');
      toolboxDiv.setAttribute('class', 'flow-timer-toolbox');
      this.startStopButton = document.createElement('button');
      this.startStopButton.textContent = "Start";
      this.startStopButton.setAttribute('class', 'btn btn-start'); // this.startStopButton.setAttribute('id','btn-watch-start');    

      var taskObject = this;
      this.startStopButton.addEventListener('click', function () {
        FlowTimer.onButtonWatchClicked(taskObject);
      });
      toolboxDiv.appendChild(this.startStopButton);
      timerDiv.appendChild(toolboxDiv);
      this.board.toolBoxSection.appendChild(timerDiv);
    }
  }], [{
    key: "tick",
    value: function tick() {
      var theDisplay = document.getElementById("clock-display-digits"); // let theAMPM = document.getElementById("clock-display-ampm");

      if (FlowTimer.$stopWatchState == 'running') {
        FlowTimer.$stopWatchTime++;
        theDisplay.innerHTML = _ui.default.formatTimeElapsed(FlowTimer.$stopWatchTime); // theAMPM.setAttribute('class','hidden');
      } else {
        var dateTime = new Date();
        var hrs = dateTime.getHours();
        var mins = dateTime.getMinutes();
        var secs = dateTime.getSeconds(); // let ampm = hrs >= 12 ? "PM" : "AM";
        // hrs = hrs % 12;
        // hrs = hrs ? hrs : 12;

        mins = mins < 10 ? '0' + mins : mins;
        secs = secs < 10 ? '0' + secs : secs;
        var time = hrs + ":" + mins + ":" + secs;
        theDisplay.innerHTML = time; //  theAMPM.setAttribute('class','am-pm col-1');
        //  theAMPM.innerHTML =   ampm ; 
      } //    console.log(JSON.stringify(dateTime));

    }
  }, {
    key: "onButtonWatchClicked",
    value: function onButtonWatchClicked($me) {
      var $runningTask = _task.default.getRunningTask(); // let $btnWatchStart  = document.getElementById("btn-watch-start") ;     


      if ($runningTask == false) {
        alert('No runnung task!');
        return false;
      }

      if (FlowTimer.$stopWatchState == 'stop') {
        $runningTask.startTime = new Date();
        FlowTimer.$stopWatchTime = 0;
        FlowTimer.$stopWatchState = 'running';
        $me.startStopButton.textContent = "Stop";
        $me.taskDetails.innerHTML = $runningTask.taskName;
      } else {
        $runningTask.endTime = new Date();
        FlowTimer.$stopWatchTime = 0;
        FlowTimer.$stopWatchState = 'stop';
        $me.startStopButton.textContent = "Start";
        $me.taskDetails.innerHTML = $runningTask.taskName;
      }

      var timeSpentId = 'timespent_' + $runningTask.taskID;
      var domElem = document.getElementById(timeSpentId);
      domElem.innerHTML = $runningTask.calcTimeSpent(); // $runningTask.reRender();

      _database.default.updateTask($runningTask);
    }
  }, {
    key: "stopWatch",
    value: function stopWatch() {
      FlowTimer.$stopWatchState = 'stop';
    }
  }]);

  return FlowTimer;
}();

exports.default = FlowTimer;

_defineProperty(FlowTimer, "$theFlowTimer", void 0);

_defineProperty(FlowTimer, "$stopWatchState", 'stop');

_defineProperty(FlowTimer, "$stopWatchTime", 0);
},{"./helper/ui":"scripts/helper/ui.js","./service/database":"scripts/service/database.js","./task":"scripts/task.js"}],"scripts/board.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _database = _interopRequireDefault(require("./service/database"));

var _task = _interopRequireDefault(require("./task"));

var _musicPlayer = _interopRequireDefault(require("./music-player"));

var _dictionary = _interopRequireDefault(require("./dictionary"));

var _flowTimer = _interopRequireDefault(require("./flow-timer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Board = /*#__PURE__*/function () {
  /************************************************************************
   *      specific to the object instances                                *
   *                                                                      */
  function Board(name) {
    _classCallCheck(this, Board);

    this.name = name;
    this.boardID = Number(Board.allBoards.length + 1);
  }

  _createClass(Board, [{
    key: "addMusicPlayer",
    value: function addMusicPlayer() {
      this.musicPlayer = new _musicPlayer.default(this);
      this.musicPlayer.render();
      this.musicPlayer.loadTrack(0);
    }
  }, {
    key: "addDictionary",
    value: function addDictionary() {
      this.dictionary = new _dictionary.default(this);
      this.dictionary.render();
    }
  }, {
    key: "addFlowTimer",
    value: function addFlowTimer() {
      this.flowTimer = new _flowTimer.default(this);
      this.flowTimer.render();
    }
  }, {
    key: "render",
    value: function render(container) {
      /* add a swimline (column) as a board */
      this.boardLane = document.createElement('div');
      var $domBoardID = 'B:' + this.boardID;
      this.boardLane.setAttribute('id', $domBoardID);
      this.boardLane.setAttribute('class', 'board ' + this.name); //Ref : https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes

      this.boardLane.setAttribute('data-web-app', 'board');
      /* add a label for the board */

      var boardLabel = document.createElement('div');
      boardLabel.setAttribute('class', 'label');
      boardLabel.innerHTML = this.name;
      this.boardLane.appendChild(boardLabel);
      /********* add control section   **********/

      var controlSection = document.createElement('div');
      controlSection.setAttribute('class', 'board-controls');
      this.boardLane.appendChild(controlSection);
      /* add a Task Add button for the board */

      /* <input type="button" name="addTask" id="addTask" value="Add"> */

      var addTaskButton = document.createElement('button');
      addTaskButton.setAttribute('class', 'btn btn-add-task');
      addTaskButton.textContent = "+";
      addTaskButton.boardObject = this;
      addTaskButton.addEventListener('click', Board.taskAddUI, false);
      controlSection.appendChild(addTaskButton);
      /******************* end of control section ****************/

      /************ add a toolbox section ******************/

      this.toolBoxSection = document.createElement('div');
      this.toolBoxSection.setAttribute('class', 'board-toolbox');
      this.boardLane.appendChild(this.toolBoxSection);
      /* add a placeholder for the all tasks */

      this.tasks = document.createElement('div');
      this.tasks.setAttribute('class', 'all-tasks droptarget'); //this.tasks.innerHTML =  "Put all tasks in here!";

      this.boardLane.appendChild(this.tasks);
      container.appendChild(this.boardLane);
      /*************** add drag and Drop functions  ******************/

      var $theBoard = this;
      this.boardLane.addEventListener("drop", function ($event) {
        //console.log($event.target.getAttribute('data-web-app'));
        $event.preventDefault();

        if ($event.target.getAttribute('data-web-app') == "board") {
          var $taskDomID = $event.dataTransfer.getData("Text");
          var $taskID = Number($taskDomID.replace('T:', ''));
          var $taskElement = document.getElementById($taskDomID);

          var $taskOnMove = _task.default.allTasks.filter(function (task) {
            return task.taskID == $taskID;
          });

          $taskElement.style.opacity = "1";

          if ($theBoard.boardID == 2 && _task.default.isDoing()) {
            alert('You can work only on one task at a time!');
            return false;
          }

          $taskOnMove[0].board = $theBoard;
          $event.target.appendChild($taskElement);

          _database.default.updateTask($taskOnMove[0]);
        } else {
          var _$taskDomID = $event.dataTransfer.getData("Text"); //console.log("Task DOM id " + $taskDomID);             


          var _$taskElement = document.getElementById(_$taskDomID);

          _$taskElement.style.opacity = "1";
          return false;
        }
      });
      this.boardLane.addEventListener("dragover", function (event) {
        event.preventDefault();
      });
      /******************** end of drag and drop functions ***************/
    }
  }], [{
    key: "add",
    value:
    /************************************************************************
     *      static is common to all instances                               *
     *                                                                      */
    function add(name) {
      var newBoard = new Board(name);
      Board.allBoards.push(newBoard);
      return newBoard;
    }
  }, {
    key: "renderAll",
    value: function renderAll($containerId) {
      var container = document.getElementById($containerId);
      Board.allBoards.forEach(function (board) {
        board.render(container);
      });
    }
  }, {
    key: "taskAddUI",
    value: function taskAddUI($event) {
      if ($event.currentTarget.boardObject.boardID == 2) {
        if (_task.default.isDoing()) {
          alert('You can work only on one task at a time!');
          return false;
        }
      }

      _task.default.taskAddForm($event.currentTarget.boardObject);
    }
  }, {
    key: "getBoardById",
    value: function getBoardById($boardID) {
      return Board.allBoards.filter(function (board) {
        return board.boardID === $boardID;
      })[0];
    }
  }]);

  return Board;
}();

exports.default = Board;

_defineProperty(Board, "allBoards", []);
},{"./service/database":"scripts/service/database.js","./task":"scripts/task.js","./music-player":"scripts/music-player.js","./dictionary":"scripts/dictionary.js","./flow-timer":"scripts/flow-timer.js"}],"../node_modules/regenerator-runtime/runtime.js":[function(require,module,exports) {
var define;
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  typeof module === "object" ? module.exports : {}
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}

},{}],"scripts/app.js":[function(require,module,exports) {
"use strict";

var _board = _interopRequireDefault(require("./board"));

var _task = _interopRequireDefault(require("./task"));

var _database = _interopRequireDefault(require("./service/database"));

require("regenerator-runtime/runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $toDo = _board.default.add('Todo');

var $doing = _board.default.add('Doing');

var $done = _board.default.add('Done');

var $id_to_pass = 'app';

_board.default.renderAll($id_to_pass);

$doing.addFlowTimer();
$doing.addDictionary();
$doing.addMusicPlayer();

_task.default.getAllTask();
},{"./board":"scripts/board.js","./task":"scripts/task.js","./service/database":"scripts/service/database.js","regenerator-runtime/runtime":"../node_modules/regenerator-runtime/runtime.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64796" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","scripts/app.js"], null)
//# sourceMappingURL=/app.c09d0a7b.js.map