document.getElementById('form-login').addEventListener('submit', function(event) {
    event.preventDefault();  // Impede o envio do formulário (comportamento padrão)
    
    console.log('Formulário enviado');  // Depuração
    
    // Usuário e senha "pré-definidos" (para fins de exemplo)
    const validUsername = "admin";
    const validPassword = "senha123";

    // Obtendo os valores inseridos no formulário
    const username = document.getElementById('usuario').value;
    const password = document.getElementById('senha').value;

    console.log(`Usuário: ${username}, Senha: ${password}`);  // Depuração

    // Verificando se as credenciais estão corretas
    if (username === validUsername && password === validPassword) {
        alert('Login bem-sucedido!');
        window.location.href = "Home.html";  // Redireciona para a página inicial (home.html)
    } else {
        // Exibindo mensagem de erro se as credenciais estiverem incorretas
        document.getElementById('error-message').style.display = 'block';
    }
});
