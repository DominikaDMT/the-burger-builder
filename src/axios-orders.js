import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://the-burger-builder-fb05f-default-rtdb.europe-west1.firebasedatabase.app/'
})

export default instance