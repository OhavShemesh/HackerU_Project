window.addEventListener("load", () => {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  let index;
  let num1, num2;
  let problemplace = document.querySelector(".multiplicationproblem>h1");
  let solutions = document.querySelectorAll(".mulsol");
  let difficulty = document.querySelector(".mulselect");
  let right = document.querySelector(".mulright");
  let wrong = document.querySelector(".mulwrong");
  let rightcount = localStorage.getItem("mulrightcount");
  right.innerHTML = rightcount;
  let wrongcount = localStorage.getItem("mulwrongcount");
  wrong.innerHTML = wrongcount;
  localStorage.setItem("difficulty", 10);
  const changeDifficulty = () => {
    difficulty.addEventListener("change", (option) => {
      let selectedoption = option.target.value;
      localStorage.setItem("difficulty", parseInt(selectedoption));
      updateNumbers();
      giveproblem();
      soloptions();
    });
  };
  const setindex = () => {
    index = getRandomInt(0, 5);
  };
  const updateNumbers = () => {
    let selectedDifficulty = localStorage.getItem("difficulty");
    selectedDifficulty = parseInt(selectedDifficulty);

    if (selectedDifficulty === 10) {
      num1 = getRandomInt(1, 10);
      num2 = getRandomInt(1, 10);
    }
    if (selectedDifficulty == 50) {
      num1 = getRandomInt(1, 50);
      num2 = getRandomInt(1, 50);
    }
    if (selectedDifficulty == 100) {
      num1 = getRandomInt(1, 100);
      num2 = getRandomInt(1, 100);
    }
    if (selectedDifficulty == 1000) {
      num1 = getRandomInt(1, 1000);
      num2 = getRandomInt(1, 1000);
    }
  };

  const resetcount = () => {
    let resetbtn = document.querySelector(".mulresetbutton");
    resetbtn.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.setItem("mulrightcount", 0);
      localStorage.setItem("mulwrongcount", 0);
      wrongcount = 0;
      rightcount = 0;
      right.innerHTML = 0;
      wrong.innerHTML = 0;
    });
  };

  const giveproblem = () => {
    updateNumbers();
    problemplace.innerHTML = num1 + "X" + num2 + "=";
  };

  const soloptions = () => {
    for (let solution of solutions) {
      solution.innerHTML = getRandomInt(num1, num2 * num1);
    }
    solutions[index].innerHTML = num1 * num2;
  };

  const rightorwrong = () => {
    for (let solution of solutions) {
      solution.addEventListener("click", () => {
        if (solution.innerHTML == num1 * num2) {
          solution.style.backgroundColor = "green";
          rightcount++;
          right.innerHTML = rightcount;
          localStorage.setItem("mulrightcount", rightcount);

          document.body.style.pointerEvents = "none";

          setTimeout(() => {
            for (let sol of solutions) {
              sol.style.backgroundColor = "";
            }
            document.body.style.pointerEvents = "auto";
            setindex();
            updateNumbers();
            giveproblem();
            soloptions();
          }, 500);
        }
        if (solution.innerHTML != num1 * num2) {
          solution.style.backgroundColor = "red";
          wrongcount++;
          localStorage.setItem("mulwrongcount", wrongcount);

          wrong.innerHTML = wrongcount;
        }
      });
    }
  };
  setindex();
  changeDifficulty();
  resetcount();
  giveproblem();
  rightorwrong();
  soloptions();
});
