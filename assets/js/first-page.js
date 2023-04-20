const allQuizzesContainer = document.querySelector(".all-quizzes-container .quizzes-container");
const userQuizzesContainer = document.querySelector(".user-quizzes-container-regular .quizzes-container");
const quizPageContainer = document.querySelector(".quizz-page-container");
const firstPageContainer = document.querySelector(".first-page-container");
const thirdPageContainer = document.querySelector(".third-page-container");

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
                                        <div class="quiz" onclick="displaySecondPage()">
                                            <img src="${quiz.image}" alt="">
                                            <h1>${quiz.title}</h1>
                                        </div>
        `;
    });
}

function displaySecondPage() {
    firstPageContainer.classList.add("hidden");
    quizPageContainer.classList.remove("hidden");
}

function displayThirdPage() {
    firstPageContainer.classList.add("hidden");
    thirdPageContainer.classList.remove("hidden");
}