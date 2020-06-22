window.addEventListener('DOMContentLoaded', function(){
  'use strict'
  let forParents = document.querySelector('.for-parents'); // посилання Для батьків
  let bigModal = document.querySelector('.big-modal');
  let close = document.querySelector('#close');
  forParents.addEventListener('click', function(){
    bigModal.style.display = 'block';
  });
  close.addEventListener('click',function(){
    bigModal.style.display = 'none';
  });

  // відкриваємо форму для відсилання повідомлення
  let openForm = document.querySelector('.open-form');
  let sendForm = document.querySelector('.send-form');
  openForm.addEventListener('click', () => {
    bigModal.style.display = 'none';
    sendForm.style.display = 'block';
    let closeForm = document.querySelector('.close-form'); 
    closeForm.addEventListener('click', () => {
      sendForm.style.display = 'none';
    });
  });
  
  // создание карточек для книг 

const getData = async function(url) { // функция, которая делает запрос на сервер. async - делает ее асинхронной
  const response = await fetch(url); // получили данные в ответ на запрос
  if  (!response.ok) { // проверка, был ли запрос удачным
    throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response.status}!`); // ошибка - сбрасывает выполнение ф-ции и выводит указанное сообщение
  }
  return await response.json();
} ; 

const allBooks = document.querySelector('.catalog'); // все книги

function createPage(page) { // ф-ция создания страниц в книге

  const {
    name,
    autor,
    publishing,
    description,
    image,
    link,
    number
  } = page; // проводим деструктуризацию page

  const inPage = `
  <div class="col-8 offset-2 col-sm-6 offset-sm-0 col-md-4 offset-md-0 col-lg-3 offset-lg-0 col-xl-3 offset-xl-0">
    <div class="catalog-card">
      <img src="${image}" alt="${name}">
      <a href="${link}">Читати</a>
    </div>
  </div>
  `;
  
  
  allBooks.insertAdjacentHTML('beforeend', inPage); // метод для вставки элементов на страницу

};


function init() {
  getData('./db/pages.json').then(function(data){ // ф-ция получения данных по запросу. then вызывает ф-цию после получения данных. data - полученные данные (массив)
  data.forEach(createPage); // сработает столько раз, сколько элементов у полученного массива data (то есть, мы получаем 6 карточек ресторанов)
  }); 
  
  forPageList(allBooks);

};
 
init();
});