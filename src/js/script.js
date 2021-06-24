{
  const booksList = '.books-list';
  const bookImg = '.book__image';
  const templateBook = Handlebars.compile(document.querySelector('#template-book').innerHTML);
  let favoriteBooks = [];
  let filters = [];
  let ratingBgc;
  let ratingWidth;
  const filterInputs = document.querySelector('.filters');

  class BookList {
    constructor() {
      const thisBook = this;

      thisBook.initData();
      thisBook.render();
      thisBook.initActions();
    }

    initData() {
      this.data = dataSource.books;

    }

    getElements() {
      // const thisBook = this;

    }


    render() {
      const thisBook = this;
      for (const bookId in dataSource.books) {
        const book = dataSource.books[bookId];
        console.log(book, ratingWidth = 'ratingWidth:' + ratingWidth);
        //  ratingBgc = book.rating;
        ratingWidth = book.rating * 10;
        thisBook.determineRatingBgc(book.rating);
        console.log(ratingBgc);
        const generateHTML = templateBook(book);
        const dom = utils.createDOMFromHTML(generateHTML);
        const booksContainer = document.querySelector(booksList);
        booksContainer.appendChild(dom);
      }
    }
    initActions() {
      const thisBook = this;

      //const bookObj = document.querySelectorAll('.book');
      thisBook.bookImg = document.querySelectorAll(bookImg);
      const bookList = document.querySelector('.books-list');

      filterInputs.addEventListener('click', function (event) {
        console.log(event.target.value);
        if (event.target.checked) {
          filters.push(event.target.value);
          thisBook.filterBooks();
          console.log(filters);
        } else if (!event.target.checked) {
          const filterArrIndex = filters.indexOf(event.target.value);
          filters.splice(filterArrIndex);
          console.log(filters);
          thisBook.filterBooks();
        }
      });

      bookList.addEventListener('dblclick', function (event) {
        //debugger;
        //bookImg.classList.add('favorite');
        const bookId = event.target.offsetParent.getAttribute('data-id');
        if (event.target.offsetParent.className !== 'book__image favorite') {

          favoriteBooks.push(bookId);
          console.log(favoriteBooks, bookId);
          event.target.offsetParent.classList.add('favorite');

        } else if (event.target.offsetParent.className == 'book__image favorite') {
          const bookArrIndex = favoriteBooks.indexOf(bookId);
          favoriteBooks.splice(bookArrIndex, 1);
          event.target.offsetParent.classList.remove('favorite');
          console.log(favoriteBooks, bookId);

        }

      });
    }

    filterBooks() {

      let shouldBeHidden = false;


      for (let eachBook of dataSource.books) {
        const bookQuery = document.querySelector('.book__image[data-id="' + eachBook.id + '"]');

        for (const bookFilter of filters) {
          if (!eachBook.details[bookFilter]) {
            console.log('eachBook.details[bookFilter:', eachBook.details[bookFilter]);
            shouldBeHidden = true;

            console.log(bookQuery);
            bookQuery.classList.add('hidden');

            break;
          } else if (eachBook.details[bookFilter]) {
            shouldBeHidden = false;
            bookQuery.classList.remove('hidden');
            console.log('delete');
            break;
          } else if (filters == undefined) {
            bookQuery.classList.remove('hidden');
          }

        }
      }

      console.log('shouldbehidden?: ', shouldBeHidden);
    }

    determineRatingBgc(rating) {
      const thisBook = this;
      if (rating < 6) {
        thisBook.ratingBgc = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);';
      } else if (rating <= 8 && rating > 6) {
        thisBook.ratingBgc = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';
      } else if (rating > 8 && rating <= 9) {
        thisBook.ratingBgc = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
      } else if (rating > 9) {
        thisBook.ratingBgc = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);';
      }
      return thisBook.ratingBgc;
    }

  }


  const app = new BookList();

}