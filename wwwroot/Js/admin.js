document.addEventListener("DOMContentLoaded", () => {
    checkAdminAccess();
    fetchMenuItems();
    fetchOrders();

    document.getElementById("menu-item-form").addEventListener("submit", handleMenuFormSubmit);
});

// ✅ Ensure only admins can access this page
// function checkAdminAccess() {
//     const token = localStorage.getItem("token");
//     if (!token) {
//         alert("Access Denied! Admins only.");
//         window.location.href = "login.html";
//         return;
//     }

//     fetch("api/Auth/validate", {
//         method: "GET",
//         headers: { "Authorization": Bearer ${token} }
//     })
//     .then(response => {
//         if (!response.ok) throw new Error("Unauthorized access");
//     })
//     .catch(() => {
//         alert("Invalid token! Please log in again.");
//         localStorage.removeItem("token");
//         window.location.href = "login.html";
//     });
// }

// ✅ Fetch and display menu items
function fetchMenuItems() {
    fetch("/api/MenuItems")
        .then(response => response.json())
        .then(data => {
            const menuTable = document.getElementById("menu-items");
            menuTable.innerHTML = "";
            data.forEach(item => {
                menuTable.innerHTML += `
                    <tr>
                        <td>${item.id}</td>
                        <td><img src="${item.imageUrl}" alt="${item.name}" width="50"></td>
                        <td>${item.category}</td>
                        <td>${item.name}</td>
                        <td>${item.description}</td>
                        <td>$${item.price.toFixed(2)}</td>
                        <td>${item.sold || 0}</td>
                        <td>
                            <button class="btn btn-warning btn-sm" onclick="editMenuItem(${item.id})">Edit</button>
                            <button class="btn btn-danger btn-sm" onclick="deleteMenuItem(${item.id})">Delete</button>
                        </td>
                    </tr>
                `;
            });
        })
        .catch(error => console.error("Error fetching menu items:", error));
}

// ✅ Handle Add/Edit menu form submission
// function handleMenuFormSubmit(event) {
//     event.preventDefault();
    
//     const id = document.getElementById("menu-item-id").value;
//     const menuItem = {
//         category: document.getElementById("menu-item-category").value,
//         name: document.getElementById("menu-item-name").value,
//         description: document.getElementById("menu-item-description").value,
//         price: parseFloat(document.getElementById("menu-item-price").value),
//         imageUrl: document.getElementById("menu-item-image").value
//     };

//     const method = id ? "PUT" : "POST";
//     const url = id ? /api/MenuItems/${id} : "/api/MenuItems";

//     fetch(url, {
//         method: method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(menuItem)
//     })
//     .then(response => response.json())
//     .then(() => {
//         alert(id ? "Menu item updated!" : "New menu item added!");
//         document.getElementById("menu-item-form").reset();
//         fetchMenuItems();
//         $("#menuItemModal").modal("hide");
//     })
//     .catch(error => console.error("Error saving menu item:", error));
// }

// ✅ Edit menu item (populate modal)
// function editMenuItem(id) {
//     fetch(/api/MenuItems/${id})
//         .then(response => response.json())
//         .then(item => {
//             document.getElementById("menu-item-id").value = item.id;
//             document.getElementById("menu-item-category").value = item.category;
//             document.getElementById("menu-item-name").value = item.name;
//             document.getElementById("menu-item-description").value = item.description;
//             document.getElementById("menu-item-price").value = item.price;
//             document.getElementById("menu-item-image").value = item.imageUrl;
//             $("#menuItemModal").modal("show");
//         })
//         .catch(error => console.error("Error fetching menu item:", error));
// }

// ✅ Delete a menu item
// function deleteMenuItem(id) {
//     if (!confirm("Are you sure you want to delete this item?")) return;

//     fetch(/api/MenuItems/${id}, { method: "DELETE" })
//         .then(() => {
//             alert("Menu item deleted.");
//             fetchMenuItems();
//         })
//         .catch(error => console.error("Error deleting menu item:", error));
// }

