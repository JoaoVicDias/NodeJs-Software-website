const togglebtn = document.querySelector('.toggle__btn')
const responsiveNav = document.querySelector('.main__nav--responsive')

togglebtn.addEventListener('click',function(){
    if(responsiveNav.style.display == "block"){
        responsiveNav.style.transform = "translateY(0)"
        setTimeout(function(){
            responsiveNav.style.display = "none"
        },300)
    }else{
        responsiveNav.style.display = "block"
        setTimeout(function(){
            responsiveNav.style.transform = "translateY(10%)"
        },50)
    }
})  