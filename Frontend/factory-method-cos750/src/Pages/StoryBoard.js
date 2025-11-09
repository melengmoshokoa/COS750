import React, { useState } from 'react';
import './StoryBoard.css';

// Factory Method Pattern Implementation
class StoryboardFactory {
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
  getNovelScenes() {
    return [
      {
        background: "🏪",
        character: "👨‍🍳",
        characterName: "Chef Mario",
        dialogue: "Welcome to Mario's Pizzeria! I'm Chef Mario, and today I'll teach you about the Factory Method pattern through pizza making!",
        choices: null
      },
      {
        background: "🏪",
        character: "👨‍🍳",
        characterName: "Chef Mario",
        dialogue: "You see, we get many different pizza orders every day. Margherita, Pepperoni, Veggie... How do we handle all these varieties efficiently?",
        choices: null
      },
      {
        background: "🏪",
        character: "👨‍🍳",
        characterName: "Chef Mario",
        dialogue: "That's where the Factory Method comes in! Instead of creating each pizza manually, we have a PizzaFactory that knows how to create any type of pizza.",
        choices: null
      },
      {
        background: "📋",
        character: "👨‍🍳",
        characterName: "Chef Mario",
        dialogue: "Let me show you. When an order comes in, we just call: pizzaFactory.createPizza('Margherita') and boom! The factory handles all the details.",
        choices: null
      },
      {
        background: "🍕",
        character: "👨‍🍳",
        characterName: "Chef Mario",
        dialogue: "Each pizza type implements the same Pizza interface: prepare(), bake(), and cut(). This means our kitchen staff can handle any pizza the same way!",
        choices: null
      },
      {
        background: "🏪",
        character: "👨‍🍳",
        characterName: "Chef Mario",
        dialogue: "Want to add a new pizza type? Just create a new class that implements the Pizza interface. The factory handles the rest. No need to change existing code!",
        choices: null
      },
      {
        background: "✨",
        character: "👨‍🍳",
        characterName: "Chef Mario",
        dialogue: "And that's the beauty of the Factory Method! It gives us flexibility to create objects without specifying their exact classes. Now you're ready to cook up some design patterns!",
        choices: null
      }
    ];
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
  const [currentScene, setCurrentScene] = useState(0);
  const [showNovel, setShowNovel] = useState(false);

  const factory = new StoryboardFactory();

  const exampleboards = [
    { type: 'PIZZA', name: "PIZZA" },
    { type: 'COFFEE', name: "COFFEE" },
    { type: 'VEHICLES', name: "VEHICLES" },
    { type: 'SHAPES', name: "SHAPES" },
    { type: 'DOC', name: "DOC" },
    { type: 'EMAILS', name: "EMAILS" },
  ];

  const handleCardClick = (type) => {
    setIsAnimating(true);
    setTimeout(() => {
      const storyboard = factory.createExampleboard(type);
      setSelectedCard(storyboard);
      setCurrentNote(notes[type] || '');
      setIsAnimating(false);
    }, 300);
  };

  const handleBack = () => {
    if (selectedCard) {
      const cardType = exampleboards.find(
        s => factory.createExampleboard(s.type)?.getTitle() === selectedCard.getTitle()
      )?.type;

      if (cardType) {
        setNotes({ ...notes, [cardType]: currentNote });
      }
    }

    setIsAnimating(true);
    setTimeout(() => {
      setSelectedCard(null);
      setShowNovel(false);
      setCurrentScene(0);
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
              <p className="subtitle">Real-Life Examples</p>
              <p className="tagline">"Don't just read about factory design patterns — play with them! Click through storyboards, experience visual novels, and discover how objects communicate inside real-world systems."</p>
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
                    onClick={() => handleCardClick(s.type)}
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

            {showNovel && selectedCard.getNovelScenes ? (
              <div className="visual-novel">
                {(() => {
                  const scenes = selectedCard.getNovelScenes();
                  const scene = scenes[currentScene];
                  return (
                    <div className="novel-container">
                      <div className="novel-background">
                        <div className="background-emoji">{scene.background}</div>
                      </div>
                      
                      <div className="novel-content">
                        <div className="character-display">
                          <div className="character-emoji">{scene.character}</div>
                        </div>
                        
                        <div className="dialogue-box">
                          <div className="character-name">{scene.characterName}</div>
                          <div className="dialogue-text">{scene.dialogue}</div>
                          
                          <div className="novel-controls">
                            <button 
                              className="novel-button"
                              onClick={() => setCurrentScene(Math.max(0, currentScene - 1))}
                              disabled={currentScene === 0}
                            >
                              ← Previous
                            </button>
                            
                            <span className="scene-counter">
                              Scene {currentScene + 1} / {scenes.length}
                            </span>
                            
                            {currentScene < scenes.length - 1 ? (
                              <button 
                                className="novel-button"
                                onClick={() => setCurrentScene(currentScene + 1)}
                              >
                                Next →
                              </button>
                            ) : (
                              <button 
                                className="novel-button novel-button-finish"
                                onClick={() => setShowNovel(false)}
                              >
                                Finish ✓
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            ) : (
              <>
                {selectedCard.getNovelScenes && (
                  <button 
                    className="novel-trigger-button"
                    onClick={() => setShowNovel(true)}
                  >
                    📖 Start Visual Novel
                  </button>
                )}

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
              </>
            )}
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