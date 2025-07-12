import axios from "axios";

const flaskaxiosInstance=axios.create();
flaskaxiosInstance.defaults.baseURL=import.meta.env.VITE_BACKEND_URL_FLASK;
flaskaxiosInstance.defaults.withCredentials=true;

export default flaskaxiosInstance;