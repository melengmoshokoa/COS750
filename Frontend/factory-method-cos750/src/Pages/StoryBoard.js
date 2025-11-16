import React, { useState, useEffect } from 'react';
import './StoryBoard.css';
import { userAPI, storyAPI, badgeAPI } from '../services/apiService';
import { supabase } from "../supabaseClient";
import kitchenImg from './assests/kitchen.png';
import chefMayImg from './assests/chef-may.png';
import coffeeImg from './assests/coffee-shop.png';
import baristaImg from './assests/barista-emma.png';
import mechanicImg from "./assests/mechanic.png";
import michelleImg from "./assests/mechanic-michelle.png";
import galleryImg from "./assests/art-gallery.png"; 
import sophiaImg from "./assests/artist-sophia.png";
import officeImg from "./assests/office.png";
import daniImg from "./assests/manager-danielle.png";
import techImg from "./assests/techy.png"; 
import lisaImg from "./assests/developer-lisa.png";
import pizzaBadge from "./assests/pizza-badge.png";
import coffeeBadge from "./assests/coffee-badge.png";
import toolBadge from "./assests/tool-badge.png";
import paletteBadge from "./assests/palette-badge.png";
import docBadge from "./assests/doc-badge.png";
import notiBadge from "./assests/bell-badge.png";
import woodBg from "./assests/wood.png";

const api = {
  story: storyAPI,
  badge: badgeAPI,
  user: userAPI
};

const getUserId = async () => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Error getting session:', error);
      return null;
    }
    
    if (session && session.user) {
      return session.user.id;
    }
    
    return null;
  } catch (err) {
    console.error('Error in getUserId:', err);
    return null;
  }
};

// ============================================
// STORY TYPE MAPPING
// ============================================
const STORY_TYPE_MAP = {
  'PIZZA': 'pizza',
  'COFFEE': 'coffee',
  'VEHICLES': 'vehicles',
  'SHAPES': 'shapes',
  'DOC': 'docs',
  'EMAILS': 'emails'
};

// ============================================
// BADGE DEFINITIONS
// ============================================
const STORY_BADGES = {
  'pizza': {
    name: 'Pizza Master',
    icon: pizzaBadge,
    description: 'Mastered the Pizza Factory Pattern',
    xp: 100,
    order: 1
  },
  'coffee': {
    name: 'Coffee Connoisseur',
    icon: coffeeBadge,
    description: 'Brewed perfect Factory Method knowledge',
    xp: 100,
    order: 2
  },
  'vehicles': {
    name: 'Auto Engineer',
    icon: toolBadge,
    description: 'Built a complete vehicle factory',
    xp: 100,
    order: 3
  },
  'shapes': {
    name: 'Digital Artist',
    icon: paletteBadge,
    description: 'Created beautiful shape patterns',
    xp: 100,
    order: 4
  },
  'docs': {
    name: 'Document Manager',
    icon: docBadge,
    description: 'Organized all document types',
    xp: 100,
    order: 5
  },
  'emails': {
    name: 'Notification Expert',
    icon: notiBadge,
    description: 'Connected all communication channels',
    xp: 100,
    order: 6
  }
};


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
  
  getIcon() { 
    return <img src={require('./assests/pizza.png')} alt="🍕" />
  }
  
  getDescription() {
    return "Cheesy, Saucy, and Automatically Delivered 🍕......";
  }
  
  getCodeChunks() {
    return {
      product: `// --- Product Interface ---
class Pizza {
public:
    virtual std::string prepare() = 0;
    virtual std::string bake() = 0;
    virtual std::string cut() = 0;
    virtual ~Pizza() = default;
};`,
      
      concreteProduct: `// --- Concrete Product ---
class MargheritaPizza : public Pizza {
public:
    std::string prepare() override {
        return "Adding tomato sauce and mozzarella";
    }

    std::string bake() override {
        return "Baking at 450°F for 12 minutes";
    }

    std::string cut() override {
        return "Cutting into 8 slices";
    }
};`,
      
      factory: `// --- Creator / Factory ---
class PizzaFactory {
public:
    virtual std::unique_ptr<Pizza> createPizza() = 0;
    virtual ~PizzaFactory() = default;
};`,
      
      concreteFactory: `// --- Concrete Factory ---
class MargheritaFactory : public PizzaFactory {
public:
    std::unique_ptr<Pizza> createPizza() override {
        return std::make_unique<MargheritaPizza>();
    }
};`,
      
      client: `// --- Client Code ---
int main() {
    std::unique_ptr<PizzaFactory> factory = std::make_unique<MargheritaFactory>();
    std::unique_ptr<Pizza> pizza = factory->createPizza();

    std::cout << pizza->prepare() << std::endl;
    std::cout << pizza->bake() << std::endl;
    std::cout << pizza->cut() << std::endl;

    return 0;
}`
    };
  }
  
  getCodeExample() {
    const chunks = this.getCodeChunks();
    return `#include <iostream>
#include <memory>
#include <string>

${chunks.product}

${chunks.concreteProduct}

${chunks.factory}

${chunks.concreteFactory}

${chunks.client}`;
  }
  
  getColor() { return "#8B4513"; }
  
  getDiagram() {
    return `PizzaFactory
    ↓
createPizza(type)
    ↓
┌────────────────┬────────────────┐
Margherita     Pepperoni      Veggie`;
  }
  
  getNovelScenes() {
    const chunks = this.getCodeChunks();
    const diagram = this.getDiagram();

    return [
      {
        id: 0,
        background: kitchenImg,
        character: chefMayImg,
        characterName: "Chef May",
        dialogue: "WELCOME to May's Pizzeria of Mild Chaos! Where the ovens are hot, the cheese is dramatic, and—oh no… THE TOMATO SAUCE FOUNTAIN IS MALFUNCTIONING AGAIN!",
        choices: [
          { text: "Teach me before something catches fire.", nextScene: 1 },
          { text: "Why is your sauce fountain alive?", nextScene: 1 }
        ]
      },
      {
        id: 1,
        background: kitchenImg,
        character: chefMayImg,
        characterName: "Chef May",
        dialogue: "Every pizza has a *personality*. Margherita? Calm oldest sibling. Pepperoni? Hyperactive child. Veggie? Probably lectures me about sustainability. But all follow the same life cycle: prepare → bake → cut.\nJust like Pokémon evolutions… but edible.",
        choices: [{ text: "Okay, show me how the Factory fits in.", nextScene: 2 }]
      },
      {
        id: 2,
        background: kitchenImg,
        character: chefMayImg,
        characterName: "Chef May",
        dialogue: "Imagine a magical machine that makes ANY pizza you order. You say 'Margherita' and BAM—there it is, steaming aggressively because it's judging your basic taste.",
        choices: [{ text: "So… that's the Factory?", nextScene: 3 }]
      },
      {
        id: 3,
        background: kitchenImg,
        character: chefMayImg,
        characterName: "Chef May",
        dialogue: "Exactly! The `PizzaFactory` is like my ordering counter. You place an order, and it conjures the correct pizza object. No messy 'if/else' disasters. No crying coders. Just pizza.",
        choices: [{ text: "And each pizza is its own class?", nextScene: 4 }]
      },
      {
        id: 4,
        background: kitchenImg,
        character: chefMayImg,
        characterName: "Chef May",
        dialogue: "Every pizza signs a legal contract:\n- prepare()\n- bake()\n- cut()\nIf they break the rules they get banished to the Freezer Dimension. Don't ask what's in there.",
        choices: [{ text: "Harsh but fair. What next?", nextScene: 5 }]
      },
      {
        id: 5,
        background: kitchenImg,
        character: chefMayImg,
        characterName: "Chef May",
        dialogue: "Want a new pizza like 'Four Cheese Galaxy'? No rewrites, no chaos. Just create a new class that follows the same interface. It's like adding a new family member to a sitcom—without cancelling the show.",
        choices: [{ text: "That actually makes sense.", nextScene: 6 }]
      },
      {
        id: 6,
        background: kitchenImg,
        character: chefMayImg,
        characterName: "Chef May",
        dialogue: "Developers love Factory Method because it reduces pain. Instead of changing everything when someone wants 'extra cheese,' you just make a new subclass.\nCleaner than my kitchen! And trust me, that's an achievement.",
        choices: [
          { text: "Show me the diagram!", nextScene: 7 }
        ]
      },
      {
        id: 7,
        background: kitchenImg,
        character: chefMayImg,
        characterName: "Chef May",
        dialogue: "Behold the sacred Pizza Hierarchy Diagram! Please pretend it looks impressive.",
        diagram: diagram,
        choices: [{ text: "Let's see the code.", nextScene: 8 }]
      },
      {
        id: 8,
        background: kitchenImg,
        character: chefMayImg,
        characterName: "Chef May",
        dialogue: "This is the universal pizza recipe. The sacred blueprint. The thing that prevents the pizzas from unionizing.",
        codeExample: chunks.product,
        choices: [{ text: "Next!", nextScene: 9 }]
      },
      {
        id: 9,
        background: kitchenImg,
        character: chefMayImg,
        characterName: "Chef May",
        dialogue: "And here we have the Margherita class—classy, elegant, and insists on fresh mozzarella only.",
        codeExample: chunks.concreteProduct,
        choices: [{ text: "Next class!", nextScene: 10 }]
      },
      {
        id: 10,
        background: kitchenImg,
        character: chefMayImg,
        characterName: "Chef May",
        dialogue: "This is the Creator. It declares: 'Every factory must make pizza.' Even Karen-proof.",
        codeExample: chunks.factory,
        choices: [{ text: "Next!", nextScene: 11 }]
      },
      {
        id: 11,
        background: kitchenImg,
        character: chefMayImg,
        characterName: "Chef May",
        dialogue: "Here's our MargheritaFactory! The Beyoncé of pizza factories. If we want Pepperoni later? We make a PepperoniFactory!",
        codeExample: chunks.concreteFactory,
        choices: [{ text: "How do we use it?", nextScene: 12 }]
      },
      {
        id: 12,
        background: kitchenImg,
        character: chefMayImg,
        characterName: "Chef May",
        dialogue: "And THIS is how the magic happens. The client just asks for a pizza—no idea how it's made. Much like me at 3 AM ordering delivery.",
        codeExample: chunks.client,
        choices: [
          { text: "Show everything together.", nextScene: 13 },
          { text: "I get it! Let's wrap up.", nextScene: 14 }
        ]
      },
      {
        id: 13,
        background: kitchenImg,
        character: chefMayImg,
        characterName: "Chef May",
        dialogue: "Here it is! The full recipe—all pieces working together in cheesy harmony. If code had a smell, this would smell like oregano.",
        codeExample: this.getCodeExample(),
        choices: [{ text: "This was delicious. Finish up!", nextScene: 14 }]
      },
      {
        id: 14,
        background: kitchenImg,
        character: chefMayImg,
        characterName: "Chef May",
        dialogue: "You survived my kitchen AND mastered the Factory Method! Go forth and create objects responsibly… and maybe buy a fire extinguisher.",
        choices: [{ text: "Complete Story", nextScene: "HOME" }]
      }
    ];
  }
}

