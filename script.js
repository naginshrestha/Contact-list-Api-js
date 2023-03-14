const apiUrl = "https://randomuser.me/api/?"

let userList = []

const displayElm = document.querySelector("#list")
const countElm = document.querySelector("#count")
const selectElm = document.querySelector("#select")
const searchElm = document.querySelector("#search-input")

const fetchUsers = (params = "results=10") => {
  fetch(apiUrl + params)
    .then((response) => response.json())
    .then((data) => {
      display(data.results)

      userList = data.results
    })
    .catch((error) => console.log(error))

  //   const users = await fetch(apiUrl + params)
  //   const data = await users.json()
  //   display(data.results)
}

const display = (users) => {
  let str = ""
  users.map((user) => {
    str += `
    <div class="card m-2" style="width: 20rem">
    <img src="${user.picture.large}" class="card-img-top" alt="user-img" />
    <div class = "card-body">
    <h5 class="card-title">
    ${user.name.title} ${user.name.first} ${user.name.last}
    </h5>
    <p class="card-text">
    <ul class="list-unstyled">
    <li><i class="fa-solid fa-phone"></i> ${user.phone}</li>
    <li><i class="fa-solid fa-envelope"></i> ${user.email}</li>
    <li><i class="fa-solid fa-calendar"></i> ${user.dob.date}</li>
    <li><i class="fa-solid fa-house"></i> ${user.location.street.name} ${user.location.postcode} ${user.location.state}</li>
    </ul>
    </p>
    </div>
    </div>
    `
  })

  displayElm.innerHTML = str
  countElm.innerText = users.length
}

fetchUsers()

searchElm.addEventListener("keydown", (e) => {
  let filteredUsers
  let searchTerm = e.target.value

  filteredUsers = userList.filter((user) => {
    const fullName = user.name.first + " " + user.name.last

    return fullName.toLowerCase().includes(searchTerm.toLowerCase())
  })

  display(filteredUsers)
})

selectElm.addEventListener("change", (e) => {
  let filteredUsers
  filteredUsers = userList.filter((user) => user.gender === e.target.value)
  display(filteredUsers)
})
