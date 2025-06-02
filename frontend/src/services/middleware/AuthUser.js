export default {
    authUser(to, from, next) {
        const usertoken = localStorage.getItem('usertoken'); 
        
        if (!usertoken) {
            console.log('Token não encontrado:', usertoken); // Verificar se o token está undefined
            next('/login/professor'); // Redirecionar para login
        } else {
            console.log('Token encontrado:', usertoken); // Token encontrado, pode prosseguir
            next(); // Permitir navegação
        }
    }
}
