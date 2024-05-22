const loginButton = $('#login-btn')

loginButton.on("click", () => {
  const email = $('#email').val()
  const password = $('#password').val()

  if (!email || !password) return
})