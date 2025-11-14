import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

const makePromise = ({ delay, shouldResolve }) => {
  console.log(delay);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve();
        iziToast.success({
          message: `Fulfilled promise in ${delay}ms`,
        });
      } else {
        reject();
        iziToast.error({
          message: `Rejected promise in ${delay}ms`,
        });
      }
    }, delay);
  });
};

function getValue(groupName) {
  const radioButtons = document.getElementsByName(groupName);
  for (const radioButton of radioButtons) {
    if (radioButton.checked) {
      return radioButton.value;
    }
  }
  return null;
}

const SubmitBtn = document.querySelector('.submit-btn');
const inputBox = document.querySelector('.input');
const form = document.querySelector('.form');

let userDalay = 0;
inputBox.addEventListener('input', e => {
  userDalay = e.target.value;
});

form.addEventListener('submit', e => {
  e.preventDefault();
  form.reset();
});

SubmitBtn.addEventListener('click', () => {
  const selected = getValue('state');
  if (selected === 'fulfilled') {
    makePromise({ delay: userDalay, shouldResolve: true });
  } else if (selected === 'rejected') {
    makePromise({ delay: userDalay, shouldResolve: false });
  } else {
    return;
  }
});
