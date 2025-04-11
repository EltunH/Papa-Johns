const categoryMenu = document.getElementById('categoryMenu')
const modal = document.getElementById('modal')

fetch("https://papajson.vercel.app/category")
    .then(res => res.json())
    .then(info => {
        info.map(item => {
            let kod = item.id == "222" ? '/index.htm' : `/pages/category.htm?category=${item.slug}`
            categoryMenu.innerHTML += `<li><a href="${kod}">${item.slug}</a></li>`
        })
        showBasket()
    })

const openClose = () => modal.classList.toggle('sideBar')

let swiper = new Swiper(".mySwiper", {
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});