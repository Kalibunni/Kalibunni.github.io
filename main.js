document.addEventListener('DOMContentLoaded', () => {
    const toast = document.getElementById('toast');
    const contactItems = document.querySelectorAll('.copy-contact');

    console.log("hai :3")

    contactItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const contactText = item.getAttribute('data-contact');

            navigator.clipboard.writeText(contactText).then(() => {
                const rect = item.getBoundingClientRect();
                const x = rect.left + window.scrollX;
                const y = rect.top + window.scrollY - 10;

                toast.textContent = `📋 Copied: ${contactText}`;
                toast.style.left = `${x}px`;
                toast.style.top = `${y}px`;
                toast.style.opacity = '1';
                toast.style.transform = 'translate(-50%, -200%) scale(1)';

                item.style.transform = 'scale(0.9)';

                setTimeout(() => {
                    item.style.transform = 'scale(1)';
                }, 200);

                setTimeout(() => {
                    toast.style.opacity = '0';
                    toast.style.transform = 'translate(-50%, -100%) scale(0.9)';
                }, 1500);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        });
    });

    const body = document.body;
    const stars = [];
    const backToTopButton = document.querySelector('.back-to-top');


    const layers = 3;
    const pageHeight = Math.max(document.body.scrollHeight, 2000);

    for (let i = 0; i < 150; i++) {
        const star = document.createElement('div');
        const layer = Math.floor(Math.random() * layers) + 1;
        const size = Math.random() * 3 + 1;
        star.className = 'star';
        star.dataset.layer = layer;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.top = `${Math.random() * pageHeight}px`;
        star.style.left = `${Math.random() * 100}vw`;
        star.style.zIndex = 1;
        star.style.animationDuration = `${Math.random() * 5 + 3}s`;
        body.appendChild(star);
        stars.push({ star, layer });
    }

    let lastScrollTop = window.scrollY;
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrollTop = window.scrollY;
                const scrollDelta = scrollTop - lastScrollTop;

                stars.forEach(({ star, layer }) => {
                    const parallaxFactor = layer * 0.05;
                    const currentTop = parseFloat(star.style.top);
                    const newTop = currentTop - scrollDelta * parallaxFactor;
                    star.style.top = `${newTop}px`;
                });

                if (scrollTop > 300) {
                    backToTopButton.classList.add('visible');
                } else {
                    backToTopButton.classList.remove('visible');
                }

                lastScrollTop = scrollTop;
                ticking = false;
            });

            ticking = true;
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    const timeElement = document.getElementById('current-time');
    function updateTime() {
        const now = new Date();
        const options = { timeZone: 'America/Chicago', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        timeElement.textContent = new Intl.DateTimeFormat('en-US', options).format(now);
    }
    updateTime();
    setInterval(updateTime, 1000);

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Friend links hover effect
    const friendLinks = document.querySelectorAll('.friend-link');
    friendLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-8px)';
        });

        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0)';
        });
    });
});