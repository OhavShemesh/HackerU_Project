window.addEventListener("load", () => {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  let index;
  let num1, num2;
  let problemplace = document.querySelector(".additionproblem>h1");
  let solutions = document.querySelectorAll(".addsol");
  let difficulty = document.querySelector(".addselect");
  let right = document.querySelector(".addright");
  let wrong = document.querySelector(".addwrong");
  let rightcount = localStorage.getItem("addrightcount");
  right.innerHTML = rightcount;
  let wrongcount = localStorage.getItem("addwrongcount");
  wrong.innerHTML = wrongcount;
  localStorage.setItem("difficulty", 10);
  const setindex = () => {
    index = getRandomInt(0, 5);
  };
  const changeDifficulty = () => {
    difficulty.addEventListener("change", (option) => {
      let selectedoption = option.target.value;
      localStorage.setItem("difficulty", parseInt(selectedoption));
      updateNumbers();
      giveproblem();
      soloptions();
    });
  };

  const updateNumbers = () => {
    let selectedDifficulty = localStorage.getItem("difficulty");
    selectedDifficulty = parseInt(selectedDifficulty);

    if (selectedDifficulty == 10) {
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
    let resetbtn = document.querySelector(".addresetbutton");
    resetbtn.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.setItem("addrightcount", 0);
      localStorage.setItem("addwrongcount", 0);
      wrongcount = 0;
      rightcount = 0;
      right.innerHTML = 0;
      wrong.innerHTML = 0;
    });
  };

  const giveproblem = () => {
    updateNumbers();
    problemplace.innerHTML = num1 + "+" + num2 + "=";
  };

  const soloptions = () => {
    for (let solution of solutions) {
      solution.innerHTML = getRandomInt(num1, num2 * 2);
    }
    solutions[index].innerHTML = num1 + num2;
  };

  const rightorwrong = () => {
    for (let solution of solutions) {
      solution.addEventListener("click", () => {
        if (solution.innerHTML == num1 + num2) {
          solution.style.backgroundColor = "green";
          rightcount++;
          right.innerHTML = rightcount;
          localStorage.setItem("addrightcount", rightcount);

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
        if (solution.innerHTML != num1 + num2) {
          solution.style.backgroundColor = "red";
          wrongcount++;
          localStorage.setItem("addwrongcount", wrongcount);

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
