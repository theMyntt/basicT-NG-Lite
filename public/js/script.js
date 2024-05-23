const loginButton = $('#login-btn')

const hashText = async (text) => {
  const msgBuffer = new TextEncoder().encode(text)
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  return hashHex
}

const setCookie = (name, value, days) => {
  var date = new Date()
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
  var expires = "expires=" + date.toUTCString()
  document.cookie = name + "=" + value + "" + expires + "path=/"
}

const loginRequest = async () => {
  const email = $('#email').val().toLowerCase()
  const password = await hashText($('#password').val()) 

  if (!email || !password) return

  $.ajax({
    type: 'POST',
    url: '/api/user/login',
    data: JSON.stringify({
      email: email,
      password: password
    }),
    success: (response) => {
      localStorage.clear()

      let i = 1
      for (let token in response.tokens) {
        setCookie(`basiclite:token-${i}`, response.tokens[token], 7)
        i++
      }

      if (response.isAdmin) {
        setCookie("basiclite:admin", response.isAdmin)
      }

      localStorage.setItem("name", response.name)
    },
    error: (err) => {
      alert("Erro ao fazer login: " + err.responseJSON.message)
    },
    contentType: 'application/json',
    dataType: 'json'
  })
}

$(document).ready(() => {
  const title = document.title

  if (title != 'basicT | Login') return

  $(document).on('keydown', (e) => {
    const { originalEvent } = e;
    
    if (originalEvent.key == 'Enter') {
      loginRequest()
    }
  })
}) 

loginButton.on("click", async () => {
  loginRequest()
})
