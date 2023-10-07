const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");

const { Configuration, OpenAIApi } = require("openai");

const app = express();

var cors = require("cors");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI,
});
const openai = new OpenAIApi(configuration);

app.get("/", async (req, res) => {
  res.status(200).json({ text: "Invalid prompt provided." });
});

// OK
app.get("/resumo", async (req, res) => {
  req.body.prompt = "string";

  if (typeof req.body.prompt === "string") {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt:
        "Olá, ChatGPT! Se comporte como um um professor. Gostaria de solicitar sua ajuda para criar resumos de disciplinas escolares abordadas pelos professores. Isso permitirá que os alunos utilizem o resumo como base ou alternativa ao que foi ensinado em sala de aula, preparando-os para discussões posteriores e atividades relacionadas ao tema. Por favor, crie um resumo conciso sobre o tópico de HISTORIA - FASCISMO. O objetivo é fornecer uma visão geral do assunto, abrangendo as principais informações de forma clara e sucinta, incluindo exemplos práticos relacionados ao tópico para facilitar a compreensão.",
      temperature: 0.4,
      max_tokens: 2048,
    });

    return res.status(200).json({ text: response.data.choices[0].text });
  } else {
    res.status(200).json({ text: "Invalid prompt provided." });
  }
});

// OK
app.get("/caracteristica", async (req, res) => {
  req.body.prompt = "string";

  if (typeof req.body.prompt === "string") {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt:
        "Olá, comporte-se como um especialista no tema HISTORIA - FASCISMO, e liste os principais caracteristicas sobre o tema. Seja o mais detalhista possível e cite exemplos práticos.",
      temperature: 0.4,
      max_tokens: 2048,
    });

    return res.status(200).json({ text: response.data.choices[0].text });
  } else {
    res.status(200).json({ text: "Invalid prompt provided." });
  }
});

// OK
app.get("/causa", async (req, res) => {
  req.body.prompt = "string";

  if (typeof req.body.prompt === "string") {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt:
        "Olá, comporte-se como um especialista em HISTORIA - FASCISMO, e liste os principais causas sobre ele. Seja o mais detalhista possível e cite exemplos práticos.",
      temperature: 0.4,
      max_tokens: 2048,
    });
    return res.status(200).json({ text: response.data.choices[0].text });
  } else {
    res.status(200).json({ text: "Invalid prompt provided." });
  }
});

// OK
app.get("/cronograma-aluno", async (req, res) => {
  req.body.prompt = "string";

  if (typeof req.body.prompt === "string") {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt:
        "Olá Chat,Gostaria de criar um material de estudo, que será um cronograma destinado a um estudante. Neste cronograma deve conter os temas que o aluno deve estudar para que o assunto principal que foi solicitado seja mais completamente abordado levando em consideração a quantidade de dias e horas por dia que o aluno vai passar estudando.Tema: FASCISMO, Dias: 3,  Horas por dia: 2 horas .A resposta deve vir em forma de lista, separando os dias em tópicos e o tema abordado neste respectivo dia em subtópicos. Caso seja em apenas um dia, apresente somente os subtópicos.Também deve estar claro quanto tempo o aluno deve separar para cada subtópico.",
      temperature: 0.4,
      max_tokens: 2048,
    });
    return res.status(200).json({ text: response.data.choices[0].text });
  } else {
    res.status(200).json({ text: "Invalid prompt provided." });
  }
});

// OK
app.get("/cronograma-professor", async (req, res) => {
  req.body.prompt = "string";

  if (typeof req.body.prompt === "string") {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt:
        "Olá, ChatGPT! se comporte como um especialista em criar roteiro de aulas. Levando em consideração a matéria, tema a ser abordado, tempo de aula. Aqui estão as informações necessárias :Matéria: HISTÓRIA, Tema: FASCISMO. Estrutura do roteiro: O roteiro deve ser composto por entre 4 e 8 tópicos principais. Cada tópico principal deve ser acompanhado por 1 a 4 subtópicos. Quanto mais relevante e extenso for o tema, mais subtópicos podem ser incluídos.",
      temperature: 0.4,
      max_tokens: 2048,
    });
    return res.status(200).json({ text: response.data.choices[0].text });
  } else {
    res.status(200).json({ text: "Invalid prompt provided." });
  }
});

