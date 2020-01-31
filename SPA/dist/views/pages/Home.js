let getMemeList = async () => {
  try {
    const respone = await fetch(`https://meme-api.herokuapp.com/gimme/100`);
    const json = await respone.json();
    const memes = json.memes;
    return memes;
  } catch (err) {
    console.log("Error getting memes", err);
  }
};

let Home = {
  render: async () => {
    let memes = await getMemeList();
    let view = `
      <section>
        <h1> Memes </h1>
        <ul>
          ${memes
            .map(meme => `<li><a href="${meme.url}">${meme.title}</a></li>`)
            .join("\n ")}
          <li> </li>
        </ul>
      </section>
    `;
    return view;
  },
  after_render: async () => {}
};

export default Home;
