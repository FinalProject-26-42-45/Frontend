import axios from "axios";

export default axios.create({
      baseURL: "http://localhost:3000",
    // baseURL: "https://foodrand.hopto.org/backend",
     
     headers: {
        "Content-type": "application/json",
    }
});