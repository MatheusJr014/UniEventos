import { jwtDecode } from 'jwt-decode';

export default {
  authAdmin(to, from, next) {
    const token = localStorage.getItem('token');

    if (!token) {
      console.warn('Token não encontrado');
      return next('/login');
    }

    try {
      const decoded = jwtDecode(token);
      console.log('Token decodificado:', decoded);

      if (decoded.tipo === true) {
        return next(); // Admin: pode acessar
      } else if (decoded.tipo === false) {
        console.warn('Usuário comum tentando acessar rota de admin');
        return next('/perfil'); // Redireciona usuário comum
      } else {
        console.warn('Campo tipo indefinido ou inválido');
        return next('/');
      }
    } catch (err) {
      console.error('Erro ao decodificar token:', err);
      return next('/login'); // Token inválido
    }
  },

  authUser(to, from, next) {
    const token = localStorage.getItem('token');

    if (!token) {
      console.warn('Token não encontrado');
      return next('/login');
    }

    try {
      const decoded = jwtDecode(token);
      if (decoded.tipo === false) {
        return next(); // Usuário comum: pode acessar
      } else if (decoded.tipo === true) {
        return next('/admin'); // Redireciona admin para sua rota
      } else {
        return next('/');
      }
    } catch (err) {
      console.error('Erro ao decodificar token:', err);
      return next('/login');
    }
  }
}
