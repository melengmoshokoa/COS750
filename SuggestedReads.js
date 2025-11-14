import './SuggestedReads.css';

const SuggestedReads = () => {

    return (
        <div className="page-container">
            <h1 className="text-3xl mb-10" style={{ color: "#f69c36" }}>
                Suggested Reads
            </h1>

            <div className="section">
                <h2 className="section-title">Articles</h2>
                <div className="pdf-row">
                    <a className="pdf-item" href="https://refactoring.guru/design-patterns/factory-method" rel="noreferrer" target="_blank">
                        Understanding the Factory Method Pattern Medium - DevTo f Refactoring Guru summary
                    </a>
                    <a className="pdf-item" href="https://www.geeksforgeeks.org/system-design/factory-method-for-designing-pattern/" rel="noreferrer" target="_blank">
                        When and Why to Use Factory Methods Baeldung & GeeksForGeeks
                    </a>
                    <a className="pdf-item" href="https://stackoverflow.com/questions/5739611/what-are-the-differences-between-abstract-factory-and-factory-design-patterns" rel="noreferrer" target="_blank">
                        Factory vs Abstract Factory: Key Differences Stackoverflow Threads
                    </a>
                </div>
            </div>

            <div className="section">
                <h2 className="section-title">Books</h2>
                <div className="pdf-row">
                    <a className="pdf-item" href="https://www.javier8a.com/itc/bd1/articulo.pdf" rel="noreferrer" target="_blank">
                        Design Fatterns: Elements of Reusable Object-Oriented Software by Erich Gamma et al. (Gang of Four)
                    </a>
                    <a className="pdf-item" href="https://www.pdfiles.net/pdf/view/Head-First-Design-Patterns-2nd-Edition" rel="noreferrer" target="_blank">
                        Head First Design Patterns by Eric Freeman & Elisabeth Robson
                    </a>
                    <a className="pdf-item" href="https://ptgmedia.pearsoncmg.com/images/9780132928472/samplepages/0132928477.pdf" rel="noreferrer" target="_blank">
                        Clean Code by Robert C. Martin
                    </a>
                </div>
            </div>

            <div className="section">
                <h2 className="section-title">Online Material</h2>
                <div className="pdf-row">
                    <a className="pdf-item" href="https://refactoring.guru/design-patterns/factory-method" rel="noreferrer" target="_blank">
                        Factory Method Tutorial
                    </a>
                    <a className="pdf-item" href="https://sourcemaking.com/design_patterns/factory_method/java/1" rel="noreferrer" target="_blank">
                        SourceMaking - Factory Method Example in Java & Python
                    </a>

                </div>
            </div>
        </div>
    );
}
export default SuggestedReads;