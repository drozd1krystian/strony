let Error404 = {
  render: async () => {
    return /*html*/ `
          <section class="forms">
            <div class ="wrapper">
              <h1> Error 404 </h1>
            </div>
          </section>
      `;
  },
  after_render: async () => {}
};

export default Error404;
