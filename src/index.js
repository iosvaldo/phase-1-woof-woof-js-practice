document.addEventListener('DOMContentLoaded', () => {
  fetch("http://localhost:3000/pups")
    .then(response => response.json())
    .then(data => {
      data.forEach(element => {
        let dogSpanName = document.createElement('span');
        dogSpanName.textContent = element.name;
        dogSpanName.setAttribute('isGoodBoy', element.isGoodDog)
        dogSpanName.id = "dogs"
        dogSpanName.addEventListener('click', () => {
          generateDog(element)
        })
        document.querySelector('#dog-bar').append(dogSpanName)
      })
      document.querySelector('#good-dog-filter').addEventListener('click', () => {
        let button = document.querySelector('#good-dog-filter');
        if (button.textContent == "Filter good dogs: OFF") {
          button.textContent = "Filter good dogs: ON";
          filterChange();
        } else {
          button.textContent = "Filter good dogs: OFF";
          unHide();
        }
      })
    })
})

function generateDog(data) {
  clearDogInfo(document.querySelector("#dog-info"));
  let dogImg = document.createElement('img');
  let dogName = document.createElement('h2');
  let isGoodDog = document.createElement('button');

  dogImg.src = data.image
  dogName.textContent = data.name
  if (data.isGoodDog) {
    isGoodDog.textContent = "Good Dog!";
  } else {
    isGoodDog.textContent = "Bad Dog!";
  }
  isGoodDog.addEventListener('click', () => {
    if (isGoodDog.textContent === 'Bad Dog!') {
      isGoodDog.textContent = 'Good Dog!'
      fetch(`http://localhost:3000/pups/${data.id}`, {
          method: "PATCH",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify({
            isGoodDog: true
          })
        })
        .then(response => {
          console.log(response.status);
          return response.json();
        })
        .then(data => console.log(data))
    } else if (isGoodDog.textContent === 'Good Dog!') {
      isGoodDog.textContent = 'Bad Dog!';
      fetch(`http://localhost:3000/pups/${data.id}`, {
          method: "PATCH",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify({
            isGoodDog: false
          })
        })
        .then(response => {
          console.log(response.status);
          return response.json();
        })
        .then(data => console.log(data))
    }
  })
  document.querySelector("#dog-info").append(dogName, dogImg, isGoodDog);
}

function clearDogInfo(node) {
  if (node != undefined) {
    node.innerHTML = '';
  }
}

function filterChange() {
  clearDogInfo(document.querySelector("#dog-info"));
  let newListofDogs = document.querySelectorAll('#dogs');
  newListofDogs.forEach(element => {
    console.log(element);
    if (element.attributes[0].value == 'false') {
      element.style.display = "none";
    }
  })
}

function unHide() {
  clearDogInfo(document.querySelector("#dog-info"));
  let newListofDogs = document.querySelectorAll('#dogs');
  newListofDogs.forEach(element => {
    console.log(element);
    if (element.attributes[0].value == 'false') {
      element.removeAttribute("style");
    }
  })
}