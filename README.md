# 🏆 Quiz App - Pietro Freire Rezende dos Santos

> Status do Projeto: Concluído ✔️

---

### Tabela de Conteúdos
* [Descrição do Projeto](#descrição-do-projeto)
* [Demonstração da Aplicação](#demonstração-da-aplicação)
* [Funcionalidades](#-funcionalidades)
* [Tecnologias Utilizadas](#️-tecnologias-utilizadas)
* [Como Rodar o Projeto Localmente](#️-como-rodar-o-projeto-localmente)
* [Funcionalidade Adicional](#-funcionalidade-adicional)
* [Autor](#-autor)

---

### Descrição do Projeto
<p align="center">
Este projeto é um aplicativo de Quiz multiplataforma, desenvolvido com React Native e Expo, como projeto final do curso de programação. O aplicativo apresenta um questionário com feedback instantâneo, tela de resultados e a possibilidade de jogar novamente.
</p>

---

### Demonstração da Aplicação
<p align="center">
  <img src="../quiz/assets/images/print.png" alt="Demonstração do App" width="300"/>
</p>

---

### 🚀 Funcionalidades

- **Quiz Interativo:** Fluxo de perguntas e respostas com validação.
- **Feedback Visual:** Respostas são marcadas como corretas ou incorretas instantaneamente.
- **Placar:** Pontuação é calculada e atualizada a cada rodada.
- **Tela de Resultados:** Ao final do quiz, uma tela exibe a pontuação final.
- **Jogar Novamente:** O usuário pode reiniciar o quiz a partir da tela de resultados.
- **Funcionalidade Adicional:** **[Nome da sua nova funcionalidade]** (ex: Cronômetro regressivo por pergunta).

---

### 🛠️ Tecnologias Utilizadas

- **[React Native](https://reactnative.dev/)**
- **[Expo](https://expo.dev/)**
- **[TypeScript](https://www.typescriptlang.org/)**

---

### ⚙️ Como Rodar o Projeto Localmente

```bash
# 1. Clone o repositório
$ git clone [link-do-seu-repositorio]

# 2. Navegue até o diretório do projeto
$ cd quiz-app

# 3. Instale as dependências
$ npm install

# 4. Inicie o servidor de desenvolvimento
$ npm start
```
Após executar `npm start`, pressione `w` para abrir no navegador ou escaneie o QR Code com o app Expo Go no seu celular.

---

## ✨ Funcionalidades Adicionais: Cronômetro, efeitos sonoros e 

Esta seção detalha a funcionalidade extra implementada como parte do desafio final do curso.

### Descrição
*O aplicativo de quiz foi aprimorado para oferecer uma experiência de jogo mais dinâmica e desafiadora. Agora, cada pergunta tem um cronômetro regressivo de 15 segundos, adicionando um elemento de urgência. Para enriquecer o feedback do usuário, efeitos sonoros de acerto e erro foram implementados. Além disso, as perguntas e suas respectivas opções são embaralhadas aleatoriamente a cada partida, garantindo que o jogo seja único e divertido em todas as rodadas.*

### Desafios e Aprendizados
*A implementação dessas funcionalidades exigiu o uso de conceitos avançados do React Native e TypeScript. Para o cronômetro, foi essencial usar o useEffect para gerenciar o ciclo de vida do setInterval e comunicar o evento de "tempo esgotado" do componente filho para o pai. Os sons foram adicionados com a biblioteca expo-av, que requer o manuseio assíncrono de arquivos de áudio. O maior aprendizado foi a aplicação de um algoritmo de embaralhamento (Fisher-Yates) para garantir que as perguntas e as opções fossem apresentadas de forma verdadeiramente aleatória, melhorando a rejogabilidade do quiz.*

### Demonstração do Cronômetro
<p align="center">
  <img src="assets/images/2025-09-16 13-03-09.gif" width="300"/>
</p>

---

### 👨‍💻 Autor

Desenvolvido por **Pietro Freire Rezende dos Santos**.

Sob a orientação do **Prof. Rafael Ribas**.