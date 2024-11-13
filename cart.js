const savedItems = JSON.parse(localStorage.getItem('savedItems')) || []
const list = document.getElementById('elements')
const total = document.getElementById('total')
let totalPrice = 0

list.innerHTML = ''

savedItems.forEach((item, index) => {
  const listItem = document.createElement('li')
  listItem.classList.add('mt-3')
  const scarta = document.createElement('button')
  scarta.classList.add('btn', 'btn-outline-danger', 'mx-4')
  scarta.innerText = 'Scarta'
  listItem.textContent = `${item.title} - ${item.price} $`
  list.appendChild(listItem)
  listItem.appendChild(scarta)

  scarta.addEventListener('click', () => {
    listItem.classList.add('d-none')
    savedItems.splice(index, 1)
    localStorage.setItem('savedItems', JSON.stringify(savedItems))
    totalPrice -= parseFloat(item.price)
    total.innerText = `${totalPrice} $`
  })

  totalPrice += parseFloat(item.price)
})

total.innerText = `${totalPrice} $`
