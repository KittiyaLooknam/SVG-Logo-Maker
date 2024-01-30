import inquirer from "inquirer";
import fs from 'fs';

class Svg {
  constructor() {
    this.textElement = '';
    this.shapeElement = '';
  }

  render() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">${this.shapeElement}${this.textElement}</svg>`;
  }

  setTextElement(text, color) {
    this.textElement = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${color}">${text}</text>`;
  }

  setShapeElement(shape) {
    this.shapeElement = shape.render();
  }
}

class Square {
  constructor() {
    this.color = '';
  }

  setColor(color) {
    this.color = color;
  }

  render() {
    return `<rect x="50" y="50" width="200" height="200" fill="${this.color}" />`;
  }
}

class Circle {
  constructor() {
    this.color = '';
  }

  setColor(color) {
    this.color = color;
  }

  render() {
    return `<circle cx="150" cy="100" r="100" fill="${this.color}" />`;
  }
}

class Triangle {
  constructor() {
    this.color = '';
  }

  setColor(color) {
    this.color = color;
  }

  render() {
    return `<polygon points="0,200 300,200 150,0" fill="${this.color}" />`;
  }
}

const questions = [
  {
    type: "input",
    name: "text",
    message: "TEXT: Enter up to (3) Characters:",
  },
  {
    type: "input",
    name: "textColor",
    message: "TEXT COLOR: Enter a color keyword (OR a hexadecimal number):",
  },
  {
    type: "input",
    name: "shapeColor",
    message: "SHAPE COLOR: Enter a color keyword (OR a hexadecimal number):",
  },
  {
    type: "list",
    name: "shape",
    message: "Choose which Pixel Image you would like?",
    choices: ["Circle", "Square", "Triangle"],
  },
];

function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, function(err) {
    if (err) throw err;
    console.log(`Generated ${fileName}`);
  });
}

async function init() {
  console.log("Starting init");
  const svgFile = "logo.svg";

  try {
    // Prompt the user for answers
    const answers = await inquirer.prompt(questions);

    const userText = answers.text;
    const userTextColor = answers.textColor;
    const userShapeType = answers.shape;
    const userShapeColor = answers.shapeColor;

    // Create a new Svg instance and add the shape and text elements to it
    const svg = new Svg();
    svg.setTextElement(userText, userTextColor);

    let userShape;
    if (userShapeType === "Square") {
      userShape = new Square();
    } else if (userShapeType === "Circle") {
      userShape = new Circle();
    } else if (userShapeType === "Triangle") {
      userShape = new Triangle();
    } else {
      console.log("Invalid shape!");
      return;
    }

    userShape.setColor(userShapeColor);
    svg.setShapeElement(userShape);
    const svgString = svg.render();

    // Write SVG to file
    writeToFile(svgFile, svgString);
  } catch (error) {
    console.error("Error:", error);
  }
}

init();
