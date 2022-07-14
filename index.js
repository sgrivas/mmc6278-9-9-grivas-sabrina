const form=document.querySelector('#weather-app form')
const weatherEl=document.getElementById('weather')
const h2=document.createElement('h2')

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const userQuery=form.search.value
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
    form.search.value=''
    const milliTime=(dt)*1000
    const date = new Date(milliTime)
    const timeString = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
    })
    weatherEl.innerHTML=`
    <h2>${name}, ${country}</h2>
    <a href=https://www.google.com/maps/search/?api=1&query=${lat},${lon} target="_blank">Click to view map</a>
    <img src="https://openweathermap.org/img/wn/${icon}@2x.png">
    <p>${description}</p>
    <p>Current: ${temp}° F<p/>
    <p>Feels like: ${feels_like}° F</p>
    <p>Last updated: ${timeString}</p>
    `
}