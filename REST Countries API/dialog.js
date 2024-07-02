

const selectedRegion = new URLSearchParams(window.location.search).get('name')
const countriesContainer = document.querySelector('.countries-container')



fetch(`https://restcountries.com/v3.1/region/${selectedRegion}`)
    .then((response) => response.json())
    .then((data) => {
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
    })

const region = document.querySelector('select')
console.log(region);
const options = Array.from(region.getElementsByTagName('option'))
console.dir(options[0]);
// options[3].setAttribute('selected','selected')
const selectedCountry = options.find((element) => {

    return (element.getAttribute('value')).toLowerCase() === selectedRegion.toLowerCase()

})
selectedCountry.setAttribute('selected', 'selected')



window.addEventListener('beforeunload', function() {
    localStorage.setItem('reloadPage', 'true');
});
