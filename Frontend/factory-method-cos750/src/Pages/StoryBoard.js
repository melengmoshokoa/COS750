import React, { useState } from 'react';
import './StoryBoard.css';

// Factory Method Pattern Implementation
class StoryboardFactory {
  createStoryboard(type) {
    switch (type) {
      case 'PRODUCT':
        return new ProductStoryboard();
      case 'CREATOR':
        return new CreatorStoryboard();
      case 'CONCRETE_CREATOR':
        return new ConcreteCreatorStoryboard();
      case 'BIG_BUTTON':
        return new BigButtonStoryboard();
      default:
        return null;
    }
  }

  createExampleboard(type) {
    switch (type) {
      case 'PIZZA':
        return new Pizzaboard();
      case 'COFFEE':
        return new Coffeeboard();
      case 'VEHICLES':
        return new Vehiclesboard();
      case 'SHAPES':
        return new Shapesboard();
      case 'DOC':
        return new Docsboard();
      case 'EMAILS':
        return new Emailboard();
      default:
        return null;
    }
  }
}

class ProductStoryboard {
  getTitle() { return "PRODUCT"; }
  getIcon() { return "🍩"; }
  getDescription() {
    return "The Product interface declares operations that all concrete products must implement. It's what gets manufactured!";
  }
  getCodeExample() {
    return `interface Product {
  operation(): string;
}

class ConcreteProductA implements Product {
  operation(): string {
    return "Result of ProductA";
  }
}`;
  }
  getColor() { return "#ff6b35"; }
  getDiagram() {
    return `
    ┌─────────────┐
    │   Product   │ (interface)
    └─────────────┘
          △
          │
    ┌─────┴──────┐
    │            │
ConcreteA    ConcreteB
`;
  }
}

class CreatorStoryboard {
  getTitle() { return "CREATOR"; }
  getIcon() { return "👷"; }
  getDescription() {
    return "The Creator class declares the factory method that returns new Product objects. Subclasses override this method.";
  }
  getCodeExample() {
    return `abstract class Creator {
  abstract factoryMethod(): Product;
  
  someOperation(): string {
    const product = this.factoryMethod();
    return product.operation();
  }
}`;
  }
  getColor() { return "#f7931e"; }
  getDiagram() {
    return `
    ┌─────────────┐
    │   Creator   │
    │ factoryMethod() │
    └─────────────┘
          △
          │
   ConcreteCreator
`;
  }
}

class ConcreteCreatorStoryboard {
  getTitle() { return "CONCRETE CREATOR"; }
  getIcon() { return "⚙️"; }
  getDescription() {
    return "Concrete Creators override the factory method to return different types of products. Each creator specializes in making specific products!";
  }
  getCodeExample() {
    return `class ConcreteCreatorA extends Creator {
  factoryMethod(): Product {
    return new ConcreteProductA();
  }
}

class ConcreteCreatorB extends Creator {
  factoryMethod(): Product {
    return new ConcreteProductB();
  }
}`;
  }
  getColor() { return "#fdc830"; }
  getDiagram() {
    return `
Creator → factoryMethod()
    ↓
ConcreteCreatorA → ProductA
ConcreteCreatorB → ProductB
`;
  }
}

class BigButtonStoryboard {
  getTitle() { return "CLIENT CODE"; }
  getIcon() { return "🔘"; }
  getDescription() {
    return "The client code works with creators through their base interface. It doesn't need to know which concrete creator it's using!";
  }
  getCodeExample() {
    return `function clientCode(creator: Creator) {
  console.log("Client: I'm not aware of the creator's class");
  console.log(creator.someOperation());
}

clientCode(new ConcreteCreatorA());
clientCode(new ConcreteCreatorB());`;
  }
  getColor() { return "#ff8c42"; }
  getDiagram() {
    return `
Client
  ↓
Creator (interface)
  ↓
ConcreteCreator
  ↓
Product
`;
  }
}

class Pizzaboard {
  getTitle() { return "PIZZA"; }
  getIcon() { return "🍕"; }
  getDescription() {
    return "Cheesy, Saucy, and Automatically Delivered 🍕......";
  }
  getCodeExample() {
    return `interface Pizza {
  prepare(): string;
  bake(): string;
  cut(): string;
}

class MargheritaPizza implements Pizza {
  prepare() { return "Adding tomato sauce and mozzarella"; }
  bake() { return "Baking at 450°F for 12 minutes"; }
  cut() { return "Cutting into 8 slices"; }
}`;
  }
  getColor() { return "#ff6b35"; }
  getDiagram() {
    return `
PizzaFactory
    ↓
createPizza(type)
    ↓
┌────────────────┬────────────────┐
Margherita     Pepperoni      Veggie
`;
  }
}

