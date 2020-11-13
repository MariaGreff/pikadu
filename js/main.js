// Создаем переменную, в которую положим кнопку меню
let menuToggle = document.querySelector('#menu-toggle');
// Создаем переменную, в которую положим меню
let menu = document.querySelector('.sidebar');
// отслеживаем клик по кнопке меню и запускаем функцию 
menuToggle.addEventListener('click', function (event) {
  // отменяем стандартное поведение ссылки
  event.preventDefault();
  // вешаем класс на меню, когда кликнули по кнопке меню 
  menu.classList.toggle('visible');
})

const loginElem = document.querySelector('.login');
const loginForm = document.querySelector('.login-form');
const emailInput = document.querySelector('.login-email');
const passwordInput = document.querySelector('.login-password');
const loginSignup = document.querySelector('.login-signup');

const userElem = document.querySelector('.user');
const userNameElem = document.querySelector('.user-name');


const listUsers = [
  {
    id: '01',
    email: 'test1@test.com',
    password: 'password1',
    displayName: 'Test1',
  },
  {
    id: '02',
    email: 'test2@test.com',
    password: 'password2',
    displayName: 'Test2',
  }
];

const setUsers = {
  user: null,
  logIn(email, password, handler) {
    const user = this.getUser(email);
    if (user && user.password === password) {
      this.authorizedUser(user);
      handler();
    } else {
      alert('No such user!')
    }
  },
  logOut() {

  },
  signUp(email, password, handler) {
    if (!this.getUser(email)){
      const newDisplayName = this.shortenDisplayName(email);
      const user = {email, password, displayName: newDisplayName}
      listUsers.push(user);
      this.authorizedUser(user);
      handler();
    } else {
      alert('The user already exists!')
    }
  },
  getUser(email) {
    return listUsers.find(item => item.email === email)
  },
  authorizedUser(user) {
    this.user = user;
  },
  shortenDisplayName(email) {
    console.log(email.split('@')[0]);
    return email.split('@')[0];
  }
};

const toggleAuthDom = () => {
  const user = setUsers.user;
  if (user) {
    loginElem.style.display = 'none';
    userElem.style.display = '';
    userNameElem.textContent = user.displayName;
  } else {
    loginElem.style.display = '';
    userElem.style.display = 'none';
  }
};

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  setUsers.logIn(emailInput.value, passwordInput.value, toggleAuthDom);
});

loginSignup.addEventListener('click', (event) => {
  event.preventDefault();
  setUsers.signUp(emailInput.value, passwordInput.value, toggleAuthDom);
});

toggleAuthDom();