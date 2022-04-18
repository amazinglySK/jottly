const change_password = async (current_password, new_password) => {
  const res = await fetch("/api/chpwd", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ current_password, new_password }),
  });
  const jsonRes = await res.json();
  return jsonRes;
};

$(document).ready(() => {
  $("#chpwd_btn").on("click", (e) => {
    e.preventDefault();
    const current_password = $("#old_password").val();
    const new_password = $("#new_password").val();
    const confirm_password = $("#confirm_password").val();
    if (confirm_password !== new_password) {
      alert("The new passwords do no match");
      return;
    }
    change_password(current_password, new_password).then((res) => {
      alert(res.message);
      if (res.redirect_url) {
        window.location.href = res.redirect_url;
      }
    });
  });
});
