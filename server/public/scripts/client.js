console.log('JS is sourced!');

console.log("js");

function getToDos() {
  console.log("in getToDos");
  // axios call to server to get to dos
  axios.get("/todos")
  .then((response) => {
    renderToDos(response.data); // render to dos
  })
  .catch((error) => {
    console.log("error getting to do", error);
  });
} // end getToDos

function deleteToDos(todosId) {
  axios({
    method: "DELETE",
    url: `/todos/${todosId}`,
  })
    .then((response) => {
      console.log("todo targetted for delete: ", todosId);
      refreshToDos(); // refresh to dos
    })
    .catch((error) => {
      alert("Critical error, check deleteToDos");
    });
}

function saveToDos(todoToAdd) {
  console.log("in saveToDos", todoToAdd);
  // axios call to server to get to dos

  axios({
    method: "POST",
    url: "/todos",
    data: todoToAdd,
  })
    .then(function (response) {
      console.log("saveToDo() respons: ", response.data);
      refreshToDos();
      //needs to be refresh not render as the newly added quoala needs to be updated by get in database
    })
    .catch(function (error) {
      console.log("Error in POST", error);
      alert("Unable to add to do at this time. Please try again later.");
    });
}

//add a RenderToDos

function renderToDos(todos) {
  let todoTable = document.getElementById("viewToDos");
  //might have to let if program trouble
  todoTable.innerHTML = "";
  

  for (let i = 0; i < todos.length; i += 1) {
    let currentToDo = todos[i];
    // For each to do, append a new row to our table
    if (currentToDo.isComplete === false) {
      todoTable.innerHTML += `
      <tr data-testid="toDoItem" class="incomplete">
        <td>${currentToDo.text}</td>      
        <td>${currentToDo.isComplete  ? 'Yes' : 'No'}</td>
       <td> 
       <button data-testid="completeButton" onClick= "isFinished(${currentToDo.isComplete}, ${currentToDo.id})">
    Goal Complete
    </button>
    </td>
    <td>
    <button data-testid="deleteButton" onClick="deleteToDos(${currentToDo.id})">
    Delete
    </button>
    </td>
      </tr>


    `;
    } else if (currentToDo.isComplete === true) {
      todoTable.innerHTML += `
      <tr data-testid="toDoItem" class="completed">
        <td>${currentToDo.text}</td>      
       <td>${currentToDo.isComplete ? 'Yes' : 'No'}</td>
       <td>
       <button data-testid="deleteButton" onClick="deleteToDos(${currentToDo.id})">
       Delete
       </button>
       </td>

       <td> 
      </td>
      </tr>


    `;
    }
  }
}

//add refresh To Dos
function refreshToDos() {
  axios({
    method: "GET",
    url: "/todos",
  })
    .then(function (response) {
      console.log("refreshToDos() response", response.data);
      renderToDos(response.data);
    })
    .catch(function (error) {
      console.log("error in GET", error);
    });
}

function handleSubmit(event) {
  event.preventDefault();

  let todo = {};

  let todoText = document.getElementById("toDoItem").value

  let messageOutput = document.getElementById("messages") 


if (todoText === "") {
    messageOutput.innerHTML = "Failed to add to do, check input field!"
    return;
}
  todo.text = document.getElementById("toDoItem").value;

  saveToDos(todo);

  let form = document.getElementById("form");
  form.reset();
}
//get the info from the input

//call saveToDos

//clear the form

//getToDos();

// Fuction to change boolean value of complete task, AKA displys whether a to do is completed or not
// based on booleans true/false

// May need to change to do parameter below

function isFinished(complete, todoId) {
  console.log("changing transfer status: ", complete, todoId);

  // use axios to send a PUT request to change song rank
  // Send direction and id in URL
  // For .then, will call the render function to change the DOM

  // note to self, removed isRead from url

  axios({
    method: "PUT",
    url: "/todos/" + todoId,
    data: {
      complete: complete,
    },
  })
    .then((response) => {
      refreshToDos();
      // refreshToDos() will retrieve all to dos and then update the DOM
    })
    .catch((error) => {
      console.log("error", error);
    });
}

getToDos();
/* todos has
// text and isComplete, also id 
*/