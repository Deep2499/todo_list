let todos_array = [];
let inputfield = document.querySelector(".inputfield");
let addbutton = document.querySelector(".addbutton");
let tasklist = document.querySelector(".tasklist");
let show = document.querySelector(".show");
let hide = document.querySelector(".hide");
let pending_total = document.querySelector(".pending_total");
show.style.fontWeight = "bold";
hide.style.fontWeight = "bold";
show.style.display = "none";
let log_list = document.querySelector(".log_list");
let log_array = [];
let search_array = [];
//render tasks
let idn = 0;
const RenderTodos = (todos_array) => {
  //log list
  log_list.innerHTML = "";
  for (let i = 0; i < log_array.length; i = i + 1) {
    let log_element = document.createElement("li");
    log_element.innerText = log_array[i];
    log_list.appendChild(log_element);
  }

  tasklist.innerHTML = "";
  for (let i = 0; i < todos_array.length; i = i + 1) {
    //creating search array
    let search_string = `${todos_array[i].task}`;
    for (let j = 0; j < todos_array[i].tags.length; j = j + 1) {
      search_string += " ";
      search_string += todos_array[i].tags[j];
    }
    for (let j = 0; j < todos_array[i].subtask.length; j = j + 1) {
      search_string += " ";
      search_string += todos_array[i].subtask[j];
    }
    search_array.push(search_string);
    //creating li element
    let li = document.createElement("li");
    li.draggable="true";
    li.className = "list_item";
    li.id = `${todos_array[i].id}`;
    let task_container = document.createElement("div");
    task_container.className = "task_container";
    task_container.innerText = `Task ${i + 1}: ${todos_array[i].task}`;
    li.appendChild(task_container);
    let task_container_adjacent = document.createElement("div");
    task_container_adjacent.className = "task_container_adjacent";
    li.appendChild(task_container_adjacent);

    //creating buttons and attributes
    let task_options = document.createElement("div");
    task_options.className = "task_options";
    li.appendChild(task_options);

    //display due date
    let due_date = document.createElement("div");
    due_date.innerText = "Due on : " + todos_array[i].due;
    due_date.style.color = "red";
    task_options.appendChild(due_date);

    //create delete button
    let deletebutton = document.createElement("button");
    deletebutton.innerText = "Delete";
    deletebutton.style.fontWeight = "bold";
    deletebutton.className = "deletebutton";
    task_container_adjacent.appendChild(deletebutton);

    //create edit button
    let edit_image = document.createElement("img");
    edit_image.src = "./edit.png";
    edit_image.className = "edit_image";
    task_container_adjacent.appendChild(edit_image);

    //done undone functionality
    if (!todos_array[i].done) {
      let check_image = document.createElement("img");
      check_image.src = "./check.png";
      check_image.width = 15;
      task_container_adjacent.appendChild(check_image);
      check_image.addEventListener("click", () => {
        todos_array[i].done = !todos_array[i].done;
        log_array.push(`"${todos_array[i].task}" marked as done`);
        localStorage.setItem("log_array", JSON.stringify(log_array));
        localStorage.setItem("todos_array", JSON.stringify(todos_array));
        RenderTodos(todos_array);
      });
    } else {
      let cross_image = document.createElement("img");
      task_container.style.textDecoration = "line-through";
      cross_image.src = "./close.png";
      cross_image.width = 10;
      task_container_adjacent.appendChild(cross_image);
      cross_image.addEventListener("click", () => {
        todos_array[i].done = !todos_array[i].done;
        log_array.push(`"${todos_array[i].task}" marked active`);
        localStorage.setItem("log_array", JSON.stringify(log_array));
        localStorage.setItem("todos_array", JSON.stringify(todos_array));
        RenderTodos(todos_array);
      });
    }

    //creating catagory
    let catagory = document.createElement("div");
    catagory.className = "catagory";
    catagory.innerText = "Catagory : " + todos_array[i].catagory;
    catagory.style.color = "red";

    task_options.appendChild(catagory);

    //creating priority
    let priority = document.createElement("div");
    priority.className = "priority";
    priority.innerText = "Priority : " + todos_array[i].priority;
    priority.style.color = "red";
    task_options.appendChild(priority);

    //creatng subtasks and tags
    let subtasks = document.createElement("div");
    subtasks.className = "subtasks";
    li.appendChild(subtasks);
    let tags = document.createElement("div");
    tags.className = "tags";
    li.appendChild(tags);

    //subtask list
    let subtasklist = document.createElement("ul");
    subtasklist.className = "subtasklist";
    for (let j = 0; j < todos_array[i].subtask.length; j = j + 1) {
      let subtasklistitem = document.createElement("li");
      let subtasklistitemtext = document.createElement("div");
      subtasklistitemtext.innerText = todos_array[i].subtask[j];
      subtasklistitem.appendChild(subtasklistitemtext);
      let cross_image = document.createElement("img");
      cross_image.className = "subtaskcross";
      cross_image.src = "./close.png";
      cross_image.width = 10;
      subtasklistitem.appendChild(cross_image);
      subtasklist.appendChild(subtasklistitem);
      let subtaskcross = document.querySelector(".subtaskcross");
      cross_image.addEventListener("click", () => {
        log_array.push(
          `Removed "${todos_array[i].subtask[j]}" subtask from task "${todos_array[i].task}"`
        );
        localStorage.setItem("log_array", JSON.stringify(log_array));
        todos_array[i].subtask.splice(j, 1);
        localStorage.setItem("todos_array", JSON.stringify(todos_array));
        RenderTodos(todos_array);
      });
    }
    let add_image = document.createElement("img");
    add_image.src = "./plus.png";
    add_image.width = 10;
    let subtask_title = document.createElement("div");
    subtask_title.innerText = "Subtasks:";
    subtasks.appendChild(subtask_title);
    subtasks.appendChild(subtasklist);
    subtasks.appendChild(add_image);
    add_image.className = "add_subtask_image";
    add_image.addEventListener("click", () => {
      let add_subtask = document.createElement("input");
      subtasks.appendChild(add_subtask);
      let add_subtask_button = document.createElement("button");
      add_subtask_button.innerText = "Add Subtask";
      subtasks.appendChild(add_subtask_button);
      add_image.style.display = "none";
      add_subtask_button.addEventListener("click", () => {
        let new_subtask = add_subtask.value;
        todos_array[i].subtask.push(new_subtask);
        log_array.push(
          `"${new_subtask}" subtask added on task "${todos_array[i].task}"`
        );
        localStorage.setItem("log_array", JSON.stringify(log_array));
        localStorage.setItem("todos_array", JSON.stringify(todos_array));
        RenderTodos(todos_array);
      });
    });
    //tag list
    let taglist = document.createElement("ul");
    taglist.className = "taglist";
    for (let j = 0; j < todos_array[i].tags.length; j = j + 1) {
      let taglistitem = document.createElement("li");
      let taglistitemtext = document.createElement("div");
      //taglistitemtext.innerText=todos_array[i].subtask[j];
      taglistitem.innerText = todos_array[i].tags[j];
      taglistitem.appendChild(taglistitemtext);
      let cross_image = document.createElement("img");
      cross_image.className = "tagcross";
      cross_image.src = "./close.png";
      cross_image.width = 10;
      taglistitem.appendChild(cross_image);
      taglist.appendChild(taglistitem);
      cross_image.addEventListener("click", () => {
        log_array.push(
          `Removed "${todos_array[i].tags[j]}" tag from task "${todos_array[i].task}"`
        );
        localStorage.setItem("log_array", JSON.stringify(log_array));
        todos_array[i].tags.splice(j, 1);
        localStorage.setItem("todos_array", JSON.stringify(todos_array));
        RenderTodos(todos_array);
      });
    }
    let add_image1 = document.createElement("img");
    add_image1.src = "./plus.png";
    add_image1.width = 10;
    let tag_title = document.createElement("div");
    tag_title.innerText = "Tags:";
    tags.appendChild(tag_title);
    tags.appendChild(taglist);
    tags.appendChild(add_image1);
    add_image1.className = "add_tag_image";
    add_image1.addEventListener("click", () => {
      let add_tag = document.createElement("input");
      tags.appendChild(add_tag);
      let add_tag_button = document.createElement("button");
      add_tag_button.innerText = "Add Tag";
      tags.appendChild(add_tag_button);
      add_image1.style.display = "none";
      add_tag_button.addEventListener("click", () => {
        let new_tag = add_tag.value;
        todos_array[i].tags.push(new_tag);
        log_array.push(
          `"${new_tag}" tag added on task "${todos_array[i].task}"`
        );
        localStorage.setItem("log_array", JSON.stringify(log_array));
        localStorage.setItem("todos_array", JSON.stringify(todos_array));
        RenderTodos(todos_array);
      });
    });
    tasklist.appendChild(li);
    edit_image.addEventListener("click", () => {
      edit_todo(todos_array[i].id, i);
    });
    deletebutton.addEventListener("click", () => {
      delete_todo(todos_array[i].id);
    });
  }
};
let pattern_input = document.querySelector(".pattern_input");
let search_button = document.querySelector(".search_button");
let search_list = document.querySelector(".search_list");
search_button.addEventListener("click", () => {
  search_list.innerHTML = "";
  for (let i = 0; i < search_array.length; i = i + 1) {
    const pattern = pattern_input.value.trim();
    let sentence = search_array[i];
    const regex = new RegExp(pattern, "gi");
    const matches = sentence.match(regex);
    if (matches && matches.length > 0) {
      let li = document.createElement("li");
      li.innerText = todos_array[i].task;
      search_list.appendChild(li);
    }
  }

  search_array = [];
  RenderTodos(todos_array);
  //console.log(search_array)
});

