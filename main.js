document.addEventListener('DOMContentLoaded', () => {

    const toast = document.getElementById('toast');
    const contactItems = document.querySelectorAll('.copy-contact');
    const body = document.body;
    const backToTopButton = document.querySelector('.back-to-top');
    const timeElement = document.getElementById('current-time');
    const stars = []; 

    console.log("hai :3 - Page loaded!"); 

    contactItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const contactText = item.getAttribute('data-contact');
            navigator.clipboard.writeText(contactText).then(() => {
                showToast(`📋 Copied: ${contactText}`, item);
                item.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    item.style.transform = ''; 
                }, 150);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
                showToast(`❌ Failed to copy`, item); 
            });
        });
    });

    let toastTimeout;
    function showToast(message, element) {
        clearTimeout(toastTimeout); 
        toast.textContent = message;
        toast.classList.add('show'); 
        if (element) {
            const rect = element.getBoundingClientRect();
            const toastWidth = toast.offsetWidth;
            toast.style.left = `${rect.left + window.scrollX + rect.width / 2 - toastWidth / 2}px`;
            toast.style.top = `${rect.top + window.scrollY - toast.offsetHeight - 10}px`; 
        } else {
            toast.style.left = '50%';
            toast.style.top = 'auto';
            toast.style.bottom = '20px';
            toast.style.transform = 'translateX(-50%)';
        }
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 2000); 
    }

    const pageHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, 2500); 
    const starCount = 200; 
    const layers = 6; 

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        const layer = Math.floor(Math.random() * layers) + 1;
        const size = Math.random() * (layer === 1 ? 1.5 : 3) + 1; 
        const initialOpacity = (Math.random() * 0.4 + 0.2) / layer; 
        star.className = 'star';
        star.dataset.layer = layer; 
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        const initialTop = Math.random() * pageHeight; 
        star.style.top = `${initialTop}px`;
        star.style.left = `${Math.random() * 100}vw`;
        star.style.zIndex = layer === 1 ? -2 : 1; 
        star.style.setProperty('--initial-opacity', initialOpacity); 
        star.style.setProperty('--tx', Math.random() * 10 - 5);
        star.style.setProperty('--ty', Math.random() * 10 - 5);
        star.style.animationDelay = `${Math.random() * 5}s`;
        star.style.animationDuration = `${Math.random() * 6 + 4}s`;
        body.appendChild(star);
        stars.push({ star, layer, initialTop: initialTop });
    }

    let lastScrollTop = window.scrollY;
    let ticking = false;
    function handleScroll() {
        const scrollTop = window.scrollY;
        stars.forEach(({ star, layer, initialTop }) => {
            const parallaxFactor = 1 - (layer * 0.1 / layers);
            const newTopOffset = (scrollTop * parallaxFactor);
            star.style.transform = `translateY(${newTopOffset}px)`;
        });

        if (scrollTop > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(handleScroll);
            ticking = true;
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    function updateTime() {
        try {
            const now = new Date();
            const options = { timeZone: 'America/Chicago', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }; 
            timeElement.textContent = new Intl.DateTimeFormat('en-US', options).format(now);
        } catch (error) {
            console.error("Error updating time:", error);
            timeElement.textContent = "??:??:??"; 
        }
    }
    updateTime(); 
    setInterval(updateTime, 1000); 

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if (anchor.pathname === window.location.pathname && anchor.hash !== "") {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop;
                    const scrollPosition = offsetTop - 80; 
                    window.scrollTo({
                        top: scrollPosition,
                        behavior: 'smooth'
                    });
                }
            });
        }
    });
}); 