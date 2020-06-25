const getData = async function(url) { // функция, которая делает запрос на сервер. async - делает ее асинхронной
  const response = await fetch(url); // получили данные в ответ на запрос
  if  (!response.ok) { // проверка, был ли запрос удачным
    throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response.status}!`); // ошибка - сбрасывает выполнение ф-ции и выводит указанное сообщение
  }
  return await response.json();
} ; 

const numbers = document.querySelector('.numbers'); // все варианты чисел

function createVarios(varios) { // ф-ция создания карточек с числами

  const {
    page,
    number,
    answer,
    whatNumber
  } = varios; // проводим деструктуризацию 


  const inVarios = `
            <div class="row">
              <div class="col">
                <div class="numder">
                  <img src="${number}" alt="">
                </div>
              </div>
              <div class="col all">
                <div class="question" >
                  <img class="question-img" src="./img/question.png" alt="" style="display: block;">
                </div>
                <div class="answer" >
                  <img class="answer-img" src="${answer}" alt="" style="display: none;">
                </div>
              </div>
            </div>
  `;

  numbers.insertAdjacentHTML('beforeend', inVarios); // метод для вставки элементов на страницу
  
  const all = document.querySelectorAll('.all');
  all.forEach((element, index) => {
    element.addEventListener('click',()=>{
      let question = element.querySelector('.question-img');
      let answer = element.querySelector('.answer-img');
      question.style.display = 'none';
      answer.style.display = 'block';
    });
    
  });
  
};



function init() {
  getData('./db/pages.json').then(function(data){ // ф-ция получения данных по запросу. then вызывает ф-цию после получения данных. data - полученные данные (массив)
  data.forEach(createVarios); // сработает столько раз, сколько элементов у полученного массива data (то есть, мы получаем 6 карточек ресторанов)
  }); 
  
  
};
 
init();