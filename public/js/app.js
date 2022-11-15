console.log("client side js file")

const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent= 'From clientside js'

weatherform.addEventListener('submit', (event)=>{
    event.preventDefault()

    messageOne.textContent = "Loading...."
    messageTwo.textContent = ""
    const location = search.value

    fetch('http://localhost:3000/weather?address='+ location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            }
            else {
                messageOne.textContent = data.placename
                messageTwo.textContent = data.forecast
            }
        })
    })
    
})