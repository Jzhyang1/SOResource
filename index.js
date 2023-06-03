const all_tests = resources;
const all_events = [
  ...new Set(all_tests.map((t) => t.event.toUpperCase())),
].sort();
const yearToday = new Date().getFullYear();
const now_tests = all_tests.filter((t) =>
  t.year.split("-").includes(yearToday)
);
const now_events = [
  ...new Set(now_tests.map((t) => t.event.toUpperCase())),
].sort();
let anyYear = true;

function tests() {
  return anyYear ? all_tests : now_tests;
}
function events() {
  return anyYear ? all_events : now_events;
}

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

document
  .getElementById("current-events-only-toggle")
  .addEventListener("change", (e) => {
    anyYear = !e.currentTarget.checked;
  });

function clickedOnTopic(self, topic) {
  return () => {
    if (self.classList.contains("active")) {
      self.classList.remove("active");
    } else {
      self.classList.add("active");
      const resultList = document.getElementById("result-list");
      switch (primary) {
        case 1: {
          tests().forEach((test) => {
            if (test.event.toUpperCase() == topic) {
              const result = document.createElement("li");
              result.innerHTML = `
                ${test.event}: ${test.tournament} ${test.year}: 
                <a href="${test.link}" target = "_blank">${test.type}</a> 
                ${
                  test.key
                    ? `<a href="${test.key}" target = "_blank">key</a>`
                    : ""
                }
                ${
                  test["answer sheet"]
                    ? `<a href="${test["answer sheet"]}" target = "_blank">answer sheet</a>`
                    : ""
                }
                <br/>
                <div class="sub-content">
                  ${test.notes ? test.notes + "<br/>" : ""}
                  ${
                    test.links
                      ? test.links
                          .map((link, i) => `<a href=${link}>link-${i}</a>`)
                          .join(", ")
                      : ""
                  }
                </div>
              `;
              resultList.appendChild(result);
            }
          });
        }
      }
    }
  };
}

document.getElementById("secondary-text").addEventListener("keyup", (event) => {
  if (event.isComposing || event.keyCode === 229) {
    return;
  }

  let values = document.getElementById("secondary-text").value.split(";");
  let results = events().filter((s) =>
    values.some((value) => s.toUpperCase().startsWith(value.toUpperCase()))
  );
  console.log(results);

  let display = document.getElementById("secondary-list");
  removeAllChildNodes(display);
  for (const result of results) {
    let topic = `topic${result}`;
    let a = document.createElement("button");

    // a.type = "button";
    a.classList.add("btn", "btn-outline-primary");
    a.innerText = result;
    a.id = topic;
    a.onclick = clickedOnTopic(a, result);

    display.appendChild(a);
  }
});
