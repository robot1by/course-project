document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Загружаем данные о товарах
        const productsData = await loadProductsData();
        if (!productsData) {
            throw new Error('Не удалось загрузить данные о товарах');
        }

        // Получаем ID товара из URL
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');

        if (!productId) {
            throw new Error('ID товара не указан');
        }

        // Ищем товар во всех категориях
        let product = null;
        for (const category in productsData) {
            product = productsData[category].find(p => p.id === productId);
            if (product) break;
        }

        if (!product) {
            throw new Error('Товар не найден');
        }

        // Формируем HTML для отображения товара
        const productDetails = document.getElementById('product-details');
        if (!productDetails) {
            throw new Error('Элемент для отображения товара не найден');
        }

        let specsHtml = '';
        if (product.id.startsWith('ssd-')) {
            specsHtml = `
                <div class="spec-item">
                    <span class="spec-label">Скорость чтения:</span>
                    <span class="spec-value">${product.readSpeed} МБ/с</span>
                </div>
                <div class="spec-item">
                    <span class="spec-label">Скорость записи:</span>
                    <span class="spec-value">${product.writeSpeed} МБ/с</span>
                </div>
            `;
        } else if (product.id.startsWith('usb-')) {
            specsHtml = `
                <div class="spec-item">
                    <span class="spec-label">Скорость чтения:</span>
                    <span class="spec-value">${product.readSpeed} МБ/с</span>
                </div>
                <div class="spec-item">
                    <span class="spec-label">Скорость записи:</span>
                    <span class="spec-value">${product.writeSpeed} МБ/с</span>
                </div>
            `;
        } else if (product.id.startsWith('hdd-')) {
            specsHtml = `
                <div class="spec-item">
                    <span class="spec-label">Скорость вращения:</span>
                    <span class="spec-value">${product.rpm} об/мин</span>
                </div>
                <div class="spec-item">
                    <span class="spec-label">Кэш:</span>
                    <span class="spec-value">${product.specs.cache}</span>
                </div>
            `;
        }

        productDetails.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h1>${product.name}</h1>
                <p class="product-description">${product.description}</p>
                <div class="product-specs">
                    <div class="spec-item">
                        <span class="spec-label">Объем:</span>
                        <span class="spec-value">${product.volume}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Интерфейс:</span>
                        <span class="spec-value">${product.interface}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Форм-фактор:</span>
                        <span class="spec-value">${product.formFactor}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Гарантия:</span>
                        <span class="spec-value">${product.warranty}</span>
                    </div>
                    ${specsHtml}
                </div>
                <div class="product-price">
                    <span class="price">${product.price.toLocaleString('ru-RU')} BYN</span>
                </div>
                ${product.stores ? `<div class="product-stores"><b>В наличии в магазинах:</b><ul>${product.stores.map(store => `<li>${store}</li>`).join('')}</ul></div>` : ''}
            </div>
        `;
    } catch (error) {
        console.error('Ошибка:', error);
        const productDetails = document.getElementById('product-details');
        if (productDetails) {
            productDetails.innerHTML = `<div class="error">${error.message}</div>`;
        }
    }
}); 