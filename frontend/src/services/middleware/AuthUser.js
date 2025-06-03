export default {
    authUser(to, from, next) {
        const token = localStorage.getItem('token'); 
        
        if (!token) {
            console.log('Token não encontrado:', token); // Verificar se o token está undefined
            next('/login/'); // Redirecionar para login
        } else {
            console.log('Token encontrado:', token); // Token encontrado, pode prosseguir
            next(); // Permitir navegação
        }
    }
}
