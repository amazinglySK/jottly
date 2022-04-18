const change_password = async (old_password, new_password) => {
  const res = await fetch("/api/chpwd", {
    method: "UPDATE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ old_password, new_password }),
  });
  const jsonRes = await res.json();
  return jsonRes;
};

$(document).ready(() => {
  $("#chpwd_btn").on("click", (e) => {
    e.preventDefault();
    const old_password = $("#old_password");
    const new_password = $("#new_password");
    const confirm_password = $("#confirm_password");
    if (confirm_password !== new_password) {
      alert("The new passwords do no match");
      return;
    }
    change_password(old_password, new_password).then((res) => {
      alert(res.message);
      if (res.redirect_url) {
        window.location.href = res.redirect_url;
      }
    });
  });
});
