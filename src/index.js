import "./styles.css";

const onClickAdd = () => {
  // テキストボックスの値を取得し、初期化する
  const inputText = document.getElementById("add-text").value;
  console.log(inputText);

  if (inputText === "") {
    alert("タスク名を入力してください");
    return;
  }

  document.getElementById("add-text").value = "";

  createIncompleteList(inputText);
};

// 未完了リストから指定の要素を削除
const deleteFromIncompleteList = (target) => {
  document.getElementById("incomplete-list").removeChild(target);
};

// 未完了リストに追加する関数
const createIncompleteList = (text) => {
  // liタグを生成する
  const li = document.createElement("li");

  // divタグ生成
  const div = document.createElement("div");
  div.className = "list-row";

  // タスク名
  const p = document.createElement("p");
  p.innerText = text;
  div.appendChild(p);

  // 完了ボタン
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  completeButton.addEventListener("click", () => {
    // なんで消した後に　 addTarget が取得できる？
    deleteFromIncompleteList(completeButton.parentNode.parentNode);

    const addTarget = completeButton.parentNode;
    const text = addTarget.firstChild.innerText;
    addTarget.textContent = null;

    const p = document.createElement("p");
    p.innerText = text;

    // 戻すボタン
    const backButton = document.createElement("button");
    backButton.innerText = "戻す";
    backButton.addEventListener("click", () => {
      // 押された戻すボタンの親タグを完了リストから削除する
      const deleteTarget = backButton.parentNode.parentNode;
      document.getElementById("complete-list").removeChild(deleteTarget);

      // テキスト取得
      const text = backButton.parentNode.firstChild.innerText;
      createIncompleteList(text);
    });

    addTarget.appendChild(p);
    addTarget.appendChild(backButton);

    const li = document.createElement("li");
    li.appendChild(addTarget);
    console.log(li);

    document.getElementById("complete-list").appendChild(li);
  });
  div.appendChild(completeButton);

  // 削除ボタン
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  deleteButton.addEventListener("click", () => {
    deleteFromIncompleteList(deleteButton.parentNode.parentNode);
  });
  div.appendChild(deleteButton);

  // liタグの子要素に各要素を設定する
  li.appendChild(div);

  // 未完了リストに追加する
  document.getElementById("incomplete-list").appendChild(li);
};

document
  .getElementById("add-button")
  .addEventListener("click", () => onClickAdd());