//Filters
function select_filter() {
  var mylist = document.getElementById("myList");
  console.log(mylist.value);
  if (mylist.value == "none") {
    RenderTodos(todos_array);
  }
  //priority sort
  let priority_array = [];
  if (mylist.value == "high") {
    console.log("hey");
    for (let i = 0; i < todos_array.length; i = i + 1) {
      if (todos_array[i].priority == "High") {
        priority_array.push(todos_array[i]);
      }
    }
    RenderTodos(priority_array);
  }
  if (mylist.value == "medium") {
    for (let i = 0; i < todos_array.length; i = i + 1) {
      if (todos_array[i].priority == "Medium") {
        priority_array.push(todos_array[i]);
      }
    }
    RenderTodos(priority_array);
  }
  if (mylist.value == "low") {
    for (let i = 0; i < todos_array.length; i = i + 1) {
      if (todos_array[i].priority == "Low") {
        priority_array.push(todos_array[i]);
      }
    }
    RenderTodos(priority_array);
  }
  //catagory sort
  if (mylist.value == "work") {
    //console.log("hey")
    for (let i = 0; i < todos_array.length; i = i + 1) {
      if (todos_array[i].catagory == "Work") {
        priority_array.push(todos_array[i]);
      }
    }
    RenderTodos(priority_array);
  }
  if (mylist.value == "personal") {
    //console.log("hey")
    for (let i = 0; i < todos_array.length; i = i + 1) {
      if (todos_array[i].catagory == "Personal") {
        priority_array.push(todos_array[i]);
      }
    }
    RenderTodos(priority_array);
  }
  if (mylist.value == "study") {
    //console.log("hey")
    for (let i = 0; i < todos_array.length; i = i + 1) {
      if (todos_array[i].catagory == "Study") {
        priority_array.push(todos_array[i]);
      }
    }
    RenderTodos(priority_array);
  }
  if (mylist.value == "errands") {
    //console.log("hey")
    for (let i = 0; i < todos_array.length; i = i + 1) {
      if (todos_array[i].catagory == "Errands") {
        priority_array.push(todos_array[i]);
      }
    }
    RenderTodos(priority_array);
  }
}

