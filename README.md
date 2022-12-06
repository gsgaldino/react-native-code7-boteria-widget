# Boteria Widget Mobile 🤖

Maneira fácil e rápida para criar uma instância do chat (Boteria) em aplicativos React Native

## Instalação

```sh
npm install react-native-code7-boteria-widget
```

## Como utilizar

```js
import { Code7Boteria } from 'react-native-code7-boteria-widget';

// ...

return (
  <Code7Boteria botId="MEU_BOT_ID" />
);
```

---

## Scripts

```
npm run dev
```

Inicia o projeto em modo de desenvolvimento

## Todos

- Componentes de mensagem
  
- [x] Texto (Text)
- [x] Digitando (Typing)
- [x] Imagem (Image)
- [x] Vídeo (Video)
- [x] Áudio (Audio)
- [x] Documento (Document)
- [x] Carrossel (Carousel)

- Bugs / Ajustes

- [x] Estilos dos balões das mensagens
- [x] Estilos do BOT com base nas configs salvas no banco
- [x] Título do BOT ao abrir teclado
- [x] Substituir o map em Messages por uma FlatList
- [x] Socket criando outras conexões ao enviar mensagem
- [x] Retirar o modo preview
- [x] Ajustar mimetype ao salvar documentos
- [ ] Spinner no carregamento de imagens
- [ ] Ajustar absolute imports

// ver com Gui

- Customização semelhante ao webchat fullscreen
