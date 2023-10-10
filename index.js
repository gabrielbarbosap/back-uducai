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
app.post("/resumo", async (req, res) => {
  7;
  console.log(req.body);
  req.body.prompt = "string";

  if (typeof req.body.prompt === "string") {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Olá, ChatGPT! Se comporte como um um professor. Gostaria de solicitar sua ajuda para criar resumos de disciplinas escolares abordadas pelos professores. Isso permitirá que os alunos utilizem o resumo como base ou alternativa ao que foi ensinado em sala de aula, preparando-os para discussões posteriores e atividades relacionadas ao tema. Por favor, crie um resumo conciso sobre o tópico de ${req.body.subject} - ${req.body.theme}. O objetivo é fornecer uma visão geral do assunto, abrangendo as principais informações de forma clara e sucinta, incluindo exemplos práticos relacionados ao tópico para facilitar a compreensão.`,
      temperature: 0.4,
      max_tokens: 2048,
    });

    return res.status(200).json({ text: response.data.choices[0].text });
  } else {
    res.status(200).json({ text: "Invalid prompt provided." });
  }
});

app.post("/pergunta-enem", async (req, res) => {
  req.body.prompt = "string";

  if (typeof req.body.prompt === "string") {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Desenvolva uma pergunta de múltipla escolha, no estilo do ENEM com alta dificuldade, sobre ${req.body.theme}. Certifique-se de que a pergunta seja desafiadora, com alternativas bem elaboradas, incluindo a alternativa correta. Lembre-se de não me informar a resposta correta no final.`,

      temperature: 0.3,
      max_tokens: 2048,
    });

    return res.status(200).json({ text: response.data.choices[0].text });
  } else {
    res.status(200).json({ text: "Invalid prompt provided." });
  }
});

app.post("/resposta-enem", async (req, res) => {
  req.body.prompt = "string";

  if (typeof req.body.prompt === "string") {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${req.body.question}
      
      a resposta correta para essa pergunta é a letra ${req.body.resp}? se nao for me explique o motivo da correta`,
      temperature: 0.3,
      max_tokens: 2048,
    });

    return res.status(200).json({ text: response.data.choices[0].text });
  } else {
    res.status(200).json({ text: "Invalid prompt provided." });
  }
});

app.post("/corretor-redacao", async (req, res) => {
  if (typeof req.body.prompt === "string") {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Você é um corretor do ENEM e deve fazer a correção da prova de redação
      do ENEM considerando cinco competências
      
      1. Domínio da norma padrão da língua escrita
      
      2. Compreensão da proposta de redação e aplicação de conceitos 
      das várias áreas do conhecimento para o desenvolvimento do tema 
      nos limites estruturais do texto dissertativo-argumentativo
      
      3. Capacidade de selecionar, relacionar, organizar e interpretar 
      informações, fatos, opiniões e argumentos em defesa de um ponto 
      de vista
      
      4. Conhecimento dos mecanismos linguísticos necessários à 
      construção da argumentação
      
      5. Elaboração de proposta de intervenção para o problema 
      abordado, respeitados os direitos humanos.
      
      A pontuação atribuída a cada competência pode variar até 200 pontos. 
      A nota máxima da redação é de mil pontos. 
      
      Com esses critérios, faça a correção da redação abaixo e 
      apresente os resultados, seja breve: 
      
      ${req.body.prompt}`,
      temperature: 0.1,
      max_tokens: 2048,
    });

    return res.status(200).json({ text: response.data.choices[0].text });
  } else {
    res.status(200).json({ text: "Invalid prompt provided." });
  }
});

// OK
app.post("/caracteristica", async (req, res) => {
  req.body.prompt = "string";

  if (typeof req.body.prompt === "string") {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `olá, comporte-se como um especialista no tema ${req.body.subject} - ${req.body.theme}, e liste os principais caracteristicas sobre o tema. Seja o mais detalhista possível e cite exemplos práticos.`,
      temperature: 0.4,
      max_tokens: 2048,
    });

    return res.status(200).json({ text: response.data.choices[0].text });
  } else {
    res.status(200).json({ text: "Invalid prompt provided." });
  }
});

