// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDH-RoeKSJaSSho7Nt-kMXOqCuTQ6nuA1M",
  authDomain: "pikadu-test-d0d99.firebaseapp.com",
  databaseURL: "https://pikadu-test-d0d99.firebaseio.com",
  projectId: "pikadu-test-d0d99",
  storageBucket: "pikadu-test-d0d99.appspot.com",
  messagingSenderId: "582711283998",
  appId: "1:582711283998:web:3c37f17bca17a13029390f",
  measurementId: "G-EBLCBWRE8H"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
console.log('firebase: ', firebase);

let menuToggle = document.querySelector('#menu-toggle');
let menu = document.querySelector('.sidebar');

const regExpValidEmail = /^\w+@\w+\.\w{2,}$/;

const loginElem = document.querySelector('.login');
const loginForm = document.querySelector('.login-form');
const emailInput = document.querySelector('.login-email');
const passwordInput = document.querySelector('.login-password');
const loginSignup = document.querySelector('.login-signup');

const userElem = document.querySelector('.user');
const userNameElem = document.querySelector('.user-name');
const userAvatarElem = document.querySelector('.user-avatar');

const exitElem = document.querySelector('.exit');
const editElem = document.querySelector('.edit');
const editContainer = document.querySelector('.edit-container');
const editUsername = document.querySelector('.edit-username');
const editPhotoURL = document.querySelector('.edit-photo');

const postsWrapper = document.querySelector('.posts');
const buttonNewPost = document.querySelector('.button-new-post');
const addPostElem = document.querySelector('.add-post');
const loginForget = document.querySelector('.login-forget');

DEFAULT_PHOTO = userAvatarElem.src;

// const listUsers = [
//   {
//     id: '01',
//     email: 'test1@test.com',
//     password: 'password1',
//     displayName: 'Test1',
//     photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRvCmjNf46BNewcQJYO0SUrlX6e4Vk1O_PmyQ&usqp=CAU',
//   },
//   {
//     id: '02',
//     email: 'test2@test.com',
//     password: 'password2',
//     displayName: 'Test2',
//   }
// ];

const setUsers = {
  user: null,
  initUser(handler) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
      if (handler) {
        handler();
      }
    })
  },
  logIn(email, password, handler) {
    if (!regExpValidEmail.test(email)) {
      alert ('Email is invalid');
      return;
    }

    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch(error => {
        alert(error.message);
      });
  },
  logOut() {
    firebase.auth().signOut();
  },
  signUp(email, password, handler) {
    if (!regExpValidEmail.test(email)) {
      alert ('Email is invalid');
      return;
    }

    if (!email.trim() || !password.trim()) {
      alert('Enter email and password');
      return;
    }
    firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(data => {
        this.editUser(email.split('@')[0], null, handler);
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage, errorCode);
      }); 
  },
  authorizedUser(user) {
    this.user = user;
  },
  editUser(displayName, photoURL, handler) {

    const user = firebase.auth().currentUser;

    if (displayName) {
      if (photoURL) {
        user.updateProfile({
          displayName,
          photoURL
        }).then(handler);
      } else {
        user.updateProfile({
          displayName
        }).then(handler);
      }
    }
  },
  sendForget(email) {
    firebase.auth().sendPasswordResetEmail(email)
      .then(() => {
        alert ('Check your email')
      })
      .catch(error => console.log(error));
  },
};

const setPosts = {
  // allPosts: [
  //   {
  //     title: 'Заголовлок поста',
  //     text: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Языком что рот маленький реторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись ему букв деревни предложения, ручеек залетают продолжил парадигматическая? Но языком сих пустился, запятой своего его снова решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстов ipsum первую подпоясал? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составитель агентство что вопроса ведущими о решила одна алфавит!',
  //     tags: [
  //       'fresh', 'new', 'hot', 'mine',
  //     ],
  //     author: {displayName: 'test', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRvCmjNf46BNewcQJYO0SUrlX6e4Vk1O_PmyQ&usqp=CAU'},
  //     date: '11.11.2020, 20:55:00',
  //     likes: 15,
  //     comments: 5,
  //   },
  //   {
  //     title: 'Заголовлок поста2',
  //     text: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Языком что рот маленький реторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись ему букв деревни предложения, ручеек залетают продолжил парадигматическая? Но языком сих пустился, запятой своего его снова решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстов ipsum первую подпоясал? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составитель агентство что вопроса ведущими о решила одна алфавит!',
  //     tags: [
  //       'fresh', 'new', 'hot', 'mine',
  //     ],
  //     author: {displayName: 'test', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRvCmjNf46BNewcQJYO0SUrlX6e4Vk1O_PmyQ&usqp=CAU'},
  //     date: '11.11.2020, 20:55:00',
  //     likes: 15,
  //     comments: 5,
  //   }
  // ],
  addPost(title, text, tags, handler) {
    this.allPosts.unshift({
      id: `postID${(+new Date()).toString(16)}`,
      title,
      text, 
      tags: tags.split(',').map(tag => tag.trim()),
      author: {
        displayName: setUsers.user.displayName,
        photo: setUsers.user.photoURL,
      },
      date: new Date().toLocaleString(), 
      likes: 0,
      comments: 0,
    })

    firebase.database().ref('post').set(this.allPosts)
      .then(()=> this.getPosts(handler));
  },
  getPosts(handler) {
    firebase.database().ref('post').on('value', snapshot => {
      this.allPosts = snapshot.val() || [];
      handler();
    })
  }
};

