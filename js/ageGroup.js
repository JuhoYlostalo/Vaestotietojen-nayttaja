const selectYear = document.querySelector("#selectYear")
const ctx = document.querySelector("#myChart").getContext("2d")
const years = Array.from({ length: 45 }, (_, i) => (1980 + i).toString());
const url = "https://pxdata.stat.fi:443/PxWeb/api/v1/fi/StatFin/vaerak/statfin_vaerak_pxt_11rd.px"
let myChart = null

years.slice().reverse().forEach(year => {
    const options = document.createElement("option")
    options.value = year
    options.textContent = year;
    selectYear.appendChild(options)
})

selectYear.addEventListener("change", () => { 

    const selectedYear = selectYear.value
    const postData = {
      "query": [
        {
          "code": "Vuosi",
          "selection": {
            "filter": "item",
            "values": [selectedYear]
          }
        },
        {
          "code": "Sukupuoli",
          "selection": {
            "filter": "item",
            "values": [
              "SSS"
            ]
          }
        },
        {
          "code": "Ikä",
          "selection": {
            "filter": "agg:Ikäkausi 0-14, 15-64, 65-.agg",
            "values": [
              "0-14",
              "15-64",
              "65-"
            ]
          }
        }
      ],
      "response": {
        "format": "json-stat2"
      }
    }

  axios.post(url, postData)
    .then(response => {
        const data = response.data
        //console.log(data)
        const populationCounts = data.value
        const ageGroups = ["0-14", "15-64", "65-"]
        //console.log(populationCounts)
        if (myChart) {
            myChart.destroy()
        } 

        myChart = new Chart (ctx, {
            type: "pie",
            data: {
              labels: ageGroups,
              datasets: [{
                label: "väestöluku",
                data: populationCounts,
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
              }]
            }
        })
  }).catch(error => {
      console.log("Error fetching data:", error)
  })
})
