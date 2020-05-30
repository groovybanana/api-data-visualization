console.log('Let\'s convert some currency!')

let state = {
    /* Placeholder till data retrieved from api */
    currencyData: {},
};

function render() {
    const rates = state.currencyData.rates
    const graph = document.querySelector('#flex-bars');

    // Clear innerHTML of graph area
    graph.innerHTML = '';
    console.log('Rates: ',rates);
    
    // Get max value of rates, for bar height ratio
    const ratesValues = Object.values(rates);
    console.log('Rates Values: ',ratesValues);
    const maxRate = Math.max(...ratesValues);

    for (const rate in rates) {
        let value = rates[rate].toFixed(3);
        let barHeight = (value / maxRate) * 100;
        graph.innerHTML += `
            <li style="height:${barHeight}%;" data-value=${value} data-label=${rate}></li>
            `;
    }
}

function rateFetch(baseCurrency = 'EUR') {
    const flag = document.querySelector('#Container-subhead')
    fetch(`https://api.exchangeratesapi.io/latest?symbols=CAD,AUD,CHF,SGD,PLN,BGN,NZD,USD,ILS,GBP&base=${baseCurrency}`)
        .then(response => response.json())
        .then(responseJson => {
            state.currencyData = responseJson;
            console.log('Current Value after rateFetch function:',state.currencyData);
            render();
        });
        flag.innerHTML = `Base Currency:   
        ${baseCurrency} <img src="./img/${baseCurrency}.png" height="20px" />`
        ;

}

rateFetch();



