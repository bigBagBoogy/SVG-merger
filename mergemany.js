const fs = require("fs");
const path = require("path");

let svg1; // Declare svg1 and svg2 in a higher scope
let svg2;

// Define the folder where your SVG files are located
const folderPathBackgrounds = "01backgrounds";

// Read the contents of the folder
fs.readdir(folderPathBackgrounds, (err, files) => {
  if (err) {
    console.error("Error reading folder:", err);
    return;
  }

  // Filter out only SVG files (you can adjust the filter as needed)
  const svgFiles = files.filter((file) => path.extname(file) === ".svg");

  // Check if there are any SVG files in the folder
  if (svgFiles.length === 0) {
    console.error("No SVG files found in the folder.");
    return;
  }

  // Generate a random index to select a file
  const randomIndex = Math.floor(Math.random() * svgFiles.length);

  // Get the randomly selected SVG file name
  const randomlySelectedFile = svgFiles[randomIndex];

  // Create the full file path
  const filePath = path.join(folderPathBackgrounds, randomlySelectedFile);

  // Read the contents of the randomly selected SVG file
  svg1 = fs.readFileSync(filePath, "utf8");

  // Now you can work with the contents of svg1
  console.log("Randomly selected file:", randomlySelectedFile);
  console.log(`"SVG 1 Content:" ${svg1}`);
});
//////////////////////////////////////////////////
/////////////////////subject//////////////////////
//////////////////////////////////////////////////

const folderPathSubjects = "01subjects";

// Read the contents of the folder
fs.readdir(folderPathSubjects, (err, files) => {
  if (err) {
    console.error("Error reading folder:", err);
    return;
  }

  // Filter out only SVG files (you can adjust the filter as needed)
  const svgFiles = files.filter((file) => path.extname(file) === ".svg");

  // Check if there are any SVG files in the folder
  if (svgFiles.length === 0) {
    console.error("No SVG files found in the folder.");
    return;
  }

  // Generate a random index to select a file
  const randomIndex = Math.floor(Math.random() * svgFiles.length);

  // Get the randomly selected SVG file name
  const randomlySelectedFile = svgFiles[randomIndex];

  // Create the full file path
  const filePath = path.join(folderPathSubjects, randomlySelectedFile);

  // Read the contents of the randomly selected SVG file
  svg2 = fs.readFileSync(filePath, "utf8");

  // Now you can work with the contents of svg1
  console.log("Randomly selected file:", randomlySelectedFile);
  console.log(`"SVG 2 Content:" ${svg2}`);
  combineSVGs();
});
function combineSVGs() {
  const style1Text = svg1.match(/<style[^>]*>[\s\S]*?<\/style>/i);
  const style2Text = svg2.match(/<style[^>]*>[\s\S]*?<\/style>/i);

  const path1Text = svg1.match(/<path[^>]*\/?>/i);
  const path1TextWithoutAlltheExtraStuff = path1Text[0];
  // console.log(path1TextWithoutAlltheExtraStuff);
  const path2Text = svg2.match(/<path[^>]*\/?>/i);
  const path2TextWithoutAlltheExtraStuff = path2Text[0];
  // console.log(path2TextWithoutAlltheExtraStuff);

  // Check if the matched elements exist
  if (
    style1Text &&
    style2Text &&
    path1TextWithoutAlltheExtraStuff &&
    path2TextWithoutAlltheExtraStuff
  ) {
    // Clone the style elements and adjust their class names
    const clonedStyle1Text = style1Text[0].replace(/\.cls-1/g, ".cls-1");
    const clonedStyle2Text = style2Text[0].replace(/\.cls-1/g, ".cls-2");

    // Clone the path elements
    const clonedPath1Text = path1TextWithoutAlltheExtraStuff.replace(
      /cls-1/g, // Remove the dot here
      "cls-1"
    );
    const clonedPath2Text = path2TextWithoutAlltheExtraStuff.replace(
      /cls-1/g, // Remove the dot here
      "cls-2"
    );

    // Create a new SVG with the combined elements
    const combinedSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" width="2000" height="2000" viewBox="0 0 2000 2000">
      <defs>
        ${clonedStyle1Text}
        ${clonedStyle2Text}
      </defs>
      ${clonedPath1Text}
      ${clonedPath2Text}
    </svg>
  `;

    // Now, 'combinedSVG' contains the modified SVG content
    // Write the combined SVG to a new file
    fs.writeFileSync("output.svg", combinedSVG, "utf8");

    console.log("Combined SVG created successfully! --> Check output.svg");
  } else {
    console.error("Error: SVG content not found or is invalid.");
  }
}
