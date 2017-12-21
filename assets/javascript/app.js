$(document).ready(function() {
    function newGame() {
        $("#finalMessage").empty();
        $("#correctAnswers").empty();
        $("#incorrectAnswers").empty();
        $("#unanswered").empty();
        currentQuestion = 0;
        correctAnswer = 0;
        incorrectAnswer = 0;
        unanswered = 0;
        newQuestion();
    }

    var triviaQuestions = [{
        question: "What was the average interest rate in 1980?",
        answerList: ["20.05%", "13.74%", "8.95%", "6.75%"],
        answer: 1
    }, {
        question: "What was the average interest rate in 1990?",
        answerList: ["20.05%", "13.74%", "10.13%", "6.75%"],
        answer: 2
    }, {
        question: "What was the average interest rate in 2000?",
        answerList: ["20.05%", "10.00%", "8.05%", "6.75%"],
        answer: 2
    }, {
        question: "What was the average interest rate in 2010?",
        answerList: ["8.05%", "6.75%", "5.45%", "4.69%"],
        answer: 3
    }, {
        question: "From 1990 to current, which year saw the highest percentage drop in average home prices in Metro-Atlanta?",
        answerList: ["1991", "2001", "2009", "2012"],
        answer: 3
    }, {
        question: "From 1990 to current, which year saw the second highest percentage drop in average home prices in Metro-Atlanta?",
        answerList: ["1991", "2001", "2009", "2012"],
        answer: 2
    }, {
        question: "In which month do homes sell the most?",
        answerList: ["December", "April", "July", "September"],
        answer: 1
    }, {
        question: "In which season do homes sell the least?",
        answerList: ["Spring", "Summer", "Fall", "Winter"],
        answer: 0
    }];

    var gifArray = ["question1", "question2", "question3", "question4", "question5", "question6", "question7", "question8"];

    var messages = {
        correct: "You chose correctly!",
        incorrect: "Wrong choice.",
        endTime: "Out of time!",
        finished: "Here are your results:"
    }

    $('#startBtn').on('click', function() {
        $(this).hide();
        newGame();
    });

    $('#startOverBtn').on('click', function() {
        $(this).hide();
        newGame();
    });



    function newQuestion() {
        $("#message").empty();
        $("#correctedAnswer").empty();
        $("#gif").empty();
        answered = true;

        //sets up new questions & answerList
        $("#currentQuestion").html("Question #" + (currentQuestion + 1) + "/" + triviaQuestions.length);
        $(".question").html("<h2>" + triviaQuestions[currentQuestion].question + "</h2>");
        for (var i = 0; i < 4; i++) {
            var choices = $('<div>');
            choices.text(triviaQuestions[currentQuestion].answerList[i]);
            choices.attr({ 'data-index': i });
            choices.addClass('thisChoice');
            $('.answerList').append(choices);
        }
        countdown();
        //clicking an answer will pause the time and setup answerPage
        $('.thisChoice').on('click', function() {
            userSelect = $(this).data('index');
            clearInterval(time);
            answerPage();
        });
    }

    function countdown() {
        seconds = 15;
        $('#timeRemain').html('<h3>Time Remaining: ' + seconds + '</h3>');
        answered = true;
        //sets decrease in timer
        time = setInterval(showCountdown, 1000);
    }

    function showCountdown() {
        seconds--;
        $('#timeRemain').html('<h3>Time Remaining: ' + seconds + '</h3>');
        if (seconds < 1) {
            clearInterval(time);
            answered = false;
            answerPage();
        }
    }

    function answerPage() {
        $('#currentQuestion').empty();
        $('.thisChoice').empty(); //Clears question page
        $('.question').empty();

        var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
        var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
        $('#gif').html('<img src = "assets/images/' + gifArray[currentQuestion] + '.gif" width = "400px">');
        //checks to see correct, incorrect, or unanswered
        if ((userSelect == rightAnswerIndex) && (answered == true)) {
            correctAnswer++;
            $('#message').html(messages.correct);
        } else if ((userSelect != rightAnswerIndex) && (answered == true)) {
            incorrectAnswer++;
            $('#message').html(messages.incorrect);
            $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
        } else {
            unanswered++;
            $('#message').html(messages.endTime);
            $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
            answered = true;
        }

        if (currentQuestion == (triviaQuestions.length - 1)) {
            setTimeout(scoreboard, 5000)
        } else {
            currentQuestion++;
            setTimeout(newQuestion, 5000);
        }
    }

    function scoreboard() {
        $('#timeRemain').empty();
        $('#message').empty();
        $('#correctedAnswer').empty();
        $('#gif').empty();

        $('#finalMessage').html(messages.finished);
        $('#correctAnswers').html("Correct Answers: " + correctAnswer);
        $('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
        $('#unanswered').html("Unanswered: " + unanswered);
        $('#startOverBtn').addClass('reset');
        $('#startOverBtn').show();
        $('#startOverBtn').html('Start Over?');
    }
});