# Assistente GPT

Assistente GPT desenvolvido em Electron (v23.1.0) e NodeJS (v17.4.0)

OBS: Neste projeto foi utilizado Sass para a estilização das páginas, por isso, é necessário compilá-lo para o CSS!

Siga os seguintes comandos para executá-lo

```
git clone https://github.com/Danrley-Ruan-Saquetti/Assistant-GPT.git
npm install
npm run build
```

Isso criará uma pasta ```packages``` e dentro dela estará o executável do aplicativo :)

Ao executá-lo, o app rodará em segundo plano, podendo ser visto nos itens ocultos, no canto direito da barra de tarefas. Ao clicar em cima do ícone, será aberto o assistente para fazer qualquer tipo de pergunta.

![Image](https://github.com/Danrley-Ruan-Saquetti/Assistant-GPT/blob/app-hidden/src/imgs/amostra-app.png)

## Instruções

Para usá-lo, é necessário entrar nas configurações e informar a [API Key](https://platform.openai.com/account/api-keys), disponível na própria plataforma oficial da [OpenAI](https://platform.openai.com/), além de outras configurações, como a quantidade máxima de caracteres e a taxa de criatividade de respostas, que varia entre 0 (zero) e 2 (dois).

![Image](https://github.com/Danrley-Ruan-Saquetti/Assistant-GPT/blob/app-hidden/src/imgs/amostra-setting-key.png)

## Atalhos

```
Alt+Q // Abrir/fechar o assistente
Ctrl+S // Salvar configurações
Ctrl+R // Limpar mensagens
Ctrl+Q // Abrir/fechar configurações
Tab // Auto foco no campo da questão
```