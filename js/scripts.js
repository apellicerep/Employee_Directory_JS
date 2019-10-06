const url = 'https://randomuser.me/api/?exc=login,gender,login,registered,id,nat&results=12'
let peopleJson = {};


async function getJSON() {
    const people12Data = await fetch(url)
    peopleJson = await people12Data.json()
    return peopleJson;
}


async function mainPage() {
    const employeeJSON = await getJSON()
    const ourHtmlProfiles = employeeJSON.results.map((person, index) => {

        let fullName = `${person.name.first} ${person.name.last}`
        let email = person.email
        let location = person.location.state
        let image = person.picture.medium
        let html = `
                    <div class="card" myId="${index}">
                        <div class="card-img-container">
                            <img class="card-img" src="${image}" alt="profile picture">
                        </div>
                        <div class="card-info-container">
                             <h3 id="name" class="card-name cap">${fullName}</h3>
                             <p class="card-text">${email}</p>
                            <p class="card-text cap">${location}</p>
                        </div>
                    </div>`;
        return html

    }).join('')
    document.querySelector('#gallery').innerHTML = ourHtmlProfiles;
    return ourHtmlProfiles;
}




document.querySelector('#gallery').addEventListener('click', (e) => {
    //console.log(e.target)
    let html = "";
    let divCard = e.target;
    if (e.target.className !== 'gallery') {

        if (!e.target.hasAttribute("myId")) {
            divCard = e.target.parentNode
            if (!e.target.parentNode.hasAttribute("myId")) {
                divCard = e.target.parentNode.parentNode
            }
        }
        console.log(divCard.getAttribute("myId"))

        posPeopleJson = divCard.getAttribute("myId")
        let person = peopleJson.results[posPeopleJson]
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

        html = `<div class="modal-container">
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
                </div>`
        console.log(html)
        document.querySelector('body').insertAdjacentHTML("afterend", html)


    }

})


mainPage().then((html) => console.log(peopleJson))