//due filter code

let due_filter_button = document.querySelector(".due_filter_button");
let due_filter_input = document.querySelector("#due_filter_input");
due_filter_button.addEventListener("click", filter_todos_by_date);
function filter_todos_by_date() {
  let due_array = [];
  console.log(todos_array);
  for (let i = 0; i < todos_array.length; i = i + 1) {
    if (todos_array[i].due <= due_filter_input.value) {
      due_array.push(todos_array[i]);
    }
  }
  console.log(due_array);
  RenderTodos(due_array);
}

//sort code
function select_sort() {
  let sort_field = document.querySelector("#myList1");
  if (sort_field.value == "ftn") {
    let sort_array = todos_array;
    sort_array.sort((a, b) => a.due.localeCompare(b.due));
    RenderTodos(sort_array.reverse());
  }
  if (sort_field.value == "ntf") {
    let sort_array = todos_array;
    sort_array.sort((a, b) => a.due.localeCompare(b.due));
    RenderTodos(sort_array);
  }
  if (sort_field.value == "htl") {
    let sort_array = todos_array;
    sort_array.sort((a, b) => a.priority.localeCompare(b.priority));
    RenderTodos(sort_array);
  }
  if (sort_field.value == "lth") {
    let sort_array = todos_array;
    sort_array.sort((a, b) => a.priority.localeCompare(b.priority));
    RenderTodos(sort_array.reverse());
  }
}

