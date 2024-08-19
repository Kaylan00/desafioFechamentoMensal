# Fechamento Mensal - Seazone

Este projeto é uma aplicação web que permite calcular e visualizar o fechamento mensal de uma propriedade gerenciada pela Seazone. A aplicação exibe as comissões a serem distribuídas para diferentes partes envolvidas (OTA, Anfitrião, Propriedade e Seazone) com base em dados de reservas fornecidos.

## Visão Geral

A aplicação é composta por um frontend interativo e um backend que processa os cálculos das comissões. Ao selecionar o ID da propriedade e o mês desejado, o usuário pode calcular as comissões de forma fácil e visualizar os resultados em um gráfico de barras.

## Tecnologias Utilizadas

### Frontend:
- **HTML5 e CSS3**: Estruturação e estilização da interface do usuário.
- **JavaScript**: Manipulação do DOM, requisições HTTP e interação com o backend.
- **Chart.js**: Biblioteca utilizada para renderizar gráficos de barras, exibindo as comissões calculadas.

### Backend:
- **Python (Flask)**: Framework leve para construção de APIs. O Flask é utilizado para criar endpoints que recebem as requisições do frontend, processam os dados e retornam os resultados.

## Funcionalidades

### Interface de Usuário:
- O usuário pode selecionar um ID de propriedade e um mês (no formato AAAA-MM).
- Um botão "Calcular" envia os dados selecionados para o backend para processamento.
- Exibe uma animação de carregamento enquanto os cálculos estão sendo processados.

### Processamento no Backend:
- Recebe os dados de entrada do frontend (ID da propriedade e mês).
- Realiza os cálculos das comissões para a OTA, Anfitrião, Propriedade e Seazone com base em um arquivo JSON contendo os dados de reservas.
- Retorna os valores calculados em formato JSON.

### Visualização de Resultados:
- O frontend recebe os valores calculados e os exibe em um gráfico de barras utilizando Chart.js.
- Caso o usuário não selecione um mês ou ocorra algum erro, é exibida uma mensagem de erro amigável.

## Como Configurar e Executar

### Pré-requisitos
- Python 3.x
- Flask (`pip install flask`)
- Chart.js (incluído via CDN no HTML)

### Passos para Executar:

1. **Clone o Repositório:**
   ```bash
   git clone https://github.com/seu-usuario/fechamento-mensal-seazone.git
   cd fechamento-mensal-seazone
