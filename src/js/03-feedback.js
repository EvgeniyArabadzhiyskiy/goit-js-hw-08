import throttle from 'lodash.throttle';


const storage = {
    addFormData(key, value) {
        const result = JSON.stringify(value)
        localStorage.setItem(key, result)
        
    },

    getFormData(key) {
        try {
            const payload = localStorage.getItem(key);
            return JSON.parse(payload)
        } catch (error) {
            console.error(error);
            
        }
    }
}


const refs = {
    form: document.querySelector('.feedback-form'),
    input: document.querySelector('[type="email"]'),
    textarea: document.querySelector('form textarea'),
}

refs.form.addEventListener('input', throttle(onFormInput, 500));
refs.form.addEventListener('submit', onFormSubmit);

const STOREGE_KEY = 'feedback-form-state';
let formData = {};

populateTextarea();



function onFormInput(evt) {
    formData[evt.target.name] = evt.target.value;

    // localStorage.setItem(STOREGE_KEY, JSON.stringify(formData));
    storage.addFormData(STOREGE_KEY, formData)

}

function onFormSubmit(evt) {
    evt.preventDefault();

    console.log("formData", formData);
    formData = {};
    
    localStorage.removeItem(STOREGE_KEY);
    evt.currentTarget.reset();

}

function populateTextarea() {
    const localStorageItems = storage.getFormData(STOREGE_KEY)
    formData = {...localStorageItems};
        
    if (formData?.email) {
        refs.input.value = formData.email;
    }

    if (formData?.message) {
        refs.textarea.value = formData.message;
    }
  
}

