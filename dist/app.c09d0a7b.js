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
})({"scripts/task.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Task = /*#__PURE__*/function () {
  /************************************************************************
   *      specific to the object instances                                *
   *                                                                      */
  function Task($taskName, $dueDate, $eta, $completionTime, $priority, $completionStatus, $board) {
    _classCallCheck(this, Task);

    this.taskName = $taskName;
    this.dueDate = $dueDate, this.eta = $eta;
    this.completionTime = $completionTime;
    this.priority = $priority;
    this.completionStatus = $completionStatus;
    this.board = $board; // Give a unique id for each task

    this.taskID = 'T:' + Number(Task.allTasks.length + 1);
  }

  _createClass(Task, [{
    key: "render",
    value: function render() {
      var taskDiv = document.createElement('div');
      taskDiv.setAttribute('class', 'card');
      taskDiv.setAttribute('id', this.taskID);
      taskDiv.setAttribute('draggable', 'true');

      taskDiv.ondragstart = function ($event) {
        $event.dataTransfer.setData("Text", $event.target.id);
        $event.target.style.opacity = "0.4"; //Show the board name on console

        var result = Task.allTasks.filter(function (task) {
          return task.taskID == $event.target.id;
        });
        console.log(JSON.stringify(result));
      };

      var taskText = document.createElement('h3');
      taskText.textContent = this.taskName;
      taskDiv.appendChild(taskText);
      var taskDate = document.createElement('p');
      taskDate.textContent = this.dueDate;
      taskDiv.appendChild(taskDate);
      var deleteButton = document.createElement('button');
      deleteButton.textContent = "Delete Task";
      /* I need a reference of the task object(this) that created this delete button */

      /* taskObject is to remeber this when we move out of the context */

      deleteButton.taskObject = this;
      deleteButton.addEventListener('click', Task.removeTask, false);
      taskDiv.appendChild(deleteButton);
      this.board.tasks.appendChild(taskDiv); // alert('Rendered!');
    }
  }, {
    key: "unRender",
    value: function unRender() {
      this.board.tasks.innerHTML = '';
    }
  }], [{
    key: "add",
    value:
    /************************************************************************
     *      static is common to all instances since they're called          *
     *      on the class itself.                                            */
    function add($taskName, $dueDate, $eta, $completionTime, $priority, $completionStatus, $board) {
      /* create a new task using the supplied info */
      var newTask = new Task($taskName, $dueDate, $eta, $completionTime, $priority, $completionStatus, $board); //newTask.unRender();
      // newTask.render();

      /* add the newly created task into the task list */

      Task.allTasks.push(newTask);
      newTask.render();
      console.log(Task.allTasks.length); //if(Task.allTasks.length <5)
      //return true;
      //Task.unrenderAll();
      //Task.renderAll();
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
    value: function removeTask($event) {
      // console.log($event);
      // console.log($event.currentTarget);
      // console.log($event.currentTarget.taskObject);
      alert("Delete Task '" + $event.currentTarget.taskID + "' ?"); //Task.allTasks.pop();

      var result = Task.allTasks.filter(function (task) {
        return task.taskID != $event.currentTarget.taskObject.taskID;
      });
      Task.allTasks = result;
      Task.unrenderAll();
      Task.renderAll();
    }
  }, {
    key: "saveTask",
    value: function saveTask($event) {
      var $taskName = document.getElementById("cardName").value;
      var $dueDate = document.getElementById("cardDueDate").value;
      var $eta = "3days";
      var $completionTime = "";
      var $priority = "3";
      var $completionStatus = "new";
      Task.add($taskName, $dueDate, $eta, $completionTime, $priority, $completionStatus, $event.currentTarget.boardObject); // getElementById('taskEntryForm').parentNode.removeChild(getElementById('taskEntryForm'));

      var element = document.getElementById("taskEntryForm");
      element.parentNode.removeChild(element);
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
      taskEntryForm.setAttribute('class', 'card card-form-div');
      taskEntryForm.setAttribute('id', 'taskEntryForm');
      var cardForm = document.createElement('div');
      cardForm.setAttribute('id', 'cardForm');
      taskEntryForm.appendChild(cardForm);
      var cardName = document.createElement('input');
      cardName.setAttribute('id', 'cardName');
      cardName.setAttribute('type', 'text');
      cardForm.appendChild(cardName);
      var cardDueDate = document.createElement('input');
      cardDueDate.setAttribute('id', 'cardDueDate');
      cardDueDate.setAttribute('type', 'date');
      cardForm.appendChild(cardDueDate);
      var cardETA = document.createElement('input');
      cardETA.setAttribute('id', 'cardETA');
      cardETA.setAttribute('type', 'date');
      cardForm.appendChild(cardETA);
      var cardCompletionTime = document.createElement('input');
      cardCompletionTime.setAttribute('id', 'cardCompletionTime');
      cardForm.appendChild(cardCompletionTime);
      var saveButton = document.createElement('button');
      saveButton.textContent = "Save";
      saveButton.boardObject = $theBoard;
      saveButton.addEventListener('click', Task.saveTask, false);
      cardForm.appendChild(saveButton);
      $theBoard.boardLane.appendChild(taskEntryForm);
    }
  }]);

  return Task;
}();

exports.default = Task;

_defineProperty(Task, "allTasks", []);
},{}],"scripts/music-player.js":[function(require,module,exports) {
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

    var $theMusicPlayer = this;
    this.board = $board; // Select all the elements in the HTML page
    // and assign them to a variable

    this.now_playing = document.querySelector(".now-playing");
    this.track_art = document.querySelector(".track-art");
    this.track_name = document.querySelector(".track-name");
    this.track_artist = document.querySelector(".track-artist");
    this.playpause_btn = document.querySelector(".playpause-track");
    this.next_btn = document.querySelector(".next-track");
    this.prev_btn = document.querySelector(".prev-track");
    this.seek_slider = document.querySelector(".seek_slider");
    this.volume_slider = document.querySelector(".volume_slider");
    this.curr_time = document.querySelector(".current-time");
    this.total_duration = document.querySelector(".total-duration"); // Specify globally used values

    this.track_index = 0;
    this.isPlaying = false;
    this.updateTimer = 0; // Create the audio element for the player

    this.curr_track = document.createElement('audio'); // Define the list of tracks that have to be played

    this.track_list = [{
      name: "Night Owl",
      artist: "Broke For Free",
      image: "https://images.pexels.com/photos/2264753/pexels-photo-2264753.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
      path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/WFMU/Broke_For_Free/Directionless_EP/Broke_For_Free_-_01_-_Night_Owl.mp3"
    }, {
      name: "Enthusiast",
      artist: "Tours",
      image: "https://images.pexels.com/photos/3100835/pexels-photo-3100835.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
      path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Tours/Enthusiast/Tours_-_01_-_Enthusiast.mp3"
    }, {
      name: "Shipping Lanes",
      artist: "Chad Crouch",
      image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
      path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Chad_Crouch/Arps/Chad_Crouch_-_Shipping_Lanes.mp3"
    }];
    this.loadTrack(this.track_index);
  }

  _createClass(MusicPlayer, [{
    key: "loadTrack",
    value: function loadTrack(track_index) {
      // Clear the previous seek timer
      clearInterval(this.updateTimer);
      this.resetValues(); // Load a new track

      this.curr_track.src = this.track_list[track_index].path;
      this.curr_track.load(); // Update details of the track

      this.track_art.style.backgroundImage = "url(" + this.track_list[track_index].image + ")";
      this.track_name.textContent = this.track_list[track_index].name;
      this.track_artist.textContent = this.track_list[track_index].artist;
      this.now_playing.textContent = "PLAYING " + (this.track_index + 1) + " OF " + this.track_list.length; // Set an interval of 1000 milliseconds
      // for updating the seek slider

      this.updateTimer = setInterval(this.seekUpdate, 1000); // Move to the next track if the current finishes playing
      // using the 'ended' event

      this.curr_track.addEventListener("ended", function () {
        MusicPlayer.thePlayer.nextTrack;
      }); // Apply a random background color

      this.random_bg_color();
    }
  }, {
    key: "random_bg_color",
    value: function random_bg_color() {
      // Get a random number between 64 to 256
      // (for getting lighter colors)
      var red = Math.floor(Math.random() * 256) + 64;
      var green = Math.floor(Math.random() * 256) + 64;
      var blue = Math.floor(Math.random() * 256) + 64; // Construct a color withe the given values

      var bgColor = "rgb(" + red + ", " + green + ", " + blue + ")"; // Set the background to the new color            

      var $thePlayer = document.getElementById('deco-player');
      $thePlayer.style.background = bgColor;
    } // Function to reset all values to their default

  }, {
    key: "resetValues",
    value: function resetValues() {
      this.curr_time.textContent = "00:00";
      this.total_duration.textContent = "00:00";
      this.seek_slider.value = 0;
    }
  }, {
    key: "playpauseTrack",
    value: function playpauseTrack() {
      // Switch between playing and pausing
      // depending on the current state
      if (!this.isPlaying) this.playTrack();else this.pauseTrack();
    }
  }, {
    key: "playTrack",
    value: function playTrack() {
      // Play the loaded track
      this.curr_track.play();
      this.isPlaying = true; // Replace icon with the pause icon

      this.playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
    }
  }, {
    key: "pauseTrack",
    value: function pauseTrack() {
      // Pause the loaded track
      this.curr_track.pause();
      this.isPlaying = false; // Replace icon with the play icon

      this.playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
      ;
    }
  }, {
    key: "nextTrack",
    value: function nextTrack() {
      // Go back to the first track if the
      // current one is the last in the track list
      if (this.track_index < this.track_list.length - 1) this.track_index += 1;else this.track_index = 0; // Load and play the new track

      loadTrack(this.track_index);
      playTrack();
    }
  }, {
    key: "prevTrack",
    value: function prevTrack() {
      // Go back to the last track if the
      // current one is the first in the track list
      if (this.track_index > 0) this.track_index -= 1;else this.track_index = this.track_list.length; // Load and play the new track

      loadTrack(this.track_index);
      playTrack();
    }
  }, {
    key: "seekTo",
    value: function seekTo() {
      // Calculate the seek position by the
      // percentage of the seek slider
      // and get the relative duration to the track
      this.seekto = this.curr_track.duration * (this.seek_slider.value / 100); // Set the current track position to the calculated seek position

      this.curr_track.currentTime = this.seekto;
    }
  }, {
    key: "setVolume",
    value: function setVolume() {
      // Set the volume according to the
      // percentage of the volume slider set
      this.curr_track.volume = this.volume_slider.value / 100;
    }
  }, {
    key: "seekUpdate",
    value: function seekUpdate() {
      var seekPosition = 0; // 

      if (MusicPlayer.thePlayer && !isNaN(MusicPlayer.thePlayer.curr_track.duration)) {
        seekPosition = MusicPlayer.thePlayer.curr_track.currentTime * (100 / MusicPlayer.thePlayer.curr_track.duration);
        MusicPlayer.thePlayer.seek_slider.value = seekPosition; // Calculate the time left and the total duration

        var currentMinutes = Math.floor(MusicPlayer.thePlayer.curr_track.currentTime / 60);
        var currentSeconds = Math.floor(MusicPlayer.thePlayer.curr_track.currentTime - currentMinutes * 60);
        var durationMinutes = Math.floor(MusicPlayer.thePlayer.curr_track.duration / 60);
        var durationSeconds = Math.floor(MusicPlayer.thePlayer.curr_track.duration - durationMinutes * 60); // Add a zero to the single digit time values

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


        MusicPlayer.thePlayer.curr_time.textContent = currentMinutes + ":" + currentSeconds;
        MusicPlayer.thePlayer.total_duration.textContent = durationMinutes + ":" + durationSeconds;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var musicPlayerDiv = document.createElement('div');
      musicPlayerDiv.setAttribute('class', 'player-div'); //musicPlayerDiv.setAttribute('id',this.taskID);
      // let Text = document.createElement('h3');
      // Text.textContent = "Music Player will be shown in here!";
      // musicPlayerDiv.appendChild(Text);

      var $thePlayer = document.getElementById('deco-player'); //console.log($thePlayer);

      var $theClone = $thePlayer.cloneNode(true);
      musicPlayerDiv.appendChild($theClone);
      $thePlayer.remove();
      this.board.boardLane.appendChild(musicPlayerDiv);
      /* event binding */
      //playpauseTrack

      var $playpauseTrack = document.getElementById('playpauseTrack');
      playpauseTrack.addEventListener('click', MusicPlayer.PlayPauseTrack, false);
      var $seek_slider = document.getElementById('seek_slider');

      $seek_slider.onchange = function ($event) {
        MusicPlayer.thePlayer.seekTo();
      };
    }
  }], [{
    key: "PlayPauseTrack",
    value: function PlayPauseTrack() {
      if (!MusicPlayer.thePlayer) {
        MusicPlayer.thePlayer = new MusicPlayer();
      }

      MusicPlayer.thePlayer.playpauseTrack();
    }
  }]);

  return MusicPlayer;
}();

exports.default = MusicPlayer;

_defineProperty(MusicPlayer, "thePlayer", void 0);
},{}],"scripts/board.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _task = _interopRequireDefault(require("./task"));

