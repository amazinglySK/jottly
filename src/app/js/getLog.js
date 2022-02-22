const loadLog = async () => {
  const uid = window.location.href.split("/").slice(-1)[0];
  console.log(uid);
  const response = await fetch(`/logs/${uid}`);
  const jsonRes = await response.json();
  return jsonRes;
};

$(document).ready(() => {
  loadLog()
    .then((res) => {
      $("#title").text(res.title);
      const date = new Date(res.date);
      $("#date").text(date.toLocaleDateString("en-GB"));
      $("#content").text(res.content);
      console.log("Done");
    })
    .catch((err) => {
      console.log(err);
      alert("Uh oh an error occured");
    });
});