class Coffeeboard {
  getTitle() { return "COFFEE"; }
  getIcon() { return "☕"; }
  getDescription() {
    return "Espresso Yourself ☕......";
  }
  getCodeExample() {
    return `interface Coffee {
  brew(): string;
}

class Espresso implements Coffee {
  brew() { return "Pulling a shot of espresso"; }
}

class Latte implements Coffee {
  brew() { return "Brewing espresso + steamed milk"; }
}`;
  }
  getColor() { return "#8B4513"; }
  getDiagram() {
    return `
CoffeeFactory
    ↓
createCoffee(type)
    ↓
┌────────────────┬────────────────┐
Espresso       Latte        Cappuccino
`;
  }
}

class Vehiclesboard {
  getTitle() { return "VEHICLES"; }
  getIcon() { return "🚗"; }
  getDescription() {
    return "Cars, Bikes, and Zoom Zoom 🚗.......";
  }
  getCodeExample() {
    return `interface Vehicle {
  drive(): string;
}

class Car implements Vehicle {
  drive() { return "Driving on 4 wheels"; }
}

class Bike implements Vehicle {
  drive() { return "Riding on 2 wheels"; }
}`;
  }
  getColor() { return "#4169E1"; }
  getDiagram() {
    return `
VehicleFactory
    ↓
createVehicle(type)
    ↓
┌────────────────┬────────────────┐
Car            Bike         Truck
`;
  }
}

class Shapesboard {
  getTitle() { return "SHAPES"; }
  getIcon() { return "⬛"; }
  getDescription() {
    return "Squares, Circles, Triangles — Oh My! 🔺⭕⬛......";
  }
  getCodeExample() {
    return `interface Shape {
  draw(): string;
  area(): number;
}

class Circle implements Shape {
  constructor(radius) { this.radius = radius; }
  draw() { return "Drawing a circle"; }
  area() { return Math.PI * this.radius ** 2; }
}`;
  }
  getColor() { return "#9370DB"; }
  getDiagram() {
    return `
ShapeFactory
    ↓
createShape(type)
    ↓
┌────────────────┬────────────────┐
Circle         Square       Triangle
`;
  }
}

class Docsboard {
  getTitle() { return "DOC"; }
  getIcon() { return "📄"; }
  getDescription() {
    return "PDFs, DOCs, XLSs… and Endless Paperwork 📄........";
  }
  getCodeExample() {
    return `interface Document {
  open(): string;
  save(): string;
}

class PDFDocument implements Document {
  open() { return "Opening PDF viewer"; }
  save() { return "Saving as .pdf"; }
}`;
  }
  getColor() { return "#DC143C"; }
  getDiagram() {
    return `
DocumentFactory
    ↓
createDocument(type)
    ↓
┌────────────────┬────────────────┐
PDF            DOCX         XLSX
`;
  }
}

class Emailboard {
  getTitle() { return "EMAILS"; }
  getIcon() { return "🔔"; }
  getDescription() {
    return "Bing, Ping, Ding! 🔔.......";
  }
  getCodeExample() {
    return `interface Notification {
  send(): string;
}

class EmailNotification implements Notification {
  send() { return "Sending email notification"; }
}

class SMSNotification implements Notification {
  send() { return "Sending SMS notification"; }
}`;
  }
  getColor() { return "#FF1493"; }
  getDiagram() {
    return `
NotificationFactory
    ↓
createNotification(type)
    ↓
┌────────────────┬────────────────┐
Email          SMS          Push
`;
  }
}

