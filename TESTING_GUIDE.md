# 🧪 Guia de Testes - CRUD de Ocorrências

## 📋 Testes Manuais

### 1. Autenticação

#### Teste 1.1: Login com Credenciais Válidas
```
Passos:
1. Abra o app
2. Insira email válido
3. Insira senha válida
4. Clique em "Entrar"

Resultado Esperado:
✅ Login bem-sucedido
✅ Redirecionado para home
✅ Bottom-tabs aparecem
```

#### Teste 1.2: Login com Credenciais Inválidas
```
Passos:
1. Abra o app
2. Insira email inválido
3. Insira senha inválida
4. Clique em "Entrar"

Resultado Esperado:
❌ Mensagem de erro
❌ Permanece na tela de login
```

#### Teste 1.3: Logout
```
Passos:
1. Autentique-se
2. Vá para aba Perfil
3. Clique em "Sair"

Resultado Esperado:
✅ Logout bem-sucedido
✅ Redirecionado para login
```

### 2. Lista de Ocorrências

#### Teste 2.1: Carregar Lista
```
Passos:
1. Autentique-se
2. Clique na aba Ocorrências

Resultado Esperado:
✅ Lista carrega
✅ Ocorrências aparecem em cards
✅ Informações visíveis: ID, solicitante, tipo, data
```

#### Teste 2.2: Filtro Ativas
```
Passos:
1. Na aba Ocorrências
2. Clique em "Ativas"

Resultado Esperado:
✅ Lista atualiza
✅ Apenas ocorrências ativas aparecem
```

#### Teste 2.3: Filtro Inativas
```
Passos:
1. Na aba Ocorrências
2. Clique em "Inativas"

Resultado Esperado:
✅ Lista atualiza
✅ Apenas ocorrências inativas aparecem
```

#### Teste 2.4: Pull-to-Refresh
```
Passos:
1. Na aba Ocorrências
2. Puxe a lista para baixo

Resultado Esperado:
✅ Indicador de carregamento aparece
✅ Lista atualiza
✅ Indicador desaparece
```

#### Teste 2.5: Lista Vazia
```
Passos:
1. Filtre por status sem ocorrências

Resultado Esperado:
✅ Mensagem "Nenhuma ocorrência encontrada"
✅ Ícone de documento vazio
```

### 3. Visualizar Ocorrência

#### Teste 3.1: Abrir Detalhes
```
Passos:
1. Na aba Ocorrências
2. Clique em um card de ocorrência

Resultado Esperado:
✅ Tela de detalhes abre
✅ Informações carregam
✅ ID da ocorrência aparece no título
```

#### Teste 3.2: Seções de Informações
```
Passos:
1. Na tela de detalhes
2. Scroll para ver todas as seções

Resultado Esperado:
✅ Seção "Informações Gerais" visível
✅ Seção "Endereço" visível
✅ Seção "Detalhes do Atendimento" visível (se houver)
```

#### Teste 3.3: Botões de Ação
```
Passos:
1. Na tela de detalhes
2. Scroll para o final

Resultado Esperado:
✅ Botão "Completar" visível
✅ Botão "Editar" visível
✅ Botão "Voltar" visível
```

### 4. Completar Ocorrência

#### Teste 4.1: Abrir Formulário
```
Passos:
1. Na tela de detalhes
2. Clique em "Completar"

Resultado Esperado:
✅ Formulário abre
✅ Título mostra "Completar Ocorrência #ID"
✅ Campos aparecem vazios
```

#### Teste 4.2: Validação de Campos Vazios
```
Passos:
1. No formulário de completar
2. Deixe todos os campos vazios
3. Clique em "Completar Ocorrência"

Resultado Esperado:
❌ Mensagem de erro: "Preencha todos os campos obrigatórios"
❌ Formulário não é enviado
```

#### Teste 4.3: Preenchimento Correto
```
Passos:
1. No formulário de completar
2. Preencha:
   - Detalhes: "Atendimento realizado"
   - Data/Hora: "2024-01-15 14:30"
   - Latitude: "-8.0476"
   - Longitude: "-34.8770"
   - Selecione militares
   - Selecione status
3. Clique em "Completar Ocorrência"

Resultado Esperado:
✅ Mensagem de sucesso
✅ Redirecionado para lista
✅ Ocorrência atualizada
```

#### Teste 4.4: Formato de Data Inválido
```
Passos:
1. No formulário de completar
2. Insira data inválida: "15/01/2024"
3. Preencha outros campos
4. Clique em "Completar Ocorrência"

Resultado Esperado:
❌ Erro ao processar data
❌ Mensagem de erro
```

#### Teste 4.5: Seleção de Militares
```
Passos:
1. No formulário de completar
2. Clique em "Militares Envolvidos"
3. Selecione múltiplos militares

Resultado Esperado:
✅ Militares aparecem como tags
✅ Pode desselecionar clicando novamente
```

#### Teste 4.6: Seleção de Status
```
Passos:
1. No formulário de completar
2. Clique em "Status da Ocorrência"
3. Selecione um status

Resultado Esperado:
✅ Status aparece no campo
✅ Pode mudar seleção
```

### 5. Editar Ocorrência

#### Teste 5.1: Abrir Formulário
```
Passos:
1. Na tela de detalhes
2. Clique em "Editar"

Resultado Esperado:
✅ Formulário abre
✅ Campos pré-preenchidos com dados existentes
✅ Título mostra "Atualizar Ocorrência #ID"
```

#### Teste 5.2: Validação de Campos
```
Passos:
1. No formulário de editar
2. Limpe um campo obrigatório
3. Clique em "Atualizar Ocorrência"

Resultado Esperado:
❌ Mensagem de erro
❌ Formulário não é enviado
```

