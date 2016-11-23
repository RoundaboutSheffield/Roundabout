/* eslint-disable no-unused-vars, no-alert, object-shorthand */
function getUser() {
  return dpd.users.me();
}

function redirectUser(user) {
  if (user.isAdmin) {
    location.pathname = '/app.html';
  } else if (user) {
    location.pathname = '/user.html';
  }
}

function redirectIfNotAdminUser(user) {
  if (!user) {
    location.pathname = '/';
  } else if (!user.isAdmin) {
    location.pathname = '/user.html';
  }
}

function redirectIfNotTenantUser(user) {
  if (!user) {
    location.pathname = '/';
  } else if (user.isAdmin) {
    location.pathname = '/app.html';
  }
}

function alertError(error) {
  alert(error.message);
}

function loginUser(username, password) {
  const credentials = {
    username: username,
    password: password,
  };

  dpd.users
  .login(credentials)
  .then(getUser)
  .then(redirectUser)
  .fail(alertError);
}
