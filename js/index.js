// side Menu bar
$("#openingIcon").click( ()=>{
    if($("#menubar").css("left") == "0px" ){
        $("#menu").animate({"left" : 0 } , 500 );
        $("#menubar").animate({"left" : "20%"} , 500 );
        $("#openingIcon").attr("class","fa-solid open-close-icon fa-2x fa-x");
        setTimeout(() => {
            $("#searchBtn").animate({"top": 0},1000)
        }, 50); 
        setTimeout(() => {
            $("#categoriesBtn").animate({"top": "15%"},1000)
        }, 100); 
        setTimeout(() => {
            $("#areaBtn").animate({"top": "30%"},1000)
        }, 150); 
        setTimeout(() => {
            $("#ingredientsBtn").animate({"top": "45%"},1000)
        }, 200); 
        setTimeout(() => {
            $("#contactBtn").animate({"top": "60%"},1000)
        }, 250); 
    }
    else{
        $("#menu").animate({"left" : "-20%"} , 500 );
        $("#menubar").animate({"left" : 0 } , 500 );
        $("#openingIcon").attr("class","fa-solid open-close-icon fa-align-justify fa-2x");
        setTimeout(() => {
            $("#contactBtn").animate({"top": "100%"},1000)
        }, 50); 
        setTimeout(() => {
            $("#ingredientsBtn").animate({"top": "100%"},1000)
        }, 100); 
        setTimeout(() => {
            $("#areaBtn").animate({"top": "100%"},1000)
        }, 150); 
        setTimeout(() => {
            $("#categoriesBtn").animate({"top": "100%"},1000)
        }, 200); 
        setTimeout(() => {
            $("#searchBtn").animate({"top": "100%"},1000)
        }, 250); 
        
       
       
        
    }
})

// Main Section

async function mainSection(){
    $("#spinner").removeClass("d-none");
    let response = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s");
    let finalResponse = await response.json();
    // console.log(finalResponse);
    displayMainSection(finalResponse);
    $("#spinner").addClass("d-none");
}
mainSection()

function displayMainSection(finalResponse){
    
    let mainImg = "" ;
    for (let i =0 ; i < finalResponse.meals.length ; i++) {
        mainImg += `
        <div class="col-lg-3 col-md-6" id="mainSectionDiv">
            <div class="mainDiv rounded-2 overflow-hidden position-relative" >
                <img src="${finalResponse.meals[i].strMealThumb}" alt="foodImg" class="w-100">
                <div  class="layer w-100 h-100 bg-white position-absolute top-100 px-2 d-flex align-items-center fs-4 fw-bolder text-capitalize opacity-75">
                    ${finalResponse.meals[i].strMeal}
                </div>
            </div>
        </div>
        `
    }
    $("#mainPage").html(mainImg);
    let section = document.querySelectorAll("#mainSectionDiv");
    section = Array.from(section)
    // console.log(section)
    for (let i = 0; i < section.length; i++) {
        section[i].addEventListener("click" , ()=>{
            $("#mainScreen").addClass("d-none");
            $("#detailsScreen").removeClass("d-none");
            detailsSection(finalResponse.meals[i].idMeal)
        })
    }
    
}

