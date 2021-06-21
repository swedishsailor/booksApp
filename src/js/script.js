{
    const booksList = '.books-list';
    const bookImg = '.book__image';
    const templateBook = Handlebars.compile(document.querySelector('#template-book').innerHTML);
    let favoriteBooks = [];


    function render() {
        for (const bookId in dataSource.books) {
            const book = dataSource.books[bookId];
            const generateHTML = templateBook(book);
            const dom = utils.createDOMFromHTML(generateHTML);
            const booksContainer = document.querySelector(booksList);
            booksContainer.appendChild(dom);
        }
    }
    function initActions() {
        const thisBook = this;

        const bookObj = document.querySelectorAll('.book');
        thisBook.bookImg = document.querySelectorAll(bookImg);
        

        for (let eachBook of thisBook.bookImg) {

            const bookId = eachBook.getAttribute('data-id');
            eachBook.addEventListener('dblclick', function () {
                console.log(eachBook);
                //debugger;
               //bookImg.classList.add('favorite');
               if (eachBook.className !== 'book__image favorite'){
                console.log(eachBook.className);
                   favoriteBooks.push(bookId);
                   console.log(favoriteBooks,bookId);
               eachBook.classList.add('favorite');
               
               } else if (eachBook.className == 'book__image favorite'){
                const bookArrIndex = favoriteBooks.indexOf(bookId);
                   favoriteBooks.splice(bookArrIndex,1);
                eachBook.classList.remove('favorite');
                console.log(favoriteBooks, bookId);
                
               }

            });
        }


    }

    render();
    initActions();
}