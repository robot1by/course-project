// Единый модуль для работы с товарами
let productsData = null;

// Загрузка данных о товарах
async function loadProductsData() {
    if (productsData) return productsData;
    try {
        const response = await fetch('js/products.json');
        if (!response.ok) throw new Error('Не удалось загрузить данные о товарах');
        productsData = await response.json();
        return productsData;
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        return null;
    }
}

// Получить товары по категории
function getProductsByCategory(category) {
    if (!productsData) return [];
    return productsData[category] || [];
}

// Получить товар по ID
function getProductById(id) {
    if (!productsData) return null;
    for (const category in productsData) {
        const product = productsData[category].find(p => p.id === id);
        if (product) return product;
    }
    return null;
}

// Фильтрация товаров
function filterProducts(products, filters = {}) {
    return products.filter(product => {
        if (filters.minPrice && product.price < filters.minPrice) return false;
        if (filters.maxPrice && product.price > filters.maxPrice) return false;
        if (filters.volume && product.volume !== filters.volume) return false;
        if (filters.interface && product.interface !== filters.interface) return false;
        if (filters.readSpeed && product.readSpeed && product.readSpeed > filters.readSpeed) return false;
        if (filters.writeSpeed && product.writeSpeed && product.writeSpeed > filters.writeSpeed) return false;
        if (filters.rpm && product.rpm && product.rpm !== filters.rpm) return false;
        return true;
    });
}

// Сортировка товаров
function sortProducts(products, sortBy) {
    const sorted = [...products];
    switch (sortBy) {
        case 'price-asc': sorted.sort((a, b) => a.price - b.price); break;
        case 'price-desc': sorted.sort((a, b) => b.price - a.price); break;
        case 'name-asc': sorted.sort((a, b) => a.name.localeCompare(b.name)); break;
        case 'name-desc': sorted.sort((a, b) => b.name.localeCompare(a.name)); break;
    }
    return sorted;
}

// Генерация карточки товара
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    let specsHtml = '';
    if (product.id.startsWith('ssd-') || product.id.startsWith('usb-')) {
        specsHtml = `
            <li>${product.interface}</li>
            <li>До ${product.readSpeed} МБ/с</li>
            <li>До ${product.writeSpeed} МБ/с</li>
        `;
    } else if (product.id.startsWith('hdd-')) {
        specsHtml = `
            <li>${product.interface}</li>
            <li>${product.rpm} об/мин</li>
            <li>Кэш: ${product.specs?.cache || ''}</li>
        `;
    }
    card.innerHTML = `
        <a href="product.html?id=${product.id}">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.volume}</p>
            <ul>${specsHtml}</ul>
        </a>
        <div class="product-card-footer">
            <p class="product-price">${product.price.toLocaleString('ru-RU')} BYN</p>
        </div>
    `;
    return card;
}

// Экспорт функций
window.productsAPI = {
    loadProductsData,
    getProductsByCategory,
    getProductById,
    filterProducts,
    sortProducts,
    createProductCard,
    renderProductsByFilters
};

// Функция для фильтрации и рендера товаров по фильтрам
async function renderProductsByFilters(category, filters = {}) {
    const productsData = await loadProductsData();
    if (!productsData || !productsData[category]) return;
    let products = productsData[category];
    products = filterProducts(products, filters);
    const productsGrid = document.querySelector('.products-grid');
    if (!productsGrid) return;
    productsGrid.innerHTML = '';
    products.forEach(product => {
        const card = createProductCard(product);
        productsGrid.appendChild(card);
    });
}

// Автоматический рендер товаров в каталоге при загрузке страницы
if (document.querySelector('.products-grid') && document.body.dataset.category) {
    document.addEventListener('DOMContentLoaded', async function() {
        const category = document.body.dataset.category;
        const productsData = await window.productsAPI.loadProductsData();
        if (!productsData || !productsData[category]) return;
        const productsGrid = document.querySelector('.products-grid');
        productsGrid.innerHTML = '';
        productsData[category].forEach(product => {
            const card = window.productsAPI.createProductCard(product);
            productsGrid.appendChild(card);
        });
    });
} 