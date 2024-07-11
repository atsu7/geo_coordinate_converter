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

    return `${direction} ${degrees}° ${minutes.toFixed(3)}'`;
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Copied to clipboard');
    }).catch(err => {
        console.error('Could not copy text: ', err);
    });
}
