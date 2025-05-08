import { quarryComparison } from "./quarrys.js";
const selectYear = document.querySelector("#selectYear")
const selectPlace1 = document.querySelector("#selectPlace1")
const selectPlace2 = document.querySelector("#selectPlace2")
const ctx = document.querySelector("#myBarChart").getContext("2d")
const years = Array.from({ length: 35 }, (_, i) => (1990 + i).toString());
const url = "https://pxdata.stat.fi:443/PxWeb/api/v1/fi/StatFin/vaerak/statfin_vaerak_pxt_11ra.px"
let newData = null
let myChart = null
let data1 = null
let data2 = null
let selectedPlace1 = null
let selectedPlace2 = null


years.slice().reverse().forEach(year => {
    const options = document.createElement("option")
    options.value = year
    options.textContent = year;
    selectYear.appendChild(options)
})

selectYear.addEventListener("change", () => {
    
    if (myChart) {
        myChart.destroy()
    }
    selectPlace1.innerHTML = "<option value=''>Valitse paikka</option>"
    selectPlace2.innerHTML = "<option value=''>Valitse paikka</option>"

    data1 = null;
    data2 = null;
    selectedPlace1 = null;
    selectedPlace2 = null;
    selectPlace1.value = "";
    selectPlace2.value = "";

    const postData = quarryComparison(selectYear.value)
    axios.post(url, postData)
        .then(response => {
            newData = response.data  
            //console.log(newData.dimension.Alue.category.label)
            //console.log(Object.entries(newData.dimension.Alue.category.label))
            const placeNames = Object.values(newData.dimension.Alue.category.label)
            //console.log(newData)
            //console.log(placeNames)
            placeNames.forEach(place => {
                const option1 = document.createElement("option");
                const option2 = document.createElement("option");
                option1.value = place;
                option2.value = place;
                option1.textContent = place;
                option2.textContent = place;
                selectPlace1.appendChild(option1);
                selectPlace2.appendChild(option2);
            })
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        })
})


const getPopulationData = (place) => {
    if(!newData) return null
    
    const areaLabel = newData.dimension.Alue.category.label
    const areaIndexMap = newData.dimension.Alue.category.index
    const areaCode = Object.entries(areaLabel).find(([, name]) => name === place)?.[0]

    if (!areaCode) return null;

    return newData.value[areaIndexMap[areaCode]]
}

const makeChart = () => {
    if (myChart) {
        myChart.destroy();
    }

    const datasets = [];

    if (data1 !== null && selectedPlace1) {
        datasets.push({
            label: selectedPlace1,
            data: [data1],
            backgroundColor: "#FF6384"
        });
    }

    if (data2 !== null && selectedPlace2) {
        datasets.push({
            label: selectedPlace2,
            data: [data2],
            backgroundColor: "#36A2EB"
        });
    }

    if (datasets.length === 0) return;

    myChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Väestömäärä"],
            datasets
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: "top"
                }
            }
        }
    })
}

selectPlace1.addEventListener("change", () => {
    data1 = getPopulationData(selectPlace1.value)
    selectedPlace1 = selectPlace1.value
    makeChart()
})

selectPlace2.addEventListener("change", () => {
    data2 = getPopulationData(selectPlace2.value)
    selectedPlace2 = selectPlace2.value
    makeChart()
    
})

