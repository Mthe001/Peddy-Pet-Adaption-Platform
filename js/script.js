let allPets = [];
let currentCategoryButton = null;
let isFetching = false; 

const loadAllPet = () => {
    const spinner = document.getElementById('spinner');
    spinner.classList.remove('hiddenn'); 

    fetch('https://openapi.programming-hero.com/api/peddy/pets')
        .then(res => res.json())
        .then(data => {
            allPets = data.pets; 
            Promise.all([
                new Promise(resolve => setTimeout(resolve, 1000)), 
                Promise.resolve(data)
            ]).then(() => {
                spinner.classList.add('hidden'); 
                displayAllPets(allPets); 
            });
        })
        .catch(err => {
            console.error(err);
            spinner.classList.add('hidden');
            showError('Failed to load pets. Please try again later.');
        });
};


const displayAllPets = (pets) => {
    const allPetContainer = document.getElementById('pet-card-container');
    allPetContainer.innerHTML = ''; 

    if (pets.length === 0) {
        const noPetMessage = document.createElement('div');
        allPetContainer.classList.remove('grid');
        noPetMessage.classList = "text-center my-5 flex flex-col items-center justify-center w-[40%] mx-auto ";
        noPetMessage.innerHTML = `
            <img src="./assets/error.webp" alt="No pets available" class="w-[200px] mx-auto" />
            <p class="text-gray-400 font-semibold">No pets are available in this category right now.</p>
        `;
        allPetContainer.append(noPetMessage);
        return;
    }

    pets.forEach(pet => {
         allPetContainer.classList.add('grid');
        const card = document.createElement('div');
        card.classList = "card bg-base-100 border-2 border-gray-300";
        card.innerHTML = `
            <figure>
                <img src="${pet.image}" class="w-full h-full object-cover p-2 rounded-xl"  alt="cute pet here!" />
            </figure>
            <div class="card-body max-[630px]:h-[330px] max-[630px]:p-1">
                <h2 class="card-title font-bold">${pet.pet_name}</h2>
                <p>Breed: ${pet.breed ? pet.breed : 'Breed unknown'}</p>
                <p>Birth: ${pet.date_of_birth ? pet.date_of_birth : 'Birth unknown'}</p>
                <p>Gender: ${pet.gender ? pet.gender : 'Not defined'}</p>
                <p>Price: ${pet.price ? '$' + pet.price : 'Stock'}</p>
                <div class="card-actions max-[630px]:justify-center text-green-700">
                  
                   <button onclick="addInList('${pet.image}')" class="badge w-16 h-5 ">
                    <img src="https://img.icons8.com/?size=32&id=33481&format=png" class="w-5 h-5" />
                   </button>
                   
                    
                    <button onclick="openAdoptModal()" class="badge badge-outline">Adopt</button>
                    <button onclick="loadPetDetails('${pet.petId}')" class="badge badge-outline">Details</button>
                </div>
            </div>
        `;
        allPetContainer.append(card);
    });
};


let countdownInterval; 

function openAdoptModal() {
    const modal = document.getElementById('adoptModal');
    const countdownDisplay = document.getElementById('countdown');
    let countdown = 4; 

    clearInterval(countdownInterval);

    modal.showModal();

    
    countdownDisplay.textContent = countdown;

    countdownInterval = setInterval(() => {
        countdown -= 1;
        countdownDisplay.textContent = countdown;

        
        if (countdown <= 0) {
            clearInterval(countdownInterval);
            modal.close(); 
        }
    }, 1000); 
}

function closeModal() {
    const modal = document.getElementById('adoptModal');
    modal.close(); 
}


const addInList = (image) => {
    const addSideListContainer = document.getElementById('display-pet-img-container');
    const div = document.createElement('div');
    div.classList = "p-1 side-list-div";
    div.innerHTML = `<img src='${image}' class="rounded-xl border-2 border-gray-300" alt="pet Image" />`;
    addSideListContainer.appendChild(div);
};


const loadPetCategory = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
        .then(res => res.json())
        .then(data => displayPetCategory(data.categories))
        .catch(err => {
            console.error(err);
            showError('Failed to load categories. Please try again.');
        });
};


const displayPetCategory = (categories) => {
    const categoryContainer = document.getElementById('catagery_of-pet');
    categoryContainer.innerHTML = '';

    categories.forEach(category => {
        const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML = `
            <button onclick="loadCategoryByPet('${category.category}')" class="btn category-btn" data-category="${category.category}">
                <img src="${category.category_icon}" class="w-[25px] h-[25px]" alt="Category Icon" />
                ${category.category}
            </button>
        `;
        categoryContainer.append(buttonContainer);
    });
};


// Load pets by category
const loadCategoryByPet = (category) => {
    if (isFetching) return; 
    isFetching = true;

    if (currentCategoryButton) {
        currentCategoryButton.classList.remove('active');
    }

    const clickedButton = document.querySelector(`button[data-category="${category}"]`);
    clickedButton.classList.add('active');
    currentCategoryButton = clickedButton;

    const spinner = document.getElementById('spinner');
    spinner.classList.remove('hidden'); 

    fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
        .then(res => res.json())
        .then(data => {
            allPets = data.data; 
            displayAllPets(allPets);
        })
        .catch(err => {
            console.error(err);
            showError('Failed to load category pets. Please try again.');
        })
        .finally(() => {
            spinner.classList.add('hidden');
            isFetching = false;
        });
};



const sortPetsByPrice = () => {
    const sortedPets = allPets.slice().sort((a, b) => b.price - a.price);
    displayAllPets(sortedPets);
};

// Show error messages
const showError = (message) => {
    const errorContainer = document.getElementById('error-message');
    errorContainer.innerHTML = `
        <div class="alert alert-error">
            <span>${message}</span>
        </div>
    `;
    setTimeout(() => {
        errorContainer.innerHTML = ''; 
    }, 5000);
};


const loadPetDetails = async (petId)=>{
  const uri = `https://openapi.programming-hero.com/api/peddy/pet/${petId} `
  const res = await fetch (uri)
  const data = await res.json();
  displayPetDetails(data.petData);

}

const displayPetDetails =(petData) => {
 

  const detailsContainer = document.getElementById('modal-content');
 
  detailsContainer.innerHTML = `
   <img src=${petData.image} class="w-full h-full object-cover p-2 rounded-xl" />
    <div class=" items-center justify-center">
    
    <h2 class="text-start text-gray-500 font-semibold p-1">Name:${petData.pet_name}</h2>
   <h4 class="text-start text-gray-600 font-semibold p-1">Gender:${petData.gender ? petData.gender : 'Not defined'}</h4>
   <h3 class="text-start text-gray-500 font-semibold p-1">Date-of-birth:${petData.date_of_birth ? petData.date_of_birth : 'Birth unknown'}</h3>
    
   <h2 class="text-right text-gray-600 font-semibold p-1">Vaccinated-status:${petData.vaccinated_status}</h2>
   <h2 class="text-right text-gray-600 font-semibold p-1">Price:${petData.price}</h2>
   <h2 class="text-right text-gray-600 font-semibold p-1" >Breed:${petData.breed ? petData.breed : 'Breed unknown'} </h2>
    

    </div>
   <p class="text-gray-500 font-semibold text-start p-2">${petData.pet_details} </p>
  `

 document.getElementById("customModal").showModal();  

}


loadPetCategory();
loadAllPet();
