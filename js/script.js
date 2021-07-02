//html er element gulo k niye asha js file e
let taskForm = document.querySelector('#taskForm');
let taskInput = document.querySelector('#taskInput');
let filter = document.querySelector('#filter');
let taskList = document.querySelector('ul');
let clearTask_btn = document.querySelector('#clearTask_btn');






//Define event listeners
taskForm.addEventListener('submit', addTasks);
taskList.addEventListener('click', removeTask);
clearTask_btn.addEventListener('click', removeAllTask);
filter.addEventListener('keyup', filter_task);
document.addEventListener('DOMContentLoaded', get_Tasks);




//   Add Task
function addTasks(e) {
    if (taskInput.value === '') {
        alert("Add a task!");
    }
    else{
        //create li
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(taskInput.value + " "));
        // taskInput.value = ''; // task input field khali kore ditesi


        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = 'X';   //<li>javascript<a href="#">X</a></li>
        li.appendChild(link);
        taskList.appendChild(li);

        


        
        storeTaskInLocalStorage(taskInput.value);
        
        taskInput.value = ''; // task input field khali kore ditesi
        
    }
    e.preventDefault();
}








// Remove task
function removeTask(e) {
    if (e.target.hasAttribute("href")) {   // ul er je item er href attribute achy seta click korle er parent child je element   ||<li>javascript<a href='#'>X</a></li>|| <li> take remove koro 
        if (confirm("Completed Task? ")) {
            let ele = e.target.parentElement; //<li>javascript</li>,,,,,,<li>javascript<a href="#">X</a></li>  //jeta te, <a> te click kora hocce <a>x</> er parent child <li></li> k remove koro
            ele.remove(); //<li>-<a>-</a></li> remove!

            removeFromLs(ele);
        }
    }
}




// Clear all Tasks
function removeAllTask(e) {
    // taskList.innerHTML = "";
    //faster
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    localStorage.clear();
}







// filter/search task
function filter_task(e) {
    let text = e.target.value.toLowerCase();//search box user jeta likbe seta asche
    document.querySelectorAll('li').forEach(task => {//li er sob item gulo asche

        let item = task.firstChild.textContent;

        if (item.toLowerCase().indexOf(text) != -1) {//jodi kaok khuje paoa jay tahole -1 return kore/ jodi keo thake 
            task.style.display = 'block';
            
        }
        else {
            task.style.display = 'none';
        }
    });
}





// store in local storage
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) { //localStorage.getItem(keyname)
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));  //localStorage.setItem(keyname, value)
}











//get tasks from LS, localstorage theke task gulo niye aslam
function get_Tasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(task => {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(task + " "));
        // taskInput.value = ''; // task input field khali kore ditesi


        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = 'X';
        li.appendChild(link);
        taskList.appendChild(li);
    });
}



// localStorage theke tasks gulo delete 
function removeFromLs(taskItem) {  // jeta remove korchi seta 'taskItem' e asbe '<li>---</li>'
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    let li = taskItem; //jeta remove korchi seta 'taskItem' e asbe,,, '<li>---</li>' eta
    li.removeChild(li.lastChild); //<li>-<a>X</a></li>  er <a>x</a> bad pore jabe

    tasks.forEach((task, index) => {
        if (li.textContent.trim() === task) {
            tasks.splice(index, 1);
        } 
    });

    localStorage.setItem('tasks',JSON.stringify(tasks));
}








