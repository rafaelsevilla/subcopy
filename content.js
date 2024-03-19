const getSubtasks = () => {
  // regular task view
  let subtasks = document.querySelectorAll('#view-subtasks .stsummary .issue-link');

  if (subtasks.length === 0) {
    // sidebar task view
    subtasks = document.querySelectorAll('#subtasks table .ghx-summary');
  }

  // get the title of each subtask and join them with a newline
  return Array.from(subtasks)
    .map(subtask => subtask.innerHTML)
    .join('\n');
}

const copySubtasks = () => {
  const taskList = getSubtasks();
  const copyFrom = document.createElement("textarea");
  copyFrom.textContent = taskList;
  document.body.appendChild(copyFrom);
  copyFrom.select();
  document.execCommand('copy');
  copyFrom.blur();
  document.body.removeChild(copyFrom);
}

const addButton = () => {
  const subtaskList = document.querySelector('.subtask-table-container') || document.querySelector('#subtasks .mod-content');

  if (subtaskList) {
    const button = document.createElement('button');
    button.textContent = 'Copy Subtasks';
    button.id = 'copySubtasks';
    button.classList = 'aui-button aui-button-primary';
    button.style = 'margin-top: 10px';
    button.addEventListener('click', () => {
      copySubtasks();
    });
    subtaskList.appendChild(button);
  }
}

window.addEventListener('load', () => {
  // this makes babies cry
  this.setInterval(() => {
    // check for button periodically and add if not present - necessary for Jira navigation
    const hasButton = document.getElementById('copySubtasks');
    if (!hasButton) {
      addButton();
    }
  }, 500);
});
