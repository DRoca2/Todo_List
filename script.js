document.addEventListener('DOMContentLoaded', function () {
  // Function to add a new task
  function newElement() {
    // Get the input values from the "new-task", "new-due-time", "new-due-date" input fields
    var inputValue = document.getElementById('new-task').value;
    var dueDateValue = document.getElementById('new-due-date').value;
    var dueTimeValue = document.getElementById('new-due-time').value;

    // Check if the input is empty
    if (inputValue === '') {
      // Alert the user if they didn't enter a task
      alert('You must write something!');
    } else {
      // Create a new list item
      var li = document.createElement('li');

      // Create a checkbox for the new task
      var checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      li.appendChild(checkbox);

      // Construct the task text with due date and time if available
      var taskText = ' ' + inputValue;
      if (dueDateValue !== '') {
        taskText += ' (Due: ' + dueDateValue;
        if (dueTimeValue !== '') {
          // Convert the time to 12-hour format
          var timeComponents = dueTimeValue.split(':');
          var hours = parseInt(timeComponents[0]);
          var minutes = timeComponents[1];
          var ampm = hours >= 12 ? 'pm' : 'am';
          hours = hours % 12 || 12; // Convert 0 to 12 for midnight
          taskText += ' at ' + hours + ':' + minutes + ' ' + ampm;
        }
        taskText += ')';
      }

      // Add the task text to the list item
      li.appendChild(document.createTextNode(taskText));

      // Add a space between the text and buttons
      li.appendChild(document.createTextNode(' '));

      // Create "Edit" button
      var editButton = document.createElement('button');
      editButton.className = 'edit';
      editButton.appendChild(document.createTextNode('Edit'));
      li.appendChild(editButton);

      // Create "Delete" button
      var deleteButton = document.createElement('button');
      deleteButton.className = 'delete';
      deleteButton.appendChild(document.createTextNode('Delete'));
      li.appendChild(deleteButton);

      // Append the new list item to the "incomplete-tasks" list
      document.getElementById('incomplete-tasks').appendChild(li);

      // Clear the input field
      document.getElementById('new-task').value = '';
      document.getElementById('new-due-date').value = '';
      document.getElementById('new-due-time').value = '';

      // Set event listeners for the new task
      setEventListeners(li);
    }
  }

  // Function to move task to completed section
  // Function to move task to completed section
  function taskCompleted() {
    // Get the parent list item of the checkbox
    var listItem = this.parentNode;

    // Check if listItem exists and contains the required elements
    if (listItem && listItem.querySelector && listItem.querySelector('input[type="checkbox"]') && listItem.querySelector('.edit') && listItem.querySelector('.delete')) {
      //console.log('Found listItem and required elements:', listItem);

      // Get the "completed-tasks" list
      var completedTasksList = document.getElementById('completed-tasks');

      // Check if the task is already in the completed section
      if (listItem.parentNode === completedTasksList) {
        return;
      }

      // Add strikethrough style to the task text
      listItem.style.textDecoration = 'line-through';

      // Remove existing 'Edit' and 'Delete' buttons
      var existingEditButton = listItem.querySelector('.edit');
      var existingDeleteButton = listItem.querySelector('.delete');

      if (existingEditButton && existingDeleteButton) {
        existingEditButton.parentNode.removeChild(existingEditButton);
        existingDeleteButton.parentNode.removeChild(existingDeleteButton);

        // Append the task to the "completed-tasks" list
        completedTasksList.appendChild(listItem);

        // Set event listeners for the completed task
        setEventListeners(listItem);

        // Disable the checkbox
        this.checked = true;
        this.disabled = true;
      } else {
        console.error('Error: existing buttons not found.');
      }
    } else {
      console.error('Error: listItem or required elements not found.');
      //console.log('listItem:', listItem);
    }
  }

  // Function to edit task
  function editTask() {
    // Get the parent list item of the "Edit" button
    var listItem = this.parentNode;

    // Check if listItem exists and contains the required elements
    if (listItem && listItem.querySelector && listItem.querySelector('.edit') && listItem.querySelector('.delete')) {
      // Remove existing 'Edit' and 'Delete' buttons if they exist
      var existingEditButton = listItem.querySelector('.edit');
      var existingDeleteButton = listItem.querySelector('.delete');

      if (existingEditButton && existingDeleteButton) {
        existingEditButton.parentNode.removeChild(existingEditButton);
        existingDeleteButton.parentNode.removeChild(existingDeleteButton);

        // Create an input field for editing
        var editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.value = listItem.childNodes[1].nodeValue.trim();
        listItem.replaceChild(editInput, listItem.childNodes[1]);

        // Create "Save" button
        var saveButton = document.createElement('button');
        saveButton.className = 'edit';
        saveButton.appendChild(document.createTextNode('Save'));
        listItem.appendChild(saveButton);

        // Create "Delete" button
        var deleteButton = document.createElement('button');
        deleteButton.className = 'delete';
        deleteButton.appendChild(document.createTextNode('Delete'));
        listItem.appendChild(deleteButton);

        // Remove the event listener for the "Save" button
        saveButton.removeEventListener('click', saveTask);

        // Update the event listener for the "Save" button
        saveButton.addEventListener('click', function () {
          saveTask(listItem);
        });

        // Set event listeners for the task during editing
        setEventListeners(listItem);
      } else {
        console.error('Error: existing buttons not found.');
      }
    } else {
      console.error('Error: listItem or required elements not found.');
      //console.log('listItem:', listItem);
    }
  }

  // Function to save edited task
  function saveTask(listItem) {
    // Check if listItem exists and contains the required elements
    if (listItem && listItem.querySelector) {
      // Get the input field for editing
      var editInput = listItem.querySelector('input[type="text"]');

      if (editInput) {
        // Create a text node with the edited content
        var textNode = document.createTextNode(editInput.value);

        // Replace the original task text with the edited content
        listItem.replaceChild(textNode, listItem.childNodes[1]);

        // Remove the 'Save' and 'Delete' buttons
        var saveButton = listItem.querySelector('.edit');
        var deleteButton = listItem.querySelector('.delete');

        if (saveButton) {
          listItem.removeChild(saveButton);
        }
        if (deleteButton) {
          listItem.removeChild(deleteButton);
        }

        // Create "Edit" button
        var editButton = document.createElement('button');
        editButton.className = 'edit';
        editButton.appendChild(document.createTextNode('Edit'));
        listItem.appendChild(editButton);

        // Create "Delete" button
        var deleteButton = document.createElement('button');
        deleteButton.className = 'delete';
        deleteButton.appendChild(document.createTextNode('Delete'));
        listItem.appendChild(deleteButton);

        // Set event listeners for the task after editing
        setEventListeners(listItem);
      } else {
        console.error('Error: editInput not found.');
      }
    } else {
      console.error('Error: listItem or required elements not found.');
      //console.log('listItem:', listItem);
    }
  }

  // Function to delete task
  function deleteTask() {
    // Get the parent list item of the "Delete" button
    var listItem = this.parentNode;
    // Get the parent unordered list
    var ul = listItem.parentNode;
    // Remove the task from the list
    ul.removeChild(listItem);
  }

  function clearTasks() {
    document.getElementById('incomplete-tasks').innerHTML = '';
    document.getElementById('completed-tasks').innerHTML = '';
  }
  // Event listener for the "Clear" button
  document.getElementById('clear').addEventListener('click', clearTasks);

  // Dark/Light mode toggle function
  function toggleMode() {
    //console.log('Toggle mode function called');
    // Toggle the "dark-mode" class on the body element
    document.body.classList.toggle('dark-mode');

    // Add a fetch request to your Flask backend
    fetch('http://localhost:5000/toggle_mode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        //console.log('Success:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  // Set event listener for the "Toggle Dark/Light Mode" button
  document.getElementById('mode-toggle').addEventListener('click', toggleMode);

  // Set initial event listeners for existing completed tasks
  var completedTasks = document.querySelectorAll('#completed-tasks li');
  completedTasks.forEach(function (task) {
    setTimeout(function () {
      setEventListeners(task, true); // Pass true to indicate that these are completed tasks
    }, 0);
  });

  // Set initial event listeners for existing tasks
  var incompleteTasks = document.querySelectorAll('#incomplete-tasks li');
  incompleteTasks.forEach(function (task) {
    setTimeout(function () {
      setEventListeners(task, false); // Pass false to indicate that these are incomplete tasks
    }, 0);
  });

  // Function to set event listeners for a task item
  function setEventListeners(listItem, isCompleted) {
    var checkbox = listItem.querySelector('input[type="checkbox"]');
    var editButton = listItem.querySelector('.edit');
    var deleteButton = listItem.querySelector('.delete');

    checkbox.addEventListener('change', taskCompleted);

    // Check if listItem exists and contains the required elements
    if (listItem && listItem.querySelector && checkbox) {
      //console.log('Found listItem and required elements:', listItem);
      //console.log('checkbox:', checkbox);

      if (!isCompleted) {
        // Only add event listeners for edit and delete buttons if the checkbox is not checked
        if (editButton) {
          editButton.addEventListener('click', editTask);
        }
        if (deleteButton) {
          deleteButton.addEventListener('click', deleteTask);
        }
      }
    } else {
      console.error('Error: listItem or required elements not found.');
      //console.log('listItem:', listItem);
      //console.log('checkbox:', checkbox);
      //console.log('editButton:', editButton);
      //console.log('deleteButton:', deleteButton);
    }
  }

  // Event listener for the "Add" button
  document.querySelector('.add').addEventListener('click', newElement);

});
