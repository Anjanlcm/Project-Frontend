const loginButton = document.querySelector('#btnLogIn');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const container = document.querySelector('#venue-info');
// constant for sign up user 

// const UserSignUpButton = document.querySelector('#btnUserSignUp');
// const FirstName = document.querySelector('#fname');
// const MiddleName = document.querySelector('#mname');
// const LastName = document.querySelector('#lname');
// const Email = document.querySelector('#SignUpEmail');
// const Password = document.querySelector('#SignUpPassword');
// const Gender = document.querySelector('#UserGender');
// const PhoneNumber = document.querySelector('#UserPhoneNumber');
// const Province = document.querySelector('#UserProvince');
// const District = document.querySelector('#UserDistrict');
// const City = document.querySelector('#UserCity');

//================ code for cookies =======================================

function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    const cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/`;
    document.cookie = cookie;
}
//================ login data fetch ========================================

function login(UserEmail, UserPassword) {
    const body = {
        UserEmail: UserEmail,
        UserPassword: UserPassword
    };

    // console.log('Sending request with body:', body);

    fetch('https://localhost:7147/api/Account/Login_User', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        console.log('Response status:', response.status);
        if (!response.ok) {
            return response.text().then(text => { throw new Error(text || 'Network response was not ok') });
        }
        return response.json();
        
    })

    .then(data => {
        console.log('Response data:', data);
        // Assuming data contains a property 'success' or similar
        if (data.success) {
            // Redirect to dashboard
            window.location.href = 'index.html';
        } else {
            // Show error message from API
            document.getElementById('error-message').textContent = data.message || 'Invalid username or password';
        }
    })

    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred: ' + error.message);
    });
    

}

if(loginButton){
    loginButton.addEventListener('click', () => {
        login(emailInput.value, passwordInput.value);
    });
}
//===================== function for display notes ============================

// function displayNotes(notes) {
//     const venueList = document.getElementById('venue-list');
//     venueList.innerHTML = ''; // Clear previous content

//     notes.forEach(note => {
//         const venueBox = document.createElement('div');
//         venueBox.className = 'venue-box';

//         const img = document.createElement('img');
//         img.src = note.imageUrl || 'images/venue-3.jpg'; // Use dynamic image source if available
//         img.alt = 'Venue Image';

//         const venueInfo = document.createElement('div');
//         venueInfo.className = 'venue-info';

//         venueInfo.innerHTML = `
//             <h2>${note.venueName}</h2>
//             <p>${note.address_City}, ${note.address_District}, ${note.address_Province}</p>
//             <p>Capacity: ${note.capacity}</p>
//             <p>Phone: ${note.phoneNumber}</p>
//             <button class="btn">More Info</button>
//         `;

//         venueBox.appendChild(img);
//         venueBox.appendChild(venueInfo);
//         venueList.appendChild(venueBox);
//     });
// }

//========================= function for User SignUp ============================




//============================= Function to fetch data from the backend  get all venues data

// async function fetchData() {
//     try {
//         const response = await fetch('https://localhost:7147/api/Venue/Get_Venue?province=string&district=string&city=anjan&filterValues=false&capacity=50'); // Replace with your backend endpoint
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         // Call both functions with the fetched data
//         displayNotes(data);
//         displayVendors(data);
//     } catch (error) {
//         console.error('Error fetching data:', error);
//     }
// }


// Call fetchData function to get data and display it
// document.addEventListener('DOMContentLoaded', fetchData);


//==============================================signup user =====================




//=============================get venues =====================================


// function displayVendors(vendors) {
//     const vendorList = document.getElementById('vendor-list');
//     vendorList.innerHTML = ''; // Clear any existing content

//     vendors.forEach(vendor => {
//         const vendorRow = document.createElement('div');
//         vendorRow.classList.add('vendor-row');

//         const rating = document.createElement('div');
//         rating.classList.add('rate');
//         rating.innerHTML = `${vendor.rating}&nbsp;<i class="fa fa-star" aria-hidden="true"></i>`;
//         vendorRow.appendChild(rating);

//         const img = document.createElement('img');
//         img.src = vendor.imageUrl || 'images/venue-2.jpg'; // Use dynamic image source if available
//         img.alt = 'img';
//         vendorRow.appendChild(img);

//         const name = document.createElement('h2');
//         name.textContent = vendor.venueName; // Assuming vendor.name is the same as note.venueName
//         vendorRow.appendChild(name);

//         const location = document.createElement('p');
//         location.innerHTML = `<i>@${vendor.address_City}</i>`; // Assuming vendor.city is the same as note.address_City
//         vendorRow.appendChild(location);

//         const price = document.createElement('h3');
//         price.textContent = vendor.price; // Adjust this to the correct field from the backend data
//         vendorRow.appendChild(price);

//         vendorList.appendChild(vendorRow);
//     });
// }

// Fetch and display vendors and venues when the page loads

// document.addEventListener('DOMContentLoaded', fetchData);


document.addEventListener('DOMContentLoaded', fetchData);

async function fetchData() {
    try {
        const response = await fetch('https://localhost:7147/api/Venue/Get_Venue?province=string&district=string&city=anjan&filterValues=false&capacity=50');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        displayNotes(data);
        displayVendors(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayNotes(notes) {
    const venueList = document.getElementById('venue-list');
    venueList.innerHTML = '';

    notes.forEach(note => {
        const venueBox = document.createElement('div');
        venueBox.className = 'venue-box';

        const img = document.createElement('img');
        img.src = note.imageUrl || 'images/venue-3.jpg';
        img.alt = 'Venue Image';

        const venueInfo = document.createElement('div');
        venueInfo.className = 'venue-info';
        venueInfo.innerHTML = `
            <h2>${note.venueName}</h2>
            <p>${note.address_City}, ${note.address_District}, ${note.address_Province}</p>
            <p>Capacity: ${note.capacity}</p>
            <p>Phone: ${note.phoneNumber}</p>
            <button class="btn">More Info</button>
        `;

        venueBox.appendChild(img);
        venueBox.appendChild(venueInfo);
        venueList.appendChild(venueBox);
    });
}

function displayVendors(vendors) {
    const vendorList = document.getElementById('vendor-list');
    vendorList.innerHTML = '';

    vendors.forEach(vendor => {
        const vendorRow = document.createElement('div');
        vendorRow.classList.add('vendor-row');

        const rating = document.createElement('div');
        rating.classList.add('rate');
        rating.innerHTML = `${vendor.rating}&nbsp;<i class="fa fa-star" aria-hidden="true"></i>`;
        vendorRow.appendChild(rating);

        const img = document.createElement('img');
        img.src = vendor.imageUrl || 'images/venue-2.jpg';
        img.alt = 'Vendor Image';
        vendorRow.appendChild(img);

        const name = document.createElement('h2');
        name.textContent = vendor.venueName;
        vendorRow.appendChild(name);

        const location = document.createElement('p');
        location.innerHTML = `<i>@${vendor.address_City}</i>`;
        vendorRow.appendChild(location);

        const price = document.createElement('h3');
        price.textContent = vendor.price;
        vendorRow.appendChild(price);

        vendorList.appendChild(vendorRow);
    });
}
