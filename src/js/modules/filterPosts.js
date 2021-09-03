const filterPosts = () => {
   try {
      const menu = document.querySelector('.posts__nav'),
            items = menu.querySelectorAll('li'),
            wrapper = document.querySelector('.posts__cards'),
            markAll = wrapper.querySelectorAll('.posts__card');

      const typeFilter = (markTypeSelector) => {
         const markType = wrapper.querySelectorAll(markTypeSelector);

         markAll.forEach(mark => {
            mark.style.display = 'none';
            mark.classList.remove('animated', 'fadeIn');
         });

         markType.forEach(mark => {
            mark.style.display = 'block';
            mark.classList.add('animated', 'fadeIn');
         });
      };

      const setFilter = (markSelector) => {
         const btn = menu.querySelector(markSelector);

         btn.addEventListener('click', () => {
            typeFilter(markSelector);
         });
      };

      setFilter('.all');
      setFilter('.article');
      setFilter('.news');
      setFilter('.events');

      menu.addEventListener('click', (e) => {
         let target = e.target;

         if (target && target.tagName == 'LI') {
            items.forEach(btn => btn.classList.remove('filter__active'));
            target.classList.add('filter__active');
         }
      });
   } catch(e){}
};

export default filterPosts;