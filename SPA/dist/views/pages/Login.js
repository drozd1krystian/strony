let Login = {
  render: () => {
    let view = `
    <section class ="forms">
      <div class="wrapper" id="login">
        <form action="">
          <h1>Log In</h1>
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <p><a href="">Forgot Login/Password?</a></p>
          <button type="submit" class="bg-light btn">Submit</button>
          <h3><a href="">Need An Account? Sign Up &#10230</a></h3>
        </form>
      </div>
    </section>
    `;
    return view;
  },
  after_render: () => {}
};
export default Login;