//}

//subtasks ui code
let tags = document.getElementById("tags");
let input = document.getElementById("input-tag");
let tag_array = [];
input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    let cross_image=document.createElement("img");
    cross_image.src="./close.png";
    cross_image.width=10;
    let tag = document.createElement("li");
    let tag_input=document.createElement("div");
    tag_input.innerText=input.value;
    tag.appendChild(tag_input);
    tag.appendChild(cross_image)
    tag_array.push(input.value);
    tags.appendChild(tag);
    input.value = "";
    cross_image.addEventListener('click',()=>{
      tag.style.display="none"
    })
  }
});
let subtasks = document.getElementById("subtasks");
let input1 = document.getElementById("input-subtask");
let subtask_array = [];
input1.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    let cross_image=document.createElement("img");
    cross_image.src="./close.png";
    cross_image.width=10;
    let subtask = document.createElement("li");
    let subtask_input=document.createElement("div");
    subtask_input.innerText=input1.value;
    subtask.appendChild(subtask_input);
    subtask.appendChild(cross_image)
    subtask_array.push(input1.value);
    subtasks.appendChild(subtask);
    input1.value = "";
    cross_image.addEventListener('click',()=>{
      subtask.style.display="none"
    })
  }
});

//edit todo
const edit_todo = (id, index) => {
  const edit_task = document.getElementById(`${id}`);
  console.log(edit_task.childNodes[0]);
  edit_task.childNodes[0].style.display = "none";
  edit_task.childNodes[1].style.display = "none";
  let div2 = document.createElement("div");

  var edit_field = document.createElement("input");
  edit_field.type = "Edit Task";
  div2.appendChild(edit_field);

  let edit_button = document.createElement("button");

  edit_button.innerText = "Edit";
  edit_button.style.fontWeight = "bold";
  edit_button.className = "edit_button";
  div2.appendChild(edit_button);

  edit_task.appendChild(div2);
  edit_button.addEventListener("click", () => {
    let temp = todos_array[index].task;
    let edited_task = edit_field.value;
    todos_array[index].task = edited_task;
    localStorage.setItem("todos_array", JSON.stringify(todos_array));
    log_array.push(`Edited task "${temp}" to "${todos_array[index].task}"`);
    localStorage.setItem("log_array", JSON.stringify(log_array));
    RenderTodos(todos_array);
  });
};

