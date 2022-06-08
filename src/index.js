/* eslint-disable max-len */
import "./style.css"

const button = document.querySelector(`.submit`)
const cityInput = document.querySelector(`#city`)
const countryInput = document.querySelector(`#country`)
const stateInput = document.querySelector(`#state`)
const imperialTitle = document.querySelector(`.imperial-title`)
const metricTitle = document.querySelector(`.metric-title`)
const imperialDisplay = document.querySelector(`.imperial-unit`)
const metricDisplay = document.querySelector(`.metric-unit`)
const humidity = document.querySelector(`.humidity`)
const gifContainer = document.querySelector(`.gif-container`)

imperialTitle.classList.add(`show`)
imperialDisplay.classList.add(`show`)

const getWeather = async (city, state, country, units) => {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${state},${country}&appid=1d696da35fa4857ee4d802fbeeff040e&units=${units}`, { mode: `cors` })
    const data = await response.json()
    console.log(data)
    return data
  } catch (error) {
    console.log(error)
  }
}

const displayWeather = async () => {
  try {
    const imperialWeather = await getWeather(cityInput.value, stateInput.value, countryInput.value, `imperial`)
    const metricWeather = await getWeather(cityInput.value, stateInput.value, countryInput.value, `metric`)
    imperialDisplay.textContent = `${Math.round(imperialWeather.main.temp)}F`
    metricDisplay.textContent = `${Math.round(metricWeather.main.temp)}C`
    humidity.textContent = `Humidity: ${imperialWeather.main.humidity}%`

    if (imperialWeather.main.temp > 80) {
      const response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=UE7HVAp1NlaL98z0ydH7FQ2oI6LFW060&s=heat`, { mode: `cors` })
      const gif = await response.json()
      gifContainer.src = gif.data.images.fixed_height.url
    }
    if (imperialWeather.main.temp < 80 && imperialWeather.main.temp > 60) {
      const response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=UE7HVAp1NlaL98z0ydH7FQ2oI6LFW060&s=nice`, { mode: `cors` })
      const gif = await response.json()
      gifContainer.src = gif.data.images.fixed_height.url
    } else {
      const response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=UE7HVAp1NlaL98z0ydH7FQ2oI6LFW060&s=freezing`, { mode: `cors` })
      const gif = await response.json()
      gifContainer.src = gif.data.images.fixed_height.url
    }
  } catch (error) {
    console.log(error)
  }
}

button.addEventListener(`click`, () => {
  displayWeather()
})

metricTitle.addEventListener(`click`, () => {
  metricTitle.classList.add(`show`)
  imperialTitle.classList.remove(`show`)
  imperialDisplay.classList.remove(`show`)
  metricDisplay.classList.add(`show`)
})
imperialTitle.addEventListener(`click`, () => {
  imperialTitle.classList.add(`show`)
  metricTitle.classList.remove(`show`)
  metricDisplay.classList.remove(`show`)
  imperialDisplay.classList.add(`show`)
})
