const eightBall = document.querySelector('#circle')
const textSubmit = document.querySelector('#text')
const form = document.querySelector('#question')
const historyList = document.querySelector(`#history-list`)

function getHistoryListFunction(data){
    for(let i = 0; i < data.length; i++){
        let historyTemp = document.createElement(`li`)
        let deleteHistory = document.createElement('p')

        deleteHistory.setAttribute(`class`, `QAHistoryDelete`)
        deleteHistory.setAttribute('id',`${i}`)
        historyTemp.setAttribute('class',`logs` )

        historyTemp.innerHTML = `
            -Log${i + 1}- `+`  ||Question: ${data[i].question}||`+`||Answer: ${data[i].answer}|| <br>
        `;
        deleteHistory.innerHTML = `
            X
        `;
        historyList.appendChild(historyTemp)
        historyTemp.appendChild(deleteHistory)
        deleteHistory.addEventListener('click', historyDelete)
    }
}

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
        getHistoryListFunction(data)
    }).catch(err => console.log(err))
}

function historyDelete (evt){
    historyList.innerHTML = ``;
    evt.preventDefault()
    axios.delete(baseURL + `/${evt.target.getAttribute('id')}`)
        .then(response => {
            let data = response.data
            getHistoryListFunction(data)
        }).catch(err => console.log(err))
}



eightBall.addEventListener('click', submit); 
eightBall.addEventListener('click', getHistory)
