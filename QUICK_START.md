# Quick Start - CRUD de Ocorrências Mobile

## 🚀 Início Rápido

### 1. Instalar Dependências
```bash
cd mobile-central-controle-fogo
npm install
```

### 2. Executar o App
```bash
npm start
```

Escolha a plataforma:
- `a` para Android
- `i` para iOS
- `w` para Web

## 📱 Navegação

O app possui 3 abas principais na parte inferior:

### 1️⃣ **Ocorrências** (Aba Esquerda)
Lista todas as ocorrências com opções de filtro e ação.

**O que você pode fazer:**
- 📋 Ver lista de ocorrências
- 🔄 Filtrar por ativas/inativas
- 👆 Puxar para baixo para atualizar
- 👁️ Clicar em "Visualizar" para ver detalhes
- ✅ Clicar em "Completar" para preencher segunda parte
- ✏️ Clicar em "Editar" para modificar dados

### 2️⃣ **Home** (Aba Centro)
Tela inicial com informações do usuário.

**O que você vê:**
- 👤 Seu nome e patente
- 📧 Email e telefone
- 🏢 Batalhão
- ℹ️ Guia de navegação

### 3️⃣ **Perfil** (Aba Direita)
Perfil completo com todos os dados.

**O que você vê:**
- 👤 Informações pessoais completas
- 💼 Dados funcionais
- 🔐 Status de autenticação
- 🚪 Botão de logout

## 📋 Fluxo de Ocorrências

### Visualizar Ocorrência
```
Ocorrências → Clique na ocorrência → Detalhes
```

Você verá:
- ID e data da ocorrência
- Solicitante e telefone
- Tipo e se tem vítimas
- Endereço completo
- Detalhes do atendimento (se houver)

### Completar Ocorrência
```
Ocorrências → Clique em "Completar" → Preencha o formulário
```

Campos obrigatórios:
- ✏️ Detalhes do atendimento
- 📅 Horário de chegada (formato: YYYY-MM-DD HH:MM)
- 📍 Latitude (ex: -8.0476)
- 📍 Longitude (ex: -34.8770)
- 👥 Selecione militares envolvidos
- 🏷️ Selecione o status

Exemplo de data/hora: `2024-01-15 14:30`

### Editar Ocorrência
```
Ocorrências → Clique em "Editar" → Modifique os dados
```

Você pode editar:
- 👤 Nome do solicitante
- 📞 Telefone
- 🏠 Endereço (rua, número, bairro, cidade, CEP)
- 📝 Descrição

## 🎨 Cores e Ícones

### Cores
- 🟠 **Laranja (#FF6B35)**: Destaque e ações principais
- ⚫ **Escuro (#0A0E27)**: Fundo
- ⚪ **Branco (#fff)**: Texto principal
- 🔘 **Cinza (#999)**: Texto secundário

### Ícones das Abas
- 📄 **Ocorrências**: Documento
- 🏠 **Home**: Casa
- 👤 **Perfil**: Pessoa

## 💡 Dicas Úteis

### Filtrar Ocorrências
Na aba Ocorrências, use os botões no topo:
- **Ativas**: Mostra ocorrências em andamento
- **Inativas**: Mostra ocorrências finalizadas

### Atualizar Lista
Puxe a lista de ocorrências para baixo (pull-to-refresh)

### Validação de Formulários
Todos os campos obrigatórios devem ser preenchidos:
- ❌ Não pode deixar em branco
- ❌ Datas devem estar no formato correto
- ❌ Coordenadas devem ser números válidos

### Mensagens de Feedback
- ✅ **Verde**: Ação realizada com sucesso
- ❌ **Vermelho**: Erro na operação
- ⚠️ **Amarelo**: Aviso ou informação

## 🔍 Troubleshooting

### "Ocorrências não carregam"
1. Verifique sua conexão com a internet
2. Verifique se está autenticado
3. Tente fazer pull-to-refresh

### "Erro ao completar ocorrência"
1. Verifique se todos os campos estão preenchidos
2. Verifique o formato da data (YYYY-MM-DD HH:MM)
3. Verifique se latitude e longitude são números válidos

### "Abas não aparecem"
1. Verifique se fez login
2. Reinicie o app
3. Verifique se as dependências foram instaladas

### "Erro de módulo não encontrado"
```bash
npm install
```

## 📞 Campos Obrigatórios

### Para Completar Ocorrência
- [ ] Detalhes da ocorrência
- [ ] Horário de chegada
- [ ] Latitude
- [ ] Longitude
- [ ] Militares envolvidos
- [ ] Status

### Para Editar Ocorrência
- [ ] Nome do solicitante
- [ ] Telefone
- [ ] Rua
- [ ] Número
- [ ] Bairro
- [ ] Cidade
- [ ] CEP

## 🎯 Casos de Uso Comuns

### Caso 1: Registrar Atendimento
1. Vá para Ocorrências
2. Clique em "Completar"
3. Preencha todos os campos
4. Clique em "Completar Ocorrência"

### Caso 2: Corrigir Dados
1. Vá para Ocorrências
2. Clique em "Editar"
3. Modifique os dados
4. Clique em "Atualizar Ocorrência"

### Caso 3: Consultar Perfil
1. Clique na aba "Perfil"
2. Veja todos os seus dados
3. Clique em "Sair" para fazer logout

## 📊 Estrutura de Dados

### Ocorrência
```
ID: 123
Solicitante: João Silva
Telefone: (11) 99999-9999
Tipo: Incêndio
Status: Em Atendimento
Data: 15/01/2024
Endereço: Rua Principal, 100, Centro, São Paulo
```

### Usuário
```
Nome: João Silva
Email: joao@email.com
Telefone: (11) 99999-9999
Patente: Soldado
Batalhão: 1º Batalhão
Status: Ativo
```

## ⚙️ Configurações

Não há configurações adicionais necessárias. O app funciona com:
- Autenticação automática
- Token refresh automático
- Sincronização com API

## 🔐 Segurança

- ✅ Token armazenado de forma segura
- ✅ Logout automático em caso de expiração
- ✅ Validação de entrada
- ✅ HTTPS para todas as requisições

## 📚 Documentação Completa

Para mais detalhes, consulte:
- `IMPLEMENTATION_NOTES.md` - Documentação técnica
- `CHANGES_SUMMARY.md` - Resumo de mudanças
- `STRUCTURE.md` - Estrutura de arquivos

## 🆘 Precisa de Ajuda?

1. Verifique os logs do console
2. Consulte a documentação
3. Verifique a conexão com a API
4. Tente reinstalar as dependências

---

**Versão**: 1.0.0  
**Última atualização**: 2024  
**Status**: ✅ Pronto para uso
