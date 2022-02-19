function selectElement(element){
   return document.querySelector(element);
}

function selectElementAll(element){
   return document.querySelectorAll(element);
}

function formatDate(date){
   return (date.getDate().length == 1 ? "0" + date.getDate() : date.getDate()) + "/" + ((date.getMonth() + 1).length == 1 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) + "/" + date.getFullYear(); 
}

const currentDate = new Date();


let ul = selectElement('#list');

let myAnnotations =[
   {id: 0, date: currentDate, title: "Estudo sobre HTML", note: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source."},
   {id: 1, date: currentDate, title: "Estudo de Javascript", note: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source."},
   {id: 2, date: currentDate, title: "Meus melhores filmes", note: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source."},
   {id: 3, date: currentDate, title: "Trabalho faculdade", note: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source."},
   {id: 4, date: currentDate, title: "Projeto PI", note: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source."},
   {id: 5, date: currentDate, title: "Feira do mês", note: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source."},
   {id: 6, date: currentDate, title: "Proximos desafios", note: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source."}
];


myAnnotations.forEach((Element, index) =>{
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
   iconEdit.addEventListener('click', editNote);
   let iconDelete = document.createElement('i');
   iconDelete.classList.add('fa-solid');
   iconDelete.classList.add('fa-trash-can');
   iconDelete.setAttribute('onclick', `removeNote(${Element.id})`);

   /*add the icons*/
   liActions.appendChild(iconEdit);
   liActions.appendChild(iconDelete);

   /*Filling information*/
   liTitle.innerText = Element.title;
   liDate.innerText = formatDate(Element.date);
   createLi.appendChild(liTitle);
   createLi.appendChild(liDate);
   createLi.appendChild(liActions);

   ul.appendChild(createLi);
})


function editNote(){
   console.log('Edição de nota');
}

function removeNote(id){
   let currentElement = myAnnotations.filter(el => el.id == id)
   if(confirm('Deseja realmente exluir a nota: ' + currentElement[0].title + "?")){
      myAnnotations = myAnnotations.filter(element => element.id != id );
      let elementHTML = selectElement(`li[data-key='${id}']`);
      ul.removeChild(elementHTML);
   }
}