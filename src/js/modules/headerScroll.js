const headerScroll = (headerSelector, scrollHeaderSelector) => {
   const header = document.querySelector(headerSelector);

   window.addEventListener('scroll', () => {
      if (window.pageYOffset > 320) {
         header.classList.add('animated', 'fadeInDown');
         header.classList.add(scrollHeaderSelector);
      }
      else {
         header.classList.remove('fadeInDown');
         header.classList.remove(scrollHeaderSelector);
      }
   });
};

export default headerScroll;