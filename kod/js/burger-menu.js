document.addEventListener('DOMContentLoaded', function() {
    const burgerMenu = document.querySelector('.burger-menu');
    const headerNav = document.querySelector('.header-nav');
    const navLinks = document.querySelectorAll('.header-nav a');
    const contactLink = document.querySelector('.contact-link');
    let contactLinkClone = null;
    let closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.className = 'close-menu';
    closeBtn.style.display = 'none';
    headerNav.appendChild(closeBtn);
    let lastScrollY = window.scrollY;
    let ticking = false;
    let header = document.querySelector('header');
    function onScroll() {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY && currentScrollY > 30) {
            header.classList.add('hide-header');
        } else if (currentScrollY < lastScrollY) {
            header.classList.remove('hide-header');
        }
        lastScrollY = currentScrollY;
        ticking = false;
    }
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(onScroll);
            ticking = true;
        }
    });
    function checkAspectRatio() {
        const w = window.innerWidth;
        const h = window.innerHeight;
        const ratio = w / h;
        if (ratio <= 0.58) {
            burgerMenu.style.display = 'flex';
            headerNav.style.display = 'none';
            closeBtn.style.display = 'none';
            if (contactLink && contactLink.parentElement.tagName === 'HEADER') {
                contactLinkClone = contactLink.cloneNode(true);
                contactLink.style.display = 'none';
                if (!headerNav.querySelector('.contact-link')) {
                    headerNav.appendChild(contactLinkClone);
                }
            }
        } else {
            burgerMenu.style.display = 'none';
            headerNav.style.display = 'flex';
            headerNav.classList.remove('dropdown');
            burgerMenu.classList.remove('active');
            headerNav.classList.remove('active');
            document.body.style.overflow = '';
            closeBtn.style.display = 'none';
            if (contactLink && contactLink.parentElement !== document.querySelector('header')) {
                contactLink.style.display = '';
                document.querySelector('header').insertBefore(contactLink, document.querySelector('header').firstChild);
                if (contactLinkClone && headerNav.contains(contactLinkClone)) {
                    headerNav.removeChild(contactLinkClone);
                }
            }
        }
    }
    checkAspectRatio();
    window.addEventListener('resize', checkAspectRatio);
    burgerMenu.addEventListener('click', function() {
        this.classList.toggle('active');
        headerNav.classList.toggle('active');
        if (headerNav.classList.contains('active')) {
            headerNav.classList.add('dropdown');
            headerNav.style.display = 'flex';
            closeBtn.style.display = 'block';
            document.body.style.overflow = 'hidden';
        } else {
            headerNav.classList.remove('dropdown');
            headerNav.style.display = 'none';
            closeBtn.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
    closeBtn.addEventListener('click', function() {
        burgerMenu.classList.remove('active');
        headerNav.classList.remove('active');
        headerNav.classList.remove('dropdown');
        headerNav.style.display = 'none';
        closeBtn.style.display = 'none';
        document.body.style.overflow = '';
    });
    headerNav.addEventListener('click', function(e) {
        if (e.target.classList.contains('contact-link')) {
            burgerMenu.classList.remove('active');
            headerNav.classList.remove('active');
            headerNav.classList.remove('dropdown');
            headerNav.style.display = 'none';
            closeBtn.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            burgerMenu.classList.remove('active');
            headerNav.classList.remove('active');
            headerNav.classList.remove('dropdown');
            headerNav.style.display = 'none';
            closeBtn.style.display = 'none';
            document.body.style.overflow = '';
        });
    });
}); 