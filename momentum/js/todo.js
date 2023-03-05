
const openCloseTask = document.querySelector('.icon-task');
const taskContainer = document.querySelector('.task-container');
const taskName = document.querySelector('#tasks');

function setLocalStorage() {
    localStorage.setItem('task', taskName.innerHTML);
  }
  window.addEventListener('beforeunload', setLocalStorage);

  function getLocalStorage() {

    if(localStorage.getItem('task')) {
      taskName.innerHTML = localStorage.getItem('task');
    }

    let current_tasks = document.querySelectorAll(".delete");
        for(let i=0; i<current_tasks.length; i++){
            current_tasks[i].onclick = function(){
                this.parentNode.remove();
            }
        }

  }
  window.addEventListener('load', getLocalStorage); 

document.querySelector('#push').addEventListener('click', function(){
    if(document.querySelector('#newtask input').value.length == 0){
        alert("Please Enter a Task")
    }
    else{
        document.querySelector('#tasks').innerHTML += `
            <div class="task">
                <span id="taskname">
                    ${document.querySelector('#newtask input').value}
                </span>
                <button class="delete">
                    <i class="far fa-trash-alt"></i>
                </button>
            </div>
        `;

       let current_tasks = document.querySelectorAll(".delete");
        for(let i=0; i<current_tasks.length; i++){
            current_tasks[i].onclick = function(){
                this.parentNode.remove();
            }
        }

    }
})


openCloseTask.addEventListener('click', (event) => {
    taskContainer.classList.toggle('task-container-open');
    event.stopPropagation();
  })