// ✅ Fetch and display online orders
function fetchOrders() {
    fetch("/api/Orders")
        .then(response => response.json())
        .then(data => {
            const ordersContainer = document.getElementById("orders-container");
            ordersContainer.innerHTML = "";
            data.forEach(order => {
                ordersContainer.innerHTML += `
                    <div class="card order-card">
                        <div class="card-body">
                            <h5>Order #${order.id}</h5>
                            <p><strong>Name:</strong> ${order.customerName}</p>
                            <p><strong>Phone:</strong> ${order.customerPhone}</p>
                            <p><strong>Address:</strong> ${order.customerAddress}</p>
                            <p><strong>Status:</strong> ${order.status}</p>
                            <p><strong>Total:</strong> $${order.totalPrice.toFixed(2)}</p>
                            <button class="btn btn-success btn-sm" onclick="updateOrderStatus(${order.id}, 'Completed')">Mark as Completed</button>
                        </div>
                    </div>
                `;
            });
        })
        .catch(error => console.error("Error fetching orders:", error));
}

// ✅ Mark order as completed
// function updateOrderStatus(id, status) {
//     fetch(/api/Orders/${id}, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ status: status })
//     })
//     .then(() => {
//         alert("Order updated!");
//         fetchOrders();
//     })
//     .catch(error => console.error("Error updating order:", error));
// }

// ✅ Logout function
function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}



































































// document.addEventListener("DOMContentLoaded", () => {
//     const role = localStorage.getItem("role");
//     if (role !== "admin") {
//         alert("Access denied! Only admins can access this page.");
//         window.location.href = "login.html";
//     }

//     if (document.getElementById("revenue-table-body") && document.getElementById("total-revenue")) {
//         updateRevenueTable(); // ✅ Only runs if elements exist
//     }
//     renderMenuItems();
//     renderChart();
//     renderOrders();
//     renderRevenue();
//     updateRevenueTable();
// });

// function logout() {
//     localStorage.removeItem("role");  // Remove only the role, NOT orders
//     window.location.href = "login.html";  // Redirect to login page
// }


// // ✅ Attach event listener to Logout button
// document.addEventListener("DOMContentLoaded", () => {
//     const logoutButton = document.getElementById("logout-btn");
//     if (logoutButton) {
//         logoutButton.addEventListener("click", logoutUser);
//     }
// });

// let chartInstance;

// function renderChart() {
//     const ctx = document.getElementById("salesChart").getContext("2d");
//     const menuData = JSON.parse(localStorage.getItem("menuData")) || {};
//     const labels = [];
//     const data = [];
//     const categoryColors = {
//         maki: "#FF6384",
//         uramaki: "#36A2EB",
//         "special rolls": "#FFCE56",
//         other: "#9966FF", // Default color for unlisted categories
//     };

//     let totalItems = 0;

//     // Count the number of items in each category
//     Object.keys(menuData).forEach((category) => {
//         const categoryCount = menuData[category].length || 0;
//         if (categoryCount > 0) {
//             labels.push(category.charAt(0).toUpperCase() + category.slice(1)); // Capitalize category name
//             data.push(categoryCount);
//             totalItems += categoryCount;
//         }
//     });

//     // If no items exist, show default chart pie with equal distribution
//     if (totalItems === 0) {
//         Object.keys(categoryColors).forEach((category) => {
//             if (category !== "other") {
//                 labels.push(category.charAt(0).toUpperCase() + category.slice(1));
//                 data.push(1); // Default equal distribution
//             }
//         });
//     }

//     // Generate colors for each category
//     const backgroundColors = labels.map(label => categoryColors[label.toLowerCase()] || categoryColors.other);

//     // Destroy the existing chart if it exists to prevent overlay
//     if (chartInstance) {
//         chartInstance.destroy();
//     }

