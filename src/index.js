let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.querySelector('#toy-collection')

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  const toyForm = document.querySelector('#add-toy-form');

  toyForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const toyName = toyForm.querySelector('#toy-name');
    const toyImage = toyForm.querySelector('#toy-image');

    fetch("http://localhost:3000/toys", { 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: toyName.value,
        image: toyImage.value,
        likes: 0
      }),
    })
    .then(response => response.json())
    .then(newToy => {
      const toyCard = document.createElement("div");
      toyCard.classList.add("card");
      toyCard.innerHTML = `
        <h2>${newToy.name}</h2>
        <img src="${newToy.image}" class="toy-avatar">
        <p>${newToy.likes} Likes</p>
        <button class="like-btn" id="${newToy.id}">Like</button>
      `;
      toyCollection.appendChild(toyCard);
    })
    .catch(error => console.error("Error adding new toy:", error));
  });

  fetch("http://localhost:3000/toys")
    .then(response => response.json())
    .then(toys => {
      toys.forEach(toy => {
        const toyCard = document.createElement('div');
        toyCard.classList.add('card');

        toyCard.innerHTML = `
          <h2>${toy.name}</h2>
          <img src="${toy.image}" class="toy-avatar">
          <p>${toy.likes} Likes</p>
          <button class="like-btn" id="${toy.id}">Like</button>
        `;

        toyCollection.appendChild(toyCard);
      });
    })
    .catch(error => console.error("Error fetching toys:", error));
});