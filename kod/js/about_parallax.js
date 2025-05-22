document.addEventListener('DOMContentLoaded', function() {
    const parallaxBg = document.querySelector('.parallax-bg');
    const companyHistory = document.querySelector('.company-history');

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        
        if (isElementInViewport(companyHistory)) {
            parallaxBg.style.transform = `translateY(${rate}px)`;
        }
    });

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
}); 