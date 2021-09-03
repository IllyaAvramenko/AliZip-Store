import { getResourse } from "../services/requests";
import pagination from "./pagination";

const filterPosts1 = () => {

   function getProducts (markSelector) {
      getResourse('http://localhost:3000/posts')
         .then(res => createPosts(res, markSelector))
         .catch()
         .finally();
   }

   function createPosts(response, markSelector) {     // Создает масив с номерами карточек, которые отвечают заданому класу
      const empty = [];

      markSelector = markSelector.slice(1);
   
      response.forEach((item, i) => {
         if (item.class == markSelector || item.generalClass == markSelector) {
            empty.push(i);
         }
      });
   
      console.log(empty);
      pagination(empty);
   } // createPosts

   const menu = document.querySelector('.posts__nav'),
         items = menu.querySelectorAll('li');


   const setFilter = (markSelector) => {
      const btn = menu.querySelector(markSelector);

      btn.addEventListener('click', () => {
         if (!btn.classList.contains('filter__active')) {
            getProducts(markSelector);
         }
      });
   };

   setFilter('.all');
   setFilter('.article');
   setFilter('.news');
   setFilter('.events');

   menu.addEventListener('click', (e) => {      // Переключение класа активности
      let target = e.target;

      if (target && target.tagName == 'LI') {
         items.forEach(btn => btn.classList.remove('filter__active'));
         target.classList.add('filter__active');
      }
   });

   const btn = menu.querySelector('.all');
   btn.click();
};

export default filterPosts1;