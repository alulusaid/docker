// scripts.js

document.addEventListener('DOMContentLoaded', function() {
    const toggleSwitch = document.getElementById('toggleSwitch');
    const currentDataContainer = document.querySelector('.dashboard-container');
    const historyContainer = document.querySelector('.history-container');
    const weatherHistoryList = document.getElementById('weatherHistory');

    function fetchData() {
        return {
            temperature: Math.random() * 30 + 10,
            moisture: Math.random() * 50 + 20,
            windSpeed: Math.random() * 5 + 1
            // Add more data fields as needed
        };
    }

    // Update sensor data every 5 seconds (adjust as needed)
    setInterval(function() {
        const data = fetchData();
        updateSensorData(data);
    }, 5000);

    // Function to update the sensor data in the HTML
    function updateSensorData(data) {
        document.getElementById('temperature').textContent = `${data.temperature.toFixed(2)} °C`;
        document.getElementById('moisture').textContent = `${data.moisture.toFixed(2)}%`;
        document.getElementById('wind-speed').textContent = `${data.windSpeed.toFixed(2)} m/s`;
        // Add more updates as needed
    }
    
    toggleSwitch.addEventListener('change', function() {
        if (toggleSwitch.checked) {
            // Show weather history
            currentDataContainer.style.display = 'none';
            historyContainer.style.display = 'block';
            fetchWeatherHistory();
        } else {
            // Show current data
            currentDataContainer.style.display = 'flex';
            historyContainer.style.display = 'none';
        }
    });

    function fetchWeatherHistory() {
        fetch('/weather_history')
            .then(response => response.json())
            .then(data => {
                console.log('Weather History Response:', data);
    
                weatherHistoryList.innerHTML = '';
    
                if (Array.isArray(data)) {
                    data.forEach(entry => {
                        const formattedDate = entry['Formatted Date'];
                        const temperature = entry['Temperature (C)'];
                        const humidity = entry['Humidity'];
                        const windSpeed = entry['Wind Speed (km/h)'];
    
                        const listItem = document.createElement('li');
                        listItem.innerHTML = `<strong>${formattedDate}</strong>: Temp ${temperature}°C, Humidity ${humidity}%, Wind ${windSpeed} km/h`;
                        weatherHistoryList.appendChild(listItem);
                    });
                } else {
                    console.error('Weather History data is not an array:', data);
                }
            })
            .catch(error => console.error('Error fetching weather history:', error));
    }
    
});
