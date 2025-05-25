(function() {
    emailjs.init("EdZBAtft2p0doEpPy");
})();

function sendEmail(event) {
    event.preventDefault();

    const form = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');

    // Проверяем валидацию формы
    if (!validateForm(form)) {
        errorMessage.textContent = 'Информация введена неверно';
        errorMessage.style.display = 'block';
        successMessage.style.display = 'none';
        
        // Скрываем сообщение через 5 секунд
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 5000);
        return false;
    }

    // Получаем данные формы
    const formData = {
        lastname: document.getElementById('lastname').value,
        firstname: document.getElementById('firstname').value,
        middlename: document.getElementById('middlename').value,
        phone: document.getElementById('phone').value,
        message: `
            Новая заявка от клиента:
            
            Фамилия: ${document.getElementById('lastname').value}
            Имя: ${document.getElementById('firstname').value}
            Отчество: ${document.getElementById('middlename').value || 'Не указано'}
            Телефон: ${document.getElementById('phone').value}
            
            Дата отправки: ${new Date().toLocaleString('ru-RU')}
        `
    };

    // Отправляем данные через EmailJS
    emailjs.send('service_rgxb5uu', 'template_239h7mf', formData)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            form.reset();
            successMessage.textContent = 'Отправлено';
            successMessage.classList.add('active');
            errorMessage.classList.remove('active');
            
            // Скрываем сообщение через 5 секунд
            setTimeout(() => {
                successMessage.classList.remove('active');
            }, 5000);
        })
        .catch(function(error) {
            console.log('FAILED...', error);
            successMessage.classList.remove('active');
            errorMessage.textContent = 'Информация введена неверно';
            errorMessage.classList.add('active');
            
            // Скрываем сообщение через 5 секунд
            setTimeout(() => {
                errorMessage.classList.remove('active');
            }, 5000);
        });

    return false;
}

// Функция валидации формы
function validateForm(form) {
    const requiredFields = ['lastname', 'firstname', 'phone'];
    let isValid = true;
    requiredFields.forEach(field => {
        const input = form[field];
        if (!input || !input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });
    const phoneInput = form.phone;
    if (phoneInput && phoneInput.value.trim()) {
        const phoneRegex = /^\+375\s?\(?(17|29|33|44|25)\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/;
        if (!phoneRegex.test(phoneInput.value.trim())) {
            isValid = false;
            phoneInput.classList.add('error');
        }
    }
    return isValid;
} 