// OK
app.get("/exercicio-professor", async (req, res) => {
  req.body.prompt = "string";

  if (typeof req.body.prompt === "string") {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt:
        "Olá chat ! Comporte-se como um professor que está criando exercícios de fixação para seus alunos. Você deve criar exercícios de nível médio para os alunos, levando em consideração os temas e tópicos abordados na aula. Os exercícios devem ser de múltipla escolha, tendo cada um entre 4 e 5 opções e somente uma correta. Ao lado de cada questão deve conter o gabarito para que o professor possa corrigir mais facilmente, GERE O MAXIMO DE QUESTOES POSSIVEIS. Tema: Tópico: HISTORIA - FASCISMO",
      temperature: 0.4,
      max_tokens: 2048,
    });
    return res.status(200).json({ text: response.data.choices[0].text });
  } else {
    res.status(200).json({ text: "Invalid prompt provided." });
  }
});

// OK
app.get("/exercicio-aluno", async (req, res) => {
  req.body.prompt = "string";

  if (typeof req.body.prompt === "string") {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt:
        "Olá chat ! Comporte-se como um professor que está criando exercícios de fixação para seus alunos. Você deve criar exercícios de nível médio para os alunos, levando em consideração os temas e tópicos abordados na aula. Os exercícios devem ser de múltipla escolha, tendo cada um entre 4 e 5 opções e somente uma correta, lembre de não não informar qual a resposta correta. GERE O MAXIMO DE QUESTOES POSSIVEIS. Tema: Tópico: HISTORIA - FASCISMO",
      temperature: 0.4,
      max_tokens: 2048,
    });
    return res.status(200).json({ text: response.data.choices[0].text });
  } else {
    res.status(200).json({ text: "Invalid prompt provided." });
  }
});

// OK
app.get("/consequencia", async (req, res) => {
  req.body.prompt = "string";

  if (typeof req.body.prompt === "string") {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt:
        "Olá, comporte-se como um especialista em HISTORIA - FASCISMO, e liste os principais consequencias sobre ele. Seja o mais detalhista possível e cite exemplos práticos.",
      temperature: 0.4,
      max_tokens: 2048,
    });
    console.log(response.data.choices[0].text);

    return res.status(200).json({ text: response.data.choices[0].text });
  } else {
    res.status(200).json({ text: "Invalid prompt provided." });
  }
});

// OK
app.get("/formulas-exatas", async (req, res) => {
  req.body.prompt = "string";

  if (typeof req.body.prompt === "string") {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt:
        "Olá chat. Se comporte como uma ótima fonte para obter fórmulas e regras relacionadas a matérias exatas da escola, como matemática, física, química, geometria e biologia. Liste as principais fórmulas relacionadas a disciplina e tema informados abaixo, as elencando em tópicos, além de uma breve descrição quanto a suas finalidades reais. Disciplina: Matemática Tema: Equação de segundo grau",
      temperature: 0.4,
      max_tokens: 2048,
    });
    console.log(response.data.choices[0].text);

    return res.status(200).json({ text: response.data.choices[0].text });
  } else {
    res.status(200).json({ text: "Invalid prompt provided." });
  }
});

// OK
app.get("/fonte-estudos", async (req, res) => {
  req.body.prompt = "string";

  if (typeof req.body.prompt === "string") {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt:
        "Olá chat. Se comporte como uma ótima referência para indicar fontes de estudo. Gostaria de obter boas fontes de estudo no idioma português sobre os temas mais relevantes, referente a disciplina e tema descritos abaixo. As fontes serão usadas como base para que alunos possam estudar melhor.  Disciplina: História  Tema: Fascismo",
      temperature: 0.4,
      max_tokens: 2048,
    });
    console.log(response.data.choices[0].text);

    return res.status(200).json({ text: response.data.choices[0].text });
  } else {
    res.status(200).json({ text: "Invalid prompt provided." });
  }
});

// OK
app.get("/ludico", async (req, res) => {
  req.body.prompt = "string";

  if (typeof req.body.prompt === "string") {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt:
        "me ensine sobre FASCISMO como se fosse um filme de ficção cientifica, me conte uma longa história",
      temperature: 0.4,
      max_tokens: 2048,
    });
    console.log(response.data.choices[0].text);

    return res.status(200).json({ text: response.data.choices[0].text });
  } else {
    res.status(200).json({ text: "Invalid prompt provided." });
  }
});

