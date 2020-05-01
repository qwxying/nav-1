$("#addButton").on("click", () => {
  let url = window.prompt("请输入要添加的网址：");
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }
  let newLogo = url.substring(8, 11).toLowerCase() === "www" ? url[12] : url[8];

  const $siteList = $(".siteList");
  const $li = $(`
    <li>
        <a href="${url}">
        <div class="site">
            <div class="logo">${newLogo.toUpperCase()}</div>
            <div class="link">${url.slice(8).toLowerCase()}</div>
        </div>
        </a>
    </li>
  `).insertBefore($siteList.find("li.last"));
});
