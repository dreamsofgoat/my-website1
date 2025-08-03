$(document).ready(function() {
    // Page navigation
    $('.nav-button').click(function() {
        const page = $(this).data('page');
        $('.nav-button').removeClass('active');
        $(this).addClass('active');
        $('.page-content').removeClass('active');
        $(`#${page}-content`).addClass('active');
        $('body').removeClass('index-page farewell-page contact-page').addClass(`${page}-page`);
        history.pushState(null, null, page === 'index' ? '/' : `/${page}.html`);
    });

    // Apply red/blue hover effects to words and initial letters
    function applyHoverEffects() {
        // Process both #index-content and #farewell-content
        ['#index-content', '#farewell-content'].forEach(selector => {
            // Handle h1 and p elements
            $(`${selector} h1, ${selector} p`).each(function() {
                const $elem = $(this);
                // For paragraphs in #farewell-content, preserve initial letter
                let initialLetter = null;
                if ($elem.is('p') && selector === '#farewell-content') {
                    initialLetter = $elem.find('.initial-letter').detach();
                }
                // Get text, excluding initial letter if present
                let text = $elem.text();
                if (initialLetter && initialLetter.length) {
                    text = text.substring(1); // Remove first letter
                }
                // Split into words and wrap in spans
                const words = text.split(' ').filter(word => word).map(word => 
                    `<span class="word">${word}</span>`
                ).join(' ');
                $elem.html(words);
                // Reinsert initial letter for farewell paragraphs
                if (initialLetter && initialLetter.length) {
                    $elem.prepend(initialLetter);
                }
            });
        });
        // Apply hover classes to all .word elements, including initial-letter
        const words = $('#index-content .word, #farewell-content .word');
        console.log('Found words:', words.length); // Debug
        words.each(function(index) {
            $(this).addClass(index % 2 === 0 ? 'hover-red' : 'hover-blue');
            console.log(`Word ${index}:`, $(this).text(), $(this).hasClass('hover-red') ? 'red' : 'blue'); // Debug
        });
    }

    // Apply hover effects initially
    applyHoverEffects();

    // Handle popstate for browser back/forward
    $(window).on('popstate', function() {
        const path = window.location.pathname.replace('/', '').replace('.html', '') || 'index';
        $('.nav-button').removeClass('active');
        $(`.nav-button[data-page="${path}"]`).addClass('active');
        $('.page-content').removeClass('active');
        $(`#${path}-content`).addClass('active');
        $('body').removeClass('index-page farewell-page contact-page').addClass(`${path}-page`);
    });
});