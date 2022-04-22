const change_password = async (current_password, new_password) => {
  const res = await fetch("/api/chpwd", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ current_password, new_password }),
  });
  const jsonRes = await res.json();
  return jsonRes;
};

const change_username = async (username) => {
  const res = await fetch("/api/user/username", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username }),
  });
  const jsonRes = await res.json();
  return jsonRes;
};

const change_bio = async (bio) => {
  const res = await fetch("/api/user/bio", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ bio }),
  });
  const jsonRes = await res.json();
  return jsonRes;
};

$(document).ready(() => {
  $("#chuname_btn").on("click", (e) => {
    e.preventDefault();
    loaderOn();
    const username = $("#username").val();
    if (det.username === username) {
      return;
    }
    change_username(username)
      .then((res) => {
        alert(res.message);
        localStorage.username = username;
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong");
      })
      .finally(() => {
        loaderOff();
      });
  });
  $("#chbio_btn").on("click", (e) => {
    e.preventDefault();
    loaderOn();
    const bio = $("#bio").val();
    if (det.bio === bio) {
      return;
    }
    change_bio(bio)
      .then((res) => {
        alert(res.message);
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong");
      })
      .finally(() => {
        loaderOff();
      });
  });
  $("#chpwd_btn").on("click", (e) => {
    e.preventDefault();
    loaderOn();
    const current_password = $("#old_password").val();
    const new_password = $("#new_password").val();
    const confirm_password = $("#confirm_password").val();
    if (confirm_password !== new_password) {
      alert("The new passwords do no match");
      return;
    }
    change_password(current_password, new_password)
      .then((res) => {
        alert(res.message);
        if (res.redirect_url) {
          window.location.href = res.redirect_url;
        }
      })
      .catch((err) => {
        console.log(err);
        alert("something went wrong");
      })
      .finally(() => {
        loaderOff();
      });
  });
});