// OK
app.post("/causa", async (req, res) => {
  req.body.prompt = "string";

  if (typeof req.body.prompt === "string") {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `olá, comporte-se como um especialista em ${req.body.subject} - ${req.body.theme}, e liste os principais causas sobre ele. Seja o mais detalhista possível e cite exemplos práticos.`,
      temperature: 0.4,
      max_tokens: 2048,
    });
    return res.status(200).json({ text: response.data.choices[0].text });
  } else {
    res.status(200).json({ text: "Invalid prompt provided." });
  }
});

// OK
app.post("/cronograma-aluno", async (req, res) => {
  req.body.prompt = "string";

  if (typeof req.body.prompt === "string") {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `olá Chat,Gostaria de criar um material de estudo, que será um cronograma destinado a um estudante. Neste cronograma deve conter os temas que o aluno deve estudar para que o assunto principal que foi solicitado seja mais completamente abordado levando em consideração a quantidade de dias e horas por dia que o aluno vai passar estudando.Tema: ${req.body.theme}, Dias: ${req.body.days},  Horas por dia: ${req.body.hours} horas .A resposta deve vir em forma de lista, separando os dias em tópicos e o tema abordado neste respectivo dia em subtópicos. Caso seja em apenas um dia, apresente somente os subtópicos..`,
      temperature: 0.4,
      max_tokens: 2048,
    });
    return res.status(200).json({ text: response.data.choices[0].text });
  } else {
    res.status(200).json({ text: "Invalid prompt provided." });
  }
});

// OK
app.post("/cronograma-professor", async (req, res) => {
  req.body.prompt = "string";

  if (typeof req.body.prompt === "string") {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `olá, ChatGPT! se comporte como um especialista em criar roteiro de aulas. Levando em consideração a matéria, tema a ser abordado, aulas que o professor terá para abordar o assunto. Aqui estão as informações necessárias :Matéria: ${req.body.subject}, Tema: ${req.body.theme}, Quantidade de aulas para abordar o tema: ${req.body.days}. Estrutura do roteiro: O roteiro deve ser detalhado de forma eficaz para o professor entender o que ele deverá abordar em cada dia de aula. Cada tópico principal deve ser acompanhado por 1 a 4 subtópicos. Quanto mais relevante e extenso for o tema, mais subtópicos podem ser incluídos.`,
      temperature: 0.4,
      max_tokens: 2048,
    });
    return res.status(200).json({ text: response.data.choices[0].text });
  } else {
    res.status(200).json({ text: "Invalid prompt provided." });
  }
});

