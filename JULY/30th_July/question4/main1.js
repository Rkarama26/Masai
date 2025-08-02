let allFilteredMembers = [];
let currentMemberPage = 1;
const memberItemsPerPage = 4;

async function fetchMembers() {
    let res = await fetch(`${fetchURL}members.json`);
    let data = await res.json();

    if (!data) return [];

    return Object.entries(data).map(([id, member]) => ({
        id,
        ...member
    }));
}
function displayMembers(members, page = 1) {
    let tbody = document.getElementById("memberTable").querySelector("tbody");
    tbody.innerHTML = "";

    const startIndex = (page - 1) * memberItemsPerPage;
    const endIndex = startIndex + memberItemsPerPage;
    const paginatedMembers = members.slice(startIndex, endIndex);

    if (paginatedMembers.length === 0) {
        tbody.innerHTML = "<tr><td colspan='3'>No members found</td></tr>";
        return;
    }

    paginatedMembers.forEach(member => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${member.name}</td>
            <td>${member.membershipDate}</td>
            <td>${member.active ? "Active" : "Inactive"}</td>
        `;
        tbody.appendChild(tr);
    });

    displayMemberPaginationControls(members, page);
}

function displayMembers(members, page = 1) {
    let tbody = document.getElementById("memberTable").querySelector("tbody");
    tbody.innerHTML = "";

    const startIndex = (page - 1) * memberItemsPerPage;
    const endIndex = startIndex + memberItemsPerPage;
    const paginatedMembers = members.slice(startIndex, endIndex);

    if (paginatedMembers.length === 0) {
        tbody.innerHTML = "<tr><td colspan='3'>No members found</td></tr>";
        return;
    }

    paginatedMembers.forEach(member => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${member.name}</td>
            <td>${member.membershipDate}</td>
            <td>${member.active ? "Active" : "Inactive"}</td>
        `;
        tbody.appendChild(tr);
    });

    displayMemberPaginationControls(members, page);
}
function displayMemberPaginationControls(members, page) {
    const totalPages = Math.ceil(members.length / memberItemsPerPage);
    const paginationDiv = document.getElementById("memberPagination");
    paginationDiv.innerHTML = "";

    if (totalPages <= 1) return;

    if (page > 1) {
        let prevBtn = document.createElement("button");
        prevBtn.innerText = "Previous";
        prevBtn.onclick = () => {
            currentMemberPage--;
            displayMembers(members, currentMemberPage);
        };
        paginationDiv.appendChild(prevBtn);
    }

    for (let i = 1; i <= totalPages; i++) {
        let btn = document.createElement("button");
        btn.innerText = i;
        btn.disabled = i === page;
        btn.onclick = () => {
            currentMemberPage = i;
            displayMembers(members, currentMemberPage);
        };
        paginationDiv.appendChild(btn);
    }

    if (page < totalPages) {
        let nextBtn = document.createElement("button");
        nextBtn.innerText = "Next";
        nextBtn.onclick = () => {
            currentMemberPage++;
            displayMembers(members, currentMemberPage);
        };
        paginationDiv.appendChild(nextBtn);
    }
}
async function applyFilterAndSort() {
    let members = await fetchMembers();

    let status = document.getElementById("filterByStatus").value;
    let membershipDateOrder = document.getElementById("sortByMembershipDate").value;
    let nameSort = document.getElementById("sortByName").value;

    // Filtering
    let filteredMembers = members.filter(member => {
        return (
            status === "active" ? member.active === true :
            status === "inactive" ? member.active === false : true
        );
    });

    // Sorting
    filteredMembers.sort((a, b) => {
        // Sort by Membership Date
        if (membershipDateOrder === "membershipDate-asc") {
            return new Date(a.membershipDate) - new Date(b.membershipDate);
        }
        if (membershipDateOrder === "membershipDate-desc") {
            return new Date(b.membershipDate) - new Date(a.membershipDate);
        }

        // Sort by Name
        if (nameSort === "name-asc") {
            return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
        }
        if (nameSort === "name-desc") {
            return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
        }

        return 0;
    });

    allFilteredMembers = filteredMembers;
    currentMemberPage = 1;
    displayMembers(filteredMembers, currentMemberPage);
}
async function addMembers(event) {
    event.preventDefault();

    let inputs = document.querySelectorAll("#memberForm input");
    let name = inputs[0].value;
    let membershipDate = inputs[1].value;
    let active = inputs[2].value.toLowerCase() === "true";

    if (!name || !membershipDate || inputs[2].value === "") {
        alert("Please fill all fields");
        return;
    }

    let newMember = {
        name,
        membershipDate,
        active
    };

    try {
        await fetch(`${fetchURL}members.json`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newMember)
        });

        document.getElementById("memberForm").reset();
        applyFilterAndSort(); // Refresh
    } catch (error) {
        console.error("Error adding member:", error);
    }
}
window.addEventListener("DOMContentLoaded", () => {
    // Load books
    const savedSettings = JSON.parse(localStorage.getItem("bookFilters"));
    if (savedSettings) {
        document.getElementById('filterGenre').value = savedSettings.selectedGenre || "";
        document.getElementById('filterAuthor').value = savedSettings.selectedAuthor || "";
        document.getElementById('availableFilter').value = savedSettings.availability || "all";
        document.getElementById('sortBy').value = savedSettings.sortBy || "";
        displayFilteredAndSortedBooks();
    } else {
        displayFilteredAndSortedBooks();
    }

    // Load members
    applyFilterAndSort();
});
