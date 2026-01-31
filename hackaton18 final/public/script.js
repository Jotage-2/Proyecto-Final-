const myOrdersBtn = document.getElementById('myOrdersBtn');
const ordersModal = document.getElementById('ordersModal');

// 1. URL DINÁMICA: Importante para que funcione en Local y en Render
const API_URL = window.location.hostname.includes('localhost') 
    ? 'http://localhost:3001/api' 
    : '/api';

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let products = [];
let token = localStorage.getItem('token');
let currentUser = JSON.parse(localStorage.getItem('user'));

// Elementos DOM
const productsGrid = document.getElementById('productsGrid');
const cartIcon = document.getElementById('cartIcon');
const cartCount = document.getElementById('cartCount');
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const cartModal = document.getElementById('cartModal');
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const logoutBtn = document.getElementById('logoutBtn');
const userName = document.getElementById('userName');
const searchInput = document.getElementById('searchInput');

// Cargar productos
async function loadProducts(search = '') {
  try {
    const url = search ? `${API_URL}/products?search=${search}` : `${API_URL}/products`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Error al obtener productos');
    products = await res.json();
    renderProducts();
  } catch (error) {
    console.error('Error cargando productos:', error);
  }
}

// Renderizar productos (Verificado con tu JSON de MongoDB)
function renderProducts() {
  if (!productsGrid) return;
  productsGrid.innerHTML = products.map(p => `
    <div class="product-card">
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>${p.description.substring(0, 60)}...</p>
      <p class="price">S/${p.price}</p>
      <button onclick="addToCart('${p._id}')">Agregar al Carrito</button>
    </div>
  `).join('');
}

// Agregar al carrito (Usando _id de MongoDB)
function addToCart(productId) {
  const product = products.find(p => p._id === productId);
  if (!product) return;

  const existing = cart.find(item => item.product._id === productId);
  
  if (existing) {
    existing.quantity++;
  } else {
    // Estructura limpia para el carrito
    cart.push({ product, quantity: 1, price: product.price });
  }
  
  saveCart();
  updateCartCount();
  alert('✅ Producto agregado al carrito');
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
  if (!cartCount) return;
  const total = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = total;
}

// Mostrar carrito
if (cartIcon) {
    cartIcon.addEventListener('click', () => {
      const cartItems = document.getElementById('cartItems');
      const cartTotal = document.getElementById('cartTotal');
      
      if (cart.length === 0) {
        cartItems.innerHTML = '<p>Carrito vacío</p>';
        cartTotal.textContent = '0.00';
      } else {
        cartItems.innerHTML = cart.map(item => `
          <div class="cart-item">
            <span>${item.product.name} (x${item.quantity})</span>
            <span>S/${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        `).join('');
        
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = total.toFixed(2);
      }
      cartModal.classList.add('active');
    });
}

// Login
const loginSubmit = document.getElementById('loginSubmit');
if (loginSubmit) {
    loginSubmit.addEventListener('click', async () => {
      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;
      
      try {
        const res = await fetch(`${API_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        
        const data = await res.json();
        if (res.ok) {
          token = data.token;
          currentUser = data.user;
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(currentUser));
          updateAuthUI();
          loginModal.classList.remove('active');
          alert('👋 ¡Bienvenido de nuevo!');
        } else {
          alert(data.message || 'Error en login');
        }
      } catch (error) {
        alert('Error al iniciar sesión');
      }
    });
}

// Checkout con simulación de Culqi
const checkoutBtn = document.getElementById('checkoutBtn');
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', async () => {
      if (!token) return alert('Debes iniciar sesión para comprar');
      if (cart.length === 0) return alert('El carrito está vacío');
      
      const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const items = cart.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.price
      }));
      
      try {
        const res = await fetch(`${API_URL}/orders/checkout`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ items, total, culqiToken: 'sk_test_mock_123' })
        });
        
        if (res.ok) {
          alert('🎉 ¡Compra exitosa! Gracias por tu preferencia.');
          cart = [];
          saveCart();
          updateCartCount();
          cartModal.classList.remove('active');
        } else {
          alert('Error al procesar el pago');
        }
      } catch (error) {
        alert('Error al procesar compra');
      }
    });
}

// UI Auth
function updateAuthUI() {
  if (currentUser) {
    if(loginBtn) loginBtn.style.display = 'none';
    if(registerBtn) registerBtn.style.display = 'none';
    if(myOrdersBtn) myOrdersBtn.style.display = 'inline-block';
    if(logoutBtn) logoutBtn.style.display = 'inline-block';
    if(userName) userName.textContent = `Hola, ${currentUser.name}`;
  } else {
    if(loginBtn) loginBtn.style.display = 'inline-block';
    if(registerBtn) registerBtn.style.display = 'inline-block';
    if(myOrdersBtn) myOrdersBtn.style.display = 'none';
    if(logoutBtn) logoutBtn.style.display = 'none';
    if(userName) userName.textContent = '';
  }
}

// Logout
if(logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      token = null;
      currentUser = null;
      updateAuthUI();
      alert('Sesión cerrada');
      location.reload(); // Recarga para limpiar estado
    });
}

// Inicializar
updateCartCount();
updateAuthUI();
loadProducts();