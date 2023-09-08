const fs = require("fs");
var combinedSVG;
var style1Text;
var style2Text;

function combineSVGs() {
  // Read SVG content from files
  const svg1 = fs.readFileSync("01backgrounds/green.svg", "utf8");
  const svg2 = fs.readFileSync("01subjects/bearwhite.svg", "utf8");
  // console.log("SVG 1:", svg1);
  // console.log("SVG 2:", svg2);

  // Extract style elements as text
  style1Text = svg1.match(/<style[^>]*>[\s\S]*?<\/style>/i); // this is an object
  // console.log(style1Text);
  style2Text = svg2.match(/<style[^>]*>[\s\S]*?<\/style>/i);

  // syntax for checking for a path element with the dualistic outcome for it being  an empty string or the text-content of the path including tags
  let path1Text = "";
  let clonedPath1Text = "no path"; // 1 will have no path
  if (svg1.match(/<path[^>]*\/?>/i) !== null) {
    const path1TextObject = svg1.match(/<path[^>]*\/?>/i);
    path1Text = path1TextObject;
    clonedPath1Text = path1Text.replace(/cls-1/g, "cls-1");
  }
  // console.log("path1Text: ", path1Text);
  let path2Text = "";
  let clonedPath2Text = "no path";
  if (svg2.match(/<path[^>]*\/?>/i) !== null) {
    // console.log("not null");
    const path2TextObject = svg2.match(/<path[^>]*\/?>/i);
    // console.log(path2TextObject);
    path2Text = path2TextObject[0];
    clonedPath2Text = path2Text.replace(/cls-1/g, "cls-2");
  }
  let circle1Text = "";
  let clonedCircle1Text = "no circle";
  if (svg1.match(/<circle[^>]*\/?>/i) !== null) {
    // console.log("not null");
    const circle1TextObject = svg1.match(/<circle[^>]*\/?>/i);
    // console.log(circle1TextObject);
    circle1Text = circle1TextObject[0];
    clonedCircle1Text = circle1Text.replace(/cls-1/g, "cls-1");
  }
  let radialGradient1Text = "";
  let clonedRadialGradient1Text = "no radialGradient";
  if (svg1.match(/<radialGradient[^>]*>[\s\S]*?<\/radialGradient>/i) !== null) {
    // console.log("not null");
    const radialGradient1TextObject = svg1.match(
      /<radialGradient[^>]*>[\s\S]*?<\/radialGradient>/i
    );
    // console.log(radialGradient1TextObject);
    radialGradient1Text = radialGradient1TextObject[0];
    clonedRadialGradient1Text = radialGradient1Text.replace(/cls-1/g, "cls-1");
  }

  concat(
    style1Text,
    style2Text,
    clonedPath1Text,
    clonedPath2Text,
    clonedCircle1Text,
    clonedRadialGradient1Text
  );
}
// Check if the matched elements exist
// if (style1Text && style2Text && path1Text && path2Text) {
// Clone the style elements and adjust their class names

// Clone the path elements
function concat(
  style1Text,
  style2Text,
  clonedPath1Text,
  clonedPath2Text,
  clonedCircle1Text,
  clonedRadialGradient1Text
) {
  // console.log(style1Text, style2Text, clonedPath1Text, clonedPath2Text);
  let clonedStyle1Text = style1Text[0].replace(/\.cls-1/g, ".cls-1");
  // console.log(clonedStyle1Text);
  let clonedStyle2Text = style2Text[0].replace(/\.cls-1/g, ".cls-2");
  // Create a new SVG with the combined elements
  if (clonedPath1Text == "no path") {
    console.log("1");
    combinedSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" width="2000" height="2000" viewBox="0 0 2000 2000">
      <defs>
        ${clonedStyle1Text}
        ${clonedStyle2Text}
        ${clonedRadialGradient1Text}
      </defs>   
      ${clonedCircle1Text}
      ${clonedPath2Text}
    </svg>
  `;
  } else if (clonedPath2Text == "no path") {
    console.log("2");
    combinedSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" width="2000" height="2000" viewBox="0 0 2000 2000">
      <defs>
        ${clonedStyle1Text}
        ${clonedStyle2Text}
      </defs>      
      ${clonedPath1Text}
    </svg>
  `;
  } else if (clonedPath1Text != "no path" && clonedPath2Text != "no path") {
    console.log("3");
    combinedSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" width="2000" height="2000" viewBox="0 0 2000 2000">
      <defs>
        ${clonedStyle1Text}
        ${clonedStyle2Text}
      </defs>
      ${clonedPath1Text}
      ${clonedPath2Text}
    </svg>
  `;
  }
  // Now, 'combinedSVG' contains the modified SVG content
  // Write the combined SVG to a new file
  fs.writeFileSync("output.svg", combinedSVG, "utf8");
  console.log("Combined SVG created successfully! --> Check output.svg");
  // } else {
  //   console.error("Error: SVG content not found or is invalid.");
  // }
}

combineSVGs();
