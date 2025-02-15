const rollNumberInput = document.getElementById("rollNumber");
const applyDiscountBtn = document.getElementById("applyDiscount");
const productList = document.getElementById("productList");
const promoCodeInput = document.getElementById("promoCode");
const applyPromoBtn = document.getElementById("applyPromo");
const originalPriceDisplay = document.getElementById("originalPrice");
const discountPercentDisplay = document.getElementById("discountPercent");
const finalPriceDisplay = document.getElementById("finalPrice");
const checkoutBtn = document.getElementById("checkoutBtn");

let maxDiscount = 50;
let purchaseCount = 0;
let discountPercent = 0;
let promoDiscount = 0;

const products = [
    { name: "Laptop", price: 50000 },
    { name: "Phone", price: 25000 },
    { name: "Tablet", price: 15000 },
    { name: "Headphones", price: 5000 },
];

productList.innerHTML = products
    .map((product, index) => 
        `<li class="product-item">
            <input type="checkbox" id="product-${index}" data-price="${product.price}">
            <label for="product-${index}">${product.name} - PKR ${product.price}</label>
        </li>`
    ).join("");

const extractDiscount = (rollNumber) => {
    const digits = rollNumber.match(/\d+/g)?.join("") || "";
    if (digits.length < 4) return 0;
    return Math.min(parseInt(digits.substring(1, 3)), maxDiscount);
};

const calculatePrice = () => {
    const selectedProducts = Array.from(document.querySelectorAll("input[type='checkbox']:checked"));
    let originalPrice = selectedProducts
        .map(product => parseInt(product.dataset.price))
        .reduce((sum, price) => sum + price, 0);

    let discountAmount = (originalPrice * discountPercent) / 100;
    let promoAmount = (originalPrice * promoDiscount) / 100;
    let finalPrice = originalPrice - discountAmount - promoAmount;

    originalPriceDisplay.textContent = originalPrice;
    discountPercentDisplay.textContent = `${discountPercent + promoDiscount}%`;
    finalPriceDisplay.textContent = finalPrice.toFixed(2);
    
    checkoutBtn.disabled = originalPrice === 0;
};

applyDiscountBtn.addEventListener("click", () => {
    const rollNumber = rollNumberInput.value.trim();
    if (!rollNumber) {
        alert("Please enter a valid roll number.");
        return;
    }

    discountPercent = extractDiscount(rollNumber);
    calculatePrice();
});

applyPromoBtn.addEventListener("click", () => {
    const promoCode = promoCodeInput.value.trim().toUpperCase();
    if (promoCode === "STUDENT10") {
        promoDiscount = 10;
    } else {
        promoDiscount = 0;
    }
    calculatePrice();
});

document.querySelectorAll("input[type='checkbox']").forEach(checkbox => {
    checkbox.addEventListener("change", calculatePrice);
});

checkoutBtn.addEventListener("click", () => {
    purchaseCount++;
    if (purchaseCount >= 2) maxDiscount = 60;

    alert("Purchase successful!");
    document.querySelectorAll("input[type='checkbox']").forEach(checkbox => checkbox.checked = false);
    calculatePrice();
});
