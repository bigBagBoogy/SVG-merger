const fs = require("fs");

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

  const path1Text = svg1.match(/<path[^>]*\/?>/i);
  const path1TextWithoutAlltheExtraStuff = path1Text[0];
  // console.log(path1TextWithoutAlltheExtraStuff);
  const path2Text = svg2.match(/<path[^>]*\/?>/i);
  const path2TextWithoutAlltheExtraStuff = path2Text[0];
  // console.log(path2TextWithoutAlltheExtraStuff);
  const circle1Text = svg1.match(/<circle[^>]*\/?>/i);
  const circle1TextWithoutAlltheExtraStuff = circle1Text[0];
  console.log(circle1TextWithoutAlltheExtraStuff);

  const radialGradient1Text = svg1.match(
    /<radialGradient[^>]*>[\s\S]*?<\/radialGradient>/i
  );
  const radialGradient1TextWithoutAlltheExtraStuff = radialGradient1Text[0];
  console.log(radialGradient1TextWithoutAlltheExtraStuff);

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
combineSVGs();
