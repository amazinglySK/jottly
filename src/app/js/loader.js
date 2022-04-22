const loaderOn = () => {
  $(".fallback-screen").css("visibility", "visible");
};

const loaderOff = () => {
  setTimeout(() => $(".fallback-screen").css("visibility", "hidden"), "2000");
};
