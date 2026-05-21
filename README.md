# CP1-Mobile

Aplicativo mobile desenvolvido com React Native + Expo + Expo Router, contendo formulário de cadastro, upload de imagem e navegação por abas.

---

Equipe

Felipe Maglio Filho - RM563512

Mateus Granja dos Santos - RM564930

---

# Tecnologias Utilizadas

- React Native
- Expo
- Expo Router
- React Navigation
- Axios
- Expo Image Picker
- TypeScript
- React Native Reanimated

---

# Estrutura do Projeto

```txt
CP1-Mobile/
│
├── app/                  # Rotas e telas do aplicativo
├── assets/               # Imagens, ícones e arquivos estáticos
├── components/           # Componentes reutilizáveis
├── constants/            # Constantes globais
├── context/              # Context API
├── hooks/                # Hooks customizados
├── services/             # Serviços e APIs
├── scripts/              # Scripts auxiliares
├── package.json
└── app.json
```

---

# Funcionalidades

- Cadastro de usuário
- Upload de foto
- Navegação por abas
- Formulário responsivo
- Compatibilidade com Android, iOS e Web

---

# Pré-requisitos

Antes de começar, instale:

- Node.js LTS
- Git
- Expo Go (Android/iOS)

---

# Instalação

Clone o repositório:

```bash
git clone https://github.com/FelipeMaglio/CP3-Mobile.git
```

Entre na pasta:

```bash
cd CP3-Mobile
```

Instale as dependências:

```bash
npm install
```

---

# Executando o Projeto

Iniciar Expo:

```bash
npx expo start
```

---

## Rodar no Android

```bash
npm run android
```

---

## Rodar na Web

```bash
npm run web
```

---

# Dependências Principais

```json
{
  "expo": "~54.0.33",
  "react": "^19.1.0",
  "react-native": "0.81.5",
  "expo-router": "~6.0.23",
  "axios": "^1.16.1",
  "expo-image-picker": "~17.0.11"
}
```

---

# Configuração do Expo Image Picker

No `app.json`:

```json
[
  "expo-image-picker",
  {
    "cameraPermission": "Permitir acesso à câmera para tirar fotos.",
    "photosPermission": "Permitir acesso às fotos para selecionar imagens."
  }
]
```

---

# Scripts Disponíveis

```bash
npm start
npm run android
npm run ios
npm run web
npm run lint
```

---

# Possíveis Problemas

## Limpar cache do Expo

```bash
npx expo start --clear
```

---

## Reinstalar dependências

Linux/macOS:

```bash
rm -rf node_modules
rm package-lock.json
npm install
```

Windows:

```powershell
rd /s /q node_modules
del package-lock.json
npm install
```

---
