axios.defaults.headers.common['Authorization'] = 'aNWJQMxCMeOOL5Y0ThO5bESy';

const url = 'https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes'


let quizz = {};

function GetQuizzesById(id){
    const promisse = axios.get(`${url}/${id}`)
    promisse.then(renderQuizz)

}

function renderQuizz(response){
    const dataQuizz = response.data
    quizz = dataQuizz;

}

function successGettingQuizzes(response){
    console.log(response);
    //mensagens = resposta.data;
}

function errorGettingQuizzes(error){
    console.log('Erro ao buscar as mensagens');
}

GetQuizzesById(7)