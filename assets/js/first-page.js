import { startAxios, getCardIndexByClassList } from "./main.js";
import { getQuizById } from "./quiz-page.js";
import { startQuizz } from "./create-quiz.js";

const allQuizzesContainer = document.querySelector(".all-quizzes-container .quizzes-container");
const userQuizzesContainer = document.querySelector(".user-quizzes-container-regular .quizzes-container");
const quizPageContainer = document.querySelector(".quiz-page-container");
const firstPageContainer = document.querySelector(".first-page-container");
const createQuizcontainer = document.querySelector(".container");

startAxios();
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
    allQuizzesContainer.scrollIntoView();

    Array.from(quizzes.data).forEach(quiz => {
        allQuizzesContainer.innerHTML += `
            <div class="quiz id-${quiz.id}" onclick="displayQuizPage(this)">
                <img src="${quiz.image}" alt="">
                <h2>${quiz.title}</h2>
            </div>
        `;
    });
}

function displayQuizPage(selector) {

    const quizId = getCardIndexByClassList(selector);
    firstPageContainer.classList.add("hidden");
    quizPageContainer.classList.remove("hidden");

    getQuizById(quizId);
}   

function createQuizz() {

    firstPageContainer.classList.add("hidden");
    createQuizcontainer.classList.remove("hidden");

    startQuizz();
}

export { getQuizzes, displayQuizzes, displayQuizPage, createQuizz };