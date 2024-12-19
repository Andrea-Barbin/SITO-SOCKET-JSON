document.addEventListener("DOMContentLoaded", function () {
    // Caricamento del file JSON
    fetch('./data/tcpUdp.json')
        .then(response => response.json())
        .then(data => {
            // Popolare il titolo principale della pagina
            document.getElementById('inizioPagina').textContent = data.titolo;
            document.querySelector('p').textContent = data.introduzione;

            // Sezione Introduzione
            const introDiv = document.querySelector('.container .row .col-md-6');
            introDiv.querySelector('h2').textContent = data.introduzioneSec.titolo;
            introDiv.querySelector('p').textContent = data.introduzioneSec.descrizione;

            // Aggiungere il video se presente
            const videoIframe = document.querySelector('.col-md-6 iframe');
            videoIframe.src = data.introduzioneSec.videoUrl;

            // Popolare il confronto tra TCP e UDP
            const confrontoDiv = document.getElementById('confrontoDiv');
            data.confronto.forEach(protocol => {
                const cardDiv = document.createElement('div');
                cardDiv.classList.add('col-md-6');
                cardDiv.innerHTML = `
                    <div class="card bg-light">
                        <div class="card-body">
                            <h3 class="card-title text-center">${protocol.titolo}</h3>
                            <p class="card-text">${protocol.descrizione}</p>
                            <p><strong>Caratteristiche principali di ${protocol.nome}:</strong></p>
                            <ul>
                                ${protocol.caratteristiche.map(item => 
                                    `<li><strong>${item.titolo}:</strong> ${item.descrizione}</li>`
                                ).join('')}
                            </ul>
                        </div>
                    </div>
                `;
                confrontoDiv.appendChild(cardDiv);
            });

            // Popolare la sezione tecnica
            const sezioneTecnicaDiv = document.getElementById('sezioneTecnicaDiv');
            data.sezioneTecnica.forEach(techSection => {
                const accordionItem = document.createElement('div');
                accordionItem.classList.add('accordion-item');
                accordionItem.innerHTML = `
                    <h2 class="accordion-header" id="${techSection.id}Header">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#${techSection.id}Collapse" aria-expanded="false" aria-controls="${techSection.id}Collapse">
                            ${techSection.titolo}
                        </button>
                    </h2>
                    <div id="${techSection.id}Collapse" class="accordion-collapse collapse" aria-labelledby="${techSection.id}Header" data-bs-parent="#tcpUdpAccordion">
                        <div class="accordion-body">
                            <p>${techSection.descrizione}</p>
                            <ul>
                                ${techSection.detagli.map(detail => 
                                    `<li><strong>${detail.titolo}:</strong> ${detail.descrizione}</li>`
                                ).join('')}
                            </ul>
                        </div>
                    </div>
                `;
                sezioneTecnicaDiv.appendChild(accordionItem);
            });

            // Popolare i crediti (sezione finale)
            const creditiDiv = document.querySelector('.container .text-center');
            creditiDiv.textContent = data.crediti;
        })
        .catch(error => console.error('Errore nel caricamento del JSON:', error));
});