async function detailsSection(detailsid){
    $("#spinner").removeClass("d-none");
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${detailsid}`);
    let finalResponse = await response.json();
    // console.log(finalResponse );

    let detImg = `
        <img src="${finalResponse.meals[0].strMealThumb}" alt="" class="w-100 rounded-2" id="detailsImg">
        <h2 class="text-capitalize text-white py-1" id="detailsMeal">${finalResponse.meals[0].strMeal}</h2>
    `
    $("#detailsImg").html(detImg)

    $("#detailsInstruction").html(finalResponse.meals[0].strInstructions);
    $("#detailsArea").html(finalResponse.meals[0].strArea);
    $("#detailsCat").html(finalResponse.meals[0].strCategory);
    
    let ingredients = Object.entries(  finalResponse.meals[0] ).slice(9,29).map(entry => entry[1]);
    allIngredients = Array.from(ingredients)
    let ing = ""
    for (let i = 0; i < allIngredients.length; i++) {
        ing +=` <span class=" bg-info-subtle p-2 rounded-2 text-light-emphasis d-inline-block mx-1 my-2" > ${allIngredients[i]} </span> ` 
        if(allIngredients[i] != ""){
            $("#ingred").html(ing);
        }
    }
    let rates = finalResponse.meals[0].strTags
    allRates = rates.split(",");
    let rate = ""
    for (let i = 0; i < allRates.length; i++) {
        rate +=` <span class=" bg-danger-subtle text-danger-emphasis p-2 rounded-2 text-capitalize d-inline-block mx-1 my-2" > ${allRates[i]} </span> ` 
        if(allRates[i] != "" || allRates[i] != " " || allRates[i] != null ){
            $("#detailsTag").html(rate);
        }
        $("#spinner").addClass("d-none");
    }

    let btns = `
        <button class=" srcBtn py-2 px-3 border-0 text-white bg-success rounded-2" > <a href="${finalResponse.meals[0].strSource}" target="_blank" class="text-decoration-none text-white">Source</a> </button>
        <button class=" youtubeBtn py-2 px-3 border-0 text-white bg-danger rounded-2" ><a href="${finalResponse.meals[0].strYoutube}"  target="_blank" class="text-decoration-none text-white"> Youtube </a> </button>
    `
    $("#detailsBtn").html(btns);
}


// search

$("#searchBtn").click(()=>{
    $("#mainScreen").addClass("d-none");
    $("#searchSection").removeClass("d-none");
    $("#menu").animate({"left" : "-20%"} , 500 );
    $("#menubar").animate({"left" : 0 } , 500 );
    $("#openingIcon").attr("class","fa-solid open-close-icon fa-align-justify fa-2x");
    $("#menuList").animate({"top": "100%" }, 1000);
    $("#contactSection").addClass("d-none");
    $("#detailsScreen").addClass("d-none");
})

//search by name 
$("#searchInputs1").keyup((e)=>{
    let nValue = $(e.target).val()
    if(nValue != ""){
        searchName(nValue)
    }
    // console.log(nValue)
})

async function searchName(Namevlaue ){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${Namevlaue}`);
    let finalResponse = await response.json();
    console.log(finalResponse);
    searchNameData(finalResponse);
}

function searchNameData(finalResponse){
    let mainImg = "" ;
    for (let i =0 ; i < finalResponse.meals.length ; i++) {
        mainImg += `
        <div class="col-lg-3 col-md-6" id="searchnSectionDiv">
            <div class="mainDiv rounded-2 overflow-hidden position-relative" >
                <img src="${finalResponse.meals[i].strMealThumb}" alt="foodImg" class="w-100">
                <div  class="layer w-100 h-100 bg-white position-absolute top-100 px-2 d-flex align-items-center fs-4 fw-bolder text-capitalize opacity-75">
                    ${finalResponse.meals[i].strMeal}
                </div>
            </div>
        </div>
        `
    }
    $("#searchScreen").html(mainImg);
    let catDetails = document.querySelectorAll("#searchnSectionDiv");
    catDetails = Array.from(catDetails);
    for (let i = 0; i < catDetails.length; i++) {
        $(catDetails[i]).click(()=>{
            $("#mainScreen").addClass("d-none");
            $("#searchSection").addClass("d-none");
            $("#detailsScreen").removeClass("d-none");            
            detailsSection(finalResponse.meals[i].idMeal)
        })
    }
}


// search by first letter
$("#searchInputs2").keyup((e)=>{
    let lValue = $(e.target).val() ;
    if(lValue != ""){
        searchFLetter(lValue);
    }
})

