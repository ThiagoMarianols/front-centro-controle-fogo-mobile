export const validateEmail = (email: string): { isValid: boolean; message: string } => {
  if (!email || email.trim() === '') {
    return { isValid: false, message: 'E-mail é obrigatório' };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, message: 'E-mail inválido' };
  }
  
  return { isValid: true, message: '' };
};

export const validatePassword = (password: string): { isValid: boolean; message: string } => {
  if (!password || password.trim() === '') {
    return { isValid: false, message: 'Senha é obrigatória' };
  }
  
  if (password.length < 6) {
    return { isValid: false, message: 'Senha deve ter no mínimo 6 caracteres' };
  }
  
  return { isValid: true, message: '' };
};

export const getErrorMessage = (error: any): string => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  
  if (error.response?.status === 401) {
    return 'E-mail ou senha incorretos';
  }
  
  if (error.response?.status === 404) {
    return 'Usuário não encontrado';
  }
  
  if (error.response?.status === 403) {
    return 'Acesso negado';
  }
  
  if (error.response?.status === 500) {
    return 'Erro no servidor. Tente novamente mais tarde';
  }
  
  if (error.message && error.message.includes('Network')) {
    return 'Erro de conexão. Verifique sua internet';
  }
  
  if (error.message) {
    return error.message;
  }
  
  return 'Ocorreu um erro inesperado';
};
