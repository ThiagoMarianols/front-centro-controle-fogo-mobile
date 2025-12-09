# 🚒 Central de Controle de Fogo - App Mobile

Aplicação mobile desenvolvida para o **Corpo de Bombeiros**, permitindo que bombeiros na ponta do atendimento gerenciem ocorrências em tempo real, registrem detalhes de emergências, atualizem status e documentem ações no campo.

## 📋 Visão Geral

Este é um aplicativo mobile multiplataforma (iOS, Android e Web) construído com **React Native** e **Expo**, projetado para ser utilizado por bombeiros durante atendimentos de emergência. O app oferece funcionalidades essenciais como:

- 🔐 Autenticação segura com JWT
- 📱 Gerenciamento de ocorrências em tempo real
- 📍 Integração com GPS para localização
- 📸 Captura de fotos no local da ocorrência
- 👥 Gerenciamento de perfil do usuário
- 🔄 Sincronização automática de dados
- 📡 Armazenamento seguro de credenciais

---

## 🛠️ Stack Tecnológico

### Frontend
- **React Native** (v0.81.5) - Framework para desenvolvimento mobile
- **Expo** (v54.0.26) - Plataforma para desenvolvimento React Native
- **TypeScript** (v5.9.2) - Tipagem estática
- **React Navigation** (v6.x) - Navegação entre telas
  - `@react-navigation/native` - Core de navegação
  - `@react-navigation/native-stack` - Stack navigator
  - `@react-navigation/bottom-tabs` - Bottom tab navigator

### HTTP & Armazenamento
- **Axios** (v1.13.2) - Cliente HTTP com interceptadores
- **AsyncStorage** (v2.2.0) - Armazenamento persistente
- **Expo Secure Store** (v15.0.7) - Armazenamento seguro de tokens

### Recursos Nativos
- **Expo Location** (v17.0.1) - Acesso a GPS e localização
- **Expo Image Picker** (v15.0.5) - Seleção e captura de fotos
- **React Native DateTimePicker** (v8.5.1) - Seletor de data/hora

### UI & Ícones
- **Expo Vector Icons** (v15.0.3) - Biblioteca de ícones (MaterialCommunityIcons)
- **React Native Toast Message** (v2.3.3) - Notificações toast

### Desenvolvimento
- **Babel** - Transpilador JavaScript
- **React Native Dotenv** (v3.4.11) - Variáveis de ambiente

---

## 📁 Estrutura de Arquivos

```
src/
├── components/              # Componentes reutilizáveis
│   └── FirefighterIllustration.tsx
├── config/                  # Configurações da aplicação
│   └── api.config.ts       # Configuração de API e endpoints
├── contexts/                # Context API para estado global
│   └── AuthContext.tsx     # Contexto de autenticação
├── navigation/              # Configuração de navegação
│   ├── AppNavigator.tsx    # Navegador principal
│   └── types.ts            # Tipos de navegação
├── screens/                 # Telas da aplicação
│   ├── LoginScreen.tsx
│   ├── SimpleHomeScreen.tsx
│   ├── UserScreen.tsx
│   ├── OccurrenceListScreen.tsx
│   ├── OccurrenceDetailScreen.tsx
│   ├── CompleteOccurrenceScreen.tsx
│   └── UpdateOccurrenceScreen.tsx
├── services/                # Serviços de API e armazenamento
│   ├── api.service.ts      # Cliente HTTP com interceptadores
│   ├── auth.service.ts     # Autenticação
│   ├── occurrence.service.ts # Gerenciamento de ocorrências
│   └── storage.service.ts  # Armazenamento local
├── styles/                  # Estilos globais
├── types/                   # Tipos TypeScript
│   ├── auth.types.ts       # Tipos de autenticação
│   └── occurrence.types.ts # Tipos de ocorrências
└── utils/                   # Funções utilitárias
```

---

## 🏗️ Padrões de Arquitetura

### 1. **Context API para Estado Global**
- `AuthContext.tsx` gerencia autenticação, tokens e dados do usuário
- Hook customizado `useAuth()` para acessar contexto em qualquer componente

### 2. **Serviços Centralizados**
- **api.service.ts**: Cliente HTTP singleton com:
  - Interceptadores para adicionar token JWT automaticamente
  - Renovação automática de token expirado
  - Fila de requisições durante refresh de token
  - Tratamento centralizado de erros
  
- **auth.service.ts**: Operações de autenticação
  - Login/Logout
  - Armazenamento seguro de tokens
  - Refresh token

