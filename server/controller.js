const path = require('path');

const eightBallRes = [
    //positive answers
    `It is certain`,`It is decidedly so`,`Without a doubt`,`Yes definitely`,`You may rely on it`,
    `As I see it, yes`,`Most likely`,`Outlook good`,`Yes`,`Signs point to yes`,
    // non - committal answers
    `Reply hazy, try again`,`Ask again later`,`Better not tell you now`,`Cannot predict now`,
    `Concentrate and ask again`,
    // negative answers
    `Don't count on it`,`My reply is, no`,`My sources say no`,`Outlook not so good`,`Very doubtful`
];
const questionAnswerArr = [

];
module.exports = {
   // post
   submit: (request, response) => {
    let randomIndex = Math.floor(Math.random() * eightBallRes.length);
    let randomAnswer = eightBallRes[randomIndex];
    const {params,query,body} = request;
    let Qbody = {
        question: body.question,
        answer: randomAnswer
    }
    console.log(Qbody)
    questionAnswerArr.push(Qbody)
    console.log(questionAnswerArr)
    response.status(200).send(questionAnswerArr)
    //get
    },
    getHistory: (request, response) => {
        
        response.status(200).send(questionAnswerArr)
    },

    historyDelete: (request, response) => {
        let { index } = request.params
        questionAnswerArr.splice(index, 1)

        response.status(200).send(questionAnswerArr)
    }
}