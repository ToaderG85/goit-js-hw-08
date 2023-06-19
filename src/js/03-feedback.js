import throttle from 'lodash.throttle';

const emailInput = document.querySelector("input[name='email']");
const messageInput = document.querySelector("textarea[name='message']");


emailInput.addEventListener("input", throttle((event) => {
    localStorage.setItem("feedback-form-state", JSON.stringify({
        email: event.currentTarget.value,
        message: messageInput.value,
    }))
  },500));

messageInput.addEventListener("input", throttle((event) => {
    localStorage.setItem("feedback-form-state", JSON.stringify({
        email: emailInput.value,
        message: event.currentTarget.value,
    }))
},500));

const savedData = localStorage.getItem("feedback-form-state");

if (savedData) {
    const parsedData = JSON.parse(savedData);
    emailInput.value = parsedData.email;
    messageInput.value = parsedData.message;
}


const form = document.querySelector(".feedback-form");

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  localStorage.removeItem("feedback-form-state");
  const {
    elements: { email, message }
  } = event.currentTarget;

  console.log({
    email: email.value, message: message.value});
  event.currentTarget.reset();
}

