import throttle from 'lodash.throttle';


const refs = {
    form: document.querySelector('.feedback-form'),
    input: document.querySelector('[type="email"]'),
    textarea: document.querySelector('form textarea'),
}

refs.form.addEventListener('input', throttle(onFormInput, 500));
refs.form.addEventListener('submit', onFormSubmit);

let formData = {};

populateTextarea();



function onFormInput(evt) {
    formData[evt.target.name] = evt.target.value;

    localStorage.setItem("feedback-form-state", JSON.stringify(formData));

}

function onFormSubmit(evt) {
    evt.preventDefault();

    console.log("formData", formData);
    formData = {};
    
    localStorage.removeItem("feedback-form-state");
    evt.currentTarget.reset();

}

function populateTextarea() {
    const getItemsMessage = localStorage.getItem("feedback-form-state");
    const localStorageItems = JSON.parse(getItemsMessage);
   
    if (localStorageItems) {
        formData = localStorageItems;
        
    }
    
    if (localStorageItems) {
        
        if (localStorageItems.email) {
            refs.input.value = localStorageItems.email;
        }

        if (localStorageItems.message) {
            refs.textarea.value = localStorageItems.message;
        }
  
    }
    
}

