import { useRef, useState } from "react";
import {
    FileText,
    Upload,
    Database,
    CheckCircle2,
    Clock3,
} from "lucide-react";

export default function AdminDashboard() {
    const fileInput = useRef(null);
    const [files, setFiles] = useState([]);

    function handleFiles(event) {
        const selected = Array.from(event.target.files || []);
        const pdfs = selected.filter(
            (file) => file.type === "application/pdf"
        );

        setFiles((previous) => [...previous, ...pdfs]);
        event.target.value = "";
    }

    return (
        <section className="admin-page">
            <header className="topbar">
                <div>
                    <span className="eyebrow">ADMIN WORKSPACE</span>
                    <h2>Dashboard</h2>
                </div>
                <span className="status-pill">
                    <span className="status-dot" /> Prototype
                </span>
            </header>

            <div className="admin-content">
                <h1>Campus knowledge management</h1>
                <p className="muted">
                    Manage college documents that will power student answers.
                </p>

                <div className="stats-grid">
                    <div className="stat-card">
                        <FileText />
                        <span>Selected PDFs</span>
                        <strong>{files.length}</strong>
                    </div>

                    <div className="stat-card">
                        <Database />
                        <span>Indexed documents</span>
                        <strong>0</strong>
                    </div>

                    <div className="stat-card">
                        <Clock3 />
                        <span>Processing jobs</span>
                        <strong>0</strong>
                    </div>
                </div>

                <div className="upload-card">
                    <div className="section-heading">
                        <div>
                            <h3>Upload campus documents</h3>
                            <p className="muted">
                                Select PDF notices, circulars, or academic documents.
                            </p>
                        </div>
                        <FileText size={24} />
                    </div>

                    <button
                        className="upload-zone"
                        onClick={() => fileInput.current?.click()}
                    >
                        <Upload size={28} />
                        <strong>Choose PDF files</strong>
                        <span>Click to select files from your computer</span>
                    </button>

                    <input
                        ref={fileInput}
                        type="file"
                        accept=".pdf,application/pdf"
                        multiple
                        hidden
                        onChange={handleFiles}
                    />

                    {files.map((file, index) => (
                        <div className="file-row" key={`${file.name}-${index}`}>
                            <FileText size={20} />
                            <div className="file-details">
                                <strong>{file.name}</strong>
                                <span>{(file.size / 1024).toFixed(1)} KB</span>
                            </div>
                            <CheckCircle2 size={19} />
                        </div>
                    ))}

                    <p className="demo-notice">
                        Prototype only: files are selected locally and are not
                        uploaded or indexed yet.
                    </p>
                </div>
            </div>
        </section>
    );
}