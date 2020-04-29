const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const secondCardbody = document.querySelectorAll(".card-body")[1];
const clearButton = document.getElementById("clear-films");

// UI Objesini Başlatma
const ui = new UI();

// Storage Objesi Üretme
const storage = new Storage();

// Tüm eventleri yükleme
eventListeners();

function eventListeners() {
    form.addEventListener("submit",addFilm);
    document.addEventListener("DOMContentLoaded",function(){
        let films = storage.getFilmsFromStorage();
        ui.loadAllFilms(films);
    });

    secondCardbody.addEventListener("click",deleteFilm);
    clearButton.addEventListener("click",clearAllFilms);

}

function addFilm(e) {
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if ( title === "" || director === "" || url === "") {
        // Hata mesajı
        ui.displayMessages("Tüm alanları doldurun!","danger");
    }
    else {
        // Yeni film
        const newFilm = new Film(title,director,url);

        ui.addFilmToUI(newFilm);    // Arayüze film ekleme

        storage.addFilmToStorage(newFilm);  // Storage'a film ekleme

        ui.displayMessages("Film başarıyla eklendi!","success");
    }

    ui.clearInputs(titleElement,directorElement,urlElement);
    
    e.preventDefault();
}

function deleteFilm(e) {
    
    if (e.target.id === "delete-film") {
        ui.deleteFilmFromUI(e.target);
        storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        ui.displayMessages("Film silindi!","warning");
        }

}

function clearAllFilms() {
    if (confirm("Emin misiniz?")) {

    ui.clearAllFilmsFromUI();
    storage.clearAllFilmsFromStorage();

    }
}