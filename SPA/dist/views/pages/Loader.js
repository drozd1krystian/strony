let Loader = {
  render: async () => {
    let view = `
      <section class ="forms">
        <div class ="wrapper">
          <div class ="loader"></div>
        </div>    
      </section>
    `;
    return view;
  },
  after_render: async () => {}
};

export default Loader;