app.post("/cronograma-professor-detalhado", async (req, res) => {
  req.body.prompt = "string";

  if (typeof req.body.prompt === "string") {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${req.body.aula}, seja coerente com o tempo de aula(isso é fundamental, cada hora de aula equivale a 60 minutos)`,
      temperature: 0.4,
      max_tokens: 2048,
    });
    return res.status(200).json({ text: response.data.choices[0].text });
  } else {
    res.status(200).json({ text: "Invalid prompt provided." });
  }
});

// OK
app.post("/exercicio-professor", async (req, res) => {
  req.body.prompt = "string";

  if (typeof req.body.prompt === "string") {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `olá chat ! Comporte-se como um professor que está criando exercícios de fixação para seus alunos. Você deve criar exercícios de nível médio para os alunos, levando em consideração os temas e tópicos abordados na aula. Os exercícios devem ser de múltipla escolha, tendo cada um entre 4 e 5 opções e somente uma correta. Ao lado de cada questão deve conter o gabarito para que o professor possa corrigir mais facilmente, GERE O MAXIMO DE QUESTOES POSSIVEIS. Tema: Tópico: ${req.body.subject} - ${req.body.theme}`,
      temperature: 0.4,
      max_tokens: 2048,
    });
    return res.status(200).json({ text: response.data.choices[0].text });
  } else {
    res.status(200).json({ text: "Invalid prompt provided." });
  }
});

// OK
app.post("/exercicio-aluno", async (req, res) => {
  req.body.prompt = "string";

  if (typeof req.body.prompt === "string") {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `olá chat ! Comporte-se como um professor que está criando exercícios de fixação para seus alunos. Você deve criar exercícios de nível médio para os alunos, levando em consideração os temas e tópicos abordados na aula. Os exercícios devem ser de múltipla escolha, tendo cada um entre 4 e 5 opções e somente uma correta, lembre de não não informar qual a resposta correta. GERE O MAXIMO DE QUESTOES POSSIVEIS. Tema: Tópico: ${req.body.subject} - ${req.body.theme}`,
      temperature: 0.4,
      max_tokens: 2048,
    });
    return res.status(200).json({ text: response.data.choices[0].text });
  } else {
    res.status(200).json({ text: "Invalid prompt provided." });
  }
});

// OK
app.post("/consequencia", async (req, res) => {
  req.body.prompt = "string";

  if (typeof req.body.prompt === "string") {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `olá, comporte-se como um especialista em ${req.body.subject} - ${req.body.theme}, e liste os principais consequencias sobre ele. Seja o mais detalhista possível e cite exemplos práticos.`,
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
app.post("/formulas-exatas", async (req, res) => {
  req.body.prompt = "string";

  if (typeof req.body.prompt === "string") {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `olá chat. Se comporte como uma ótima fonte para obter fórmulas e regras relacionadas a matérias exatas da escola, como matemática, física, química, geometria e biologia. Liste as principais fórmulas relacionadas a disciplina e tema informados abaixo, as elencando em tópicos, além de uma breve descrição quanto a suas finalidades reais. Disciplina: Matemática Tema: Equação de segundo grau`,
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
app.post("/fonte-estudos", async (req, res) => {
  req.body.prompt = "string";

  if (typeof req.body.prompt === "string") {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `olá chat. Se comporte como uma ótima referência para indicar fontes de estudo. Gostaria de obter boas fontes de estudo no idioma português sobre os temas mais relevantes, referente a disciplina e tema descritos abaixo. As fontes serão usadas como base para que alunos possam estudar melhor.  Disciplina: ${req.body.subject}  Tema: ${req.body.theme}`,
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
app.post("/ludico", async (req, res) => {
  req.body.prompt = "string";

  if (typeof req.body.prompt === "string") {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `me ensine sobre ${req.body.theme} da disciplina ${req.body.subject} como se fosse ${req.body.ludic}, me conte uma longa história`,
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
app.post("/curiosidade", async (req, res) => {
  req.body.prompt = "string";

  if (typeof req.body.prompt === "string") {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `olá chat. Se comporte como uma enciclopédia de curiosidades relacionadas a temas aleatórios. Os temas aleatórios serão descritos posteriormente neste prompt, levando em consideração a disciplina e tema. Porém você deve me listar 3, 4 ou 5 curiosidades relacionadas ao tema solicitado. As curiosidades devem ser listadas em tópicos e conter um breve resumo. Disciplina: ${req.body.subject} Tema: ${req.body.theme}`,
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
app.post("/relato", async (req, res) => {
  req.body.prompt = "string";

  if (typeof req.body.prompt === "string") {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `olá chat. Se comporte com uma ótima fonte de relatos de pessoas reais, sobre tópicos aleatórios. Os tópicos serão descritos posteriormente neste prompt, levando em consideração a disciplina e tema solicitado. Os relatos devem conter falas de figuras relevantes referente ao tema e disciplina solicitados. Disciplina: ${req.body.subject} Tema: Segunda guerra mundial`,
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
app.post("/topicos", async (req, res) => {
  req.body.prompt = "string";

  if (typeof req.body.prompt === "string") {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `olá, comporte-se como um especialista em ${req.body.subject} - ${req.body.theme}, e liste os principais tópicos sobre ele. Liste o maior número de tópicos possível.`,
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

app.post("/imagewm", async (req, res) => {
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
    "${req.body.subject}.",
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
        `-essa pergunta tem a ver com alguma dessas disciplinas? Língua Portuguesa, Literatura, Inglês, Espanhol, Artes, Educação Física, ${req.body.subject}, Geografia, Sociologia, Filosofia,  Biologia, Química ,Física, Matemática. se tiver, responda em única palavra qual seria a disciplinas com um ponto final ao dizer qual disciplinas. Caso não tenha, responda que não tem a ver com nenhuma disciplina.`,
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