//view backlogs
let backlog_button = document.querySelector(".backlog_button");
backlog_button.addEventListener("click", () => {
  let curent_day = new Date();
  let current_day_proper_format =
    curent_day.getFullYear() +
    "-" +
    String(curent_day.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(curent_day.getDate()).padStart(2, "0");
  console.log(typeof current_day_proper_format);
  let backlog_array = [];
  for (let i = 0; i < todos_array.length; i = i + 1) {
    if (todos_array[i].due < current_day_proper_format) {
      backlog_array.push(todos_array[i]);
    }
  }
  RenderTodos(backlog_array);
});

//hide and show list
hide.addEventListener("click", () => {
  hide.style.display = "none";
  show.style.display = "block";
  tasklist.style.display = "block";
});

show.addEventListener("click", () => {
  hide.style.display = "block";
  show.style.display = "none";
  tasklist.style.display = "block";
  RenderTodos(todos_array);
});

//delete todo
const delete_todo = (id) => {
  for (let i = 0; i < todos_array.length; i = i + 1) {
    if (todos_array[i].id == id) {
      log_array.push(`Deleted ${todos_array[i].task}`);
      todos_array.splice(i, 1);
      localStorage.setItem("todos_array", JSON.stringify(todos_array));
      RenderTodos(todos_array);
      break;
    }
  }
};

//add todo list
let priority_field = document.querySelector("#priority");
let catagory_field = document.querySelector("#catagory");
let date_field = document.querySelector("#due");
const add_todo = () => {
  if (
    priority_field.value != "" &&
    inputfield.value != "" &&
    catagory_field.value != "" &&
    date_field.value != ""
  ) {
    let value = inputfield.value;
    log_array.push(`Added new task "${value}"`);
    localStorage.setItem("log_array", JSON.stringify(log_array));
    idn++;
    todos_array.push({
      id: idn,
      task: value,
      done: false,
      priority: priority_field.value,
      catagory: catagory_field.value,
      due: date_field.value,
      subtask: subtask_array,
      tags: tag_array,
    });
    localStorage.setItem("todos_array", JSON.stringify(todos_array));
    document.querySelector(".inputfield").value = "";
    tag_array = [];
    subtask_array = [];
    let tags = document.querySelector("#tags");
    let subtasks = document.querySelector("#subtasks");
    tags.innerHTML = "";
    subtasks.innerHTML = "";
    var mylist = document.getElementById("myList");
    mylist.value = "---Choose filter---";
    RenderTodos(todos_array);
  }
};

function fetch_todos() {
  idn=10;
  todos_array = JSON.parse(localStorage.getItem("todos_array")) || [
    {
      id: 0,
      task: "SQL Assignment",
      done: true,
      priority: "High",
      catagory: "Study",
      tags: ["SQL"],
      due: "2023-07-25",
      subtask: ["instagram", "blog", "energy meter"],
    },
    {
      id: 1,
      task: "Workout",
      done: false,
      priority: "Medium",
      catagory: "Personal",
      tags: ["GYM"],
      due: "2023-07-22",
      subtask: ["Buy Gloves"],
    },
    {
      id: 3,
      task: "Pune Trip",
      done: false,
      priority: "Medium",
      catagory: "Personal",
      tags: ["Trek Raigad"],
      due: "2023-07-24",
      subtask: [],
    },
    {
      id: 2,
      task: "Clone Assignment",
      done: false,
      priority: "High",
      catagory: "Study",
      tags: ["HTML", "CSS", "JS"],
      due: "2023-07-23",
      subtask: ["Layout","Responsive"],
    },
  ];
  log_array = JSON.parse(localStorage.getItem("log_array")) || [
    "Added new task SQL Assignment",
    "Added new task Workout",
    "Added new task Pune Trip",
    "Added new task Clone Assignment"
  ];
  idn = todos_array.length;
  let curent_day = new Date();
  let current_day_proper_format =
    curent_day.getFullYear() +
    "-" +
    String(curent_day.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(curent_day.getDate()).padStart(2, "0");
  let due_list = document.querySelector(".due_list");
  let expired_list = document.querySelector(".expired_list");
  for (let i = 0; i < todos_array.length; i = i + 1) {
    if (todos_array[i].due == current_day_proper_format) {
      let li = document.createElement("li");
      li.innerText = todos_array[i].task;
      due_list.appendChild(li);
    }
  }
  for (let i = 0; i < todos_array.length; i = i + 1) {
    if (todos_array[i].due < current_day_proper_format) {
      let li = document.createElement("li");
      li.innerText = todos_array[i].task;
      expired_list.appendChild(li);
    }
  }
  let alert_string = "";
  for (let i = 0; i < todos_array.length; i = i + 1) {
    if (
      todos_array[i].due <= current_day_proper_format &&
      todos_array[i].priority == "High"
    ) {
      alert_string += `${todos_array[i].task}, `;
    }
  }
  alert_string += "are due today or are expired. Please look into it !";
  alert(alert_string)
  RenderTodos(todos_array);
}
fetch_todos();


var remove=document.querySelector('.list_item');

function dragStart(e) {
  this.style.opacity = '0.4';
  dragSrcEl = this;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
};

function dragEnter(e) {
  this.classList.add('over');
}

function dragLeave(e) {
  e.stopPropagation();
  this.classList.remove('over');
}

function dragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  return false;
}

function dragDrop(e) {
  if (dragSrcEl != this) {
    dragSrcEl.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData('text/html');
  }
  return false;
}

function dragEnd(e) {
  var listItens = document.querySelectorAll('.list_item');
  [].forEach.call(listItens, function(item) {
    item.classList.remove('over');
  });
  this.style.opacity = '1';
}

function addEventsDragAndDrop(el) {
  el.addEventListener('dragstart', dragStart, false);
  el.addEventListener('dragenter', dragEnter, false);
  el.addEventListener('dragover', dragOver, false);
  el.addEventListener('dragleave', dragLeave, false);
  el.addEventListener('drop', dragDrop, false);
  el.addEventListener('dragend', dragEnd, false);
}

var listItens = document.querySelectorAll('.list_item');
[].forEach.call(listItens, function(item) {
  addEventsDragAndDrop(item);
});
