const data_form = document.querySelector('[data-form]');
const all_inputs = document.querySelectorAll('[data-input]');
const invalid_msg = document.querySelectorAll('[data-error-msg]');
const invalide_input = document.querySelectorAll('[data-error-input]');
const submitBtn = document.getElementById('btn');

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const nameRegex = /^[a-zA-Z ]{2,30}$/;
const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;


//display error message on screen
const displayErrorMsg = (input, typeOfMessage) => {
    input.parentElement.classList.add('active');
    typeOfMessage.forEach(msg => {
        if (input.dataset.input === msg.dataset.errorInput ||
            input.dataset.input === msg.dataset.errorMsg) {
            msg.classList.add('active');
            if (input.dataset.input === 'email') {
                input.placeholder = 'email@example.com';
            } else {
                input.placeholder = '';
            }
        }
    })
}

// remove error message from screen
const removeErrorMsg = (input, typeOfMessage) => {
    input.parentElement.classList.remove('active');
    typeOfMessage.forEach(msg => {
        if (input.dataset.input === msg.dataset.errorInput ||
            input.dataset.input === msg.dataset.errorMsg) {
            msg.classList.remove('active');
        }
    })
}

// Validate input
const validateInput = (input, regex) => {
    if (!regex.test(input.value)) {
        displayErrorMsg(input, invalide_input);
    } else {
        removeErrorMsg(input, invalide_input);
        return true;
    }
}

// empty form validation 
const validationForm = (event) => {
    event.preventDefault();
    let count = 0;

    all_inputs.forEach(input => {
        if (input.value === '' || input.value === null || input.value === 'email@example.com') {
            removeErrorMsg(input, invalide_input);
            displayErrorMsg(input, invalid_msg);
        } else if (input.dataset.input === 'fname' || input.dataset.input === 'lname') {
            removeErrorMsg(input, invalid_msg);
            validateName = validateInput(input, nameRegex);
            if (validateName === true) {
                count++;
            }
        } else if (input.dataset.input === 'password') {
            removeErrorMsg(input, invalid_msg);
            validatePassword = validateInput(input, passwordRegex);
            if (validatePassword === true) {
                count++;
            }
        } else if (input.dataset.input === 'email') {
            removeErrorMsg(input, invalid_msg);
            validateEmail = validateInput(input, emailRegex);
            if (validateEmail === true) {
                input.placeholder = 'email@example.com';
                count++;
            }
        }
        if (count === all_inputs.length) {
            data_form.submit();
        }
    })
}
submitBtn.addEventListener('click', validationForm);