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

const addNewLink = () => {
  $("#addButton").on("click", () => {
    let url = window.prompt("请输入要添加的网址：");
    if (url === "" || null) {
      alert("网址不能为空！");
    } else if (url.indexOf("http") !== 0) {
      url = "https://" + url;
      hashMap.push({
        logo: simplifyUrl(url)[0],
        url: url,
      });
      render();
    }
  });
};

const simplifyUrl = (url) => {
  return url
    .toLowerCase()
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(".com", "")
    .replace(".cn", "")
    .replace(".one", "")
    .replace(".io", "")
    .replace(/\/.*/, ""); //删除以/开头的内容
};

const render = () => {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach((node, index) => {
    //   node.logo = node.url.substring(8, 11).toLowerCase() === "www" ? url[12] : url[8];
    const $li = $(`
          <li>
              <div class="site">
                  <div class="logo">${node.logo}</div>
                  <div class="link">${simplifyUrl(node.url)}</div>
                  <div class="close">x</div>
              </div>
          </li>
        `).insertBefore($lastLi);
    $li.on("click", () => {
      window.open(node.url, "_self");
    });
    $li.on("click", ".close", (e) => {
      e.stopPropagation(); //阻止冒泡
      hashMap.splice(index, 1);
      render();
    });
  });
};

render();

addNewLink();

window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap);
  localStorage.setItem("x", string);
};

$(document).on("keypress", (e) => {
  const { key } = e;
  for (let i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url, "_self");
    }
  }
});
