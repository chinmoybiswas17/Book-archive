const searchBook = () => { 
    const searchText = document.getElementById('inputText').value; 
    const searchField = document.getElementById('inputText');
    searchField.value = ""; 
   if (searchText === '') {
    document.getElementById('emptyInput').innerText = 'Please write a book name'
    document.getElementById('searchResult').textContent= ''
    document.getElementById("allResult").style.display = "none"
    }
    else{
        document.getElementById('emptyInput').innerText = '';
 
        const url = `https://openlibrary.org/search.json?q=${searchText}`
        fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.numFound !== 0) {
                displayBooks(data.docs,data.numFound)
            }
            else {
                document.getElementById('searchResult').textContent= ''
                document.getElementById("allResult").style.display ="none"
                document.getElementById('emptyInput').innerHTML = `Sorry no result found`
            }
            
        })
        .catch(error => console.log(error))
    }  
};
const displayBooks = (books, totalData) =>{
    const container = document.getElementById('searchResult');
    container.innerText = '';
   books.forEach(book => {
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
        <div class="card h-100">
        <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title"><strong>Book Name :</strong> ${book.title}</h5>
                <p class="card-text"><strong>Author :</strong> ${book.author_name}</p>
                <p class="card-text"><strong>Publisher :</strong> ${book.publisher}</p>
            </div>
            <div class="card-footer">
            <small class="text-muted"><strong>First Published :</strong> ${book.first_publish_year}</small>
            </div>
        </div>
    `
    container.appendChild(div);
    document.getElementById("allResult").innerText = `Total ${totalData} Results Found`;
    document.getElementById("allResult").style.display ="flex";
   }); 
};