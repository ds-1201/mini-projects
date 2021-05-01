const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.querySelector("#email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerHTML = message;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

function checkEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(String(email.value).toLowerCase())) {
    showError(email, getInputField(email) + " is invalid");
  } else {
    showSuccess(email);
  }
}

function checkLength(input, minLen, maxLen) {
  if (input.value.length < minLen) {
    showError(
      input,
      getInputField(input) + " shold be atleast " + minLen + " characters"
    );
  } else if (input.value.length > maxLen) {
    showError(
      input,
      getInputField(input) + " shold be atmost " + maxLen + " characters"
    );
  } else {
    showSuccess(input);
  }
}

function checkPasswordsMatch(input1, input2) {
  if (input1.value === input2.value && input2.value.length !== 0) {
    showSuccess(input2);
  } else {
    showError(input2, "Password do not match");
  }
}

function checkRequired(input) {
  for (let i = 0; i < input.length; i++) {
    if (input[i].value.trim() == "") {
      console.log(input[i]);
      const message = getInputField(input[i]) + " is required";
      showError(input[i], message);
    } else {
      showSuccess(input[i]);
    }
  }
}

function getInputField(input) {
  const i = input.id[0].toUpperCase() + input.id.substring(1);
  return i;
}

//Form Event Listner
form.addEventListener("submit", function (e) {
  // Prevents the form from submitting
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkEmail(email);
  checkLength(password, 6, 25);
  checkPasswordsMatch(password, password2);
});