const toggleAuthDom = () => {
  const user = setUsers.user;
  if (user) {
    loginElem.style.display = 'none';
    userElem.style.display = '';
    userNameElem.textContent = user.displayName;
    userAvatarElem.src = user.photoURL || DEFAULT_PHOTO;
    buttonNewPost.classList.add('visible');
  } else {
    loginElem.style.display = '';
    userElem.style.display = 'none';
    buttonNewPost.classList.remove('visible');
    addPostElem.classList.remove('visible');
    // TODO
    postsWrapper.classList.add('visible');
  }
};

const showAllPosts = () => {
  let postsHTML = '';
  setPosts.allPosts.forEach(({ title, text, tags, author, date, likes, comments }) => {
    postsHTML += `
    <section class="post">
    <div class="post-body">
      <h2 class="post-title">${title}</h2>
      <p class="post-text">${text}</p>
      <div class="tags">
      ${tags.map(tag => `<a href="#" class="tag">#${tag}</a>`)}
      </div>
    </div>

    <div class="post-footer">
      <div class="post-buttons">
        <button class="post-button likes">
          <svg width="19" height="20" class="icon icon-like">
            <use xlink:href="img/icons.svg#like"></use>
          </svg>
          <span class="likes-counter">${likes}</span>
        </button>
        <button class="post-button comments">
          <svg width="21" height="21" class="icon icon-comment">
            <use xlink:href="img/icons.svg#comment"></use>
          </svg>
          <span class="comments-counter">${comments}</span>
        </button>
        <button class="post-button save">
          <svg width="19" height="19" class="icon icon-save">
            <use xlink:href="img/icons.svg#save"></use>
          </svg>
        </button>
        <button class="post-button share">
          <svg width="17" height="19" class="icon icon-share">
            <use xlink:href="img/icons.svg#share"></use>
          </svg>
        </button>
      </div>
  
      <div class="post-author">
        <div class="author-about">
          <a href="#" class="author-username">${author.displayName}</a>
          <span class="post-time">${date}</span>
        </div>
        <a href="#" class="author-link"><img src=${author.photo || "img/avatar.jpeg"} alt="avatar" class="author-avatar"></a>
      </div>
    </div>
  </section>
    `; 
  });

  postsWrapper.innerHTML = postsHTML;

  addPostElem.classList.remove('visible');
  postsWrapper.classList.add('visible');
}

const showAddPost = () => {
  addPostElem.classList.add('visible');
  postsWrapper.classList.remove('visible');
}

const init = () => { 
  menuToggle.addEventListener('click', function (event) {
    event.preventDefault();
    menu.classList.toggle('visible');
  });

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    setUsers.logIn(emailInput.value, passwordInput.value, toggleAuthDom);
    loginForm.reset();
  });
  
  loginSignup.addEventListener('click', (event) => {
    event.preventDefault();
    setUsers.signUp(emailInput.value, passwordInput.value, toggleAuthDom);
    loginForm.reset();
  });
  
  exitElem.addEventListener('click', (event) => {
    event.preventDefault();
    setUsers.logOut(toggleAuthDom);
  });
  
  editElem.addEventListener('click', (event) => {
    event.preventDefault();
    editContainer.classList.toggle('visible');
    editUsername.value = setUsers.user.displayName;
  });
  
  editContainer.addEventListener('submit', (event) => {
    event.preventDefault();
    setUsers.editUser(editUsername.value, editPhotoURL.value, toggleAuthDom);
    editContainer.classList.remove('visible');
  });

  buttonNewPost.addEventListener('click', (event) => {
    event.preventDefault();
    showAddPost();
  });

  loginForget.addEventListener('click', event => {
    event.preventDefault();
    setUsers.sendForget(emailInput.value);
    emailInput.value = '';
  }) 

  addPostElem.addEventListener('submit', (event) => {
    event.preventDefault();
    const { title, text, tags } = addPostElem.elements;

    if (title.value.length < 6) {
      alert ('Too short');
      return;
    }
    if (text.value.length < 50) {
      alert ('Too short');
      return;
    }

    setPosts.addPost(title.value, text.value, tags.value, showAllPosts);

    addPostElem.classList.remove('visible');
    addPostElem.reset();
  });

  setUsers.initUser(toggleAuthDom);
  setPosts.getPosts(showAllPosts);
}

document.addEventListener('DOMContentLoaded', init);