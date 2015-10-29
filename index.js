var PouchDB = require('pouchdb');

var db = new PouchDB('todos');

function addTodo(text) {
	  
  var todo = {
    _id: new Date().toISOString(),
    title: text,
    completed: false
  };
	  
  db.put(todo, function callback(err, result) {
    if (!err) {
    console.log('Successfully posted a todo!');
    //console.log('err:', err);
    //console.log('result', result);


    }
  });
}
function showTodos() {
	  db.allDocs({include_docs: true, descending: true}, function(err, doc) {
		console.log(doc.rows);
	  });
	}

function completeTodo(todo) {
  todo.completed = true;
  db.put(todo);
}

function deleteTodo(todo) {
  db.remove(todo);
}

db.changes({
  since: 'now',
  live: true
}).on('change', showTodos);


addTodo("Walk Dog.");
addTodo("Wash Car.");

