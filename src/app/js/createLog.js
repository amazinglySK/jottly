const createLog = async (data) => {
  const response = await fetch("/logs/new", {
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
    const title = $("#title").val();
    const content = $("#content").val();
    const date = Date.now();
    createLog({ title, content, date })
      .then((res) => {
        alert(res.message);
        if (res.redirect_url) window.location.href = res.redirect_url;
        return;
      })
      .catch((err) => {
        console.log(err);
        alert("Uh oh an error occured");
      });
  });
});
