const form=document.querySelector('#weather-app form')
const weatherEl=document.getElementById('weather')
const h2=document.createElement('h2')

form.addEventListener('submit', async function(e){
    e.preventDefault();
    const userQuery=this.search.value
    if (!userQuery) return
    const fetchURL = `https://api.openweathermap.org/data/2.5/weather?units=imperial&appid=eaa52095952f3eaa180f48bf7902508c&q=${userQuery}`
    try {
        const res = await fetch(fetchURL)
        if (res.status !== 200) throw new Error('Location not found')
        const data = await res.json()
        renderedCity(data);
    } catch (error) {
        weatherEl.innerHTML=''
        h2.textContent=error.message
        weatherEl.appendChild(h2)
        form.search.value=''
    }
})

const renderedCity = ({
    name,
    sys:{
        country
    },
    coord:{
        lat,
        lon
    },
    weather:[{
        icon,
        description
    }],
    main:{
        temp,
        feels_like
    },
    dt
}) => {
    weatherEl.innerHTML=''
    form.search.value=''

    h2.textContent=name+", "+country
    weatherEl.appendChild(h2)

    var map=document.createElement('a')
    map.href=`https://www.google.com/maps/search/?api=1&query=${lat},${lon}`
    map.target="_BLANK"
    map.textContent="Click to view map"
    weatherEl.appendChild(map)

    var img=document.createElement('img')
    img.src=`https://openweathermap.org/img/wn/${icon}@2x.png`
    weatherEl.appendChild(img)

    var condition=document.createElement('p')
    condition.textContent=description
    condition.style="text-transform: capitalize"
    weatherEl.appendChild(condition)

    var temp=document.createElement('p')
    temp.textContent=`Current: ${temp}° F`
    weatherEl.appendChild(temp)

    var feelslike=document.createElement('p')
    feelslike.textContent=`Feels like: ${feels_like}° F`
    weatherEl.appendChild(feelslike)

    var milliTime=(dt)*1000
    var date = new Date(milliTime)
    var timeString = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
    })
    var lastUpdated=document.createElement('p')
    lastUpdated.textContent=`Last updated: ${timeString}`
    weatherEl.appendChild(lastUpdated)
}