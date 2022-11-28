# Boteria Widget Mobile 🤖

Maneira fácil e rápida para criar uma instância do chat (Boteria) em aplicativos React Native

## Instalação

```sh
npm install react-native-code7-boteria-widget
```

## Como utilizar

```js
import { Widget } from 'react-native-code7-boteria-widget';

// ...

return (
  <Widget botId="MEU_BOT_ID" />
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
- [ ] Áudio (Audio)
- [ ] Carrossel (Carousel)
- [ ] Documento (Document)

- Bugs / Ajustes

- [x] Estilos dos balões das mensagens
- [x] Estilos do BOT com base nas configs salvas no banco
- [ ] Título do BOT ao abrir teclado
- [ ] Socket criando outras conexões ao enviar mensagem
- [ ] Substituir o map em Messages por uma FlatList
- [ ] Retirar o modo preview
- [ ] Ajustar absolute imports
- [ ] Spinner no carregamento de imagens

// ver com Gui

- Customização semelhante ao webchat fullscreen
