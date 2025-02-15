const stringInput = document.getElementById("userString");
const rollNumberInput = document.getElementById("rollNumber");
const resultContainer = document.getElementById("resultList");
const transformBtn = document.getElementById("transformBtn");

const calculateSkipInterval = (rollNumber) => {
    return rollNumber.split("").reduce((sum, digit) => sum + parseInt(digit, 10), 0);
};

const selectiveReverse = (str, skipInterval) => {
    if (skipInterval > str.length) 
        return str;

    let charArray = str.split("");
    let reversedChars = charArray.filter((_, i) => (i + 1) % skipInterval !== 0).reverse();

    let index = 0;
    return charArray
        .map((char, i) => ((i + 1) % skipInterval === 0 ? char : reversedChars[index++]))
        .join("");
};

transformBtn.addEventListener("click", () => {
    const inputStr = stringInput.value.trim();
    const rollNumber = rollNumberInput.value.trim();

    if (inputStr === "" || rollNumber === "" || isNaN(rollNumber)) {
        alert("Please enter both a valid string and a roll number.");
        return;
    }

    const skipInterval = calculateSkipInterval(rollNumber);
    const transformedStr = selectiveReverse(inputStr, skipInterval);

    const resultItem = document.createElement("li");
    resultItem.classList.add("result-item");
    resultItem.innerHTML = `<strong>Original:</strong> ${inputStr} <br> 
                            <strong>Transformed:</strong> ${transformedStr} <br>
                            <strong>Skip Interval (N):</strong> ${skipInterval}`;

    resultContainer.prepend(resultItem);
});
