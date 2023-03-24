# Boteria Mobile 🤖

Maneira fácil e rápida para criar uma instância do chat (Boteria) em aplicativos React Native

---

## Instalação

```sh
yarn add code7-boteria-lib-mobile-rn
```

Instalação das dependências pares:
```bash
yarn add react-native-encrypted-storage@4.0.3 react-native-fs@2.20.0 react-native-document-picker@8.1.3 react-native-notifications@4.3.3 react-native-sound@0.11.2 react-native-video@5.2.1
```

Para versões React Native 0.64.0 até 0.70
```bash
yarn add @react-native/normalize-color
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
    <td> Não </td>
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
    <td> Não </td>
    <td> React Component </td>
    <td>

  ```jsx
  <MyComponent />
  ```
  </td>
  </tr>
  <tr>
    <td> appearance </td>
    <td> Variáveis de estilo do chatbot </td>
    <td> Não </td>
    <td> Object </td>
    <td>

  ```js
  {
    title: 'Bot title',
    botFab:
      'https://my-domain/my-icon.png',
    colors: {
      main: '#FF0000',
      mainText: '#00FF00',
      secondary: '#000000',
      secondaryText: '#0000FF',
    },
  }
  ```
  </td>
  </tr>
</table>
