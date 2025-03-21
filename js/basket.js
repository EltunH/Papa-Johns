const redCount = document.getElementById('redCount')
const redCount1 = document.getElementById('redCount1')
const spPrice = document.getElementById('spPrice')
const spPrice1 = document.getElementById('spPrice1')
const basketCount = document.getElementById('basketCount')
const totalPrice = document.getElementById('totalPrice')
const favoruit = document.getElementById('favoruit')


let basket = JSON.parse(localStorage.getItem('basket')) || []
let selectVal = ''

function addBasket() {
    let yoxla = basket.find(item => item.id == DETAILDATA.id)
    if (yoxla == undefined) {
        basket.push(DETAILDATA)
        basket.filter(item => item.productCount ? '' : item.productCount = count)
    } else {
        basket.map(item => {
            if (item.id == DETAILDATA.id) item.productCount += count
        })
    }
    localStorage.setItem('basket', JSON.stringify(basket))
    showBasket()
}

function showBasket() {
    let qiymet = 0
    let umumi = 0
    favoruit.innerHTML = ''
    redCount.innerHTML = basket.length
    redCount1.innerHTML = basket.length
    basketCount.innerHTML = basket.length
    basket.map((item, i) => {
        qiymet = (item.productCount * item.price).toFixed(1)
        favoruit.innerHTML += `
                    <div class="flex flex-col sm:flex-row justify-between items-center py-3 border border-slate-400 mt-2">
                        <div class="w-full sm:w-1/2 flex gap-2 items-center">
                            <img class="w-[50px]" src="${item.img}" alt="product" />
                            <h3 class="sm:text-[20px] font-bold">${item.title}</h3>
                        </div>
                        <div class="w-full sm:w-1/2 justify-end flex items-center gap-3 px-2">
                            <div class="flex items-center sm:text-[20px] text-white p-2">
                                <button onclick="changeProductCount(-1, '${item.id}')" class="px-2 sm:px-3 pb-1 bg-gray-400 font-black">-</button>
                                <span class="px-2 sm:px-3 text-black">${item.productCount}</span>
                                <button onclick="changeProductCount(1, '${item.id}')" class="px-2 sm:px-3 pb-1 bg-green-600 font-black">+</button>
                            </div>
                            <div class="font-bold">
                                <span class="text-[22px]">${qiymet} ₼</span>
                                <span onclick="deleteProduct(${i})" class="fa-solid fa-xmark text-gray-600 ml-2"></span>
                            </div>
                        </div>
                    </div>
        `
        umumi += +qiymet
    })
    totalPrice.innerHTML = umumi
    spPrice.innerHTML = umumi
    spPrice1.innerHTML = umumi
}

function deleteProduct(i) {
    basket.splice(i, 1)
    localStorage.setItem('basket', JSON.stringify(basket))
    showBasket()
}

function changeProductCount(say, id) {
    basket.map(item => {
        if(item.id == id) {
            item.productCount += say
            if(item.productCount <= 1) item.productCount = 1
        }
    })
    localStorage.setItem('basket', JSON.stringify(basket))
    showBasket()
}