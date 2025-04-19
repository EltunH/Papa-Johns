const detail = document.getElementById('detail')

let params = new URLSearchParams(location.search)

let search = params.get('category')
let searchId = params.get('id')

let loading = true

let DETAILDATA
let count = 1
let flag = true
let post = ''


fetch(`https://papajohns-data.vercel.app/${search}/${searchId}`)
    .then(res => res.json())
    .then(info => {
        DETAILDATA = info
        DETAILDATA.productCount = 1
        loading = false
        showDetails()
        if (search == 'pizza' && info.variations.length > 0) {
            DETAILDATA.sizeValue = info.variations[0].price
            post = info.variations[0].type
            changePizza(post, DETAILDATA.sizeValue)
        }
    })


function show(item) {
    let kod = item.composition ? 'Tərkibi:' : ''
    detail.innerHTML = `
            <div class="w-full sm:w-1/2 xs:mr-5">
               <h4 class="font-bold text-[22px]">${item.title}</h4>
               <p class="mt-4"><b>${kod}</b> ${item.composition || ''}</p>
               <p class="font-bold my-2 text-[18px]">Qiyməti: ${(count * (DETAILDATA.sizeValue || item.price)).toFixed(2)}₼</p>
               <div id="pizzaSelect">
                   <div class="flex rounded-md overflow-hidden my-2 w-[60%]">
                       <button onclick="changeThin(true, 'Ənənəvi')" class="${flag ? 'bg-green-700' : 'bg-gray-200'} w-1/2 text-center ${flag ? 'text-white' : 'text-green-700'} px-2 py-1">
                           Ənənəvi
                       </button>
                       <button onclick="changeThin(false, 'Nazik')" class="${!flag ? 'bg-green-700' : 'bg-gray-200'} ${!flag ? 'text-white' : 'text-green-700'} w-1/2 text-center px-2 py-1">
                           Nazik
                       </button>
                   </div>
                   <div class="font-semibold w-[60%]">
                       <select id="sizeSelect" onchange="changeSize(this)" class="w-full text-center rounded-md bg-red-700 outline-none my-5 px-3 py-1 text-[15px] text-white"></select>
                   </div>
               </div>
               <div class="py-2">
                   <div class="flex items-center sm:text-[20px] text-white py-2">
                       <button onclick="changeCount(-1)" class="w-[38px] bg-[#b91c1c] rounded font-black">-</button>
                       <span class="w-[50px] flex justify-center text-black font-semibold">${count}</span>
                       <button onclick="changeCount(1)" class="w-[38px] bg-green-600 rounded font-black">+</button>
                   </div>
                   <button onclick="addBasket()" class="bg-green-700 text-white w-[200px] p-2 my-5 rounded-md">Səbətə at</button>
               </div>
            </div>
            <div class="w-full sm:w-1/2 flex justify-center">
                <img src="${item.img}" class="w-full md:w-[80%]" alt="product">
            </div>`
    const pizzaSelect = document.getElementById('pizzaSelect')
    pizzaSelect.style.display = search === 'pizza' ? 'block' : 'none'
}


function showDetails() {
    if (loading) {
        detail.innerHTML = `<div role="status" class="flex justify-center w-full">
                                <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 
                                            0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 
                                            90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 
                                            15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 
                                            37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 
                                            65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 
                                            39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                            </div>`
    } else {
        show(DETAILDATA)
    }
}

showDetails()

function changeCount(x) {
    count += x
    if (count < 1) count = 1
    show(DETAILDATA)
    changePizza(post, DETAILDATA.sizeValue)
}

function changeThin(position, type) {
    flag = position
    show(DETAILDATA)
    changePizza(type, DETAILDATA.sizeValue)
}

function changePizza(type, val) {
    post = type
    const sizeSelect = document.getElementById('sizeSelect')
    if (search == 'pizza') {
        DETAILDATA.variations.map(item => {
            if (item.type == type) {
                sizeSelect.innerHTML += `<option value="${item.price}">${item.size}</option>`
            }
        })
    }
    const opt = document.querySelectorAll('#sizeSelect option')
    for (const elm of opt) {
        if (elm.value == val) sizeSelect.value = val
    }
}

function changeSize() {
    const sizeSelect = document.getElementById('sizeSelect')
    DETAILDATA.sizeValue = sizeSelect.value
    show(DETAILDATA)
    changePizza(post, DETAILDATA.sizeValue)
}