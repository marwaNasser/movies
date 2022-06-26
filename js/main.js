let nameInput = document.querySelector('.nameInput');
let nameAlert = document.querySelector('.nameAlert');
let mailInput = document.querySelector('.mailInput');
let mailAlert = document.querySelector('.mailAlert');
let phoneInput = document.querySelector('.phoneInput');
let phoneAlert = document.querySelector('.phoneAlert');
let ageInput = document.querySelector('.ageInput');
let ageAlert = document.querySelector('.ageAlert');
let passwordInput = document.querySelector('.passwordInput');
let passAlert = document.querySelector('.passAlert');
let repassInput = document.querySelector('.repassInput');
let repassAlert = document.querySelector('.repassAlert');
let searchByWordInput = document.querySelector('.searchByWordInput');
let searchInput = document.querySelector('.searchInput');
let divWidth = $('.navMenu').innerWidth();
let Playing = [];
let nameSub = false;
let mailSub = false;
let phoneSub = false;
let ageSub = false;
let passSub = false;
let repassSub = false;

////side navbar
$('.sideNav').css('left', `-${divWidth}`);
$('.togIcon').click(function () {

    if ($('.sideNav').css('left') == '0px') {
        $('.sideNav').animate({ left: `-${divWidth}` }, 1000)
        $('.menuCategories li').eq(5).animate({ top: `100px` }, 100 , function () {
            $('.menuCategories li').eq(4).animate({ top: `100px` }, 100 , function () {
                $('.menuCategories li').eq(3).animate({ top: `100px` }, 100 , function () {
                    $('.menuCategories li').eq(2).animate({ top: `100px` }, 100 , function () {
                        $('.menuCategories li').eq(1).animate({ top: `100px` }, 100 , function () {
                            $('.menuCategories li').eq(0).animate({ top: `100px` }, 100)
                        })
                    })
                })
            })
        })
    }
    else {
        $('.sideNav').animate({ left: `0px` }, 1000)
        $('.menuCategories li').eq(0).animate({ top: `0px` , opacity: 1}, 500 , function () {
            $('.menuCategories li').eq(1).animate({ top: `0px` , opacity: 1}, 400 , function () {
                $('.menuCategories li').eq(2).animate({ top: `0px` , opacity: 1}, 300 , function () {
                    $('.menuCategories li').eq(3).animate({ top: `0px` , opacity: 1}, 200 , function () {
                        $('.menuCategories li').eq(4).animate({ top: `0px` , opacity: 1}, 200 , function () {
                            $('.menuCategories li').eq(5).animate({ top: `0px` , opacity: 1}, 200)
                        })
                    })
                })
            })
        })
    }
})
////name validate
nameInput.addEventListener('input', function () {
    if (validate(nameInput) == false) {
        nameAlert.classList.replace('d-none', 'd-block')
    }
    else {
        nameAlert.classList.replace('d-block', 'd-none')
        nameSub = true;
    }
})
////mail validate
mailInput.addEventListener('input', function () {
    if (validate(mailInput) == false) {
        mailAlert.classList.replace('d-none', 'd-block')
    }
    else {
        mailAlert.classList.replace('d-block', 'd-none')
        mailSub = true;
    }
})
///phone validate
phoneInput.addEventListener('input', function () {
    if (validate(phoneInput) == false) {
        phoneAlert.classList.replace('d-none', 'd-block')
    }
    else {
        phoneAlert.classList.replace('d-block', 'd-none')
        phoneSub = true;
    }
})
///age validate
ageInput.addEventListener('input', function () {
    if (validate(ageInput) == false) {
        ageAlert.classList.replace('d-none', 'd-block')
    }
    else {
        ageAlert.classList.replace('d-block', 'd-none')
        ageSub = true;
    }
})
///password validate
passwordInput.addEventListener('input', function () {
    if (validate(passwordInput) == false) {
        passAlert.classList.replace('d-none', 'd-block')
    }
    else {
        passAlert.classList.replace('d-block', 'd-none')
        passSub = true;
    }
})
///Repassword validate
repassInput.addEventListener('input', function () {
    if (repassInput.value != passwordInput.value) {
        repassAlert.classList.replace('d-none', 'd-block')
    }
    else {
        repassAlert.classList.replace('d-block', 'd-none')
        repassSub = true;
        if (nameSub == true && mailSub == true && phoneSub == true && ageSub == true && passSub == true && repassSub == true ){
            $('.sub').removeAttr('disabled');
        }
        
    }
})
//// li click event
$('.menuCategories li').click(function (e) {
    let clickedItem = $(e.target).attr('class');
    if (clickedItem == 'item1') {
        getMovies('now_playing');
        $('html,body').animate({scrollTop:'0'},1200)
    }
    else if (clickedItem == 'item2') {
        getMovies('popular');
        $('html,body').animate({scrollTop:'0'},1200)
    }
    else if (clickedItem == 'item3') {
        getMovies('top_rated');
        $('html,body').animate({scrollTop:'0'},1200)
    }
    else if (clickedItem == 'item4') {
        getTernding();
        $('html,body').animate({scrollTop:'0'},1200)
    }
    else if (clickedItem == 'item5') {
        getMovies('upcoming');
        $('html,body').animate({scrollTop:'0'},1200)
    }
    else if (clickedItem == 'item6') {
        let secOffset = $('.contact').offset().top;
        $('html,body').animate({scrollTop:secOffset},1000)
    }
}) 
//// search by word
searchByWordInput.addEventListener('input' , function () {
    let movieName = '';
    let searchCartona = ``;
    for(let i= 0 ; i < Playing.length ; i++)
    {
        movieName = Playing[i].title;
        if(movieName.toLowerCase().includes(searchByWordInput.value.toLowerCase())){
            searchCartona += `
       <div class="col-md-4">
            <div class="movie">
                <div class="movImg">
                    <img class="w-100" src='https://image.tmdb.org/t/p/w500${Playing[i].poster_path}' alt="">
                    <div class="layer d-flex align-items-center">
                        <div>
                            <h3 class=" py-2">${Playing[i].title}</h3>
                            <p class="ph py-2">${Playing[i].overview}</p>
                            <h3 class=" py-2">rate: ${Playing[i].vote_average}</h3>
                            <h3 class=" py-2">${Playing[i].release_date}</h3>
                        </div>    
                    </div>
                 </div>
                
            </div>
        </div>
       `;
        
        }
    }
    $('.data').html(searchCartona);
})

