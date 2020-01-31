let Navbar = {
  render: async () => {
    let view = `
    <nav id="navbar">
      <a href="index.html" class="navbar-item mobile-logo logo"><div class="logo">SPA</div></a>
      <ul class="links">
        <li>
          <a href="#/" class="navbar-item"><div class="logo">SPA</div></a>
        </li>
        <li><a href="#/" class="navbar-item">Home</a></li>
        <div>
          <li><a href="#/signup" class="navbar-item btn bg-dark">Sign Up</a></li>
          <li><a href="#/login" class="navbar-item btn bg-light">Log In</a></li>
        </div>    
      </ul>
    </nav>
    `;
    return view;
  },
  after_render: async () => {}
};
export default Navbar;
