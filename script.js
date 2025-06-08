//Chuyển sang trang thanh toán khi nhấn nút "Mua ngay" và thêm sản phẩm vào giỏ hàng
function addToCartAndCheckout(button) {
    const product = {
        name: button.getAttribute('data-name'),
        price: parseInt(button.getAttribute('data-price')),
        image: button.getAttribute('data-image'),
        quantity: 1
    };

    // Đọc giỏ hàng hiện tại
    let cartData = JSON.parse(localStorage.getItem('cart')) || [];

    // Kiểm tra sản phẩm đã có trong giỏ chưa
    const existingItem = cartData.find(item => item.name === product.name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartData.push(product);
    }

    // Ghi lại giỏ hàng
    localStorage.setItem('cart', JSON.stringify(cartData));
    localStorage.setItem('checkoutCart', JSON.stringify(cartData)); // <-- thêm dòng này

    // Chờ 100ms đảm bảo xong
    setTimeout(() => {
        window.location.href = 'thanhtoan.html';
    }, 100);
    
}


// Hàm thêm sản phẩm vào giỏ hàng
function addToCart(button) {
    const product = {
        name: button.getAttribute('data-name'),
        price: parseInt(button.getAttribute('data-price')),
        image: button.getAttribute('data-image'),
        quantity: 1
    };

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingProduct = cart.find(item => item.name === product.name);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Đã thêm vào giỏ hàng!');
}

//Dùng xóa ở giỏ hàng
function removeFromCartByIndex(index) {
    let cartData = JSON.parse(localStorage.getItem('cart')) || [];
    cartData.splice(index, 1); // Xoá sản phẩm theo vị trí
    localStorage.setItem('cart', JSON.stringify(cartData));
    renderCart(); // Gọi lại để cập nhật giao diện
}



//Dùng cho thanh toán ở giỏ hàng
function proceedToCheckout() {
    // Đọc giỏ hàng mới nhất
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];

    // Ghi vào checkoutCart cho trang thanhtoan.html đọc
    localStorage.setItem('checkoutCart', JSON.stringify(cartData));

    // Chuyển trang
    setTimeout(() => {
        window.location.href = 'thanhtoan.html';
    }, 100);
}





//Hàm rendercart để gọi từ giỏ hàng.html
function renderCart() {
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsTbody = document.getElementById('cart-items');
    const cartTotal = document.querySelector('.cart-total');

    let total = 0;
    cartItemsTbody.innerHTML = '';

    cartData.forEach((item, index) => {
        const price = Number(item.price);
        const quantity = Number(item.quantity);
        const itemTotal = price * quantity;
        total += itemTotal;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="img-cell">
                <i class="fas fa-times remove-icon" data-index="${index}" onclick="removeFromCartByIndex(${index})"></i>
                <img src="${item.image}" alt="${item.name}" />
            </td>
            <td><span class="product-name">${item.name}</span></td>
            <td><span class="product-price">${price.toLocaleString()}đ</span></td>
            <td>
                <input type="number" min="1" value="${quantity}" class="quantity-input" 
                       onchange="updateQuantity(${index}, this.value)">
            </td>
            <td><span class="product-total">${itemTotal.toLocaleString()}đ</span></td>
        `;
        cartItemsTbody.appendChild(tr);
    });

    cartTotal.textContent = `Tổng cộng: ${total.toLocaleString()}đ`;
}


//thêm sự kiên ép kiểu cho phần số lượng trong giỏ hàng, có thể thêm bớt
function updateQuantity(index, newQuantity) {
    let cartData = JSON.parse(localStorage.getItem('cart')) || [];

    if (cartData[index]) {
        cartData[index].quantity = parseInt(newQuantity);
    }

    localStorage.setItem('cart', JSON.stringify(cartData));

    // GỌI LẠI renderCart() để refresh lại bảng → đảm bảo đúng
    renderCart();
}

function buyQuick(button) {
    const quantityInput = document.getElementById('quantity');
    const quantity = parseInt(quantityInput?.value || '1');

    if (isNaN(quantity) || quantity <= 0) {
        alert("Vui lòng chọn số lượng hợp lệ.");
        return;
    }

    const name = button.getAttribute('data-name');
    const price = parseInt(button.getAttribute('data-price'));
    const image = button.getAttribute('data-image');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.name === name);

    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        cart.push({ name, price, image, quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('checkoutCart', JSON.stringify(cart));
    window.location.href = 'thanhtoan.html';
}


//Thiết kế cho nút mua ngay và icon giỏ hàng ở trang tatcasp.html
// Hàm dùng cho nút Mua ngay
function buyNow(button) {
    const name = button.getAttribute('data-name');
    const price = parseInt(button.getAttribute('data-price'));
    const image = button.getAttribute('data-image');
    const quantity = 1;

    // Lấy giỏ hàng từ localStorage (key: cart)
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Kiểm tra xem sản phẩm đã có trong giỏ chưa
    const existingProduct = cart.find(item => item.name === name);

    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        cart.push({ name, price, image, quantity });
    }

    // Lưu lại giỏ hàng vào localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Chuyển sang trang thanh toán
    window.location.href = 'thanhtoan.html';
}
// Hàm dùng cho icon giỏ hàng
function addToCartAndGoCart(button) {
    let cartData = JSON.parse(localStorage.getItem('cart')) || [];

    const product = {
        name: button.getAttribute('data-name'),
        price: parseInt(button.getAttribute('data-price')),
        image: button.getAttribute('data-image'),
        quantity: 1
    };

    // Kiểm tra xem sản phẩm đã có trong giỏ chưa
    const existingIndex = cartData.findIndex(item => item.name === product.name);
    if (existingIndex !== -1) {
        cartData[existingIndex].quantity += 1;
    } else {
        cartData.push(product);
    }

    // Lưu lại giỏ hàng
    localStorage.setItem('cart', JSON.stringify(cartData));

    // Chuyển sang trang giỏ hàng
    setTimeout(() => {
        window.location.href = 'giohang.html';
    }, 100);
}
function addDetailProductToCart() {
    const quantityInput = document.getElementById("quantity");
    const nameElement = document.getElementById("product-name");
    const priceElement = document.getElementById("product-price");
    const imageElement = document.getElementById("product-image");

    if (!quantityInput || !nameElement || !priceElement || !imageElement) {
        alert("Thiếu thông tin sản phẩm.");
        return;
    }

    let quantity = parseInt(quantityInput.value);
    if (isNaN(quantity) || quantity <= 0) {
        alert("Vui lòng chọn số lượng hợp lệ.");
        return;
    }

    const name = nameElement.innerText.trim();
    const price = parseInt(priceElement.innerText.replace(/[^\d]/g, ""));
    const image = imageElement.getAttribute("src");

    if (!name || isNaN(price) || !image) {
        alert("Dữ liệu sản phẩm không hợp lệ.");
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const index = cart.findIndex(item => item.name === name);

    if (index !== -1) {
        cart[index].quantity += quantity;
    } else {
        cart.push({ name, price, image, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`Đã thêm ${quantity} sản phẩm vào giỏ hàng!`);
    window.location.href = "giohang.html";
}
window.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById('cart-items')) {
        renderCart();
    }
});



