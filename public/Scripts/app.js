// IIFE -- Immediately Invoked Function Expression
// Scripts file for Frontend
// Dave von Deschwanden - 301303220 - 05.2023

(function(){

    function Start() 
    {
        console.log("App Started...");
    }

    window.addEventListener("load", Start);

})();


$(() => {

    // Main Page

    // Fade in the titles
    $("h1").animate({
        opacity: 1
    }, 1500)
    $("h3").animate({
        opacity: 1
    }, 2750)

    // Contact Page
    $(".contact-me").animate({
        opacity: 1
    }, 1000)

    // About Page
    $(".about-me").animate({
        opacity: 1
    }, 1000)

    //Products Page
    $(".products-container").animate({
        opacity: 1
    }, 1000)

    //Service Page
    $(".services-container").animate({
        opacity: 1
    }, 1000)

    //Thank you
    $(".thankyou").show(1000)
    .slideUp(1500);
    
    
})
