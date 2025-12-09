# Formatação de Dados Sensíveis - Telefone, CEP e CPF

## Resumo das Mudanças

Este documento descreve as alterações realizadas para aplicar máscaras de formatação em todos os campos de telefone, CEP e CPF exibidos na aplicação.

## Arquivos Criados

### `src/utils/format.ts`
Novo arquivo com funções de formatação reutilizáveis:

- **`formatPhone(phone: string): string`**
  - Formata números de telefone para o padrão brasileiro
  - Entrada: `"11999999999"` ou `"11 99999999"`
  - Saída: `"(11) 99999-9999"` (celular) ou `"(11) 9999-9999"` (fixo)

- **`formatZipCode(zipCode: string): string`**
  - Formata CEP para o padrão brasileiro
  - Entrada: `"12345678"`
  - Saída: `"12345-678"`

- **`formatCPF(cpf: string): string`**
  - Formata CPF para o padrão brasileiro
  - Entrada: `"12345678901"`
  - Saída: `"123.456.789-01"`

- **`removeFormatting(value: string): string`**
  - Remove toda formatação de um valor
  - Útil para enviar dados ao servidor sem formatação

## Arquivos Modificados

### 1. `src/screens/UserScreen.tsx`
**Alterações:**
- Importado `formatPhone` e `formatCPF` de `../utils/format`
- Linha 76: Telefone agora exibido com formatação: `formatPhone(userData?.phoneNumber || '')`
- Linha 77: CPF agora exibido com formatação: `formatCPF(userData?.cpf || '')`

**Impacto:** Dados pessoais do usuário exibidos com máscaras adequadas

---

### 2. `src/screens/OccurrenceDetailScreen.tsx`
**Alterações:**
- Importado `formatPhone` e `formatZipCode` de `../utils/format`
- Linha 127: Telefone do solicitante formatado: `formatPhone(occurrence.occurrenceRequesterPhoneNumber || '')`
- Linha 170: CEP formatado: `formatZipCode(occurrence.zipCode || '')`

**Impacto:** Detalhes de ocorrência exibem telefone e CEP com máscaras

---

### 3. `src/screens/OccurrenceListScreen.tsx`
**Alterações:**
- Importado `formatPhone` e `removeFormatting` de `../utils/format`
- Linha 137: Telefone na lista formatado: `formatPhone(item.occurrenceRequesterPhoneNumber || '')`
- Linhas 99-109: Melhorado filtro de busca para funcionar com números formatados e não formatados
  - Busca agora remove formatação para comparação mais precisa
  - Usuário pode buscar por `11999999999` ou `(11) 99999-9999` e encontrar o resultado

**Impacto:** Lista de ocorrências exibe telefones formatados e busca funciona melhor

---

### 4. `src/screens/UpdateOccurrenceScreen.tsx`
**Alterações:**
- Importado `formatPhone`, `formatZipCode` e `removeFormatting` de `../utils/format`
- Linha 199: Campo de telefone aplica formatação em tempo real: `onChangeText={(text) => setRequesterPhone(formatPhone(text))}`
- Linha 276: Campo de CEP aplica formatação em tempo real: `onChangeText={(text) => setZipCode(formatZipCode(text))}`
- Linha 104: Telefone enviado ao servidor sem formatação: `removeFormatting(requesterPhone)`
- Linha 107: CEP enviado ao servidor sem formatação: `removeFormatting(zipCode)`

**Impacto:** Formulário de atualização exibe dados formatados mas envia dados limpos ao servidor

---

## Padrões de Formatação

### Telefone (Brasil)
- **Celular (11 dígitos):** `(XX) 9XXXX-XXXX`
  - Exemplo: `(11) 99999-9999`
- **Fixo (10 dígitos):** `(XX) XXXX-XXXX`
  - Exemplo: `(11) 3333-3333`

### CEP (Brasil)
- **Formato:** `XXXXX-XXX`
- Exemplo: `12345-678`

### CPF (Brasil)
- **Formato:** `XXX.XXX.XXX-XX`
- Exemplo: `123.456.789-01`

## Comportamento da Aplicação

### Exibição
- Todos os campos de telefone, CEP e CPF são exibidos com máscaras
- Melhora a legibilidade e profissionalismo da interface

### Entrada de Dados
- Campos de entrada aplicam formatação em tempo real
- Usuário vê a máscara enquanto digita
- Dados são enviados ao servidor sem formatação

### Busca
- Busca funciona com números formatados e não formatados
- Exemplo: Buscar por `11999999999` ou `(11) 99999-9999` retorna os mesmos resultados

## Testes Recomendados

1. **UserScreen:** Verificar se telefone e CPF aparecem formatados
2. **OccurrenceDetailScreen:** Verificar se telefone e CEP aparecem formatados
3. **OccurrenceListScreen:** 
   - Verificar se telefones aparecem formatados
   - Testar busca com números formatados e não formatados
4. **UpdateOccurrenceScreen:**
   - Verificar se formatação é aplicada em tempo real
   - Verificar se dados são salvos corretamente no servidor

## Notas Importantes

- As funções de formatação tratam valores vazios retornando `'-'`
- As funções removem caracteres não numéricos antes de processar
- A formatação é aplicada apenas na exibição/entrada, não afeta dados armazenados
- O servidor recebe dados sem formatação (apenas números)
