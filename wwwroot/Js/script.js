// ✅ Toggle theme between light and dark mode
document.getElementById('theme-toggle')?.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
  });
  
  document.addEventListener("DOMContentLoaded", () => {
    loadMenuItems(); // ✅ Load menu items from backend
    renderCart(); // ✅ Load cart from backend
  });
  
  
  function loadMenuItems() {
    fetch("http://localhost:5145/api/MenuItems", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        mode: "cors" // Ensures CORS is enabled
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to fetch menu items");
        }
        return response.json();
    })
    .then(data => {
        console.log("Fetched Menu Items:", data);
        renderMenu(data.items); // Call function to display menu items
    })
    .catch(error => {
        console.error("CORS Error:", error);
        document.getElementById("menu-container").innerHTML = `
            <p style="color: red; text-align: center;">Failed to load menu. Please try again.</p>
        `;
    });
  }
  
  
  // ✅ Render fetched menu items
  function renderMenu(menuData) {
    const menuContainer = document.getElementById('menu-container');
    menuContainer.innerHTML = '';
  
    menuData.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('menu-item');
        itemDiv.innerHTML = `
            <div class="menu-item-left">
                <img src="${item.imageUrl}" alt="${item.name}">
            </div>
            <div class="menu-item-right">
                <div class="menu-item-header">
                    <span class="menu-item-name">${item.name}</span>
                    <span class="menu-item-price">$${item.price.toFixed(2)}</span>
                </div>
                <div class="menu-item-footer">
                    <span class="menu-item-description">${item.description}</span>
                    <button class="menu-item-add-to-cart" 
                        onclick="addToCart(${item.id}, '${item.name}', ${item.price})">
                        +
                    </button>
                </div>
            </div>
        `;
        menuContainer.appendChild(itemDiv);
    });
  }
  
  
  // ✅ Display Menu Items in Menu Tab
  function displayMenuItems(menuItems) {
    const menuContainer = document.getElementById("menu-container");
    menuContainer.innerHTML = "";
  
    const categories = {};
  
    // Group menu items by category
    menuItems.forEach(item => {
        if (!categories[item.category]) categories[item.category] = [];
        categories[item.category].push(item);
    });
  
    // Loop through categories and create UI
    for (const category in categories) {
        const categoryDiv = document.createElement("div");
        categoryDiv.classList.add("menu-category");
        categoryDiv.id = category.replace(/\s+/g, "-").toLowerCase(); // Convert spaces to hyphens for IDs
  
        categoryDiv.innerHTML = <h2>${category.toUpperCase()}</h2>;
  
        categories[category].forEach(item => {
            const itemDiv = document.createElement("div");
            itemDiv.classList.add("menu-item");
  
            itemDiv.innerHTML = `
                <div class="menu-item-left">
                    <img src="${item.imageUrl}" alt="${item.name}">
                </div>
                <div class="menu-item-right">
                    <div class="menu-item-header">
                        <span class="menu-item-name">${item.name}</span>
                        <span class="menu-item-price">$${item.price.toFixed(2)}</span>
                    </div>
                    <div class="menu-item-footer">
                        <span class="menu-item-description">${item.description}</span>
                        <button class="menu-item-add-to-cart" onclick="addToCart(${item.id}, '${item.name}', ${item.price})">+</button>
                    </div>
                </div>
            `;
  
            categoryDiv.appendChild(itemDiv);
        });
  
        menuContainer.appendChild(categoryDiv);
    }
  }
  
  function addToCart(menuItemId, name, price) {
    console.log("Clicked Add to Cart for:", name, price); // ✅ Debugging Log
  
    fetch("http://localhost:5145/api/Cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ menuItemId, quantity: 1 })
    })
    .then(response => {
        if (!response.ok) throw new Error("Failed to add to cart");
        return response.json();
    })
    .then(() => {
        console.log("Item added to cart:", name); // ✅ Confirm item was added
        renderCart(); // Refresh cart UI
    })
    .catch(error => {
        console.error("Error adding to cart:", error);
    });
  }
  
