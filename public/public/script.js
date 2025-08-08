let login = "";
let domain = "";
let email = "";

function generateEmail() {
  const chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
  login = '';
  for (let i = 0; i < 10; i++) {
    login += chars[Math.floor(Math.random() * chars.length)];
  }
  domain = '1secmail.com';
  email = `${login}@${domain}`;
  document.getElementById("email").innerText = email;
  loadMessages();
}

function copyEmail() {
  navigator.clipboard.writeText(email).then(() => {
    alert("Email copied!");
  });
}

function loadMessages() {
  fetch(`https://www.1secmail.com/api/v1/?action=getMessages&login=${login}&domain=${domain}`)
    .then(res => res.json())
    .then(data => {
      const inbox = document.getElementById("messages");
      inbox.innerHTML = '';
      if (data.length === 0) {
        inbox.innerHTML = '<li>No emails yet</li>';
      } else {
        data.forEach(msg => {
          const li = document.createElement("li");
          li.innerText = `${msg.from} - ${msg.subject}`;
          inbox.appendChild(li);
        });
      }
    });
}

generateEmail();
setInterval(loadMessages, 5000); // auto-refresh every 5 sec
