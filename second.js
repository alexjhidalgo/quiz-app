function renderHeader(){
    $(document).ready(function(){
        $('.header').html(`
        Score:
        ${STORE.answersCorrect}/${STORE.qPages.length}
        <br>
        `)
    })
}

function updateHeaderQNumber(){

    STORE.i++;
    $('p').detach()
    $('.header').prepend(`
    <p> Question: ${STORE.i}/${STORE.qPages.length} 
    </p>`)

}

function updateHeaderCorrect(){

        STORE.currentQuestion++
        STORE.answersCorrect++

        $('.header').html(`

        Score:
        ${STORE.answersCorrect}/${STORE.qPages.length}
        `)
        console.log(`updateHeader Ran`)

}

function updateHeaderIncorrect(){

    STORE.currentQuestion++

    $('.header').html(`

    Score:
    ${STORE.answersCorrect}/${STORE.qPages.length}
    `)
    console.log(`updateHeader Ran`)

}


// function renderLandingPage(){
//     $(document).ready(function(){
//         $('.landingPage').html(`
//         <h1>Like quoting movies and TV Shows?</h1>
//         <h2>Take a quiz to see what you can quote!</h2>
//         <button> Start Quiz! </button>
//         `)
//     })
// }

function hidelandingpage(){
    $('.landingPage').on('click', 'button', function(){
        $('.landingPage').hide();
        $('.questionsPage').show();
        updateHeaderQNumber();
        $('.header').show();
    })
}


// function renderNextQuestionsPage(){
//     $('.answersPage').on('click', 'button', function(){

        
//         $('.answersPage').hide();
//         $('.questionsPage').show();
//     })
// }

function renderQuestionsPage(){
    $('.js-qRender').on('click', 'button', function(){

        $('.answersPage').hide();

        if (STORE.currentQuestion < 10){
            $('.questionsPage').show();
        }
        

        const qPageNum = STORE.qPages[STORE.currentQuestion]

        $('.questionsPage').html(`
        <br>
        <br>
        <h1>"${STORE.qPages[STORE.currentQuestion].startQuote}"</h1>
        <h3>What comes next?</h3>
        <form>
            <input value='0' id='ans0' type='radio' name='endQuote' checked>
                <label>${qPageNum.answers[0]}</label>
   
            <br>

            <input value='1' id='ans1' type='radio' name='endQuote'>
                <label>${qPageNum.answers[1]}</label>

            <br>

            <input value='2'id='ans2' type='radio' name='endQuote'>
                <label>${qPageNum.answers[2]}</label>
 
            <br>

            <input value='3' id='ans3' type='radio' name='endQuote'>
                <label>${qPageNum.answers[3]}</label>
        </form>
        <br>
        <button> Final Answer </button>
        `)
    })
}



function renderAnswersPage(){
    $('.questionsPage').on('click', 'button', function(){
        $('.questionsPage').hide();
        $('.landingPage').hide();

        let chosenElem = document.querySelector('input[name=endQuote]:checked ~ label');
        let chosenAnswer = chosenElem.innerHTML;
        let i = STORE.currentQuestion;
        let correctAnswer = STORE.qPages[i].theEndQuote;
        

        if (chosenAnswer === correctAnswer){

            $('.answersPage').html(`
            <h1> That\'s Right! <h1>
            <h2> The full quote is "${STORE.qPages[i].startQuote} ... ${STORE.qPages[i].theEndQuote}" </h2>
            <button> Next </button>
            `)
            updateHeaderCorrect();
            updateHeaderQNumber();
        }

        else if (chosenAnswer !== correctAnswer){

            $('.answersPage').html(`
            <h1> That\'s not Right! <h1>
            <h2> The full quote is "${STORE.qPages[i].startQuote} ... ${STORE.qPages[i].theEndQuote}" </h2>
            <button> Next </button>
            `)
            updateHeaderIncorrect();
            updateHeaderQNumber();
        }




        $('.answersPage').show();
    })

}

function renderSummaryPage(){
    $('.answersPage').on('click', 'button', function(){
        $('.summaryPage').html(`
        <h1> Way to go! </h1>
        <h2> You completed the quiz!</h2>
        <h2> and your score is ${STORE.answersCorrect} out of 10!</h2>
        <button> Try Again? </button>
        `)
        if(STORE.currentQuestion === 10){
            $('.header').hide();
            $('.questionsPage').hide();
            $('.summaryPage').show();
        }
    })
}

function showLandingPageAgain(){
    $('.summaryPage').on('click', 'button', function(){
        $('.summaryPage').hide();
        renderHeader();
        $('.landingPage').show();
        STORE.currentQuestion = 0;
        STORE.score = 0;
        STORE.i = 0;
        STORE.answersCorrect = 0;

    })
}


function initialize(){
    $('.questionsPage').hide();
    $('.answersPage').hide();
    $('.summaryPage').hide();
    renderHeader();
    hidelandingpage();
    renderQuestionsPage();
    renderAnswersPage();
    renderSummaryPage();
    showLandingPageAgain();
    console.log(`initialize function ran`)
}

$(initialize)