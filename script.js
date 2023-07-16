    let inputfield=document.querySelector(".inputfield");
    let addbutton=document.querySelector(".addbutton");
    let tasklist=document.querySelector(".tasklist");
    let show=document.querySelector(".show");
    let hide=document.querySelector(".hide");
    let pending_total=document.querySelector(".pending_total");
    show.style.fontWeight="bold"
    hide.style.fontWeight="bold"
    show.style.display="none";
    let todos_array=[];
    let idn=0;
    const RenderTodos = () => {
      pending_total.innerText=`Pending Task : ${todos_array.length}`
      console.log(todos_array.length)
      tasklist.innerHTML = ''
      for(let i=0; i<todos_array.length; i=i+1) {
        let li = document.createElement("li");
        li.className = "list_item";

        let div = document.createElement("div");
        div.innerText=todos_array[i].task;

        let div1 = document.createElement("div");

        let deletebutton = document.createElement("button");
        deletebutton.innerText="Delete";
        deletebutton.style.fontWeight="bold"
        deletebutton.className = "deletebutton"
        let edit_image = document.createElement("img");
        edit_image.src = "./edit.png";
        edit_image.className = "edit_image";
        li.id=`${todos_array[i].id}`;
        li.appendChild(div);
        div1.appendChild(edit_image);
        div1.appendChild(deletebutton);
        li.appendChild(div1);
        tasklist.appendChild(li);
        edit_image.addEventListener("click", ()=>{edit_todo(todos_array[i].id, i)})
        deletebutton.addEventListener("click", ()=>{delete_todo(todos_array[i].id)})
      }
    }

    const edit_todo = (id, index) => {
      const edit_task = document.getElementById(`${id}`);
      console.log(edit_task.childNodes[0])
      edit_task.childNodes[0].style.display="none"
      edit_task.childNodes[1].style.display="none"
      let div2 = document.createElement("div");

      var edit_field = document.createElement("input");
      edit_field.type = "Edit Task";
      div2.appendChild(edit_field);

      let edit_button = document.createElement("button");

      edit_button.innerText="Edit";
      edit_button.style.fontWeight="bold"
      edit_button.className = "edit_button"
      div2.appendChild(edit_button)

      edit_task.appendChild(div2)
      edit_button.addEventListener("click", ()=>{
        let edited_task = edit_field.value;
        todos_array[index].task = edited_task
        RenderTodos()
      })
    }

    hide.addEventListener("click", ()=>{
      hide.style.display="none"
      show.style.display="block"
      tasklist.style.display="none"
    })

    show.addEventListener("click", ()=>{
      hide.style.display="block"
      show.style.display="none"
      tasklist.style.display="block"
      RenderTodos();
    })

    const delete_todo = (id) => {
      for(let i=0; i<todos_array.length; i=i+1) {
        if(todos_array[i].id==id) {
          todos_array.splice(i, 1);
          RenderTodos()
          break;
        }
      }
    }

    const add_todo = () => {
      console.log("added")
      let value=inputfield.value;
      idn++;
      if(value!=="") {
        todos_array.unshift({id: idn, task: value});
        document.querySelector(".inputfield").value="";
        RenderTodos();
      }
    }

    async function fetch_todos() {
      const response = await fetch("https://jsonplaceholder.typicode.com/todos");
      const ans = await response.json();
      for(let i=0; i<ans.length; i=i+1) {
        todos_array.push({id: idn, task: ans[i].title});
        idn++;
      }
      RenderTodos();
    }

    fetch_todos();
