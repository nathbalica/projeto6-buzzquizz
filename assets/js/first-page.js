import { getQuizById } from "./quiz-page.js";
import { startQuizz } from "./create-quiz.js"

const allQuizzesContainer = document.querySelector(".all-quizzes-container .quizzes-container");
const userQuizzesContainer = document.querySelector(".user-quizzes-container-regular .quizzes-container");
const quizPageContainer = document.querySelector(".quiz-page-container");
const firstPageContainer = document.querySelector(".first-page-container");
const createQuizcontainer = document.querySelector(".container");


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
    const storedIds = JSON.parse(localStorage.getItem("id")) || [];
    if (storedIds.length > 0) {
        document.querySelector(".user-quizzes-container-empty").classList.add("hidden");
        document.querySelector(".user-quizzes-container-regular").classList.remove("hidden");
        const temp = [];
        for (let i = 0; i < storedIds.length; i++) {
            temp.push(storedIds[i].id);
        }

        Array.from(quizzes.data).forEach(quiz => {
            if (temp.includes(quiz.id)) {
                userQuizzesContainer.innerHTML += `
                                        <div class="quiz id-${quiz.id}" onclick="displaySecondPage(this)">
                                            <img src="${quiz.image}" alt="">
                                            <h1>${quiz.title}</h1>
                                        </div>
        `;
            }
            else {
                allQuizzesContainer.innerHTML += `
                                        <div class="quiz id-${quiz.id}" onclick="test()">
                                            <img src="${quiz.image}" alt="">
                                            <h1>${quiz.title}</h1>
                                        </div>
        `;
            }
        });
    }
    else {
        Array.from(quizzes.data).forEach(quiz => {
                allQuizzesContainer.innerHTML += `
                                        <div class="quiz id-${quiz.id}" onclick="test()">
                                            <img src="${quiz.image}" alt="">
                                            <h1>${quiz.title}</h1>
                                        </div>
        `;
        });
    }

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

function createQuizz() {
    firstPageContainer.classList.add("hidden");
    createQuizcontainer.classList.remove("hidden");
    startQuizz();
}

export { getQuizzes, displayQuizzes, displaySecondPage, createQuizz }

window.displaySecondPage = displaySecondPage;
window.createQuizz = createQuizz;