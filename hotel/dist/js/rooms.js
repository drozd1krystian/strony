const rooms = [
  {
    img: "./img/room1.jpg",
    name: "Small Room",
    guests: "1",
    size: "15",
    price: "30",
    services: [
      { text: "swimming pool", icon: "fas fa-swimming-pool" },
      { text: "television", icon: "fas fa-tv" },
      { text: "no smoking", icon: "fas fa-smoking-ban" },
      { text: "private bath", icon: "fas fa-bath" }
    ],
    exServices: [{ text: "breakfast" }, { text: "car rental" }]
  },
  {
    img: "./img/room2.jpg",
    name: "Double Room",
    guests: "2",
    size: "20",
    price: "25",
    services: [
      { text: "swimming pool", icon: "fas fa-swimming-pool" },
      { text: "television", icon: "fas fa-tv" },
      { text: "private bath", icon: "fas fa-bath" }
    ],
    exServices: [{ text: "breakfast" }, { text: "laundry" }]
  },
  {
    img: "./img/room3.jpg",
    name: "Family Room",
    guests: "3",
    size: "30",
    price: "30",
    services: [
      { text: "swimming pool", icon: "fas fa-swimming-pool" },
      { text: "television", icon: "fas fa-tv" },
      { text: "no smoking", icon: "fas fa-smoking-ban" }
    ],
    exServices: [
      { text: "breakfast" },
      { text: "laundry" },
      { text: "car rental" }
    ]
  },
  {
    img: "./img/room5.jpg",
    name: "Room with View",
    guests: "4",
    size: "40",
    price: "120",
    services: [
      { text: "swimming pool", icon: "fas fa-swimming-pool" },
      { text: "no smoking", icon: "fas fa-smoking-ban" },
      { text: "private bath", icon: "fas fa-bath" }
    ],
    exServices: [{ text: "breakfast" }]
  }
];

dateContainer.addEventListener("change", () => {
  const filteredData = filterData();
  fillData(filteredData);
});

function filterData() {
  let filteredArray = [];
  let checker = (arr, target) => target.every(v => arr.includes(v));
  const services = Array.from(
    document.querySelectorAll('input[name="services"]:checked')
  ).map(el => el.value);
  const exServices = Array.from(
    document.querySelectorAll('input[name="ex-services"]:checked')
  ).map(el => el.value);

  filteredArray = rooms.filter(el => {
    let elServices = el.services.map(s => {
      return s.text;
    });
    let elExServices = el.exServices.map(es => {
      return es.text;
    });
    if (
      checker(elServices, services) &&
      checker(elExServices, exServices) &&
      parseInt(el.price) <= parseInt(priceRange.value)
    ) {
      return el;
    }
  });
  return filteredArray;
}

function fillData(data) {
  roomsContainer.innerHTML = "";
  if (data.length == 0) {
    let markup = `<p class ="error"> No results for this search!</p>`;
    roomsContainer.insertAdjacentHTML("beforeend", markup);
  }
  data.forEach(el => {
    let iconsMarkup = "";
    el.services.forEach(s => {
      iconsMarkup += `
      <div class="icon">
        <i class ="${s.icon}"></i>
        <span class="info upcase">${s.text}</span>
      </div>
      `;
    });
    markup = `
    <div class="card" >
      <div class="photo img-cover">
        <img src="${el.img}" alt="room5">
      </div>
      <div class="disc">
        <h2>${el.name}</h2>
        <div class="icons">
          <span class ="upcase"><i class="far fa-user"></i>${
            el.guests
          } Guests</span>
          <span lass ="upcase"><i class="fas fa-border-none"></i>${
            el.size
          } m<sup>2</sup></span c>
        </div>
        <p class ="grey">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel molestie nisl. Duis ac mi leo.</p>
        <div class="link-wrapper">
          <a href="#" class="upcase btn brown-border">Book now from ${el.price *
            nights.value}$</a>
        </div>
        <div class="room-services">
          <div class="icons">
            ${iconsMarkup}
          </div>
          <a href="room.html"><span class="upcase grey">Full info <i class="fas fa-chevron-right"></i></span></a>
        </div>
      </div>
    </div>
    `;
    roomsContainer.insertAdjacentHTML("beforeend", markup);
  });
}

fillData(rooms);

const price = document.getElementById("priceValue");
const filler = document.querySelector(".range div");
priceRange.oninput = () => {
  price.innerHTML = `${priceRange.value}$`;
  let min = priceRange.min;
  let max = priceRange.max;
  let range = Math.round(max - min);
  let percentage = Math.round(((priceRange.value - min) * 100) / range);
  filler.style.width = `${percentage}%`;
};

priceRange.onchange = () => {
  const filteredData = filterData();
  fillData(filteredData);
};

const filter = document.querySelector(".filters");

filter.onclick = e => {
  if (e.target.tagName != "I") {
    return;
  }
  const parent = e.target.parentElement;
  const list = parent.nextElementSibling;
  list.classList.toggle("list-active");

  list.onclick = e => {
    if (e.target.tagName != "INPUT") {
      return;
    }
    const filteredData = filterData();
    fillData(filteredData);
  };
};

// Sorting

function compare(a, b, rev = 1, key) {
  let comparison = 0;
  let fieldA = parseInt(a[key]);
  let fieldB = parseInt(b[key]);

  if (fieldA > fieldB) {
    comparison = 1;
  } else if (fieldB > fieldA) {
    comparison = -1;
  }
  return comparison * rev;
}

const filterButtons = document.querySelectorAll(".expand-menu a");
sorting.onclick = e => {
  e.preventDefault();
  const target = e.target;
  if (target.tagName != "A") {
    return;
  }
  const key = target.dataset.key;
  const rev = target.dataset.sort;
  const sortedArr = rooms.sort((a, b) => compare(a, b, rev, key));
  filterButtons.forEach(el => el.classList.remove("text-white"));
  target.classList.add("text-white");
  fillData(sortedArr);
};
