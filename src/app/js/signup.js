const signup = async (data) => {
  const response = await fetch("/api/signup", {
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
    const name = $("#name").val();
    const username = $("#username").val();
    const password = $("#password").val();
    const email = $("#email").val();
    const c_pwd = $("#c_password").val();
    const data = {
      name,
      username,
      password,
      email,
    };
    if (c_pwd !== password) {
      alert("The passwords do no match");
      return;
    }
    signup(data)
      .then((res) => {
        alert(res.message);
        if (res.redirect_url) {
          window.location.href = res.redirect_url;
        }
        return;
      })
      .catch((err) => {
        console.log(err);
        alert("An error occured");
      })
      .finally(() => {
        loaderOff();
      });
  });
});
