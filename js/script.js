// Function to render table rows from stored items
function renderTable() {
    const total_amount = document.getElementById("total_amount");
    const tbody = document.querySelector('table tbody');
    tbody.innerHTML = ''; // Clear existing rows

    // Retrieve stored items from local storage
    const items = JSON.parse(localStorage.getItem('items')) || [];

    // Loop through each item and create table rows
    items.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td><button class="btn btn-danger btn-sm delete-btn">Delete</button></td>
        `;
        tbody.appendChild(row);

        // Add event listener to delete button
        row.querySelector('.delete-btn').addEventListener('click', () => {
            // Remove the corresponding item from the array
            const index = items.findIndex(i => i.name === item.name && i.price === item.price);
            if (index !== -1) {
                items.splice(index, 1);
                // Update local storage
                localStorage.setItem('items', JSON.stringify(items));
                // Re-render table
                renderTable();
            }
        });
    });

    // Calculate total amount
    let total = 0;
    items.forEach(item => {
        total += parseInt(item.price);
    });

    // Update total amount in the table footer
    total_amount.textContent = "Amount : " + total + " ₹ ";
}

// Call renderTable function when the page loads
window.addEventListener('load', renderTable);

// Adding to Local storage
const add = document.getElementById("add");

add.addEventListener("click", () => {
    const name = document.getElementById("item_name").value.trim();
    const price = document.getElementById("item_price").value.trim();

    if (name !== "" && price !== "") {


        // Retrieve existing items from local storage if any
        let items = JSON.parse(localStorage.getItem('items')) || [];

        // Add new item to the array
        items.push({ name, price });

        // Store the updated array back in local storage
        localStorage.setItem('items', JSON.stringify(items));
        location.reload();
    } else {
        alert("Please enter both item name and price.");
    }
});