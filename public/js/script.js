const hashText = async (text) => {
  const msgBuffer = new TextEncoder().encode(text)
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  return hashHex
}

const capitalize = (text) => {
  if (!text) return null

  text = text.toLowerCase()
  text = text.split(' ')

  for (let i = 0; i < text.length; i++) {
    text[i] = text[i].charAt(0).toUpperCase() + text[i].slice(1)
  }

  return text.join(' ')
}

const getCookie = (name) => {
  var newName = name + "="
  var sizes = document.cookie.split(';')
  for (var i = 0; i < sizes.length; i++) {
    var size = sizes[i].trim()
    if (size.indexOf(newName) === 0) {
      return size.substring(newName.length, size.length)
    }
  }
  return null;
}

const setCookie = (name, value, days) => {
  var date = new Date()
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
  var expires = "expires=" + date.toUTCString()
  document.cookie = name + "=" + value
}

const loginGuard = () => {
  for (let i = 1; i < 4; i++) {
    const cookieValue = getCookie(`basiclite:token-${i}`)
    if (!cookieValue) return false
  }
  return true
};

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

  location.href = '/home'
}

const loginMethods = () => {
  $(document).on('keydown', (e) => {
    const { originalEvent } = e;
    
    if (originalEvent.key == 'Enter') {
      loginRequest()
    }
  })

  $("#login-btn").on("click", async () => {
    loginRequest()
  })
}

const homeMethods = () => {
  if (!loginGuard()) {
    location.href = '/'
  }

  const name = localStorage.getItem('name')
  $('#brand-hello').text('Bem vindo de volta, ' + capitalize(name))
}

$(document).ready(() => {
  const title = document.title

  if (title == 'basicT | Login') loginMethods()
  if (title == 'basicT | Inicio') homeMethods()
}) 