//     chartInstance = new Chart(ctx, {
//         type: "pie",
//         data: {
//             labels,
//             datasets: [
//                 {
//                     data,
//                     backgroundColor: backgroundColors,
//                 },
//             ],
//         },
//         options: {
//             responsive: false, // Turn off responsiveness for better control
//             plugins: {
//                 legend: {
//                     display: true,
//                     position: "bottom"
//                 },
//                 tooltip: {
//                     callbacks: {
//                         label: function (tooltipItem) {
//                             const category = labels[tooltipItem.dataIndex];
//                             const count = data[tooltipItem.dataIndex];
//                             const percentage = ((count / totalItems) * 100).toFixed(2);
//                             return ${category}: ${count} (${percentage}%);
//                         }
//                     }
//                 }
//             },
//         },
//     });

//     // Set canvas size manually
//     ctx.canvas.parentNode.style.width = "300px"; // Width of the chart container
//     ctx.canvas.parentNode.style.height = "300px"; // Height of the chart container
// }

// function renderRevenue() {
//     const revenueDisplay = document.getElementById("total-revenue");
//     const revenueTable = document.getElementById("revenue-breakdown");
//     const orders = JSON.parse(localStorage.getItem("orders")) || [];
    
//     let totalRevenue = 0;
//     let categorySales = {};

//     // Loop through orders and calculate revenue per category
//     orders.forEach(order => {
//         order.items.forEach(item => {
//             totalRevenue += item.price * item.quantity;

//             if (!categorySales[item.category]) {
//                 categorySales[item.category] = { sold: 0, revenue: 0 };
//             }

//             categorySales[item.category].sold += item.quantity;
//             categorySales[item.category].revenue += item.price * item.quantity;
//         });
//     });

//     // Update Total Revenue Display
//     revenueDisplay.textContent = $${totalRevenue.toFixed(2)};

//     // Update Revenue Breakdown Table
//     revenueTable.innerHTML = Object.keys(categorySales).map(category => `
//         <tr>
//             <td>${category}</td>
//             <td>${categorySales[category].sold}</td>
//             <td>$${categorySales[category].revenue.toFixed(2)}</td>
//         </tr>
//     `).join("");
// }

// function renderRevenueBreakdown() {
//     const menuData = JSON.parse(localStorage.getItem("menuData")) || {};
//     const revenueBreakdownContainer = document.getElementById("revenue-breakdown");
//     revenueBreakdownContainer.innerHTML = ""; // Clear previous entries

//     Object.keys(menuData).forEach((category) => {
//         let totalSold = 0;
//         let totalRevenue = 0;

//         menuData[category].forEach((item) => {
//             totalSold += item.sold || 0;
//             totalRevenue += (item.sold || 0) * item.price;
//         });

//         if (totalSold > 0 || totalRevenue > 0) {
//             revenueBreakdownContainer.innerHTML += `
//                 <tr>
//                     <td>${category.charAt(0).toUpperCase() + category.slice(1)}</td>
//                     <td>${totalSold}</td>
//                     <td>$${totalRevenue.toFixed(2)}</td>
//                 </tr>
//             `;
//         }
//     });

//     // Add a message if no data exists
//     if (revenueBreakdownContainer.innerHTML === "") {
//         revenueBreakdownContainer.innerHTML = `
//             <tr>
//                 <td colspan="3" class="text-center">No data available</td>
//             </tr>
//         `;
//     }
// }

// // Call this function whenever the chart is updated
// document.addEventListener("DOMContentLoaded", () => {
//     renderRevenueBreakdown();
// });


// function renderMenuItems() {
//     const menuData = JSON.parse(localStorage.getItem("menuData")) || {};
//     const menuItemsContainer = document.getElementById("menu-items");
//     menuItemsContainer.innerHTML = ""; // Clear previous entries

