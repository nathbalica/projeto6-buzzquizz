import { startAxios, getIndexByClassList } from "./main.js";
import { getQuizById } from "./quiz-page.js";
import { startQuizz } from "./create-quiz.js";

const allQuizzesContainer = document.querySelector(".all-quizzes-container .quizzes-container");
const userQuizzesContainer = document.querySelector(".user-quizzes-container-regular .quizzes-container");
const quizPageContainer = document.querySelector(".quiz-page-container");
const firstPageContainer = document.querySelector(".first-page-container");
const createQuizcontainer = document.querySelector(".container");
const loadingScreen = document.querySelector(".loading-screen");

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
    document.body.scrollTop = document.documentElement.scrollTop = 0;

    let hasQuiz = false;
    const storedIds = JSON.parse(localStorage.getItem("ids")) || [];
    if (storedIds.length > 0) {
        const temp = [];
        for (let i = 0; i < storedIds.length; i++) {
            temp.push(storedIds[i].id);
        }
        Array.from(quizzes.data).forEach(quiz => {
            if (temp.includes(quiz.id)) hasQuiz = true;
        });
        if (hasQuiz) {
            document.querySelector(".user-quizzes-container-empty").classList.add("hidden");
            document.querySelector(".user-quizzes-container-regular").classList.remove("hidden");
            Array.from(quizzes.data).forEach(quiz => {
                if (temp.includes(quiz.id)) {
                    userQuizzesContainer.innerHTML += `
                        <div class="quiz id-${quiz.id}" data-test="my-quiz" onclick="displayQuizPage(this)">
                            <img src="${quiz.image}" alt="">
                            <h1>${quiz.title}</h1>
                            <div class="bonus-buttons">
                                <ion-icon name="create-outline" data-test="edit" onclick="editQuiz(this); event.stopPropagation()"></ion-icon>
                                <ion-icon name="trash-sharp" data-test="delete" onclick="deleteQuiz(this); event.stopPropagation();"></ion-icon>
                            </div>
                        </div>
                    `;
                }
                else {
                    allQuizzesContainer.innerHTML += `
                        <div class="quiz id-${quiz.id}" data-test="others-quiz" onclick="displayQuizPage(this)">
                            <img src="${quiz.image}" alt="">
                            <h1>${quiz.title}</h1>
                        </div>
                    `;
                }
            });
        }
        else {
            document.querySelector(".user-quizzes-container-empty").classList.remove("hidden");
            document.querySelector(".user-quizzes-container-regular").classList.add("hidden");
            Array.from(quizzes.data).forEach(quiz => {
                allQuizzesContainer.innerHTML += `
                    <div class="quiz id-${quiz.id}" data-test="others-quiz" onclick="displayQuizPage(this)">
                        <img src="${quiz.image}" alt="">
                        <h1>${quiz.title}</h1>
                    </div>
                `;
            });
            localStorage.clear();
        }

    }
    else {
        Array.from(quizzes.data).forEach(quiz => {
            allQuizzesContainer.innerHTML += `
                <div class="quiz id-${quiz.id}" data-test="others-quiz" onclick="displayQuizPage(this)">
                    <img src="${quiz.image}" alt="">
                    <h1>${quiz.title}</h1>
                </div>
            `;
        });
    }
    
    loadingScreen.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
    firstPageContainer.classList.remove("hidden");
}

function createQuizz() {

    firstPageContainer.classList.add("hidden");
    createQuizcontainer.classList.remove("hidden");
    startQuizz();
}

function displayQuizPage(selector) {

    const quizId = getIndexByClassList(selector);
    firstPageContainer.classList.add("hidden");
    quizPageContainer.classList.remove("hidden");

    getQuizById(quizId);
}

function findStoredId(quiz, method) {

    const id = getIndexByClassList(quiz);
    const storedIds = JSON.parse(localStorage.getItem("ids")) || [];

    for (let i = 0; i < storedIds.length; i++) {
        if (id === storedIds[i].id) {

            loadingScreen.classList.remove("hidden");
            document.body.classList.add("overflow-hidden");
            
            const url = `https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes/${id}`;

            if (method === 'put') {

                const quizUrl = 'https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes'

                axios.get(`${quizUrl}/${id}`)
                .then(res => {
            
                    const quiz = res.data;
                    const config = {

                        body: {
                            title: quiz.title,
                            image: quiz.image,
                            questions: quiz.questions,
                            levels: quiz.levels
                        },
                    
                        headers: {
                            "Secret-Key": storedIds[i].key 
                        }
                    };
                    const packageStoredID = {url: url, config: config};
                    console.log(packageStoredID.url, packageStoredID.config);
                    axios.put(packageStoredID.url, packageStoredID.config)
                    .then(() => {
                        console.log("teste");
                    })
                    .catch(e => console.log(e));
                })
                .catch(e => console.log(e));
            }

            else if (method === 'delete') {

                const config = {
                    headers:{
                        "Secret-Key": storedIds[i].key
                    }
                };
                return {url: url, config: config};
            }             
        }
    }
}

function editQuiz(editButton) {

    const quiz = editButton.parentElement.parentElement;
    const method = "put";
    findStoredId(quiz, method);
}

function deleteQuiz(deleteButton) {
    if (confirm("Tem certeza de que deseja excluir este quiz?")) {
        const quiz = deleteButton.parentElement.parentElement;
        const method = "delete";
        const packageStoredID = findStoredId(quiz, method);

        console.log(packageStoredID);

        axios.delete(packageStoredID.url, packageStoredID.config)
        .then(getQuizzes)
        .catch(e => console.log(e));
    }
}

export { getQuizzes, displayQuizzes, displayQuizPage, createQuizz, editQuiz, deleteQuiz };
