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
  document.addEventListener('click', onSuccessRemove); document.addEventListener('keydown', onElementEscRemove);
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

modalForm.addEventListener('submit', onFormSend);
headerButtonMenu.addEventListener('click', onAddMenu);
headerNavClose.addEventListener('click', onRemoveMenu);
headerSelectCity.addEventListener('click', onClickSelectedMenu);
switchCities(buttonSelectCities, headerSelectCity, headerLinkSelect);
