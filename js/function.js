const ctx = document.querySelector("#myChart").getContext("2d")

const years = Array.from({ length: 11 }, (_, i) => (2014 + i).toString());
const url = "https://pxdata.stat.fi:443/PxWeb/api/v1/fi/StatFin/vaerak/statfin_vaerak_pxt_11rb.px"
const postData = {
    "query": [
      {
        "code": "Vuosi",
        "selection": {
          "filter": "item",
          "values": years
        }
      },
      {
        "code": "Sukupuoli",
        "selection": {
          "filter": "item",
          "values": ["SSS"]
        }
      },
      {
        "code": "Tiedot",
        "selection": {
          "filter": "item",
          "values": ["vaesto"]
        }
      }
    ],
    "response": {
      "format": "json-stat2"
    }
  }


axios.post(url, postData)
    .then(response =>{
        const data = response.data
        const yearLabel = Object.values(data.dimension.Vuosi.category.label)
        populationValues = data.value
    
        const populationChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: yearLabel,
                datasets: [{
                    label: 'Population in Finland 2014-2024',
                    data: populationValues,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgb(46, 39, 38)',
                    borderWidth: 2,
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true
                    },
                scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            }
        }
    })  
}).catch(error => {
    console.error("Error fetching data:", error);
})

    

