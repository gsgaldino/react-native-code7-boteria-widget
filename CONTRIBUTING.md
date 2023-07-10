### Ferramentas necessárias:

  - NodeJS
  - JDK (Java Development Kit)
  - Android Studio
  - Android SDK

[Neste link](https://reactnative.dev/docs/environment-setup) você encontra um tutorial detalhado de como instalar essas ferramentas. Após a instalação do Android Studio e SDK, não esqueça de configurar as variáveis de ambiente do sistema, como descrito no tutorial.

### Fluxo de desenvolvimento

1. Criar um [fork](https://docs.github.com/pt/get-started/quickstart/fork-a-repo) desse repositório
2. Clonar o seu fork:
```bash
git clone https://github.com/<SEU_FORK>/code7-boteria-lib-mobile-rn
```
3. Para começar o projeto, execute `yarn` no diretório raiz para instalar as dependências necessárias para cada pacote:

```sh
yarn
```

> Embora seja possível usar o [`npm`](https://github.com/npm/cli), a ferramenta foi construída em torno do [`yarn`](https://classic.yarnpkg.com/), então você terá uma experiência mais fácil se usar o `yarn` para desenvolvimento.

Durante o desenvolvimento, você pode executar o [aplicativo exemplo](/example/) para testar suas alterações. Qualquer mudança que você fizer no código JavaScript da biblioteca será refletida no aplicativo de exemplo sem precisar reconstruí-lo.

Para iniciar o empacotador:

```sh
yarn example start
```

Para executar o aplicativo de exemplo no Android:

```sh
yarn example android
```

Para executar o aplicativo de exemplo no iOS:

```sh
yarn example ios
```

Para executar o aplicativo de exemplo na Web:

```sh
yarn example web
```

Certifique-se de que seu código passe na verificação do TypeScript e do ESLint. Execute o seguinte para verificar:

```sh
yarn typecheck
yarn lint
```

Para corrigir erros de formatação, execute o seguinte:

```sh
yarn lint --fix
```

Lembre-se de adicionar testes para suas alterações, se possível. Execute os testes unitários com o seguinte comando:

```sh
yarn test
```


### Convenção de mensagens de commit

Seguimos a especificação de [commits convencionais](https://www.conventionalcommits.org/en) para nossas mensagens de commit:

- `fix`: correções de bugs, por exemplo, corrigir falha devido a um método obsoleto.
- `feat`: novas features, por exemplo, adicionar novo método ao módulo.
- `refactor`: refatoração de código, por exemplo, migrar de componentes de classe para hooks.
- `docs`: alterações na documentação, por exemplo, adicionar exemplo de uso para o módulo.
- `test`: adicionar ou atualizar testes, por exemplo, adicionar testes de integração usando o Detox.
- `chore`: alterações de ferramentas, por exemplo, alterar configuração no arquivo de CI.

Nossos hooks de pré-commit verificam se sua mensagem de commit está nesse formato ao realizar o commit.

### Linting e testes

[ESLint](https://eslint.org/), [Prettier](https://prettier.io/), [TypeScript](https://www.typescriptlang.org/)

Usamos [TypeScript](https://www.typescriptlang.org/) para verificação de tipos, [ESLint](https://eslint.org/) com [Prettier](https://prettier.io/) para linting e formatação do código, e [Jest](https://jestjs.io/) para testes.

Nossos hooks de pré-commit também verificam se o linter e os testes passam ao realizar o commit.

### Publicação no npm

Usamos o [release-it](https://github.com/release-it/release-it) para facilitar a publicação de novas versões. Ele cuida de tarefas comuns, como aumentar a versão com base no semver, criar tags e lançamentos, etc.

Para publicar novas versões, execute o seguinte:

```sh
yarn release
```
