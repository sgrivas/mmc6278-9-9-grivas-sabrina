const form=document.querySelector('#weather-app form')
const weatherEl=document.getElementById('weather')
const h2=document.createElement('h2')

const weatherUrl = "https://api.openweathermap.org/data/2.5/weather"

form.addEventListener('submit', async function(e){
    e.preventDefault();
    const userQuery=this.search.value
    if (!userQuery) return
    const queryString = "?units=imperial&appid=eaa52095952f3eaa180f48bf7902508c&q=" + userQuery
    const fetchURL = weatherUrl + queryString
    const res = await fetch(fetchURL)
    .then(function(res){
        if (res.status !== 200){
            throw new Error('Location not found')
        } 
        return res.json()
    })
    .then(renderedCity)
    .catch(function(err) {
        weatherEl.innerHTML=''
        h2.textContent=err.message
        weatherEl.appendChild(h2)
        form.search.value=''
    })
})

function renderedCity(city){
    weatherEl.innerHTML=''
    form.search.value=''

    h2.textContent=city.name+", "+city.sys.country
    weatherEl.appendChild(h2)

    var map=document.createElement('a')
    map.href=`https://www.google.com/maps/search/?api=1&query=${city.coord.lat},${city.coord.lon}`
    map.target="_BLANK"
    map.textContent="Click to view map"
    weatherEl.appendChild(map)

    var img=document.createElement('img')
    img.src=`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`
    weatherEl.appendChild(img)

    var condition=document.createElement('p')
    condition.textContent=city.weather[0].description
    condition.style="text-transform: capitalize"
    weatherEl.appendChild(condition)

    var temp=document.createElement('p')
    temp.textContent=`Current: ${city.main.temp}° F`
    weatherEl.appendChild(temp)

    var feelslike=document.createElement('p')
    feelslike.textContent=`Feels like: ${city.main.feels_like}° F`
    weatherEl.appendChild(feelslike)

    var milliTime=(city.dt)*1000
    var date = new Date(milliTime)
    var timeString = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
    })
    var lastUpdated=document.createElement('p')
    lastUpdated.textContent=`Last updated: ${timeString}`
    weatherEl.appendChild(lastUpdated)
}