
let myBtn = document.getElementById("myBtn");

let content = document.getElementById("content");
let heart_rate = document.getElementById("heart-rate");
let sp = document.getElementById("oxygen-rate");
let preg = document.getElementById('flexCheckDefault');

let preg_check = undefined;

if (preg.checked == true) {
    preg_check = true;
}
else {
    preg_check = false;
}


myBtn.addEventListener('click', function getData() {
    content.style.display = "block";
    url = "https://api.waqi.info/feed/here/?token=4cd730f5f6b87a5c96049e7e0db06e90a6562def";
    fetch(url).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
        let city = data.data.city.name;
        let aqi = data.data.aqi;
        let advice = undefined;
        let apl = undefined;
        let hi = undefined;
        let suggestions = undefined;

        if (aqi > 0 && aqi < 50) {
            content.style.backgroundColor = "#009966";
            content.style.color = "white";
            apl = "Good";
            hi = "Air quality is considered satisfactory, and air pollution poses little or no risk";
            advice = "None";
        }
        else if (aqi > 51 && aqi < 100) {
            content.style.backgroundColor = "#ffde33";
            apl = "Moderate";
            hi = "Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.";
            advice = "Active children and adults, and people with respiratory disease, such as asthma, should limit prolonged outdoor exertion.";
        }
        else if (aqi > 101 && aqi < 150) {
            content.style.backgroundColor = "#ff9933";
            apl = "Unhealthy for Sensitive Groups";
            hi = "Members of sensitive groups may experience health effects. The general public is not likely to be affected.";
            advice = "Active children and adults, and people with respiratory disease, such as asthma, should limit prolonged outdoor exertion.";
        }
        else if (aqi > 151 && aqi < 200) {
            content.style.backgroundColor = "#cc0033";
            content.style.color = "white";
            apl = "Unhealthy";
            hi = "Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects";
            advice = "Active children and adults, and people with respiratory disease, such as asthma, should avoid prolonged outdoor exertion; everyone else, especially children, should limit prolonged outdoor exertion";
        } else if (aqi > 201 && aqi < 300) {
            content.style.backgroundColor = "#660099";
            content.style.color = "white";
            apl = "Very Unhealthy";
            hi = "	Health warnings of emergency conditions. The entire population is more likely to be affected.";
            advice = "Active children and adults, and people with respiratory disease, such as asthma, should avoid all outdoor exertion; everyone else, especially children, should limit outdoor exertion.";
        }
        else if (aqi > 300) {
            content.style.backgroundColor = "#7e0023";
            content.style.color = "white";
            apl = "Hazardous";
            hi = "everyone may experience more serious health effects";
            advice = "Everyone should avoid all outdoor exertion";
        }

        content.innerHTML = `
        <div class="sub-content">
            <h6>City: </h6>
            <p>${city}</p>
        </div>
        <div class="sub-content">
            <h6>AQI: </h6>
            <p>${aqi}</p>
        </div>
        <div class="sub-content">
            <h6>Health Implications:</h6>
            <p>${hi}</p>
        </div>
        <div class="sub-content">
            <h6>Air Pollution Level:</h6>
            <p>${apl}</p>
        </div>
        <div class="sub-content">
            <h6>Cautionary Statement:</h6>
            <p>${advice}</p>
        </div>`;

        let modal_btn = document.getElementById('modal-btn');

        modal_btn.addEventListener('click', function () {
            if (heart_rate > 70 && sp > 80 && preg_check == false) {
                alert("You are good to go, Just eat Healthy")
            } else if (heart_rate > 90 && sp < 70 && preg_check == false) {
                alert("Please take precautions. AQI is not good for yoy today!")
            } else if (heart_rate > 120 && sp < 60 && preg_check == false) {
                alert("Please take precautions and be same at home!!")
            }
        });

    })
})