//   // ✅ Load cart from backend instead of localStorage
//   async function loadCart() {
//     try {
//         const response = await fetch("http://localhost:5145/api/Cart", {
//             headers: { "Authorization": Bearer ${localStorage.getItem("token")} }
//         });
//         cart = await response.json();
//         renderCart();
//     } catch (error) {
//         console.error("Error loading cart:", error);
//     }
//   }
//   document.addEventListener("DOMContentLoaded", () => {
//     fetchMenuItems();
//     fetchCartItems();
//   });
  
  
  // ✅ Fetch Cart Items from Backend
  function fetchCartItems() {
    fetch("/api/Cart")
        .then(response => response.json())
        .then(cartItems => {
            renderCart(cartItems);
        })
        .catch(error => console.error("Error fetching cart items:", error));
  }
  
  // ✅ Add Item to Cart (Backend)
  function addToCart(menuItemId) {
    fetch("http://localhost:5145/api/Cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ menuItemId: 1, quantity: 1 })
  })
  .then(response => response.json())
  .then(data => console.log("Cart Response:", data))
  .catch(error => console.error("Error adding to cart:", error));
  
  }
  
//   function fetchCartItems() {
//     fetch(http://localhost:5145/api/Cart)
//         .then(response => response.json())
//         .then(cartItems => {
//             if (!cartItems || cartItems.length === 0) {
//                 console.warn("Cart is empty.");
//                 return;
//             }
//             renderCart(cartItems);
//         })
//         .catch(error => console.error("Error fetching cart items:", error));
//   }
  
  
//   function updateCartItem(menuItemId, change) {
//     fetch(http://localhost:5145/api/Cart/${menuItemId}, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ quantityChange: change })
//     })
//     .then(response => {
//         if (!response.ok) throw new Error("Failed to update cart");
//         renderCart();
//     })
//     .catch(error => console.error("Error updating cart:", error));
//   }
  
  
  // ✅ Increase Quantity (Backend)
//   function incrementCartItem(cartItemId) {
//     fetch(http://localhost:5145/api/Cart${cartItemId}/increment, { method: "PUT" })
//         .then(() => fetchCartItems())
//         .catch(error => console.error("Error incrementing cart item:", error));
//   }
  
//   // ✅ Decrease Quantity or Remove (Backend)
//   function removeFromCart(cartItemId) {
//     fetch(http://localhost:5145/api/Cart${cartItemId}/decrement, { method: "PUT" })
//         .then(() => fetchCartItems())
//         .catch(error => console.error("Error removing item from cart:", error));
//   }
  
//   // ✅ Clear Cart (Backend)
//   function clearCart() {
//     fetch("http://localhost:5145/api/Cart", { method: "DELETE" })
//         .then(() => fetchCartItems())
//         .catch(error => console.error("Error clearing cart:", error));
//   }
  
  // ✅ Open Checkout Modal
//   function openCheckoutModal() {
//     fetch(${API_BASE_URL}/Cart)
//         .then(response => response.json())
//         .then(cartItems => {
//             if (!cartItems || cartItems.length === 0) {
//                 alert("Your cart is empty. Please add items before checking out.");
//                 return;
//             }
//             document.getElementById("checkout-modal").classList.add("show");
//         })
//         .catch(error => console.error("Error fetching cart:", error));
//   }
  
  
  // ✅ Close Checkout Modal
  function closeCheckoutModal() {
    document.getElementById("checkout-modal").classList.remove("show");
  }
  
  // ✅ Submit Order to Backend
  document.getElementById("checkout-form").addEventListener("submit", (e) => {
    e.preventDefault();
  
    fetch("http://localhost:5145/api/Cart")
        .then(response => response.json())
        .then(cartItems => {
            if (cartItems.length === 0) {
                alert("Your cart is empty. Add items to checkout.");
                return;
            }
  
            const order = {
                customerName: document.getElementById("customer-name").value.trim(),
                customerPhone: document.getElementById("phone-number").value.trim(),
                customerAddress: document.getElementById("address").value.trim(),
                totalPrice: cartItems.reduce((sum, item) => sum + (item.menuItem.price * item.quantity), 0),
                items: cartItems.map(item => ({ menuItemId: item.menuItem.id, quantity: item.quantity }))
            };
  
            fetch("http://localhost:5145/api/Orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(order)
            })
            .then(response => response.json())
            .then(() => {
                alert("Order placed successfully!");
                clearCart();
                closeCheckoutModal();
            })
            .catch(error => console.error("Error placing order:", error));
        })
        .catch(error => console.error("Error fetching cart:", error));
  });
  
