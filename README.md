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
- [x] Áudio (Audio)
- [x] Documento (Document) - 3h
- [ ] Carrossel (Carousel) - 7h

- Bugs / Ajustes

- [x] Estilos dos balões das mensagens
- [x] Estilos do BOT com base nas configs salvas no banco
- [x] Título do BOT ao abrir teclado - 3h
- [ ] Socket criando outras conexões ao enviar mensagem - 7h
- [ ] Substituir o map em Messages por uma FlatList - 3h
- [ ] Retirar o modo preview - 3h
- [ ] Ajustar absolute imports - 4h
- [ ] Spinner no carregamento de imagens - 3h

// ver com Gui

- Customização semelhante ao webchat fullscreen
