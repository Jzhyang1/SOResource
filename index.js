let all_tests, events;

async function init() {
  all_tests = await fetch("tests.json/", {});
  console.log(all_tests);
  events = new Set(all_tests.map((t) => t.event.toUpperCase()));
}
init();

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
    values.some((value) => s.toUpperCase().startsWith(value.toLowerCase()))
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
