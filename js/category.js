const cards = document.getElementById('cards')

let DATA
let axtar = new URLSearchParams(location.search).get('category')
let load = true

fetch(`https://papajson.vercel.app/${axtar}`)
    .then(res => res.json())
    .then(info => {
        DATA = info
        load = false
        showCategories()
    })

function showCategories() {
    cards.innerHTML = ''
    DATA.map(item => {
        cards.innerHTML += `<a href="details.htm?category=${item.category}&id=${item.id}" class="w-full overflow-hidden sm:w-[48%] lg:w-[30%] xl:w-[23%] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]  h-[400px]  my-5 shadow-md rounded">
                                <img class="w-full h-[55%] object-cover" src="${item.img}" alt="pizza">
                                <div class="flex justify-between items-center mt-4 mb-2">
                                    <p class="font-bold w-[70%] text-[18px] mr-2">${item.title}</p>
                                    <button class="text-[14px] w-[30%] bg-green-700 text-white uppercase font-bold p-[8px] rounded-md">Bunu seç</button>
                                </div>
                                <p class="px-2">${item.composition}</p>
                            </a>`
    })
}

function loadCard() {
    if(load) {
        cards.innerHTML = `
                <div class="flex flex-col my-5 rounded shadow-md w-full sm:w-[48%] lg:w-[30%] xl:w-[23%] animate-pulse h-96">
                    <div class="h-48 rounded-t dark:bg-gray-300"></div>
                    <div class="flex-1 px-4 py-8 space-y-4 sm:p-8 dark:bg-gray-50">
                        <div class="w-full h-6 rounded dark:bg-gray-300"></div>
                        <div class="w-full h-6 rounded dark:bg-gray-300"></div>
                        <div class="w-3/4 h-6 rounded dark:bg-gray-300"></div>
                    </div>
                </div>
                <div class="flex flex-col my-5 rounded shadow-md w-full sm:w-[48%] lg:w-[30%] xl:w-[23%] animate-pulse h-96">
                    <div class="h-48 rounded-t dark:bg-gray-300"></div>
                    <div class="flex-1 px-4 py-8 space-y-4 sm:p-8 dark:bg-gray-50">
                        <div class="w-full h-6 rounded dark:bg-gray-300"></div>
                        <div class="w-full h-6 rounded dark:bg-gray-300"></div>
                        <div class="w-3/4 h-6 rounded dark:bg-gray-300"></div>
                    </div>
                </div>
                <div class="flex flex-col my-5 rounded shadow-md w-full sm:w-[48%] lg:w-[30%] xl:w-[23%] animate-pulse h-96">
                    <div class="h-48 rounded-t dark:bg-gray-300"></div>
                    <div class="flex-1 px-4 py-8 space-y-4 sm:p-8 dark:bg-gray-50">
                        <div class="w-full h-6 rounded dark:bg-gray-300"></div>
                        <div class="w-full h-6 rounded dark:bg-gray-300"></div>
                        <div class="w-3/4 h-6 rounded dark:bg-gray-300"></div>
                    </div>
                </div>
                <div class="flex flex-col my-5 rounded shadow-md w-full sm:w-[48%] lg:w-[30%] xl:w-[23%] animate-pulse h-96">
                    <div class="h-48 rounded-t dark:bg-gray-300"></div>
                    <div class="flex-1 px-4 py-8 space-y-4 sm:p-8 dark:bg-gray-50">
                        <div class="w-full h-6 rounded dark:bg-gray-300"></div>
                        <div class="w-full h-6 rounded dark:bg-gray-300"></div>
                        <div class="w-3/4 h-6 rounded dark:bg-gray-300"></div>
                    </div>
                </div>`
    }else showCategories()
}
loadCard()