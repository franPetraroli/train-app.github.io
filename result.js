const result = document.getElementById('result')
const route = localStorage.getItem('result')


const display = JSON.parse(route)

display.forEach(element => {
  let li = document.createElement('li')
  li.innerText = element
  result.appendChild(li)
});