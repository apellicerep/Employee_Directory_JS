const url = 'https://randomuser.me/api/?exc=login,gender,login,registered,id,nat&results=12&nat=us,dk,fr,gb,es,au'
let peopleJson = {};
let cardNames;


mainPage()

/**
 * Asynchronous function that fetch the random usesrs api and gets 12 employes in JSON format.
 */
async function getJSON() {
    const people12Data = await fetch(url)
    peopleJson = await people12Data.json()
    return peopleJson;
}

/**
 * Aynchronous function that prints employee cards.
 */
async function mainPage() {
    const employeeJSON = await getJSON()
    const searchField =
        `<form action="#" method="get">
                        <input type="search" id="search-input" class="search-input" placeholder="Search...">
                        <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
                        </form>`

    const ourHtmlProfiles = employeeJSON.results.map((person, index) => {

        let firstName = person.name.first
        let lastName = person.name.last
        let email = person.email
        let location = person.location.state
        let image = person.picture.medium

        let html = `
                    <div class="card" myId="${index}">
                        <div class="card-img-container">
                            <img class="card-img" src="${image}" alt="profile picture">
                        </div>
                        <div class="card-info-container">
                             <h3 id="name" class="card-name cap">${firstName} ${lastName}</h3>
                             <p class="card-text">${email}</p>
                            <p class="card-text cap">${location}</p>
                        </div>
                    </div>`;
        return html;

    }).join('')
    document.querySelector('#gallery').innerHTML = ourHtmlProfiles;
    document.querySelector('.search-container').innerHTML = ("beforebegin", searchField)
    cardNames = document.querySelectorAll('.card-name')

}


/**
 * Click Eventlistener that targets the employee card and show its modal.
 */
document.querySelector('#gallery').addEventListener('click', (e) => {

    let divCard = e.target;
    if (e.target.className !== 'gallery') {

        if (!e.target.hasAttribute("myId")) {
            divCard = e.target.parentNode
            if (!e.target.parentNode.hasAttribute("myId")) {
                divCard = e.target.parentNode.parentNode
            }
        }
        posPeopleJson = divCard.getAttribute("myId")
        createModalCard(posPeopleJson)

    }

})


/**
 * Creates html employee modal
 * @param {number} numCard - it's the id of every card.
 */
function createModalCard(numCard) {
    let person = peopleJson.results[numCard]
    let firstName = person.name.first;
    let lastName = person.name.last;
    let email = person.email;
    let city = person.location.city
    let cell = person.cell
    let streetName = person.location.street.name
    let numberStreet = person.location.street.number
    let postCode = person.location.postcode
    let dob = person.dob.date.slice(0, 9).replace(/-/g, "/")
    let img = person.picture.medium
    let html = "";

    html = `<div class="modal-container" myId="${numCard}">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${img}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${firstName} ${lastName}</h3>
                    <p class="modal-text">${email}</p>
                    <p class="modal-text cap">${city}</p>
                    <hr>
                    <p class="modal-text">${cell}</p>
                    <p class="modal-text">${numberStreet} ${streetName}. ${postCode}</p>
                    <p class="modal-text">Birthday: ${dob}</p>
                </div>
            </div>
            <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
            </div>`;
    document.querySelector('.gallery').insertAdjacentHTML("afterend", html)

}

/**
 * EventListener on the Next,Prev and Close buttons in the modal.
 */
document.addEventListener('click', (e) => {

    if (e.target.id === "modal-close-btn" || ((e.target.tagName === "STRONG") && (e.target.textContent === "X"))) {
        document.querySelector('.gallery').nextElementSibling.remove()
    }
    else if (e.target.id === "modal-prev") {
        let numCard = e.target.parentNode.parentNode.getAttribute('myId');
        if (numCard > 0) {
            document.querySelector('.gallery').nextElementSibling.remove()
            numCard--
            createModalCard(numCard)
        }

    } else if (e.target.id === "modal-next") {
        let numCard = e.target.parentNode.parentNode.getAttribute('myId');
        if (numCard < peopleJson.results.length - 1) {
            document.querySelector('.gallery').nextElementSibling.remove()
            numCard++
            createModalCard(numCard)
        }
    }
})

/**
 * Live search input
 */
document.querySelector('.search-container').addEventListener('keyup', (e) => {

    for (let i of cardNames) {
        i.parentNode.parentNode.style.display = "none"
    }
    for (let i of cardNames) {
        if ((i.textContent.toLowerCase()).includes(e.target.value.toLowerCase())) {
            i.parentNode.parentNode.style.display = "";
        }

    }

})