export default function InteractiveStoryBoardMain() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [notes, setNotes] = useState({});
  const [currentNote, setCurrentNote] = useState('');
  const [isExample, setIsExample] = useState(false);

  const factory = new StoryboardFactory();

  const storyboards = [
    { type: 'PRODUCT', name: "PRODUCT" },
    { type: 'BIG_BUTTON', name: "CLIENT CODE" },
    { type: 'CREATOR', name: "CREATOR" },
    { type: 'CONCRETE_CREATOR', name: "CONCRETE CREATOR" },
  ];

  const exampleboards = [
    { type: 'PIZZA', name: "PIZZA" },
    { type: 'COFFEE', name: "COFFEE" },
    { type: 'VEHICLES', name: "VEHICLES" },
    { type: 'SHAPES', name: "SHAPES" },
    { type: 'DOC', name: "DOC" },
    { type: 'EMAILS', name: "EMAILS" },
  ];

  const handleCardClick = (type, isExampleBoard = false) => {
    setIsAnimating(true);
    setTimeout(() => {
      const storyboard = isExampleBoard 
        ? factory.createExampleboard(type)
        : factory.createStoryboard(type);
      setSelectedCard(storyboard);
      setIsExample(isExampleBoard);
      setCurrentNote(notes[type] || '');
      setIsAnimating(false);
    }, 300);
  };

  const handleBack = () => {
    if (selectedCard) {
      const allBoards = isExample ? exampleboards : storyboards;
      const cardType = allBoards.find(
        s => {
          const board = isExample 
            ? factory.createExampleboard(s.type)
            : factory.createStoryboard(s.type);
          return board?.getTitle() === selectedCard.getTitle();
        }
      )?.type;

      if (cardType) {
        setNotes({ ...notes, [cardType]: currentNote });
      }
    }

    setIsAnimating(true);
    setTimeout(() => {
      setSelectedCard(null);
      setIsExample(false);
      setIsAnimating(false);
    }, 300);
  };

  const handleNoteChange = (e) => {
    setCurrentNote(e.target.value);
  };

  return (
    <div className="container">
      <div className={`frame ${isAnimating ? 'animating' : ''}`}>
        {!selectedCard ? (
          <div className="scrollable-content">
            <div className="title">
              <h1 className="main-title">FACTORY METHOD</h1>
              <h2 className="main-title">ADVENTURES</h2>
              <p className="subtitle">Interactive Storyboards</p>
              <p className="tagline">Objects</p>
            </div>

            <div className="list-container">
              {storyboards.map((s, index) => {
                const tempStoryboard = factory.createStoryboard(s.type);
                const hasNotes = notes[s.type] && notes[s.type].trim().length > 0;

                return (
                  <div
                    key={index}
                    className="card-list"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => handleCardClick(s.type, false)}
                  >
                    <div className="icon-container">{tempStoryboard.getIcon()}</div>
                    <div className="card-content">
                      <p className="card-text">{s.name}</p>
                      <div className="click-hint">Click to explore →</div>
                    </div>
                    {hasNotes && <div className="note-badge">📝 Notes</div>}
                  </div>
                );
              })}
            </div>

            <div className="title">
              <p className="subtitle">Real-Life Examples</p>
              <p className="tagline">"Don't just read about factory design patterns — play with them! Click through storyboards, trigger a visual explanations, and discover how objects communicate inside real-world systems, and take notes ;."</p>
            </div>
            
            <div className="list-container">
              {exampleboards.map((s, index) => {
                const tempStoryboard = factory.createExampleboard(s.type);
                const hasNotes = notes[s.type] && notes[s.type].trim().length > 0;

                return (
                  <div
                    key={index}
                    className="card-list"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => handleCardClick(s.type, true)}
                  >
                    <div className="icon-container">{tempStoryboard.getIcon()}</div>
                    <div className="card-content">
                      <p className="card-text">{s.name}</p>
                      <div className="click-hint">Click to explore →</div>
                    </div>
                    {hasNotes && <div className="note-badge">📝 Notes</div>}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="detail-view">
            <button className="back-button" onClick={handleBack}>
              ← BACK
            </button>

            <div className="content-wrapper">
              {/* Left side - Content */}
              <div className="left-panel">
                <div
                  className="detail-header"
                  style={{ borderColor: selectedCard.getColor() }}
                >
                  <div className="detail-icon">{selectedCard.getIcon()}</div>
                  <h1
                    className="detail-title"
                    style={{ color: selectedCard.getColor() }}
                  >
                    {selectedCard.getTitle()}
                  </h1>
                </div>

                <div className="detail-content">
                  <div className="section">
                    <h3 className="section-title">📖 WHAT IS IT?</h3>
                    <p className="description">{selectedCard.getDescription()}</p>
                  </div>

                  <div className="section">
                    <h3 className="section-title">📊 DIAGRAM</h3>
                    <pre className="diagram-block">
                      <code className="code">{selectedCard.getDiagram()}</code>
                    </pre>
                  </div>

                  <div className="section">
                    <h3 className="section-title">💻 CODE EXAMPLE</h3>
                    <pre className="code-block">
                      <code className="code">{selectedCard.getCodeExample()}</code>
                    </pre>
                  </div>
                </div>
              </div>

              {/* Right side - Notepad */}
              <div className="notepad-container">
                <div className="notepad-header">
                  <div className="spiral-binding">
                    {[...Array(12)].map((_, i) => (
                      <div key={i} className="spiral-hole"></div>
                    ))}
                  </div>
                </div>
                <div className="notepad-body">
                  <textarea
                    value={currentNote}
                    onChange={handleNoteChange}
                    placeholder="Type your notes here..."
                    className="textarea"
                  />
                  <button
                    className="download-button"
                    onClick={() => {
                      const blob = new Blob([currentNote], { type: 'text/plain' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `${selectedCard.getTitle()}_notes.txt`;
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                  >
                    ⬇ SAVE
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="footer">
        <p className="footer-text">
          Design Pattern: Factory Method | Created with React
        </p>
      </div>
    </div>
  );
}