import React, { useEffect, useState } from "react";
import axios from "axios";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import "pdfjs-dist/web/pdf_viewer.css";

// Configure PDF.js worker
GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
  ).toString();

interface Blueprint {
    id: number;
    project_name: string;
    description: string | null;
    file: string;
    uploaded_at: string;
}

const BlueprintList: React.FC = () => {
    const [blueprints, setBlueprints] = useState<Blueprint[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBlueprints = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/list/");
                setBlueprints(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching blueprints:", err);
                setError("Failed to fetch blueprints.");
                setLoading(false);
            }
        };

        fetchBlueprints();
    }, []);

    const renderPDFPreview = async (url: string, canvasId: string) => {
        const loadingTask = getDocument(url);
        const pdf = await loadingTask.promise;

        // Get the first page of the PDF
        const page = await pdf.getPage(1);
        const canvas: HTMLCanvasElement | null = document.getElementById(
            canvasId
        ) as HTMLCanvasElement;

        if (canvas) {
            const context = canvas.getContext("2d");
            const viewport = page.getViewport({ scale: 0.5 }); // Adjust scale for thumbnail size
            canvas.width = viewport.width;
            canvas.height = viewport.height;

            const renderContext = {
                canvasContext: context!,
                viewport,
            };
            await page.render(renderContext).promise;
        }
    };

    useEffect(() => {
        blueprints.forEach((blueprint) => {
            const fileUrl = `http://localhost:8000${blueprint.file}`;
            const canvasId = `canvas-${blueprint.id}`;
            if (blueprint.file.endsWith(".pdf")) {
                renderPDFPreview(fileUrl, canvasId);
            }
        });
    }, [blueprints]);

    if (loading) {
        return <div className="text-center mt-4">Loading blueprints...</div>;
    }

    if (error) {
        return <div className="text-center mt-4 text-red-500">{error}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Uploaded Blueprints</h1>
            {blueprints.length === 0 ? (
                <p>No blueprints found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blueprints.map((blueprint) => {
                        const fileUrl = `http://localhost:8000${blueprint.file}`;
                        const canvasId = `canvas-${blueprint.id}`;

                        return (
                            <div
                                key={blueprint.id}
                                className="border rounded-lg p-4 shadow hover:shadow-lg transition"
                            >
                                <h2 className="text-xl font-semibold mb-2">
                                    {blueprint.project_name}
                                </h2>
                                <p className="text-gray-600 text-sm mb-2">
                                    Uploaded:{" "}
                                    {new Date(blueprint.uploaded_at).toLocaleString()}
                                </p>
                                {blueprint.description && (
                                    <p className="text-gray-700 text-sm mb-2">
                                        {blueprint.description}
                                    </p>
                                )}

                                {/* PDF Preview */}
                                {blueprint.file.endsWith(".pdf") ? (
                                    <canvas
                                        id={canvasId}
                                        className="w-full h-auto border rounded"
                                    ></canvas>
                                ) : (
                                    <p className="text-gray-500">Preview not available</p>
                                )}

                                {/* View File */}
                                <a
                                    href={fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 underline mt-2 block"
                                >
                                    View Full Blueprint
                                </a>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default BlueprintList;