//     let id = 1;
//     Object.keys(menuData).forEach((category) => {
//         menuData[category].forEach((item, index) => {
//             menuItemsContainer.innerHTML += `
//                 <tr>
//                     <td>${id++}</td>
//                     <td><img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover;"></td>
//                     <td>${category}</td>
//                     <td>${item.name}</td>
//                     <td>${item.description}</td>
//                     <td>$${item.price.toFixed(2)}</td>
//                     <td id="sold-${item.name}">${item.sold || 0}</td> <!-- Updated row -->
//                     <td>
//                         <button class="btn btn-warning" onclick="editMenuItem('${category}', ${index})">Edit</button>
//                         <button class="btn btn-danger" onclick="deleteMenuItem('${category}', ${index})">Delete</button>
//                     </td>
//                 </tr>
//             `;
//         });
//     });
// }


// function initializeDefaultMenuData() {
//     const defaultMenuData = {
//         maki: [],
//         uramaki: [],
//         "special rolls": [],
//         custom: [],
//     };
//     localStorage.setItem("menuData", JSON.stringify(defaultMenuData));
//     return defaultMenuData;
// }

// function addMenuItem() {
//     const name = document.getElementById("menu-item-name").value.trim();
//     const description = document.getElementById("menu-item-description").value.trim();
//     const price = parseFloat(document.getElementById("menu-item-price").value);
//     const imageFile = document.getElementById("menu-item-image").files[0];
//     const category = document.getElementById("menu-item-category").value;

//     if (!name || !description || !price || !category) {
//         alert("All fields are required.");
//         return;
//     }

//     const reader = new FileReader();
//     reader.onload = function (event) {
//         const imageBase64 = event.target.result;

//         const menuData = JSON.parse(localStorage.getItem("menuData")) || {};
//         if (!menuData[category]) menuData[category] = [];

//         menuData[category].push({
//             name,
//             description,
//             price,
//             image: imageBase64,
//             sold: 0,
//         });

//         localStorage.setItem("menuData", JSON.stringify(menuData));
//         renderMenuItems();
//         alert("Menu item added successfully!");
//         $("#menuItemModal").modal("hide");
//     };

//     if (imageFile) {
//         reader.readAsDataURL(imageFile);
//     } else {
//         alert("Please upload an image.");
//     }
// }

// function editMenuItem(category, index) {
//     const menuData = JSON.parse(localStorage.getItem("menuData")) || {};
//     const item = menuData[category][index];

//     // Populate the form fields with the item's current data
//     document.getElementById("menu-item-id").value = ${category},${index};
//     document.getElementById("menu-item-category").value = category;
//     document.getElementById("menu-item-name").value = item.name;
//     document.getElementById("menu-item-description").value = item.description;
//     document.getElementById("menu-item-price").value = item.price;

//     $("#menuItemModal").modal("show");
// }

// document.getElementById("menu-item-form").addEventListener("submit", (e) => {
//     e.preventDefault();

//     const id = document.getElementById("menu-item-id").value;
//     const name = document.getElementById("menu-item-name").value.trim();
//     const description = document.getElementById("menu-item-description").value.trim();
//     const price = parseFloat(document.getElementById("menu-item-price").value);
//     const category = document.getElementById("menu-item-category").value;
//     const imageFile = document.getElementById("menu-item-image").files[0];

//     const reader = new FileReader();

//     reader.onload = function (event) {
//         const imageBase64 = event.target.result;

//         const menuData = JSON.parse(localStorage.getItem("menuData")) || {};

//         if (id) {
//             const [oldCategory, index] = id.split(",");
//             if (oldCategory !== category) {
//                 menuData[oldCategory].splice(index, 1);
//                 if (!menuData[category]) menuData[category] = [];
//                 menuData[category].push({ name, description, price, image: imageBase64, sold: 0 });
//             } else {
//                 menuData[category][index] = { name, description, price, image: imageBase64, sold: menuData[category][index].sold || 0 };
//             }
//         } else {
//             if (!menuData[category]) menuData[category] = [];
//             menuData[category].push({ name, description, price, image: imageBase64, sold: 0 });
//         }

