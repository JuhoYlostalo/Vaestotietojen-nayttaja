import { quarryAgeGroup } from "./quarrys.js"
const selectYear = document.querySelector("#selectYear")
const ctx = document.querySelector("#myChart").getContext("2d")
const years = Array.from({ length: 45 }, (_, i) => (1980 + i).toString())
const url = "https://pxdata.stat.fi:443/PxWeb/api/v1/fi/StatFin/vaerak/statfin_vaerak_pxt_11rd.px"
let myChart = null

years.slice().reverse().forEach(year => {
    const options = document.createElement("option")
    options.value = year
    options.textContent = year
    selectYear.appendChild(options)
})

selectYear.addEventListener("change", () => { 

    const selectedYear = selectYear.value
    const postData = quarryAgeGroup(selectedYear)
    //console.log(postData)

  axios.post(url, postData)
    .then(response => {
        const data = response.data
        //console.log(data)
        const populationCounts = data.value
        
        //console.log(populationCounts)
        if (myChart) {
            myChart.destroy()
        } 

        const procentage1 = (populationCounts[0] / (populationCounts[0] + populationCounts[1] + populationCounts[2])) * 100
        const procentage2 = (populationCounts[1] / (populationCounts[0] + populationCounts[1] + populationCounts[2])) * 100
        const procentage3 = (populationCounts[2] / (populationCounts[0] + populationCounts[1] + populationCounts[2])) * 100
        const ageGroups = [`0-14 (${procentage1.toFixed(1)}%) `, `15-64 (${procentage2.toFixed(1)}%) `, `65- (${procentage3.toFixed(1)}%) `]
        myChart = new Chart (ctx, {
            type: "pie",
            data: {
              labels: ageGroups,
              datasets: [{
                label: "väestöluku",
                data: populationCounts,
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: true,
              aspectRatio: 1.75,
              plugins: {
                legend: {
                  position: "top",
                }
              }
            }
        })
  }).catch(error => {
      console.log("Error fetching data:", error)
  })
})