var _musicPlayer = _interopRequireDefault(require("./music-player"));

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
    this.boardID = 'B:' + Number(Board.allBoards.length + 1);
  }

  _createClass(Board, [{
    key: "addTask",
    value: function addTask($taskName, $dueDate, $eta, $completionTime, $priority, $completionStatus) {
      _task.default.add($taskName, $dueDate, $eta, $completionTime, $priority, $completionStatus, this);
    }
  }, {
    key: "addMusicPlayer",
    value: function addMusicPlayer() {
      this.musicPlayer = new _musicPlayer.default(this);
      this.musicPlayer.render();
    }
  }, {
    key: "render",
    value: function render(container) {
      /* add a swimline (column) as a board */
      this.boardLane = document.createElement('div');
      this.boardLane.setAttribute('id', this.boardID);
      this.boardLane.setAttribute('class', 'board');
      this.boardLane.setAttribute('class', 'droptarget'); //this.boardLane.addEventListener('ondrop',Board.onTaskDropped);
      //this.boardLane.addEventListener('ondragover',Board.onTaskDragOver);

      this.boardLane.addEventListener("drop", function ($event) {
        $event.preventDefault();

        if ($event.target.className == "droptarget") {
          var $taskID = $event.dataTransfer.getData("Text");
          var $taskElement = document.getElementById($taskID);
          $event.target.appendChild($taskElement);
          $taskElement.style.opacity = "1"; //finally attache the new board object with the task

          var $taskOnMove = _task.default.allTasks.filter(function (task) {
            return task.taskID == $taskID;
          }); //console.log("old board id " +  JSON.stringify($taskOnMove[0].board.boardID));
          //console.log("New board id " + $event.target.id);


          $taskOnMove[0].board = $event.target;
        }
      });
      this.boardLane.addEventListener("dragover", function (event) {
        //var data = event.dataTransfer.getData("Text");
        //console.log("ID" + data);
        event.preventDefault();
      });
      /* add a label for the board */

      var boardLabel = document.createElement('div');
      boardLabel.setAttribute('class', 'label');
      boardLabel.innerHTML = this.name;
      this.boardLane.appendChild(boardLabel);
      /* add a Task Add button for the board */

      /* <input type="button" name="addTask" id="addTask" value="Add"> */

      var addTaskButton = document.createElement('button');
      addTaskButton.textContent = "+";
      addTaskButton.boardObject = this;
      addTaskButton.addEventListener('click', Board.taskAddUI, false);
      this.boardLane.appendChild(addTaskButton);
      /* add a label for the board */

      this.tasks = document.createElement('div');
      this.tasks.setAttribute('class', 'all-tasks');
      this.tasks.innerHTML = "Put all tasks in here!";
      this.boardLane.appendChild(this.tasks);
      container.appendChild(this.boardLane);
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
      //alert($event.currentTarget.boardObject.name);
      _task.default.taskAddForm($event.currentTarget.boardObject);
    }
  }, {
    key: "onTaskDragOver",
    value: function onTaskDragOver($event) {
      $event.preventDefault();
      console.log('It on over...');
    }
  }, {
    key: "onTaskDropped",
    value: function onTaskDropped($event) {
      $event.preventDefault();
      var taskId = $event.taskOnMove.getData("taskId");
      $event.target.appendChild(document.getElementById(taskId));
      console.log('Dropped!');
    }
  }]);

  return Board;
}();

exports.default = Board;

_defineProperty(Board, "allBoards", []);
},{"./task":"scripts/task.js","./music-player":"scripts/music-player.js"}],"scripts/app.js":[function(require,module,exports) {
"use strict";

var _board = _interopRequireDefault(require("./board"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toDo = _board.default.add('Todo');

var doing = _board.default.add('Doing');

var done = _board.default.add('Done');

var $id_to_pass = 'app';

_board.default.renderAll($id_to_pass);
/* test data */

/* for development */


var $taskName = "TEST Task";
var $dueDate = "17/05/20201";
var $eta = "3days";
var $completionTime = "";
var $priority = "3";
var $completionStatus = "new";
doing.addMusicPlayer();
$taskName = "I will to next";
toDo.addTask($taskName, $dueDate, $eta, $completionTime, $priority, $completionStatus);
$taskName = "Working on";
doing.addTask($taskName, $dueDate, $eta, $completionTime, $priority, $completionStatus);
$taskName = "Working on Another Task";
doing.addTask($taskName, $dueDate, $eta, $completionTime, $priority, $completionStatus);
$taskName = "Already Done";
done.addTask($taskName, $dueDate, $eta, $completionTime, $priority, $completionStatus);
},{"./board":"scripts/board.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56680" + '/');

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