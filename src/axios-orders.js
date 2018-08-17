import axios from 'axios';

//didn't set this url as global default, because later in the course we will also define some different
//url for Authentication functionality as well.
//and to set it globally, we could set it into index.js file
const instance = axios.create({
    baseURL : 'https://react-my-burger-2ff45.firebaseio.com'
})

export default instance;