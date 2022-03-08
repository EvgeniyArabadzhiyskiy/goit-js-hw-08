import throttle from 'lodash.throttle';


const refs = {
    form: document.querySelector('.feedback-form'),
    input: document.querySelector('[type="email"]'),
    textarea: document.querySelector('form textarea')
}

refs.form.addEventListener('input', throttle(onFormInput, 500));
refs.form.addEventListener('submit', onFormSubmit);

populateTextarea();

const formData = {};

function onFormInput(evt) {

    formData[evt.target.name] = evt.target.value;
    console.log("formData", formData);

    localStorage.setItem("feedback-form-state", JSON.stringify(formData));
    
}

function onFormSubmit(evt) {
    evt.preventDefault();

    evt.currentTarget.reset();
    localStorage.removeItem("feedback-form-state");
}

function populateTextarea() {
    const saveMessage = localStorage.getItem("feedback-form-state");
    
    if (saveMessage) {
        const localStorageItems = JSON.parse(saveMessage)
        console.log('localStorage', localStorageItems);

        
        if (localStorageItems.message) {
            refs.textarea.value = localStorageItems.message;
        }

        else {
            refs.textarea.value = '';
        }

        if (localStorageItems.email) {
            refs.input.value = localStorageItems.email;
        }

        else {
            refs.input.value = '';
        }
  
    }
    
}

