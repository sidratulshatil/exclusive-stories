document.getElementById("loading-spinner").style.display = 'none'

const newsPortel = async (category_id) => {
    document.getElementById("loading-spinner").style.display = 'block'
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`
    try {
        const res = await fetch(url)
        const data = await res.json()
        displayNewsPortel(data.data)

        document.getElementById("loading-spinner").style.display = 'none'
        return data
    }
    catch (error) {
        return alert("Something Went Wrong")
    }

}
const setAllMenu = async (id) => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    try {
        const res = await fetch(url)
        const data = await res.json()
        displayAllMenu(data.data.news_category)
    }
    catch (error) {
        return alert('Something Went Wrong')
    }
}
const displayAllMenu = (title) => {
    // console.log(title)
    const newsContainer = document.getElementById("news-container")
    title.forEach(a => {
        // console.log(a.category_id)
        const div = document.createElement('div')
        div.innerHTML = `
       <a id="btn-bn" onclick="newsPortel('${a.category_id}')" class="btn text-secondary">${a.category_name}</a>
       `
        newsContainer.appendChild(div)
    })
}

const displayNewsPortel = (news) => {
    // console.log(news)
    news.sort((a, b) => Number(b.total_view) - Number(a.total_view));
    const itemNumbers = document.getElementById('item-numbers')
    itemNumbers.innerText = news.length
    const newsField = document.getElementById('news-field')
    newsField.innerHTML = ''
    news.forEach(a => {
        const div = document.createElement('div')
        div.classList.add('row', 'g-3', 'mb-3', 'shadow', 'rounded')
        div.innerHTML = `
        <div class="col-md-4">
        <img src="${a.image_url}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8 ">
        <div class="card-body">
            <h5 class="card-title">${a.title}</h5>
            <p class="card-text">${a.details.slice(0, 200)}...</p>
            
        </div>
        <div class="d-flex justify-content-between align-items-center">
                            <div><img class="author-img" src="${a.author.img}" alt=""><span
                                    id="author-name"> ${a.author.name ? a.author.name : 'Not data found'}</span></div>
                            <div class="text-center ml-4 "> <i class="fa-solid fa-eye"></i><span id="view-field">
                                   ${a.total_view ? a.total_view : 'Not data found'}</span>
                            </div>

                            <div onclick="newsDetails('${a._id}')" class="text-end btn" data-bs-toggle="modal" data-bs-target="#newsDetailsModal"> <a  ><i class="fa-solid fa-arrow-right"></i></a> </div>
                        </div>
        `
        newsField.appendChild(div)
    });
}
const newsDetails = async (news_id) => {
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`
    try {
        const res = await fetch(url)
        const data = await res.json()
        newsDetailsDisplay(data.data)
    }
    catch (error) {
        return alert('Something Went Wrong')
    }
}
const newsDetailsDisplay = news => {
    // console.log(news[0].total_view)

    const modalTitle = document.getElementById("newsDetailsModalLabel")
    modalTitle.innerText = news[0].title
    const modalDetails = document.getElementById('modalNews')
    modalDetails.innerText = news[0].details
    const modalImg = document.getElementById('modalImg')
    modalImg.innerHTML = ''
    const div = document.createElement('div')
    div.innerHTML = `
    <img class="img-fluid" src="${news[0].image_url}" alt="">
    `
    modalImg.appendChild(div)
    const authorDetails = document.getElementById('author-details')
    authorDetails.innerHTML = ''
    const div2 = document.createElement('div')
    div2.innerHTML = `
    <div class="d-flex align-items-center mt-2">
    <div class="ms-1"><img class="author-img" src="${news[0].author.img}" alt=""><span
            id="author-name"> ${news[0].author.name ? news[0].author.name : 'Not data found'}</span></div>
    <div class="text-center ml-4 ms-5 "> <i class="fa-solid fa-eye"></i><span id="view-field">
           ${news[0].total_view ? news[0].total_view : 'Not data found'}</span>
    </div>
    </div>
    `
    authorDetails.appendChild(div2)
    // console.log(modalImg)
}

setAllMenu()
newsPortel('08')