//// search api
searchInput.addEventListener('input' , async function () {

    let response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=5a692d179c0ff524a85f9cb6806c880c&language=en-US&query=movie&page=1&include_adult=false`);
    let res = await response.json();
    let titles = res.results;
    let movieName = '';
    let searchCartona = ``;
    for(let i= 0 ; i < titles.length ; i++)
    {
        movieName = titles[i].title;
        if(movieName.toLowerCase().includes(searchInput.value.toLowerCase())){
            searchCartona += `
       <div class="col-md-4">
            <div class="movie">
                <div class="movImg">
                    <img class="w-100" src='https://image.tmdb.org/t/p/w500${titles[i].poster_path}' alt="">
                    <div class="layer d-flex align-items-center">
                        <div>
                            <h3 class=" py-2">${titles[i].title}</h3>
                            <p class="ph py-2">${titles[i].overview}</p>
                            <h3 class=" py-2">rate: ${titles[i].vote_average}</h3>
                            <h3 class=" py-2">${titles[i].release_date}</h3>
                        </div>    
                    </div>
                 </div>
                
            </div>
        </div>
       `;
        
        }
    }
    $('.data').html(searchCartona);
})


//// fetch api
async function getMovies(category) {
    let response = await fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=5a692d179c0ff524a85f9cb6806c880c&language=en-US&page=1`);
    let res = await response.json();
    Playing = res.results;
    let catoona = ``;
    for (let i = 0; i < Playing.length; i++) {
        catoona += `
       <div class="col-md-4">
            <div class="movie">
                <div class="movImg">
                    <img class="w-100" src='https://image.tmdb.org/t/p/w500${Playing[i].poster_path}' alt="">
                    <div class="layer d-flex align-items-center">
                        <div>
                            <h3 class=" py-2">${Playing[i].title}</h3>
                            <p class="ph py-2">${Playing[i].overview}</p>
                            <h3 class=" py-2">rate: ${Playing[i].vote_average}</h3>
                            <h3 class=" py-2">${Playing[i].release_date}</h3>
                        </div>    
                    </div>
                 </div>
                
            </div>
        </div>
       `;
        $('.data').html(catoona);
    }
}
getMovies('now_playing');

async function getTernding() {
    let Playing = [];
    let response = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=5a692d179c0ff524a85f9cb6806c880c`);
    let res = await response.json();
    Playing = res.results;

    let catoona = ``;
    for (let i = 0; i < Playing.length; i++) {
        catoona += `
       <div class="col-md-4">
            <div class="movie">
                <div class="movImg">
                    <img class="w-100" src='https://image.tmdb.org/t/p/w500${Playing[i].poster_path}' alt="">
                    <div class="layer d-flex align-items-center">
                        <div>
                            <h3 class=" py-2">${Playing[i].title}</h3>
                            <p class=" py-2">${Playing[i].overview}</p>
                            <h3 class=" py-2">rate: ${Playing[i].vote_average}</h3>
                            <h3 class=" py-2">${Playing[i].release_date}</h3>
                        </div>    
                    </div>
                 </div>
                
            </div>
        </div>
       `;
        $('.data').html(catoona);
    }
}

//validate function
function validate(inputName) {
    if (inputName == nameInput) {
        let regex = /^[A-Z|a-z]{3,20}$/
        if (regex.test(inputName.value) == true) {
            return true;
        }
        else {
            return false;
        }
    }
    else if (inputName == mailInput) {
        let regex = /^[A-Z|a-z|0-9]{3,20}(@[a-z]{3,8}).com$/
        if (regex.test(inputName.value) == true) {
            return true;
        }
        else {
            return false;
        }
    }
    else if (inputName == phoneInput) {
        let regex = /^012[0-9]{8}$|011[0-9]{8}$|010[0-9]{8}$|015[0-9]{8}$/
        if (regex.test(inputName.value) == true) {
            return true;
        }
        else {
            return false;
        }
    }
    else if (inputName == ageInput) {
        let regex = /^([2-7][0-9]|80)$/
        if (regex.test(inputName.value) == true) {
            return true;
        }
        else {
            return false;
        }
    }
    else if (inputName == passwordInput) {
        let regex = /^[a-z|A-Z]{8,15}[0-9]$/
        if (regex.test(inputName.value) == true) {
            return true;
        }
        else {
            return false;
        }
    }
}