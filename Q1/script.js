const products = [
    { 
        name: "Mobile Phone", 
        price: "$4,020", 
        image: "mobile.png", 
        description: "High Quality Camera. With Retina Display, and 10 Inches Screen. All kinds of Palmtop facilities available" 
    },
    { 
        name: "Smart Watch", 
        price: "$150", 
        image: "watch.png", 
        description: "Stay connected with fitness tracking, heart rate monitoring, notifications, and sleek design for everyday convenience and health insights." 
    },
    { 
        name: "Gaming Mouse", 
        price: "$60", 
        image: "mouse.png", 
        description: "Experience precision with an ergonomic design, customizable buttons, and adjustable DPI for enhanced gaming performance and comfort." 
    }
];

const container = document.querySelector(".shopping-elements");
const shopping = document.querySelector(".shopping-heading");

products.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("shopping-card");

    card.innerHTML = `
        <div class="card-front">
                    <img src="${product.image}" alt="" class="product-img">
                    <div class="product-details">
                        <h2 class="product-name">${product.name}</h2>
                        <h2 class="price">${product.price}</h2>
                    </div>
                </div>
                <div class="card-back">
                    <h3>${product.description}</h3>
                    <button class="buy-btn">Buy Now <img src="https://img.icons8.com/pastel-glyph/64/FFFFFF/shopping-cart--v2.png" alt="shopping-cart"/></button>
                </div>
    `;

    container.appendChild(card);
});

document.addEventListener("click", function(event) {
    if (event.target.classList.contains("buy-btn")) {
        const productName = event.target.closest(".shopping-card").querySelector(".product-name").innerText;
        console.log("Product Purchased:", productName);
    }
});

const darkModeToggle = document.getElementById("dark-mode-toggle");

darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
        document.body.style.backgroundImage = 'url("lightBg.png")';
        shopping.style.color="black";
        darkModeToggle.textContent="🌞";
        darkModeToggle.style.backgroundColor="white";
    } else {
        document.body.style.backgroundImage = 'url("background.png")';
        darkModeToggle.textContent="🌙";
        darkModeToggle.style.backgroundColor="black";
    }
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "center";
});

