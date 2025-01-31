document.addEventListener("DOMContentLoaded", () => {
    const openingHoursApiUrl = "http://localhost:5000/api/opening-hours";
    const reservationsApiUrl = "http://localhost:5000/api/reservations"; // Added missing API URL
    const tableBody = document.getElementById("opening-hours-table");
    const saveButton = document.getElementById("save-hours");

    // Function to fetch reservations (Placeholder)
    async function fetchReservations() {
        console.log("Fetching reservations..."); 
        // Implement API call here
    }

    // Fetch and display opening hours
    async function fetchOpeningHours() {
        try {
            const response = await fetch(openingHoursApiUrl);
            const data = await response.json();

            tableBody.innerHTML = ""; // Clear existing data
            data.forEach(hour => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${hour.day}</td>
                    <td><input type="time" class="form-control text-center open-time" value="${hour.open_time}" data-day="${hour.day}" data-field="open_time"></td>
                    <td><input type="time" class="form-control text-center close-time" value="${hour.close_time}" data-day="${hour.day}" data-field="close_time"></td>
                `;
                tableBody.appendChild(row);
            });
        } catch (error) {
            console.error("Error fetching opening hours:", error);
        }
    }

    // Save updated opening hours
    saveButton.addEventListener("click", async () => {
        const updatedHours = [];
        document.querySelectorAll(".open-time, .close-time").forEach(input => {
            if (!input.value) {
                alert("All fields must be filled.");
                return;
            }
            updatedHours.push({
                day: input.dataset.day,
                field: input.dataset.field,
                value: input.value
            });
        });

        try {
            const response = await fetch(openingHoursApiUrl, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedHours)
            });

            if (response.ok) {
                alert("Opening hours updated successfully!");
                fetchOpeningHours();
            } else {
                alert("Error updating opening hours.");
            }
        } catch (error) {
            console.error("Error updating opening hours:", error);
        }
    });
    function startCountdown(targetDate) {
        function updateCountdown() {
            let now = new Date().getTime();
            let timeLeft = targetDate - now;
    
            let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            let hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    
            document.getElementById("countdown").innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    
            if (timeLeft < 0) {
                document.getElementById("countdown").innerHTML = "Offer Expired!";
            }
        }
    
        setInterval(updateCountdown, 1000);
    }
    
    // Set countdown to expire in 3 days
    let offerEndDate = new Date();
    offerEndDate.setDate(offerEndDate.getDate() + 3);
    startCountdown(offerEndDate.getTime());
    document.addEventListener("DOMContentLoaded", function () {
        const themeToggle = document.getElementById("themeToggle");
        let darkMode = localStorage.getItem("darkMode") === "enabled";
    
        function setTheme() {
            document.body.classList.toggle("bg-dark", darkMode);
            document.body.classList.toggle("text-white", darkMode);
            themeToggle.textContent = darkMode ? "☀ Light Mode" : "🌙 Dark Mode";
        }
    
        themeToggle.addEventListener("click", function () {
            darkMode = !darkMode;
            localStorage.setItem("darkMode", darkMode ? "enabled" : "disabled");
            setTheme();
        });
    
        setTheme();
    });
        
    // Load initial data
    fetchReservations();
    fetchOpeningHours();
});
