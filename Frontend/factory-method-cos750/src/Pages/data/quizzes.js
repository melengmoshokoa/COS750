// src/data/quizzes.js
export const quizzes = [
  {
    id: 1,
    title: "Factory Pattern Fundamentals",
    questions: [
      {
        question: "What is the main goal of the Factory Pattern?",
        options: [
          "To create objects without specifying exact classes",
          "To manage database connections", 
          "To ensure only one instance exists",
          "To optimize algorithm performance"
        ],
        answer: 0
      },
      {
        question: "Which principle does the Factory Pattern primarily support?",
        options: [
          "Open/Closed Principle - open for extension, closed for modification",
          "Single Responsibility Principle",
          "Liskov Substitution Principle", 
          "Interface Segregation Principle"
        ],
        answer: 0
      },
      {
        question: "In Factory Pattern, what is the main responsibility of the Factory class?",
        options: [
          "Encapsulate object creation logic",
          "Contain business logic for the application",
          "Handle user authentication",
          "Manage database transactions"
        ],
        answer: 0
      },
      {
        question: "What problem does the Factory Pattern primarily solve?",
        options: [
          "Tight coupling between client code and concrete classes",
          "Poor database performance", 
          "Memory leaks in applications",
          "Slow network requests"
        ],
        answer: 0
      },
      {
        question: "When should you consider using a Factory Pattern?",
        options: [
          "When object creation logic is complex or frequently changes",
          "When you need exactly one instance of a class",
          "When you want to add functionality to objects dynamically",
          "When you need to notify multiple objects about state changes"
        ],
        answer: 0
      }
    ]
  },
  {
    id: 2,
    title: "Factory Method Implementation",
    questions: [
      {
        question: "Consider this code. What pattern is being demonstrated?\n\nclass CarFactory {\n  createCar(type) {\n    if (type === 'sedan') return new Sedan();\n    if (type === 'suv') return new SUV();\n    if (type === 'sports') return new SportsCar();\n  }\n}",
        options: [
          "Factory Pattern",
          "Singleton Pattern", 
          "Observer Pattern",
          "Decorator Pattern"
        ],
        answer: 0
      },
      {
        question: "In this code, what is the role of VehicleFactory?\n\nclass VehicleFactory {\n  createVehicle(type) {\n    switch(type) {\n      case 'car': return new Car();\n      case 'bike': return new Bike();\n      case 'truck': return new Truck();\n    }\n  }\n}",
        options: [
          "It's a Factory that encapsulates vehicle creation logic",
          "It's a Singleton that manages vehicle instances",
          "It's an Observer that monitors vehicle changes",
          "It's a Decorator that adds features to vehicles"
        ],
        answer: 0
      },
      {
        question: "What is the key difference between Simple Factory and Factory Method patterns?",
        options: [
          "Simple Factory uses one method, Factory Method uses inheritance with subclasses",
          "Simple Factory is faster than Factory Method",
          "Factory Method is deprecated, Simple Factory is modern",
          "There is no difference, they are the same pattern"
        ],
        answer: 0
      },
      {
        question: "In Factory Method pattern, what do concrete factories typically override?",
        options: [
          "The factory method that creates specific products",
          "The business logic of the application",
          "The database connection methods",
          "The user interface components"
        ],
        answer: 0
      },
      {
        question: "What is typically returned by a factory method?",
        options: [
          "An instance of a concrete class that implements a common interface",
          "A primitive data type like string or number",
          "Always returns the same singleton instance", 
          "A function callback"
        ],
        answer: 0
      }
    ]
  },
  {
    id: 3,
    title: "Factory Pattern Advantages & Use Cases", 
    questions: [
      {
        question: "What is the main advantage of using a Factory Pattern?",
        options: [
          "Client code is decoupled from concrete implementations",
          "It makes code run faster",
          "It reduces memory usage",
          "It automatically handles errors"
        ],
        answer: 0
      },
      {
        question: "Which of these scenarios is BEST suited for a Factory Pattern?",
        options: [
          "Creating different types of documents (PDF, Word, Excel) based on user selection",
          "Managing a single database connection throughout the application",
          "Logging messages to multiple outputs (file, console, database)",
          "Validating user input in a form"
        ],
        answer: 0
      },
      {
        question: "How does Factory Pattern promote code maintainability?",
        options: [
          "By centralizing object creation logic in one place",
          "By making all classes singletons",
          "By using global variables for shared state", 
          "By eliminating all conditional statements"
        ],
        answer: 0
      },
      {
        question: "What would be a good real-world analogy for Factory Pattern?",
        options: [
          "A car manufacturing plant that produces different models based on orders",
          "A unique key that opens only one specific door",
          "A TV remote that controls multiple devices",
          "A weather station that updates multiple displays"
        ],
        answer: 0
      },
      {
        question: "Which design principle is violated if you don't use Factory Pattern when you have complex object creation?",
        options: [
          "Single Responsibility Principle - object creation scattered everywhere",
          "Liskov Substitution Principle", 
          "Don't Repeat Yourself (DRY)",
          "You Aren't Gonna Need It (YAGNI)"
        ],
        answer: 0
      }
    ]
  },
  {
    id: 4,
    title: "Factory Pattern Variations & Comparisons",
    questions: [
      {
        question: "What is the main difference between Factory Method and Abstract Factory patterns?",
        options: [
          "Factory Method creates one product, Abstract Factory creates families of related products",
          "Factory Method is faster than Abstract Factory",
          "Abstract Factory is simpler than Factory Method", 
          "Factory Method is deprecated in favor of Abstract Factory"
        ],
        answer: 0
      },
      {
        question: "In which scenario would Abstract Factory be better than Factory Method?",
        options: [
          "When you need to create families of related objects (e.g., UI components for different OS)",
          "When you only need to create one type of object",
          "When performance is the most critical factor",
          "When you're working with primitive data types only"
        ],
        answer: 0
      },
      {
        question: "What is a potential drawback of overusing Factory Pattern?",
        options: [
          "Can introduce unnecessary complexity for simple object creation",
          "Makes code run significantly slower",
          "Prevents inheritance in child classes",
          "Forces all objects to be immutable"
        ],
        answer: 0
      },
      {
        question: "How does Factory Pattern relate to Dependency Injection?",
        options: [
          "Factory Pattern can be used to implement Dependency Injection containers",
          "They are completely unrelated patterns",
          "Factory Pattern replaces the need for Dependency Injection",
          "Dependency Injection is a type of Factory Pattern"
        ],
        answer: 0
      },
      {
        question: "When might a Static Factory Method be preferred over a regular Factory?",
        options: [
          "When you don't need to maintain state in the factory and want simpler syntax",
          "When you need multiple factory instances with different configurations",
          "When you're working with inheritance hierarchies",
          "When you need runtime polymorphism"
        ],
        answer: 0
      }
    ]
  },
  {
    id: 5,
    title: "Factory Pattern Code Analysis",
    questions: [
      {
        question: "Given this code, what improvement would Factory Pattern provide?\n\nfunction createDocument(type) {\n  if (type === 'pdf') {\n    return new PDFDocument();\n  } else if (type === 'word') {\n    return new WordDocument();\n  } else if (type === 'excel') {\n    return new ExcelDocument();\n  }\n}",
        options: [
          "Centralize creation logic and make it easier to add new document types",
          "Make the code run faster",
          "Reduce memory usage of document objects",
          "Automatically handle document saving"
        ],
        answer: 0
      },
      {
        question: "In a Factory Method pattern, what is the relationship between Creator and Product?",
        options: [
          "Creator defines factory method that returns Product objects",
          "Creator inherits from Product",
          "Product creates Creator instances", 
          "They are unrelated classes"
        ],
        answer: 0
      },
      {
        question: "What is the benefit of having products implement a common interface in Factory Pattern?",
        options: [
          "Client code can work with any product without knowing concrete types",
          "It makes the factory method simpler to write",
          "It improves performance of object creation",
          "It automatically handles garbage collection"
        ],
        answer: 0
      },
      {
        question: "How does Factory Pattern support the Open/Closed Principle?",
        options: [
          "You can add new product types without modifying existing client code",
          "It forces all classes to be sealed/final",
          "It automatically closes unused connections",
          "It prevents any modifications to existing classes"
        ],
        answer: 0
      },
      {
        question: "In a well-designed Factory Pattern, where should the decision logic for which object to create reside?",
        options: [
          "Encapsulated within the factory class",
          "Scattered throughout client code",
          "In configuration files only",
          "In the product classes themselves"
        ],
        answer: 0
      }
    ]
  }
];