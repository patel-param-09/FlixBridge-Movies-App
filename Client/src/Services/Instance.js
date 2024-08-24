import axios from 'axios';
import {useNavigate} from 'react-router-dom'

const fetchClient = () => {
  const navigate = useNavigate();

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
  });

  axiosInstance.interceptors.response.use(
    response => response,
    error => {
      if (error.response && error.response.status === 401) {
        // Redirect to /login if unauthorized
        navigate('/login');
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default fetchClient