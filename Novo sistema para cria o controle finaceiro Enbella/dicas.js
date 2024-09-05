document.getElementById('open_btn').addEventListener('click', function () {
    document.getElementById('sidebar').classList.toggle('open-sidebar');
});
document.addEventListener('DOMContentLoaded', function () {
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    const slides = document.querySelectorAll('.carousel-slide');
    let index = 0;

    function showSlide(newIndex) {
        if (newIndex < 0) {
            index = slides.length - 1;
        } else if (newIndex >= slides.length) {
            index = 0;
        } else {
            index = newIndex;
        }
        carouselWrapper.style.transform = `translateX(-${index * 100}%)`;
    }

    prevButton.addEventListener('click', function () {
        showSlide(index - 1);
    });

    nextButton.addEventListener('click', function () {
        showSlide(index + 1);
    });
});