//   // ✅ Render cart dynamically from backend API response
//   function renderCart() {
//     fetch("http://localhost:5145/api/Cart")
//         .then(response => response.json())
//         .then(cartItems => {
//             const cartContainer = document.getElementById("cart-items");
//             const totalPriceElement = document.getElementById("total-price");
  
//             cartContainer.innerHTML = "";
//             let total = 0;
  
//             cartItems.forEach(item => {
//                 total += item.price * item.quantity;
//                 cartContainer.innerHTML += `
//                     <li class="list-group-item d-flex justify-content-between align-items-center">
//                         <div>${item.name} x${item.quantity}</div>
//                         <div>
//                             <span class="badge bg-primary">$${(item.price * item.quantity).toFixed(2)}</span>
//                             <button class="btn btn-add" onclick="updateCartItem(${item.menuItemId}, 1)">+</button>
//                             <button class="btn btn-remove" onclick="updateCartItem(${item.menuItemId}, -1)">-</button>
//                         </div>
//                     </li>
//                 `;
//             });
  
// //             totalPriceElement.textContent = Total: $${total.toFixed(2)};
// //         })
// //         .catch(error => console.error("Error loading cart:", error));
//             }
  
  
//   // ✅ Submit order to backend
//   async function submitOrder(event) {
//     event.preventDefault();
  
//     try {
//         const response = await fetch("http://localhost:5145/api/Orders", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": Bearer ${localStorage.getItem("token")}
//             },
//             body: JSON.stringify({
//                 customerName: document.getElementById("customer-name").value,
//                 customerPhone: document.getElementById("phone-number").value,
//                 customerAddress: document.getElementById("address").value
//             })
//         });
  
//         if (response.ok) {
//             alert("Order placed successfully!");
//             clearCart();
//             closeCheckoutModal();
//         } else {
//             console.error("Failed to place order.");
//         }
//     } catch (error) {
//         console.error("Error placing order:", error);
//     }
//   }
  
  function placeOrder() {
    fetch("http://localhost:5145/api/Cart") // Fetch current cart items
        .then(response => response.json())
        .then(cart => {
            if (cart.length === 0) {
                alert("Your cart is empty. Add items before checkout.");
                return;
            }
  
            const order = {
                customerName: document.getElementById("customer-name").value,
                customerPhone: document.getElementById("phone-number").value,
                customerAddress: document.getElementById("address").value,
                items: cart.map(item => ({ menuItemId: item.menuItemId, quantity: item.quantity }))
            };
  
            fetch("http://localhost:5145/api/Orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(order)
            })
            .then(response => {
                if (!response.ok) throw new Error("Failed to place order");
                alert("Order placed successfully!");
                renderCart();
            })
            .catch(error => console.error("Error placing order:", error));
        });
  }
  
  // ✅ Increment quantity of cart item in backend
//   async function incrementCartItem(id) {
//     try {
//         const response = await fetch(http://localhost:5145/api/Cart/increment/${id}, {
//             method: "PUT",
//             headers: { "Authorization": Bearer ${localStorage.getItem("token")} }
//         });
  
//         if (response.ok) {
//             loadCart();
//         } else {
//             console.error("Failed to increment cart item.");
//         }
//     } catch (error) {
//         console.error("Error incrementing cart item:", error);
//     }
//   }
  
//   // ✅ Remove item from cart in backend
//   async function removeFromCart(id) {
//     try {
//         const response = await fetch(http://localhost:5145/api/Cart/remove/${id}, {
//             method: "DELETE",
//             headers: { "Authorization": Bearer ${localStorage.getItem("token")} }
//         });
  
//         if (response.ok) {
//             loadCart();
//         } else {
//             console.error("Failed to remove item from cart.");
//         }
//     } catch (error) {
//         console.error("Error removing from cart:", error);
//     }
//   }
  
//   // ✅ Clear entire cart in backend
//   async function clearCart() {
//     try {
//         const response = await fetch("http://localhost:5145/api/Cart/clear", {
//             method: "DELETE",
//             headers: { "Authorization": Bearer ${localStorage.getItem("token")} }
//         });
  
