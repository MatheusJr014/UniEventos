
export function validateNome(nome) {
    const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/; 
    if (!nome ){
        return "Nome é obrigatorio. "; 

    } else if (!regex.test(nome)){
        return "O nome deve conter apenas letras e espaços"
    } else if (nome.length > 100 ){
        return "O nome deve ter menos de 100 caracteres"; 
    }
    return null; 
}


export function validateEmail(email){
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 

    if(!regex.test(email)){
        return "Email Invalido. Verefique o Formato"; 
    }else if (!email){
        return "Email é um campo obrigatorio. "; 
    }
    return; 
}   

export function validateCPF(cpf) {
  // Garante que cpf é string e remove espaços extras
  if (!cpf) {
    return 'CPF é um campo obrigatório.';
  }

  cpf = String(cpf).trim().replace(/[^\d]+/g, '');

  // Verifica se o CPF tem 11 dígitos ou é inválido
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
    return 'CPF inválido. Verifique o formato.';
  }

  // Validação do primeiro dígito verificador
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(9))) {
    return 'CPF inválido. Verifique os dígitos.';
  }

  // Validação do segundo dígito verificador
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(10))) {
    return 'CPF inválido. Verifique os dígitos.';
  }

  return ''; // CPF válido
}



export function validateSenha(senha, confirmPassword) {
    const regras = [
        { regex: /[A-Z]/, mensagem: "A senha deve conter pelo menos uma letra maiúscula." },
        { regex: /[a-z]/, mensagem: "A senha deve conter pelo menos uma letra minúscula." },
        { regex: /[0-9]/, mensagem: "A senha deve conter pelo menos um número." },
        { regex: /[\@\#\!\$%\^\&\*\(\)\_\+\-\=\[\]\{\}\;\:\"\<\>\,\.\?\/\~\`\|\\]/, mensagem: "A senha deve conter pelo menos um caractere especial." }
    ];

    if (!senha) {
        return "Senha é um campo obrigatório.";
    }

    if (senha.length < 8) {
        return "A senha deve ter no mínimo 8 caracteres.";
    }

    for (let regra of regras) {
        if (!regra.regex.test(senha)) {
            return regra.mensagem;
        }
    }

    return;
}


export function validateConfirmPassword(senha, confirmPassword){
    if(!confirmPassword){
        return "Repetir senha é um campo obrigatorio. "; 
    }else if (confirmPassword !== senha){
        return "Senhas divergentes"; 
    }
    return ; 
}
