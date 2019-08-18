'use strict';

{
  const start = document.getElementById('start');
  const welcome = document.getElementById('welcome');
  const question_kind = document.getElementById('question_kind');
  const text = document.getElementById('text');
  const category_h2 = document.createElement('h2');

  start.addEventListener('click', () => {
    welcome.textContent = "取得中";
    text.textContent = "少々お待ちください";

    // 開始ボタンの消去
    start.style.display = "none";

    // API取得
    fetch('https://opentdb.com/api.php?amount=10')
    .then(response => {
      return response.json();
    })
    .then(text => {
      // console.log(text);
      category_h2.textContent += "[ジャンル]" + text.results[0].category + "\n" + "[難易度]" + text.results[0].difficulty;
      question_kind.appendChild(category_h2);
    });
  });

}

