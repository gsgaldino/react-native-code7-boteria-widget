## Instalação local

### Android

### Ferramentas necessárias:

  - NodeJS
  - JDK (Java Development Kit)
  - Android Studio
  - Android SDK

[Neste link](https://reactnative.dev/docs/environment-setup) você encontra um tutorial detalhado de como instalar essas ferramentas. Após a instalação do Android Studio e SDK, não esqueça de configurar as variáveis de ambiente do sistema, como descrito no tutorial.

### Configurando a aplicação

1. Criar um [fork](https://docs.github.com/pt/get-started/quickstart/fork-a-repo) desse repositório
2. Clonar o seu fork:
```bash
git clone https://github.com/<SEU_FORK>/react-native-code7-boteria
```
3. Instalar dependências do projeto:

Na pasta do projeto, execute:

```bash
yarn install
```

Instale as dependências da aplicação exemplo:
```bash
yarn boostrap
```

Na pasta da aplicação exemplo, instale as dependências pares:

```bash
cd example
```

```bash
yarn add react-native-encrypted-storage@4.0.3 react-native-fs@2.20.0 react-native-document-picker@8.1.3 react-native-notifications@4.3.3 react-native-sound@0.11.2 react-native-video@5.2.1
```

Por fim, na pasta raiz da lib, inicie o projeto exemplo:
```bash
yarn example android
```