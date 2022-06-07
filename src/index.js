import "./style.css"

const button = document.querySelector(`.submit`)
const cityInput = document.querySelector(`#city`)
const countryInput = document.querySelector(`#country`)
const stateInput = document.querySelector(`#state`)

const getWeather = async (city, state, country) => {
  try {
    const metricResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${state},${country}&appid=1d696da35fa4857ee4d802fbeeff040e&units=metric`, { mode: `cors` })
    const imperialResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${state},${country}&appid=1d696da35fa4857ee4d802fbeeff040e&units=imperial`, { mode: `cors` })
    const metricData = await metricResponse.json()
    const imperialData = await imperialResponse.json()
    console.log(metricData)
    console.log(imperialData)
  } catch (error) {
    console.log(error)
  }
}
getWeather(`Los Angeles`, `CA`, `US`)
