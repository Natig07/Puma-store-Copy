const form = document.querySelector(".edit-form");
const store_container = document.querySelector(".store-container");
const cart_container = document.querySelector(".puma-busket");
const total_price = document.getElementById("total_price");
const pr_name_input = document.getElementById("pr_name_input");
const price_input = document.getElementById("price_input");
const url_input = document.getElementById("url_input");
const delete_all_btn = document.querySelector(".delete-all");
const user_logo = document.getElementById("user_logo");
const cart_icon = document.getElementById("cart_icon");

let products = [{
        img_link: "./images/blouse.png",
        pr_type: "Winter blouse",
        price: 29.99,
        count: 1
    },
    {
        img_link: "./images/cloth-img-1.png",
        pr_type: "Black-red Hoodie",
        price: 24.49,
        count: 1

    },
    {
        img_link: "./images/coat-1.png",
        pr_type: "Men coat",
        price: 39.99,
        count: 1

    },
    {
        img_link: "./images/coat-2.png",
        pr_type: "Women coat",
        price: 35.99,
        count: 1

    },
    {
        img_link: "./images/glasses-1.png",
        pr_type: "Glasses",
        price: 59.39,
        count: 1

    },
    {
        img_link: "./images/w-cap-1.png",
        pr_type: "Winter cap",
        price: 19.29,
        count: 1

    },
    {
        img_link: "./images/shoes-1.png",
        pr_type: "Sneaker",
        price: 20.99,
        count: 1

    },
    {
        img_link: "./images/Sweater.png",
        pr_type: " Men sweater",
        price: 32.69,
        count: 1

    }
]
let last_user = localStorage.getItem("last_user") || "s";

let cart = [];
fillStore();

let total = 0;


function fillStore() {
    store_container.innerHTML = "";
    products.forEach((obj, index) => {
        const innerdiv = document.createElement("div");
        const pr_image = document.createElement("img");
        pr_image.src = obj.img_link;
        pr_image.alt = obj.pr_type;
        pr_image.className = "obj-name";

        const h4 = document.createElement("h4");
        h4.innerText = obj.pr_type;

        const p = document.createElement("p");
        p.innerText = "Price: " + obj.price + "$";

        const addcart_btn = document.createElement("button");
        addcart_btn.className = "add_cart";
        const btn_image1 = document.createElement("img");
        btn_image1.className = "img-1";
        btn_image1.src = "./images/cart-shopping-fast-svgrepo-com.svg";

        const btn_image2 = document.createElement("img");
        btn_image2.className = "img-2";
        btn_image2.src = "./images/cart-check-svgrepo-com.svg";

        const span_text = document.createElement("span");
        span_text.innerText = "Add cart";

        addcart_btn.append(btn_image1, btn_image2, span_text);
        //<button><img class="img-1" src="./images/cart-shopping-fast-svgrepo-com.svg"><img class="img-2" src="./images/cart-check-svgrepo-com.svg"><span>Buy</span></button>
        addcart_btn.onclick = () => {
            let flag = false;
            for (let i = 0; i < cart.length; i++) {
                if (cart[i].pr_type === obj.pr_type) {
                    cart[i].count += 1;
                    total = parseFloat((total + obj.price).toFixed(2));
                    flag = true;

                    cart_icon.classList.remove('cart-move');
                    void cart_icon.offsetWidth;
                    cart_icon.classList.add('cart-move');

                    break;
                }
            }
            if (!flag) {
                cart.push(obj);
                total = parseFloat((total + obj.price).toFixed(2));
                cart_icon.classList.remove('cart-move');
                void cart_icon.offsetWidth;
                cart_icon.classList.add('cart-move');


            }

            fillCart();
            total_price.innerText = "Total price: " + total + "$";
            this.blur();

        }

        const delete_btn = document.createElement("button");
        delete_btn.className = "delete";
        delete_btn.innerText = "Delete";
        const trash_icon = document.createElement("i");
        trash_icon.className = "fa-regular fa-trash-can";
        trash_icon.style.margin = "0 6px";
        delete_btn.append(trash_icon);
        delete_btn.onclick = () => {
            products.splice(index, 1);
            fillStore();
        }

        if (last_user != "Natig") {
            delete_btn.style.display = "none";
            form.style.display = "none";
            innerdiv.style.width = "24%";

        }
        user_logo.innerText = last_user[0];

        innerdiv.append(pr_image, h4, p, addcart_btn, delete_btn);
        store_container.appendChild(innerdiv);
    });
    store_container.style.animation = "store-move 2s forwards";

}



function fillCart() {
    cart_container.innerHTML = "";
    cart.map((obj, index) => {
        const innerdiv = document.createElement("div");

        const img = document.createElement("img");
        img.src = obj.img_link;
        img.alt = obj.pr_type;

        const pr_name = document.createElement("h4");
        pr_name.innerText = obj.pr_type;

        const count_div = document.createElement("div");
        count_div.className = "count-div";

        const minuse_btn = document.createElement("button");
        minuse_btn.innerText = "-";
        minuse_btn.className = "minuse-button";
        minuse_btn.onclick = () => {
            if (obj.count > 0) {
                obj.count--;
                total = parseFloat((total - obj.price).toFixed(2));
                fillCart();
            }
        }

        const count_span = document.createElement("span");
        count_span.innerText = obj.count;

        const pluse_btn = document.createElement("button");
        pluse_btn.className = "pluse-button";
        pluse_btn.innerText = "+";
        pluse_btn.onclick = () => {
            if (obj.count < 10) {
                obj.count++;
                total = parseFloat((total + obj.price).toFixed(2));
                fillCart()

            }
            total_price.innerText = "Total price: " + total + "$";

        }

        const price = document.createElement("p");
        price.innerText = "Price: " + obj.price + "$";

        const delete_btn = document.createElement("button");
        delete_btn.innerText = "Remove";
        delete_btn.className = "delete";

        delete_btn.onclick = () => {
            cart.splice(index, 1);
            total = parseFloat((total - (obj.count * obj.price)).toFixed(2));
            total_price.innerText = "Total price: " + total + "$";
            obj.count = 1;

            fillCart()
        }

        total_price.innerText = "Total price: " + total + "$";

        count_div.append(minuse_btn, count_span, pluse_btn);

        innerdiv.append(img, pr_name, count_div, price, delete_btn);

        cart_container.appendChild(innerdiv);
    })

}

function Additem() {
    event.preventDefault();
    let obj = {
        img_link: url_input.value,
        pr_type: pr_name_input.value,
        price: parseFloat(price_input.value),
        count: 1
    }
    products.push(obj);
    fillStore();
    fillCart();
    form.reset();
}

delete_all_btn.onclick = () => {
    cart.map((obj) => {
        obj.count = 1;
    })
    cart = [];
    cart_container.innerHTML = '';
    total = 0;
    total_price.innerText = "Total price: " + total + "$";
}
const Preloader = document.getElementById('preloader');
window.addEventListener("load", () => {
    const preloader = document.getElementById('preloader');
    const gifSrc = './images/ezgif.com-animated-gif-maker.gif'; // Replace with your GIF URL

    // Append a unique query string to the GIF URL to prevent caching
    preloader.src = `${gifSrc}?t=${new Date().getTime()}`;

    // Add the class to start the animation
    preloader.classList.add('animate');
});