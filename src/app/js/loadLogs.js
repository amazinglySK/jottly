const createLogCard = ({ link, title, desc, date }) => {
  let link_tag = document.createElement("a");
  $(link_tag).attr({ href: link });
  let post_card = document.createElement("div");
  $(post_card).attr({ class: "post-card" });
  let post_date = document.createElement("p");
  $(post_date).attr({ class: "post-date" }).text(date);
  let post_title = document.createElement("p");
  $(post_title).attr({ class: "post-title" }).text(title);
  let post_desc = document.createElement("p");
  $(post_desc).attr({ class: "post-desc" }).text(desc);
  $(post_card).append(post_date, post_title, post_desc);
  $(link_tag).append(post_card);
  $(".post-container").append(link_tag);
  // Basically writing a jqeury based framework at this point
  return;
};

const getLogs = async () => {
  const response = await fetch("/logs/");
  const jsonRes = await response.json();
  return jsonRes;
};

$(document).ready(() => {
  getLogs()
    .then((res) => {
      for (const log of res.logs) {
        createLogCard(log);
      }
      return;
    })
    .catch((err) => {
      console.log(err);
      alert("An error occured");
    });
});
