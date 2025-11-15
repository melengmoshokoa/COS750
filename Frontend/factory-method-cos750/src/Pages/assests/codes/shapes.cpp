#include <iostream>
#include <memory>
#include <cmath>
#include <string>

// --- Product Interface ---
class Shape {
public:
    virtual std::string draw() = 0;
    virtual double area() = 0;
    virtual ~Shape() = default;
};

// --- Concrete Product: Circle ---
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
};

// --- Creator / Factory ---
class ShapeFactory {
public:
    virtual std::unique_ptr<Shape> createShape() = 0;
    virtual ~ShapeFactory() = default;
};

// --- Concrete Factory for Circle ---
class CircleFactory : public ShapeFactory {
private:
    double radius;

public:
    CircleFactory(double r) : radius(r) {}

    std::unique_ptr<Shape> createShape() override {
        return std::make_unique<Circle>(radius);
    }
};

// --- Client Code ---
int main() {
    // Create a circle of radius 5
    std::unique_ptr<ShapeFactory> factory = std::make_unique<CircleFactory>(5.0);
    std::unique_ptr<Shape> circle = factory->createShape();

    std::cout << circle->draw() << std::endl;
    std::cout << "Area: " << circle->area() << std::endl;

    return 0;
}
