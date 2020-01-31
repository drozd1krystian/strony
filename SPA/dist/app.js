import Navbar from "./views/components/Navbar.js";
import Footer from "./views/components/Footer.js";

import Home from "./views/pages/Home.js";
import Utils from "./services/utils.js";
import Login from "./views/pages/Login.js";
import Register from "./views/pages/Register.js";
import Error404 from "./views/pages/Error404.js";
import Loader from "./views/pages/Loader.js";

const routes = {
  "/": Home,
  "/home": Home,
  "/signup": Register,
  "/login": Login
};

const router = async () => {
  const header = null || document.getElementById("navbar-container");
  const content = null || document.getElementById("page-container");
  const footer = null || document.getElementById("footer");

  header.innerHTML = await Navbar.render();
  await Navbar.after_render();

  let request = Utils.parseRequestedUrl();

  let parsedURL =
    (request.resource ? "/" + request.resource : "/") +
    (request.verb ? "/" + request.verb : "");

  let page = routes[parsedURL] ? routes[parsedURL] : Error404;
  content.innerHTML = await Loader.render();
  content.innerHTML = await page.render();
  await page.after_render();

  footer.innerHTML = await Footer.render();
  await Footer.after_render();
};

// Listen on hash change:
window.addEventListener("hashchange", router);

// Listen on page load:
window.addEventListener("load", router);
