#include <iostream>
#include <memory>
#include <string>

// --- Product Interface ---
class Notification {
public:
    virtual std::string send() = 0;
    virtual ~Notification() = default;
};

// --- Concrete Products ---
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
};

// --- Creator / Factory ---
class NotificationFactory {
public:
    virtual std::unique_ptr<Notification> createNotification() = 0;
    virtual ~NotificationFactory() = default;
};

// --- Concrete Factories ---
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
};

// --- Client Code ---
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
}