class Coffeeboard {
  getTitle() { return "COFFEE"; }
  
  getIcon() { 
    return <img src={require('./assests/coffee.png')} alt="☕" />
  }
  
  getDescription() {
    return "Espresso Yourself ☕......";
  }
  
  getCodeChunks() {
    return {
      product: `// --- Product Interface ---
class Coffee {
public:
    virtual std::string brew() = 0;
    virtual ~Coffee() = default;
};`,
      
      concreteProducts: `// --- Concrete Products ---
class Espresso : public Coffee {
public:
    std::string brew() override {
        return "Pulling a shot of espresso";
    }
};

class Latte : public Coffee {
public:
    std::string brew() override {
        return "Brewing espresso + steamed milk";
    }
};`,
      
      factory: `// --- Creator / Factory ---
class CoffeeFactory {
public:
    virtual std::unique_ptr<Coffee> createCoffee() = 0;
    virtual ~CoffeeFactory() = default;
};`,
      
      concreteFactories: `// --- Concrete Factories ---
class EspressoFactory : public CoffeeFactory {
public:
    std::unique_ptr<Coffee> createCoffee() override {
        return std::make_unique<Espresso>();
    }
};

class LatteFactory : public CoffeeFactory {
public:
    std::unique_ptr<Coffee> createCoffee() override {
        return std::make_unique<Latte>();
    }
};`,
      
      client: `// --- Client Code ---
int main() {
    std::unique_ptr<CoffeeFactory> espressoFactory = std::make_unique<EspressoFactory>();
    std::unique_ptr<Coffee> espresso = espressoFactory->createCoffee();
    std::cout << espresso->brew() << std::endl;

    std::unique_ptr<CoffeeFactory> latteFactory = std::make_unique<LatteFactory>();
    std::unique_ptr<Coffee> latte = latteFactory->createCoffee();
    std::cout << latte->brew() << std::endl;

    return 0;
}`
    };
  }
  
  getCodeExample() {
    const chunks = this.getCodeChunks();
    return `#include <iostream>
#include <memory>
#include <string>

${chunks.product}

${chunks.concreteProducts}

${chunks.factory}

${chunks.concreteFactories}

${chunks.client}`;
  }
  
  getColor() { return "#8B4513"; }
  
  getDiagram() {
    return `CoffeeFactory
    ↓
createCoffee(type)
    ↓
┌────────────────┬────────────────┐
Espresso       Latte        Cappuccino`;
  }
  
  getNovelScenes() {
  const chunks = this.getCodeChunks();
  const diagram = this.getDiagram();

  return [
    // SCENE 0
    {
      id: 0,
      background: coffeeImg,
      character: baristaImg,
      characterName: "Barista Emma",
      dialogue:
        "Welcome to **Code & Coffee** ☕✨ – the coziest corner where warm drinks meet warm debugging energy. I’m Emma, your barista! I’ll be your guide through the Factory Method pattern… gently, like a soft morning pour-over.",
      choices: [
        { text: "Give me the espresso version!", nextScene: 1 },
        { text: "I'm here for the code (and caffeine).", nextScene: 1 }
      ]
    },

    // SCENE 1
    {
      id: 1,
      background: coffeeImg,
      character: baristaImg,
      characterName: "Barista Emma",
      dialogue:
        "Our café gets all sorts of drink requests every day — Espresso, Latte, Cappuccino, Chai… and the occasional ‘surprise me’ order. Each drink is unique, but the flow is always the same: mix → brew → serve → smile. Simple and soothing.",
      choices: [{ text: "How do you manage all that variety?", nextScene: 2 }]
    },

    // SCENE 2
    {
      id: 2,
      background: coffeeImg,
      character: baristaImg,
      characterName: "Barista Emma",
      dialogue:
        "That’s where our **CoffeeFactory** comes in. You tell it what you want, and it hands you back the right coffee object. No scrambling, no chaos, just a peaceful brewing symphony.",
      choices: [
        { text: "Show me an example order", nextScene: 3 },
        { text: "What's the interface like?", nextScene: 5 }
      ]
    },

    // SCENE 3
    {
      id: 3,
      background: coffeeImg,
      character: baristaImg,
      characterName: "Barista Emma",
      dialogue:
        "Let’s imagine it. You say: *'One Latte, please!'* 🍶 And the factory quietly replies: *‘Creating Latte object…’* It hands it off to the barista bot, which whispers: *‘Call brew() and I’ll make magic.’* It’s teamwork with a sprinkle of caffeine.",
      choices: [
        { text: "Aww, that’s cute. Show me the diagram.", nextScene: 4 },
        { text: "Show me the code – gently.", nextScene: 6 }
      ]
    },

    // SCENE 4
    {
      id: 4,
      background: coffeeImg,
      character: baristaImg,
      characterName: "Barista Emma",
      dialogue:
        "Here’s a simple diagram – think of it as a warm flowchart: Creator → Factory → Coffee Interface → Concrete Coffees. Everything moving smoothly, like a perfect morning routine.",
      diagram: diagram,
      choices: [{ text: "Ready for code!", nextScene: 6 }]
    },

    // SCENE 5 — PRODUCT INTERFACE
    {
      id: 5,
      background: coffeeImg,
      character: baristaImg,
      characterName: "Barista Emma",
      dialogue:
        "Every drink follows the same rule: it must implement `brew()`. It’s our café’s sacred ritual. Without it, the drink just… sits there, shy and unprepared.",
      codeExample: chunks.product,
      choices: [{ text: "Show me the actual drinks!", nextScene: 7 }]
    },

    // SCENE 6 — INTERFACE AGAIN (for alternative route)
    {
      id: 6,
      background: coffeeImg,
      character: baristaImg,
      characterName: "Barista Emma",
      dialogue:
        "Here’s the heart of the system. A soft introduction to interfaces, products, and factories – all cooperating like friendly baristas on a calm weekday morning.",
      codeExample: chunks.product,
      choices: [{ text: "Take me to the drinks", nextScene: 7 }]
    },

    // SCENE 7 — CONCRETE PRODUCTS
    {
      id: 7,
      background: coffeeImg,
      character: baristaImg,
      characterName: "Barista Emma",
      dialogue:
        "Meet our star beverages! Espresso — bold and dramatic. Latte — creamy and comforting. Each has their own `brew()` personality, yet both follow the Coffee interface with respect and harmony.",
      codeExample: chunks.concreteProducts,
      choices: [{ text: "And the factories?", nextScene: 8 }]
    },

    // SCENE 8 — FACTORY INTERFACE
    {
      id: 8,
      background: coffeeImg,
      character: baristaImg,
      characterName: "Barista Emma",
      dialogue:
        "Here’s our **CoffeeFactory** interface. It promises one thing: `createCoffee()`. Every concrete factory must honor that promise, like a barista’s oath whispered over warm espresso.",
      codeExample: chunks.factory,
      choices: [{ text: "Show me the real factories", nextScene: 9 }]
    },

    // SCENE 9 — CONCRETE FACTORIES
    {
      id: 9,
      background: coffeeImg,
      character: baristaImg,
      characterName: "Barista Emma",
      dialogue:
        "Here they are! EspressoFactory — compact and full of spark. LatteFactory — gentle and generous with milk foam. Each returns its drink with quiet confidence.",
      codeExample: chunks.concreteFactories,
      choices: [{ text: "How do customers actually order?", nextScene: 10 }]
    },

    // SCENE 10 — CLIENT CODE
    {
      id: 10,
      background: coffeeImg,
      character: baristaImg,
      characterName: "Barista Emma",
      dialogue:
        "This is what the client does: pick a factory → call createCoffee() → brew() the result. The customer never worries about the inner mechanics. Just like how you can enjoy the drink without seeing the 6 a.m. bean grind chaos.",
      codeExample: chunks.client,
      choices: [{ text: "Show me the full program!", nextScene: 11 }]
    },

    // SCENE 11 — FULL CODE
    {
      id: 11,
      background: coffeeImg,
      character: baristaImg,
      characterName: "Barista Emma",
      dialogue:
        "Here’s the full café system in all its cozy glory—interfaces, drinks, factories, and client code stitched together like a latte heart. You’re brewing design patterns like a pro now!",
      codeExample: this.getCodeExample(),
      choices: [{ text: "Continue", nextScene: 12 }]
    },
    {
      id: 12,
      background: coffeeImg,
      character: baristaImg,
      characterName: "Barista Emma",
      dialogue:
        "You know… code is a lot like coffee. It’s easier to enjoy when someone guides you gently through it. I’m glad you stayed for the whole brew. You did amazing.",
      choices: [{ text: "Emma… you’re sweet.", nextScene: 13 }]
    },
    {
      id: 13,
      background: coffeeImg,
      character: baristaImg,
      characterName: "Barista Emma",
      dialogue:
        "Aww! Well, good code deserves warmth. And good learners deserve encouragement. There’s always room at this café for someone who codes with curiosity.",
      choices: [{ text: "Anything else I should know?", nextScene: 14 }]
    },
    {
      id: 14,
      background: coffeeImg,
      character: baristaImg,
      characterName: "Barista Emma",
      dialogue:
        "Just remember: Factory Method shines when you want flexibility and consistency. It keeps code organized and leaves room for new drinks—uhh, objects—without drama.",
      choices: [{ text: "Thanks, Emma ☕", nextScene: 15 }]
    },
    {
      id: 15,
      background: coffeeImg,
      character: baristaImg,
      characterName: "Barista Emma",
      dialogue:
        "Thank you for sharing this calm coding moment with me. Whenever you need another warm cup of design patterns, you know where to find me.",
      choices: [{ text: "Complete Story", nextScene: "HOME" }]
    }
  ];
}
}

