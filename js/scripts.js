document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('coordinateForm');
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const coordinatesInput = document.getElementById('coordinates').value;
        const [latitude, longitude] = coordinatesInput.split(',').map(coord => parseFloat(coord.trim()));

        if (isNaN(latitude) || isNaN(longitude)) {
            alert('Please enter valid numbers for both latitude and longitude.');
            return;
        }

        const latDM = convertToDM(latitude, 'lat');
        const lonDM = convertToDM(longitude, 'lon');
        const resultText = `${latDM}, ${lonDM}`;

        document.getElementById('result').innerHTML = `
            <p>${resultText}</p>
        `;

        const copyButton = document.getElementById('copyButton');
        copyButton.style.display = 'inline';
        copyButton.onclick = () => copyToClipboard(resultText);

        displayMap(latitude, longitude);
    });
});

function convertToDM(degree, type) {
    const absolute = Math.abs(degree);
    const degrees = Math.floor(absolute);
    const minutes = (absolute - degrees) * 60;

    let direction = '';
    if (type === 'lat') {
        direction = degree >= 0 ? 'N' : 'S';
    } else if (type === 'lon') {
        direction = degree >= 0 ? 'E' : 'W';
    }

    return `${direction} ${degrees.toFixed(0)}° ${minutes.toFixed(3)}'`;
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        M.toast({ html: 'Copied to clipboard', classes: 'rounded' });
    }).catch(err => {
        console.error('Could not copy text: ', err);
    });
}

function displayMap(lat, lon) {
    const map = L.map('map').setView([lat, lon], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([lat, lon]).addTo(map)
        .bindPopup(`Latitude: ${lat}, Longitude: ${lon}`)
        .openPopup();
}
