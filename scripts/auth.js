// listen for auth status changes

auth.onAuthStateChanged((user) => {
  if (user) {
    console.log('user logged in:', user);
    db.collection('guides')
      .get()
      .then((snapshot) => {
        setupGuides(snapshot.docs);
        setupUI(user);
      });
  } else {
    setupUI();
    setupGuides([]);
  }
});

// create new guide
const createForm = document.querySelector('#create-form');

createForm.addEventListener('submit', (e) => {
  e.preventDefault();
  db.collection('guides')
    .add({
      title: createForm['title'].value,
      giude: createForm['content'].value,
    })
    .then(() => {
      const modal = document.querySelector('#modal-create');
      M.Modal.getInstance(modal).close();
      createForm.reset();
    })
    .catch((err) => console.log(err));
});

//signup
const signupForm = document.querySelector('#signup-form');
const logout = document.querySelector('#logout');
const loginForm = document.querySelector('#login-form');

signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;

  // create user
  auth.createUserWithEmailAndPassword(email, password).then((credential) => {
    const modal = document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    signupForm.reset();
  });
});

//logout
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut().then(() => {});
});

//login
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  auth.signInWithEmailAndPassword(email, password).then((credential) => {
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
  });
});