class Vehiclesboard {
  getTitle() { return "VEHICLES"; }
  
  getIcon() { 
    return <img src={require('./assests/vehicles.png')} alt="🚗" />
  }
  
  getDescription() {
    return "Cars, Bikes, and Zoom Zoom 🚗.......";
  }
  
  // Break code into digestible chunks
  getCodeChunks() {
    return {
      product: `// --- Product Interface ---
class Vehicle {
public:
    virtual std::string drive() = 0;
    virtual ~Vehicle() = default;
};`,
      
      concreteProducts: `// --- Concrete Products ---
class Car : public Vehicle {
public:
    std::string drive() override {
        return "Driving on 4 wheels";
    }
};

class Bike : public Vehicle {
public:
    std::string drive() override {
        return "Riding on 2 wheels";
    }
};`,
      
      factory: `// --- Creator / Factory ---
class VehicleFactory {
public:
    virtual std::unique_ptr<Vehicle> createVehicle() = 0;
    virtual ~VehicleFactory() = default;
};`,
      
      concreteFactories: `// --- Concrete Factories ---
class CarFactory : public VehicleFactory {
public:
    std::unique_ptr<Vehicle> createVehicle() override {
        return std::make_unique<Car>();
    }
};

class BikeFactory : public VehicleFactory {
public:
    std::unique_ptr<Vehicle> createVehicle() override {
        return std::make_unique<Bike>();
    }
};`,
      
      client: `// --- Client Code ---
int main() {
    // Create a Car
    std::unique_ptr<VehicleFactory> carFactory = std::make_unique<CarFactory>();
    std::unique_ptr<Vehicle> car = carFactory->createVehicle();
    std::cout << car->drive() << std::endl;

    // Create a Bike
    std::unique_ptr<VehicleFactory> bikeFactory = std::make_unique<BikeFactory>();
    std::unique_ptr<Vehicle> bike = bikeFactory->createVehicle();
    std::cout << bike->drive() << std::endl;

    return 0;
}`
    };
  }
  
  getCodeExample() {
    const chunks = this.getCodeChunks();
    return `#include <iostream>
#include <memory>
#include <string>

${chunks.product}

${chunks.concreteProducts}

${chunks.factory}

${chunks.concreteFactories}

${chunks.client}`;
  }
  
  getColor() { return "#8B4513"; }
  
  getDiagram() {
    return `VehicleFactory
    ↓
createVehicle(type)
    ↓
┌────────────────┬────────────────┐
Car            Bike         Truck`;
  }
  
