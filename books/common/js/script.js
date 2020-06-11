
const getData = async function(url) { // функция, которая делает запрос на сервер. async - делает ее асинхронной
  const response = await fetch(url); // получили данные в ответ на запрос
  if  (!response.ok) { // проверка, был ли запрос удачным
    throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response.status}!`); // ошибка - сбрасывает выполнение ф-ции и выводит указанное сообщение
  }
  return await response.json();
} ; 

const book = document.querySelector('.book'); // вся книга

function createPage(page) { // ф-ция создания страниц в книге

  const {
    id,
    name,
    description,
    image,
    number
  } = page; // проводим деструктуризацию page

  const inPage = `
  <div class="page" id="${id}" style="display: none; opacity: 0;">
					<div class="container">
						<div id="${name}">
              <div class="row BG">
              <div class="col-min"></div>
								<div class="col">
									<div class="page-image">
										<img src="${image}" alt="">
									</div>
                </div>
								<div class="col">
									<div class="page-text">
                    <span>${description}</span>
                  </div>
                  <div class="col-min"></div>
                  <div class="v1">  
                    <span>= ${number} =</span>
                  </div>
                </div>
							</div>
						</div>
					</div>
				</div>
  `;

book.insertAdjacentHTML('beforeend', inPage); // метод для вставки элементов на страницу

};

const arrowNext = document.querySelector('#nav-next'); //  стрелки вправо-влево
const arrowPrew = document.querySelector('#nav-prev'); // стрелки вправо-влево

function forPageList(book) {
  const mainPage = document.querySelector('.main-page'); // страницы с названием книги
  mainPage.addEventListener('click', () => {
    let nowBook = document.querySelector('.book');
    let pages = nowBook.querySelectorAll('.page');
    mainPage.style.display = 'none';
    pages[0].style.display = 'block';
    pages[0].style.opacity = '1';
    arrowNext.style.display = 'block';
    
  });
  
};

arrowNext.addEventListener('click', () => {
  let nowBook = document.querySelector('.book');
  let pages = nowBook.querySelectorAll('.page');
  let i; 
  pages.forEach((element, index) =>{
    

    if (element.style.display === 'block') {
        
        arrowPrew.style.display = 'block';
        element.style.display = 'none';
        element.style.opacity = '0';
        i = index;
        
        if (index === pages.length - 2) {
          arrowNext.style.display = 'none';
        };
        
        return i;
      
    }; 
  });
  const visiblePage = () => {
    pages[i+1].style.display = 'block'; 
    pages[i+1].style.opacity = '1';
  };
  visiblePage();
  
});

arrowPrew.addEventListener('click', () => {
  let nowBook = document.querySelector('.book');
  let pages = nowBook.querySelectorAll('.page');
  let i; 
  pages.forEach((element, index) =>{
    if (element.style.display === 'block') {
        
        element.style.display = 'none';
        element.style.opacity = '0';
        i = index;
        if (index === 1) {
          arrowPrew.style.display = 'none';
        };
        
        if (index === pages.length - 1) {
          arrowNext.style.display = 'block';
          console.log('+');
        };
        return i;
      
    }; 
  });
  const visiblePrewPage = () => {
    pages[i-1].style.display = 'block'; 
    pages[i-1].style.opacity = '1';
  };
  visiblePrewPage();
  
});


function init() {
  getData('./db/pages.json').then(function(data){ // ф-ция получения данных по запросу. then вызывает ф-цию после получения данных. data - полученные данные (массив)
  data.forEach(createPage); // сработает столько раз, сколько элементов у полученного массива data (то есть, мы получаем 6 карточек ресторанов)
  }); 
  
  forPageList(book);

};
 
init();