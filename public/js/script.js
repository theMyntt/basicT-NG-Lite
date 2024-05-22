const loginButton = $('#login-btn')

const hashText = (text) => {
  return CryptoJS.SHA256(text).toString(CryptoJS.enc.Base64)
}

loginButton.on("click", () => {
  const email = $('#email').val()
  const password = hashText($('#password').val())

  if (!email || !password) return
})