  getNovelScenes() {
    const chunks = this.getCodeChunks();
    const diagram = this.getDiagram();

    return [
      // SCENE 0
      {
        background: mechanicImg,
        character: michelleImg,
        characterName: "Mechanic Michelle",
        dialogue:
          "Oh. A customer. Great. Welcome to Mich’s Auto Shop—where the tools are sharp, the engines are loud, and the code is cleaner than your browser history. Today I’ll teach you about the Factory Method. Try to keep up.",
        choices: [
          { text: "Uh… okay?", nextScene: 1 }
        ]
      },

      // SCENE 1
      {
        background: mechanicImg,
        character: michelleImg,
        characterName: "Mechanic Michelle",
        diagram: diagram,
        dialogue:
          "See this mess? Cars, bikes, trucks—everyone wants something different. If I had to manually create each one in code I’d go insane. And trust me, I’m already halfway there.",
        choices: [
          { text: "Looks complicated...", nextScene: 2 }
        ]
      },

      // SCENE 2
      {
        background: mechanicImg,
        character: michelleImg,
        characterName: "Mechanic Michelle",
        dialogue:
          "Relax. That's where the Factory Method helps. Instead of you writing `new Car()` like a chaotic goblin, the factory decides what vehicle to create. Keeps things neat. Unlike your variable naming habits.",
        choices: [
          { text: "How does it actually work?", nextScene: 3 }
        ]
      },

      // SCENE 3
      {
        background: mechanicImg,
        character: michelleImg,
        characterName: "Mechanic Michelle",
        dialogue:
          "Every vehicle follows the same interface. Same functions. Different behavior. It's like how all customers ask questions, but only some of them are tolerable.",
        choices: [
          { text: "Show me the Vehicle interface", nextScene: 4 }
        ]
      },

      // SCENE 4 — Product Code
      {
        background: mechanicImg,
        character: michelleImg,
        characterName: "Mechanic Michelle",
        codeExample: chunks.product,
        dialogue:
          "Behold—the Vehicle interface! This is the holy scripture. Every vehicle MUST have a drive() method. No exceptions. Even your imaginary flying scooter idea.",
        choices: [
          { text: "Okay, what about actual vehicles?", nextScene: 5 }
        ]
      },

      // SCENE 5 — Concrete Products Code
      {
        background: mechanicImg,
        character: michelleImg,
        characterName: "Mechanic Michelle",
        codeExample: chunks.concreteProducts,
        dialogue:
          "These are the concrete products. Cars drive on 4 wheels. Bikes ride on 2. Shocking, I know. Same method name, different personality—like siblings.",
        choices: [
          { text: "Cool. How do we create them?", nextScene: 6 }
        ]
      },

      // SCENE 6 — Factory Interface
      {
        background: mechanicImg,
        character: michelleImg,
        characterName: "Mechanic Michelle",
        codeExample: chunks.factory,
        dialogue:
          "This is the VehicleFactory. An abstract factory that says: 'If you're gonna build vehicles, at least agree on how.' Wish customers followed rules this well.",
        choices: [
          { text: "And the real factories?", nextScene: 7 }
        ]
      },

      // SCENE 7 — Concrete Factories
      {
        background: mechanicImg,
        character: michelleImg,
        characterName: "Mechanic Michelle",
        codeExample: chunks.concreteFactories,
        dialogue:
          "These are the concrete factories. CarFactory makes Cars. BikeFactory makes Bikes. You’d think this is obvious, but people still get confused. Yes, really.",
        choices: [
          { text: "How do we use this?", nextScene: 8 }
        ]
      },

      // SCENE 8 — Client Code
      {
        background: mechanicImg,
        character: michelleImg,
        characterName: "Mechanic Michelle",
        codeExample: chunks.client,
        dialogue:
          "Here’s how a normal human (or programmer) uses the factories. Pick a factory, create a vehicle, drive it. No extra nonsense. No `switch` statements from hell.",
        choices: [
          { text: "Show me the whole system", nextScene: 9 }
        ]
      },

      // SCENE 9 — Full Code
      {
        background: mechanicImg,
        character: michelleImg,
        characterName: "Mechanic Michelle",
        codeExample: this.getCodeExample(),
        dialogue:
          "There. The whole beautiful system. Interface. Products. Factories. Client. A masterpiece. Honestly, I cry a little every time I see code this clean.",
        choices: [
          { text: "Wow, that's neat", nextScene: 10 }
        ]
      },

      // SCENE 10 — Sarcastic Commentary
      {
        background: mechanicImg,
        character: michelleImg,
        characterName: "Mechanic Michelle",
        dialogue:
          "Look at you, still here. Most students disappear around Scene 4. Good job not running away. Or passing out. Or exploding from pointer confusion.",
        choices: [
          { text: "Thanks... I think?", nextScene: 11 }
        ]
      },

      // SCENE 11 — Warning
      {
        background: mechanicImg,
        character: michelleImg,
        characterName: "Mechanic Michelle",
        dialogue:
          "Listen carefully: If you EVER create vehicles directly in your client code again, I will personally revoke your keyboard privileges. Use. The. Factory.",
        choices: [
          { text: "I swear I'll behave", nextScene: 12 }
        ]
      },

      // SCENE 12 — Final Sarcastic Wrap
      {
        background: mechanicImg,
        character: michelleImg,
        characterName: "Mechanic Michelle",
        dialogue:
          "Well, look at that. You actually understand the Factory Method. I’m almost proud. ALMOST. Now go build something before I change my mind.",
        choices: [
          { text: "Complete Story", nextScene: "HOME" }
        ]
      }
    ];
  }
}


class Shapesboard {
  getTitle() { return "SHAPES"; }
  
  getIcon() { 
    return <img src={require('./assests/shapes.png')} alt="🔺⭕⬛" />
  }
  
  getDescription() {
    return "Squares, Circles, Triangles – Oh My! 🔺⭕⬛......";
  }
  
  // Break code into digestible chunks
  getCodeChunks() {
    return {
      product: `// --- Product Interface ---
class Shape {
public:
    virtual std::string draw() = 0;
    virtual double area() = 0;
    virtual ~Shape() = default;
};`,
      
      concreteProduct: `// --- Concrete Product: Circle ---
class Circle : public Shape {
private:
    double radius;

public:
    Circle(double r) : radius(r) {}

    std::string draw() override {
        return "Drawing a circle";
    }

    double area() override {
        return M_PI * radius * radius;
    }
};`,
      
      factory: `// --- Creator / Factory ---
class ShapeFactory {
public:
    virtual std::unique_ptr<Shape> createShape() = 0;
    virtual ~ShapeFactory() = default;
};`,
      
      concreteFactory: `// --- Concrete Factory for Circle ---
class CircleFactory : public ShapeFactory {
private:
    double radius;

public:
    CircleFactory(double r) : radius(r) {}

    std::unique_ptr<Shape> createShape() override {
        return std::make_unique<Circle>(radius);
    }
};`,
      
      client: `// --- Client Code ---
int main() {
    // Create a circle of radius 5
    std::unique_ptr<ShapeFactory> factory = std::make_unique<CircleFactory>(5.0);
    std::unique_ptr<Shape> circle = factory->createShape();

    std::cout << circle->draw() << std::endl;
    std::cout << "Area: " << circle->area() << std::endl;

    return 0;
}`
    };
  }
  
  getCodeExample() {
    const chunks = this.getCodeChunks();
    return `#include <iostream>
#include <memory>
#include <cmath>
#include <string>

${chunks.product}

${chunks.concreteProduct}

${chunks.factory}

${chunks.concreteFactory}

${chunks.client}`;
  }
  
  getColor() { return "#8B4513"; }
  
  getDiagram() {
    return `ShapeFactory
    ↓
createShape(type)
    ↓
┌────────────────┬────────────────┐
Circle         Square       Triangle`;
  }
  
  getNovelScenes() {
  const chunks = this.getCodeChunks();
  const diagram = this.getDiagram();

  return [
    // SCENE 0
    {
      id: 0,
      background: galleryImg,
      character: sophiaImg,
      characterName: "Artist Sophia",
      dialogue: "Hey there! I’m Sophia, a free-spirited digital artist 🌈🎨. Let’s explore how the Factory Method helps me create different shapes for my artwork effortlessly!",
      choices: [
        { text: "Show me your shapes", nextScene: 1 },
        { text: "Why use a factory?", nextScene: 4 }
      ]
    },

    // SCENE 1
    {
      id: 1,
      background: galleryImg,
      character: sophiaImg,
      characterName: "Artist Sophia",
      dialogue: "In my designs, I play with all kinds of shapes — circles, squares, triangles, polygons… each has its own vibe and properties, and sometimes math sneaks in 😉.",
      choices: [
        { text: "How do you manage all that?", nextScene: 2 }
      ]
    },

    // SCENE 2
    {
      id: 2,
      background: galleryImg,
      character: sophiaImg,
      characterName: "Artist Sophia",
      dialogue: "The ShapeFactory is my creative buddy! I just say what I want, and it returns the perfect shape object, ready to be drawn, colored, and measured. Flowing, effortless, magical.",
      choices: [
        { text: "Show me an example", nextScene: 3 },
        { text: "What methods does it use?", nextScene: 5 },
        { text: "Show me the code!", nextScene: 7 }
      ]
    },

    // SCENE 3
    {
      id: 3,
      background: galleryImg,
      character: sophiaImg,
      characterName: "Artist Sophia",
      dialogue: "For instance, a CircleFactory gives me a Circle object with `draw()` and `area()`. Everything is consistent and harmonious, no matter the shape.",
      choices: [
        { text: "So elegant!", nextScene: 6 },
        { text: "Show me the code!", nextScene: 7 }
      ]
    },

    // SCENE 4 — Why use a factory
    {
      id: 4,
      background: galleryImg,
      character: sophiaImg,
      characterName: "Artist Sophia",
      dialogue: "Without a factory, I’d have endless if-else chains cluttering my code 🌿. The factory centralizes creation, leaving my mind free to flow with creativity and colors.",
      choices: [
        { text: "I see!", nextScene: 2 }
      ]
    },

    // SCENE 5 — Methods
    {
      id: 5,
      background: galleryImg,
      character: sophiaImg,
      characterName: "Artist Sophia",
      dialogue: "Each shape follows the Shape interface: `draw()` and `area()`. Like having a toolkit that works for every shape, no matter how wild or whimsical.",
      choices: [
        { text: "Clever!", nextScene: 6 },
        { text: "Show me the code!", nextScene: 7 }
      ]
    },

    // SCENE 6 — Flexibility
    {
      id: 6,
      background: galleryImg,
      character: sophiaImg,
      characterName: "Artist Sophia",
      dialogue: "And when inspiration strikes? A new shape class is all I need. The factory adapts effortlessly. Coding art has never felt more free!",
      choices: [
        { text: "Show me the code!", nextScene: 7 },
        { text: "Perfect!", nextScene: 14 }
      ]
    },

    // SCENE 7 — Shape Interface
    {
      id: 7,
      background: galleryImg,
      character: sophiaImg,
      characterName: "Artist Sophia",
      dialogue: "Let’s begin with the Shape interface — my canvas foundation. Every shape must implement `draw()` and `area()`. Keeps my artwork and code flowing beautifully.",
      codeExample: chunks.product,
      choices: [
        { text: "Show me a real shape!", nextScene: 8 }
      ]
    },

    // SCENE 8 — Concrete Product
    {
      id: 8,
      background: galleryImg,
      character: sophiaImg,
      characterName: "Artist Sophia",
      dialogue: "Here’s a Circle! It has a radius and implements both `draw()` and `area()`. Math meets art in perfect harmony — π × r², and voilà, magic happens!",
      codeExample: chunks.concreteProduct,
      choices: [
        { text: "How do we create shapes?", nextScene: 9 }
      ]
    },

    // SCENE 9 — Factory Interface
    {
      id: 9,
      background: galleryImg,
      character: sophiaImg,
      characterName: "Artist Sophia",
      dialogue: "This is the ShapeFactory interface — my studio blueprint. Every concrete factory implements `createShape()` to ensure all shapes can be generated consistently.",
      codeExample: chunks.factory,
      choices: [
        { text: "Show me a concrete factory!", nextScene: 10 }
      ]
    },

    // SCENE 10 — Concrete Factory
    {
      id: 10,
      background: galleryImg,
      character: sophiaImg,
      characterName: "Artist Sophia",
      dialogue: "Here’s the CircleFactory. It takes a radius parameter and returns a Circle object. Each factory adds its personal touch to the creation process, like a signature brushstroke.",
      codeExample: chunks.concreteFactory,
      choices: [
        { text: "How do I use this?", nextScene: 11 }
      ]
    },

    // SCENE 11 — Client Code
    {
      id: 11,
      background: galleryImg,
      character: sophiaImg,
      characterName: "Artist Sophia",
      dialogue: "This is the Client Code — how artists like me generate shapes. Instantiate a factory with your parameters, create your shape, draw, and calculate. Effortless flow, beautiful results.",
      codeExample: chunks.client,
      choices: [
        { text: "Show me everything together", nextScene: 12 },
        { text: "I understand now!", nextScene: 6 }
      ]
    },

    // SCENE 12 — Full System
    {
      id: 12,
      background: galleryImg,
      character: sophiaImg,
      characterName: "Artist Sophia",
      dialogue: "Here’s the complete shape creation system! Interface, products, factories, and client code — working in harmony like colors on a canvas. That’s the Factory Method turning code into art!",
      codeExample: this.getCodeExample(),
      choices: [
        { text: "Beautiful!", nextScene: 13 }
      ]
    },

    // SCENE 13 — Sophia’s Reflection
    {
      id: 13,
      background: galleryImg,
      character: sophiaImg,
      characterName: "Artist Sophia",
      dialogue: "Coding can be just as creative as painting. Patterns like Factory Method free your mind to experiment and explore, while keeping everything flowing beautifully.",
      choices: [
        { text: "So inspiring!", nextScene: 14 }
      ]
    },

    // SCENE 14 — Final Artsy Wrap-up
    {
      id: 14,
      background: galleryImg,
      character: sophiaImg,
      characterName: "Artist Sophia",
      dialogue: "Thanks for sharing this creative journey with me 🌻. Whenever you want to mix code with art, the Factory Method is your paintbrush. Keep creating freely!",
      choices: [
        { text: "Complete Story", nextScene: "HOME" }
      ]
    }
  ];
}
}

