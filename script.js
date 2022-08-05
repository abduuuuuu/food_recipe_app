const form = document.querySelector('form');
const search_results = document.querySelector('.food-container');
let searchQuery='';
APP_ID ='c125b695';
APP_KEY='506d167d7b406145570e849873251f32';


form.addEventListener('submit',(e)=>{
    e.preventDefault();
    searchQuery=e.target.querySelector('input').value;
     fetchAPI();
})

async function fetchAPI(){
    const baseURL=`https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}&to=30`;
   const response = await fetch(baseURL);
   const data = await response.json();
   console.log(data);
   generateHtml(data.hits);
}

function generateHtml(results){
var generatedHtml='';
results.map(result=>{
    generatedHtml+=`
    <div class="food-item">
    <img src="${result.recipe.image}" alt="food-image">
    <div class="flex">
        <div class="food-name">${result.recipe.label}</div>
        <div class="food-calories">${result.recipe.calories.toFixed(2)} cal</div>
    </div>
    <a href="${result.recipe.url}">Get recipe</a>
</div>
    `;
})
search_results.innerHTML=generatedHtml;
}