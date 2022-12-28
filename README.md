# Boteria Widget Mobile 🤖

Maneira fácil e rápida para criar uma instância do chat (Boteria) em aplicativos React Native

## Instalação

```sh
npm install react-native-code7-boteria-widget
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

## Como utilizar

```js
import { Code7Boteria } from 'react-native-code7-boteria-widget';
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

---

## Scripts

```
npm run dev
```

Inicia o projeto em modo de desenvolvimento
