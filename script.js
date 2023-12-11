function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    const formattedTime = `${hours}:${minutes}:${seconds}`;

    document.getElementById('clock').innerText = formattedTime;
}

setInterval(updateClock, 1000);

updateClock();

let contactData = {};

function saveContact() {
    const vardas = document.getElementById('Vardas').value;
    const pavarde = document.getElementById('Pavardė').value;
    const email = document.getElementById('Gmail').value;
    const telefonas = document.getElementById('Telefonas').value;
    const adresas = document.getElementById('Adresas').value;
    const kursas = parseFloat(document.getElementById('Kursas').value);
    const semestras = parseFloat(document.getElementById('Semestras').value);
    const pazymis = parseFloat(document.getElementById('Pažymis').value);
    const metai = parseFloat(document.getElementById('Metai').value);
    const alaus = parseFloat(document.getElementById('AlausPerVienaVakara').value);

    if (!isValidEmail(email)) {
        alert('Neteisingas el. pašto adresas');
        return;
    }

    if (!isValidPhone(telefonas)) {
        alert('Neteisingas telefono numeris');
        return;
    }

    if (!isValidAddress(adresas)) {
        alert('Neteisingas adresas');
        return;
    }

    if (isNaN(kursas) || isNaN(semestras) || isNaN(pazymis) || isNaN(metai) || isNaN(alaus)) {
        alert('Papildomi požymiai turi būti skaičiai.');
        return;
    }

    contactData = {
        Vardas: vardas,
        Pavardė: pavarde,
        Gmail: email,
        Telefonas: telefonas,
        Adresas: adresas,
        Kursas: kursas,
        Semestras: semestras,
        Pažymis: pazymis,
        Metai: metai,
        AlausPerVienaVakara: alaus
    };

    console.log('Išsaugoti kontaktai:', contactData);
    displayResult();
    calculateAverage();
}

function displayResult() {
    const resultContainer = document.getElementById('result');
    resultContainer.innerHTML = '';

    for (const key in contactData) {
        resultContainer.innerHTML += `<p>${key}: ${contactData[key]}</p>`;
    }
}

function calculateAverage() {
    const marks = [
        contactData.Kursas,
        contactData.Semestras,
        contactData.Pažymis,
        contactData.Metai,
        contactData.AlausPerVienaVakara
    ];

    const average = marks.reduce((total, mark) => total + mark, 0) / marks.length;

    const averageElement = document.getElementById('average');
    averageElement.textContent = `Vidurkis: ${average.toFixed(2)}`;

    if (average < 5) {
        averageElement.style.color = 'red';
    } else if (average >= 5 && average < 8) {
        averageElement.style.color = 'orange';
    } else {
        averageElement.style.color = 'green';
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^\+?[0-9]+$/;
    return phoneRegex.test(phone);
}

function isValidAddress(address) {
    const addressRegex = /^[a-zA-Z0-9\s,.'-]+$/;
    return addressRegex.test(address);
}
