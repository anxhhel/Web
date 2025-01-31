document.addEventListener("DOMContentLoaded", function () {
    const reviewForm = document.getElementById("reviewForm");
    const reviewList = document.getElementById("reviewList");

    // Load stored reviews
    loadReviews();

    reviewForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Get form values
        const username = document.getElementById("username").value.trim();
        const reviewText = document.getElementById("reviewText").value.trim();
        const rating = document.getElementById("rating").value;

        if (username && reviewText) {
            const review = {
                id: Date.now(), // Unique ID for each review
                username,
                reviewText,
                rating,
                timestamp: new Date().toLocaleString()
            };

            // Save and display review
            saveReview(review);

            // Reset form fields
            reviewForm.reset();

            // Scroll to reviews after submission
            setTimeout(() => {
                document.getElementById("reviewsContainer").scrollIntoView({ behavior: "smooth" });
            }, 300);
        }
    });

    function saveReview(review) {
        let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
        reviews.unshift(review); // Newest review first
        localStorage.setItem("reviews", JSON.stringify(reviews));

        // Re-render sorted reviews
        displayReviews(reviews);
    }

    function loadReviews() {
        let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
        displayReviews(reviews);
    }

    function displayReviews(reviews) {
        reviewList.innerHTML = ""; // Clear existing list
        reviews.forEach(review => {
            const li = document.createElement("li");
            li.classList.add("review-item"); // Apply animation class
            li.setAttribute("data-id", review.id); // Store ID for editing/deleting

            li.innerHTML = `
                <strong>${review.username}</strong> (${review.timestamp}) - ${review.rating}⭐<br>
                <p class="review-text">${review.reviewText}</p>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            `;

            reviewList.appendChild(li);

            // Attach event listeners for edit and delete
            li.querySelector(".delete-btn").addEventListener("click", function () {
                deleteReview(review.id);
            });

            li.querySelector(".edit-btn").addEventListener("click", function () {
                editReview(review.id);
            });
        });
    }

    function deleteReview(reviewId) {
        let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
        reviews = reviews.filter(review => review.id !== reviewId);
        localStorage.setItem("reviews", JSON.stringify(reviews));

        // Re-render reviews
        displayReviews(reviews);
    }

    function editReview(reviewId) {
        let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
        const reviewToEdit = reviews.find(review => review.id === reviewId);

        if (reviewToEdit) {
            // Pre-fill the form with existing review data
            document.getElementById("username").value = reviewToEdit.username;
            document.getElementById("reviewText").value = reviewToEdit.reviewText;
            document.getElementById("rating").value = reviewToEdit.rating;

            // Remove old review
            deleteReview(reviewId);
        }
    }
});
fetch("http://localhost:5065/api/reviews")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error("Error:", error));
  fetch("http://localhost:5065/api/reviews", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: "Delicious Ramen!",
      content: "The best ramen I’ve ever had!",
      rating: 5
    })
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error("Error:", error));