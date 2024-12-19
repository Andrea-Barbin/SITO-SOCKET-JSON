document.addEventListener('DOMContentLoaded', function () {
    // Carica i dati dal file JSON
    fetch('./data/socket.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Errore nel caricamento del file JSON: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Verifica che i dati esistano
            console.log('Dati JSON caricati:', data);

            // Popola l'introduzione alta
            const introduzioneAlta = data.introduzioneAlta;
            console.log('Dati introduzioneAlta:', introduzioneAlta);
            document.querySelector('.hero h1.sfondoBlu').textContent = introduzioneAlta.titolo;
            document.querySelector('.hero p.sfondoBlu').textContent = introduzioneAlta.paragrafoDesc;

            const heroLink = document.querySelector('.hero a');
            heroLink.setAttribute('href', introduzioneAlta.linkPulsante);
            heroLink.textContent = introduzioneAlta.testoLink;

            // Popola la definizione di socket
            const definizioneSocket = data.definizioneSocket;
            console.log('Dati definizioneSocket:', definizioneSocket);
            document.querySelector('#content .row img').setAttribute('src', definizioneSocket.linkImmDef);
            document.querySelector('#content .row p').innerHTML = definizioneSocket.pDef;

            // Popola la sezione delle Tipologie di Socket
            const tipologieContainer = document.getElementById('tipologieSocket');
            if (tipologieContainer) {
                console.log('Elemento "tipologieSocket" trovato:', tipologieContainer);
                tipologieContainer.textContent = ''; // Svuota il contenuto precedente
                data.tipologie.forEach(tipologia => {
                    const cardDiv = document.createElement('div');
                    cardDiv.classList.add('col-md-6');

                    const card = document.createElement('div');
                    card.classList.add('zommaDiv', 'card', 'shadow');

                    const cardHeader = document.createElement('div');
                    cardHeader.classList.add('card-header');
                    cardHeader.textContent = tipologia.nome;

                    const cardBody = document.createElement('div');
                    cardBody.classList.add('card-body');

                    const cardBodyParagraph = document.createElement('p');
                    cardBodyParagraph.textContent = tipologia.descrizione;

                    const cardBodyList = document.createElement('ul');
                    tipologia.usages.forEach(uso => {
                        const listItem = document.createElement('li');
                        listItem.textContent = uso;
                        cardBodyList.appendChild(listItem);
                    });

                    cardBody.appendChild(cardBodyParagraph);
                    cardBody.appendChild(cardBodyList);
                    card.appendChild(cardHeader);
                    card.appendChild(cardBody);
                    cardDiv.appendChild(card);

                    tipologieContainer.appendChild(cardDiv);
                });
            } else {
                console.error('Elemento "tipologieSocket" non trovato nel DOM.');
            }

            // Popola la sezione del Processo di Comunicazione
            const processoContainer = document.getElementById('communicationProcess');
            if (processoContainer) {
                console.log('Elemento "communicationProcess" trovato:', processoContainer);
                processoContainer.textContent = ''; // Svuota il contenuto precedente
                data.processoComunicazione.forEach(item => {
                    const accordionItem = document.createElement('div');
                    accordionItem.classList.add('accordion-item');

                    const accordionHeader = document.createElement('h2');
                    accordionHeader.classList.add('accordion-header');
                    accordionHeader.id = `${item.ruolo}Header`;

                    const accordionButton = document.createElement('button');
                    accordionButton.classList.add('accordion-button');
                    accordionButton.setAttribute('type', 'button');
                    accordionButton.setAttribute('data-bs-toggle', 'collapse');
                    accordionButton.setAttribute('data-bs-target', `#${item.ruolo}Collapse`);
                    accordionButton.setAttribute('aria-expanded', 'false');
                    accordionButton.setAttribute('aria-controls', `${item.ruolo}Collapse`);
                    accordionButton.textContent = `Il Ruolo del ${item.ruolo}`;

                    accordionHeader.appendChild(accordionButton);

                    const accordionCollapse = document.createElement('div');
                    accordionCollapse.id = `${item.ruolo}Collapse`;
                    accordionCollapse.classList.add('accordion-collapse', 'collapse');
                    accordionCollapse.setAttribute('aria-labelledby', `${item.ruolo}Header`);
                    accordionCollapse.setAttribute('data-bs-parent', '#communicationProcess');

                    const accordionBody = document.createElement('div');
                    accordionBody.classList.add('accordion-body');

                    const accordionBodyParagraph = document.createElement('p');
                    accordionBodyParagraph.textContent = item.descrizione;

                    accordionBody.appendChild(accordionBodyParagraph);
                    accordionCollapse.appendChild(accordionBody);
                    accordionItem.appendChild(accordionHeader);
                    accordionItem.appendChild(accordionCollapse);

                    processoContainer.appendChild(accordionItem);
                });
            } else {
                console.error('Elemento "communicationProcess" non trovato nel DOM.');
            }

            // Popola i crediti nel footer
            const footerCredits = document.querySelector('.footer p');
            footerCredits.innerHTML = `&copy; 2024 ${data.crediti} Tutti i diritti riservati. <a href="#content">Torna su</a>`;
        })
        .catch(error => {
            console.error('Errore nel caricamento del file JSON:', error);
        });
});
