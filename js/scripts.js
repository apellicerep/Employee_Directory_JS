async function mainPage() {
    const people12Data = await fetch('https://randomuser.me/api/?exc=login,gender,login,registered,id,nat&results=12')
    const peopleJson = await people12Data.json()
    const ourHtmlProfiles = peopleJson.results.map((person) => {

        let fullName = `${person.name.first} ${person.name.last}`
        let email = person.email
        let location = person.location.state
        let image = person.picture.medium
        let html = `
                    <div class="card">
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

mainPage().then((html) => console.log(html))