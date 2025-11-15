#include <iostream>
#include <memory>
#include <string>

// --- Product Interface ---
class Coffee {
public:
    virtual std::string brew() = 0;
    virtual ~Coffee() = default;
};

// --- Concrete Products ---
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
};

// --- Creator / Factory ---
class CoffeeFactory {
public:
    virtual std::unique_ptr<Coffee> createCoffee() = 0;
    virtual ~CoffeeFactory() = default;
};

// --- Concrete Factories ---
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
};

// --- Client Code ---
int main() {
    // Example: make an Espresso
    std::unique_ptr<CoffeeFactory> espressoFactory = std::make_unique<EspressoFactory>();
    std::unique_ptr<Coffee> espresso = espressoFactory->createCoffee();
    std::cout << espresso->brew() << std::endl;

    // Example: make a Latte
    std::unique_ptr<CoffeeFactory> latteFactory = std::make_unique<LatteFactory>();
    std::unique_ptr<Coffee> latte = latteFactory->createCoffee();
    std::cout << latte->brew() << std::endl;

    return 0;
}