class Docsboard {
  getTitle() { return "DOC"; }
  
  getIcon() { 
    return <img src={require('./assests/paperclip.png')} alt="📄" />
  }
  
  getDescription() {
    return "PDFs, DOCs, XLSs… and Endless Paperwork 📄........";
  }
  
  // Break code into digestible chunks
  getCodeChunks() {
    return {
      product: `// --- Product Interface ---
class Document {
public:
    virtual std::string open() = 0;
    virtual std::string save() = 0;
    virtual ~Document() = default;
};`,
      
      concreteProduct: `// --- Concrete Product: PDFDocument ---
class PDFDocument : public Document {
public:
    std::string open() override {
        return "Opening PDF viewer";
    }

    std::string save() override {
        return "Saving as .pdf";
    }
};`,
      
      factory: `// --- Creator / Factory ---
class DocumentFactory {
public:
    virtual std::unique_ptr<Document> createDocument() = 0;
    virtual ~DocumentFactory() = default;
};`,
      
      concreteFactory: `// --- Concrete Factory for PDFDocument ---
class PDFDocumentFactory : public DocumentFactory {
public:
    std::unique_ptr<Document> createDocument() override {
        return std::make_unique<PDFDocument>();
    }
};`,
      
      client: `// --- Client Code ---
int main() {
    std::unique_ptr<DocumentFactory> factory = std::make_unique<PDFDocumentFactory>();
    std::unique_ptr<Document> doc = factory->createDocument();

    std::cout << doc->open() << std::endl;
    std::cout << doc->save() << std::endl;

    return 0;
}`
    };
  }
  
  getCodeExample() {
    const chunks = this.getCodeChunks();
    return `#include <iostream>
#include <memory>
#include <string>

${chunks.product}

${chunks.concreteProduct}

${chunks.factory}

${chunks.concreteFactory}

${chunks.client}`;
  }
  
  getColor() { return "#8B4513"; }
  
  getDiagram() {
    return `DocumentFactory
    ↓
createDocument(type)
    ↓
┌────────────────┬────────────────┐
PDF            DOCX         XLSX`;
  }
  
  getNovelScenes() {
    const chunks = this.getCodeChunks();
    const diagram = this.getDiagram();

    return [
      // SCENE 0
      {
        id: 0,
        background: officeImg, 
        character: daniImg,
        characterName: "Manager Danielle",
        dialogue: "Hello! I'm Danielle, your office manager. Today, I’ll walk you through how the Factory Method pattern helps us handle multiple document types efficiently and professionally.",
        choices: [
          { text: "Tell me about documents", nextScene: 1 },
          { text: "Why is this useful?", nextScene: 4 }
        ]
      },

      // SCENE 1
      {
        id: 1,
        background: officeImg, 
        character: daniImg,
        characterName: "Manager Danielle",
        dialogue: "Our team works with PDFs, Word docs, Excel spreadsheets, and more. Each format has unique ways to open, edit, and save, which can get messy without a consistent approach.",
        choices: [
          { text: "Sounds complicated", nextScene: 2 }
        ]
      },

      // SCENE 2
      {
        id: 2,
        background: officeImg, 
        character: daniImg,
        characterName: "Manager Danielle",
        dialogue: "The Factory Method standardizes this process. No matter what document type arrives, the factory creates the correct handler automatically. It keeps our workflow smooth and reliable.",
        choices: [
          { text: "How does it work?", nextScene: 3 },
          { text: "Show me the code!", nextScene: 7 }
        ]
      },

      // SCENE 3
      {
        id: 3,
        background: officeImg, 
        character: daniImg,
        characterName: "Manager Danielle",
        dialogue: "For example, a PDFDocumentFactory returns a PDF handler with `open()` and `save()` methods. WordDocumentFactory does the same for Word files. Uniform interface, different implementations — simple and professional.",
        choices: [
          { text: "That's practical!", nextScene: 4 },
          { text: "Show me the code!", nextScene: 7 }
        ]
      },

      // SCENE 4 — Benefits
      {
        id: 4,
        background: officeImg, 
        character: daniImg,
        characterName: "Manager Danielle",
        dialogue: "This pattern prevents messy if-else chains. Adding a new document type? Simply add a new class and factory. Existing code remains untouched, keeping our office software maintainable.",
        diagram: diagram,
        choices: [
          { text: "Brilliant!", nextScene: 2 }
        ]
      },

      // SCENE 5 — Document Interface
      {
        id: 5,
        background: officeImg, 
        character: daniImg,
        characterName: "Manager Danielle",
        dialogue: "Every document type implements the Document interface with `open()` and `save()` methods. It’s our standard of consistency — ensuring reliable behavior across the system.",
        choices: [
          { text: "Perfect!", nextScene: 6 },
          { text: "Show me the code!", nextScene: 7 }
        ]
      },

      // SCENE 6 — Practical Overview
      {
        id: 6,
        background: officeImg, 
        character: daniImg,
        characterName: "Manager Danielle",
        dialogue: "Now you understand why the Factory Method keeps our office software scalable and professional. It’s a pattern we rely on daily to maintain order and efficiency.",
        choices: [
          { text: "Show me the code!", nextScene: 7 },
          { text: "I’m ready!", nextScene: 12 }
        ]
      },

      // SCENE 7 — Product Interface Code
      {
        id: 7,
        background: officeImg, 
        character: daniImg,
        characterName: "Manager Danielle",
        dialogue: "Let's begin with the Document interface. Think of it as a blueprint — every document must have `open()` and `save()`. Like a well-organized filing system!",
        codeExample: chunks.product,
        choices: [
          { text: "Show me a real document!", nextScene: 8 }
        ]
      },

      // SCENE 8 — Concrete Product
      {
        id: 8,
        background: officeImg, 
        character: daniImg,
        characterName: "Manager Danielle",
        dialogue: "Here’s a PDFDocument, a concrete product. It implements both methods: opening with a PDF viewer and saving as a .pdf. Each document type handles its responsibilities gracefully.",
        codeExample: chunks.concreteProduct,
        choices: [
          { text: "How do we create documents?", nextScene: 9 }
        ]
      },

      // SCENE 9 — Factory Interface
      {
        id: 9,
        background: officeImg, 
        character: daniImg,
        characterName: "Manager Danielle",
        dialogue: "This is the DocumentFactory interface — a blueprint for document creation. Every concrete factory must implement `createDocument()` to maintain uniform standards.",
        codeExample: chunks.factory,
        choices: [
          { text: "Show me a concrete factory", nextScene: 10 }
        ]
      },

      // SCENE 10 — Concrete Factory
      {
        id: 10,
        background: officeImg, 
        character: daniImg,
        characterName: "Manager Danielle",
        dialogue: "Here’s the PDFDocumentFactory. It knows exactly how to create PDF documents. Need Word? We simply add a WordDocumentFactory. Clear, precise, professional.",
        codeExample: chunks.concreteFactory,
        choices: [
          { text: "How does the client use it?", nextScene: 11 }
        ]
      },

      // SCENE 11 — Client Code
      {
        id: 11,
        background: officeImg, 
        character: daniImg,
        characterName: "Manager Danielle",
        dialogue: "Here’s how our staff uses it: choose the right factory → create your document → open and save. The client never worries about the inner workings. Clean and professional workflow.",
        codeExample: chunks.client,
        choices: [
          { text: "Show the complete system", nextScene: 12 }
        ]
      },

      // SCENE 12 — Complete System
      {
        id: 12,
        background: officeImg, 
        character: daniImg,
        characterName: "Manager Danielle",
        dialogue: "Here’s the complete document management system. Interface, products, factories, client code — all integrated. The Factory Method ensures our office operations are smooth, reliable, and maintainable.",
        codeExample: this.getCodeExample(),
        choices: [
          { text: "Excellent!", nextScene: 13 }
        ]
      },

      // SCENE 13 — Professional Wrap-Up
      {
        id: 13,
        background: officeImg,
        character: daniImg,
        characterName: "Manager Danielle",
        dialogue: "Thank you for following along. Remember, patterns like Factory Method help us work efficiently and professionally. With this knowledge, you can handle new document types or expand systems confidently.",
        choices: [
          { text: "Complete Story", nextScene: "HOME" }
        ]
      }
    ];
  }
}

