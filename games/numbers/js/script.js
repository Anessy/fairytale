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
          <div class="varius">
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

  const varius = document.querySelectorAll('.varius');
  varius[0].style.display = 'block';
  for(let i = 1; i < varius.length; i++){
    varius[i].style.display = 'none';
  }
  
};
// ======================= листание страниц ==============================
function prewNext(){ 
  const arrowNext = document.querySelector('#nav-next'); //  стрелки вправо-влево
  const arrowPrew = document.querySelector('#nav-prew'); // стрелки вправо-влево
  

  arrowNext.addEventListener('click', () => {
    let numbers = document.querySelector('.numbers');
    let varius = numbers.querySelectorAll('.varius');
    let question = numbers.querySelectorAll('.question-img');
    let answer = numbers.querySelectorAll('.answer-img');
    let i;
  varius.forEach((element,index)=>{
    if(element.style.display === 'block'){
      element.style.display = 'none';
      i = index;
      arrowPrew.style.display = 'block';
    }
  });
  varius[i+1].style.display = 'block';
  if (i === varius.length-2){
    arrowNext.style.display = 'none';
  };
  question[i].style.display = 'block';
  answer[i].style.display = 'none';
});

arrowPrew.addEventListener('click', () => {
  let numbers = document.querySelector('.numbers');
  let varius = numbers.querySelectorAll('.varius');
  let question = numbers.querySelectorAll('.question-img');
  let answer = numbers.querySelectorAll('.answer-img');
  let i; 
  varius.forEach((element, index) =>{
    if (element.style.display === 'block') {
        
        element.style.display = 'none';
        i = index;
        if (index === 1) {
          arrowPrew.style.display = 'none';
        };
        
        if (index === varius.length - 1) {
          arrowNext.style.display = 'block';
        };
        return i;
    }; 
  });
  const visiblePrewPage = () => {
    varius[i-1].style.display = 'block'; 
  };
  visiblePrewPage();
  question[i].style.display = 'block';
  answer[i].style.display = 'none';
});
};

function init() {
  getData('./db/pages.json').then(function(data){ // ф-ция получения данных по запросу. then вызывает ф-цию после получения данных. data - полученные данные (массив)
  data.forEach(createVarios); // сработает столько раз, сколько элементов у полученного массива data (то есть, мы получаем 6 карточек ресторанов)
  }); 
  
  prewNext();
};
 
init();