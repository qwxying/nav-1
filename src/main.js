const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);
const hashMap = xObject || [
  {
    logo: "A",
    url: "https://www.acfun.cn",
  },
  {
    logo: "B",
    url: "https://www.bilibili.com",
  },
  {
    logo: "C",
    url: "https://tucao.one",
  },
];
const render = () => {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach((node) => {
    //   node.logo = node.url.substring(8, 11).toLowerCase() === "www" ? url[12] : url[8];
    const $li = $(`
          <li>
              <a href="${node.url}">
              <div class="site">
                  <div class="logo">${node.logo.toUpperCase()}</div>
                  <div class="link">${node.url.slice(8).toLowerCase()}</div>
              </div>
              </a>
          </li>
        `).insertBefore($lastLi);
  });
};

render();

$("#addButton").on("click", () => {
  let url = window.prompt("请输入要添加的网址：");
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }

  hashMap.push({
    logo: url[0],
    url: url,
  });
  render();
});

window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap);
  localStorage.setItem("x", string);
};
