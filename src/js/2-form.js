const formStyle = {
  galeryForm: {
    display: 'flex',
    alignItems: 'center',
  },
  form: {
    width: '408px',
    display: 'flex',
    flexDirection: 'column',
    alignItem: 'flex-start',
    justifyContent: 'center',
    padding: '24px 0',
    gap: '16px',
  },
  labelForm: {
    width: '360px',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '1.5',
    letterSpacing: '0.04em',
    color: '#2e2f42',
  },
  formInput: {
    maxWidth: '100%',
    height: '40px',
    outline: 'none',
    borderRadius: '4px',
    border: '2px solid #808080',
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '1.5',
    letterSpacing: '0.04em',
    color: '#2e2f42',
    transition: 'border 250ms ease-out',
  },
  formInputHover: {
    border: '2px solid black',
  },
  formTextarea: {
    maxWidth: '100%',
    resize: 'none',
    outline: 'none',
    borderRadius: '4px',
    border: '2px solid #808080',
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '1.5',
    letterSpacing: '0.04em',
    color: '#2e2f42',
    transition: 'border 250ms ease-out',
  },
  formTextareaHover: {
    border: '2px solid black',
  },
  formBtn: {
    fontWeight: '500',
    fontSize: '16px',
    lineHeight: '1.5',
    letterSpacing: '0.04em',
    color: '#fff',
    borderRadius: '8px',
    padding: '8px 16px',
    width: '95px',
    height: '40px',
    border: 'none',
    outline: 'none',
    backgroundColor: '#4e75ff',
    transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
  formBtnHover: {
    background: '#6c8cff',
  },
};

const formData = {
  email: '',
  message: '',
};
const galeryForm = document.querySelector('.galery-form');

const form = document.querySelector('.form');
const formLabels = document.querySelectorAll('label');

const formInput = document.getElementById('email');
const formTextarea = document.getElementById('textarea');
const formBtn = document.querySelector('.form__btn');

const emailInput = form.elements.email;
const message = form.elements.message;
const emailErrorSpan = addErrorSpan(emailInput);
const messageErrorSpan = addErrorSpan(message);

function initializeStyle() {
  if (!galeryForm) return;
  Object.assign(galeryForm.style, formStyle.galeryForm);
  Object.assign(form.style, formStyle.form);
  Object.assign(formBtn.style, formStyle.formBtn);
  [...formLabels].map(label => {
    return Object.assign(label.style, formStyle.labelForm);
  });
  Object.assign(formInput.style, formStyle.formInput);
  Object.assign(formTextarea.style, formStyle.formTextarea);

  formInput.addEventListener('mouseover', () => {
    Object.assign(formInput.style, formStyle.formInputHover);
  });
  formTextarea.addEventListener('mouseover', () => {
    Object.assign(formTextarea.style, formStyle.formTextareaHover);
  });
  formBtn.addEventListener('mouseover', () => {
    Object.assign(formBtn.style, formStyle.formBtnHover);
  });
  formInput.addEventListener('mouseout', () => {
    Object.assign(formInput.style, formStyle.formInput);
  });
  formTextarea.addEventListener('mouseout', () => {
    Object.assign(formTextarea.style, formStyle.formTextarea);
  });
  formBtn.addEventListener('mouseout', () => {
    Object.assign(formBtn.style, formStyle.formBtn);
  });
}
initializeStyle();

form.addEventListener('input', e => {
  formData[e.target.name] = e.target.value;
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
});

formBtn.addEventListener('click', e => {
  e.preventDefault();
  const login = emailInput.value.trim();
  const message = formTextarea.value.trim();
  let isValid = true;

  if (!login) {
    alert('Fill please all fields');
    emailErrorSpan.textContent = 'Email is required';
    isValid = false;
  } else {
    emailErrorSpan.textContent = '';
  }
  if (!message) {
    messageErrorSpan.textContent = 'Password is required';
    isValid = false;
  } else {
    messageErrorSpan.textContent = '';
  }

  if (login && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(login)) {
    emailErrorSpan.textContent = 'Invalid email format';
    isValid = false;
  }
  if (message && message.length < 8) {
    messageErrorSpan.textContent = 'Message must be at least 8 characters long';
    isValid = false;
  }
  if (!isValid) {
    return;
  }

  formData.email = email.value;
  formData.message = message;
  console.log(formData);
  form.reset();
  localStorage.removeItem('feedback-form-state');
});

function addErrorSpan(inputElement) {
  const errorSpan = document.createElement('span');
  errorSpan.className = 'error-message';
  errorSpan.style.color = 'red';
  errorSpan.style.fontSize = '12px';
  errorSpan.style.position = 'absolute';
  errorSpan.style.bottom = '-16px';

  inputElement.parentNode.insertBefore(errorSpan, inputElement.nextSibling);
  return errorSpan;
}
window.addEventListener('DOMContentLoaded', () => {
  const savedData = JSON.parse(localStorage.getItem('feedback-form-state'));
  if (savedData) {
    formData.email = savedData.email || '';
    formData.message = savedData.message || '';
    emailInput.value = formData.email;
    formTextarea.value = formData.message;
  }
});
