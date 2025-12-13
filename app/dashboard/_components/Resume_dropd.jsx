import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, FileText, X, Loader2, Sparkles, FileType } from 'lucide-react';

const ResumeDropzone = ({ onFileUpload }) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles?.length > 0) {
            setFile(acceptedFiles[0]);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
        },
        maxFiles: 1,
        multiple: false
    });

    const removeFile = (e) => {
        e.stopPropagation();
        setFile(null);
    };

    const handleAnalyze = async () => {
        if (file && !loading) {
            setLoading(true);
            await onFileUpload(file); // Parent handles the API call
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div
                {...getRootProps()}
                className={`
                    relative group flex flex-col items-center justify-center w-full min-h-[300px] p-8
                    rounded-3xl border-2 border-dashed transition-all duration-500 cursor-pointer overflow-hidden
                    ${isDragActive
                        ? "border-violet-500 bg-violet-500/10 scale-[1.02] shadow-[0_0_30px_-10px_rgba(124,58,237,0.5)]"
                        : "border-white/10 bg-zinc-900/40 hover:border-violet-500/50 hover:bg-zinc-900/60"
                    }
                `}
            >
                <input {...getInputProps()} />

                {/* Background Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {!file ? (
                    <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                        {/* Animated Icon Container */}
                        <div className={`
                            w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-500
                            ${isDragActive ? "bg-violet-500 text-white rotate-12 scale-110" : "bg-zinc-800 text-zinc-400 group-hover:bg-zinc-700 group-hover:text-white group-hover:-translate-y-2 shadow-xl"}
                        `}>
                            <UploadCloud className="w-10 h-10" />
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-2xl font-bold text-zinc-100">
                                {isDragActive ? "Drop to Analyze" : "Upload Resume"}
                            </h3>
                            <p className="text-zinc-400 text-sm max-w-xs mx-auto leading-relaxed">
                                Drag & drop your PDF here. Our AI will scan for ATS compatibility.
                            </p>
                        </div>

                        <div className="flex items-center gap-4 text-xs font-mono text-zinc-500 uppercase tracking-wider">
                            <span className="flex items-center gap-1"><FileType size={12} /> PDF</span>
                            <span className="w-1 h-1 rounded-full bg-zinc-700"></span>
                            <span className="flex items-center gap-1"><FileType size={12} /> DOCX</span>
                        </div>
                    </div>
                ) : (
                    // File Selected State
                    <div className="relative z-10 w-full max-w-md animate-in fade-in zoom-in-95 duration-300">
                        <div className="flex items-center gap-4 p-4 bg-zinc-800/80 backdrop-blur-md border border-white/10 rounded-2xl mb-6 shadow-2xl">
                            <div className="w-12 h-12 bg-violet-500/20 rounded-xl flex items-center justify-center border border-violet-500/30">
                                <FileText className="w-6 h-6 text-violet-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-zinc-100 truncate">{file.name}</p>
                                <p className="text-xs text-zinc-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                            <button
                                onClick={removeFile}
                                className="p-2 hover:bg-red-500/20 hover:text-red-400 rounded-lg transition-colors text-zinc-500"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <button
                            onClick={(e) => { e.stopPropagation(); handleAnalyze(); }}
                            disabled={loading}
                            className="w-full py-4 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-semibold transition-all shadow-[0_0_20px_-5px_rgba(124,58,237,0.5)] hover:shadow-[0_0_30px_-5px_rgba(124,58,237,0.6)] flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <> <Loader2 className="w-5 h-5 animate-spin" /> Scanning Document... </>
                            ) : (
                                <> <Sparkles className="w-5 h-5 fill-white" /> Analyze Resume </>
                            )}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResumeDropzone;