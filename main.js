const books = [];
const RENDER_EVENT = 'render-book';


function addBook () {
    const titleBook = document.getElementById('inputBookTitle').value;
    const authorBook = document.getElementById('inputBookAuthor').value;
    const timeStamp = document.getElementById('inputBookYear').value;

    const generatedID = generateId();
    const bookObject = generateBookObject(generatedID, titleBook, authorBook, timeStamp, false);
    books.push(bookObject);

    document.dispatchEvent(new Event (RENDER_EVENT));
};


function generateId() {
    return +new Date();
}  


function generateBookObject(id, title, author, year, isCompleted) {
    return {
        id, 
        title,
        author,
        year,
        isCompleted
   }
};


document.addEventListener('DOMContentLoaded', function() {
    const submitForm = document.getElementById('inputBook');
    submitForm.addEventListener('submit', function(event) {
        event.preventDefault();
        addBook();
    });
});


document.addEventListener(RENDER_EVENT, function () {
    // console.log(books);
    const incompleteReadBOOKList = document.getElementById('incompleteBookshelfList');
    incompleteReadBOOKList.innerHTML = '';
                                                                                            
    const completedReadBOOKList = document.getElementById('completeBookshelfList');               
    completedReadBOOKList.innerHTML = '';                                            

    for (const bookItem of books) {
        const bookElement = makeBook(bookItem);
        
        if (!bookItem.isCompleted) {
            incompleteReadBOOKList.append(bookElement);          // UNTUK COMPLETE (BUKU YANG SUDAH DIBACA)
        } else {
            completedReadBOOKList.append(bookElement);           // UNTUK INCOMPLETE (BUKU YANG BELUM DIBACA)
        }
    }
});


function makeBook(bookObject) {
    const titleBook = document.createElement('h3');
    titleBook.innerText = bookObject.title;

    const authorBook = document.createElement('p');
    authorBook.innerText = bookObject.author

    const timeStamp = document.createElement('p');
    timeStamp.innerText = bookObject.year;

    const bookContain = document.createElement('article');
    // bookShelfPlace.classList.add('inner');
    bookContain.append(titleBook, authorBook, timeStamp);

    const bookShelfPlace = document.createElement('article');
    // bookShelfContain.classList.add('item', 'shadow')
    bookShelfPlace.append(bookContain);
    bookShelfPlace.setAttribute('id', `book-${bookObject.id}`);

    // console.log(bookObject.isCompleted);

    if (bookObject.isCompleted) {                                                   // UNTUK COMPLETE (YANG SUDAH DIBACA)
        const incompleteButton = document.createElement('button');
        incompleteButton.classList.add('incomplete-button');
        incompleteButton.append("Belum selesai dibaca");

        incompleteButton.addEventListener('click', function () {
            addBookToIncomplete(bookObject.id);
        });

        const deleteButton = document.createElement('button');
        // deleteButton.classList.add('delete-button');
        deleteButton.append("Delete");
    
        deleteButton.addEventListener('click', function () {
            removeBook(bookObject.id);
        });

        bookContain.append(incompleteButton, deleteButton);
    
    } else {                                                                            // UNTUK INCOMPLETE (YANG BELUM DIBACA)
        /*const completeTick = document.getElementById('inputBookIsComplete');
        completeTick.addEventListener('click', function () {
            addBookToComplete(bookObject.id);
        });*/
        
        const completeButton = document.createElement('button');
        // completeButton.classList.add('complete-button');
        completeButton.append("Selesai dibaca");

        completeButton.addEventListener('click', function () {
            addBookToComplete(bookObject.id);
        });
        
        const deleteButton = document.createElement('button');
        // deleteButton.classList.add('delete-button');
        deleteButton.append("Delete");
    
        deleteButton.addEventListener('click', function () {
            removeBook(bookObject.id);
        });


        bookContain.append(completeButton, deleteButton);
    }

    return bookContain;
};


function addBookToComplete (bookId) {
    const bookTarget = findBook(bookId);

    if(bookTarget == null) return;

    bookTarget.isCompleted = true;                                   // MINDAHIN DARI RAK "Belum selesai dibaca" KE RAK "Sudah selesai dibaca"                     
    document.dispatchEvent(new Event(RENDER_EVENT));
};

                                    
function findBook (bookId) {
    for (const bookItem of books) {
        if (bookItem.id === bookId) {
            return bookItem;
        }
    }
    return null;
};


function addBookToIncomplete (bookId) {
    const bookTarget = findBook(bookId);

    if(bookTarget == null) return;

    bookTarget.isCompleted = false;
    document.dispatchEvent(new Event(RENDER_EVENT)); 
};


function removeBook (bookId) {
    const bookTarget = findBookIndex (bookId);

    if (bookTarget === -1) return;

    books.splice(bookTarget, 1);
    document.dispatchEvent(new Event(RENDER_EVENT))
};


function findBookIndex (bookId) {
    for (const index in books) {
        if (books[index].id === bookId) {
            return index;
        }
    }
}; 


/** NOTES
 * bookContain : isi rak buku
 * bookShelfPlace   : rak buku nya
 */