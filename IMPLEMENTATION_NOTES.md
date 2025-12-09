# Implementação do CRUD de Ocorrências - Mobile

## Resumo das Mudanças

Este documento descreve a implementação do CRUD de ocorrências no aplicativo mobile, com navegação bottom-tabs similar ao Instagram/WhatsApp.

## Estrutura Implementada

### 1. Tipos e Interfaces (`src/types/occurrence.types.ts`)
- `IOccurrenceDTO`: Representa uma ocorrência completa
- `IOccurrenceRequest`: Dados para criar uma ocorrência
- `IUpdateOccurrenceRequest`: Dados para atualizar uma ocorrência
- `IPaginatedResponse`: Resposta paginada da API
- Interfaces para Status, Tipos, Subtipos e Naturezas de ocorrências

### 2. Serviço de Ocorrências (`src/services/occurrence.service.ts`)
Implementa todas as operações CRUD:
- `getOccurrencesPaginated()`: Lista ocorrências com paginação
- `getOccurrenceById()`: Obtém detalhes de uma ocorrência
- `createOccurrence()`: Cria nova ocorrência
- `completeOccurrence()`: Completa segunda parte da ocorrência
- `updateOccurrence()`: Atualiza ocorrência existente
- `deactivateOccurrence()`: Desativa uma ocorrência
- `activateOccurrence()`: Ativa uma ocorrência
- Métodos para buscar tipos, subtipos, status e naturezas

### 3. Telas Implementadas

#### OccurrenceListScreen (`src/screens/OccurrenceListScreen.tsx`)
- Lista todas as ocorrências com filtro (ativas/inativas)
- Cards com informações principais
- Botões de ação: Visualizar, Completar, Editar
- Pull-to-refresh para atualizar lista

#### OccurrenceDetailScreen (`src/screens/OccurrenceDetailScreen.tsx`)
- Exibe detalhes completos da ocorrência
- Seções: Informações Gerais, Endereço, Detalhes do Atendimento
- Botões para Completar, Editar ou Voltar

#### CompleteOccurrenceScreen (`src/screens/CompleteOccurrenceScreen.tsx`)
- Formulário para completar a segunda parte da ocorrência
- Campos:
  - Detalhes da ocorrência (textarea)
  - Horário de chegada (formato: YYYY-MM-DD HH:MM)
  - Latitude e Longitude
  - Seleção de militares envolvidos (multi-select)
  - Status da ocorrência
- Validação de campos obrigatórios

#### UpdateOccurrenceScreen (`src/screens/UpdateOccurrenceScreen.tsx`)
- Formulário para atualizar dados da ocorrência
- Campos:
  - Informações do solicitante (nome, telefone)
  - Endereço completo
  - Descrição/detalhes
- Pré-carrega dados existentes

#### SimpleHomeScreen (`src/screens/SimpleHomeScreen.tsx`)
- Tela home simples com informações do usuário
- Exibe dados pessoais e funcionais
- Informações de navegação

### 4. Navegação Bottom-Tabs (`src/navigation/AppNavigator.tsx`)

Estrutura de navegação com 3 abas principais:

```
┌─────────────────────────────────────┐
│         Conteúdo da Aba             │
├─────────────────────────────────────┤
│ [Ocorrências] [Home] [Perfil]      │
└─────────────────────────────────────┘
```

**Abas:**
1. **Ocorrências** - Stack com:
   - OccurrenceListScreen (inicial)
   - OccurrenceDetailScreen
   - CompleteOccurrenceScreen
   - UpdateOccurrenceScreen

2. **Home** - Stack com:
   - SimpleHomeScreen

3. **Perfil** - Stack com:
   - HomeScreen (tela de perfil existente)

### 5. Estilos

Criados arquivos de estilos para cada tela:
- `OccurrenceList.styles.ts`: Cards, lista, filtros
- `OccurrenceDetail.styles.ts`: Detalhes, seções, botões
- `CompleteOccurrence.styles.ts`: Formulário, inputs, validação

## Instalação e Execução

### 1. Instalar Dependências

```bash
cd mobile-central-controle-fogo
npm install
```

Isso instalará a nova dependência:
- `@react-navigation/bottom-tabs@^6.5.0`

### 2. Executar o Aplicativo

```bash
# Para Android
npm run android

# Para iOS
npm run ios

# Para Web
npm run web

# Modo desenvolvimento
npm start
```

## Funcionalidades Implementadas

### ✅ Lista de Ocorrências
- Exibe todas as ocorrências
- Filtro por status (ativas/inativas)
- Pull-to-refresh
- Cards com informações principais
- Navegação para detalhes

### ✅ Visualizar Ocorrência
- Detalhes completos
- Informações do solicitante
- Endereço
- Dados do atendimento (se completado)
- Botões de ação

### ✅ Completar Ocorrência (Segunda Parte)
- Formulário com campos obrigatórios
- Seleção de militares envolvidos
- Seleção de status
- Coordenadas (latitude/longitude)
- Horário de chegada
- Descrição do atendimento

### ✅ Atualizar Ocorrência
- Edição de dados da ocorrência
- Informações do solicitante
- Endereço
- Descrição

### ✅ Tela Home Simples
- Informações do usuário logado
- Dados pessoais
- Dados funcionais
- Guia de navegação

### ✅ Navegação Bottom-Tabs
- 3 abas principais
- Ícones e labels
- Estilo consistente com o design do app
- Cores: #FF6B35 (ativa), #999 (inativa)

## Padrões Seguidos

1. **Estrutura de Pastas**: Mantém padrão existente
   - `src/screens/` - Componentes de tela
   - `src/services/` - Serviços de API
   - `src/types/` - Tipos TypeScript
   - `src/styles/` - Estilos
   - `src/navigation/` - Navegação

2. **Estilo Visual**: Consistente com design existente
   - Cores: #0A0E27 (fundo), #1a1f3a (cards), #FF6B35 (destaque)
   - Tipografia: Montserrat/System fonts
   - Ícones: MaterialCommunityIcons

3. **Tratamento de Erros**: Toast notifications
   - Sucesso: Verde
   - Erro: Vermelho
   - Aviso: Amarelo

4. **Validação**: Campos obrigatórios validados antes de envio

## Próximos Passos (Opcional)

1. Adicionar fotos/câmera para ocorrências
2. Integração com mapa (localização em tempo real)
3. Sincronização offline
4. Busca e filtros avançados
5. Exportação de relatórios
6. Notificações push

## Troubleshooting

### Erro: Cannot find module '@react-navigation/bottom-tabs'
**Solução**: Execute `npm install` para instalar as dependências

### Erro: Ocorrências não carregam
**Verificar**:
- Token de autenticação válido
- Conexão com a API
- Verificar logs no console

### Erro: Campos de data/hora não funcionam
**Nota**: O campo de data/hora usa formato de texto (YYYY-MM-DD HH:MM)
- Exemplo: `2024-01-15 14:30`

## Contato e Suporte

Para dúvidas sobre a implementação, consulte os comentários no código ou a documentação do frontend em `front-centro-controle-fogo/`.
