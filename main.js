const books = [];
const RENDER_EVENT = 'render-book';
const STORAGE_KEY = 'BOOK_APPS';
const SAVED_EVENT = 'saved-book';


function addBook() {
    const titleBook = document.getElementById('inputBookTitle').value;
    const authorBook = document.getElementById('inputBookAuthor').value;
    const timeStamp = document.getElementById('inputBookYear').value;
    const isCompleted = document.getElementById('inputBookIsComplete').checked;

    const generatedID = generateId();
    const bookObject = generateBookObject(
        generatedID,
        titleBook,
        authorBook,
        timeStamp,
        isCompleted
    );
    books.push(bookObject);

    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}


function generateId() {
    return +new Date();
}


function generateBookObject(id, title, author, year, isCompleted) {
    return {
        id,
        title,
        author,
        year,
        isCompleted,
    };
}


document.addEventListener('DOMContentLoaded', function () {
    const submitForm = document.getElementById('inputBook');
    submitForm.addEventListener('submit', function (event) {
        event.preventDefault();
        addBook();
    });
        if (isStorageExist()) {
            loadDataFromStorage();
        }
});


document.addEventListener(RENDER_EVENT, function () {
    const incompleteReadBOOKList = document.getElementById('incompleteBookshelfList');
    incompleteReadBOOKList.innerHTML = '';

    const completedReadBOOKList = document.getElementById('completeBookshelfList');
    completedReadBOOKList.innerHTML = '';

    for (const bookItem of books) {
        const bookElement = makeBook(bookItem);

        if (!bookItem.isCompleted) {
            incompleteReadBOOKList.append(bookElement);                   // UNTUK COMPLETE   (BUKU YANG SUDAH DIBACA)
        } else {
            completedReadBOOKList.append(bookElement);                    // UNTUK INCOMPLETE (BUKU YANG BELUM DIBACA)
        }
    }
});


function makeBook(bookObject) {
    const titleBook = document.createElement('h3');
    titleBook.innerText = bookObject.title;

    const authorBook = document.createElement('p');
    authorBook.innerText = bookObject.author;

    const timeStamp = document.createElement('p');
    timeStamp.innerText = bookObject.year;

    const bookContain = document.createElement('article');
    bookContain.append(titleBook, authorBook, timeStamp);

    const bookShelfPlace = document.createElement('article');
    bookShelfPlace.append(bookContain);
    bookShelfPlace.setAttribute('id', `book-${bookObject.id}`);

    if (bookObject.isCompleted) {                                         // UNTUK COMPLETE (YANG SUDAH DIBACA)
        const incompleteButton = document.createElement('button');
        incompleteButton.setAttribute('class', 'green');                  // BUAT NAMBAH CLASS ATAU ID UNTUK DI TAMBAHIN STYLE DI CSS
        incompleteButton.append('Belum selesai dibaca');

        incompleteButton.addEventListener('click', function () {
            addBookToIncomplete(bookObject.id);
        });

        const deleteButton = document.createElement('button');
        deleteButton.setAttribute('class', 'red');                        // BUAT NAMBAH CLASS ATAU ID UNTUK DI TAMBAHIN STYLE DI CSS
        deleteButton.append ('Hapus');

        deleteButton.addEventListener('click', function () {
            removeBook(bookObject.id);
        });

        bookContain.append(incompleteButton, deleteButton);
        } else {                                                           // UNTUK INCOMPLETE (YANG BELUM DIBACA)
            const completeButton = document.createElement('button');
            completeButton.setAttribute('class', 'green');                 // BUAT NAMBAH CLASS ATAU ID UNTUK DI TAMBAHIN STYLE DI CSS
            completeButton.append('Selesai dibaca');

            completeButton.addEventListener("click", function () {
                addBookToComplete(bookObject.id);
            });

            const deleteButton = document.createElement('button');
            deleteButton.setAttribute('class', 'red');                      // BUAT NAMBAH CLASS ATAU ID UNTUK DI TAMBAHIN STYLE DI CSS
            deleteButton.append('Hapus');

            deleteButton.addEventListener('click', function () {
                removeBook(bookObject.id);
            });

            bookContain.append(completeButton, deleteButton);
    }
    return bookContain;
};


function addBookToComplete(bookId) {
    const bookTarget = findBook(bookId);

    if (bookTarget == null) return;

    bookTarget.isCompleted = true;                                        // MINDAHIN DARI RAK "Belum selesai dibaca" KE RAK "Sudah selesai dibaca"
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
};


function findBook(bookId) {
    for (const bookItem of books) {
        if (bookItem.id === bookId) {
        return bookItem;
        }
    }
    return null;
};

function addBookToIncomplete(bookId) {
    const bookTarget = findBook(bookId);

    if (bookTarget == null) return;

    bookTarget.isCompleted = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
};

function removeBook(bookId) {
    const bookTarget = findBookIndex(bookId);

    if (bookTarget === -1) return;

    books.splice(bookTarget, 1);
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
};

function findBookIndex(bookId) {
    for (const index in books) {
        if (books[index].id === bookId) {
        return index;
        }
    }
};


function saveData() {
    if (isStorageExist()) {
        const parsed = JSON.stringify(books);
        localStorage.setItem(STORAGE_KEY, parsed);
        document.dispatchEvent(new Event(SAVED_EVENT));
    }
};


function isStorageExist() {
    if (typeof(Storage) === undefined) {
        alert('Browser kamu tidak mendukung local storage, nice try!');
        return false;
    } else {
        return true;
    }
};


document.addEventListener(SAVED_EVENT, function () {
    console.log(localStorage.getItem(STORAGE_KEY));
});


function loadDataFromStorage() {
    const dataFromLocalStorage= localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(dataFromLocalStorage);

    if (data !== null) {
        for (const book of data) {
        books.push(book);
        }
    }
    document.dispatchEvent(new Event(RENDER_EVENT));
};


/* NOTES /*
/* bookContain      : isi rak buku
   bookShelfPlace   : rak buku nya
*/


/* KETERANGAN */
/* SEBELUMNYA SALAH DI CHECKED BOX, TRUS DIBENERIN BIAR CHECKED BOX NYA GAK ERROR
   (DI KOLOM 11, 19, 39)
*/ 

/* UNTUK BIKIN LOCAL STORAGE */


/* BUAT UPDATE GIT
git status
git add . (titik itu folder ini)
git status (lagi setelah hijau)
git commit -m "" (-m itu message,	di dalam string tulis messagenya)
	(kalo cuma git commit aja, trus ketik pesannya
	 trus, Press Esc and then type :wq to save and exit)
git push
git fetch
git pull
*/