//         localStorage.setItem("menuData", JSON.stringify(menuData));
//         renderMenuItems();
//         alert("Menu item updated successfully!");
//         $("#menuItemModal").modal("hide");
//     };

//     if (imageFile) {
//         reader.readAsDataURL(imageFile);
//     } else {
//         alert("Please upload an image.");
//     }
// });

// function deleteMenuItem(category, index) {
//     const menuData = JSON.parse(localStorage.getItem("menuData")) || {};
//     if (menuData[category]) {
//         menuData[category].splice(index, 1);
//         if (menuData[category].length === 0) {
//             delete menuData[category];
//         }
//         localStorage.setItem("menuData", JSON.stringify(menuData));
//         renderMenuItems();
//         renderChart(); // Update the chart after deleting a menu item
//         alert("Menu item deleted successfully!");
//     }
// }
// console.log(JSON.parse(localStorage.getItem("orders")));

// const testOrders = [
//     {
//         id: "1738185395520",
//         name: "Martin Shameti",
//         phone: "12345678",
//         address: "Rr. Ismail Qemali",
//         items: [
//             { name: "Dragon Roll", quantity: 4, price: 47.96 }
//         ],
//         total: 47.96,
//         status: "Pending"
//     }
// ];

// localStorage.setItem("orders", JSON.stringify(testOrders));
// renderOrders();


// function renderOrders() {
//     const orders = JSON.parse(localStorage.getItem("orders")) || [];
//     const orderContainer = document.getElementById("order-container");

//     orderContainer.innerHTML = ""; // ✅ Clear previous orders

//     if (orders.length === 0) {
//         orderContainer.innerHTML = "<p>No online orders yet.</p>";
//         return;
//     }

//     orders.forEach(order => {
//         const orderElement = document.createElement("div");
//         orderElement.classList.add("order-box");

//         orderElement.innerHTML = `
//             <h4 class="order-id">Order #${order.id}</h4>
//             <p><strong>Name:</strong> ${order.name}</p>
//             <p><strong>Phone:</strong> ${order.phone}</p>
//             <p><strong>Address:</strong> ${order.address}</p>
//             <p><strong>Items:</strong></p>
//             <ul>
//                 ${order.items.map(item => <li>${item.name} x${item.quantity} - $${item.price.toFixed(2)}</li>).join("")}
//             </ul>
//             <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
//             <p><strong>Date & Time:</strong> ${order.date || "No Date Available"}</p>
//             <p><strong>Status:</strong> ${order.status}</p>
//             <button class="btn btn-success" onclick="markOrderCompleted('${order.id}')">Mark as Completed</button>
//             <button class="btn btn-danger" onclick="deleteOrder('${order.id}')">Delete</button>
//         `;

//         orderContainer.appendChild(orderElement);
//     });
// }


// console.log(localStorage.getItem("orders"));

// console.log(JSON.parse(localStorage.getItem("orders")) || "No orders found");

// function markOrderCompleted(orderId) {
//     let orders = JSON.parse(localStorage.getItem("orders")) || [];
//     const menuData = JSON.parse(localStorage.getItem("menuData")) || {};

//     orders = orders.map(order => {
//         if (order.id === orderId && order.status === "Pending") {
//             order.status = "Completed";

//             order.items.forEach(item => {
//                 Object.keys(menuData).forEach(category => {
//                     const menuItem = menuData[category].find(menuItem => menuItem.name === item.name);
//                     if (menuItem) {
//                         menuItem.sold = (menuItem.sold || 0) + item.quantity;
//                     }
//                 });
//             });

//             localStorage.setItem("menuData", JSON.stringify(menuData));
//         }
//         return order;
//     });

//     localStorage.setItem("orders", JSON.stringify(orders));
//     renderOrders();
//     updateRevenueTable(); // ✅ Ensures Total Revenue updates instantly!
// }