- **occurrence.service.ts**: Operações com ocorrências
  - CRUD de ocorrências
  - Paginação
  - Filtros

- **storage.service.ts**: Abstração de armazenamento
  - AsyncStorage para dados públicos
  - Secure Store para tokens

### 3. **Tipagem Forte com TypeScript**
- Tipos definidos em `src/types/`
- Interfaces para requisições e respostas da API
- Tipos de navegação centralizados

### 4. **Navegação Estruturada**
- Stack Navigator para fluxos sequenciais
- Bottom Tab Navigator para navegação principal
- Transições com animação fade

### 5. **Tratamento de Erros**
- Interceptadores Axios para capturar erros
- Alertas nativos para feedback ao usuário
- Toast messages para notificações

---

## 🚀 Como Executar

### Pré-requisitos
- Node.js (v16+)
- npm ou yarn
- Expo CLI: `npm install -g expo-cli`
- Android Studio (para Android) ou Xcode (para iOS)

### Instalação

1. **Clone o repositório**
   ```bash
   git clone <repository-url>
   cd front-centro-controle-fogo-mobile
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configure as variáveis de ambiente**
   ```bash
   cp .env.example .env
   ```
   
   Edite `.env` com suas configurações:
   ```env
   API_URL=http://seu-servidor:8088/api
   ENABLE_OFFLINE_MODE=false
   ENABLE_NOTIFICATIONS=true
   ENABLE_CAMERA=true
   ```

4. **Inicie o servidor de desenvolvimento**
   ```bash
   npm start
   # ou
   yarn start
   ```

### Executar em Diferentes Plataformas

**Android:**
```bash
npm run android
```

**iOS:**
```bash
npm run ios
```

**Web:**
```bash
npm run web
```

---

## 🔐 Autenticação

### Fluxo de Login
1. Usuário insere credenciais (username/password)
2. API retorna `accessToken` e `refreshToken`
3. Tokens são armazenados de forma segura
4. Token é automaticamente adicionado em todas as requisições

### Renovação de Token
- Quando token expira (401), o app automaticamente:
  1. Tenta renovar usando `refreshToken`
  2. Recoloca requisição falhada na fila
  3. Executa requisição com novo token
  4. Se refresh falhar, redireciona para login

### Armazenamento Seguro
- **Tokens**: Armazenados em `Expo Secure Store` (criptografado)
- **Dados do Usuário**: Armazenados em `AsyncStorage`

---

## 📱 Funcionalidades Principais

### 1. **Autenticação**
- Login com credenciais
- Logout com limpeza de dados
- Persistência de sessão
- Renovação automática de token

### 2. **Gerenciamento de Ocorrências**
- Listar ocorrências com paginação
- Visualizar detalhes de ocorrência
- Registrar chegada no local (on-site)
- Atualizar status e informações
- Capturar fotos do local
- Registrar localização GPS

### 3. **Perfil do Usuário**
- Visualizar dados do bombeiro
- Atualizar informações pessoais

### 4. **Home**
- Dashboard com informações rápidas
- Acesso rápido a ocorrências

---

## 🔌 Endpoints da API

### Autenticação
- `POST /auth/login` - Login
- `POST /auth/logout/{id}` - Logout
- `POST /auth/refresh-token` - Renovar token
- `GET /auth` - Dados do usuário autenticado
- `GET /auth/{id}` - Dados de usuário específico

### Ocorrências
- `GET /occurrences` - Listar ocorrências (com paginação)
- `GET /occurrences/{id}` - Detalhes da ocorrência
- `POST /occurrences` - Criar ocorrência
- `PUT /occurrences/{id}` - Atualizar ocorrência
- `POST /occurrences/{id}/on-site` - Registrar chegada no local

---

## 🎨 Tema e Estilos

O app utiliza um tema **dark mode** com cores corporativas:
- **Cor Primária**: `#FF6B35` (Laranja - Bombeiros)
- **Fundo Escuro**: `#0A0E27` e `#1a1f3a`
- **Texto**: Branco (`#fff`) e cinza (`#999`)

Estilos são definidos com `StyleSheet` do React Native e podem ser encontrados em `src/styles/`.

---

## 📚 Documentação Adicional

- [React Native Docs](https://reactnative.dev/)
- [Expo Docs](https://docs.expo.dev/)
- [React Navigation Docs](https://reactnavigation.org/)
- [TypeScript Docs](https://www.typescriptlang.org/)

---

## 📄 Licença

Este projeto é propriedade do Corpo de Bombeiros e é de uso restrito.


