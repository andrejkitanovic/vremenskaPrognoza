const vremeForma = document.querySelector('form')
const pretraga = document.querySelector('#ime-grada')

const greskaPoruka = document.querySelector('.greska-tekst');

const kartice = document.querySelector('.kartice');
let brojKartice = 0;

vremeForma.addEventListener('submit', e => {
    e.preventDefault()

    const lokacija = pretraga.value;

    greskaPoruka.innerHTML = 'Loading...';

    fetch(`/weather?adresa=${lokacija}`).then(response => {
        response.json().then(data => {
            if (data.greska) {
                greskaPoruka.innerHTML = data.greska;
            } else {
                greskaPoruka.innerHTML = '';
                const html = `<div class="card br-${brojKartice}" style="width: 18rem;"><div class="card-body"><h5 class="card-title prikaz-grad">${data.grad}</h5><p class="card-text"></p></div><ul class="list-group list-group-flush"><li class="list-group-item prikaz-temperatura">Trenutna temperatura je ${data.temperatura.toFixed(1)} °C</li><li class="list-group-item prikaz-pritisak">Trenutni pritisak je ${data.pritisak}</li><li class="list-group-item prikaz-vetar">Brzina duvanja vetra je ${data.vetar} m/s</li></ul><div class="card-body"><a href="#!" class="card-link zatvori-karticu">Zatvori karticu</a></div></div>`;
                kartice.insertAdjacentHTML('afterbegin', html);
                brojKartice++;
            }
        })
    })
})

kartice.addEventListener('click',e => {
    if(e.target.classList.contains('zatvori-karticu')){
        const card = e.target.parentElement.parentElement
        card.remove()
    }
})