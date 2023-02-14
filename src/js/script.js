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
function initActions(list, form){
  const filters = [];
  const tab = [];
  //dwukrotne kliknięcie na książke powoduje dodanie klasy favorite do .book__image 
  list.addEventListener('dblclick', function(e){
    e.preventDefault();
    console.log(e.target.offsetParent);
    if((e.target.offsetParent.classList.contains('book__image'))){
      e.target.offsetParent.classList.toggle('favorite');
      //dwukrotne kliknięcie powoduje dodanie książki do tablicy favoriteBooks
      if(e.target.offsetParent.classList.contains('favorite')){
        tab.push(e.target.offsetParent.dataset.id);
        console.log(tab);
      }else{
        tab.splice(tab.indexOf(e.target.offsetParent.dataset.id),1);
        console.log(tab);
      }
    }
  });
  form.addEventListener('click', function(e){
    if(e.target.tagName == 'INPUT' && e.target.type == 'checkbox' && e.target.name == 'filter'){
      if(e.target.checked){
        filters.push(e.target.value);
        console.log(filters);
      }else if(!e.target.checked){
        filters.splice((filters.indexOf(e.target.value)),1);
        console.log(filters);
      }
    }
  });
}

initActions(books,filterForm);