//         if (response.ok) {
//             renderCart();
//         } else {
//             console.error("Failed to clear cart.");
//         }
//     } catch (error) {
//         console.error("Error clearing cart:", error);
//     }
//   }
  
  // ✅ Open the checkout modal
  function openCheckoutModal() {
    fetch("http://localhost:5145/api/Cart")
        .then(response => response.json())
        .then(cart => {
            if (cart.length === 0) {
                alert("Your cart is empty. Add items before checkout.");
                return;
            }
            document.getElementById("checkout-modal").classList.add("show");
        });
  }
  
  
  // ✅ Close the checkout modal
  function closeCheckoutModal() {
    document.getElementById("checkout-modal").classList.remove("show");
  }
  
  document.getElementById("checkout-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    await placeOrder();
  });
  
  // ✅ Search menu items dynamically
//   document.getElementById('search-bar').addEventListener('input', async (e) => {
//     const query = e.target.value.toLowerCase();
  
//     try {
//         const response = await fetch(http://localhost:5145/api/MenuItems/search?query=${query});
//         const filteredItems = await response.json();
//         renderMenu(filteredItems);
//     } catch (error) {
//         console.error("Error searching menu items:", error);
//     }
//   });
  
//   // ✅ Sort menu items dynamically using backend
//   document.getElementById('sort-options').addEventListener('change', async (e) => {
//     const sortOrder = e.target.value;
  
//     try {
//         const response = await fetch(http://localhost:5145/api/MenuItems/sort?order=${sortOrder});
//         const sortedItems = await response.json();
//         renderMenu(sortedItems);
//     } catch (error) {
//         console.error("Error sorting menu items:", error);
//     }
//   });
  
  

































































  // document.addEventListener('DOMContentLoaded', () => {
  //   initializeMenu();
  //   const savedTheme = localStorage.getItem('theme');
  //   if (savedTheme === 'light') document.body.classList.add('light-theme');
  //   renderCart(); // Ensure cart is displayed upon page load
  // });
  
  // let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // // Initialize menu and render items
  // function initializeMenu() {
  //   const menuData = JSON.parse(localStorage.getItem('menuData')) || getDefaultMenuData();
  //   renderMenu(menuData);
  // }
  
  // // Render menu items dynamically
  // function renderMenu(menuData) {
  //   const menuContainer = document.getElementById('menu-container');
  //   menuContainer.innerHTML = '';
  
  //   Object.keys(menuData).forEach((category) => {
  //     const categoryDiv = document.createElement('div');
  //     categoryDiv.classList.add('menu-category');
  //     categoryDiv.id = category;
  //     categoryDiv.innerHTML = <h2>${category.toUpperCase()}</h2>;
  
  //     menuData[category].forEach((item) => {
  //       const itemDiv = document.createElement('div');
  //       itemDiv.classList.add('menu-item');
  //       itemDiv.innerHTML = `
  //         <div class="menu-item-left">
  //           <img src="${item.image}" alt="${item.name}">
  //         </div>
  //         <div class="menu-item-right">
  //           <div class="menu-item-header">
  //             <span class="menu-item-name">${item.name}</span>
  //             <span class="menu-item-price">$${item.price.toFixed(2)}</span>
  //           </div>
  //           <div class="menu-item-footer">
  //             <span class="menu-item-description">${item.description}</span>
  //             <button class="menu-item-add-to-cart" onclick="addToCart('${item.name}', ${item.price})">+</button>
  //           </div>
  //         </div>
  //       `;
  //       categoryDiv.appendChild(itemDiv);
  //     });
  
  //     menuContainer.appendChild(categoryDiv);
  //   });
  // }
  
  // Setup category buttons for smooth scrolling and active states
  function setupCategoryButtons() {
    const categoryButtons = document.querySelectorAll('.btn-category');
    categoryButtons.forEach((button) => {
      button.addEventListener('click', () => {
        // Remove active state from all buttons
        categoryButtons.forEach((btn) => btn.classList.remove('active'));
  
        // Add active state to the clicked button
        button.classList.add('active');
  
        // Get the target category ID from the button
        const targetCategory = button.getAttribute('data-target');
        scrollToCategory(targetCategory);
      });
    });
  }
//   function scrollToCategory(id) {
//     console.log(Scrolling to category: ${id});
  
//     // Convert special-rolls to special rolls (matching existing category IDs)
//     const correctedId = id.replace("-", " "); 
  
//     const categoryElement = document.getElementById(correctedId);
    
//     if (categoryElement) {
//         categoryElement.scrollIntoView({ behavior: "smooth", block: "start" });
  
