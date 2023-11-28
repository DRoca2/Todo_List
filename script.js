document.addEventListener('DOMContentLoaded', function() {
  // Function to add a new task
  function newElement() {
    var inputValue = document.getElementById('new-task').value;
    if (inputValue === '') {
        alert('You must write something!');
    } else {
        var li = document.createElement('li');
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        li.appendChild(checkbox);
        li.appendChild(document.createTextNode(' ' + inputValue));

        // Add a space between the text and buttons
        li.appendChild(document.createTextNode(' '));

        var editButton = document.createElement('button');
        editButton.className = 'edit';
        editButton.appendChild(document.createTextNode('Edit'));
        li.appendChild(editButton);

        var deleteButton = document.createElement('button');
        deleteButton.className = 'delete';
        deleteButton.appendChild(document.createTextNode('Delete'));
        li.appendChild(deleteButton);

        document.getElementById('incomplete-tasks').appendChild(li);
        document.getElementById('new-task').value = '';

        setEventListeners(li);
      }
  }

  // Function to move task to completed section
function taskCompleted() {
  var listItem = this.parentNode;
  var completedTasksList = document.getElementById('completed-tasks');

  // Check if the task is already in the completed section
  if (listItem.parentNode === completedTasksList) {
    return;
  }

  listItem.style.textDecoration = 'line-through';

  // Remove existing 'Edit' and 'Delete' buttons
  var existingEditButton = listItem.querySelector('.edit');
  var existingDeleteButton = listItem.querySelector('.delete');

  existingEditButton.parentNode.removeChild(existingEditButton);
  existingDeleteButton.parentNode.removeChild(existingDeleteButton);

  completedTasksList.appendChild(listItem);
  setEventListenersForCompleted(listItem);
  this.checked = true;
  this.disabled = true;
}


  // Function to edit task
  function editTask() {
    var listItem = this.parentNode;

    // Remove existing 'Edit' and 'Delete' buttons
    var existingEditButton = listItem.querySelector('.edit');
    var existingDeleteButton = listItem.querySelector('.delete');

    existingEditButton.parentNode.removeChild(existingEditButton);
    existingDeleteButton.parentNode.removeChild(existingDeleteButton);

    var editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.value = listItem.childNodes[1].nodeValue.trim();
    listItem.replaceChild(editInput, listItem.childNodes[1]);

    var saveButton = document.createElement('button');
    saveButton.className = 'edit';
    saveButton.appendChild(document.createTextNode('Save'));
    listItem.appendChild(saveButton);

    var deleteButton = document.createElement('button');
    deleteButton.className = 'delete';
    deleteButton.appendChild(document.createTextNode('Delete'));
    listItem.appendChild(deleteButton);

    // Update the event listener for the Save button
    saveButton.addEventListener('click', saveTask);

    setEventListeners(listItem);
  }

  // Function to save edited task
  function saveTask() {
    var listItem = this.parentNode;
    var editInput = listItem.querySelector('input[type="text"]');
    var textNode = document.createTextNode(editInput.value);

    listItem.replaceChild(textNode, listItem.childNodes[1]); // Replace the correct child node

    // Remove the 'Save' and 'Delete' buttons
    listItem.removeChild(listItem.lastChild); // 'Delete' button
    listItem.removeChild(listItem.lastChild); // 'Save' button

    var editButton = document.createElement('button');
    editButton.className = 'edit';
    editButton.appendChild(document.createTextNode('Edit'));
    listItem.appendChild(editButton);

    var deleteButton = document.createElement('button');
    deleteButton.className = 'delete';
    deleteButton.appendChild(document.createTextNode('Delete'));
    listItem.appendChild(deleteButton);

    setEventListeners(listItem);
  }

  // Function to delete task
  function deleteTask() {
      var listItem = this.parentNode;
      var ul = listItem.parentNode;
      ul.removeChild(listItem);
  }

  // Function to clear all tasks
  function clearTasks() {
      document.getElementById('incomplete-tasks').innerHTML = '';
      document.getElementById('completed-tasks').innerHTML = '';
  }

  // Function to set event listeners for a task item
  function setEventListeners(listItem) {
    var checkbox = listItem.querySelector('input[type="checkbox"]');
    var editButton = listItem.querySelector('.edit');
    var deleteButton = listItem.querySelector('.delete');

    checkbox.addEventListener('change', taskCompleted);

    if (!checkbox.checked) {
        // Only add event listeners for edit and delete buttons if the checkbox is not checked
        editButton.addEventListener('click', editTask);
        deleteButton.addEventListener('click', deleteTask);
    }
  }

  // Set initial event listeners for existing completed tasks
  var completedTasks = document.querySelectorAll('#completed-tasks li');
  completedTasks.forEach(function (task) {
    setEventListeners(task);
  });

  // Set initial event listeners for existing tasks
  var incompleteTasks = document.querySelectorAll('#incomplete-tasks li');
  incompleteTasks.forEach(function (task) {
    setEventListeners(task);
  });

  // Event listener for add button
  document.querySelector('.add').addEventListener('click', newElement);

  // Event listener for clear button
  document.getElementById('clear').addEventListener('click', clearTasks);
});
