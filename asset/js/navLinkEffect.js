function setActiveLink(element) {
    const link = element.querySelector('a');

    const navLinks =  document.querySelectorAll('header nav a');
    navLinks.forEach( item => {
        item.classList.remove('active');
    });

    link.classList.add('active');
    
}