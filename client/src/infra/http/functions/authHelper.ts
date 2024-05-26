import { useNavigate } from 'react-router-dom';

export function handleUnauthorizedError(error: any) {
    const navigate = useNavigate(); 
    if (error.response && error.response.status === 401) {
        localStorage.removeItem('jwt');
        navigate('/login');
    }
    return Promise.reject(error);
}