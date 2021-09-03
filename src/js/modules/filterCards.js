import {getResourse} from "../services/requests";

const filterCards = () => {

   try {
      const menu = document.querySelector('.pullers__nav'),
            items = menu.querySelectorAll('li');

      const setFilter = (markSelector) => {
         const btn = menu.querySelector(markSelector);

         btn.addEventListener('click', () => {
            if (!btn.classList.contains('filter__active')) {
               getProducts(markSelector);
               createButton();
            }
         });
      };

      setFilter('.metal');
      setFilter('.textile');
      setFilter('.reflective');
      setFilter('.plastic');
      setFilter('.logo');
      setFilter('.order');
      setFilter('.sale');

      menu.addEventListener('click', (e) => {      // Переключение класа активности
         let target = e.target;

         if (target && target.tagName == 'LI') {
            items.forEach(btn => btn.classList.remove('filter__active'));
            target.classList.add('filter__active');
         }
      });

      // Автоматический клик, чтобы при переходе на страницу показывались все посты
      const btn = document.querySelector('.pullers__nav').querySelector('.metal');
      btn.click();

   } catch(e){}

   function getProducts (markSelector) {
      getResourse('http://localhost:3000/products')
         .then(res => createProducts(res, markSelector))
         .catch()
         .finally();
   }
   
   function createProducts(response, markSelector) {     // Создает масив с номерами карточек, которые отвечают заданому класу
      const empty = [];

      markSelector = markSelector.slice(1);
   
      response.forEach((item, i) => {
         if (item.class == markSelector) {
            empty.push(i);
         }
      });
   
      console.log(empty);
      loadMore(empty);
   } // createProducts

   function createButton() {              // Динамически создает каждый раз кнопку и помещает ее в div center
      const pullersSection = document.querySelector('.pullers'),
            btnWrapper = pullersSection.querySelector('.center');
      
      btnWrapper.innerHTML = '';

      btnWrapper.innerHTML = `
         <div class="type-1">
               <button id="loadmore" class="btn btn-1">
                  <span class="txt">Показать ещё</span>
                  <span class="round"><i class="fa fa-chevron-right"></i></span>
               </button>
         </div> 
      `;
   }



   const loadMore = (array) => {
      const btn = document.getElementById('loadmore'),
            itemsWrapper = document.querySelector('.pullers__products');
   
      let listNumbers = array;
   
      let currentIndex = 1,
          amountDisplay = 3;
   
      itemsWrapper.innerHTML = '';
   
      getResourse('http://localhost:3000/products')
         .then(res => displayProduct(listNumbers, itemsWrapper, amountDisplay, currentIndex, res))
         .catch()
         .finally();
   
      function displayProduct(items, wrapper, amountDisplay, currentIndex, response) {
         currentIndex--;
         console.log(currentIndex);
   
         let start = amountDisplay * currentIndex,
             end = start + amountDisplay;
   
         let formedListNumbers = items.slice(start, end);
   
         console.log(formedListNumbers);
   
         if (formedListNumbers.length == 0) {
            btn.style.display = 'none';
            return;
         }
   
         formedListNumbers.forEach(num => {
            response.forEach((prod, j) => {
               if (num === j) {
   
                  let product = document.createElement('div');
                     product.classList.add(`${prod.generalClass}`, `${prod.class}`);
                     product.setAttribute('id', `${prod.id}`)
   
                     product.innerHTML = `
                        <a href="partners.html">
                           <div class="pullers__products-top">
                              <img src="${prod.src}" alt="card-img">
                           </div>
                           <div class="pullers__products-bottom">
                              <p>${prod.article}</p>
                              <h5>${prod.title}</h5>
                           </div>
                        </a>
                     `;
                     
                     wrapper.append(product);
               }
            });
         });
      }
      
      btn.addEventListener('click', () => {
         currentIndex += 1;
   
         console.log(listNumbers);
   
         getResourse('http://localhost:3000/products')
            .then(res => displayProduct(listNumbers, itemsWrapper, amountDisplay, currentIndex, res))
            .catch()
            .finally();
      });
   };

};

export default filterCards;