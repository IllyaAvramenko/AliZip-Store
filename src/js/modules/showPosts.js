import {getResourse} from "../services/requests";
import pagination from "./pagination";

const showPosts = () => {

   const empty = [];

   function temp (markSelector) {
      getResourse('http://localhost:3000/posts')
         .then(res => createPosts(res, markSelector))
         .catch()
         .finally();
   }

   function createPosts(response, markSelector) {
      empty.length = 0;

      markSelector = markSelector.slice(1);

      response.forEach((item, i) => {

         if (item.class == markSelector || item.generalClass == markSelector) {

            empty.push(i);
         }
      });

      console.log(empty);
      pagination(empty);
   } // createPosts

   const filter = () => {
      const menu = document.querySelector('.posts__nav'),
            items = menu.querySelectorAll('li');

      const setFilter = (markSelector) => {
         const btn = menu.querySelector(markSelector);

         btn.addEventListener('click', () => {
            temp(markSelector);
         });
      };
      
      setFilter('.all');
      setFilter('.article');
      setFilter('.news');
      setFilter('.events');


      // Переключение класа активности меню фильтра
      menu.addEventListener('click', (e) => {
         let target = e.target;

         if (target && target.tagName == 'LI') {
            items.forEach(btn => btn.classList.remove('filter__active'));
            target.classList.add('filter__active');
         }
      });

   }; // filter


   // Первый запуск фильтра
   filter(); 


   // Автоматический клик, чтобы при переходе на страницу показывались все посты
   const btn = document.querySelector('.posts__nav').querySelector('.all');
   btn.click();
};

export default showPosts;