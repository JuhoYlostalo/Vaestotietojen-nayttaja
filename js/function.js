import { quarryIndex } from "./quarrys.js"
const ctx = document.querySelector("#myChart").getContext("2d")
const years = Array.from({ length: 11 }, (_, i) => (2014 + i).toString());
const url = "https://pxdata.stat.fi:443/PxWeb/api/v1/fi/StatFin/vaerak/statfin_vaerak_pxt_11rb.px"
const postData = quarryIndex(years)
//console.log(postData)


axios.post(url, postData)
    .then(response =>{
        const data = response.data
        //console.log(data)
        const yearLabel = Object.values(data.dimension.Vuosi.category.label)
        const populationValues = data.value
    
        const populationChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: yearLabel,
                datasets: [{
                    label: 'Suomen asukas määrä',
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
                        display: false
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

    

