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

  // проверка вводимых в форму значений 
  const userName = document.querySelector('#user-name');
  userName.addEventListener('input', () => {
    let text;
    text = userName.value.replace(/\d/g, '');
    userName.value = text;
  });
  const userMail = document.querySelector('#user-mail');
  userMail.addEventListener('input', () => {
    let text;
    text = userMail.value.replace(/(\w+)@\w+\.\w{2,3}/gi, '');
    userName.value = text;
  });
});