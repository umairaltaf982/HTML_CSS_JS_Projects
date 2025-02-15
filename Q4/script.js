const rollNumberInput = document.getElementById("rollNumber");
const generateAccountBtn = document.getElementById("generateAccount");
const accountNumberDisplay = document.getElementById("accountNumber");
const balanceDisplay = document.getElementById("balance");
const amountInput = document.getElementById("amount");
const depositBtn = document.getElementById("depositBtn");
const withdrawBtn = document.getElementById("withdrawBtn");
const transactionHistory = document.getElementById("transactionHistory");
const downloadBtn = document.getElementById("downloadHistory");

let accountNumber = "";
let balance = 0;
let transactions = [];

const generateAccount = () => {
    const rollNumber = rollNumberInput.value.trim();
    if (!rollNumber || isNaN(rollNumber)) {
        alert("Please enter a valid numeric roll number.");
        return;
    }

    accountNumber = `ACC-${rollNumber}`;
    balance = parseInt(rollNumber[rollNumber.length - 1]) * 1000;

    accountNumberDisplay.textContent = accountNumber;
    balanceDisplay.textContent = balance;
    
    document.getElementById("accountDetails").classList.remove("hidden");
    document.getElementById("transaction-section").classList.remove("hidden");
    downloadBtn.classList.remove("hidden");

    transactions = [];
    transactionHistory.innerHTML = "";
};

const updateUI = () => {
    balanceDisplay.textContent = balance;
    transactionHistory.innerHTML = transactions
        .map(trx => `<li class="transaction-item">${trx}</li>`)
        .join("");
};

const deposit = () => {
    let amount = parseInt(amountInput.value);
    let rollNumber = parseInt(rollNumberInput.value);

    if (!amount || amount <= 0 || amount % rollNumber !== 0) {
        alert(`Deposit amount must be a multiple of your roll number (${rollNumber}).`);
        return;
    }

    balance += amount;
    transactions.push(`Deposited: PKR ${amount}`);
    updateUI();
};

const withdraw = () => {
    let amount = parseInt(amountInput.value);
    let maxWithdraw = balance * 0.8;

    if (!amount || amount <= 0 || amount > maxWithdraw) {
        alert(`Invalid withdrawal amount. Maximum allowed: PKR ${maxWithdraw}`);
        return;
    }

    balance -= amount;
    transactions.push(`Withdrew: PKR ${amount}`);
    updateUI();
};

const downloadHistory = () => {
    let text = transactions.join("\n");
    let blob = new Blob([text], { type: "text/plain" });
    let a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "transaction_history.txt";
    a.click();
};

generateAccountBtn.addEventListener("click", generateAccount);
depositBtn.addEventListener("click", deposit);
withdrawBtn.addEventListener("click", withdraw);
downloadBtn.addEventListener("click", downloadHistory);