// Tạo hiệu ứng chuyển động: phần chữ của quảng cáo
const animateSection = document.querySelector('.animate-section');
const triggerPoint = window.innerHeight * 0.5;
let isShown = false; // Biến cờ để theo dõi trạng thái

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;

    if (scrollPosition >= triggerPoint && !isShown) {
        animateSection.classList.add('show');
        isShown = true;
    }else if(scrollPosition<window.innerHeight*0.4){
        animateSection.classList.remove("show");
        isShown = false;
    }
});
// Kết thúc phần hiệu ứng chuyển động.