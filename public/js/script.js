const loginButton = $('#login-btn');

const hashText = async (text) => {
  const msgBuffer = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

loginButton.on("click", async () => {
  const email = $('#email').val().toLowerCase();
  const password = await hashText($('#password').val()); 

  if (!email || !password) return;

  $.ajax({
    type: 'POST',
    url: '/api/user/login',
    data: JSON.stringify({
      email: email,
      password: password
    }),
    success: () => {
      alert("Logado com sucesso!");
    },
    error: (err) => {
      alert("Erro ao fazer login: " + err.responseJSON.message);
    },
    contentType: 'application/json',
    dataType: 'json'
  });
});
