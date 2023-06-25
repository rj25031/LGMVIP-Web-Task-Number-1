const button = document.getElementById("btn");
const input = document.getElementById("input");
const list = document.getElementById("olist");
const head = document.querySelector('.head');
const parent = document.getElementsByClassName("note")


button.addEventListener('click', (e) => {
    e.preventDefault();
    const value =input.value.trim();
    if (value != "") {
        AddItem(value);
        input.value = '';
    }
});


list.addEventListener('click',(e)=>{
    const target=e.target;
    if(target.classList.contains('done')){
        Toggle_done(target);
    }else if(target.classList.contains('delet')){
        Delete_item(target);
    }else if(target.classList.contains('edit')){
        editText(target);
    }else if(target.classList.contains('sb')){
        sbText(target);
    }
});


head.addEventListener('click',(e)=>{
    const targ=e.target;
    if(targ.classList.contains('all')){
        allTask(targ)
    }else  if(targ.classList.contains('active')){
        activeTask(targ)
    }else  if(targ.classList.contains('completed')){
        completedTask(targ)
    }
});


function allTask(t){
    t.classList.add("current");
    t.nextElementSibling.classList.remove("current")
    t.nextElementSibling.nextElementSibling.classList.remove("current")
    for(let i = 0;i<parent.length;i++){
            parent[i].classList.remove('dis');
}
}


function activeTask(t){
    t.classList.add("current");
    t.previousElementSibling.classList.remove("current");
    t.nextElementSibling.classList.remove("current")
    for(let i = 0;i<parent.length;i++){
        parent[i].classList.remove('dis');
        if(parent[i].firstElementChild.classList.contains('complete')){
            parent[i].classList.add('dis');
    }
}
}


function completedTask(t){
    t.classList.add("current");
    t.previousElementSibling.classList.remove("current");
    t.previousElementSibling.previousElementSibling.classList.remove("current");
    for(let i = 0;i<parent.length;i++){
        parent[i].classList.remove('dis');
        if(!parent[i].firstElementChild.classList.contains('complete')){
            parent[i].classList.add('dis');
    }
}
}


function AddItem(value) {
    let li = document.createElement('li');
    li.className = "note";
    li.innerHTML = `
    <p class="para">${value}</p> 
    <img src="check.svg" class="done">
    <img src="pen-to-square-solid.svg" class="edit">
    <img class="delet" src="trash.svg">
    `;
    list.appendChild(li);
    localStorage.setItem(value,value);
}


function Toggle_done(target){
   const complet= target.previousElementSibling;
   complet.classList.toggle('complete');
}


function Delete_item(target){
    const node = target.parentElement;
    const text = node.querySelector('.para').textContent;
    node.remove();
    localStorage.removeItem(text);
}

var textBefore,textAfter,liText;
function editText(t){
    let s=t.parentElement
    if(!s.querySelector('.sb')){
        liText=t.previousElementSibling.previousElementSibling;
        textBefore = liText.textContent;
        liText.contentEditable = true;
        liText.classList.add("border");
        let sb=document.createElement("img");
        sb.className="sb";
        sb.src='floppy-disk-solid.svg';
        s.appendChild(sb);
    }
}


function sbText(t){
    liText.contentEditable = false;
    liText.classList.remove("border");
    textAfter = liText.textContent;
    t.remove();
    localStorage.removeItem(textBefore);
    localStorage.setItem(textAfter,textAfter);
}


function read_tasks(){
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
            AddItem(value);
    }
}
read_tasks();









