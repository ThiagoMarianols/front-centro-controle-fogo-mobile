# 🚒 Central Controle Fogo - Mobile App

Aplicativo mobile para gerenciamento de ocorrências de bombeiros com CRUD completo e navegação intuitiva.

## 📱 Características

### ✨ Funcionalidades Principais

- **📋 CRUD de Ocorrências**: Criar, ler, atualizar e deletar ocorrências
- **🔍 Visualização Detalhada**: Veja todos os detalhes de uma ocorrência
- **✅ Completar Ocorrências**: Preencha a segunda parte do atendimento
- **📝 Editar Dados**: Modifique informações da ocorrência
- **🔄 Filtros**: Filtre por status (ativas/inativas)
- **🔄 Sincronização**: Pull-to-refresh para atualizar dados
- **👤 Perfil do Usuário**: Veja seus dados pessoais e funcionais
- **🔐 Autenticação**: Login seguro com token JWT

### 🎨 Interface

- **Bottom-Tabs Navigation**: Navegação similar ao Instagram/WhatsApp
- **3 Abas Principais**:
  - 📄 **Ocorrências**: Gerenciar ocorrências
  - 🏠 **Home**: Informações pessoais
  - 👤 **Perfil**: Dados completos do usuário
- **Design Moderno**: Cores consistentes e interface intuitiva
- **Loading States**: Indicadores de carregamento
- **Error Handling**: Mensagens de erro claras

## 🛠️ Tecnologias

- **React Native** - Framework mobile
- **Expo** - Plataforma de desenvolvimento
- **TypeScript** - Tipagem estática
- **React Navigation** - Navegação
- **Axios** - Cliente HTTP
- **React Native Toast Message** - Notificações

## 📦 Instalação

### Pré-requisitos

- Node.js 16+
- npm ou yarn
- Expo CLI (opcional)

### Passos

1. **Clone o repositório**
```bash
cd mobile-central-controle-fogo
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
# Edite .env com suas configurações
```

4. **Inicie o app**
```bash
npm start
```

5. **Escolha a plataforma**
- `a` para Android
- `i` para iOS
- `w` para Web

## 🚀 Uso Rápido

### Login
1. Abra o app
2. Insira suas credenciais
3. Clique em "Entrar"

### Gerenciar Ocorrências
1. Clique na aba **Ocorrências**
2. Veja a lista de ocorrências
3. Use os filtros para ativas/inativas
4. Clique em uma ocorrência para ver detalhes

### Completar Ocorrência
1. Clique em **Completar** em uma ocorrência
2. Preencha os campos obrigatórios:
   - Detalhes do atendimento
   - Horário de chegada (YYYY-MM-DD HH:MM)
   - Latitude e Longitude
   - Militares envolvidos
   - Status
3. Clique em **Completar Ocorrência**

### Editar Ocorrência
1. Clique em **Editar** em uma ocorrência
2. Modifique os dados
3. Clique em **Atualizar Ocorrência**

### Ver Perfil
1. Clique na aba **Perfil**
2. Veja seus dados pessoais e funcionais
3. Clique em **Sair** para fazer logout

## 📁 Estrutura do Projeto

```
src/
├── screens/
│   ├── LoginScreen.tsx
│   ├── HomeScreen.tsx (Perfil)
│   ├── SimpleHomeScreen.tsx (Home)
│   ├── OccurrenceListScreen.tsx
│   ├── OccurrenceDetailScreen.tsx
│   ├── CompleteOccurrenceScreen.tsx
│   └── UpdateOccurrenceScreen.tsx
├── services/
│   ├── auth.service.ts
│   ├── api.service.ts
│   ├── storage.service.ts
│   └── occurrence.service.ts
├── types/
│   ├── auth.types.ts
│   └── occurrence.types.ts
├── styles/
│   ├── HomeScreen.styles.ts
│   ├── LoginScreen.styles.ts
│   ├── OccurrenceList.styles.ts
│   ├── OccurrenceDetail.styles.ts
│   └── CompleteOccurrence.styles.ts
├── navigation/
│   ├── AppNavigator.tsx
│   └── types.ts
├── contexts/
│   └── AuthContext.tsx
└── config/
    └── api.config.ts
```

## 🔌 API Endpoints

### Ocorrências
- `GET /occurrences/paginator` - Lista ocorrências
- `GET /occurrences/{id}` - Detalhes da ocorrência
- `POST /occurrences/register` - Criar ocorrência
- `PATCH /occurrences/complement` - Completar ocorrência
- `PUT /occurrences/{id}` - Atualizar ocorrência
- `PATCH /occurrences/deactivate/{id}` - Desativar
- `PATCH /occurrences/activate/{id}` - Ativar

### Autenticação
- `POST /auth/login` - Login
- `POST /auth/refresh-token` - Renovar token
- `GET /auth/user` - Dados do usuário
- `GET /auth/paginator` - Lista de usuários

## 🎨 Cores e Temas

| Cor | Código | Uso |
|-----|--------|-----|
| Fundo | #0A0E27 | Fundo principal |
| Cards | #1a1f3a | Seções e cards |
| Bordas | #2a2f4a | Divisores |
| Texto | #fff | Texto principal |
| Secundário | #999 | Texto secundário |
| Destaque | #FF6B35 | Botões e ações |
| Sucesso | #4CAF50 | Ações bem-sucedidas |
| Erro | #FF6B6B | Erros |

## 📝 Campos Obrigatórios

### Completar Ocorrência
- ✓ Detalhes da ocorrência
- ✓ Horário de chegada
- ✓ Latitude
- ✓ Longitude
- ✓ Militares envolvidos
- ✓ Status

### Editar Ocorrência
- ✓ Nome do solicitante
- ✓ Telefone
- ✓ Rua
- ✓ Número
- ✓ Bairro
- ✓ Cidade
- ✓ CEP

## 🔐 Segurança

- ✅ Autenticação JWT
- ✅ Token refresh automático
- ✅ Armazenamento seguro de credenciais
- ✅ Validação de entrada
- ✅ HTTPS para requisições

## 🐛 Troubleshooting

### "Ocorrências não carregam"
- Verifique a conexão com a internet
- Verifique se está autenticado
- Tente fazer pull-to-refresh

### "Erro ao completar ocorrência"
- Verifique se todos os campos estão preenchidos
- Verifique o formato da data (YYYY-MM-DD HH:MM)
- Verifique se latitude e longitude são números válidos

### "Abas não aparecem"
- Verifique se fez login
- Reinicie o app
- Verifique se as dependências foram instaladas

### "Erro de módulo não encontrado"
```bash
npm install
```

## 📚 Documentação

- `QUICK_START.md` - Guia rápido
- `IMPLEMENTATION_NOTES.md` - Documentação técnica
- `CHANGES_SUMMARY.md` - Resumo de mudanças
- `STRUCTURE.md` - Estrutura de arquivos
- `VERIFICATION_CHECKLIST.md` - Checklist de verificação

## 🤝 Contribuindo

1. Crie uma branch para sua feature
2. Commit suas mudanças
3. Push para a branch
4. Abra um Pull Request

## 📄 Licença

Este projeto é propriedade da Central de Controle de Fogo.

## 📞 Suporte

Para dúvidas ou problemas, consulte a documentação ou entre em contato com o time de desenvolvimento.

---

**Versão**: 1.0.0  
**Última Atualização**: 2024  
**Status**: ✅ Pronto para Produção
