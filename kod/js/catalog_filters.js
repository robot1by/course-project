document.addEventListener('DOMContentLoaded', function() {
    const applyBtn = document.querySelector('.apply-filters');
    const resetBtn = document.querySelector('.reset-filters');
    const category = document.body.dataset.category;
    if (!category) return;
    function getFilters() {
        const minPrice = parseFloat(document.getElementById('minPrice')?.value) || null;
        const maxPrice = parseFloat(document.getElementById('maxPrice')?.value) || null;
        const filters = {};
        if (minPrice) filters.minPrice = minPrice;
        if (maxPrice) filters.maxPrice = maxPrice;
        const volumeChecked = Array.from(document.querySelectorAll('input[name="volume"]:checked')).map(cb => cb.value.toUpperCase());
        if (volumeChecked.length === 1) filters.volume = volumeChecked[0];
        const interfaceChecked = Array.from(document.querySelectorAll('input[name="interface"]:checked')).map(cb => cb.value);
        if (interfaceChecked.length === 1) filters.interface = interfaceChecked[0];
        const readSpeedChecked = Array.from(document.querySelectorAll('input[name="readSpeed"]:checked')).map(cb => parseInt(cb.value));
        if (readSpeedChecked.length === 1) filters.readSpeed = readSpeedChecked[0];
        const writeSpeedChecked = Array.from(document.querySelectorAll('input[name="writeSpeed"]:checked')).map(cb => parseInt(cb.value));
        if (writeSpeedChecked.length === 1) filters.writeSpeed = writeSpeedChecked[0];
        const rpmChecked = Array.from(document.querySelectorAll('input[name="rpm"]:checked')).map(cb => cb.value);
        if (rpmChecked.length === 1) filters.rpm = rpmChecked[0];
        return filters;
    }

    if (applyBtn) {
        applyBtn.addEventListener('click', function() {
            const filters = getFilters();
            window.productsAPI.renderProductsByFilters(category, filters);
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            document.querySelectorAll('.filters input').forEach(input => {
                if (input.type === 'checkbox') input.checked = false;
                if (input.type === 'number') input.value = '';
            });
            window.productsAPI.renderProductsByFilters(category, {});
        });
    }
}); 