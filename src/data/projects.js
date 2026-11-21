// Project list. "featured" projects are shown as cards in the projects box (in this order).
// Edit the text here — no need to touch the component.
// "learned": fill in what you learned building each project (shown only when not empty).

const img = (file) =>
  new URL(`../assets/img/projects/${file}`, import.meta.url).href;

export default [
  {
    title: "map builder",
    featured: true,
    description:
      "An isometric 3D map editor for tabletop RPGs: place blocks, save and export maps, and present them in a VHS-style Player mode.",
    learned: "",
    tech: ["TypeScript", "Three.js"],
    demo: "https://liza-uchaneva.github.io/mork-borg-map-builder/",
    source: "https://github.com/liza-uchaneva/mork-borg-map-builder",
    img: img("map-builder.png"),
  },
  {
    title: "africa",
    featured: true,
    description:
      "A multi-section travel landing page for African tours with a contact form that saves visitor applications through a .NET Web API. Deployed on Azure.",
    learned: "",
    tech: ["Vue 3", "SCSS", "ASP.NET Core", "EF Core", "SQL Server", "Azure"],
    demo: "https://africa-wabapp-aaczhgdrfxcqfabf.westus3-01.azurewebsites.net",
    source: "https://github.com/Africaorganization/africa",
    img: img("africa.png"),
  },
  {
    title: "facewatch",
    featured: true,
    description:
      "A Pebble watchface whose face smiles or frowns depending on how today's steps compare to your average. Published on the Rebble App Store.",
    learned: "",
    tech: ["C", "Pebble SDK"],
    demo: "https://apps.rebble.io/en_US/application/691cc106f5dd2700091a4fe2",
    source: "https://github.com/liza-uchaneva/facewatch_pebble",
    img: img("Pebble.png"),
  },
  {
    title: "ghostgame",
    featured: true,
    description:
      "A catch-the-ghost arcade game set in a haunted house drawn entirely in CSS.",
    learned: "",
    tech: ["Vue 3", "SCSS"],
    demo: "https://liza-uchaneva.github.io/GhostGame/",
    source: "https://github.com/liza-uchaneva/GhostGame",
    img: img("ghost.png"),
  },
  {
    title: "weather API",
    description:
      "A weather forecast app with daily and hourly forecasts and a temperature chart.",
    learned: "",
    tech: ["JavaScript", "Chart.js", "Visual Crossing API"],
    demo: "https://liza-uchaneva.github.io/WeatherApp_TheOdinProject-/",
    source: "https://github.com/liza-uchaneva/WeatherApp_TheOdinProject-",
    img: img("weather.jpg"),
  },
  {
    title: "library",
    description:
      "A personal book library: add books, mark them as read and remove them.",
    learned: "",
    tech: ["JavaScript", "HTML", "CSS"],
    demo: "https://liza-uchaneva.github.io/Library_TheOdinProject/",
    source: "https://github.com/liza-uchaneva/Library_TheOdinProject",
    img: img("library.png"),
  },
];
