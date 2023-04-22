import { getQuizById } from "./quiz-page.js";

const allQuizzesContainer = document.querySelector(".all-quizzes-container .quizzes-container");
const userQuizzesContainer = document.querySelector(".user-quizzes-container-regular .quizzes-container");
const quizPageContainer = document.querySelector(".quiz-page-container");
const firstPageContainer = document.querySelector(".first-page-container");
const thirdPageContainer = document.querySelector(".third-page-container");

getQuizzes();

function getQuizzes() {
    const promise = axios.get("https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes");
    promise.then(displayQuizzes);
    promise.catch(error => {
        console.log(error);
    });
}

function displayQuizzes(quizzes) {
    allQuizzesContainer.innerHTML = '';
    userQuizzesContainer.innerHTML = '';
    Array.from(quizzes.data).forEach(quiz => {
        allQuizzesContainer.innerHTML += `
                                        <div class="quiz id-${quiz.id}" onclick="displaySecondPage(this)">
                                            <img src="${quiz.image}" alt="">
                                            <h1>${quiz.title}</h1>
                                        </div>
        `;
    });
}

function getCardIndexByClassList(card) {

    /* Return index value from question/anwser card */
    return Number(card.classList[1].split("-")[1]);
}

function displaySecondPage(selector) {

    const quizId = getCardIndexByClassList(selector);

    firstPageContainer.classList.add("hidden");
    quizPageContainer.classList.remove("hidden");

    getQuizById(quizId);
}   

function displayThirdPage() {

    firstPageContainer.classList.add("hidden");
    thirdPageContainer.classList.remove("hidden");
}

export { getQuizzes, displayQuizzes, displaySecondPage, displayThirdPage }

window.displaySecondPage = displaySecondPage;