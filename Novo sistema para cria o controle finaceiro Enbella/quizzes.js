document.getElementById('open_btn').addEventListener('click', function () {
    document.getElementById('sidebar').classList.toggle('open-sidebar');
});


const questions = [
    {
        question: "O que é educação financeira?",
        answers: [
            { text: "A) Aprender a investir na bolsa de valores", correct: false },
            { text: "B) Controlar e gerenciar suas finanças pessoais", correct: true },
            { text: "C) Gastar dinheiro sem preocupação", correct: false }
        ]
    },
    {
        question: "O que é um orçamento?",
        answers: [
            { text: "A) Uma lista de compras", correct: false },
            { text: "B) Um plano para gastar dinheiro", correct: true },
            { text: "C) Um empréstimo bancário", correct: false }
        ]
    },
    {
        question: "Qual é a importância de economizar dinheiro?",
        answers: [
            { text: "A) Para comprar um carro novo", correct: false },
            { text: "B) Para garantir uma reserva financeira em caso de emergência", correct: true },
            { text: "C) Para gastar em festas", correct: false }
        ]
    },
    {
        question: "O que significa investir?",
        answers: [
            { text: "A) Gastar dinheiro em roupas", correct: false },
            { text: "B) Colocar dinheiro em algo que pode trazer retorno financeiro no futuro", correct: true },
            { text: "C) Comprar um celular novo", correct: false }
        ]
    },
    {
        question: "Qual é a principal vantagem de ter uma planilha financeira?",
        answers: [
            { text: "A) Ter uma visão clara de suas receitas e despesas", correct: true },
            { text: "B) Mostrar aos amigos que você é organizado", correct: false },
            { text: "C) Gastar mais dinheiro", correct: false }
        ]
    },
    {
        question: "O que é uma reserva de emergência?",
        answers: [
            { text: "A) Um fundo para emergências inesperadas", correct: true },
            { text: "B) Dinheiro para gastar em lazer", correct: false },
            { text: "C) Um empréstimo rápido", correct: false }
        ]
    },
    {
        question: "Por que é importante evitar dívidas?",
        answers: [
            { text: "A) Para não pagar juros elevados", correct: true },
            { text: "B) Para poder pedir mais empréstimos", correct: false },
            { text: "C) Para gastar todo o dinheiro", correct: false }
        ]
    },
    {
        question: "O que é um investimento de baixo risco?",
        answers: [
            { text: "A) Investir em ações de empresas novas", correct: false },
            { text: "B) Colocar dinheiro na poupança", correct: true },
            { text: "C) Gastar em um carro novo", correct: false }
        ]
    },
    {
        question: "Qual é a vantagem de investir a longo prazo?",
        answers: [
            { text: "A) Ganhos maiores ao longo do tempo", correct: true },
            { text: "B) Lucros imediatos", correct: false },
            { text: "C) Gastar mais em curto prazo", correct: false }
        ]
    },
    {
        question: "Por que é importante aprender sobre finanças?",
        answers: [
            { text: "A) Para ter controle sobre seu dinheiro e alcançar seus objetivos", correct: true },
            { text: "B) Para gastar sem limites", correct: false },
            { text: "C) Para impressionar outras pessoas", correct: false }
        ]
    }
];

const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const resultContainer = document.getElementById('result-container');
const resultMessage = document.getElementById('result-message');
const restartButton = document.getElementById('restart-btn');

let shuffledQuestions, currentQuestionIndex, correctAnswers;

document.addEventListener('DOMContentLoaded', () => {
    startGame();
});

function startGame() {
    resultContainer.classList.add('hide');
    questionContainerElement.classList.remove('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    correctAnswers = 0;
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    if (correct) {
        correctAnswers++;
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        showResult();
    }
}

function showResult() {
    questionContainerElement.classList.add('hide');
    resultContainer.classList.remove('hide');
    resultMessage.innerText = `Você acertou ${correctAnswers} de ${questions.length} perguntas.`;
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

restartButton.addEventListener('click', startGame);