'use strict';

{
  const start = document.getElementById('start');
  const welcome = document.getElementById('welcome');
  const question_kind = document.getElementById('question_kind');
  const content_display = document.getElementById('content_display');
  const category = document.getElementById('category');
  const difficulty = document.getElementById('difficulty');
  const choices_display = document.getElementById('choices_display');

  // [ジャンル][難易度]要素の非表示
  question_kind.style.display = "none";
  let countCorrect2 = 0;

  start.addEventListener('click', () => {
    welcome.textContent = "取得中";
    content_display.textContent = "少々お待ちください";

    // 開始ボタンの消去
    start.style.display = "none";

    // API取得
    fetch('https://opentdb.com/api.php?amount=10')
    .then(response => {
      return response.json();
    })
    .then(quizObj => {
      question_kind.style.display = "block";

      let number = 0;
      console.log(quizObj);
      const firstQuiz = new quizSet(quizObj, number);

      // ２問目以降の表示
      choices_display.addEventListener('click', () => {
        number++;
        if(number < quizObj.results.length) {
          category.textContent = '[ジャンル]';
          difficulty.textContent = '[難易度]';
          content_display.textContent = '';
          choices_display.textContent = '';
          const secondQuiz = new quizSet(quizObj, number);
        }else{
          welcome.textContent = `あなたの正解数は${countCorrect2}です！！`;
          content_display.textContent = '再度チャレンジしたい場合は以下をクリック';
          category.textContent = '';
          difficulty.textContent = '';
          choices_display.textContent = '';
          const homeButton = document.createElement('button');
          homeButton.type = 'button';
          homeButton.textContent = 'ホームに戻る';
          homeButton.addEventListener('click', () => {
            location.href = 'index.html';
          });
          choices_display.appendChild(homeButton);
        }
      });
    });
  });
    class quizSet {
      constructor(quizObj, number) {
        welcome.textContent = "問題" + (number + 1);
        // ジャンル、難易度、問題の表示
        category.textContent += quizObj.results[number].category;
        difficulty.textContent += quizObj.results[number].difficulty;

        // 特殊文字の置き換え
        const question = quizObj.results[number].question;
        function replacement(question) {
          return question
          .replace(/&quot;/g, '"')
          .replace(/&ldquo;/g, '“')
          .replace(/&rdquo;/g, '”')
          .replace(/&#039;/g, "'")
          .replace(/&amp;/g, '&')
          .replace(/&eacute;/g, 'é')
          .replace(/&uuml;/g, 'ü');
        }
        content_display.textContent = replacement(question);

        const choices = [];

        // 正解の選択肢をchoicesにプッシュ
        choices.push(quizObj.results[number].correct_answer);

        // 不正解の選択肢をchoicesにプッシュ
        for (let i = 0; i < quizObj.results[number].incorrect_answers.length; i++) {
          choices.push(quizObj.results[number].incorrect_answers[i]);
        }

        // choicesをシャッフル
        for (let i = choices.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [choices[j], choices[i]] = [choices[i], choices[j]];
        }

        // 選択肢のボタンを生成
        choices.forEach(value => {
          const choice_button = document.createElement('button');
          const newDiv = document.createElement('div');
          choice_button.type = 'button';
          choice_button.textContent = value;
          newDiv.appendChild(choice_button);
          choices_display.appendChild(newDiv);
          choice_button.addEventListener('click', () => {
            if (choice_button.textContent === quizObj.results[number].correct_answer) {
              countCorrect2++;
            }
          });
        });
      }
    }
}
