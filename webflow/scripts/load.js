// Loader functionality
document.addEventListener('DOMContentLoaded', function() {
    const loadBtn = document.getElementById('load-btn');
    const loader = document.querySelector('.loader');

    if (loadBtn && loader) {
        loadBtn.addEventListener('click', function() {
            // Add dissolving animation class
            loader.classList.add('dissolve');
            
            // Add class to body to show main content (start transition earlier)
            setTimeout(() => {
                document.body.classList.add('loader-dismissed');
            }, 500); // Start transition halfway through loader fade
            
            // Remove loader from DOM after animation completes
            setTimeout(() => {
                loader.remove();
                // Scroll to the top of the page to ensure #top element is first visible
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }, 1000); // 1 second animation duration
        });
    }
}); 