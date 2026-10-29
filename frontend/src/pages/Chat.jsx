import { useState } from "react";
import { Send, Globe, FileText, Sparkles } from "lucide-react";

const suggestions = [
    "When do semester exams begin?",
    "Where can I find the academic calendar?",
    "What documents are needed for admission?",
];

export default function Chat() {
    const [question, setQuestion] = useState("");
    const [language, setLanguage] = useState("English");
    const [messages, setMessages] = useState([]);

    function handleSubmit(event) {
        event.preventDefault();

        const text = question.trim();
        if (!text) return;

        setMessages((previous) => [
            ...previous,
            { role: "user", text },
        ]);

        setQuestion("");
    }

    return (
        <section className="chat-page">
            <header className="topbar">
                <div>
                    <span className="eyebrow">STUDENT WORKSPACE</span>
                    <h2>Campus Assistant</h2>
                </div>

                <label className="language-picker">
                    <Globe size={17} />
                    <select
                        value={language}
                        onChange={(event) => setLanguage(event.target.value)}
                        aria-label="Preferred language"
                    >
                        <option>English</option>
                        <option>Hindi</option>
                        <option>Marathi</option>
                        <option>Gujarati</option>
                        <option>Tamil</option>
                        <option>Telugu</option>
                    </select>
                </label>
            </header>

            <div className="chat-content">
                {messages.length === 0 ? (
                    <div className="welcome">
                        <div className="welcome-icon">
                            <Sparkles size={28} />
                        </div>

                        <span className="eyebrow">YOUR CAMPUS, SIMPLIFIED</span>
                        <h1>How can I help you today?</h1>
                        <p>
                            Ask questions about college notices, academic schedules,
                            policies, and campus information.
                        </p>

                        <div className="suggestion-grid">
                            {suggestions.map((suggestion) => (
                                <button
                                    key={suggestion}
                                    className="suggestion"
                                    onClick={() => setQuestion(suggestion)}
                                >
                                    <FileText size={19} />
                                    <span>{suggestion}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="messages">
                        {messages.map((message, index) => (
                            <div className="message-row" key={index}>
                                <div className="avatar">S</div>
                                <div>
                                    <strong>You</strong>
                                    <p>{message.text}</p>
                                </div>
                            </div>
                        ))}

                        <p className="demo-notice">
                            Your message is displayed locally. AI responses will be
                            connected when we implement the RAG backend.
                        </p>
                    </div>
                )}
            </div>

            <div className="composer-area">
                <form className="composer" onSubmit={handleSubmit}>
                    <textarea
                        value={question}
                        onChange={(event) => setQuestion(event.target.value)}
                        placeholder={`Ask your campus question in ${language}...`}
                        rows={2}
                    />

                    <button
                        className="send-button"
                        type="submit"
                        disabled={!question.trim()}
                        aria-label="Send message"
                    >
                        <Send size={18} />
                    </button>
                </form>

                <p className="disclaimer">
                    CampusIQ will answer using available college documents.
                </p>
            </div>
        </section>
    );
}