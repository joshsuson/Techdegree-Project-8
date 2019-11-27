const url = 'https://randomuser.me/api/?results=12&nat=us&inc=name,picture,email,location,phone,dob'
const container = document.getElementById('container');
const popup = document.getElementById('popupBox');
let personIndex;
const search = document.getElementById('searchBar');


// Pull in random user data
fetch(url)
  .then(response => response.json())
  .then(data => {
    makeEmployeeCard(data.results);
    makePopup(data.results);
  })
  .catch(error => console.log("Something isn't right. Try again.", error));


// Create HTML for Employee Card
function makeEmployeeCard(data) {
  for (i = 0; i < data.length; i++) {
    let html =
    `
    <div class="card" id="${i}">
      <img class="profile-image" src="${data[i].picture.large}" alt="${data[i].name.first} ${data[i].name.last}" />
      <div class="profile-text">
        <h3>${data[i].name.first} ${data[i].name.last}</h3>
        <p class="email">${data[i].email}</p>
        <p class="location">${data[i].location.city}, ${data[i].location.state}</p>
      </div>
    </div>
    `;
    container.innerHTML += html;
  }
}

// Create html for popup modal
function makePopup(data) {
  for (i = 0; i < data.length; i++) {
    let html =
    `
    <div class="popup-card" id="person${i}">
      <span class="fas fa-chevron-left prev-arrow"></span>
      <span class="fas fa-chevron-right next-arrow"></span>
      <span class="close">&times;</span>
      <img class="popup-profile-image" src="${data[i].picture.large}" alt="${data[i].name.first} ${data[i].name.last}" />
      <div class="popup-profile-text">
        <h3>${data[i].name.first} ${data[i].name.last}</h3>
        <p class="popup-email">${data[i].email}</p>
        <p class="popup-location">${data[i].location.city}, ${data[i].location.state}</p>
      </div>
      <div class="popup-info">
        <p class="phone">${data[i].phone}</p>
        <p class="address">${data[i].location.street.number} ${data[i].location.street.name} ${data[i].location.city}, ${data[i].location.state} ${data[i].location.postcode}</p>
        <p class="birthday">Birthday: ${data[i].dob.date.substring(5, 7)}/${data[i].dob.date.substring(8, 10)}/${data[i].dob.date.substring(0, 4)}</p>
      </div>
    </div>
    `;
    popup.innerHTML += html;
  }
}

// Event listener that shows popup upon clicking employee card
// It also defines the personIndex variable for future use
container.addEventListener('click', (e) => {
  if (e.target.classList.contains('card')
      || e.target.parentElement.classList.contains('card')
      || e.target.parentElement.parentElement.classList.contains('card')) {
        if (e.target.id !== '') {
          personIndex = e.target.id;
          popup.style.display = 'block';
          popup.children[personIndex].style.display = 'block';
          return personIndex;
        } else if (e.target.parentElement.id !== '') {
          personIndex = e.target.parentElement.id;
          popup.style.display = 'block';
          popup.children[personIndex].style.display = 'block';
          return personIndex;
        } else if (e.target.parentElement.parentElement.id !== '') {
          personIndex = e.target.parentElement.parentElement.id;
          popup.style.display = 'block';
          popup.children[personIndex].style.display = 'block';
          return personIndex;
        }
  }
});

// Functions for closing and changing popup window
function closePopup() {
  popup.style.display = 'none';
  popup.children[personIndex].style.display = 'none';
}

function nextPopup(index) {
  popup.children[index].style.display = 'none';
  popup.children[index].nextElementSibling.style.display = 'block';
  personIndex = popup.children[index].nextElementSibling.id;
}

function prevPopup(index) {
  popup.children[index].style.display = 'none';
  popup.children[index].previousElementSibling.style.display = 'block';
  personIndex = popup.children[index].previousElementSibling.id;

}

// Event listener that closes or changes popup when clicking the x or arrows
popup.addEventListener('click', (e) => {
  if (e.target.classList.contains('close')) {
    closePopup();
  } else if (e.target === popup) {
    closePopup();
  } else if (e.target.classList.contains('next-arrow')) {
    if (e.target.parentElement === popup.lastElementChild) {
      popup.children[personIndex].style.display = 'none';
      popup.firstElementChild.style.display = 'block';
      personIndex = popup.firstElementChild.id;
    } else {
      nextPopup(personIndex);
    }
  } else if (e.target.classList.contains('prev-arrow')) {
    if (e.target.parentElement === popup.firstElementChild) {
      popup.children[personIndex].style.display = 'none';
      popup.lastElementChild.style.display = 'block';
      personIndex = popup.lastElementChild.id;
    } else {
      prevPopup(personIndex);
    }
  }
});


// Provides search function for the search bar
function searchFunction() {
  let searchValue = search.value.toLowerCase();
  let employeeCards = document.querySelectorAll('.card');
  let employeeInfo = document.querySelectorAll('.profile-text');
  for (i = 0; i < employeeCards.length; i++) {
    let h3 = employeeInfo[i].getElementsByTagName('h3')[0];
    let name = h3.textContent;
    if (name.toLowerCase().indexOf(searchValue) > -1) {
      employeeCards[i].style.display = "";
    } else {
      employeeCards[i].style.display= 'none';
    }
  }
}

search.addEventListener('keyup', (e) => searchFunction());
