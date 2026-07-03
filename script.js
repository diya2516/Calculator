const display = document.getElementById("display");
let history = JSON.parse(localStorage.getItem("calculatorHistory")) || [];

function appendValue(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function deleteLast() {
    display.value = display.value.slice(0, -1); 
}

function calculate() {
    if (display.value === "") return;
    try {
        let expression = display.value;
        let result = eval(expression);
        history.push(expression + " = " + result);
        localStorage.setItem(
            "calculatorHistory",
            JSON.stringify(history));
        display.value = result;
    } catch {
        display.value = "Error";
    }
}

function toggleMenu() {
    const menu = document.getElementById("dropdownMenu");
    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}

function openHistory() {
    document.getElementById("calculatorPage").style.display = "none";
    document.getElementById("historyPage").style.display = "block";
    document.getElementById("dropdownMenu").style.display = "none";
    loadHistory();
}

function closeHistory() {
    document.getElementById("historyPage").style.display = "none";
    document.getElementById("calculatorPage").style.display = "block";
}

function loadHistory() {
    const historyList = document.getElementById("historyList");
    historyList.innerHTML = "";
    if (history.length === 0) {
        historyList.innerHTML =
            "<p style='text-align:center;font-size:22px;'>No History</p>";
        return;
    }
    for (let i = history.length - 1; i >= 0; i--) {
        const item = document.createElement("div");
        item.className = "history-item";
        item.textContent = history[i];
        historyList.appendChild(item);
    }
}

function clearHistory() {
    if (confirm("Delete all history?")) {
        history = [];
        localStorage.removeItem("calculatorHistory");
        loadHistory();
    }
}

window.onclick = function(event) {
    if (!event.target.matches(".menu-btn")) {
        document.getElementById("dropdownMenu").style.display = "none";
    }
};
