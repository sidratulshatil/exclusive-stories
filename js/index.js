const newsPortel = (category_id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayNewsPortel(data.data))
}

const displayNewsPortel = (news) => {
    console.log(news)
    const newsField = document.getElementById('news-field')
    newsField.innerHTML = ''
    news.forEach(a => {
        const div = document.createElement('div')
        div.classList.add('row', 'g-3', 'mb-3')
        div.innerHTML = `
        <div class="col-md-4">
        <img src="${a.image_url}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
        <div class="card-body">
            <h5 class="card-title">${a.title}</h5>
            <p class="card-text">${a.details.slice(0, 200)}...</p>
            
        </div>
        <div class="d-flex justify-content-between align-items-center">
                            <div><img class="author-img" src="${a.author.img}" alt=""><span
                                    id="author-name"> ${a.author.name ? a.author.name : 'Not available'}</span></div>
                            <div class="text-center ml-4 "> <i class="fa-solid fa-eye"></i><span id="view-field">
                                   ${a.total_view ? a.total_view : 'Not found'}</span>
                            </div>
                            <div class="text-end "> <a href=""><i class="fa-solid fa-arrow-right"></i></a> </div>
                        </div>
        `
        newsField.appendChild(div)
    });
}
const newsDetails = () => {
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`
    console.log(url)
    fetch(url)
}

