const loadPhone = async (searchText, isShowAll) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);
}
const displayPhones = (phones, isShowAll) =>{
    const phoneContainer = document.getElementById('phone-container');
    // clear phone container cards before adding new phones
    phoneContainer.textContent = '';
    // display show all button if there are more than 12 phones
    const showAllContainer = document.getElementById('show-all-container');
    // console.log(showAllContainer);
    if(phones.length > 12 && !isShowAll){
      showAllContainer.classList.remove('hidden');
    }
    else{
      showAllContainer.classList.add('hidden');
    }
    // console.log(phones.length);
    // display first 12 phones if no need to show All button
    if(!isShowAll){
      phones = phones.slice(0,12);
    }
    phones.forEach(phone =>{
        // console.log(phone);
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-base-100 shadow-xl`;
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-center">
            <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary text-white">Show Details</button>
          </div>
        </div>
        `;
        phoneContainer.appendChild(phoneCard);
    });
    // hide loading spinner
    toggleLoadingSpinner(false);
}
const handleSearch = (isShowAll) =>{
  // show loading spinner
    toggleLoadingSpinner(true);

  // get the input value
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    loadPhone(searchText, isShowAll);
}
// handle show detail
const handleShowDetail = async (id) =>{
    console.log('clicked', id);
    // load single phone details
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    handleShowModal(phone);
}
const handleShowModal = (phone) =>{
  console.log(phone);
  // const phoneName = document.getElementById('show-detail-phone-name');
  // phoneName.innerText = phone.name;
  const showDetailContainer = document.getElementById('show-detail-container');
  showDetailContainer.innerHTML = `
    <img src="${phone.image}" alt="" />
    <h3>${phone.name}</h3>
    <p><span>Storage:</span>${phone?.mainFeatures?.storage}</p>
    <p><span>Display Size:</span>${phone?.mainFeatures?.displaySize}</p>
    <p><span>GPS:</span>${phone?.others?.GPS}</p>
  `;
  // show the modal
  show_details_modal.showModal();
}
// loading spinner
const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loader-spinner');
    if(isLoading){
      loadingSpinner.classList.remove('hidden');
    }
    else{
      loadingSpinner.classList.add('hidden');
    }
}
// handle show all button
const handleShowAll = () =>{
  handleSearch(true);
}

// loadPhone();