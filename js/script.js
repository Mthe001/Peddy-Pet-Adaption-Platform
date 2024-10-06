
const loadAllPet = ()=> {
    fetch ('https://openapi.programming-hero.com/api/peddy/pets')
    .then(res => res.json())
    .then(data => displayAllPets(data.pets))
    .catch(err => console.log(err));
}




const cardDemo = `

{
    "petId": 4,
    "breed": "Holland Lop",
    "category": "Rabbit",
    "date_of_birth": "2023-06-30",
    "price": 200,
    "image": "https://i.ibb.co.com/4g3Jrjf/pet-4.jpg",
    "gender": "Female",
    "pet_details": "This adorable female Holland Lop rabbit, born on June 30, 2023, is known for her calm and gentle nature. She thrives in quiet environments and enjoys being handled with care. Priced at $200, she is an ideal pet for those looking for a low-maintenance, friendly rabbit. Note that she is not vaccinated.",
    "vaccinated_status": "Not",
    "pet_name": "Nibbles"
}



`






const displayAllPets = (pets) => {

//console.log(pets);
const allPetContainer = document.getElementById('pet-card-container');
for (const pet of pets){
    console.log(pet);
    const card =document.createElement('div');
    card.classList = "card bg-base-100  border-2 border-gray-300";
    card.innerHTML = 
    `
     <figure>
    <img
      src=${pet.image};
      class="w-full h-full object-cover"
      alt="cute pet here!" />
  </figure>
  <div class="card-body max-[630px]:h-[330px] max-[630px]:p-1">
    <h2 class="card-title font-bold ">
        ${pet.pet_name} 
    </h2>
    <p>Breed:${pet.breed ? pet.breed : 'Birth unknown'}</p>
    <p>Birth:${pet.date_of_birth ? pet.date_of_birth : 'Birth unknown'}</p>
    <p>Gender:${pet.gender ? pet.gender : 'Not defind'}</p>
    <p>Price:${pet.price ? pet.price : 'Stock'}</p>
    <p></p>
    <div class="card-actions  max-[630px]:justify-center text-green-700">

      <button id="add-to-list" onclick="addInList('${pet.image}')" class="badge badge-outline">Like</button>
      <button class="badge badge-outline">Adopt</button>
      <button class="badge badge-outline">Details</button>
     
    </div>
  </div>
    

  `
  allPetContainer.append(card);
}


}

const  addInList = (image)=>{
  const addSideListContainer = document.getElementById('display-pet-img-container');

  const div = document.createElement('div')
  div.classList="p-1"
  div.innerHTML =
  `
  <img src ='${image}'
  class="rounded-[5px] border-2 border-gray-300"
  alt="pet Image"      
  />
  `
  addSideListContainer.appendChild(div);
  
}





const loadPetCategory = () =>{

    fetch(`https://openapi.programming-hero.com/api/peddy/categories`)
    .then(res => res.json())
    .then(data => {
        

    displayPetCategory(data.categories);
    })
    .catch (err => console.log(err))
}




 const displayPetCategory = (categories) =>{
    const categoryContainer = document.getElementById('catagery_of-pet');
 
   //console.log(data)
     for ( const pet of categories){
        console.log(pet);
        const button = document.createElement('button');
        button.classList ="btn px-10 max[630px]:px-0 border-2 hover:border-gray-400";
        button.innerText=pet.category;
         
                 
        //add btn to category
        categoryContainer.append(button);
     }

 }

 

loadAllPet();

loadPetCategory();
