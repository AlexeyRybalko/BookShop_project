const images = [{
    url: './PNG/black-friday-banner.png',
  },{
    url: './PNG/top-10-banner.png', 
  },{
    url: './PNG/cozy-books-banner.png',
  }];

const sliderImages = document.querySelector(".slider-images");
const sliderDots = document.querySelector(".slider-dots");

function initSlider() {
    if (!images || !images.length) return;

    initImages();
    initDots();
    initAutoplay();
}

function initImages() {
  images.forEach((image, index) => {
    const imageDiv = `<div class="image n${index} ${index === 0? "active" : ""}" style="background-image:url(${images[index].url});" data-index="${index}"></div>`;
    sliderImages.innerHTML += imageDiv;
  });
}

function initDots() {
images.forEach((image, index) => {
  const dot = `<div class="slider__dots-item n${index} ${index === 0? "active" : ""}" data-index="${index}"></div>`;
  sliderDots.innerHTML += dot;
});
sliderDots.querySelectorAll(".slider__dots-item").forEach(dot => {
  dot.addEventListener("click", function() {
    moveSlider(this.dataset.index);
    sliderDots.querySelector(".active").classList.remove("active");
    this.classList.add("active");
  });
});
}

function initAutoplay() {
setInterval(() => {
  const curNumber = +sliderImages.querySelector(".active").dataset.index;
  const nextNumber = curNumber === images.length - 1? 0 : curNumber + 1;
  moveSlider(nextNumber);
}, 5000);
}

function moveSlider(num) {
  sliderImages.querySelector(".active").classList.remove("active");
  sliderImages.querySelector(".n" + num).classList.add("active");
  sliderDots.querySelector('.active').classList.remove('active');
  sliderDots.querySelector('.n' + num).classList.add('active');
}


export default initSlider;