class Emailboard {
  getTitle() { return "EMAILS"; }
  
  getIcon() { 
    return <img src={require('./assests/notifications.png')} alt="📧" />
  }
  
  getDescription() {
    return "Bing, Ping, Ding! 📧.......";
  }
  
  // Break code into digestible chunks
  getCodeChunks() {
    return {
      product: `// --- Product Interface ---
class Notification {
public:
    virtual std::string send() = 0;
    virtual ~Notification() = default;
};`,
      
      concreteProducts: `// --- Concrete Products ---
class EmailNotification : public Notification {
public:
    std::string send() override {
        return "Sending email notification";
    }
};

class SMSNotification : public Notification {
public:
    std::string send() override {
        return "Sending SMS notification";
    }
};`,
      
      factory: `// --- Creator / Factory ---
class NotificationFactory {
public:
    virtual std::unique_ptr<Notification> createNotification() = 0;
    virtual ~NotificationFactory() = default;
};`,
      
      concreteFactories: `// --- Concrete Factories ---
class EmailNotificationFactory : public NotificationFactory {
public:
    std::unique_ptr<Notification> createNotification() override {
        return std::make_unique<EmailNotification>();
    }
};

class SMSNotificationFactory : public NotificationFactory {
public:
    std::unique_ptr<Notification> createNotification() override {
        return std::make_unique<SMSNotification>();
    }
};`,
      
      client: `// --- Client Code ---
int main() {
    // Email Notification
    std::unique_ptr<NotificationFactory> emailFactory = std::make_unique<EmailNotificationFactory>();
    auto email = emailFactory->createNotification();
    std::cout << email->send() << std::endl;

    // SMS Notification
    std::unique_ptr<NotificationFactory> smsFactory = std::make_unique<SMSNotificationFactory>();
    auto sms = smsFactory->createNotification();
    std::cout << sms->send() << std::endl;

    return 0;
}`
    };
  }
  
  getCodeExample() {
    const chunks = this.getCodeChunks();
    return `#include <iostream>
#include <memory>
#include <string>

${chunks.product}

${chunks.concreteProducts}

${chunks.factory}

${chunks.concreteFactories}

${chunks.client}`;
  }
  
  getColor() { return "#8B4513"; }
  
  getDiagram() {
    return `NotificationFactory
    ↓
createNotification(type)
    ↓
┌────────────────┬────────────────┐
Email          SMS          Push`;
  }
  
  getNovelScenes() {
  const chunks = this.getCodeChunks();
  const diagram = this.getDiagram();

  return [
    // SCENE 0
    {
      id: 0,
      background: techImg,
      character: lisaImg,
      characterName: "Developer Lisa",
      dialogue: "Hi… um, I’m Lisa. I’m a backend developer and a bit of a music nerd 🎧. Let me quietly show you how we use the Factory Method to manage notifications in our app.",
      choices: [
        { text: "Tell me about notifications", nextScene: 1 },
        { text: "Why use a factory?", nextScene: 4 }
      ]
    },

    // SCENE 1
    {
      id: 1,
      background: techImg,
      character: lisaImg,
      characterName: "Developer Lisa",
      dialogue: "Our users like notifications in different ways — emails, SMS, push notifications… each has its own API and quirks. Managing them manually is like trying to play five instruments at once… quietly, alone.",
      choices: [
        { text: "How do you manage that?", nextScene: 2 }
      ]
    },

    // SCENE 2
    {
      id: 2,
      background: techImg,
      character: lisaImg,
      characterName: "Developer Lisa",
      dialogue: "The NotificationFactory pattern is my safety net. I just specify a type, and the factory returns the right object ready to send — clean, safe, predictable.",
      choices: [
        { text: "Show me an example", nextScene: 3 },
        { text: "What's the benefit?", nextScene: 5 },
        { text: "Show me the code!", nextScene: 7 }
      ]
    },

    // SCENE 3
    {
      id: 3,
      background: techImg,
      character: lisaImg,
      characterName: "Developer Lisa",
      dialogue: "For example, an EmailNotificationFactory returns an EmailNotification with a `send()` method. SMSNotificationFactory does the same for SMS. Same interface, different instruments in the orchestra.",
      choices: [
        { text: "That's elegant!", nextScene: 6 },
        { text: "Show me the code!", nextScene: 7 }
      ]
    },

    // SCENE 4 — Why use a factory
    {
      id: 4,
      background: techImg,
      character: lisaImg,
      characterName: "Developer Lisa",
      dialogue: "Without a factory, our code would be scattered everywhere. Every notification type would need its own messy logic. With the factory, everything is centralized and… kind of peaceful.",
      choices: [
        { text: "I see…", nextScene: 2 }
      ]
    },

    // SCENE 5 — Benefit
    {
      id: 5,
      background: techImg,
      character: lisaImg,
      characterName: "Developer Lisa",
      dialogue: "The cool part? If marketing wants Slack notifications tomorrow, I just add SlackNotification and SlackNotificationFactory. No other code breaks — it’s like adding a new track to a song I already love.",
      choices: [
        { text: "So flexible!", nextScene: 6 },
        { text: "Show me the code!", nextScene: 7 }
      ]
    },

    // SCENE 6 — Wrap-up insight
    {
      id: 6,
      background: techImg,
      character: lisaImg,
      characterName: "Developer Lisa",
      dialogue: "Exactly. Factory Method gives us scalability and maintainability. It’s like composing music in a well-organized studio — everything has its place and harmony.",
      choices: [
        { text: "Show me the code!", nextScene: 7 },
        { text: "Perfect!", nextScene: 14 }
      ]
    },

    // SCENE 7 — Notification Interface
    {
      id: 7,
      background: techImg,
      character: lisaImg,
      characterName: "Developer Lisa",
      dialogue: "Let’s start with the Notification interface — it defines `send()`. Every notification type must follow this, like every instrument following the score. Simple, elegant.",
      codeExample: chunks.product,
      choices: [
        { text: "Show me the notifications!", nextScene: 8 }
      ]
    },

    // SCENE 8 — Concrete Products
    {
      id: 8,
      background: techImg,
      character: lisaImg,
      characterName: "Developer Lisa",
      dialogue: "Here are our concrete notifications: EmailNotification and SMSNotification. Each sends differently — SMTP for email, Twilio for SMS. Different sounds, same harmony.",
      codeExample: chunks.concreteProducts,
      choices: [
        { text: "How do we create them?", nextScene: 9 }
      ]
    },

    // SCENE 9 — Factory Interface
    {
      id: 9,
      background: techImg,
      character: lisaImg,
      characterName: "Developer Lisa",
      dialogue: "This is the NotificationFactory interface — it defines `createNotification()`. Any factory that follows it ensures notifications can be generated in an orderly, predictable way.",
      codeExample: chunks.factory,
      choices: [
        { text: "Show me a concrete factory!", nextScene: 10 }
      ]
    },

    // SCENE 10 — Concrete Factories
    {
      id: 10,
      background: techImg,
      character: lisaImg,
      characterName: "Developer Lisa",
      dialogue: "Here are our concrete factories: EmailNotificationFactory for emails, SMSNotificationFactory for messages. Each one knows exactly how to create its notification — like a musician mastering their instrument.",
      codeExample: chunks.concreteFactories,
      choices: [
        { text: "How do we use them?", nextScene: 11 }
      ]
    },

    // SCENE 11 — Client Code
    {
      id: 11,
      background: techImg,
      character: lisaImg,
      characterName: "Developer Lisa",
      dialogue: "This is the Client Code. Pick a factory, create your notification, call `send()`. Everything works smoothly. Like pressing play on a perfectly mixed track.",
      codeExample: chunks.client,
      choices: [
        { text: "Show full program", nextScene: 12 },
        { text: "I understand now!", nextScene: 6 }
      ]
    },

    // SCENE 12 — Full System
    {
      id: 12,
      background: techImg,
      character: lisaImg,
      characterName: "Developer Lisa",
      dialogue: "Here’s the complete notification system — interface, products, factories, client code. Everything in harmony, orchestrated beautifully. That’s Factory Method in action.",
      codeExample: this.getCodeExample(),
      choices: [
        { text: "Beautiful!", nextScene: 13 }
      ]
    },

    // SCENE 13 — Lisa’s Reflection
    {
      id: 13,
      background: techImg,
      character: lisaImg,
      characterName: "Developer Lisa",
      dialogue: "I love quiet moments coding. Patterns like Factory Method let me compose, experiment, and stay organized. It’s music to my developer soul 🎵💻.",
      choices: [
        { text: "So inspiring!", nextScene: 14 }
      ]
    },

    // SCENE 14 — Final Wrap-Up
    {
      id: 14,
      background: techImg,
      character: lisaImg,
      characterName: "Developer Lisa",
      dialogue: "Thanks for letting me share this little coding symphony with you. Whenever you need clean, flexible code, remember Factory Method is like the sheet music guiding the melody. Play on!",
      choices: [
        { text: "Complete Story", nextScene: "HOME" }
      ]
    }
  ];
}
}

