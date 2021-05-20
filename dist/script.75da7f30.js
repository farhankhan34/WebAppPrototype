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
  function Task($taskName, $dueDate, $eta, $completionTime, $priority, $completionStatus, $container) {
    _classCallCheck(this, Task);

    this.taskName = $taskName;
    this.dueDate = $dueDate, this.eta = $eta;
    this.completionTime = $completionTime;
    this.priority = $priority;
    this.completionStatus = $completionStatus;
    this.container = $container; // Give a unique id for each task

    this.taskID = Task.allTasks.length + 1;
  }

  _createClass(Task, [{
    key: "render",
    value: function render() {
      var taskDiv = document.createElement('div');
      taskDiv.setAttribute('class', 'card');
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
      this.container.appendChild(taskDiv);
    }
  }, {
    key: "unRender",
    value: function unRender() {
      this.container.innerHTML = '';
    }
  }], [{
    key: "add",
    value:
    /************************************************************************
     *      static is common to all instances since they're called          *
     *      on the class itself.                                            */
    function add($taskName, $dueDate, $eta, $completionTime, $priority, $completionStatus, $container) {
      /* create a new task using the supplied info */
      var newTask = new Task($taskName, $dueDate, $eta, $completionTime, $priority, $completionStatus, $container); //newTask.unRender();

      newTask.render();
      /* add the newly created task into the task list */

      Task.allTasks.push(newTask);
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
      console.log($event);
      console.log($event.currentTarget);
      console.log($event.currentTarget.taskObject); //alert("Delete Task '" + $event.currentTarget.taskID + "' ?");
      //Task.allTasks.pop();

      /*
              const result = Task.allTasks.filter(task => task.taskID != $event.currentTarget.taskObject.taskID);
      
              Task.allTasks = result;
      
              Task.unrenderAll();
              Task.renderAll();
        */
    }
  }]);

  return Task;
}();

exports.default = Task;

_defineProperty(Task, "allTasks", []);
},{}],"scripts/board.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _task = _interopRequireDefault(require("./task"));

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

    /* add a swimline (column) as a board */
    this.boardLane = document.createElement('div');
    this.boardLane.setAttribute('class', 'board');
    this.name = name;
  }

  _createClass(Board, [{
    key: "addTask",
    value: function addTask($taskName, $dueDate, $eta, $completionTime, $priority, $completionStatus) {
      _task.default.add($taskName, $dueDate, $eta, $completionTime, $priority, $completionStatus, this.boardLane);
    }
  }, {
    key: "render",
    value: function render(container) {
      /* add a label for the board */
      var boardLabel = document.createElement('div');
      boardLabel.setAttribute('class', 'label');
      boardLabel.innerHTML = this.name;
      this.boardLane.appendChild(boardLabel);
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
  }]);

  return Board;
}();

exports.default = Board;

_defineProperty(Board, "allBoards", []);
},{"./task":"scripts/task.js"}],"script.js":[function(require,module,exports) {
"use strict";

var _board = _interopRequireDefault(require("./scripts/board"));

var _task = _interopRequireDefault(require("./scripts/task"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//console.log('Blah!');
var button = document.getElementById("show-hide-task-form");
button.addEventListener("click", function () {
  if (document.getElementById("taskEntryForm").style.visibility == 'hidden') {
    document.getElementById("taskEntryForm").style.visibility = 'visible';
  } else {
    document.getElementById("taskEntryForm").style.visibility = 'hidden';
  }
});
/* test data */

var $taskName = "TEST Task";
var $dueDate = "17/05/20201";
var $eta = "3days";
var $completionTime = "";
var $priority = "3";
var $completionStatus = "new";

var toDo = _board.default.add('Todo'); //console.log("object name " + toDo.name);
//console.log("object id " + toDo.name);


var doing = _board.default.add('Doing');

var done = _board.default.add('Done');

_board.default.renderAll('container');

$taskName = "I will to next";
toDo.addTask($taskName, $dueDate, $eta, $completionTime, $priority, $completionStatus);
$taskName = "Working on";
doing.addTask($taskName, $dueDate, $eta, $completionTime, $priority, $completionStatus);
$taskName = "Working on Another Task";
doing.addTask($taskName, $dueDate, $eta, $completionTime, $priority, $completionStatus);
$taskName = "Already Done";
done.addTask($taskName, $dueDate, $eta, $completionTime, $priority, $completionStatus); // Task.renderAll();

var addTaskButton = document.getElementById("addTask");
addTaskButton.addEventListener("click", function () {
  var $taskName = document.getElementById("taskName").value;
  var $dueDate = document.getElementById("dueDate").value;
  var $eta = "3days";
  var $completionTime = "";
  var $priority = "3";
  var $completionStatus = "new";
  toDo.addTask($taskName, $dueDate, $eta, $completionTime, $priority, $completionStatus); //Task.renderAll();
});
},{"./scripts/board":"scripts/board.js","./scripts/task":"scripts/task.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62618" + '/');

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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.js"], null)
//# sourceMappingURL=/script.75da7f30.js.map