let Footer = {
  render: async () => {
    let view = /*html*/ `
      <footer id="main-footer">
        <h1>Made by Me for Me to test SPA</h1>
      </footer>
      `;
    return view;
  },
  after_render: async () => {}
};

export default Footer;
