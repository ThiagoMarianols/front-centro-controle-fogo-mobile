/**
 * Formata um número de telefone para o padrão brasileiro
 * Entrada: "11999999999" ou "11 99999999"
 * Saída: "(11) 99999-9999"
 */
export const formatPhone = (phone: string): string => {
  if (!phone) return '-';
  
  // Remove tudo que não é número
  const cleaned = phone.replace(/\D/g, '');
  
  // Se tiver menos de 10 dígitos, retorna como está
  if (cleaned.length < 10) return phone;
  
  // Pega apenas os últimos 11 dígitos (ou 10 se for fixo)
  const digits = cleaned.slice(-11);
  
  if (digits.length === 11) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  } else if (digits.length === 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  
  return phone;
};


export const formatZipCode = (zipCode: string): string => {
  if (!zipCode) return '-';
  
  // Remove tudo que não é número
  const cleaned = zipCode.replace(/\D/g, '');
  
  // Se tiver menos de 8 dígitos, retorna como está
  if (cleaned.length < 8) return zipCode;
  
  // Pega apenas os 8 primeiros dígitos
  const digits = cleaned.slice(0, 8);
  
  // Formata como XXXXX-XXX
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
};

/**
 * Formata um CPF para o padrão brasileiro
 * Entrada: "12345678901"
 * Saída: "123.456.789-01"
 */
export const formatCPF = (cpf: string): string => {
  if (!cpf) return '-';
  
  // Remove tudo que não é número
  const cleaned = cpf.replace(/\D/g, '');
  
  // Se tiver menos de 11 dígitos, retorna como está
  if (cleaned.length < 11) return cpf;
  
  // Pega apenas os 11 primeiros dígitos
  const digits = cleaned.slice(0, 11);
  
  // Formata como XXX.XXX.XXX-XX
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
};

/**
 * Remove a formatação de um valor
 * Entrada: "(11) 99999-9999" ou "12345-678" ou "123.456.789-01"
 * Saída: "11999999999" ou "12345678" ou "12345678901"
 */
export const removeFormatting = (value: string): string => {
  if (!value) return '';
  return value.replace(/\D/g, '');
};
