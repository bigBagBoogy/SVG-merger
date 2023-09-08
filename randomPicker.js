const fs = require("fs");
const path = require("path");

// Define the folder where your SVG files are located
const folderPath = "backgrounds";

// Read the contents of the folder
fs.readdir(folderPath, (err, files) => {
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
  const filePath = path.join(folderPath, randomlySelectedFile);

  // Read the contents of the randomly selected SVG file
  const svg1 = fs.readFileSync(filePath, "utf8");

  // Now you can work with the contents of svg1
  console.log("Randomly selected file:", randomlySelectedFile);
  console.log("SVG 1 Content:");
  console.log(svg1);
});
