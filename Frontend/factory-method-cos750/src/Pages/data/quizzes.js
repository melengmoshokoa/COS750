export const quizzes = [
  {
    id: 1,
    title: "Phase 1: Problem Recognition",
    questions: [
      {
        question: "1. What problem does the Factory Method primarily solve?",
        options: [
          "Reducing the number of classes needed",
          "Creating objects without specifying their exact class",
          "Improving network latency",
          "Removing inheritance from OOP"
        ],
        answer: "Creating objects without specifying their exact class"
      },
      {
        question: "2. Factory Method helps avoid the anti-pattern of ______.",
        options: ["Hard-coding", "Abstraction", "Encapsulation", "Polymorphism"],
        answer: "Hard-coding"
      },
      {
        question: "3. What type of OOP issue leads developers to discover the Factory Method?",
        options: [
          "Tight coupling",
          "Slow compilers",
          "Excess memory usage",
          "Too many loops"
        ],
        answer: "Tight coupling"
      },
      {
        question: "4. Fill in the blank: Factory Method allows a class to defer object creation to ______.",
        options: ["A parent class", "A subclass", "An interface", "A constructor"],
        answer: "A subclass"
      },
      {
        question: "5. When developers want to eliminate `new` scattered across code, they often move to ______.",
        options: ["Factory Method", "Recursion", "Singleton", "Adapter Pattern"],
        answer: "Factory Method"
      },
      {
        question: "6. Which scenario signals the need for Factory Method?",
        options: [
          "You need many unrelated utility functions",
          "New product types must be added without modifying existing code",
          "Functions must run faster",
          "You need to simplify loops"
        ],
        answer: "New product types must be added without modifying existing code"
      },
      {
        question: "7. Factory Method helps reduce the dependency on ______ classes.",
        options: ["Concrete", "Abstract", "Parent", "Utility"],
        answer: "Concrete"
      },
      {
        question: "8. The pain of modifying code every time a new object type is added is known as ______.",
        options: ["Code rot", "Rigid coupling", "Constructor chaining", "Switch fatigue"],
        answer: "Switch fatigue"
      },
      {
        question: "9. Fill in the blank: Without Factory Method, developers often rely on long ______ statements.",
        options: ["if-else", "for-loop", "return", "try-catch"],
        answer: "if-else"
      },
      {
        question: "10. Factory Method is often discovered when scaling ______ systems.",
        options: ["Object creation-heavy", "Database", "UI", "Network"],
        answer: "Object creation-heavy"
      }
    ]
  },
  {
    id: 2,
    title: "Phase 2: Intent & Definition",
    questions: [
      {
        question: "1. What is the 'intent' of the Factory Method?",
        options: [
          "To make code compile faster",
          "To define an interface for creating an object",
          "To remove inheritance",
          "To improve memory handling"
        ],
        answer: "To define an interface for creating an object"
      },
      {
        question: "2. Fill in the blank: Factory Method focuses on creating objects through a ______ method.",
        options: ["Factory", "Static", "Getter", "Private"],
        answer: "Factory"
      },
      {
        question: "3. The Factory Method returns an instance of a ______ class.",
        options: ["Concrete or derived", "Primitive", "Utility", "Anonymous"],
        answer: "Concrete or derived"
      },
      {
        question: "4. Which keyword is often involved when defining a base creator class?",
        options: ["abstract", "static", "final", "virtual"],
        answer: "abstract"
      },
      {
        question: "5. Which of the following best describes a 'creator' class?",
        options: [
          "A class that performs database operations",
          "A class that declares the factory method",
          "A class that handles UI rendering",
          "A class that handles exceptions"
        ],
        answer: "A class that declares the factory method"
      },
      {
        question: "6. What is the product in Factory Method?",
        options: ["An object created by the factory method", "A log file", "A configuration script", "A database row"],
        answer: "An object created by the factory method"
      },
      {
        question: "7. Fill in the blank: The Factory Method allows subclasses to ______ the type of object created.",
        options: ["Decide", "Delete", "Hide", "Clone"],
        answer: "Decide"
      },
      {
        question: "8. Which is NOT part of the Factory Method intent?",
        options: ["Decoupling client code", "Deferring object creation decisions", "Increasing code duplication", "Enabling flexibility"],
        answer: "Increasing code duplication"
      },
      {
        question: "9. Factory Method reinforces which SOLID principle?",
        options: ["Open/Closed", "Liskov", "Single Responsibility", "Dependency Inversion"],
        answer: "Open/Closed"
      },
      {
        question: "10. Fill in the blank: Clients use ______ classes, not concrete ones.",
        options: ["Abstract", "Hidden", "Static", "Sealed"],
        answer: "Abstract"
      }
    ]
  },
  {
    id: 3,
    title: "Phase 3: Structure Understanding",
    questions: [
      {
        question: "1. In Factory Method, the Creator class usually contains a ______ factory method.",
        options: ["virtual/abstract", "private", "final", "static"],
        answer: "virtual/abstract"
      },
      {
        question: "2. Which class provides the actual object creation logic?",
        options: ["Concrete Creator", "Client", "Product Interface", "Utility Class"],
        answer: "Concrete Creator"
      },
      {
        question: "3. Fill in the blank: The Factory Method returns an object that implements a ______ interface.",
        options: ["Product", "List", "Static", "Void"],
        answer: "Product"
      },
      {
        question: "4. Which structural element defines different product types?",
        options: ["Concrete Products", "Clients", "Modules", "Adapters"],
        answer: "Concrete Products"
      },
      {
        question: "5. What allows Factory Method to use polymorphism?",
        options: ["Product Interface", "If statements", "Loops", "Naming convention"],
        answer: "Product Interface"
      },
      {
        question: "6. Fill in the blank: A Creator delegates creation to ______.",
        options: ["Subclasses", "Interfaces", "Libraries", "Constructors"],
        answer: "Subclasses"
      },
      {
        question: "7. Which diagram shows Creator → Product relationships?",
        options: ["UML", "ERD", "Flowchart", "Tree Map"],
        answer: "UML"
      },
      {
        question: "8. Factory Method eliminates direct calls to ______.",
        options: ["new", "return", "import", "export"],
        answer: "new"
      },
      {
        question: "9. What connects Concrete Creator to Concrete Product?",
        options: ["Factory Method", "Inheritance", "Switch", "Loops"],
        answer: "Factory Method"
      },
      {
        question: "10. Fill in the blank: The Creator class usually includes core ______ that rely on a product.",
        options: ["Business logic", "Styling", "Debugging", "Encryption"],
        answer: "Business logic"
      }
    ]
  },
   {
    id: 4,
    title: "Phase 4: Implementation Phase",
    questions: [
      {
        question: "1. What must every Concrete Product implement?",
        options: ["Product Interface", "Database API", "React Component", "None"],
        answer: "Product Interface"
      },
      {
        question: "2. Fill in the blank: Concrete Creators implement the ______ method.",
        options: ["Factory", "Private", "Helper", "Cleanup"],
        answer: "Factory"
      },
      {
        question: "3. A typical file structure for Factory Method contains:",
        options: ["Creator, Concrete Creator, Product, Concrete Product", "Only one file", "Just a constructor", "Only client code"],
        answer: "Creator, Concrete Creator, Product, Concrete Product"
      },
      {
        question: "4. Which language feature is MOST used in Factory Method?",
        options: ["Polymorphism", "Threading", "Collections", "Recursion"],
        answer: "Polymorphism"
      },
      {
        question: "5. What happens when you add a new Concrete Product?",
        options: ["Creator and client remain unchanged", "You must rewrite the whole program", "All classes break", "UML becomes invalid"],
        answer: "Creator and client remain unchanged"
      },
      {
        question: "6. Fill in the blank: Factory Method improves ______ of code.",
        options: ["Extensibility", "Indentation", "Animation", "Sorting"],
        answer: "Extensibility"
      },
      {
        question: "7. Concrete Creators typically override which method?",
        options: ["createProduct()", "toString()", "equals()", "main()"],
        answer: "createProduct()"
      },
      {
        question: "8. What is the return type of createProduct()?",
        options: ["Product interface", "String", "Any primitive", "void"],
        answer: "Product interface"
      },
      {
        question: "9. Fill in the blank: Client code uses the ______ interface.",
        options: ["Product", "Concrete", "Module", "Global"],
        answer: "Product"
      },
      {
        question: "10. Which statement is TRUE?",
        options: ["Clients never know the concrete product type", "Clients manually instantiate objects", "Factory Method reduces abstraction", "Patterns replace all constructors"],
        answer: "Clients never know the concrete product type"
      }
    ]
  },
  {
    id: 5,
    title: "Phase 5: Real-World Analogy",
    questions: [
      {
        question: "1. Factory Method is similar to ordering from a restaurant because:",
        options: ["You tell the chef HOW to cook", "You request a type, chef decides how it's made", "You enter the kitchen", "You prepare your own meal"],
        answer: "You request a type, chef decides how it's made"
      },
      {
        question: "2. Fill in the blank: Factory Method hides ______ complexity.",
        options: ["Creation", "UI", "Network", "Math"],
        answer: "Creation"
      },
      {
        question: "3. A real-world analogy for Concrete Creator is:",
        options: ["Chef", "Customer", "Menu", "Cashier"],
        answer: "Chef"
      },
      {
        question: "4. A Product in the real-world analogy is:",
        options: ["The meal", "The fridge", "The waiter", "The oven"],
        answer: "The meal"
      },
      {
        question: "5. Fill in the blank: The client only needs a ______ of what they want.",
        options: ["Type", "Recipe", "Temperature", "Location"],
        answer: "Type"
      },
      {
        question: "6. Using a ride-hailing app (Uber/Bolt) is an analogy because:",
        options: ["You choose the car type, the system assigns an actual car", "You drive the car yourself", "You inspect all possible cars", "You repair the engine first"],
        answer: "You choose the car type, the system assigns an actual car"
      },
      {
        question: "7. Fill in the blank: The system returns a ______ product based on your request.",
        options: ["Concrete", "Static", "Raw", "Corrupted"],
        answer: "Concrete"
      },
      {
        question: "8. Which analogy is INCORRECT?",
        options: ["Coffee machine selecting brew type", "Vending machine selecting item", "You cooking your own food", "Choosing taxi type"],
        answer: "You cooking your own food"
      },
      {
        question: "9. The idea of only providing the interface and hiding creation is called:",
        options: ["Abstraction", "Iteration", "Inlining", "Reflection"],
        answer: "Abstraction"
      },
      {
        question: "10. Fill in the blank: The client never deals with the ______ product class.",
        options: ["Concrete", "Parent", "Static", "Local"],
        answer: "Concrete"
      }
    ]
  },
  {
    id: 6,
    title: "Phase 6: Evaluation & Use-Case",
    questions: [
      {
        question: "1. Factory Method is best used when:",
        options: ["You want to hide concrete classes", "You want direct control over constructors", "You need fewer classes", "You dislike abstraction"],
        answer: "You want to hide concrete classes"
      },
      {
        question: "2. Fill in the blank: The pattern excels when you expect product types to ______.",
        options: ["Grow", "Disappear", "Shrink", "Slow"],
        answer: "Grow"
      },
      {
        question: "3. Which scenario is ideal for Factory Method?",
        options: ["GUI frameworks generating different buttons", "List sorting", "Summing numbers", "Printing debug logs"],
        answer: "GUI frameworks generating different buttons"
      },
      {
        question: "4. Fill in the blank: The biggest advantage is supporting the ______ principle.",
        options: ["Open/Closed", "YAGNI", "KISS", "DRY"],
        answer: "Open/Closed"
      },
      {
        question: "5. What is a disadvantage?",
        options: ["More classes are created", "Faster compilation", "Stronger coupling", "No abstraction"],
        answer: "More classes are created"
      },
      {
        question: "6. Which real-world system uses Factory Method heavily?",
        options: ["Frameworks", "Books", "Static files", "Random math scripts"],
        answer: "Frameworks"
      },
      {
        question: "7. Fill in the blank: Testing becomes easier due to ______.",
        options: ["Loose coupling", "Hard-coded types", "Complex loops", "Large constructors"],
        answer: "Loose coupling"
      },
      {
        question: "8. Factory Method differs from Abstract Factory because:",
        options: ["Factory Method creates one product at a time", "It creates families of related objects", "It requires multiple factories", "It only works in Java"],
        answer: "Factory Method creates one product at a time"
      },
      {
        question: "9. What makes Factory Method easier to extend?",
        options: ["New classes can be added without modifying old ones", "You use switch statements", "Everything is global", "Objects are static"],
        answer: "New classes can be added without modifying old ones"
      },
      {
        question: "10. Fill in the blank: Factory Method is a good choice when constructors become ______.",
        options: ["Complex", "Simple", "Irrelevant", "Unused"],
        answer: "Complex"
      }
    ]
  }
];
