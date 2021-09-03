import accordion from './modules/accordion';
import modals from './modules/modals';
import mask from './modules/mask';
import forms from './modules/forms';
import filterCards from './modules/filterCards';
import filterTemp from './modules/filterTemp';
import headerScroll from './modules/headerScroll';


window.addEventListener('DOMContentLoaded', () => {
   accordion('.questions__accordion .accordion-header', 'questions-accordion__active');
   accordion('.aside-menu .accordion-header', 'aside-menu__active', false);
   modals();
   mask('[name="phone"]');
   forms();
   headerScroll('.header__top', 'header__scroll');
   filterCards();
   
   filterTemp();
});