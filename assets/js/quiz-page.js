let userQuizResult;
let quiz = [];

const url = 'https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes';
const token = 'aNWJQMxCMeOOL5Y0ThO5bESy'

axios.defaults.headers.common['Authorization'] = token;

function getQuizById(id) {

    axios.get(`${url}/${id}`)
    .then(res => {

        quiz = res.data;
        /* toggleQuizPage(); */
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

function renderQuiz() {

    userQuizResult = 0;
    
    /* Creates quiz title */
    const quizTitle = document.querySelector(".quiz-page-title");
    quizTitle.innerHTML = `
        <div class="image-overlay">
            <img src="${quiz.image}"/>
        </div>
        <h2>${quiz.title}</h2>
    `;

    quizTitle.scrollIntoView();

    const quizContent = document.querySelector(".quiz-page-content");
    quizContent.innerHTML = "";

    /* Shuffles answers */
    quiz.questions.map(question => {
        return question.answers.sort(() => {return Math.random() - 0.5});
    });

    let questionIndex = 0;
    const colors = [];

    quiz.questions.forEach(question => {

        colors.push(question.color);

        /* Creates quiz card */
        const cardTitle = `
            <div class="quiz-page-card">
                <div class="card-title">
                    <h3>${question.title}</h3>
                </div>
            <div class="card-questions question-${questionIndex}">
        `;

        let answersIndex = 0;
        let cardContent = "";

        const questionAnwsers = question.answers;
        questionAnwsers.forEach(answers => {

            /* Creates question answers */
            cardContent += `
                <div class="card-content answers-${answersIndex}" onclick="selectCard(this)">
                    <img src="${answers.image}"/>
                    <h4>${answers.text}</h4>
                </div>
            `;
            answersIndex++;
        });

        /* Render quiz page content */
        quizContent.innerHTML += cardTitle + cardContent;
        questionIndex++;
    });

    /* Render cardTitles background color */
    const cardTitles = quizContent.querySelectorAll(".card-title");
    for (let i = 0; i < cardTitles.length; i++) {

        const cardTitle = cardTitles[i];
        cardTitle.style.setProperty('background-color', colors[i]);
    }
}

function renderFinalResult() {

    userQuizResult = Math.round(userQuizResult);

    /* Sort minValues */
    const quizLevels = quiz.levels.sort((a, b) => {return (a.minValue - b.minValue)});

    let userLevel;

    /* Search user level */
    if (userQuizResult >= quizLevels[quizLevels.length - 1].minValue) {
        userLevel = quizLevels.length - 1;
    }
    else {

        for (let i = 0; i < quizLevels.length; i++) {

            if (userQuizResult <= quizLevels[i].minValue) {
                userLevel = i;
                break;
            }
        }
    }

    /* Render quiz final card */
    const quizContent = document.querySelector(".quiz-page-content");
    quizContent.innerHTML += `
        <div class="quiz-page-final-card">
            <div class="card-title">
                <h3>${userQuizResult}% de acerto: ${quizLevels[userLevel].title}</h3>
            </div>
            <div class="final-card-content">
                <img src="${quizLevels[userLevel].image}"/>
                <h4>${quizLevels[userLevel].text}</h4>
            </div>
        </div>
    `;

    document.querySelector(".quiz-page-buttons").classList.remove("hidden");
    quizContent.querySelector(".quiz-page-final-card").scrollIntoView();
}

function scrollToNextQuestion() {

    const selectedCards = document.querySelectorAll(".selected-card");
    const selectedCardsIds = [];

    selectedCards.forEach(card => {
        selectedCardsIds.push(getCardIndexByClassList(card));
    });

    const quizPageCards = document.querySelectorAll(".quiz-page-card");
    const cardQuestions = document.querySelectorAll(".card-questions");
    
    for (let i = 0; i < cardQuestions.length; i++) {
        
        const cardId = getCardIndexByClassList(cardQuestions[i]);
        
        if (cardId !== selectedCardsIds[i]) {
            quizPageCards[i].scrollIntoView();
            break;
        }
    }
}

function getCardIndexByClassList(card) {

    /* Return index value from question/anwser card */
    return Number(card.classList[1].split("-")[1]);
}

function selectCard(selector) {

    const cardQuestion = selector.parentNode;

    if (!cardQuestion.classList.contains("selected-card")) {

        const questionIndex = getCardIndexByClassList(cardQuestion);
        const selectedCardIndex = getCardIndexByClassList(selector);
        const quizAnwsers =  quiz.questions[questionIndex].answers;
        
        /* Check user answer */
        if (quizAnwsers[selectedCardIndex].isCorrectAnswer) {
            userQuizResult += (1 / quiz.questions.length) * 100;
        }

        /* Apply style on cards according to user selection */
        const cards = cardQuestion.querySelectorAll(".card-content");

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
        cardQuestion.classList.add("selected-card");
        setTimeout(scrollToNextQuestion, 2000);

        const selectedCards = document.querySelectorAll(".selected-card");

        /* Check if quiz endend */
        if (selectedCards.length === quiz.questions.length) {
            setTimeout(renderFinalResult, 2000);
        }
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

            if (card.classList.contains("correct-answer")) {
                card.classList.remove("correct-answer");
            }
            else {
                card.classList.remove("wrong-answer");
            }
        });
    });

    document.querySelector(".quiz-page-buttons").classList.add("hidden");
    renderQuiz();
}

function toggleQuizPage() {
    
    document.querySelector(".quiz-page-container").classList.toggle("hidden");
}

export { getQuizById, selectCard, resetQuiz, toggleQuizPage }