// function deleteOrder(orderId) {
//     let orders = JSON.parse(localStorage.getItem("orders")) || [];
//     orders = orders.filter(order => order.id !== orderId);
//     localStorage.setItem("orders", JSON.stringify(orders));
//     renderOrders(); // ✅ Refresh orders display
// }

// function updateRevenueTable() {
//     const revenueTable = document.getElementById("revenue-table");
//     const totalRevenueElement = document.getElementById("total-revenue");

//     if (!revenueTable || !totalRevenueElement) {
//         console.error("Revenue table or total revenue element not found.");
//         return;
//     }

//     const menuData = JSON.parse(localStorage.getItem("menuData")) || {};
//     let totalRevenue = 0;

//     Object.keys(menuData).forEach(category => {
//         let categoryRevenue = 0;
//         let categoryItemsSold = 0;

//         menuData[category].forEach(item => {
//             categoryRevenue += (item.sold || 0) * item.price;
//             categoryItemsSold += item.sold || 0;
//         });

//         revenueTable.innerHTML += `
//             <tr>
//                 <td>${category}</td>
//                 <td>${categoryItemsSold}</td>
//                 <td>$${categoryRevenue.toFixed(2)}</td>
//             </tr>
//         `;

//         totalRevenue += categoryRevenue;
//     });

//     totalRevenueElement.textContent = $${totalRevenue.toFixed(2)};
// }




// function placeOrder() {
//     const cart = JSON.parse(localStorage.getItem("cart")) || [];

//     if (cart.length === 0) {
//         alert("Your cart is empty. Add items to checkout.");
//         return;
//     }

//     const name = document.getElementById("customer-name").value.trim();
//     const phone = document.getElementById("phone-number").value.trim();
//     const address = document.getElementById("address").value.trim();

//     if (!name || !phone || !address) {
//         alert("Please fill in all the fields.");
//         return;
//     }

//     const orders = JSON.parse(localStorage.getItem("orders")) || [];
//     const newOrder = {
//         id: Date.now(),
//         name,
//         phone,
//         address,
//         items: cart,
//         total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
//         date: new Date().toLocaleString(),
//         status: "Pending"
//     };

//     orders.push(newOrder);
//     localStorage.setItem("orders", JSON.stringify(orders)); // Save order
//     localStorage.removeItem("cart"); // Clear cart after order

//     alert("Order placed successfully!");
//     window.location.href = "menu.html"; // Redirect back to menu
// }

// function updateOrderStatus(orderId, newStatus) {
//     let orders = JSON.parse(localStorage.getItem("orders")) || [];
//     let menuData = JSON.parse(localStorage.getItem("menuData")) || {};

//     let orderIndex = orders.findIndex(order => order.id === orderId);
//     if (orderIndex !== -1) {
//         let order = orders[orderIndex];

//         if (newStatus === "Completed" && order.status !== "Completed") {
//             // Update sold count for each item
//             order.items.forEach(orderItem => {
//                 Object.keys(menuData).forEach(category => {
//                     menuData[category].forEach(menuItem => {
//                         if (menuItem.name === orderItem.name) {
//                             menuItem.sold = (menuItem.sold || 0) + orderItem.quantity;
//                         }
//                     });
//                 });
//             });

//             // Save updated menu data to localStorage
//             localStorage.setItem("menuData", JSON.stringify(menuData));

//             // Update the table UI
//             renderMenuItems();
//         }

//         // Update order status
//         orders[orderIndex].status = newStatus;
//         localStorage.setItem("orders", JSON.stringify(orders));
//         renderOrders();
//     }
// }


// function deleteOrder(orderId) {
//     let orders = JSON.parse(localStorage.getItem("orders")) || [];
//     orders = orders.filter(order => order.id !== orderId);
//     localStorage.setItem("orders", JSON.stringify(orders));
//     renderOrders(); // Refresh orders list
// }