#### Teste 5.3: Atualização Bem-Sucedida
```
Passos:
1. No formulário de editar
2. Modifique o nome do solicitante
3. Clique em "Atualizar Ocorrência"

Resultado Esperado:
✅ Mensagem de sucesso
✅ Redirecionado para lista
✅ Dados atualizados
```

### 6. Tela Home

#### Teste 6.1: Abrir Home
```
Passos:
1. Autentique-se
2. Clique na aba "Home"

Resultado Esperado:
✅ Tela home carrega
✅ Nome do usuário aparece
✅ Patente aparece
```

#### Teste 6.2: Informações Pessoais
```
Passos:
1. Na tela home
2. Scroll para ver seção "Informações Pessoais"

Resultado Esperado:
✅ Usuário visível
✅ Email visível
✅ Telefone visível
✅ CPF visível
```

#### Teste 6.3: Informações Funcionais
```
Passos:
1. Na tela home
2. Scroll para ver seção "Dados Funcionais"

Resultado Esperado:
✅ Patente visível
✅ Batalhão visível
✅ Status visível
```

### 7. Tela Perfil

#### Teste 7.1: Abrir Perfil
```
Passos:
1. Autentique-se
2. Clique na aba "Perfil"

Resultado Esperado:
✅ Tela perfil carrega
✅ Dados completos aparecem
✅ Botão "Sair" visível
```

#### Teste 7.2: Logout do Perfil
```
Passos:
1. Na tela perfil
2. Clique em "Sair"

Resultado Esperado:
✅ Logout bem-sucedido
✅ Redirecionado para login
```

### 8. Navegação

#### Teste 8.1: Bottom-Tabs
```
Passos:
1. Autentique-se
2. Clique em cada aba

Resultado Esperado:
✅ Aba Ocorrências funciona
✅ Aba Home funciona
✅ Aba Perfil funciona
✅ Transições suaves
```

#### Teste 8.2: Navegação Interna
```
Passos:
1. Na aba Ocorrências
2. Clique em uma ocorrência
3. Clique em "Completar"
4. Clique em "Voltar"

Resultado Esperado:
✅ Navegação funciona
✅ Volta para detalhes
✅ Volta para lista
```

#### Teste 8.3: Persistência de Estado
```
Passos:
1. Na aba Ocorrências
2. Filtre por "Inativas"
3. Clique em outra aba
4. Volte para Ocorrências

Resultado Esperado:
✅ Filtro persiste
✅ Lista mantém estado
```

## 🔍 Testes de Validação

### Validação de Email
```
Teste: Email inválido no login
Entrada: "email_invalido"
Resultado: ❌ Erro de validação
```

### Validação de Data
```
Teste: Data em formato errado
Entrada: "15/01/2024" (esperado: "2024-01-15")
Resultado: ❌ Erro de validação
```

### Validação de Coordenadas
```
Teste: Latitude inválida
Entrada: "abc"
Resultado: ❌ Erro de validação

Teste: Latitude válida
Entrada: "-8.0476"
Resultado: ✅ Aceito
```

## 🔄 Testes de Fluxo

### Fluxo Completo: Criar e Completar Ocorrência
```
1. Login
2. Ir para Ocorrências
3. Visualizar ocorrência
4. Completar ocorrência
5. Preencher formulário
6. Enviar
7. Verificar sucesso
8. Voltar para lista
9. Verificar atualização

Resultado Esperado: ✅ Fluxo completo funciona
```

### Fluxo Completo: Editar Ocorrência
```
1. Login
2. Ir para Ocorrências
3. Visualizar ocorrência
4. Editar ocorrência
5. Modificar dados
6. Enviar
7. Verificar sucesso
8. Voltar para lista
9. Verificar atualização

Resultado Esperado: ✅ Fluxo completo funciona
```

## 📊 Testes de Performance

### Teste de Carregamento
```
Métrica: Tempo de carregamento da lista
Esperado: < 2 segundos
```

### Teste de Responsividade
```
Métrica: Tempo de resposta ao clicar
Esperado: < 500ms
```

### Teste de Memória
```
Métrica: Uso de memória
Esperado: < 100MB
```

## 🐛 Testes de Erro

### Sem Conexão
```
Passos:
1. Desative internet
2. Tente carregar ocorrências

Resultado Esperado:
❌ Mensagem de erro de conexão
```

### Token Expirado
```
Passos:
1. Aguarde token expirar
2. Tente fazer uma ação

Resultado Esperado:
❌ Redirecionado para login
```

### Servidor Indisponível
```
Passos:
1. Desligue o servidor
2. Tente fazer uma ação

Resultado Esperado:
❌ Mensagem de erro
```

## ✅ Checklist Final

- [ ] Todos os testes de autenticação passam
- [ ] Todos os testes de lista passam
- [ ] Todos os testes de detalhes passam
- [ ] Todos os testes de completar passam
- [ ] Todos os testes de editar passam
- [ ] Todos os testes de navegação passam
- [ ] Todos os testes de validação passam
- [ ] Todos os testes de fluxo passam
- [ ] App não trava
- [ ] Sem erros no console
- [ ] Mensagens de erro são claras
- [ ] Loading states funcionam
- [ ] Cores estão corretas
- [ ] Fontes estão corretas
- [ ] Ícones aparecem corretamente

## 🎯 Resultado Final

Quando todos os testes passarem:
```
✅ PRONTO PARA PRODUÇÃO
```

---

**Versão**: 1.0.0  
**Data**: 2024  
**Status**: Guia de Testes Completo
