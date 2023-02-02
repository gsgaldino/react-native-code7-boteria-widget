# Boteria Mobile 🤖

Maneira fácil e rápida para criar uma instância do chat (Boteria) em aplicativos React Native

## Instalação local

<details>
  <summary>Android</summary>

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
  git clone https://github.com/<SEU_FORK>/code7-boteria-lib-mobile-rn
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
  yarn add @react-native-async-storage/async-storage@1.17.11 react-native-fs@2.20.0 react-native-document-picker@8.1.3 react-native-notifications@4.3.3 react-native-sound@0.11.2 react-native-video@5.2.1
  ```

  Por fim, na pasta raiz da lib, inicie o projeto exemplo:
  ```bash
  yarn example android
  ```
</details>

---

## Utilização

Instalação da lib:

```sh
yarn add code7-boteria-lib-mobile-rn
```

Instalação das dependências pares:
```bash
yarn add @react-native-async-storage/async-storage@1.17.11 react-native-fs@2.20.0 react-native-document-picker@8.1.3 react-native-notifications@4.3.3 react-native-sound@0.11.2 react-native-video@5.2.1
```
```js
import { Code7Boteria } from 'code7-boteria-lib-mobile-rn';
import MyComponent from 'components';

// ...

const params = {
  foo: 'bar'
};

return (
  <Code7Boteria
    botId="botId"
    params={params}
    children={<MyComponent />}
  />
);
```

Ou então:

```js

return (
  <Code7Boteria botId="botId" params={params}>
    <MyComponent />
  </Code7Boteria>
);
```

## Parâmetros

<table>
  <tr>
    <td> Parâmetro </td>
    <td> Descrição </td>
    <td> Obrigatório </td>
    <td> Tipo </td>
    <td> Exemplo </td>
  </tr>
  <tr>
    <td> botId </td>
    <td> Identificador do BOT </td>
    <td> Sim </td>
    <td> String </td>
    <td> 62e9145fc073550012d52f25 </td>
  </tr>
  <tr>
    <td> params </td>
    <td> Variáveis externas que entrarão no fluxo </td>
    <td> não </td>
    <td> Object </td>
    <td>

  ```js
  {
    foo: 'bar'
  }
  ```
  </td>
  </tr>
  <tr>
    <td> children </td>
    <td> Componente que irá substituir o Widget </td>
    <td> não </td>
    <td> React Component </td>
    <td>

  ```jsx
  <MyComponent />
  ```
  </td>
  </tr>
</table>
