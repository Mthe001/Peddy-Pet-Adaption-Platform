const loadAllPet = () => {
    const spinner = document.getElementById('spinner');
    spinner.classList.remove('hidden'); // Show spinner

    // Start the fetch process
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
        .then(res => res.json())
        .then(data => {
            Promise.all([
                new Promise(resolve => setTimeout(resolve, 1000)), 
                Promise.resolve(data) 
            ])
            .then(() => {
                spinner.classList.add('hidden'); 
                displayAllPets(data.pets); 
            });
        })
        .catch(err => {
            console.error(err);
            spinner.classList.add('hidden'); 
        });
};




const displayAllPets = (pets) => {
    const allPetContainer = document.getElementById('pet-card-container');
    allPetContainer.innerHTML = ''; // Clear previous pets

    if (pets.length === 0) {
        const noPetMessage = document.createElement('div');
        noPetMessage.classList = "text-center my-5 flex flex-col items-center justify-center mx-auto";  
        noPetMessage.innerHTML = `
            <img src="./assets/error.webp" alt="No pets available" class="w-[150px] mx-auto" />
            <p class="text-gray-400 font-semibold">No pets are available in this category right now.</p>
        `;
        allPetContainer.append(noPetMessage);
        return;
    }

    // Create and display pet cards
    pets.forEach(pet => {
        const card = document.createElement('div');
        card.classList = "card bg-base-100 border-2 border-gray-300";
        
        card.innerHTML = `
            <figure>
                <img src="${pet.image}" class="w-full h-full object-cover" alt="cute pet here!" />
            </figure>
            <div class="card-body max-[630px]:h-[330px] max-[630px]:p-1">
                <h2 class="card-title font-bold">${pet.pet_name}</h2>
                <p>Breed: ${pet.breed ? pet.breed : 'Breed unknown'}</p>
                <p>Birth: ${pet.date_of_birth ? pet.date_of_birth : 'Birth unknown'}</p>
                <p>Gender: ${pet.gender ? pet.gender : 'Not defined'}</p>
                <p>Price: ${pet.price ? pet.price : 'Stock'}</p>
                <div class="card-actions max-[630px]:justify-center text-green-700">
                    <button id="add-to-list" onclick="addInList('${pet.image}')" class="badge badge-outline">Like</button>
                    <button class="badge badge-outline">Adopt</button>
                    <button class="badge badge-outline">Details</button>
                </div>
            </div>
        `;
        allPetContainer.append(card);
    });
};

const addInList = (image) => {
    const addSideListContainer = document.getElementById('display-pet-img-container');
    const div = document.createElement('div');
    div.classList = "p-1";
    div.innerHTML = `<img src='${image}' class="rounded-[5px] border-2 border-gray-300" alt="pet Image" />`;
    addSideListContainer.appendChild(div);
};

const loadPetCategory = () => {
    fetch(`https://openapi.programming-hero.com/api/peddy/categories`)
        .then(res => res.json())
        .then(data => displayPetCategory(data.categories))
        .catch(err => console.log(err));
};

let currentCategoryButton = null;

const loadCategoryByPet = (category) => {
    if (currentCategoryButton) {
        currentCategoryButton.classList.remove('active');
    }

    const clickedButton = document.querySelector(`button[data-category="${category}"]`);
    clickedButton.classList.add('active');
    currentCategoryButton = clickedButton;

    fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
        .then(res => res.json())
        .then(data => displayAllPets(data.data))
        .catch(err => console.log(err));
};

const displayPetCategory = (categories) => {
    const categoryContainer = document.getElementById('catagery_of-pet');
    categoryContainer.innerHTML = '';

    categories.forEach(pet => {
        const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML = `
            <button onclick="loadCategoryByPet('${pet.category}')" class="btn category-btn" data-category="${pet.category}">
                <img src="${pet.category_icon}" class="w-[25px] h-[25px]" alt="Category Icon" />
                ${pet.category}
            </button>
        `;
        categoryContainer.append(buttonContainer);
    });
};

loadPetCategory();
loadAllPet();
