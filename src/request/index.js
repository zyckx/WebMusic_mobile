import axios from "axios";
let service=axios.create({
    baseURL:'/api',
    timeout:3000
})
export default  service
