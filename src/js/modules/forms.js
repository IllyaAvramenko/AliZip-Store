import {postData} from '../services/requests';

const forms = () => {
   const forms = document.querySelectorAll('form'),
         inputs = document.querySelectorAll('input');

   const message = {
      loading: 'Загрузка...',
      success: 'Заявка успешно отправлена',
      failure: 'Что-то пошло не так...',
      loadingImg: 'assets/img/loading.svg'
   };

   const path = {
      order: 'assets/server.php',
      question: 'assets/question.php'
   };

   forms.forEach(form => {
      form.addEventListener('submit', (e) => {
         e.preventDefault();

         let statusMessage = document.createElement('div');
         statusMessage.classList.add('status');
         form.parentNode.appendChild(statusMessage);

         let statusImg = document.createElement('img');
         statusImg.setAttribute('src', message.loadingImg);
         statusImg.classList.add('animated', 'fadeInUp');
         statusMessage.appendChild(statusImg);

         const statusModal = document.querySelector('.message-modal'),
               statusModalClose = statusModal.querySelector('.popup-close');

         let bigModalText = statusModal.querySelector('h3'),
             smallModalText = statusModal.querySelector('p');

         const showMessageModal = () => {
            statusModal.style.display = 'block';
            document.body.style.overflow = "hidden";
            statusModalClose.addEventListener('click', () => {
               statusModal.style.display = 'none';
               document.body.style.overflow = '';
            });
         };

         const formData = new FormData(form);

         let api;
         if (form.closest('.fastorder')) {
            api = path.order;
         } else {
            api = path.question;
         }
         console.log(api);

         postData(api, formData)
            .then(res => {
               console.log(res);
               
               bigModalText.textContent = message.success;
               smallModalText.style.display = 'block';
               showMessageModal();
            })
            .catch(() => {
               bigModalText.textContent = message.failure;
               smallModalText.style.display = 'none';
               showMessageModal();
            })
            .finally(() => {
               clearInputs();
               statusMessage.remove();
               setTimeout(() => {
                  
                  statusModal.style.display = 'none';
                  document.body.style.overflow = '';
               }, 5000);
            });
      });
   });


   const clearInputs = () => {
      inputs.forEach(item => {
         item.value = '';
      });
   };
};

export default forms;