events = [
  "A is for Anatomy",
  "Aerial Scramble",
  "Agriscience",
  "Air Trajectory",
  "Amazing Mechatronics",
  "Amphibians & Reptiles",
  "Anatomy & Physiology",
  "Anatomy and Physiology",
  "Astronomy",
  "Awesome Aquifers",
  "Balancing Equations",
  "Balloon Race",
  "Bio-Process Lab",
  "Birds",
  "Boomi-Lever",
  "Boomilever",
  "Botany",
  "Bottle Rocket",
  "Bridge",
  "Bridge Building",
  "Bungee Drop",
  "Bungee Egg Drop",
  "Calorimeter",
  "Can't Judge a Powder",
  "Cell Biology",
  "Chemical ID",
  "Chemistry Clue",
  "Chemistry Lab",
  "Circuit Lab",
  "Code Busters",
  "Codebusters",
  "Compound Machines",
  "Compute This",
  "Computer Programming",
  "Cow-A-Bungee",
  "Cybersecurity",
  "Designer Genes",
  "Detector Building",
  "Digital Structures",
  "Dinosaurs",
  "Disease Detectives",
  "Don't Bug Me",
  "Dynamic Planet",
  "Earth Science Lab",
  "Earth Science Processes",
  "Earth, Sea, and Sky",
  "Ecology",
  "Egg Drop",
  "Egg-O-Naut",
  "Elastic Launch Glider",
  "Elastic Launched Glider",
  "Electric Vehicle",
  "Electric Wright Stuff",
  "Elevated Bridge",
  "Endangered, Exotic, Extinct",
  "Energy Contest",
  "Entomology",
  "Environmental Chemistry",
  "Evolution",
  "Experimental Design",
  "Facts in Five",
  "Feathered Frenzy",
  "Fermi Questions",
  "Five Star Science",
  "Flight",
  "Flying Bird",
  "Food Science",
  "For The Birds",
  "Forensics",
  "Forestry",
  "Fossils",
  "From A Distance",
  "Game On",
  "GeoLogic Mapping",
  "Geologic Mapping",
  "Get Your Bearing",
  "Gravity Vehicle",
  "Green Generation",
  "Health Science",
  "Helicopter",
  "Helicopters",
  "Herpetology",
  "Home Horticulture",
  "Hovercraft",
  "Hydrogeology",
  "Indoor Bottle Rockets",
  "Invasive Species",
  "It's About Time",
  "Junkyard Challenge",
  "Kite Flying",
  "Laser Shoot",
  "Machines",
  "MagLev",
  "Mammals",
  "Map Reading",
  "Map-It",
  "Materials Science",
  "Measurement",
  "Metric Estimation",
  "Metric Mastery",
  "Metric estimation",
  "Microbe Mission",
  "Mission Possible",
  "Model This",
  "Mousetrap Vehicle",
  "Mystery Architecture",
  "Mystery Design",
  "Name That Artifact",
  "Name That Organism",
  "Nature Quest",
  "Oceanography",
  "Optics",
  "Orienteering",
  "Ornithology",
  "Out and Back",
  "Paper Airplane",
  "Password",
  "Pentathlon",
  "Periodic Table Quiz",
  "Physics Lab",
  "Picture This",
  "Ping Pong Parachute",
  "Polymer Detective",
  "Practical Data Gathering",
  "Practical Data Solving",
  "Propeller Propulsion",
  "Protein Modeling",
  "Qualitative Analysis",
  "Reach for the Stars",
  "Redesigned Genes",
  "Remote Sensing",
  "Road Rally",
  "Road Scholar",
  "Robot Arm",
  "Robot Ramble",
  "Robot Tour",
  "Rocks & Minerals",
  "Rocks and Fossils",
  "Rocks and Minerals",
  "Rocks to Riches",
  "Rocks, Minerals, and Fossils",
  "Rube Goldberg Machine",
  "Science Bowl",
  "Science Clue",
  "Science of Fitness",
  "Scrambler",
  "Seven Up",
  "Solar Collector",
  "Solar Heating Contest",
  "Solar Power",
  "Sounds of Music",
  "Storm the Castle",
  "Sumo Bots",
  "Surfing the Net",
  "Technical Problem Solving",
  "Thermodynamics",
  "Tic Toc",
  "Titration Race",
  "Topographic Map Reading",
  "Tower Building",
  "Towers",
  "Trajectory",
  "Trajectory Contest",
  "Tree Identification",
  "Tree-mendous",
  "Up, Up, & Away",
  "Useful Plants",
  "Using the Web",
  "Water Creatures Challenge",
  "Water Quality",
  "Water Strider",
  "Water Striders",
  "Water, Water Everywhere",
  "What Are You Trying To Tell Me",
  "Wholey Moley",
  "WiFi Lab",
  "Wind Power",
  "Wright Stuff",
  "Wright Stuff Capacitor",
  "Write It CAD It",
  "Write It Do It",
];
event_keys = events.map((e) => e.toLowerCase());

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

let primary = 1;
let secondary = "";
let trigger_secondary = ["event", "event", "aevent", "aevent", "oevent"];

for (let i = 1; i <= trigger_secondary.length; ++i) {
  let docel = document.getElementById("resource" + i);
  ((index) => {
    docel.addEventListener("click", (event) => {
      secondary = trigger_secondary[index];
      document.getElementById("secondary-select").style.visibility = "visible";
      primary = index;
    });
  })(i);
}

document.getElementById("secondary-text").addEventListener("keyup", (event) => {
  if (event.isComposing || event.keyCode === 229) {
    return;
  }

  let values = document.getElementById("secondary-text").value.split(";");
  let results = events.filter((s) =>
    values.some((value) => s.toLowerCase().startsWith(value.toLowerCase()))
  );

  let display = document.getElementById("secondary-list");
  removeAllChildNodes(display);
  for (const result of results) {
    let topic = `topic${result}`;
    let a = document.createElement("input", {
      type: "radio",
      class: "btn-check",
      name: "btnradio",
      id: topic,
      autocomplete: "off",
    });

    a.type = "radio";
    a.classList.add("btn-check");
    a.name = "btnradio";
    a.name = topic;

    let b = document.createElement("label", {
      class: "btn btn-outline-primary",
      for: topic,
    });

    b.classList.add("btn", "btn-outline-primary");
    b.for = topic;
    b.innerText = result;

    display.appendChild(a);
    display.appendChild(b);
  }
});
