let Register = {
  render: () => {
    let view = `
    <section class ="forms">
      <div class="wrapper" id="signup">
        <form action="" >
          <h1>Sign Up</h1>
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <input type="password" placeholder="Confirm Password" />
          <button type="submit" class="bg-light btn">Submit</button>
          <p><a href="#/login">Already Have An Account? Log In &#10230</a></p>
        </form>
      </div>
    </section>
    `;
    return view;
  },
  after_render: () => {},
};

export default Register;
