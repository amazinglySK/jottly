const login = async (data) => {
  const response = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const jsonRes = await response.json();
  return jsonRes;
};

$(document).ready(() => {
  $("#submit_btn").on("click", (e) => {
    e.preventDefault();
    loaderOn();
    const username = $("#username").val();
    const password = $("#password").val();
    login({ username, password })
      .then((res) => {
        alert(res.message);
        localStorage.username = res.username;
        if (res.redirect_url) {
          window.location.href = res.redirect_url;
          return;
        }
        return;
      })
      .catch((err) => {
        console.log(err);
        alert("Oops an error occured");
      })
      .finally(() => {
        loaderOff();
      });
  });
});