async function searchFLetter(fLvlaue ){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${fLvlaue}`);
    let finalResponse = await response.json();
    console.log(finalResponse);
    searchFLetterData(finalResponse);
}

function searchFLetterData(finalResponse){
    let mainImg = "" ;
    for (let i =0 ; i < finalResponse.meals.length ; i++) {
        mainImg += `
        <div class="col-lg-3 col-md-6" id="searchSectionDiv">
            <div class="mainDiv rounded-2 overflow-hidden position-relative" >
                <img src="${finalResponse.meals[i].strMealThumb}" alt="foodImg" class="w-100">
                <div  class="layer w-100 h-100 bg-white position-absolute top-100 px-2 d-flex align-items-center fs-4 fw-bolder text-capitalize opacity-75">
                    ${finalResponse.meals[i].strMeal}
                </div>
            </div>
        </div>
        `
    }
    $("#searchScreen").html(mainImg);
    let catDetails = document.querySelectorAll("#searchSectionDiv");
    catDetails = Array.from(catDetails);
    for (let i = 0; i < catDetails.length; i++) {
        $(catDetails[i]).click(()=>{
            $("#mainScreen").addClass("d-none");
            $("#searchSection").addClass("d-none");
            $("#detailsScreen").removeClass("d-none");            
            detailsSection(finalResponse.meals[i].idMeal)
        })
    }

}


// categories
    $("#categoriesBtn").click(()=>{
        categories();
        $("#menu").animate({"left" : "-20%"} , 500 );
        $("#menubar").animate({"left" : 0 } , 500 );
        $("#openingIcon").attr("class","fa-solid open-close-icon fa-align-justify fa-2x");
        $("#menuList").animate({"top": "100%" }, 1000); 
        $("#searchSection").addClass("d-none");
        $("#contactSection").addClass("d-none");
        $("#detailsScreen").addClass("d-none");
        $("#mainScreen").removeClass("d-none");
    })
    async function categories(){
        let response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php") ;
        let final = await response.json();
        // console.log(final)
        let cat = "" ;
        for (let i = 0; i < final.categories.length; i++) {
            cat += `
            <div class="col-md-3" id="catergoryID">
                <div class="mainDiv rounded-2 overflow-hidden position-relative">
                    <img src="${final.categories[i].strCategoryThumb}" alt="food img" class="w-100">
                    <div class="layer text-center text-black w-100 h-100 bg-white position-absolute top-100 px-2 py-3 opacity-75">
                        <h2 class="text-capitalize">${final.categories[i].strCategory}</h2>
                        <p> ${final.categories[i].strCategoryDescription}</p>
                    </div>
                </div>
            </div>
            `
        }
        $("#mainPage").html(cat);
        let catDiv = document.querySelectorAll("#catergoryID");
        catDiv = Array.from(catDiv)
        for (let i = 0; i < catDiv.length; i++) {
            catDiv[i].addEventListener("click" , ()=>{
                let catMeal = final.categories[i].strCategory;
                categoryFilter(catMeal)
            })
        }
        
    }
    async function categoryFilter(filter){
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${filter}`) ;
        let finalResponce = await response.json();
        console.log(finalResponce);
        let fil = ""
        for (let i = 0; i < finalResponce.meals.length; i++) {
            fil += `
            <div class="col-lg-3 col-md-6" id="mainSectionDiv">
                <div class="mainDiv rounded-2 overflow-hidden position-relative" >
                    <img src="${finalResponce.meals[i].strMealThumb}" alt="foodImg" class="w-100">
                    <div  class="layer w-100 h-100 bg-white position-absolute top-100 px-2 d-flex align-items-center fs-4 fw-bolder text-capitalize opacity-75">
                        ${finalResponce.meals[i].strMeal}
                    </div>
                </div>
            </div>
            `
           
        }
        $("#mainPage").html(fil);
        let catDetails = document.querySelectorAll("#mainSectionDiv");
        catDetails = Array.from(catDetails);
        for (let i = 0; i < catDetails.length; i++) {
            $(catDetails[i]).click(()=>{
                // console.log("hi")
                $("#mainScreen").addClass("d-none");
                $("#detailsScreen").removeClass("d-none");            
                detailsSection(finalResponce.meals[i].idMeal)
            })
        }
        
    }


