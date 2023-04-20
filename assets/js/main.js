let userQuizResult;
let quiz = [];

const url = 'https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes';
const token = 'aNWJQMxCMeOOL5Y0ThO5bESy'

axios.defaults.headers.common['Authorization'] = token;

function getQuizById(id) {

    axios.get(`${url}/${id}`)
    .then(res => {

        quiz = res.data;
        renderQuiz();
    })
    .catch(err => {

        if (err.response.status === 404) {
            alert("ID invalido!");
        }
        else {
            alert("Erro Interno do Servidor!");
        }
    });
}

getQuizById(21);

function renderQuiz() {

    userQuizResult = 0;
    
    /* Creates quiz title */
    const quizTitle = document.querySelector(".quiz-page-title");
    quizTitle.innerHTML = `
        <img src="${quiz.image}"/>
        <h2>${quiz.title}</h2>
    `;

    const quizContent = document.querySelector(".quiz-page-content");
    quizContent.innerHTML = "";

    /* Shuffles answers */
    quiz.questions.map(question => {
        return question.answers.sort(() => {return Math.random() - 0.5});
    });

    let questionIndex = 0;
    quiz.questions.forEach(question => {

        /* Creates quiz card */
        const cardTitle = `
            <div class="quiz-page-card">
                <div class="card-title">
                    <h3>${question.title}</h3>
                </div>
            <div class="card-questions question-${questionIndex}">
        `;

        let awnserIndex = 0;
        let cardContent = "";

        const questionAwnsers = question.answers;
        questionAwnsers.forEach(awnser => {

            /* Creates question awnsers */
            cardContent += `
                <div class="card-content awnser-${awnserIndex}" onclick="selectCard(this)">
                    <img src="${awnser.image}"/>
                    <h4>${awnser.text}</h4>
                </div>
            `;
            awnserIndex++;
        });

        /* Render quiz page content */
        quizContent.innerHTML += cardTitle + cardContent;
        questionIndex++;
    });
}

function getCardIndexByClassList(card) {
    return Number(card.classList[1].split("-")[1]);
}

function selectCard(selector) {

    const parentNode = selector.parentNode;
    if (!parentNode.classList.contains("selected-card")) {

        const questionIndex = getCardIndexByClassList(parentNode);
        const selectedCardIndex = getCardIndexByClassList(selector);
        const quizAnwsers =  quiz.questions[questionIndex].answers;
        
        /* Correct answer by user */
        if (quizAnwsers[selectedCardIndex].isCorrectAnswer) {
            userQuizResult += (1 / quiz.questions.length) * 100;
        }

        const cards = parentNode.querySelectorAll(".card-content");
        for (let i = 0; i < cards.length; i++) {

            const card = cards[i];
            
            if (i !== selectedCardIndex) {
                card.classList.add("card-opacity");
            }

            if (quizAnwsers[i].isCorrectAnswer) {
                card.classList.add("correct-answer");
            }
            else {
                card.classList.add("wrong-answer");
            }
        }
        parentNode.classList.add("selected-card");
    }
}

function resetQuiz() {

    userQuizResult = Math.round(userQuizResult);
    alert(`Pontuação Final: ${userQuizResult}`);

    /*  Get all question cards from quiz page content and reset 
     *  classes and styles from selectCard function. */

    const questionCards = document.querySelector(".quiz-page-content").querySelectorAll(".card-questions");
    questionCards.forEach(questionCard => {

        questionCard.classList.remove("selected-card");

        const cards = questionCard.querySelectorAll(".card-content");
        cards.forEach(card => {

            if (card.classList.contains("card-opacity")) {
                card.classList.remove("card-opacity");
            }

            if (card.classList.contains("correct-answer")) {
                card.classList.remove("correct-answer");
            }
            else {
                card.classList.remove("wrong-answer");
            }
        });
    });
    renderQuiz();
}