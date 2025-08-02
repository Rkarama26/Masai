


let fetchURL = "https://library-ba950-default-rtdb.asia-southeast1.firebasedatabase.app/";
let allfilteredBooks = [];
let currentPage = 1;
let itemsPerPage = 4
// fetch book 
async function fetchBooks() {

    let res = await fetch(`${fetchURL}books.json`)
    let data = await res.json();
    console.log(data)
    if (!data) return [];

    return Object.entries(data).map(([id, book]) => {
        return {
            id,
            ...book
        };
    });


}
// display book 
async function displayBooks(books, page = 1) {
    //let books = await fetchBooks();
    let tbody = document.getElementById("bookTable").querySelector('tbody');
    tbody.innerHTML = "";


    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedBooks = books.slice(startIndex, endIndex);


    if (paginatedBooks.length === 0) {
        tbody.innerHTML = "<p>No books found</p>";
        return;
    }

    paginatedBooks.forEach(book => {
        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td style="font-weight: bold;">${book.title}</td>
            <td>${book.author}</td>
            <td>${book.genre}</td>
            <td>${book.publishedYear}</td>
            <td>${book.available}</td>
           <td><button onclick="deleteBook('${book.id}')">Delete</button>/
            <button onclick="editBook('${book.id}', '${book.title}', '${book.author}', '${book.genre}', '${book.publishedYear}', '${book.available}')">Edit</button>
            </td>            
    `
        tbody.appendChild(tr);
    })
    console.log("display: ", books)

    displayPaginationControls(books, page);
}
//pagination 
function displayPaginationControls(books, page) {
    const totalPages = Math.ceil(books.length / itemsPerPage);
    const paginationDiv = document.getElementById("pagination");
    paginationDiv.innerHTML = "";

    if (totalPages <= 1) return; // No need to paginate

    if (page > 1) {
        let prevBtn = document.createElement('button');
        prevBtn.innerText = "Previous";
        prevBtn.onclick = () => {
            currentPage--;
            displayBooks(books, currentPage);
        };
        paginationDiv.appendChild(prevBtn);
    }

    for (let i = 1; i <= totalPages; i++) {
        let btn = document.createElement('button');
        btn.innerText = i;
        btn.disabled = i === page;
        btn.onclick = () => {
            currentPage = i;
            displayBooks(books, currentPage);
        };
        paginationDiv.appendChild(btn);
    }

    if (page < totalPages) {
        let nextBtn = document.createElement('button');
        nextBtn.innerText = "Next";
        nextBtn.onclick = () => {
            currentPage++;
            displayBooks(books, currentPage);
        };
        paginationDiv.appendChild(nextBtn);
    }
}


// display filtered data
async function displayFilteredAndSortedBooks() {

    let books = await fetchBooks()

    let selectedGenre = document.getElementById('filterGenre').value;
    let selectedAuthor = document.getElementById('filterAuthor').value;
    let availabilityValue = document.getElementById('availableFilter').value
    let sortBy = document.getElementById('sortBy').value;

    let availability = availabilityValue === "true" ? true :
        availabilityValue === "false" ? false :
            "all"; // fallback for "all"


    // filter by 
    let filteredBooks = books.filter(book => {
        return ((selectedGenre === "" || selectedGenre === "all-genre" || book.genre == selectedGenre) &&
            (selectedAuthor === "" || selectedAuthor === "all-author" || book.author == selectedAuthor) &&
            (book.available === availability || availability == "all")
        )
    });


    filteredBooks.sort((a, b) => {
        // Sort by year
        if (sortBy === "year-asc" && a.publishedYear !== b.publishedYear) {
            return a.publishedYear - b.publishedYear;
        }
        if (sortBy === "year-desc" && a.publishedYear !== b.publishedYear) {
            return b.publishedYear - a.publishedYear;
        }

        // Sort by title
        if (sortBy === "title-asc") {
            const titleComp = a.title.toLowerCase().localeCompare(b.title.toLowerCase());
            if (titleComp !== 0) return titleComp;
        }
        if (sortBy === "title-desc") {
            const titleComp = b.title.toLowerCase().localeCompare(a.title.toLowerCase());
            if (titleComp !== 0) return titleComp;
        }

        // Sort by author
        if (sortBy === "author-asc") {
            return a.author.toLowerCase().localeCompare(b.author.toLowerCase());
        }
        if (sortBy === "author-desc") {
            return b.author.toLowerCase().localeCompare(a.author.toLowerCase());
        }

        return 0; // fallback
    });
    console.log("filtered Books: ", filteredBooks);


    // saving to localstorage
    localStorage.setItem("bookFilters", JSON.stringify({
        selectedGenre,
        selectedAuthor,
        availability: availabilityValue,
        sortBy
    }));

    allfilteredBooks = filteredBooks;
    currentPage = 1;
    displayBooks(filteredBooks)

}
// add book
async function addOrEditBooks(event) {

    event.preventDefault();

    try {
        let id = document.getElementById('id').value;
        let title = document.getElementById("title").value;
        let author = document.getElementById("author").value;
        let genre = document.getElementById("genre").value;
        let publishedYear = document.getElementById("publishedYear").value;
        let available = document.getElementById("available").value.toLowerCase() === "true";

        let bookData = {
            title,
            author,
            genre,
            publishedYear,
            available
        }

        if (!title || !author || !genre || !publishedYear || !document.getElementById("available").value === "") {
            alert("Please fill all the fields");
            return;
        }

        let url = `${fetchURL}books.json`
        let method = "POST"

        if (id) {
            url = `${fetchURL}books/${id}.json`;
            method = "PATCH";
        }
        console.log("id:", id, "method:", method)

        await fetch(url, {
            method: method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bookData)
        });


        document.getElementById("bookForm").reset();

        displayFilteredAndSortedBooks();
    } catch (error) {
        console.error("Error adding book:", error);

    }
}
//  Edit pre-fills the form with selected book data, when edit button clicked
function editBook(id, title, author, genre, publishedYear, available) {
    document.getElementById("id").value = id;
    document.getElementById("title").value = title;
    document.getElementById("author").value = author;
    document.getElementById("genre").value = genre;
    document.getElementById("publishedYear").value = publishedYear;
    document.getElementById("available").value = available ? "true" : "false";
}
// delete book function 
async function deleteBook(id) {
    try {
        await fetch(`${fetchURL}books/${id}.json`, {
            method: "DELETE"
        });
        displayFilteredAndSortedBooks(); // Refresh book list after deletion
    } catch (error) {
        console.error("Error deleting book:", error);
    }
}

// getting filter an sorting data saved in localStorage
window.addEventListener("DOMContentLoaded", () => {
    const savedSettings = JSON.parse(localStorage.getItem("bookFilters"));

    if (savedSettings) {
        // Apply to DOM elements
        document.getElementById('filterGenre').value = savedSettings.selectedGenre || "";
        document.getElementById('filterAuthor').value = savedSettings.selectedAuthor || "";
        document.getElementById('availableFilter').value = savedSettings.availability || "all";
        document.getElementById('sortBy').value = savedSettings.sortByYear || "";


        displayFilteredAndSortedBooks();
    }
});
