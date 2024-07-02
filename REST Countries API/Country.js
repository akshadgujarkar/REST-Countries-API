const countryName = new URLSearchParams(window.location.search).get('name')

const mainContent = document.querySelector('main')

let countriesData = [];

async function fetchCountriesData() {
  const response = await fetch('https://restcountries.com/v3.1/all');
  countriesData = await response.json();
}

fetchCountriesData()


function getCountryNameByCode(code) {
    const country = countriesData.find(country => country.cca3 === code);
    return country ? country.name.common : code; // Return the country name or the code if not found
  }

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
    .then(response => response.json())
    .then((data) => {
        const actualData = data[0]
        // console.dir(actualData);
        const div = document.createElement('div')
        div.classList.add('country-detail')


        const currency = JSON.stringify(actualData.currencies)
        //   console.log(currency);
        const currencyKey = currency[2] + currency[3] + currency[4].toString()
        let borderCountries = ''
        let noBorder = ''
        let getBorderCountriesHTML = ``
        if (!actualData?.borders) {
            noBorder = 'countries has no border'
            getBorderCountriesHTML =   `No Border Boundaries`
        }
        else {
            borderCountries = Object.values(actualData?.borders)
            borderCountries.forEach(element => {
                 const Name = getCountryNameByCode(element)
                getBorderCountriesHTML += `<a href="/Country.html?name=${Name}">${element}</a> `;
            });
        }

        div.innerHTML = `
      <img src="${actualData.flags.svg}" alt="${actualData.name.common}">
                    <div class="details-text-container">
                        <h1>${actualData.name.common}</h1>
                        <div class="details-text">
                            <p><b>Native name : </b>${actualData.name.official}</p>
                            <p><b>Population : </b>${actualData.population.toLocaleString()}</p>
                            <p><b>Region : </b>${actualData.region}</p>
                            <p><b>Sub-Region : </b>${actualData.subregion}</p>
                            <p><b>Capital : </b>${actualData.capital}</p>
                            <p><b>Top level : </b>${actualData.tld}</p>
                            <p><b>Currency : </b>${Object.values(actualData.currencies[currencyKey]).toString()} </p>
                            <p><b>languages : </b>${Object.values(actualData.languages).toString()}</p>
                        </div>
                         <div class="border-countries">
                            <p><b>Border Countries: </b>${getBorderCountriesHTML}</p>
                        </div>
                    </div>
 `


        mainContent.appendChild(div)

    })


    const darkMode = document.querySelector('#button')

   darkMode.addEventListener('click',(event)=>{
    
        
     
          const theme = localStorage.getItem('theme')
          if(theme === 'white'){
            localStorage.removeItem('theme')
            localStorage.setItem('theme','dark')
            event.target.innerText = 'White Mode'
            document.body.style.backgroundColor = '#273542'
            document.body.style.color =' white'
          
          }
          else{
           localStorage.removeItem('theme')
           localStorage.setItem('theme','white')
           document.body.style.backgroundColor = 'white'
           event.target.innerText = 'Dark Mode'
           document.body.style.color = 'black'
          }
   })



