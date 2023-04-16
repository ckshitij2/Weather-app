
const weatherForm = document.querySelector('form')
const search = weatherForm.querySelector('input')
const messageOne = document.getElementById('message-1')
const messageTwo = document.getElementById('message-2')

//console.log(userInput)
const callback = (e) => {
    e.preventDefault()
    const userInput = search.value
    console.log(userInput)
    const url = `http://localhost:3000/weather?address=${userInput}`
    fetch(url).then((response) => {
        response.json().then((data) => {
            //    console.log(data)
            const key = Object.keys(data)
            // console.log(key) 
            if (key.length === 0) {
                messageOne.innerHTML = "No Data Found ! Please enter a vaild location"
            }
            else if (key.length === 1) {
                messageOne.innerHTML = data[key[0]]
            }
            else {
                let message = `${data.weather_descriptions[0]}
        The temperature outside is ${data.temperature} but feels like ${data.feelslike}.
        The visisblity is ${data.visibility}
        `


                messageTwo.innerHTML = message
            }
        })
    })
}

weatherForm.addEventListener('submit', callback)

console.log("Lets Log the weather...")