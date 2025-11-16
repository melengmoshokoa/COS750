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
      {
        id: 0,
        background: coffeeImg,
        character: baristaImg,
        characterName: "Barista Emma",
        dialogue: "Welcome to **Code & Coffee** – the only café where beans and bugs get debugged side-by-side! I'm Emma, your jittery but dependable barista. Ready for a warm cup of Factory Method?",
        choices: [
          { text: "Give me the espresso version!", nextScene: 1 },
          { text: "I'm here for the code (and caffeine).", nextScene: 1 }
        ]
      },
      {
        id: 1,
        background: coffeeImg,
        character: baristaImg,
        characterName: "Barista Emma",
        dialogue: "Our café gets all sorts of orders: Espresso, Latte, Cappuccino, and even declarations of love (over coffee). Each drink has its own recipe – but our workflow stays the same: brew → serve → make the customer smile.",
        choices: [{ text: "How do you handle all that?", nextScene: 2 }]
      },
      {
        id: 2,
        background: coffeeImg,
        character: baristaImg,
        characterName: "Barista Emma",
        dialogue: "Meet the CoffeeFactory – our heroic ordering counter. Tell it 'Latte' and it returns a Latte object, ready to be brewed. No frantic recipe searching, no milk fights.",
        choices: [
          { text: "Show me an example order", nextScene: 3 },
          { text: "What's the interface?", nextScene: 5 }
        ]
      },
      {
        id: 3,
        background: coffeeImg,
        character: baristaImg,
        characterName: "Barista Emma",
        dialogue: "You: 'One Latte, please.'\nEmma: 'One Latte, coming up!' The factory says: 'Creating Latte object!' – then the machine whispers: 'Psst – call brew() and I'll do the rest.'",
        choices: [
          { text: "Cute. Show the diagram", nextScene: 4 },
          { text: "Show me the code – quick!", nextScene: 6 }
        ]
      },
      {
        id: 4,
        background: coffeeImg,
        character: baristaImg,
        characterName: "Barista Emma",
        dialogue: "Diagram time! Imagine: Creator → Factory → Coffee (interface) → Concrete Coffees. It's like a conveyor belt of caffeinated joy.",
        diagram: diagram,
        choices: [{ text: "Gimme the code", nextScene: 6 }]
      },
      {
        id: 5,
        background: coffeeImg,
        character: baristaImg,
        characterName: "Barista Emma",
        dialogue: "Every drink must implement `brew()` – it's the sacred ritual. If a drink refuses, we send it to the decaf corner.",
        codeExample: chunks.product,
        choices: [{ text: "Show the drinks!", nextScene: 7 }]
      },
      {
        id: 6,
        background: coffeeImg,
        character: baristaImg,
        characterName: "Barista Emma",
        dialogue: "Alright, code-lover. Here's the bite-sized version – interfaces, products, factories. It compiles faster than I can steam milk.",
        codeExample: chunks.product,
        choices: [{ text: "Take me to the drinks", nextScene: 7 }]
      },
      {
        id: 7,
        background: coffeeImg,
        character: baristaImg,
        characterName: "Barista Emma",
        dialogue: "Meet Espresso (short, strong, dramatic) and Latte (tall, milky, hugs your soul). Each has its own `brew()` implementation – but both obey the Coffee interface.",
        codeExample: chunks.concreteProducts,
        choices: [{ text: "Show me factories", nextScene: 8 }]
      },
      {
        id: 8,
        background: coffeeImg,
        character: baristaImg,
        characterName: "Barista Emma",
        dialogue: "The CoffeeFactory interface declares `createCoffee()` – every concrete factory must know how to make its drink. Think of it as the barista's oath.",
        codeExample: chunks.factory,
        choices: [{ text: "Concrete factories please", nextScene: 9 }]
      },
      {
        id: 9,
        background: coffeeImg,
        character: baristaImg,
        characterName: "Barista Emma",
        dialogue: "EspressoFactory? Tiny machine with lots of attitude. LatteFactory? A soft giant who loves steamed milk. Each factory returns its coffee object. No drama, just efficiency.",
        codeExample: chunks.concreteFactories,
        choices: [{ text: "How do customers order?", nextScene: 10 }]
      },
      {
        id: 10,
        background: coffeeImg,
        character: baristaImg,
        characterName: "Barista Emma",
        dialogue: "Client code time: instantiate a factory, call createCoffee(), then brew(). The client never needs to know the coffee's inner secrets – like which bean cried during roast day.",
        codeExample: chunks.client,
        choices: [{ text: "Show full program", nextScene: 11 }]
      },
      {
        id: 11,
        background: coffeeImg,
        character: baristaImg,
        characterName: "Barista Emma",
        dialogue: "Here's the full program – everything stitched together like a perfect latte art heart. Congratulations, you can now 👩‍🍳 brew with design patterns!",
        codeExample: this.getCodeExample(),
        choices: [{ text: "Complete Story ", nextScene: "HOME" }]
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
      {
        background: mechanicImg, 
        character: michelleImg,
        characterName: "Mechanic Michelle",
        dialogue: "Hey there! Welcome to Mich's Auto Shop. Today I'll teach you about the Factory Method pattern using vehicles!",
        choices: [
          { text: "Show me the vehicles", nextScene: 1 },
          { text: "What's a Factory Method?", nextScene: 4 }
        ]
      },
      {
        background: mechanicImg, 
        character: michelleImg,
        characterName: "Mechanic Michelle",
        dialogue: "In my shop, we work on all kinds of vehicles - cars, bikes, trucks, you name it! Each one needs different maintenance.",
        diagram: diagram,
        choices: [
          { text: "That sounds complex", nextScene: 2 }
        ]
      },
      {
        background: mechanicImg, 
        character: michelleImg,
        characterName: "Mechanic Michelle",
        dialogue: "That's where the VehicleFactory pattern helps us. Instead of writing separate code for each vehicle type, the factory handles creation for us!",
        choices: [
          { text: "How does it work?", nextScene: 3 },
          { text: "Show me code", nextScene: 7 }
        ]
      },
      {
        background: mechanicImg, 
        character: michelleImg,
        characterName: "Mechanic Michelle",
        dialogue: "Each vehicle implements a Vehicle interface with methods like drive(), maintenance(), and repair(). The factory creates the right vehicle object for each job!",
        choices: [
          { text: "Brilliant!", nextScene: 6 },
          { text: "Show me the code!", nextScene: 7 }
        ]
      },
      {
        background: mechanicImg, 
        character: michelleImg,
        characterName: "Mechanic Michelle",
        dialogue: "The Factory Method is a creational design pattern. It provides an interface for creating objects, but lets subclasses decide which class to instantiate!",
        choices: [
          { text: "Got it!", nextScene: 2 }
        ]
      },
      {
        background: mechanicImg, 
        character: michelleImg,
        characterName: "Mechanic Michelle",
        dialogue: "Here's the magic: vehicleFactory.createVehicle() returns a Vehicle object with all its methods ready. Same interface, different implementations!",
        choices: [
          { text: "Perfect!", nextScene: 6 },
          { text: "Show me the code!", nextScene: 7 }
        ]
      },
      {
        background: mechanicImg, 
        character: michelleImg,
        characterName: "Mechanic Michelle",
        dialogue: "Now you get it! Want to add electric vehicles? Just create a new ElectricCar class. The factory pattern makes our code flexible and maintainable!",
        choices: [
          { text: "Show me the code!", nextScene: 7 },
          { text: "I'm ready!", nextScene: null }
        ]
      },
      // NEW: Code explanation scenes with chunks
      {
        background: mechanicImg, 
        character: michelleImg,
        characterName: "Mechanic Michelle",
        dialogue: "Let's start with the Vehicle interface! This is our blueprint - every vehicle must implement the drive() method. Think of it as the basic controls every vehicle needs!",
        codeExample: chunks.product,
        choices: [
          { text: "Show me actual vehicles!", nextScene: 8 }
        ]
      },
      {
        background: mechanicImg, 
        character: michelleImg,
        characterName: "Mechanic Michelle",
        dialogue: "Here are our Concrete Products - Car and Bike! Each implements drive() differently. Car drives on 4 wheels, Bike rides on 2 wheels. Same method, different behavior!",
        codeExample: chunks.concreteProducts,
        choices: [
          { text: "How do we create them?", nextScene: 9 }
        ]
      },
      {
        background: mechanicImg, 
        character: michelleImg,
        characterName: "Mechanic Michelle",
        dialogue: "This is the VehicleFactory interface! It's like our manufacturing blueprint. Any factory must implement createVehicle() to produce vehicles!",
        codeExample: chunks.factory,
        choices: [
          { text: "Show me the real factories!", nextScene: 10 }
        ]
      },
      {
        background: mechanicImg, 
        character: michelleImg,
        characterName: "Mechanic Michelle",
        dialogue: "Here are our Concrete Factories! CarFactory builds Cars, BikeFactory builds Bikes. Each factory specializes in creating one type of vehicle!",
        codeExample: chunks.concreteFactories,
        choices: [
          { text: "How do customers use this?", nextScene: 11 }
        ]
      },
      {
        background: mechanicImg, 
        character: michelleImg,
        characterName: "Mechanic Michelle",
        dialogue: "This is the Client Code - how customers actually get vehicles! Pick a factory, create your vehicle, then drive away! Notice how clean and simple the interface is?",
        codeExample: chunks.client,
        choices: [
          { text: "Show me the complete system", nextScene: 12 },
          { text: "I understand now!", nextScene: 6 }
        ]
      },
      {
        background: mechanicImg, 
        character: michelleImg,
        characterName: "Mechanic Michelle",
        dialogue: "Here's the complete vehicle system! All components working together - interface, products, factories, and client. That's the Factory Method pattern revving at full power!",
        codeExample: this.getCodeExample(),
        choices: [
          { text: "Amazing!", nextScene: 6 },
          { text: "Show me the diagram", nextScene: 1 }
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
      {
        background: galleryImg, 
        character: sophiaImg,
        characterName: "Artist Sophia",
        dialogue: "Hello! I'm Sophia, a digital artist. Let me show you how the Factory Method helps me create different shapes in my artwork!",
        choices: [
          { text: "Show me your shapes", nextScene: 1 },
          { text: "Why use a factory?", nextScene: 4 }
        ]
      },
      {
        background: galleryImg, 
        character: sophiaImg,
        characterName: "Artist Sophia",
        dialogue: "In graphic design, we work with many shapes - circles, squares, triangles, and more complex polygons. Each has different properties and calculations.",
        choices: [
          { text: "How do you handle that?", nextScene: 2 }
        ]
      },
      {
        background: galleryImg, 
        character: sophiaImg,
        characterName: "Artist Sophia",
        dialogue: "The ShapeFactory pattern makes it easy! I just tell it what shape I need, and it creates the right object with all its methods ready to use.",
        diagram: diagram,
        choices: [
          { text: "Show me an example", nextScene: 3 },
          { text: "What methods?", nextScene: 5 },
          { text: "Show me the code!", nextScene: 7 }
        ]
      },
      {
        background: galleryImg, 
        character: sophiaImg,
        characterName: "Artist Sophia",
        dialogue: "For example: a CircleFactory gives me a Circle object with draw() and area() methods. Same consistent interface for all shapes!",
        choices: [
          { text: "That's so elegant!", nextScene: 6 },
          { text: "Show me the code!", nextScene: 7 }
        ]
      },
      {
        background: galleryImg, 
        character: sophiaImg,
        characterName: "Artist Sophia",
        dialogue: "Without a factory, I'd need if-else statements everywhere. The factory centralizes object creation, making my code cleaner and easier to extend!",
        choices: [
          { text: "I see!", nextScene: 2 }
        ]
      },
      {
        background: galleryImg, 
        character: sophiaImg,
        characterName: "Artist Sophia",
        dialogue: "Each shape implements the Shape interface: draw() and area(). This consistency makes them interchangeable in my designs!",
        choices: [
          { text: "Smart design!", nextScene: 6 },
          { text: "Show me the code!", nextScene: 7 }
        ]
      },
      {
        background: galleryImg, 
        character: sophiaImg,
        characterName: "Artist Sophia",
        dialogue: "Exactly! And when I need a new shape, I just add a new class. The factory pattern makes digital art programming so much more creative and flexible!",
        choices: [
          { text: "Show me the code!", nextScene: 7 },
          { text: "Perfect!", nextScene: null }
        ]
      },
      // NEW: Code explanation scenes with chunks
      {
        background: galleryImg, 
        character: sophiaImg,
        characterName: "Artist Sophia",
        dialogue: "Let's start with the Shape interface! This is my canvas foundation - every shape must implement draw() and area() methods. It's like having standard tools for all my artwork!",
        codeExample: chunks.product,
        choices: [
          { text: "Show me a real shape!", nextScene: 8 }
        ]
      },
      {
        background: galleryImg, 
        character: sophiaImg,
        characterName: "Artist Sophia",
        dialogue: "Here's a Concrete Product - the Circle! Notice it has a radius property and implements both draw() and area() methods. The area uses π × r² - beautiful math meets beautiful art!",
        codeExample: chunks.concreteProduct,
        choices: [
          { text: "How do we create shapes?", nextScene: 9 }
        ]
      },
      {
        background: galleryImg, 
        character: sophiaImg,
        characterName: "Artist Sophia",
        dialogue: "This is the ShapeFactory interface! It's like my design studio blueprint. Any factory must implement createShape() to produce shapes for my artwork!",
        codeExample: chunks.factory,
        choices: [
          { text: "Show me a real factory!", nextScene: 10 }
        ]
      },
      {
        background: galleryImg, 
        character: sophiaImg,
        characterName: "Artist Sophia",
        dialogue: "Here's the CircleFactory! Notice it takes a radius parameter and uses it to create Circle objects. Each factory can customize its products with specific properties!",
        codeExample: chunks.concreteFactory,
        choices: [
          { text: "How do I use this?", nextScene: 11 }
        ]
      },
      {
        background: galleryImg, 
        character: sophiaImg,
        characterName: "Artist Sophia",
        dialogue: "This is the Client Code - how artists actually create shapes! Create a factory with parameters, generate your shape, then draw and calculate! See how elegant and simple it is?",
        codeExample: chunks.client,
        choices: [
          { text: "Show me everything together", nextScene: 12 },
          { text: "I understand now!", nextScene: 6 }
        ]
      },
      {
        background: galleryImg, 
        character: sophiaImg,
        characterName: "Artist Sophia",
        dialogue: "Here's the complete shape creation system! All the components working in harmony - interface, product, factory, and client. That's the Factory Method pattern creating art through code!",
        codeExample: this.getCodeExample(),
        choices: [
          { text: "Beautiful!", nextScene: 6 },
          { text: "Show me the diagram", nextScene: 2 }
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
      {
        background: officeImg, 
        character: daniImg,
        characterName: "Manager Danielle",
        dialogue: "Welcome! I'm Danielle, an office manager. Let me explain how the Factory Method pattern helps us handle different document types efficiently.",
        choices: [
          { text: "Tell me about documents", nextScene: 1 },
          { text: "Why is this useful?", nextScene: 4 }
        ]
      },
      {
        background: officeImg, 
        character: daniImg,
        characterName: "Manager Danielle",
        dialogue: "Every day, our team works with PDFs, Word docs, Excel spreadsheets, and more. Each format has unique ways to open, edit, and save.",
        choices: [
          { text: "Sounds complicated", nextScene: 2 }
        ]
      },
      {
        background: officeImg, 
        character: daniImg,
        characterName: "Manager Danielle",
        dialogue: "The DocumentFactory pattern standardizes this! No matter what file type comes in, the factory creates the right handler automatically.",
        choices: [
          { text: "How does it work?", nextScene: 3 },
          { text: "Show me the code!", nextScene: 7 }
        ]
      },
      {
        background: officeImg, 
        character: daniImg,
        characterName: "Manager Danielle",
        dialogue: "Simple: a PDFDocumentFactory returns a PDF handler with open() and save() methods. Same interface for all document types!",
        choices: [
          { text: "That's practical!", nextScene: 6 },
          { text: "Show me the code!", nextScene: 7 }
        ]
      },
      {
        background: officeImg, 
        character: daniImg,
        characterName: "Manager Danielle",
        dialogue: "It saves us from writing messy if-else chains. When we need to support a new format, we just add a new document class. No changes to existing code!",
        diagram: diagram,
        choices: [
          { text: "Brilliant!", nextScene: 2 }
        ]
      },
      {
        background: officeImg, 
        character: daniImg,
        characterName: "Manager Danielle",
        dialogue: "Each document type implements the Document interface with open() and save() methods. This ensures consistency across our document management system!",
        choices: [
          { text: "Perfect!", nextScene: 6 },
          { text: "Show me the code!", nextScene: 7 }
        ]
      },
      {
        background: officeImg, 
        character: daniImg,
        characterName: "Manager Danielle",
        dialogue: "Now you understand! The Factory Method makes our office software scalable and maintainable. It's a pattern we use every single day!",
        choices: [
          { text: "Show me the code!", nextScene: 7 },
          { text: "I'm ready!", nextScene: null }
        ]
      },
      // NEW: Code explanation scenes with chunks
      {
        background: officeImg, 
        character: daniImg,
        characterName: "Manager Danielle",
        dialogue: "Let's start with the Document interface! This is our standard contract - every document must implement open() and save() methods. It's like having filing standards for all paperwork!",
        codeExample: chunks.product,
        choices: [
          { text: "Show me a real document!", nextScene: 8 }
        ]
      },
      {
        background: officeImg, 
        character: daniImg,
        characterName: "Manager Danielle",
        dialogue: "Here's a Concrete Product - the PDFDocument! It implements both methods: opening with a PDF viewer and saving as .pdf format. Each document type handles things its own way!",
        codeExample: chunks.concreteProduct,
        choices: [
          { text: "How do we create documents?", nextScene: 9 }
        ]
      },
      {
        background: officeImg, 
        character: daniImg,
        characterName: "Manager Danielle",
        dialogue: "This is the DocumentFactory interface! It's our document processing center blueprint. Any factory must implement createDocument() to handle document creation!",
        codeExample: chunks.factory,
        choices: [
          { text: "Show me a real factory!", nextScene: 10 }
        ]
      },
      {
        background: officeImg, 
        character: daniImg,
        characterName: "Manager Danielle",
        dialogue: "Here's the PDFDocumentFactory! It specializes in creating PDF documents. Need Word docs? We'd add a DOCXDocumentFactory. Each factory knows exactly how to create its format!",
        codeExample: chunks.concreteFactory,
        choices: [
          { text: "How do we use this system?", nextScene: 11 }
        ]
      },
      {
        background: officeImg, 
        character: daniImg,
        characterName: "Manager Danielle",
        dialogue: "This is the Client Code - how our office staff actually uses it! Pick the right factory, create your document, then open and save. Clean, simple, and professional!",
        codeExample: chunks.client,
        choices: [
          { text: "Show me the complete system", nextScene: 12 },
          { text: "I understand now!", nextScene: 6 }
        ]
      },
      {
        background: officeImg, 
        character: daniImg,
        characterName: "Manager Danielle",
        dialogue: "Here's the complete document management system! All components working together - interface, products, factories, and client code. That's the Factory Method organizing our office workflow!",
        codeExample: this.getCodeExample(),
        choices: [
          { text: "Excellent!", nextScene: 6 },
          { text: "Show me the diagram", nextScene: 4 }
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
      {
        background: techImg, 
        character: lisaImg,
        characterName: "Developer Lisa",
        dialogue: "Hi! I'm Lisa, a backend developer. Let me show you how we use the Factory Method to manage different notification types in our app!",
        choices: [
          { text: "Tell me about notifications", nextScene: 1 },
          { text: "Why use a factory?", nextScene: 4 }
        ]
      },
      {
        background: techImg, 
        character: lisaImg,
        characterName: "Developer Lisa",
        dialogue: "Our users want to be notified in different ways - some prefer emails, others want SMS, and many use push notifications. Each has its own API and logic.",
        diagram: diagram,
        choices: [
          { text: "How do you manage that?", nextScene: 2 }
        ]
      },
      {
        background: techImg, 
        character: lisaImg,
        characterName: "Developer Lisa",
        dialogue: "The NotificationFactory pattern saves us! We just specify the type, and the factory creates the appropriate notification object with the right sending method.",
        choices: [
          { text: "Show me an example", nextScene: 3 },
          { text: "What's the benefit?", nextScene: 5 },
          { text: "Show me the code!", nextScene: 7 }
        ]
      },
      {
        background: techImg, 
        character: lisaImg,
        characterName: "Developer Lisa",
        dialogue: "Easy: an EmailNotificationFactory returns an EmailNotification with send() method. Same for SMS - consistent interface across all channels!",
        choices: [
          { text: "That's elegant!", nextScene: 6 },
          { text: "Show me the code!", nextScene: 7 }
        ]
      },
      {
        background: techImg, 
        character: lisaImg,
        characterName: "Developer Lisa",
        dialogue: "Without it, we'd have notification code scattered everywhere. The factory centralizes creation logic, making testing and maintenance so much easier!",
        choices: [
          { text: "Smart!", nextScene: 2 }
        ]
      },
      {
        background: techImg, 
        character: lisaImg,
        characterName: "Developer Lisa",
        dialogue: "The beauty is: when marketing wants to add Slack notifications, we just create SlackNotification class. No changes to existing notification code!",
        choices: [
          { text: "So flexible!", nextScene: 6 },
          { text: "Show me the code!", nextScene: 7 }
        ]
      },
      {
        background: techImg, 
        character: lisaImg,
        characterName: "Developer Lisa",
        dialogue: "Exactly! The Factory Method gives us the flexibility to add new notification channels without breaking existing functionality. That's solid software engineering!",
        choices: [
          { text: "Show me the code!", nextScene: 7 },
          { text: "Perfect!", nextScene: null }
        ]
      },
      // NEW: Code explanation scenes with chunks
      {
        background: techImg, 
        character: lisaImg,
        characterName: "Developer Lisa",
        dialogue: "Let's start with the Notification interface! This is our base contract - every notification type must implement the send() method. Simple but powerful!",
        codeExample: chunks.product,
        choices: [
          { text: "Show me real notifications!", nextScene: 8 }
        ]
      },
      {
        background: techImg, 
        character: lisaImg,
        characterName: "Developer Lisa",
        dialogue: "Here are our Concrete Products - EmailNotification and SMSNotification! Each implements send() differently, using their respective APIs. Email goes through SMTP, SMS through Twilio!",
        codeExample: chunks.concreteProducts,
        choices: [
          { text: "How do we create them?", nextScene: 9 }
        ]
      },
      {
        background: techImg, 
        character: lisaImg,
        characterName: "Developer Lisa",
        dialogue: "This is the NotificationFactory interface! It's our notification system blueprint. Any factory must implement createNotification() to produce notification objects!",
        codeExample: chunks.factory,
        choices: [
          { text: "Show me real factories!", nextScene: 10 }
        ]
      },
      {
        background: techImg, 
        character: lisaImg,
        characterName: "Developer Lisa",
        dialogue: "Here are our Concrete Factories! EmailNotificationFactory creates emails, SMSNotificationFactory creates SMS. Each factory specializes in one notification channel!",
        codeExample: chunks.concreteFactories,
        choices: [
          { text: "How do we use this?", nextScene: 11 }
        ]
      },
      {
        background: techImg, 
        character: lisaImg,
        characterName: "Developer Lisa",
        dialogue: "This is the Client Code - how we actually send notifications! Create the right factory, generate your notification, then send it. See how clean and maintainable it is?",
        codeExample: chunks.client,
        choices: [
          { text: "Show me everything together", nextScene: 12 },
          { text: "I understand now!", nextScene: 6 }
        ]
      },
      {
        background: techImg, 
        character: lisaImg,
        characterName: "Developer Lisa",
        dialogue: "Here's the complete notification system! All components working together - interface, products, factories, and client. That's the Factory Method powering our communication stack!",
        codeExample: this.getCodeExample(),
        choices: [
          { text: "Brilliant!", nextScene: 6 },
          { text: "Show me the diagram", nextScene: 1 }
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