// Area
$("#areaBtn").click(()=>{
    areas();
    $("#menu").animate({"left" : "-20%"} , 500 );
    $("#menubar").animate({"left" : 0 } , 500 );
    $("#openingIcon").attr("class","fa-solid open-close-icon fa-align-justify fa-2x");
    $("#menuList").animate({"top": "100%" }, 1000);
    $("#searchSection").addClass("d-none");
    $("#contactSection").addClass("d-none");
    $("#detailsScreen").addClass("d-none");
    $("#mainScreen").removeClass("d-none");
})
async function areas(){
    let response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list") ;
    let final = await response.json();
    // console.log(final)
    let area = "" ;
    for (let i = 0; i < final.meals.length; i++) {
        area += `
        <div class="col-md-3" id="areaID">
            <div class="text-center text-white homeIcon">
                <i class="fa-solid fa-house-laptop fa-4x"></i>
                <h3 class="text-capitalize">${final.meals[i].strArea}</h3>
            </div>
        </div>
        `
    }
    $("#mainPage").html(area);
    let catDiv = document.querySelectorAll("#areaID");
    catDiv = Array.from(catDiv)
    for (let i = 0; i < catDiv.length; i++) {
        catDiv[i].addEventListener("click" , ()=>{
            let catMeal = final.meals[i].strArea;
            areaFilter(catMeal)
        })
    }
    
}
async function areaFilter(filter){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${filter}`) ;
    let finalResponce = await response.json();
    console.log(finalResponce);
    let fil = ""
    for (let i = 0; i < finalResponce.meals.length; i++) {
        fil += `
        <div class="col-lg-3 col-md-6" id="mainSectionDiv">
            <div class="mainDiv rounded-2 overflow-hidden position-relative" >
                <img src="${finalResponce.meals[i].strMealThumb}" alt="foodImg" class="w-100">
                <div  class="layer w-100 h-100 bg-white position-absolute top-100 px-2 d-flex align-items-center fs-4 fw-bolder text-capitalize opacity-75">
                    ${finalResponce.meals[i].strMeal}
                </div>
            </div>
        </div>
        `
       
    }
    $("#mainPage").html(fil);
    let catDetails = document.querySelectorAll("#mainSectionDiv");
    catDetails = Array.from(catDetails);
    for (let i = 0; i < catDetails.length; i++) {
        $(catDetails[i]).click(()=>{
            // console.log("hi")
            $("#mainScreen").addClass("d-none");
            $("#detailsScreen").removeClass("d-none");            
            detailsSection(finalResponce.meals[i].idMeal)
        })
    }
    
}


// Ingredients
$("#ingredientsBtn").click(()=>{
    ingredient();
    $("#menu").animate({"left" : "-20%"} , 500 );
    $("#menubar").animate({"left" : 0 } , 500 );
    $("#openingIcon").attr("class","fa-solid open-close-icon fa-align-justify fa-2x");
    $("#menuList").animate({"top": "100%" }, 1000);  
    $("#searchSection").addClass("d-none");
    $("#contactSection").addClass("d-none");
    $("#detailsScreen").addClass("d-none");  
    $("#mainScreen").removeClass("d-none");
})
async function ingredient(){
    let response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list") ;
    let final = await response.json();

    let ing = "" ;
    for (let i = 0; i < final.meals.length; i++) {
        let desc = final.meals[i].strDescription ;
        let fDesc = desc?.split(" ").slice(0,20).join(" ")
        ing += `
        <div class="col-md-3" id="ingrID">
            <div class="text-center text-white  px-0 homeIcon">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3 class="text-capitalize">${final.meals[i].strIngredient}</h3>
                <p class="px-3"> ${fDesc} </p>
            </div>
        </div>
        `
    }
    $("#mainPage").html(ing);
    let catDiv = document.querySelectorAll("#ingrID");
    catDiv = Array.from(catDiv)
    for (let i = 0; i < catDiv.length; i++) {
        catDiv[i].addEventListener("click" , ()=>{
            let catMeal = final.meals[i].strIngredient;
            ingrFilter(catMeal)
        })
    }
    
}
async function ingrFilter(filter){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${filter}`) ;
    let finalResponce = await response.json();
    console.log(finalResponce);
    let fil = ""
    for (let i = 0; i < finalResponce.meals.length; i++) {
        fil += `
        <div class="col-lg-3 col-md-6" id="mainSectionDiv">
            <div class="mainDiv rounded-2 overflow-hidden position-relative" >
                <img src="${finalResponce.meals[i].strMealThumb}" alt="foodImg" class="w-100">
                <div  class="layer w-100 h-100 bg-white position-absolute top-100 px-2 d-flex align-items-center fs-4 fw-bolder text-capitalize opacity-75">
                    ${finalResponce.meals[i].strMeal}
                </div>
            </div>
        </div>
        `
       
    }
    $("#mainPage").html(fil);
    let catDetails = document.querySelectorAll("#mainSectionDiv");
    catDetails = Array.from(catDetails);
    for (let i = 0; i < catDetails.length; i++) {
        $(catDetails[i]).click(()=>{
            $("#mainScreen").addClass("d-none");
            $("#detailsScreen").removeClass("d-none");            
            detailsSection(finalResponce.meals[i].idMeal)
        })
    }
    
}

