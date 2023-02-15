/*----------wyświetlenie książek na stronie-----------*/
const bookTemplate = Handlebars.compile(document.querySelector('#template-book').innerHTML);
const booksList = document.querySelector('.books-list');
const dataSrc = dataSource.books;
function render(template,dataSrc,htmlInput){
  for(let item of dataSrc){
    const generatedHTML = template(item);
    const generatedDom = utils.createDOMFromHTML(generatedHTML);
    htmlInput.appendChild(generatedDom);
  }
  
}
render(bookTemplate,dataSrc,booksList);

/*-------dodanie książek do ulubionych--------*/
/*-------------filtrowanie książek----------*/

const books = document.querySelector('.books-list');
const filterForm = document.querySelector('.filters');
const booksImage = document.querySelectorAll('.book__image');
const dataBooks = dataSource.books;
const bookImageClass = 'book__image';
const favoriteClass = 'favorite';
const hiddenClass = 'hidden';



function filterBooks(dataList,filter){
  let shouldBeHidden = false;
  for(let item of dataList){
    //obiekt: id,name,image...
    for(let filtr of filter){
      //[adults,fiction]
      if(!filtr) shouldBeHidden=false;
      for(let book of booksImage){
        //obiekt dom z books__image
        
        if(item.details.hasOwnProperty(filtr) && (book.dataset.id == item.id)){
          //obiekt.details=='fiction' i book_image.id=obiekt.id
          if(item.details[filtr]){ 
            //obiekt.details=='fiction'==true
            //book.classList.remove(hiddenClass);
            shouldBeHidden = false;
            console.log(book.classList);
          }else if(!item.details[filtr]){
            //obiekt.details=='fiction'==false
            //book.classList.add(hiddenClass);
            shouldBeHidden = true;
            console.log(book.classList);
          }
          if(shouldBeHidden) book.classList.add(hiddenClass);
        }
        
      }
      
    }

      
  }
  

}
function initActions(list, form){
  const filters = [];
  const tab = [];
  //dwukrotne kliknięcie na książke powoduje dodanie klasy favorite do .book__image 
  list.addEventListener('dblclick', function(e){
    e.preventDefault();
    if((e.target.offsetParent.classList.contains(bookImageClass))){
      e.target.offsetParent.classList.toggle(favoriteClass);
      //dwukrotne kliknięcie powoduje dodanie książki do tablicy favoriteBooks
      if(e.target.offsetParent.classList.contains(favoriteClass)){
        tab.push(e.target.offsetParent.dataset.id);
      }else{
        tab.splice(tab.indexOf(e.target.offsetParent.dataset.id),1);
      }
    }
  });
  
  form.addEventListener('click', function(e){
    if(e.target.tagName == 'INPUT' && e.target.type == 'checkbox' && e.target.name == 'filter'){
      
      
      if(e.target.checked){
        filters.push(e.target.value);
      }else if(!e.target.checked){
        filters.splice((filters.indexOf(e.target.value)),1);
      }
      
      filterBooks(dataBooks, filters);
    }
    
  });
}

initActions(books,filterForm);


