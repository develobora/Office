// Sticky menu when scrolling
function showMenu() {
    if ($("#main-top").offset().top > 10) {
        $("#main-top").addClass('scroll');
    } else {
        $("#main-top").removeClass('scroll');
    }
}

$(document).ready(function () {
    showMenu();
    
    //Mozilla FireFox svg button blurry line fix
    if (navigator.userAgent.search("Firefox") >= 0) {
        $('.button svg').css('shape-rendering', 'crispEdges');
        $('.button svg rect').attr('x', '0.5');
    }

    // Scroll to top if click arrow-button
    $('#arrow-up').click(function (e) {
        $('html, body').animate({
            scrollTop: $('body').offset().top
        }, 600);
        e.preventDefault();
    });

    //  Scroll to start page content when click start button
    $('.button-start').click(function (e) {
        var linkHref = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(linkHref).offset().top
        }, 800);
        e.preventDefault();
    });

    $(document).on('scroll', showMenu );
    // Animation style for dl-menu
    $(function () {
        $('#dl-menu').dlmenu({
            animationClasses: {
                classin: 'dl-animate-in-5',
                classout: 'dl-animate-out-5'
            }
        });
    });   
});