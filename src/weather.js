// import { format } from "core-js/core/date";
// import { dat } from "core-js/core/date";

document.addEventListener('DOMContentLoaded', function() {
    const apiKey = 'de3350f1d7c1da5fd5618c7db34c129b'; // Replace with your actual API key

    // Function to fetch weather data
    function fetchWeather(lat, lon) {
        console.log("COORDS", lat, lon)
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
        // const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=10&lon=20.3&appid=de3350f1d7c1da5fd5618c7db34c129b&units=imperial`;
        
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                console.log("DATA", data)
                let temperature = data.main.temp;
                console.log("TEMP:", temperature)
                temperature = Math.round(temperature); // Round to the nearest whole number
         
                const description = data.weather[0].description;
                console.log(description)

                document.querySelectorAll('.slide__element--temp').forEach(element => {
                    element.innerHTML = `${temperature}°<small>F</small>`;
                });

                // Uncomment if you have an element with id 'description'
                // document.getElementById('description').textContent = `Description: ${description}`;

                // Get and format the current date
                const currentDate = new Date();
                const day = currentDate.getDate();
                const month = currentDate.toLocaleString('default', { month: 'long' });
                const year = currentDate.getFullYear();
                const weekday = currentDate.toLocaleString('default', { weekday: 'long' });

                // Function to get the ordinal suffix
                function getOrdinalSuffix(day) {
                    if (day > 3 && day < 21) return 'th'; // Special case for 11th to 13th
                    switch (day % 10) {
                        case 1: return 'st';
                        case 2: return 'nd';
                        case 3: return 'rd';
                        default: return 'th';
                    }
                }

                const ordinalSuffix = getOrdinalSuffix(day);
                const formattedDate = `${weekday}, ${day}<sup>${ordinalSuffix}</sup> of ${month} ${year}`;

                // Update date element
                document.querySelectorAll('.slide__element--date').forEach(element => {
                    element.innerHTML = formattedDate;
                });

            })
            .catch(error => console.error('Error fetching weather data:', error));
    }



    // Get user's coordinates
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeather(lat, lon);
        }, error => {
            console.error('Error getting weather from lat and lon:', error);
            // Fallback to a default city if geolocation fails
            fetchWeather('New York');
        });
    } else {
        console.error('Geolocation is not supported by this browser.');
        // Fallback to a default city if geolocation is not supported
        fetchWeather('New York');
    }
});