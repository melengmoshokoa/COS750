#include <iostream>
#include <memory>
#include <string>

// --- Product Interface ---
class Pizza {
public:
    virtual std::string prepare() = 0;
    virtual std::string bake() = 0;
    virtual std::string cut() = 0;
    virtual ~Pizza() = default;
};

// --- Concrete Product ---
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
};

// --- Creator / Factory ---
class PizzaFactory {
public:
    virtual std::unique_ptr<Pizza> createPizza() = 0;
    virtual ~PizzaFactory() = default;
};

// --- Concrete Factory ---
class MargheritaFactory : public PizzaFactory {
public:
    std::unique_ptr<Pizza> createPizza() override {
        return std::make_unique<MargheritaPizza>();
    }
};

// --- Client Code ---
int main() {
    // Use the factory to create a pizza
    std::unique_ptr<PizzaFactory> factory = std::make_unique<MargheritaFactory>();
    std::unique_ptr<Pizza> pizza = factory->createPizza();

    // Use the pizza
    std::cout << pizza->prepare() << std::endl;
    std::cout << pizza->bake() << std::endl;
    std::cout << pizza->cut() << std::endl;

    return 0;
}
