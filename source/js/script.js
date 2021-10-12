/* eslint-disable id-length */
/* eslint-disable no-shadow */
const body = document.querySelector('.body');
const headerSelectCity = body.querySelector('.header__select-city');
const headerListSelectCity = body.querySelector('.header__list-select-city');
const buttonSelectCities = body.querySelectorAll('.header__item-select-city');
const headerLinkSelect = body.querySelectorAll('.header__link-select-city');
const headerButtonMenu = document.querySelector('.header__button-menu');
const headeNav = body.querySelector('.header__wrapper-nav');
const headerNavClose = body.querySelector('.header__nav-close');

const onClickSelectedMenu = () => {
  headerSelectCity.classList.toggle('header__select-city--active');
  headerListSelectCity.classList.toggle('header__list-select-city--active');
};

const switchCities = (buttons, element, items) => {
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', () => {

      for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('header__item-select-city--selected');
      }

      buttons[i].classList.add('header__item-select-city--selected');
      element.textContent = items[i].textContent;
      onClickSelectedMenu();
    });
  }
};

const onAddMenu = () => {
  headeNav.classList.add('header__wrapper-nav--active');
};

const onRemoveMenu = () => {
  headeNav.classList.remove('header__wrapper-nav--active');
};

headerButtonMenu.addEventListener('click', onAddMenu);
headerNavClose.addEventListener('click', onRemoveMenu);
headerSelectCity.addEventListener('click', onClickSelectedMenu);
switchCities(buttonSelectCities, headerSelectCity, headerLinkSelect);
