// Funzione per caricare il JSON
fetch('./data/osi.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`Errore nel caricamento del file JSON: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        populateOSILevels(data);
        populateLevelDetails(data);
    })
    .catch(error => {
        console.error('Errore:', error);
        const errorMessage = document.createElement('div');
        errorMessage.textContent = 'Impossibile caricare i dati del Modello OSI. Controlla il file JSON o il percorso.';
        errorMessage.style.color = 'red';
        document.body.appendChild(errorMessage);
    });

// Funzione per popolare la sezione dei livelli con il contenuto del JSON
function populateOSILevels(data) {
    const osiContainer = document.getElementById('osiLevels');
    data.levels.forEach(level => {
        const levelElement = document.createElement('a');
        levelElement.href = `#desc${level.id}`;
        levelElement.classList.add('osi-link');

        const levelBox = document.createElement('div');
        levelBox.id = `liv${level.id}`;
        levelBox.classList.add('osi-box');

        const levelTitle = document.createElement('h4');
        levelTitle.textContent = `Livello ${level.id}: ${level.name}`;
        levelBox.appendChild(levelTitle);

        const levelDescription = document.createElement('div');
        levelDescription.classList.add('level-description');
        const levelDescText = document.createElement('p');
        levelDescText.textContent = level.description;
        levelDescription.appendChild(levelDescText);
        levelBox.appendChild(levelDescription);

        levelElement.appendChild(levelBox);
        osiContainer.appendChild(levelElement);
    });
}

// Funzione per popolare i dettagli dei livelli
function populateLevelDetails(data) {
    const detailsContainer = document.getElementById('detailsContainer');
    data.levels.forEach((level, index) => {
        const levelSection = document.createElement('div');
        levelSection.classList.add('row', 'gy-4', 'align-items-center', 'features-item', 'mb-5');
        levelSection.id = `desc${level.id}`;

        // Alterna l'ordine delle colonne
        const imgCol = document.createElement('div');
        const textCol = document.createElement('div');

        if (index % 2 === 0) {
            imgCol.className = 'col-md-5 d-flex align-items-center';
            textCol.className = 'col-md-7';
        } else {
            imgCol.className = 'col-md-5 order-1 order-md-2 d-flex align-items-center';
            textCol.className = 'col-md-7 order-2 order-md-1';
        }

        // Immagine
        const img = document.createElement('img');
        img.src = level.image; // L'URL dell'immagine viene aggiunto senza rischio di eseguire codice malevolo
        img.alt = `${level.name} Image`; // Utilizza `textContent` per la sicurezza
        img.classList.add('img-fluid', 'rounded', 'shadow');
        imgCol.appendChild(img);

        // Testo
        const levelTitle = document.createElement('h3');
        levelTitle.classList.add('h4', 'fw-bold', 'mb-3');
        levelTitle.textContent = `Livello ${level.id}: ${level.name}`;
        textCol.appendChild(levelTitle);

        const levelDesc = document.createElement('p');
        levelDesc.textContent = level.fullDescription; // Utilizza `textContent` per evitare vulnerabilità XSS
        textCol.appendChild(levelDesc);

        const list = document.createElement('ul');
        level.features.forEach(feature => {
            const listItem = document.createElement('li');
            listItem.textContent = feature; // Evita di usare `innerHTML` per evitare l'inserimento di HTML non sicuro
            list.appendChild(listItem);
        });
        textCol.appendChild(list);

        const pduParagraph = document.createElement('p');
        pduParagraph.textContent = `PDU: ${level.pdu}`; // Usa `textContent` per i dati non HTML
        textCol.appendChild(pduParagraph);

        levelSection.appendChild(imgCol);
        levelSection.appendChild(textCol);
        detailsContainer.appendChild(levelSection);
    });
}
