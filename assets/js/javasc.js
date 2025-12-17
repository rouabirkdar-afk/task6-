const prev = document.querySelector("#prev")
const next = document.querySelector("#next")
const search = document.querySelector("#search")
const submit = document.querySelector("#submit")
const category = document.querySelector("#category")
const sort = document.querySelector("#sort")
const resultsList = document.getElementById('result');
const slider = document.querySelector('#slider');


console.log(search, submit, sort, result)


localStorage.setItem("products", JSON.stringify([
    { name: "Girl's short and t-shirt", price: 20, category: "girl", img: "assets/img/OIP.webp" },
    { name: "Girl's dress", price: 25, category: "girl", img: "assets/img/OIP (1).webp" },
    { name: "Girl's jeans", price: 18, category: "girl", img: "assets/img/OIP (3).webp" },
    { name: "Girl's winter clothe", price: 45, category: "girl", img: "assets/img/OIP (2).webp" },
    { name: "boy's clothe", price: 40, category: "boy", img: "assets/img/OIP (4).webp" },
    { name: "boy's jeans and t-shirt", price: 30, category: "boy", img: "assets/img/OIP (5).webp" },
    { name: "boy's short and t-shirt", price: 20, category: "boy", img: "assets/img/تنزيل.webp" },
]));


let products = JSON.parse(localStorage.getItem("products")) || [];

function renderSlider(productsDis) {
    slider.innerHTML = '';

    productsDis.forEach(product => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');

        cardDiv.innerHTML =
            ` <div class="att">
                <h3>${product.name}</h3>
                <h4>Price: ${product.price} $</h4>
                <h4>Category: ${product.category}</h4>
            </div>
            <img class="pictcher" src="${product.img}" alt="${product.name}">`
            ;

        slider.appendChild(cardDiv);
    });
}

function handle(search, category, sort) {
    let filteredProducts = [...products];

    if (search) {
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(search.toLowerCase())
        );
    }

    if (category !== 'all') {
        filteredProducts = filteredProducts.filter(product =>
            product.category.toLowerCase() === category.toLowerCase()
        );
    }

    if (sort === 'asc') {
        filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sort === 'desc') {
        filteredProducts.sort((a, b) => a.price - b.price);
    }

    renderSlider(filteredProducts);

}
submit.addEventListener('click', (event) => {
    event.preventDefault();
    handle(search.value, category.value, sort.value);
});
category.addEventListener('change', () => {
    handle(search.value, category.value, sort.value);
});
sort.addEventListener('change', () => {
    handle(search.value, category.value, sort.value);
});

let count = 0
function updateSlid() {
    const currc = document.querySelectorAll("#slider .card");

    currc.forEach(card => {
        card.style.transform = `translateX(-${100 * count}%)`;
    });
}

prev.addEventListener("click", () => {
    const currc = document.querySelectorAll("#slider .card");
    
    if (count === 0) {
        count = currc.length - 3 ;
    }
    else {
        count--;
    }
    updateSlid();
});
next.addEventListener("click", () => {
    const currc = document.querySelectorAll("#slider .card");
    if (count == currc.length - 3) {
        count = 0 ;
    }
    else {
        count++ ;
    }
    updateSlid();
});


renderSlider(products);

