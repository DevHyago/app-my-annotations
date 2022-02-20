function selectElement(element){
   return document.querySelector(element);
}

function selectElementAll(element){
   return document.querySelectorAll(element);
}

let currentDate = new Date();
let ul = selectElement('#list');
let myAnnotations =[];
let title = selectElement('#title');
let noteArea = selectElement('#note');
let editId = null;

function getId(){
   if(myAnnotations.length > 0){
      return myAnnotations[myAnnotations.length-1].id + 1;
   }else{
      return 0;
   }
}

/* Open modal add*/
function modalOpen(){
   clearInputs();
   let modalOpen = selectElement('.modal-new-note');
   selectElement('.modal .box h1').innerText = "Nova anotação";
   modalOpen.style.display = 'flex';
   modalOpen.querySelector('.close-modal').addEventListener('click', () =>  modalOpen.style.display = 'none');
   modalOpen.querySelector('#addNote').addEventListener('click', addAnnotations);
}


let buttonNewNote = selectElement('.add');
buttonNewNote.addEventListener('click', modalOpen);

function addAnnotations(){
   let objAnnotation = new MyAnnotation(getId(), currentDate, title.value, noteArea.value);
   if(validatingInputs(objAnnotation)){
      if(editId == null) {
         myAnnotations.push(objAnnotation);
      }else{
         updateNote(editId, objAnnotation);
         selectElement('#addNote').innerHTML = "Adicionar";
         editId = null;
      }
   }
   showScreen();
   clearInputs();
}

//validating inpus
function validatingInputs(obj){
   let message = "";
   if(obj.title == ''){
      message += "- O campo titulo é obrigatório\n";
   }
   if(obj.note == ''){
      message += "- O campo de anotação é obrigatório\n";
   }
   if(message != ""){
      alert(message);
      return false;
   }
   return true;
}

function showScreen(){
   ul.innerHTML = "";
   myAnnotations.forEach((Element) =>{
      let createLi = document.createElement('li');
      createLi.setAttribute('data-key', Element.id);
      let liTitle = document.createElement('div');
      liTitle.classList.add('name');
      let liDate = document.createElement('div');
      liDate.classList.add('date');
      let liActions = document.createElement('div');
      liActions.classList.add('actions');
   
      /*Create icons*/
      let iconEdit = document.createElement('i');
      iconEdit.classList.add('fa-solid');
      iconEdit.classList.add('fa-pen-to-square');
      iconEdit.setAttribute('onclick', `editNote(${JSON.stringify(Element)})`);
      let iconDelete = document.createElement('i');
      iconDelete.classList.add('fa-solid');
      iconDelete.classList.add('fa-trash-can');
      iconDelete.setAttribute('onclick', `removeNote(${Element.id})`);
   
      liTitle.setAttribute('onclick', `openNoteItem(${JSON.stringify(Element)})`);

      /*add the icons*/
      liActions.appendChild(iconEdit);
      liActions.appendChild(iconDelete);
   
      /*Filling information*/
      liTitle.innerText = Element.title;
      liDate.innerText = Element.currentDate;
      createLi.appendChild(liTitle);
      createLi.appendChild(liDate);
      createLi.appendChild(liActions);
   
      ul.appendChild(createLi);
   })   
}


function editNote(el){
   closeModal();
   modalOpen();
   selectElement('#addNote').innerHTML = "Atualizar";
   selectElement('.modal .box h1').innerText = "Atualizar Anotação";
   title.value = el._title;
   noteArea.value = el._note;
   editId = el._id;
}

function updateNote(id, obj){
   myAnnotations.forEach((element, index) => {
      if(element.id == id){
         myAnnotations[index].title = obj.title;
         myAnnotations[index].note = obj.note;
      }
   })
}

function clearInputs(){
   title.value = "";
   noteArea.value ="";
   selectElement('.modal-new-note').style.display = 'none';
}

function openNoteItem(jsonObj){
   let modalNote = selectElement('.openModalItem');
   modalNote.style.display = "flex";
   let titleModal = document.createElement('h1');
   let dateModal = document.createElement('span');
   let descriptionNote = document.createElement('p');
   titleModal.innerText = jsonObj._title;
   dateModal.innerText = formatDate(new Date(jsonObj._currentDate));
   descriptionNote.innerText = jsonObj._note;
   let elCloseModal = document.createElement('div');
   elCloseModal.classList.add('close-modal');
   elCloseModal.innerHTML = `<i class="fa-solid fa-rectangle-xmark"></i>`;
   elCloseModal.addEventListener('click', closeModal);
   let divIcons = document.createElement('div');

   /*Icons modal */
   divIcons.classList.add('actions');
      let iconEditModal = document.createElement('i');
      iconEditModal.classList.add('fa-solid');
      iconEditModal.classList.add('fa-pen-to-square');
      iconEditModal.setAttribute('onclick', `editNote(${JSON.stringify(jsonObj)})`);
      let iconDeleteModal = document.createElement('i');
      iconDeleteModal.classList.add('fa-solid');
      iconDeleteModal.classList.add('fa-trash-can');
      iconDeleteModal.setAttribute('onclick', `removeNote(${jsonObj._id})`);
   divIcons.appendChild(iconEditModal);
   divIcons.appendChild(iconDeleteModal);

   let boxModal = modalNote.querySelector('.box');
   boxModal.appendChild(elCloseModal);
   boxModal.appendChild(titleModal);
   boxModal.appendChild(dateModal);
   boxModal.appendChild(descriptionNote);
   boxModal.appendChild(divIcons);
}

function formatDate(value){
   return ((value.getDate() )) + "/" + ((value.getMonth() + 1)) + "/" + value.getFullYear(); 
}

function closeModal(){
   let modalNoteClose = selectElement('.openModalItem');
   modalNoteClose.style.display = "none";
   modalNoteClose.querySelector('.box').innerHTML = "";
}


function removeNote(id){
   if(confirm('Deseja realmente exluir a nota ?')){
      myAnnotations = myAnnotations.filter(element => element.id != id );
      let elementHTML = selectElement(`li[data-key='${id}']`);
      ul.removeChild(elementHTML);
      closeModal();
   }
}