//         // Highlight the active button
//         document.querySelectorAll(".btn-category").forEach(btn => btn.classList.remove("active"));
//         document.querySelector([onclick="scrollToCategory('${id}')"]).classList.add("active");
//     } else {
//         console.error(❌ Category "${id}" not found!);
//         console.log("Available Categories:", [...document.querySelectorAll('.menu-category')].map(el => el.id));
//     }
//   }
  
  // Ensure category buttons update when scrolling manually
  window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll(".menu-category");
    let currentSection = "";
  
    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
            currentSection = section.id;
        }
    });
  
    // Update active button
    document.querySelectorAll(".btn-category").forEach((btn) => {
        btn.classList.remove("active");
    });
  
    if (currentSection) {
        document.querySelector([onclick="scrollToCategory('${currentSection}')"])?.classList.add("active");
    }
  });
  
  // // Add to cart functionality
  // function addToCart(name, price) {
  //   cart = JSON.parse(localStorage.getItem("cart")) || []; // Get cart data or start fresh
  
  //   const existingItem = cart.find(item => item.name === name);
  
  //   if (existingItem) {
  //       existingItem.quantity++; // Increment existing item
  //   } else {
  //       cart.push({ name, price, quantity: 1 }); // Add new item
  //   }
  
  //   localStorage.setItem("cart", JSON.stringify(cart)); // Save updated cart
  //   renderCart();
  // }
  
  
  // // Update renderCart to include Add and Remove buttons
  // function renderCart() {
  //   const cartItemsContainer = document.getElementById("cart-items");
  //   const cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  //   cartItemsContainer.innerHTML = cart.map(
  //       (item) => `
  //       <li class="list-group-item d-flex justify-content-between align-items-center">
  //           <div>
  //               ${item.name} x${item.quantity}
  //           </div>
  //           <div>
  //               <span class="badge bg-primary">$${(item.price * item.quantity).toFixed(2)}</span>
  //               <button class="btn btn-add" onclick="incrementCartItem('${item.name}')">Add</button>
  //               <button class="btn btn-remove" onclick="removeFromCart('${item.name}')">Remove</button>
  //           </div>
  //       </li>
  //   `
  //   ).join("");
  
  //   const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  //   document.getElementById("total-price").textContent = Total: $${totalPrice.toFixed(2)};
  // }
  
  // ✅ Place order and send to backend
  
  
  
  
  // function saveOrder(order) {
  //   let orders = JSON.parse(localStorage.getItem("orders")) || [];
  //   orders.push(order);  // Append new order
  //   localStorage.setItem("orders", JSON.stringify(orders)); // Save back to localStorage
  // }
  // function placeOrder() {
  //   const cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  //   if (cart.length === 0) {
  //       alert("Your cart is empty. Add items to checkout.");
  //       return;
  //   }
  
  //   const name = document.getElementById("customer-name").value.trim();
  //   const phone = document.getElementById("phone-number").value.trim();
  //   const address = document.getElementById("address").value.trim();
  
  //   if (!name || !phone || !address) {
  //       alert("Please fill in all the fields.");
  //       return;
  //   }
  
  //   const orders = JSON.parse(localStorage.getItem("orders")) || [];
  //   const newOrder = {
  //       id: Date.now(),
  //       name,
  //       phone,
  //       address,
  //       items: cart,
  //       total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
  //       date: new Date().toLocaleString(),
  //       status: "Pending"
  //   };
  
  //   orders.push(newOrder);
  //   localStorage.setItem("orders", JSON.stringify(orders)); // ✅ Save order correctly
  //   localStorage.removeItem("cart"); // ✅ Clear cart after order
  
  //   alert("Order placed successfully!");
  //   window.location.href = "menu.html"; // ✅ Redirect back to menu
  // }
  
  // // Increment the quantity of a specific cart item
  // function incrementCartItem(name) {
  //   const cart = JSON.parse(localStorage.getItem("cart")) || [];
  //   const item = cart.find((cartItem) => cartItem.name === name);
  
  //   if (item) {
  //       item.quantity++;
  //       localStorage.setItem("cart", JSON.stringify(cart));
  //       renderCart();
  //   }
  // }
  
  // // Remove an item from the cart or decrement its quantity
  // function removeFromCart(name) {
  //   let cart = JSON.parse(localStorage.getItem("cart")) || [];
  //   const itemIndex = cart.findIndex((cartItem) => cartItem.name === name);
  
  //   if (itemIndex !== -1) {
  //       if (cart[itemIndex].quantity > 1) {
  //           cart[itemIndex].quantity--;
  //       } else {
  //           cart.splice(itemIndex, 1);
  //       }
  //       localStorage.setItem("cart", JSON.stringify(cart));
  //       renderCart();
  //   }
  // }
  
  // // Clear the entire cart
  // function clearCart() {
  //   cart = []; // Reset cart array
  //   localStorage.removeItem("cart"); // Remove cart data from localStorage
  //   renderCart(); // Re-render the cart to show it's empty
  // }
  
  
  // // Open the checkout modal
  // function openCheckoutModal() {
  //   const cart = JSON.parse(localStorage.getItem("cart")) || [];
  //   if (cart.length === 0) {
  //       alert("Your cart is empty. Add items to checkout.");
  //       return;
  //   }
  //   document.getElementById("checkout-modal").classList.add("show");
  // }
  
  // // Close the checkout modal
  // function closeCheckoutModal() {
  //   document.getElementById("checkout-modal").classList.remove("show");
  // }
  
  // document.getElementById("checkout-form").addEventListener("submit", (e) => {
  //   e.preventDefault();
  
  //   const name = document.getElementById("customer-name").value.trim();
  //   const phone = document.getElementById("phone-number").value.trim();
  //   const address = document.getElementById("address").value.trim();
  //   const cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  //   if (!name || !phone || !address || cart.length === 0) {
  //       alert("Please fill in all fields and add items to your cart.");
  //       return;
  //   }
  
  //   const order = {
  //       id: Date.now(), // Unique ID based on timestamp
  //       name,
  //       phone,
  //       address,
  //       items: cart,
  //       total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
  //       status: "Pending",
  //       timestamp: new Date().toLocaleString() // Stores date & time
  //   };
  
  //   const orders = JSON.parse(localStorage.getItem("orders")) || [];
  //   orders.push(order);
  //   localStorage.setItem("orders", JSON.stringify(orders));
  
  //   alert(Order placed successfully!);
  //   localStorage.removeItem("cart"); // Clear cart after order
  //   renderCart(); // Update UI
  //   closeCheckoutModal(); // Close modal
  // });
  
  
  // // Ensure all buttons are rendered properly
  // document.querySelectorAll('.btn-category').forEach((btn) => {
  //   btn.addEventListener('click', (e) => {
  //     const targetId = btn.getAttribute('onclick').match(/'(.*?)'/)[1];
  //     scrollToCategory(targetId);
  //   });
  // });
  
  
  // // Search functionality
  // document.getElementById('search-bar').addEventListener('input', (e) => {
  //   const query = e.target.value.toLowerCase();
  //   const menuData = JSON.parse(localStorage.getItem('menuData')) || getDefaultMenuData();
  //   const filteredData = {};
  
  //   for (const category in menuData) {
  //     filteredData[category] = menuData[category].filter(
  //       (item) =>
  //         item.name.toLowerCase().includes(query) ||
  //         item.description.toLowerCase().includes(query)
  //     );
  //   }
  
  //   renderMenu(filteredData);
  // });
  
  // // Sort functionality
  // document.getElementById('sort-options').addEventListener('change', (e) => {
  //   const sortOrder = e.target.value;
  //   const menuData = JSON.parse(localStorage.getItem('menuData')) || getDefaultMenuData();
  
  //   if (sortOrder === 'low-to-high' || sortOrder === 'high-to-low') {
  //     for (const category in menuData) {
  //       menuData[category].sort((a, b) =>
  //         sortOrder === 'low-to-high' ? a.price - b.price : b.price - a.price
  //       );
  //     }
  //   }
  
  //   renderMenu(menuData);
  // });
//   // Ensure category buttons update when scrolling manually
  window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll(".menu-category");
    let currentSection = "";
  
    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
            currentSection = section.id;
        }
    });
  
    // Update active button
    document.querySelectorAll(".btn-category").forEach((btn) => {
        btn.classList.remove("active");
    });
  
    if (currentSection) {
        document.querySelector([onclick="scrollToCategory('${currentSection}')"])?.classList.add("active");
    }
  });