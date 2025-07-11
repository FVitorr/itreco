import api from './api';
import {toast} from 'react-toastify';

export function ErrorInterceptor() {
    api.interceptors.response.use(
        (response) => response,
        (error) => {
            const message =
                error.response?.data?.message ||
                error.message ||
                'Erro inesperado ao processar a requisição';

            toast.error(message);
            return Promise.reject(error);
        }
    );
}
