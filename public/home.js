const eightBall = document.querySelector('#circle')
const textSubmit = document.querySelector('#text')
const form = document.querySelector('#question')
const historyBtn = document.querySelector('#history-button')
const historyList = document.querySelector(`#history-list`)

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
    evt.preventDefault()
    axios.get(baseURL).then(response => {
        let data = response.data
        for(let i = 0; i < data.length; i++)
            historyList.innerHTML = `
                <li>Question: ${data[i].question} Answer: ${data[i].answer}</li>
            `;
    }).catch(err => console.log(err))
}



eightBall.addEventListener('click', submit); 
historyBtn.addEventListener('click', getHistory)
