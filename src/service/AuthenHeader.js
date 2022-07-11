export default function authHeader() {
    let users = JSON.parse(localStorage.getItem('users'));
  
    if (users && users.accessToken) {
      return { Authorization: 'Bearer ' + users.accessToken };
    } else {
      return {};
    }
  }