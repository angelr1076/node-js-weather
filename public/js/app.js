console.log("Client side JavaScript file is loaded!");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#location");
const messageTwo = document.querySelector("#forecast");
const messageThree = document.querySelector("#alerts");
const weatherIcon = document.querySelector("#icon");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();
  const location = search.value;
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  const setSkyCon = (icon, iconID) => {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  };

  fetch(`http://localhost:3000/weather?address=${location}`)
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
        //Set Icon
        setSkyCon(data.icon, weatherIcon);
        messageThree.textContent = `Weather alert: ${data.alerts}`;
      }
    });
});
