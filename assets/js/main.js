let quiz = [];

const url = 'https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes';
const token = 'aNWJQMxCMeOOL5Y0ThO5bESy'

axios.defaults.headers.common['Authorization'] = token;

function getQuizById(id) {

    axios.get(`${url}/${id}`)
    .then(renderQuiz)
    .catch(err => {

        if (err.response.status === 404) {
            alert("ID invalido!");
        }
        else {
            alert("Erro Interno do Servidor!");
        }
    });
}

getQuizById(5);

function renderQuiz(res) {

    quiz = res.data
    
    /* Creates quiz title */
    const quizTitle = document.querySelector(".quiz-page-title");
    quizTitle.innerHTML = `
        <img src="${quiz.image}"/>
        <h2>${quiz.title}</h2>
    `;

    const quizContent = document.querySelector(".quiz-page-content");
    quizContent.innerHTML = "";

    quiz.questions.forEach(question => {

        /* Creates quiz card */
        const cardTitle = `
            <div class="quiz-page-card">
                <div class="card-title">
                    <h3>${question.title}</h3>
                </div>
            <div class="card-questions">
        `;

        /* Shuffles answers */
        const questionAwnsers = question.answers;
        questionAwnsers.sort(() => { 
            return Math.random() - 0.5
        });

        /* Creates question awnsers */
        let cardContent = "";
        questionAwnsers.forEach(awnser => {

            cardContent += `
                <div class="card-content" onclick="selectCard(this)">
                    <img src="${awnser.image}"/>
                    <h4>${awnser.text}</h4>
                </div>
            `;
        });

        /* Render quiz page content */
        quizContent.innerHTML += cardTitle + cardContent;
    });
    console.log(quiz);
}

function selectCard(selector) {

    const parentNode = selector.parentNode;
    if (!parentNode.classList.contains("selected-card")) {

        /*  To-do: Check boolean value from server (isCorrectAnswer) */

        const cards = parentNode.querySelectorAll(".card-content");
        cards.forEach(card => {

            if (card.innerHTML !== selector.innerHTML) {
                card.classList.add("card-opacity");
            }

            if (card.classList.contains("isCorrectAnswer")) {
                card.classList.add("correct-answer");
            }
            else {
                card.classList.add("wrong-answer");
            }
        });
        parentNode.classList.add("selected-card");
    }
}

function resetQuiz() {

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

            if (card.classList.contains("isCorrectAnswer")) {
                card.classList.remove("correct-answer");
            }
            else {
                card.classList.remove("wrong-answer");
            }
        });
    });
}