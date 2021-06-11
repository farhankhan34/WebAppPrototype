import Board from './board';
import Task from './task';
import Database from './service/database';
import 'regenerator-runtime/runtime';
 

 let $toDo = Board.add('Todo');
 let $doing =  Board.add('Doing');
 let $done = Board.add('Done');
 
 let $id_to_pass = 'app' ;
 Board.renderAll($id_to_pass);

  $doing.addFlowTimer();
  $doing.addDictionary();
  $doing.addMusicPlayer();
  

  Task.getAllTask();
 