// contact
$("#contactBtn").click(()=>{
    contact();
    $("#menu").animate({"left" : "-20%"} , 500 );
    $("#menubar").animate({"left" : 0 } , 500 );
    $("#openingIcon").attr("class","fa-solid open-close-icon fa-align-justify fa-2x");
    $("#menuList").animate({"top": "100%" }, 1000);
    $("#searchSection").addClass("d-none");
    $("#detailsScreen").addClass("d-none");
})

function contact(){
    $("#mainScreen").addClass("d-none")
    $("#contactSection").removeClass("d-none");
    validation()
}

$("#nameInput").focus(()=>{
    nameInp = true
})
$("#emailInput").focus(()=>{
    emailInp = true
})
$("#phoneInput").focus(()=>{
    phoneInp = true
})
$("#ageInput").focus(()=>{
    ageInp = true
})
$("#passInput").focus(()=>{
    passInp = true
})
$("#repassInput").focus(()=>{
    repassInp = true
})

let  nameInp = false ;
let  emailInp = false ;
let  phoneInp = false ;
let  ageInp = false ;
let  passInp = false ; 
let  repassInp = false


function validation(){
    if(nameInp){
        if(validationName()){
            $("#warningName").addClass("d-none");
        }
        else{
            $("#warningName").removeClass("d-none");
            $("#warningName").html("Special characters and numbers not allowed")
        }
    }

    if(emailInp){
        if(validationEmail() ){
            $("#warningEmail").addClass("d-none");
        }
        else{
            $("#warningEmail").removeClass("d-none");
            $("#warningEmail").html("Email not valid *example@yyy.zzz")
        }
    }

    if(phoneInp){
        if( validationPhone() ){
            $("#warningPhone").addClass("d-none");
        }
        else{
            $("#warningPhone").removeClass("d-none");
            $("#warningPhone").html("Enter valid Phone Number")
        }
    }

    if(ageInp){
        if( validationAge() ){
            $("#warningAge").addClass("d-none");
        }
        else{
            $("#warningAge").removeClass("d-none");
            $("#warningAge").html("Enter valid age")
        }
    }

    if(passInp){
        if( validationPass() ){
            $("#warningPass").addClass("d-none");
        }
        else{
            $("#warningPass").removeClass("d-none");
            $("#warningPass").html("Enter valid password *Minimum 8 characters, at least one letter and one number*")
        }
    }

    if(repassInp){
        if(validationRepass() ){
            $("#warningRepass").addClass("d-none");
        }
        else{
            $("#warningRepass").removeClass("d-none");
            $("#warningRepass").html("Enter valid repassword")  
        }
    }

    if( validationName() && validationEmail() && validationPhone()
    && validationAge() && validationPass() && validationRepass() ){
       $("#contactSubmit").addClass("hoverBtn")
    }
    else{
        $("#contactSubmit").removeClass("hoverBtn")
    }
}

function validationName(){
    let nameInp =  $("#nameInput").val();
    let nameCode =  /^[a-z_-]{3,15}$/i ;
    let result1 = nameCode.test(nameInp);
    return(result1)
}

function validationEmail(){
    let emailInp = $("#emailInput").val();
    let emailCode = /^[a-z0-9_-]{1,}[@]{1}[a-z]{1,}[.]{1}[a-z]{2,}$/i
    let result2 = emailCode.test(emailInp);
    return(result2)
}

function validationPhone(){
    let phoneInp = $("#phoneInput").val();
    let phoneCode = /^01[0125][0-9]{8}$/ ;
    let result3 = phoneCode.test(phoneInp);
    return(result3)
}

function validationAge(){
    let ageInp = $("#ageInput").val();
    let ageCode = /^[0-9]{1,2}$/ ;
    let result4 = ageCode.test(ageInp) ;
    return(result4)
}

function validationPass(){
    let passInp = $("#passInput").val();
    let passCode = /^\w{8,}$/ ;
    let result5 = passCode.test(passInp) ;
    return(result5)
}

function validationRepass(){
    let passInp = $("#passInput").val();
    let rePassInp = $("#repassInput").val();
    return(rePassInp == passInp)
}


