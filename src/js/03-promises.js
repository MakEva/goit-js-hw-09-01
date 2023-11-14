import Notiflix from 'notiflix';


const refs = {
  formEl: document.querySelector(".form"),
  firstDelayEl: document.querySelector("input[name='delay']"),
  delayStepEl: document.querySelector("input[name='step']"),
  amount: document.querySelector("input[name='amount']"),
}

refs.formEl.addEventListener("submit", onSubmitForm);

function onSubmitForm(evt) {
  evt.preventDefault();
  const firstDelayValue = parseInt(refs.firstDelayEl.value);
  const delayStepValue = parseInt(refs.delayStepEl.value);
  const amountValue = parseInt(refs.amount.value);
 
  for (let i = 0; i < amountValue; i += 1) {

    createPromise(i + 1, firstDelayValue + i * delayStepValue)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  };  
};

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
        setTimeout(() => {
          if (shouldResolve) {
          resolve({ position, delay });
          } else {
          reject({ position, delay });
          }
          }, delay);
})
}
  




