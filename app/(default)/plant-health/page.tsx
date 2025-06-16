"use client";

import React, { useState } from "react";
import { Leaf, Loader2 } from "lucide-react";

import { PageHeader } from "@/components/ui/page-header";
import { AnalysisResults } from "@/components/plant-health/analysis-results";
import { ImageUploadForm } from "@/components/plant-health/image-upload-form";
import { KindwiseResponse, Question } from "@/lib/types";

export default function PlantHealthPage() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [prediction, setPrediction] = useState<KindwiseResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeQuestion, setActiveQuestion] = useState<Question | null>(null);
  const [answered, setAnswered] = useState<boolean>(false);
  const [highlightedSuggestion, setHighlightedSuggestion] = useState<number | null>(null);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setPrediction(null);
      setError(null);
      setActiveQuestion(null);
      setAnswered(false);
      setHighlightedSuggestion(null);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    setPrediction(null);
    setError(null);
    setActiveQuestion(null);
    setAnswered(false);
    setHighlightedSuggestion(null);

    const formData = new FormData();
    formData.append("file", selectedImage);

    try {
      const response = await fetch("/api/plant-health", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      setPrediction(data);
      if (data.result?.disease?.question) {
        setActiveQuestion(data.result.disease.question);
      }
    } catch (error) {
      console.error("Error analyzing plant health:", error);
      setError(
        error instanceof Error
          ? error.message
          : "An unknown error occurred. Please try again."
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleQuestionAnswer = (answer: "yes" | "no") => {
    if (!activeQuestion) return;
    const option = activeQuestion.options[answer];
    setHighlightedSuggestion(option.suggestion_index);
    setAnswered(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader title="Plant Health Analysis" />
      <div className="mt-6">
        <ImageUploadForm
          onImageSelect={handleImageSelect}
          onAnalyze={handleAnalyze}
          isAnalyzing={isAnalyzing}
          previewUrl={previewUrl}
          selectedImage={selectedImage}
        />

        <div className="mt-8">
          {isAnalyzing && (
            <div className="flex flex-col items-center justify-center gap-4 p-8 bg-card rounded-lg border">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="text-lg text-muted-foreground">Analyzing your plant...</p>
              <p className="text-sm text-muted-foreground">This might take a moment.</p>
            </div>
          )}

          {!isAnalyzing && (prediction || error) && (
            <AnalysisResults
              prediction={prediction}
              error={error}
              activeQuestion={activeQuestion}
              answered={answered}
              highlightedSuggestion={highlightedSuggestion}
              onQuestionAnswer={handleQuestionAnswer}
            />
          )}

          {!isAnalyzing && !prediction && !error && (
            <div className="flex flex-col items-center justify-center gap-4 p-8 bg-card rounded-lg border border-dashed">
              <Leaf className="h-12 w-12 text-muted-foreground" />
              <p className="text-lg text-muted-foreground">Your analysis results will appear here.</p>
              <p className="text-sm text-muted-foreground">Upload an image to get started.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
