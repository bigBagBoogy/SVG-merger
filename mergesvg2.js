const fs = require("fs");
let combinedSVG;

function combineSVGs() {
  // Read SVG content from files
  // const svg1 = fs.readFileSync("01subjects/bearblack.svg", "utf8");
  // const svg2 = fs.readFileSync("01subjects/bearwhite.svg", "utf8");
  const svg1 = fs.readFileSync(
    "01backgrounds/dark-to-green-to camel.svg",
    "utf8"
  );
  const svg2 = fs.readFileSync("01subjects/bearwhite.svg", "utf8");

  //   console.log("SVG 1:");
  //   console.log(svg1);
  //   console.log("SVG 2:");
  //   console.log(svg2);

  // Extract style and path elements as text
  const style1Text = svg1.match(/<style[^>]*>[\s\S]*?<\/style>/i);
  const style2Text = svg2.match(/<style[^>]*>[\s\S]*?<\/style>/i);
  // syntax for checking for a path element with the dualistic outcome for it being  an empty string or the text-content of the path including tags
  let path1Text = "";
  let clonedPath1Text = "no path";
  if (svg1.match(/<path[^>]*\/?>/i) !== null) {
    path1TextObject = svg1.match(/<path[^>]*\/?>/i);
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
  // console.log("path2Text: ", path2Text);
  console.log(clonedPath1Text);
  console.log(clonedPath2Text);

  // const path1TextWithoutAlltheExtraStuff = path1Text[0];
  // console.log(path1TextWithoutAlltheExtraStuff);
  // const path2Text = svg2.match(/<path[^>]*\/?>/i);
  // const path2TextWithoutAlltheExtraStuff = path2Text[0];
  // console.log(path2TextWithoutAlltheExtraStuff);
  //   const circle1Text = svg1.match(/<circle[^>]*\/?>/i);
  //   const circle1TextWithoutAlltheExtraStuff = circle1Text[0];
  //   console.log(circle1TextWithoutAlltheExtraStuff);

  //   const radialGradient1Text = svg1.match(
  //     /<radialGradient[^>]*>[\s\S]*?<\/radialGradient>/i
  //   );
  //   const radialGradient1TextWithoutAlltheExtraStuff = radialGradient1Text[0];
  //   console.log(radialGradient1TextWithoutAlltheExtraStuff);

  // Check if the matched elements exist
  if (style1Text && style2Text && path1Text && path2Text) {
    // Clone the style elements and adjust their class names
    let clonedStyle1Text = style1Text[0].replace(/\.cls-1/g, ".cls-1");
    let clonedStyle2Text = style2Text[0].replace(/\.cls-1/g, ".cls-2");
    // Clone the path elements

    // Create a new SVG with the combined elements
    if (clonedPath1Text == "no path") {
      console.log("1");
      combinedSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" width="2000" height="2000" viewBox="0 0 2000 2000">
      <defs>
        ${clonedStyle1Text}
        ${clonedStyle2Text}
      </defs>      
      ${clonedPath2Text}
    </svg>
  `;
    }
    if (clonedPath2Text == "no path") {
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
  } else {
    console.error("Error: SVG content not found or is invalid.");
  }
}
combineSVGs();
