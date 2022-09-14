const books = [];
const RENDER_EVENT = 'render-book';


function addBook () {
    const titleBook = document.getElementById('inputBookTitle').value;
    const authorBook = document.getElementById('inputBookAuthor').value;
    const timeStamp = document.getElementById('inputBookYear').value;

    const generatedID = generateId();
    const bookObject = generateBookObject(generatedID, titleBook, authorBook, timeStamp, false)
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
    /*
    const completedReadBOOKList = document.getElementById('completeBookshelfList');
    completedReadBOOKList.innerHTML = '';*/

    for (const bookItem of books) {
        const bookElement = makeBook(bookItem);
        
        if (!bookItem.isCompleted) {
        incompleteReadBOOKList.append(bookElement);
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

    const bookShelfContain = document.createElement('article');
    // bookShelfPlace.classList.add('inner');
    bookShelfContain.append(titleBook, authorBook, timeStamp);

    const bookShelfPlace = document.createElement('article');
    // bookShelfContain.classList.add('item', 'shadow')
    bookShelfPlace.append(bookShelfContain);
    bookShelfPlace.setAttribute('id', `book-${bookObject.id}`);


    if (bookObject.isCompleted) {
        const incompleteButton = document.createElement('button');
        incompleteButton.classList.add('.green');

        incompleteButton.addEventListener('click', function () {
            undoTaskFromCompleted(bookObject.id);
        });

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
    
        deleteButton.addEventListener('click', function () {
            removeTaskFromCompleted(bookObject.id);
        });

        bookShelfContain.append(incompleteButton, deleteButton);
    } else {
        const completeButton = document.createElement('button');
        completeButton.classList.add('complete-button');

        completeButton.addEventListener('click', function () {
            addTaskToComplete(bookObject.id);
        });
        
        bookShelfContain.append(completeButton);
    }

    return bookShelfContain;
};


function addTaskToComplete (bookId) {
    const bookTarget = findBook(bookId);

    if(bookTarget == null) return;

    bookTarget.isCompleted = true;
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


/** NOTES
 * bookShelfContain : isi rak buku
 * bookShelfPlace   : rak buku nya
 */