/* eslint-disable no-unused-vars */
class BooksList {
  constructor() {
    const thisBookList = this;
    thisBookList.initData();
    thisBookList.getElements();
    thisBookList.initActions();
    thisBookList.determineRatingBgc();
  }
  initData() {
    const thisBookList = this;
    //funckja render
    thisBookList.data = dataSource.books;
    thisBookList.booksList = document.querySelector('.books-list');
    thisBookList.bookTemplate = Handlebars.compile(document.querySelector('#template-book').innerHTML);
    for(let item of thisBookList.data){
      item.ratingBgc = thisBookList.determineRatingBgc(item.rating);
      item.ratingWidth = item.rating*10;
      const generatedHTML = thisBookList.bookTemplate(item);
      const generatedDom = utils.createDOMFromHTML(generatedHTML);
      thisBookList.booksList.appendChild(generatedDom);
    }
  }
  getElements() {
    const thisBookList = this;
    thisBookList.dataBooks = dataSource.books;
    thisBookList.books = document.querySelector('.books-list');
    thisBookList.filterForm = document.querySelector('.filters');
    thisBookList.booksImage = document.querySelectorAll('.book__image');    
    thisBookList.bookImageClass = 'book__image';
    thisBookList.favoriteClass = 'favorite';
    thisBookList.hiddenClass = 'hidden'; 
  }
  filterBooks(filters) {
    const thisBookList = this;
    let shouldBeHidden = false;
    for(let item of thisBookList.dataBooks){
    //obiekt: id,name,image...
      for(let filtr of filters){
      //[adults,fiction]
        if(!filtr) {
          shouldBeHidden=false;}
        //obiekt dom z books__image
        if((filtr) && item.details.hasOwnProperty(filtr)){
        //obiekt.details=='fiction' i book_image.id=obiekt.id
          if(item.details[filtr]){ 
          //obiekt.details=='fiction'==true
            shouldBeHidden = false; 
          }else if(!item.details[filtr]){
          //obiekt.details=='fiction'==false
            shouldBeHidden = true; 
          }
        }
      }  
      for(let book of thisBookList.booksImage){
        if(book.dataset.id == item.id){
          if(shouldBeHidden){
            book.classList.add(thisBookList.hiddenClass);
          }else if(!shouldBeHidden){
            book.classList.remove(thisBookList.hiddenClass);
          }}
      }
    }
  }
  initActions() {
    const thisBookList = this;
    const filters = [];
    thisBookList.tab = [];
    //dwukrotne kliknięcie na książke powoduje dodanie klasy favorite do .book__image 
    thisBookList.books.addEventListener('dblclick', function(e){
      e.preventDefault();
      if((e.target.offsetParent.classList.contains(thisBookList.bookImageClass))){
        e.target.offsetParent.classList.toggle(thisBookList.favoriteClass);
        //dwukrotne kliknięcie powoduje dodanie książki do tablicy favoriteBooks
        if(e.target.offsetParent.classList.contains(thisBookList.favoriteClass)){
          thisBookList.tab.push(e.target.offsetParent.dataset.id);
        }else{
          thisBookList.tab.splice(thisBookList.tab.indexOf(e.target.offsetParent.dataset.id),1);
        }
      }
    });
    thisBookList.filterForm.addEventListener('click', function(e){
      if(e.target.tagName == 'INPUT' && e.target.type == 'checkbox' && e.target.name == 'filter'){
        if(e.target.checked){
          filters.push(e.target.value);
        }else if(!e.target.checked){
          filters.splice((filters.indexOf(e.target.value)),1);
        }
        thisBookList.filterBooks(filters);
      }
    });
  }
  determineRatingBgc(rating) {
    const thisBookList = this;
    thisBookList.background = '';
    switch(true){
    case rating < 6: 
      thisBookList.background = 'background: linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      console.log(thisBookList.background);
      break;
    case rating > 6 && rating <= 8: 
      thisBookList.background = 'background: linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      console.log(thisBookList.background);
      break;
    case rating > 8 && rating <= 9: 
      thisBookList.background = 'background: linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      console.log(thisBookList.background);
      break;
    case rating > 9: 
      thisBookList.background = 'background: linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      console.log(thisBookList.background);
      break; 
    } 
  }
}

const app = new BooksList();









