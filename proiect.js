    document.addEventListener('DOMContentLoaded', function() {
        let readingPreferences = JSON.parse(localStorage.getItem('readingPrefs')) || {
            fontSize: '16px',
            theme: 'light',
            lastVisitedSection: ''
        };


    //buton pentru carte
    const bookButton = document.getElementById('buton');
    const bookImage = document.getElementById('imagine_de_schimbat');
    let isBookOpen = false;

    function getRandomRotation() {
        return Math.floor(Math.random() * 10 - 5); 
    }

    if (bookButton && bookImage) {
        bookButton.addEventListener('click', function(e) {
            if (!isBookOpen) {
                bookImage.src = 'poze/carte_deschisa.jpg';
                bookButton.textContent = 'Închide cartea!';
                bookImage.style.transform = `rotate(${getRandomRotation()}deg)`;
                isBookOpen = true;
            } else {
                bookImage.src = 'poze/carte_inchisa.jpeg.png';
                bookButton.textContent = 'Deschide cartea!';
                bookImage.style.transform = 'rotate(0deg)';
                isBookOpen = false;
            }

            localStorage.setItem('bookState', JSON.stringify({ isOpen: isBookOpen }));
        });
    }


    //canvas
    const canvas = document.createElement('canvas');
    canvas.width = 100;
    canvas.height = 100;
    canvas.classList.add('page-corner');
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(100, 0);
    ctx.lineTo(100, 100);
    ctx.fillStyle = '#f0f0f0';
    ctx.fill();

    //contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!emailRegex.test(emailInput.value)) {
                alert('Vă rugăm să introduceți o adresă de email validă!');
                return;
            }

            setTimeout(() => {
                const formData = {
                    email: emailInput.value,
                    timestamp: new Date().toISOString()
                };
                localStorage.setItem('lastSubmission', JSON.stringify(formData));
                alert('Formular trimis cu succes!');
            }, 1000);
        });
    }});

    //schimba sectiunile la hover
    document.addEventListener('DOMContentLoaded', () => {
        const sections = document.querySelectorAll('main section');
        sections.forEach(section => {
            const originalBackground = window.getComputedStyle(section).backgroundColor;
            
            section.addEventListener('mouseenter', function() {
                this.style.transition = 'all 0.3s ease';
                this.style.transform = 'scale(1.01)';
                this.style.backgroundColor = '#f0f0f0';
            });
            
            section.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
                this.style.backgroundColor = originalBackground;
            });
        });
    });

    //night mode
    document.addEventListener('DOMContentLoaded', function() {
        const themeToggle = document.createElement('button');
        themeToggle.textContent = 'Schimbă tema';
        themeToggle.classList.add('theme-toggle');
        document.body.insertBefore(themeToggle, document.body.firstChild);
    
        themeToggle.addEventListener('click', function(e) {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            readingPreferences.theme = isDark ? 'dark' : 'light';
            localStorage.setItem('readingPrefs', JSON.stringify(readingPreferences));
        });
    });


    //search bar
    document.addEventListener('DOMContentLoaded', () => {
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Caută în pagină...';
        searchInput.classList.add('search-input');
        document.body.insertBefore(searchInput, document.body.firstChild);
    
        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                const searchTerm = e.target.value.toLowerCase().trim(); 
                const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6');
                
                if (!searchTerm) {
                    textElements.forEach(element => {
                        element.style.backgroundColor = '';
                    });
                    return;
                }
                
                textElements.forEach(element => {
                    const text = element.textContent.toLowerCase();
                    if (text.includes(searchTerm)) {
                        element.style.backgroundColor = 'yellow';
                    } else {
                        element.style.backgroundColor = '';
                    }
                });
            }, 300);
        });
    });