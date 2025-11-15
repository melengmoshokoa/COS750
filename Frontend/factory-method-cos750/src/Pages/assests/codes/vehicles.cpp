#include <iostream>
#include <memory>
#include <string>

// --- Product Interface ---
class Vehicle {
public:
    virtual std::string drive() = 0;
    virtual ~Vehicle() = default;
};

// --- Concrete Products ---
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
};

// --- Creator / Factory ---
class VehicleFactory {
public:
    virtual std::unique_ptr<Vehicle> createVehicle() = 0;
    virtual ~VehicleFactory() = default;
};

// --- Concrete Factories ---
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
};

// --- Client Code ---
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
}
