/* eslint-disable id-length */
/* eslint-disable no-shadow */
const body = document.querySelector('.body');
const headerSelectCity = body.querySelector('.header__select-city');
const headerListSelectCity = body.querySelector('.header__list-select-city');
const buttonSelectCities = body.querySelectorAll('.header__item-select-city');
const headerLinkSelect = body.querySelectorAll('.header__link-select-city');
const dataCity = body.querySelector('.header__block-text p');
const headerButtonMenu = body.querySelector('.header__button-menu');
const headerNav = body.querySelector('.header__wrapper-nav');
const headerNavClose = headerNav.querySelector('.header__nav-close');
const headerNavButtons = headerNav.querySelectorAll('.header__nav-item');
const footerSelectCityButtons = body.querySelectorAll('.footer__item-select-city');
const modalForm = body.querySelector('.consist__form');
const dataSabmitUrl = 'https://echo.htmlacademy.ru/';

const getTemplateContent = (block, item) =>
  block.querySelector(`#${item}`)
    .content
    .querySelector(`.${item}`);

const success = getTemplateContent(body, 'alert__success');
const errorLoading = getTemplateContent(body, 'alert__error-loading');

const successElement = success.cloneNode(true);
const successErrorLoading = errorLoading.cloneNode(true);

const cityData = [
  ' 10-21 мая',
  ' 20-31 июня',
  ' 10-21 августа',
];

const keys = {
  escape: 'Escape',
  esc: 'Escape',
};

const isEscEvent = (evt) => evt.key === keys.escape || evt.key === keys.esc;

const onErrorRemove = () => {
  successErrorLoading.remove();
  document.removeEventListener('click', onErrorRemove);
};

const onSuccessRemove = () => {
  successElement.remove();
  document.removeEventListener('click', onSuccessRemove);
};

const onElementEscRemove = () => {
  if (isEscEvent) {
    onSuccessRemove();
    document.removeEventListener('keydown', onElementEscRemove);
  }
};

const onErrorEscRemove = () => {
  if (isEscEvent) {
    onErrorRemove();
    document.removeEventListener('keydown', onErrorEscRemove);
  }
};

const alertSuccess = () => {
  body.append(successElement);
  document.addEventListener('click', onSuccessRemove);
  document.addEventListener('keydown', onElementEscRemove);
};

const alertError = () => {
  body.append(successErrorLoading);
  document.addEventListener('click', onErrorRemove);
  document.addEventListener('keydown', onErrorEscRemove);
};

const onClickSelectedMenu = () => {
  headerSelectCity.classList.toggle('header__select-city--active');
  headerListSelectCity.classList.toggle('header__list-select-city--active');
};

function switchCities(buttons, footerButtons, element, items, city, when) {
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', () => {

      for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('header__item-select-city--selected');
        footerButtons[i].classList.remove('footer__item-select-city--active');
      }

      buttons[i].classList.add('header__item-select-city--selected');
      footerButtons[i].classList.add('footer__item-select-city--active');
      element.textContent = items[i].textContent;
      city.textContent = items[i].textContent + when[i];
      onClickSelectedMenu();
    });
  }
}

function switchCitiesFooter(buttons, footerButtons, element, items, city, when) {
  for (let i = 0; i < buttons.length; i++) {
    footerButtons[i].addEventListener('click', () => {

      for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('header__item-select-city--selected');
        footerButtons[i].classList.remove('footer__item-select-city--active');
      }

      buttons[i].classList.add('header__item-select-city--selected');
      footerButtons[i].classList.add('footer__item-select-city--active');
      element.textContent = items[i].textContent;
      city.textContent = items[i].textContent + when[i];
      headerListSelectCity.classList.remove('header__list-select-city--active');
      headerSelectCity.classList.remove('header__select-city--active');
    });
  }
}

const onAddMenu = () => {
  headerNav.classList.add('header__wrapper-nav--active');
};

const onRemoveMenu = () => {
  headerNav.classList.remove('header__wrapper-nav--active');
};

const sendData = (url, bodyForm, alertSucces, error) => {
  fetch(url, {
    method: 'POST',
    body: bodyForm,
  })
    .then((response) => {
      if (response.ok) {
        alertSucces();
      } else {
        error();
      }
    })
    .catch(() => {
      error();
    });
};

const onFormSend = (evt) => {
  evt.preventDefault();

  const formData = new FormData(evt.target);

  sendData(dataSabmitUrl, formData, alertSuccess, alertError);
};

for (const button of headerNavButtons) {
  button.addEventListener('click', onRemoveMenu);
}
modalForm.addEventListener('submit', onFormSend);
headerButtonMenu.addEventListener('click', onAddMenu);
headerNavClose.addEventListener('click', onRemoveMenu);
headerSelectCity.addEventListener('click', onClickSelectedMenu);
switchCities(buttonSelectCities, footerSelectCityButtons, headerSelectCity, headerLinkSelect, dataCity, cityData);
switchCitiesFooter(buttonSelectCities, footerSelectCityButtons, headerSelectCity, headerLinkSelect, dataCity, cityData);
