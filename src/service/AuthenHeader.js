export default function authHeader() {
    let users = JSON.parse(localStorage.getItem('accessToken'));
  
    if (users) {
      return { Authorization: 'Bearer ' + users };
    } else {
      return {};
    }
  }