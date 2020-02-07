import axios from 'axios';
const BASE_URL = "http://localhost:5000/api/";

class ShoppingCartService {
  constructor() { }

  /*
  * @params - endpoint <String>, data <Object>
  * @returns - async response<Object>
  */
  postData(endpoint, data){
    let url = BASE_URL + endpoint;
    return axios.post(url, data);
  }

  /*
  * @params - endpoint <String>
  * @returns - async response<Object>
  */
  getData(endpoint){
    let url = BASE_URL + endpoint;
    return axios.get(url);
  }

  /*
  * @params - endpoint <String>, data <Object>
  * @returns - async response<Object>
  */
  putData(endpoint, data){
    let url = BASE_URL + endpoint;
    return (
      axios.put(url, data)
        .then((response => {
          console.log(response);
          return response.data;
        }))
        .catch((err) => {
          console.log(err);
        })
    );
  }
}

export default ShoppingCartService;
