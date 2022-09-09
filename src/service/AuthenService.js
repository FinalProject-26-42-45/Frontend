import axios from 'axios';

class AuthenService {
  login(users) {

    const data = JSON.parse(JSON.stringify({
        "Username": users.username,
        "Password": users.password
    }));
    // return axios.post("https://foodrand.hopto.org/backend/auth/login", data)
    return axios.post("http://localhost:3000/auth/login", data)
        .then(response => {
            if (response.data.accessToken) {
                localStorage.setItem('accessToken', JSON.stringify(response.data.accessToken));
                localStorage.setItem('role', JSON.stringify(response.data.RoleId));
                
            }
            return response.data;
        });
}

logout() {
    localStorage.removeItem('accessToken');
}

register(users) {
    const data = JSON.parse(JSON.stringify({
      "Firstname": users.firstname,
      "Lastname": users.lastname,
      "Username": users.username,
      "Password": users.password,
      "DOB": users.birth,
      "Gender": users.gender,
      "Email": users.email,
      "Tel": users.tel,
      "FoodAllergens": users.foodallergens,
      "Religion": users.religion,
    }));
    // return axios.post("https://foodrand.hopto.org/backend/auth/signup", data)
    return axios.post("http://localhost:3000/auth/register", data)
    }


}

export default new AuthenService();