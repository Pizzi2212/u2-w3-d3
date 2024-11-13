const getData = function () {
  fetch('https://striveschool-api.herokuapp.com/books')
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error('Error')
      }
    })
    .then((data) => {
      let row = document.querySelector('.row')
      data.forEach((book) => {
        let col = document.createElement('div')
        col.classList.add('col', 'mt-4')

        col.innerHTML = `
        
  <div class="container">
  <div class="row">
    <div class="col-12">
      <div class="card h-100">
        <img src="${book.img}" class="card-img-top" alt="book picture">
        <div class="card-body">
          <h5 class="card-title">${book.title}</h5>
          <p class="card-text">${book.price}$</p>
         <button class="btn btn-outline-secondary scarta">Delete</button>
         <button class="btn btn-outline-secondary compra">Buy</button>
        </div>
      </div>
    </div>
  </div>
</div>

          `
        row.appendChild(col)

        const compraButton = col.querySelector('.compra')
        compraButton.addEventListener('click', () => {
          const savedItems =
            JSON.parse(localStorage.getItem('savedItems')) || []
          const item = {
            title: book.title,
            price: book.price,
          }
          savedItems.push(item)
          localStorage.setItem('savedItems', JSON.stringify(savedItems))
        })
      })

      row.addEventListener('click', (event) => {
        if (event.target.classList.contains('scarta')) {
          const col = event.target.closest('.col')
          if (col) {
            col.style.display = 'none'
          }
        }
      })
    })
    .catch((err) => {
      console.log('Error', err)
    })
}

getData()

const body = document.getElementById('body')
const mode = document.getElementById('mode')

function toggleTheme() {
  if (body.classList.contains('bg-light')) {
    body.classList.remove('bg-light')
    body.classList.add('bg-dark')
    localStorage.setItem('theme', 'dark')
  } else {
    body.classList.add('bg-light')
    body.classList.remove('bg-dark')
    localStorage.setItem('theme', 'light')
  }
}

function loadTheme() {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark') {
    body.classList.add('backgroundMode')
    body.classList.remove('background')
  } else {
    body.classList.add('background')
    body.classList.remove('backgroundMode')
  }
}

mode.addEventListener('click', toggleTheme)

loadTheme()
