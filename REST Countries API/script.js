const countriesContainer = document.querySelector('.countries-container')
const main = document.querySelector('main')
const input = document.querySelector('input')
const region = document.querySelector('#region')

let countriesData = [];

async function fetchCountriesData() {
  const response = await fetch('https://restcountries.com/v3.1/all');
  countriesData = await response.json();
}
fetchCountriesData()
export {countriesData}
// function countryByRegion(region){
 
//      let sortedCountry = []
//     for(let i = 0; i<countriesData.length;i++){
//        const str = countriesData[i].region 
//         if(str.toLowerCase() === region){
//             sortedCountry[i] = countriesData[i].name.common
//         }
//     }
//     return sortedCountry
// }



fetch('https://restcountries.com/v3.1/all')
    .then((response) => response.json())
    .then((data) => {
        console.log(data[0]);
        data.forEach(element => {


            const countryCard = document.createElement('a')
            countryCard.href = `/Country.html?name=${element.name.common}`
            countryCard.classList.add('country-card')
            // const cardImg = document.createElement('img')
            // cardImg.src = 'https://flagcdn.com/wf.svg'
            // countryCard.appendChild(cardImg)
            countryCard.innerHTML = `
            <img src="${element.flags.svg}" alt="flag">
            <div class="card-text">
                <h3 class="card-title">${element.name.common}</h3>
                <p><b>Population: </b>${element.population.toLocaleString()}</p>
                <p><b>Region: </b>${element.region}</p>
                <p><b>Capital: </b>${element.capital}</p>
            </div>
`
            // countriesContainer.append('akshad',' gujarkar')
            countriesContainer.appendChild(countryCard)

        });
    }
    )
   
input.addEventListener('change',(eve)=>{
    let isPresent = false
  const foundCountry  = countriesData.filter((country)=>{
    if ((country.name.common).toLowerCase() ===  (eve.target.value).toLowerCase()) {
        isPresent = true
        return country
    }
    })
    // we get the country in isPresent variable
    if(isPresent){
        const [data] = foundCountry
      window.location.href =  `/Country.html?name=${data.name.common}`
    
   }
   else{
    countriesContainer.style.display = 'none'
    const error = document.querySelector('.error')
    error.style.display = 'block'
   }
})
input.addEventListener('blur',(event)=>{
      countriesContainer.style.display = ''
   
})


region.addEventListener('change',(event)=>{

    window.location.href = `/dialog.html?name=${event.target.value}`
   
    
})

window.addEventListener('load', function() {
    if (localStorage.getItem('reloadPage')) {
        localStorage.removeItem('reloadPage');
        window.location.reload();
    }
});

const darkMode = document.querySelector('#button')


 localStorage.setItem('theme','white')
darkMode.addEventListener('click',(event)=>{
 
  
  
       const theme = localStorage.getItem('theme')
       if(theme === 'white'){
         localStorage.removeItem('theme')
         localStorage.setItem('theme','dark')
         event.target.innerText = 'White Mode'
         document.body.style.backgroundColor = '#273542'
       
       }
       else{
        localStorage.removeItem('theme')
        localStorage.setItem('theme','white')
        document.body.style.backgroundColor = 'white'
        event.target.innerText = 'Dark Mode'
       }
})
// tomorrow's task
    //https://restcountries.com/v3.1/name/{name}?fullText=true
    // get the data from query params
    // to create a function who returns the arry of country belongs to same region
    // `https://restcountries.com/v3.1/region/${event.target.value}`