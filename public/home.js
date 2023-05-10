const { response } = require("express")

const eightBall = document.querySelector('#circle')
const textSubmit = document.querySelector('#text')
const form = document.querySelector('#question')
const historyList = document.querySelector(`#history-list`)
const deleteBtn = document.querySelector(`#delete`)

const baseURL = '/8ball'

function submit(evt){
    evt.preventDefault()
    let body = {
        question: textSubmit.value
    }
    axios.post(baseURL, body)
        .then(response => {
            let last = response.data.length - 1
            alert(response.data[last].answer)
            console.log(body)
        }).catch(err => console.log(err))
}

function getHistory(evt){
    historyList.innerHTML = ``;
    evt.preventDefault()
    axios.get(baseURL).then(response => {
        let data = response.data
        for(let i = 0; i < data.length; i++){
            let historyTemp = document.createElement(`li`)
            let deleteHistory = document.createElement('p')

            deleteHistory.setAttribute('id',`id-${i}`)

            historyTemp.innerHTML = `
                Question: ${data[i].question} Answer: ${data[i].answer} <br> 
            `;
            deleteHistory.innerHTML = `
                X
            `;
            historyList.appendChild(historyTemp)
            deleteBtn.appendChild(deleteHistory)
        }
    }).catch(err => console.log(err))
}

function historyDelete (evt){
    evt.preventDefault()
    axios.delete(baseURL)
        .then(response => {

        }).catch(err => console.log(err))
}



eightBall.addEventListener('click', submit); 
eightBall.addEventListener('click', getHistory)
deleteBtn.addEventListener('click', historyDelete)
