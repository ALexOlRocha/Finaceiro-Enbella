document.getElementById('open_btn').addEventListener('click', function () {
    document.getElementById('sidebar').classList.toggle('open-sidebar');
});

const transactionsUl = document.querySelector('#transactions');
const incomeDisplay = document.querySelector('#money-plus');
const expenseDisplay = document.querySelector('#money-minus');
const balanceDisplay = document.querySelector('#balance');
const form = document.querySelector('#form');
const inputTransactionName = document.querySelector('#text');
const inputTransactionAmount = document.querySelector('#amount');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// Exibe as transações na tela
const addTransactionIntoDOM = transaction => {
    const operator = transaction.amount < 0 ? '-' : '+';
    const CSSClass = transaction.amount < 0 ? 'minus' : 'plus';
    const amountWithoutOperator = Math.abs(transaction.amount);
    const li = document.createElement('li');

    li.classList.add(CSSClass);
    li.innerHTML = `
        ${transaction.name} <span>${operator} R$ ${amountWithoutOperator}</span>
        <button class="delete-btn" onClick="removeTransaction(${transaction.id})">x</button>
    `;
    transactionsUl.append(li);
};

// Atualiza os valores de saldo, receita e despesa
const updateBalanceValues = () => {
    const transactionsAmounts = transactions.map(transaction => transaction.amount);
    const total = transactionsAmounts
        .reduce((accumulator, transaction) => accumulator + transaction, 0)
        .toFixed(2);

    const income = transactionsAmounts
        .filter(amount => amount > 0)
        .reduce((accumulator, amount) => accumulator + amount, 0)
        .toFixed(2);

    const expense = Math.abs(
        transactionsAmounts
            .filter(amount => amount < 0)
            .reduce((accumulator, amount) => accumulator + amount, 0)
    ).toFixed(2);

    balanceDisplay.textContent = `R$ ${total}`;
    incomeDisplay.textContent = `R$ ${income}`;
    expenseDisplay.textContent = `R$ ${expense}`;
};

// Adiciona uma nova transação
const addTransaction = (event) => {
    event.preventDefault();

    const transactionName = inputTransactionName.value.trim();
    const transactionAmount = Number(inputTransactionAmount.value.trim());

    if (transactionName === '' || isNaN(transactionAmount)) return;

    const transaction = {
        id: generateID(),
        name: transactionName,
        amount: transactionAmount
    };

    transactions.push(transaction);
    addTransactionIntoDOM(transaction);
    updateBalanceValues();
    updateLocalStorage();

    inputTransactionName.value = '';
    inputTransactionAmount.value = '';
};

// Remove uma transação
const removeTransaction = (id) => {
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateBalanceValues();
    updateLocalStorage();
    init();
};

// Atualiza o localStorage
const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
};

// Gera um ID aleatório
const generateID = () => Math.round(Math.random() * 1000);

// Inicializa o aplicativo
const init = () => {
    transactionsUl.innerHTML = '';
    transactions.forEach(addTransactionIntoDOM);
    updateBalanceValues();
};

init();

form.addEventListener('submit', addTransaction);
