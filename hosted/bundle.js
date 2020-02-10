const parseJSON = (xhr, content) => {
  if (xhr.response) {
    const obj = JSON.parse(xhr.response);
    console.dir(obj);

    if (obj.message) {
      let myString = JSON.stringify(obj.message);
      content.innerHTML += `<p> ${myString}</p>`;
    }
  }
};

const handleResponse = xhr => {
  const content = document.querySelector('#content');

  switch (xhr.status) {
    case 200:
      content.innerHTML = '<b> Success </b>';
      break;

    case 201:
      content.innerHTML = '<b> Created </b>';
      break;

    case 204:
      content.innerHTML = '<b> Updated (no Content) </b>';
      break;

    case 400:
      content.innerHTML = '<b> Bad Request </b>';
      break;

    case 404:
      content.innerHTML = `<b> Resource Not Found </b>`;
      break;

    default:
      content.innerHTML = '<b> Not Implemented Yet </b>';
      break;
  }

  parseJSON(xhr, content);
};

const sendPost = (e, nameForm) => {
  e.preventDefault();
  const nameAction = nameForm.getAttribute('action');
  const nameMethod = nameForm.getAttribute('method');
  const nameField = nameForm.querySelector('#nameField').value;
  const ageField = nameForm.querySelector('#ageField').value;
  const xhr = new XMLHttpRequest();
  xhr.open(nameMethod, nameAction);
  xhr.setRequestHeader('Accept', 'application/json');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  xhr.onload = () => handleResponse(xhr);

  const formData = `name=${nameField}&age=${ageField}`;
  xhr.send(formData);
  return false;
}; // for handling get


const sendAjax = (e, userForm) => {
  e.preventDefault();
  let userRequestType = userForm.getAttribute('method');
  userRequestType = userForm.querySelector("#methodSelect").value.toUpperCase();
  let userUrl = userForm.getAttribute('action');
  userUrl = userForm.querySelector("#urlField").value;
  const xhr = new XMLHttpRequest();
  xhr.open(userRequestType, userUrl);
  xhr.setRequestHeader("Accept", 'application/json');

  xhr.onload = () => handleResponse(xhr);

  xhr.send();
};

const init = () => {
  // nameform sends a post request
  const nameForm = document.querySelector('#nameForm'); // user form sends a get request (either body or head)

  const userForm = document.querySelector("#userForm");

  const addUser = e => sendPost(e, nameForm);

  nameForm.addEventListener('submit', addUser);

  const getUser = e => sendAjax(e, userForm);

  userForm.addEventListener('submit', getUser);
};

window.onload = init;
