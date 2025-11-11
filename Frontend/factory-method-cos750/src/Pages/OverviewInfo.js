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

export default function Overview() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [notes, setNotes] = useState({});
  const [currentNote, setCurrentNote] = useState('');

  const factory = new StoryboardFactory();

  const storyboards = [
    { type: 'PRODUCT', name: "PRODUCT" },
    { type: 'BIG_BUTTON', name: "CLIENT CODE" },
    { type: 'CREATOR', name: "CREATOR" },
    { type: 'CONCRETE_CREATOR', name: "CONCRETE CREATOR" },
  ];

  const handleCardClick = (type) => {
    setIsAnimating(true);
    setTimeout(() => {
      const storyboard = factory.createStoryboard(type);
      setSelectedCard(storyboard);
      setCurrentNote(notes[type] || '');
      setIsAnimating(false);
    }, 300);
  };

  const handleBack = () => {
    if (selectedCard) {
      const cardType = storyboards.find(
        s => {
          const board = factory.createStoryboard(s.type);
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
              <p className="subtitle">Overview of Factory Method</p>
              <p className="tagline">Let's give you a run around the factory.....</p>
              <p className="tagline">  hope you wearing comfortable shoes..........</p>
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