const modals = () => {
   function bindModal(triggerSelector, modalSelector, closeSelector, animationClass = 'fadeIn') {
      const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector),
            windows = document.querySelectorAll('[data-modal]'),
            scroll = calcScroll();
      
      trigger.forEach(btn => {
         btn.addEventListener('click', (e) => {
            if (e.target) {
               e.preventDefault();
            }

            windows.forEach(item => {
               item.style.display = 'none';
               item.classList.add('animated', animationClass);
            });

            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            document.body.style.marginRight = `${scroll}`;
         });
      });

      close.addEventListener('click', () => {
         windows.forEach(item => {
            item.style.display = 'none';
            document.body.style.overflow = '';
         });
      });
   }

   function calcScroll() {
      let div = document.createElement('div');

      div.style.width = '50px';
      div.style.height = '50px';
      div.style.overflowY = 'scroll';
      div.style.visibility = 'hidden';

      document.body.appendChild(div);

      let scrollWidth = div.offsetWidth - div.clientWidth;
      div.remove();

      return scrollWidth;
   }

   bindModal('.header .header__burger', '.burger-modal', '.burger-modal .popup-close');
};

export default modals;