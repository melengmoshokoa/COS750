#include <iostream>
#include <memory>
#include <string>

// --- Product Interface ---
class Document {
public:
    virtual std::string open() = 0;
    virtual std::string save() = 0;
    virtual ~Document() = default;
};

// --- Concrete Product: PDFDocument ---
class PDFDocument : public Document {
public:
    std::string open() override {
        return "Opening PDF viewer";
    }

    std::string save() override {
        return "Saving as .pdf";
    }
};

// --- Creator / Factory ---
class DocumentFactory {
public:
    virtual std::unique_ptr<Document> createDocument() = 0;
    virtual ~DocumentFactory() = default;
};

// --- Concrete Factory for PDFDocument ---
class PDFDocumentFactory : public DocumentFactory {
public:
    std::unique_ptr<Document> createDocument() override {
        return std::make_unique<PDFDocument>();
    }
};

// --- Client Code ---
int main() {
    std::unique_ptr<DocumentFactory> factory = std::make_unique<PDFDocumentFactory>();
    std::unique_ptr<Document> doc = factory->createDocument();

    std::cout << doc->open() << std::endl;
    std::cout << doc->save() << std::endl;

    return 0;
}

