function calcularComissoes() {
    const propertyId = document.getElementById('property_id').value;
    const mes = document.getElementById('mes').value;
    const resultados = document.getElementById('resultados');
    const loadingOverlay = document.getElementById('loading-overlay');


    if (!mes) {
        resultados.style.display = 'block'; 
        resultados.innerHTML = `<p style="color: red;">Por favor, selecione um mês válido.</p>`;
        return;
    }

    loadingOverlay.style.display = 'block';

    fetch('http://localhost:5000/calcular', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ property_id: parseInt(propertyId), mes: mes })
    })
    .then(response => response.json())
    .then(data => {
        loadingOverlay.style.display = 'none';

        if (data.message) {
            resultados.style.display = 'block'; 
            resultados.innerHTML = `<p>${data.message}</p>`;
            return;
        }

        resultados.style.display = 'block'; 
        resultados.innerHTML = '<canvas id="comissoesChart" width="400" height="200"></canvas>';

        const ctx = document.getElementById('comissoesChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['OTA', 'Anfitrião', 'Propriedade', 'Seazone'],
                datasets: [{
                    label: 'Comissões em R$',
                    data: [
                        data.ota_commission,
                        data.host_commission,
                        data.property_commission,
                        data.seazone_commission
                    ],
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.2)', 
                        'rgba(75, 192, 192, 0.2)',  
                        'rgba(255, 159, 64, 0.2)',  
                        'rgba(153, 102, 255, 0.2)' 
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(153, 102, 255, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false, 
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            font: {
                                family: 'Inter', 
                                size: 12 
                            }
                        }
                    }
                }
            }
            
        });
    })
    .catch(error => {
        loadingOverlay.style.display = 'none';
        resultados.style.display = 'block'; 
        resultados.innerHTML = `<p style="color: red;">Ocorreu um erro ao calcular as comissões. Tente novamente.</p>`;
        console.error('Erro:', error);
    });
}


function formatarValor(valor) {
    return valor.toFixed(2).replace('.', ',');
}
