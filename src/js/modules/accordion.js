const accordion = (triggersSelector, activeClass, isAllActive = true) => {
   const accordionHead = document.querySelectorAll(triggersSelector);
   
   accordionHead.forEach(btn => {
      btn.addEventListener('click', () => {

         if (btn.firstElementChild.classList.contains('active-head')) {

            btn.firstElementChild.classList.remove('active-head', activeClass);
            btn.nextElementSibling.firstElementChild.classList.remove('active-head', 'fadeInDown');


         } else {

            if (isAllActive) {
               accordionHead.forEach(item => {
                  item.firstElementChild.classList.remove('active-head', activeClass);
                  item.nextElementSibling.firstElementChild.classList.remove('active-head', 'fadeInDown');
               });
            }

            btn.firstElementChild.classList.add('active-head', activeClass);
            btn.nextElementSibling.firstElementChild.classList.add('active-head', 'animated', 'fadeInDown');
         }

      });
   });
};

export default accordion;