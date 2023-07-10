# Boteria Mobile 🤖

Uma maneira ágil e eficiente de integrar a funcionalidade de chat (Boteria) em seus aplicativos React Native

---

## Instalação

```sh
yarn add -D code7-boteria-lib-mobile-rn react-native-encrypted-storage@4.0.3 react-native-fs@2.20.0 react-native-document-picker@8.1.3 react-native-sound@0.11.2 react-native-video@5.2.1 axios@1.2.1 @miblanchard/react-native-slider@2.1.0
```

## Importação
```jsx
import { View } from 'react-native';
import { Code7Boteria } from 'code7-boteria-lib-mobile-rn';

// ...

return (
  <View>
    <Code7Boteria botId="botId" />
  </View>
);
```

Exemplo para envio de **parãmetros adicionais** no início da conversa:

```jsx
const params = { foo: 'bar' };

return (
  <View>
    <Code7Boteria
      botId="botId"
      params={params}
    />
  </View>
)
```

Também é possível substituit o widget flutuante por um componente pressionável de sua aplicação ao passá-lo como **children**, por exemplo:
```jsx
return (
  <View>
    <Code7Boteria botId="botId">
      <Button title="Abrir o chat" />
    </Code7Boteria>
  </View>
)
```
Ou então:
```jsx
return (
  <View>
    <Code7Boteria
      botId="botId"
      children={<Button title="Abrir o chat" />}
    >
  </View>
)
```

Lembre-se de substituir 'botId' pelo identificador correto do seu BOT.

Para versões React Native 0.64.0 até 0.70
```bash
yarn add @react-native/normalize-color
```

## Acesso ao Ambiente de Homologação

Para acessar o ambiente de homologação do aplicativo, você precisará passar o parâmetro `staging` como `true`. Por exemplo:

```jsx
<Code7Boteria staging botId="MEU_ID" />
```

Ao fazer isso, o ambiente do aplicativo será redirecionado para a [homologação](https://hml2.testesboteria.com.br) ao invés do ambiente padrão de [produção](https://new.boteria.com.br).


## Configuração react-native-video

**android/settings.gradle**
```gradle
include ':react-native-video'
project(':react-native-video').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-video/android-exoplayer')
```

**android/gradle.properties**
```gradle
android.useAndroidX=true
android.enableJetifier=true
```

**MyApplication.java**
No topo, onde estão as importações:
```java
import com.brentvatne.react.ReactVideoPackage;
```

Adicione a classe `ReactVideoPackage` à sua lista de pacotes exportados.
```java
packages.add(new ReactVideoPackage());
```

## Suporte para GIFs
**android/app/build.gradle**
```gradle
implementation "com.facebook.fresco:animated-base-support:1.3.0"
implementation "com.facebook.fresco:animated-gif:2.5.0"
```

## Suporte para Notificações
**android/app/src/main/AndroidManifest.xml**

Dentro da tag `manifest`, adicione:
```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
```

Dentro da tag `application`, adicione:
```xml
<provider
  android:name="androidx.core.content.FileProvider"
  android:authorities="${applicationId}.provider"
  android:exported="false"
  android:grantUriPermissions="true">
  <meta-data
    android:name="android.support.FILE_PROVIDER_PATHS"
    android:resource="@xml/file_paths" />
</provider>
```
**android/app/src/main/res/xml/file_paths.xml**
```xml
<paths xmlns:android="http://schemas.android.com/apk/res/android">
    <files-path name="my_files" path="." />
    <external-path name="external_files" path="." />
    <external-files-path name="external_files" path="." />
    <root-path name="root" path="." />
    <root-path name="external_storage_root" path="/storage/" />
    <root-path name="external_downloads" path="/storage/emulated/0/Downloads/" />
</paths>
```

<!-- IOS
**ios/MeuApp/Info.plist**
```xml
<key>UIBackgroundModes</key>
<array>
    <string>remote-notification</string>
</array>
``` -->

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
    settings: {
      botFab: 'https://my-domain/my-icon.png',
      mainColor: '#FF0000',
      mainTextColor: '#00FF00',
      secondaryColor: '#000000',
      secondaryTextColor: '#0000FF',
    },
  }
  ```
  </td>
  </tr>
</table>
