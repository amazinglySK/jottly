const createLogCard = ({ link, title, desc, date, post_id }) => {
  let trash_can = `<i class='fa-regular fa-trash-can' onclick = 'handle_trash_click("${post_id}")'></i>`;
  let pencil_icon = `<a href = '/user/update/${post_id}'><i class='fa-solid fa-pencil'></i></a>`;
  let icon_div = document.createElement("div");
  let link_tag = document.createElement("a");
  $(link_tag).attr({ href: link });
  let post_card = document.createElement("div");
  $(post_card).attr({ class: "post-card", id: post_id });
  let post_date = document.createElement("p");
  $(post_date).attr({ class: "post-date" }).text(date);
  let post_title = document.createElement("p");
  $(post_title).attr({ class: "post-title" }).text(title);
  let post_desc = document.createElement("p");
  $(post_desc).attr({ class: "post-desc" }).text(desc);
  $(icon_div).append($(pencil_icon), $(trash_can)).attr({ class: "icon_div" });
  $(link_tag).append(post_date, post_title, post_desc);
  $(post_card).append(icon_div, link_tag);
  $(".post-container").append(post_card);
  // Basically writing a jqeury based framework at this point
  return;
};

const loadLogs = async (num) => {
  let link = "/logs/num/";
  if (num) {
    link = `/logs/num/${num}`;
  }
  const response = await fetch(link);
  const jsonRes = await response.json();
  return jsonRes;
};

const deleteLog = async (uid) => {
  const response = await fetch(`/logs/${uid}`, { method: "DELETE" });
  const jsonRes = await response.json();
  return jsonRes;
};

const createLog = async (data) => {
  const response = await fetch("/logs/new", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const jsonRes = await response.json();
  return jsonRes;
};

const loadLog = async (uid) => {
  const response = await fetch(`/logs/${uid}`);
  const jsonRes = await response.json();
  return jsonRes;
};

const updateLog = async (uid, content, title) => {
  const payload = { content, title };
  const response = await fetch(`/logs/${uid}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const jsonRes = response.json();
  return jsonRes;
};
