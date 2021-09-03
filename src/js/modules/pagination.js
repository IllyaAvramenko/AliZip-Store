import {getResourse} from "../services/requests";

const pagination = (array) => {
   
   const postItems = array;

   const listElement = document.querySelector('.posts__cards');
   const paginationElement = document.querySelector('.pagination');

   let currentPage = 1;
   let rows = 3;

   getResourse('http://localhost:3000/posts')
      .then(res => displayList(postItems, listElement, rows, currentPage, res))
      .catch()
      .finally();

   function displayList (items, wrapper, rowsPerPage, page, res) {
      wrapper.innerHTML = '';
      page--;

      let start = rowsPerPage * page;
      let end = start + rowsPerPage;

      // Создаю массив из номеров карточек, которые должны отображаться на одной странице
      let paginatedItemsArray = items.slice(start, end);

      console.log(paginatedItemsArray);

      // Перебираю номера и создаю карточки, которые совпадают с номерами
      paginatedItemsArray.forEach((item) => {
         res.forEach((card, j) => {
            if (item == j) {

               let post = document.createElement('div');
               post.classList.add('posts__card', 'all', `${card.class}`);

               post.innerHTML = `
               <div class="posts__card-image ${card.imageClass}">
                  <img src="${card.src}" class="posts__card-img" alt="...">
               </div>
               <div class="posts__card-body">
                  <div class="posts__text-wrap">
                     <a href="#">
                        <h5 class="posts__card-title">${card.title}</h5>
                     </a>
                     <p class="posts__card-text">${card.paragraph}</p>
                  </div>
               </div>
               `;
               
               wrapper.appendChild(post);

            }
         });
      });

      // Каждый раз создаем новые кнопки пагинации -- Чтобы менять клас активности
      setupPagination(postItems, paginationElement, rows);
   }

   function setupPagination (items, wrapper, rowsPerPage) {
      wrapper.innerHTML = '';

      let pageCount = Math.ceil(items.length / rowsPerPage); // Колличество страниц
      for (let i = 1; i < pageCount + 1; i++) {
         let btn = paginationButton(i, items);              // i = номер страницы & кнопки

         wrapper.appendChild(btn);
      }
      
   }

   // Создание Кнопок пагинации
   function paginationButton (page, items) {
      let button = document.createElement('li');
      button.classList.add('pagination__item');
      button.innerText = page;

      // Перемещение класа акивности
      if (currentPage == page) {
         button.classList.add('pagination__item-active');
      }

      button.addEventListener('click', () => {
         currentPage = page;

         getResourse('http://localhost:3000/posts')
            .then(res => displayList(items, listElement, rows, currentPage, res))
            .catch()
            .finally();
      });

      return button;
   }

   // displayList(postItems, listElement, rows, currentPage);
   setupPagination(postItems, paginationElement, rows);
};

export default pagination;