export default function StoryBoard() {
  // State declarations should be at the top of your component
  const [selectedCard, setSelectedCard] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showNovel, setShowNovel] = useState(false);
  const [currentScene, setCurrentScene] = useState(0);
  const [notes, setNotes] = useState({});
  const [currentNote, setCurrentNote] = useState('');
  const [showNotepad, setShowNotepad] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [currentReward, setCurrentReward] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [userProgress, setUserProgress] = useState({
    xp: 0,
    level: 1,
    badges: [],
    completedStories: []
  });

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await getUserId(); // or however you fetch it
      setUserId(id);
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    // Stop any previous speech when scene changes
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, [currentScene]);

  useEffect(() => {
    if (userId) {
      loadUserData();
    }
  }, [userId]);

  const speak = (text) => {
    // Stop any currently playing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Get available voices and select a female voice
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(voice => 
      voice.name.includes('Female') || 
      voice.name.includes('female') ||
      voice.name.includes('Woman') ||
      voice.name.includes('Samantha') ||
      voice.name.includes('Victoria') ||
      voice.name.includes('Karen') ||
      voice.name.includes('Zira')
    );
    
    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }
    
    utterance.rate = 0.9; // Slightly slower for dramatic effect
    utterance.pitch = 1.2; // Higher pitch for more feminine sound
    utterance.volume = 1;
    window.speechSynthesis.speak(utterance);
  };

  const speakWithTracking = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Get available voices and select a female voice
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(voice => 
      voice.name.includes('Female') || 
      voice.name.includes('female') ||
      voice.name.includes('Woman') ||
      voice.name.includes('Samantha') ||
      voice.name.includes('Victoria') ||
      voice.name.includes('Karen') ||
      voice.name.includes('Zira')
    );
    
    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }
    
    utterance.rate = 0.9;
    utterance.pitch = 1.2; // Higher pitch for more feminine sound
    utterance.volume = 1;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const loadUserData = async () => {
    if (!userId) return;
    
    try {
      setLoading(true);

      // Try to get user, if not exists, create them
      let userData;
      try {
        userData = await api.user.getUser(userId);
      } catch (error) {
        // User doesn't exist, create them
        console.log('User not found, creating new user...');
        await api.user.createUser(userId); // You'll need this API method
        userData = { data: { xp: 0, level: 1 } };
      }
      
      // Get completed stories (will be empty for new user)
      const storiesData = await api.story.getCompletedStories(userId);
      
      // Get badges (will be empty for new user)
      const badgesData = await api.badge.getBadges(userId);

      setUserProgress({
        xp: userData.data.xp || 0,
        level: userData.data.level || 1,
        badges: badgesData.data || [],
        completedStories: storiesData.data?.map(s => s.story_type) || []
      });

    } catch (error) {
      console.error('Error loading user data:', error);
      // Set default values so app isn't stuck
      setUserProgress({
        xp: 0,
        level: 1,
        badges: [],
        completedStories: []
      });
    } finally {
      setLoading(false);
    }
  };

  // Loading check should come after state declarations
  if (loading || !userId) {
    return (
      <div className="container">
        <div className="frame">
          <h2>Loading your progress...</h2>
        </div>
      </div>
    );
  }

  const handleStoryComplete = async () => {
    const storyTitle = selectedCard.getTitle();
    const badgeKey = STORY_TYPE_MAP[storyTitle] || storyTitle.toLowerCase();
    const badge = STORY_BADGES[badgeKey];

    if (!badge) {
      console.warn('No badge found for story type:', storyTitle, 'mapped to:', badgeKey);
      setShowNovel(false);
      setCurrentScene(0);
      return;
    }

    try {
      // Mark story as complete
      await api.story.completeStory(userId, badgeKey, currentScene);

      // Award badge
      await api.badge.awardBadge(userId, badgeKey, badge.name, badge.xp);

      // Update XP
      const newXP = userProgress.xp + badge.xp;
      await api.user.updateXP(userId, newXP);

      // Update local state
      const newLevel = Math.floor(newXP / 200) + 1;
      
      setUserProgress(prev => ({
        ...prev,
        xp: newXP,
        level: newLevel,
        badges: [...prev.badges, badge],
        completedStories: [...prev.completedStories, badgeKey]
      }));

      // Show reward modal
      setCurrentReward({
        badge,
        xp: badge.xp,
        newXP,
        leveledUp: newLevel > userProgress.level,
        newLevel
      });
      
      setShowReward(true);

    } catch (error) {
      console.error('Error completing story:', error);
      console.error('Error message:', error.message);
      alert(`Failed to save progress: ${error.message}`);
    }
  };

  const factory = new StoryboardFactory();
  const exampleboards = [
    { type: 'PIZZA', name: 'Pizzeria' },
    { type: 'COFFEE', name: 'Coffee Shop' },
    { type: 'VEHICLES', name: 'Auto Repair Center' },
    { type: 'SHAPES', name: 'Shape Creator' },
    { type: 'DOC', name: 'Document Handler' },
    { type: 'EMAILS', name: 'Notifications' }
  ];

  // ============================================
  // HELPER FUNCTIONS
  // ============================================

  const calculateLevel = (xp) => {
    return Math.floor(xp / 200) + 1;
  };

  const isStoryUnlocked = (storyType) => {
    const badgeKey = STORY_TYPE_MAP[storyType] || storyType.toLowerCase();
    const storyOrder = STORY_BADGES[badgeKey]?.order || 0;
    
    if (storyOrder === 1) return true;
    
    const previousStory = Object.entries(STORY_BADGES).find(
      ([_, badge]) => badge.order === storyOrder - 1
    );
    
    if (previousStory) {
      return userProgress.completedStories.includes(previousStory[0]);
    }
    return true;
  };

  const handleCardClick = (type) => {    
    if (!isStoryUnlocked(type)) {
      alert('🔒 Complete the previous story to unlock this one!');
      return;
    }
    setIsAnimating(true);
    setTimeout(() => {
      const card = factory.createExampleboard(type);
      setSelectedCard(card);
      setCurrentNote(notes[type] || '');
      setShowNovel(true);
      setCurrentScene(0);
      setIsAnimating(false);
    }, 300);
  };

  const handleBack = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedCard(null);
      setShowNovel(false);
      setCurrentScene(0);
      setShowNotepad(false);
      setIsAnimating(false);
    }, 300);
  };

  const handleNoteChange = (e) => {
    const value = e.target.value;
    setCurrentNote(value);
    if (selectedCard) {
      setNotes(prev => ({
        ...prev,
        [selectedCard.getTitle()]: value
      }));
    }
  };

  const downloadNotes = () => {
    if (!selectedCard || !currentNote.trim()) return;
    
    const blob = new Blob([currentNote], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedCard.getTitle()}_notes.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // ============================================
  // COMPONENTS
  // ============================================

  const ProgressDisplay = () => {
    const xpProgress = (userProgress.xp % 600) / 6;
    
    return (
      <div className="progress-display">
        <div className="level-display">
          <span className="level-badge">Lv. {userProgress.level}</span>
        </div>
        <div className="xp-display">
          <div className="xp-bar-small">
            <div 
              className="xp-fill-small" 
              style={{ width: `${xpProgress}%` }}
            />
          </div>
          <span className="xp-text-small">{userProgress.xp} XP</span>
        </div>
        <div className="badge-count">
          🏆 {userProgress.badges.length}/{Object.keys(STORY_BADGES).length}
        </div>
      </div>
    );
  };

  const RewardModal = () => {
    if (!showReward || !currentReward) return null;

    return (
      <div className="reward-overlay">
        <div className="reward-modal">
          <div className="reward-header">
            <h2>🎉 Story Complete! 🎉</h2>
          </div>
          
          <div className="reward-content">
            <div className="badge-earned">
              <img 
                src={currentReward.badge.icon} 
                alt={currentReward.badge.name} 
                className="badge-icon-large"
              />
              <h3>{currentReward.badge.name}</h3>
              <p>{currentReward.badge.description}</p>
            </div>

            <div className="xp-gained">
              <div className="xp-animation">+{currentReward.xp} XP</div>
              <div className="xp-bar">
                <div 
                  className="xp-fill" 
                  style={{ width: `${(currentReward.newXP % 200) / 6}%` }}
                />
              </div>
              <p className="xp-text">
                {currentReward.newXP % 200}/600 Next Level {currentReward.newLevel + 1}
              </p>
            </div>

            {currentReward.leveledUp && (
              <div className="level-up">
                <h2>⭐ LEVEL UP! ⭐</h2>
                <p>You've reached Level {currentReward.newLevel}!</p>
              </div>
            )}
          </div>

          <button
            className="reward-continue-btn"
            onClick={() => {
              setShowReward(false);
              setShowNovel(false);
              setCurrentScene(0);
            }}
          >
            Continue
          </button>
        </div>
      </div>
    );
  };

  // ============================================
  // RENDER
  // ============================================

  return (
    <div className="container">
      
      <ProgressDisplay />
      <RewardModal />
      
      <div className={`frame ${isAnimating ? 'animating' : ''}`}>
        {!selectedCard ? (
          <div className="scrollable-content">
            <div className="title">
              <h1 className="main-title">FACTORY METHOD</h1>
              <h2 className="main-title">ADVENTURES</h2>
              <p className="subtitle">Real-Life Examples</p>
              <p className="tagline">
                "Don't just read about factory design patterns – play with them! Click through storyboards, experience visual novels, and discover how objects communicate inside real-world systems."
              </p>
            </div>
            
            <div className="list-container">
              {exampleboards.map((s, index) => {
                const tempStoryboard = factory.createExampleboard(s.type);
                const hasNotes = notes[s.type] && notes[s.type].trim().length > 0;
                const badgeKey = STORY_TYPE_MAP[s.type] || s.type.toLowerCase();
                const hasCompleted = userProgress.completedStories.includes(badgeKey);
                const isUnlocked = isStoryUnlocked(s.type);

                return (
                  <div
                    key={index}
                    className={`card-list ${!isUnlocked ? 'locked' : ''} ${hasCompleted ? 'completed' : ''}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => handleCardClick(s.type)}
                  >
                    <div className="icon-container">{tempStoryboard.getIcon()}</div>
                    <div className="card-content">
                      <p className="card-text">{s.name}</p>
                      <div className="click-hint">
                        {isUnlocked ? 'Click to explore →' : '🔒 Locked - Complete previous story'}
                      </div>
                    </div>
                    {hasNotes && <div className="note-badge">📝 Notes</div>}
                    {hasCompleted && <div className="completed-badge">✓ Completed</div>}
                    {!isUnlocked && <div className="locked-badge">🔒</div>}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="detail-view">
            <button className="back-button" onClick={handleBack}>← BACK</button>
            {showNovel && (
              <div className="visual-novel">
                {(() => {
                  const scenes = selectedCard.getNovelScenes();
                  const scene = scenes[currentScene];
                  
                  if (!scene) {
                    return (
                      <div className="novel-container">
                        <div className="dialogue-box">
                          <p>Scene not found. Please go back.</p>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div className="novel-container">
                      <div className="novel-background">
                        <img
                          src={scene.background}
                          alt="background"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                      <div className="novel-content">
                        <div className="character-display">
                          <img
                            src={scene.character}
                            alt={scene.characterName}
                            style={{ maxHeight: '400px', maxWidth: '300px' }}
                          />
                        </div>
                        <div className="dialogue-box">
                          <div className="character-name">
                            {scene.characterName}
                            <button
                              className="speaker-button"
                              onClick={() => isSpeaking ? stopSpeaking() : speakWithTracking(scene.dialogue)}
                              title={isSpeaking ? "Stop speaking" : "Read dialogue aloud"}
                            >
                              {isSpeaking ? '⏸️' : '🔊'}
                            </button>
                          </div>
                          <div className="dialogue-text">{scene.dialogue}</div>

                          {scene.codeExample && (
                            <div className="code-display">
                              <div className="code-header">
                                <span className="code-title">💻 Code Example</span>
                              </div>
                              <pre className="code-content">
                                <code>{scene.codeExample}</code>
                              </pre>
                            </div>
                          )}

                          {scene.diagram && (
                            <div className="diagram-display">
                              <div className="diagram-header">
                                <span className="diagram-title">📊 Pattern Diagram</span>
                              </div>
                              <pre className="diagram-content">{scene.diagram}</pre>
                            </div>
                          )}

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

                            {scene.choices ? (
                              <div className="choice-buttons">
                                {scene.choices.map((choice, idx) => (
                                  <button
                                    key={idx}
                                    className="novel-button choice-button"
                                    onClick={() => {
                                      if (choice.nextScene === "HOME") {
                                        handleStoryComplete();
                                      } else if (choice.nextScene !== null && choice.nextScene !== undefined) {
                                        setCurrentScene(choice.nextScene);
                                      }
                                    }}
                                  >
                                    {choice.text}
                                  </button>
                                ))}
                              </div>
                            ) : currentScene < scenes.length - 1 ? (
                              <button
                                className="novel-button"
                                onClick={() => setCurrentScene(currentScene + 1)}
                              >
                                Next →
                              </button>
                            ) : (
                              <button
                                className="novel-button novel-button-finish"
                                onClick={handleStoryComplete}
                              >
                                Complete Story
                              </button>
                            )}
                          </div>
                        </div>
                      </div>

                      <button
                        className="notepad-toggle-btn"
                        onClick={() => setShowNotepad(!showNotepad)}
                        title={showNotepad ? "Hide Notes" : "Show Notes"}
                      >
                        📝
                      </button>

                      {showNotepad && (
                        <div className="floating-notepad">
                          <div className="notepad-header">
                            <span className="notepad-title">📝 Quick Notes</span>
                            <button
                              className="notepad-close"
                              onClick={() => setShowNotepad(false)}
                            >
                              ×
                            </button>
                          </div>
                          <textarea
                            className="notepad-textarea"
                            value={currentNote}
                            onChange={handleNoteChange}
                            placeholder={`Take notes about ${selectedCard.getTitle()}...\n\nExample:\n- Key concepts\n- Important patterns\n- Questions to explore`}
                          />
                          <button
                            className="notepad-download"
                            onClick={downloadNotes}
                            disabled={!currentNote.trim()}
                          >
                            💾 Save Notes
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
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