// OK
app.get("/curiosidade", async (req, res) => {
  req.body.prompt = "string";

  if (typeof req.body.prompt === "string") {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt:
        "Olá chat. Se comporte como uma enciclopédia de curiosidades relacionadas a temas aleatórios. Os temas aleatórios serão descritos posteriormente neste prompt, levando em consideração a disciplina e tema. Porém você deve me listar 3, 4 ou 5 curiosidades relacionadas ao tema solicitado. As curiosidades devem ser listadas em tópicos e conter um breve resumo. Disciplina: História Tema: Fascismo",
      temperature: 0.4,
      max_tokens: 2048,
    });
    console.log(response.data.choices[0].text);

    return res.status(200).json({ text: response.data.choices[0].text });
  } else {
    res.status(200).json({ text: "Invalid prompt provided." });
  }
});

// OK
app.get("/relato", async (req, res) => {
  req.body.prompt = "string";

  if (typeof req.body.prompt === "string") {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt:
        "Olá chat. Se comporte com uma ótima fonte de relatos de pessoas reais, sobre tópicos aleatórios. Os tópicos serão descritos posteriormente neste prompt, levando em consideração a disciplina e tema solicitado. Os relatos devem conter falas de figuras relevantes referente ao tema e disciplina solicitados. Disciplina: Historia Tema: Segunda guerra mundial",
      temperature: 0.4,
      max_tokens: 2048,
    });
    console.log(response.data.choices[0].text);

    return res.status(200).json({ text: response.data.choices[0].text });
  } else {
    res.status(200).json({ text: "Invalid prompt provided." });
  }
});

// OK
app.get("/topicos", async (req, res) => {
  req.body.prompt = "string";

  if (typeof req.body.prompt === "string") {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt:
        "Olá, comporte-se como um especialista em HISTORIA - FASCISMO, e liste os principais tópicos sobre ele. Liste o maior número de tópicos possível.",
      temperature: 0.4,
      max_tokens: 2048,
    });

    return res.status(200).json({ text: response.data.choices[0].text });
  } else {
    res.status(200).json({ text: "Invalid prompt provided." });
  }
});

// OK
app.post("/resposta", async (req, res) => {
  console.log(req.body.prompt);
  if (typeof req.body.prompt === "string") {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `de forma simples e curta me responda essas questões ${req.body.prompt}`,
      temperature: 0.4,
      max_tokens: 2048,
    });

    return res.status(200).json({ text: response.data.choices[0].text });
  } else {
    res.status(200).json({ text: "Invalid prompt provided." });
  }
});

app.get("/imagewm", async (req, res) => {
  req.body.prompt = "string";
  if (typeof req.body.prompt === "string") {
    const response = await openai.createImage({
      prompt: ` Crie uma imagem que represente um corpo humano atlético e definido, destacando os músculos tonificados, com um fundo abstrato no estilo contemporâneo.`,
      n: 1,
      size: "512x512",
    });

    res.status(200).json({ text: response.data.data[0].url });
  } else {
    res.status(200).json({
      text: "https://images.dog.ceo/breeds/ridgeback-rhodesian/n02087394_1722.jpg",
    });
  }
});

// TODO
app.post("/chat", async (req, res) => {
  const subjects = [
    "Língua Portuguesa.",
    "Literatura.",
    "Inglês.",
    "Espanhol.",
    "Artes.",
    "Educação Física.",
    "História.",
    "Geografia.",
    "Sociologia.",
    "Filosofia.",
    "Biologia.",
    "Química.",
    "Física.",
    "Matemática.",
  ];

  if (typeof req.body.prompt === "string") {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt:
        req.body.prompt +
        "-essa pergunta tem a ver com alguma dessas disciplinas? Língua Portuguesa, Literatura, Inglês, Espanhol, Artes, Educação Física, História, Geografia, Sociologia, Filosofia,  Biologia, Química ,Física, Matemática. se tiver, responda em única palavra qual seria a disciplinas com um ponto final ao dizer qual disciplinas. Caso não tenha, responda que não tem a ver com nenhuma disciplina.",
      temperature: 0,
      max_tokens: 2048,
    });

    console.log(completion.data.choices[0].text);

    if (subjects.includes(completion.data.choices[0].text.split("\n")[2])) {
      const questionUser = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: req.body.prompt,
        temperature: 0.4,
        max_tokens: 2048,
      });
      res.status(200).json({ text: questionUser.data.choices[0].text });
    } else {
      res.status(200).json({
        text: completion.data.choices[0].text,
      });
    }
  } else {
    res.status(200).json({
      text: "https://images.dog.ceo/breeds/ridgeback-rhodesian/n02087394_1722.jpg",
    });
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server ${port}`));
