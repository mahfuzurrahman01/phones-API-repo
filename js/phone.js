const loadPhones = async (name) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${name}`
  const res = await fetch(url);
  const data = await res.json();
  getPhone(data.data)
}

const getPhone = (phones) => {
  // display 10 phones only 
  const showAllDiv = document.getElementById('showAll-div');
  if (phones.length > 10) {
    phones = phones.slice(0, 10);
    showAllDiv.classList.remove('d-none')
  }
  else{
    showAllDiv.classList.add('d-none')
  }
  // no phone found warning ! 
  const noPhoneField = document.getElementById('no-phone');
  if (phones.length === 0) {
    noPhoneField.classList.remove('d-none')
  }
  else {
    noPhoneField.classList.add('d-none')
  }
  // all phone display 
  const parentDivCard = document.getElementById('card-items');
  parentDivCard.textContent = '';
  phones.forEach(phone => {
    console.log(phone)
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('col');

    cardDiv.innerHTML = `
        
                  <div class="card p-4">
                    <img src="${phone.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${phone.phone_name}</h5>
                      <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    </div>
                  </div>
               
        `
    parentDivCard.appendChild(cardDiv);
  })
  // loader false 
  toggleSpinner(false)

}

document.getElementById('search-btn').addEventListener('click', function () {
  // loader start true
  toggleSpinner(true);
  const searchField = document.getElementById('search-field');
  const searchFieldText = searchField.value;
  loadPhones(searchFieldText)
  searchField.value = '';
})

const toggleSpinner = isLoading => {
  const spinnerField = document.getElementById('spinner-field');
  if (isLoading === true) {
    spinnerField.classList.remove('d-none')
  }
  else {
    spinnerField.classList.add('d-none')
  }
}