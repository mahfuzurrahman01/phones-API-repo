const loadPhones = async (name,dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${name}`
  const res = await fetch(url);
  const data = await res.json();
  getPhone(data.data,dataLimit)
}

const getPhone = (phones,dataLimit) => {
  // display 10 phones only 
  const showAllDiv = document.getElementById('showAll-div');
  if (dataLimit && phones.length > 10) {
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
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('col');

    cardDiv.innerHTML = `
        
                  <div class="card p-4">
                    <img src="${phone.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${phone.phone_name}</h5>
                      <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                      <button class="btn btn-outline-danger py-1 px-4" onclick ="loadPhoneDetails('${phone.slug}')" data-bs-toggle="modal" data-bs-target="#exampleModal">#Details</button>
                    </div>
                  </div>
               
        `
    parentDivCard.appendChild(cardDiv);
  })
  // loader false 
  toggleSpinner(false)

}

const proccessPhones = dataLimit =>{
  // loader start true
  toggleSpinner(true);
  const searchField = document.getElementById('search-field');
  const searchFieldText = searchField.value;
  loadPhones(searchFieldText,dataLimit)
  
}

document.getElementById('search-btn').addEventListener('click', function () {
  proccessPhones(10)
})

//enter key event 

document.getElementById('search-field').addEventListener('keyup',function(event){
  if(event.key === 'Enter'){
    proccessPhones(10);
  }
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

document.getElementById('showAll-btn').addEventListener('click',function(){
   proccessPhones();
   const searchField = document.getElementById('search-field');
   searchField.value = '';
}) 

const loadPhoneDetails = async(id) =>{
  const url = `https://openapi.programming-hero.com/api/phone/${id}`
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDitails(data.data);
}

const displayPhoneDitails = (phone) =>{
  const modalTitle = document.getElementById('exampleModalLabel');
  modalTitle.innerText = ''
  modalTitle.innerText = phone.name;
  const modalBody =document.getElementById('modal-body');
  modalBody.innerHTML = `
  <p>Brand: <b> ${phone.brand ? phone.brand : 'Brand not found'}</b></p>
  <p>Memory: <b> ${phone.mainFeatures ? phone.mainFeatures.memory : 'Memory not found'}</b></p>
  <p>Chipset: <b> ${phone.mainFeatures ? phone.mainFeatures.chipSet : 'Chipset not found'}</b></p>
  <p>Sensors: <b> ${phone.mainFeatures ? phone.mainFeatures.sensors : 'Sensor not found'}</b></p>
  <p>Relased: <b> ${phone.releaseDate ? phone.releaseDate:'Release Date not found'}</b></p>
  `
}

