"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Upload, Leaf } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";

export default function PlantHealthPage() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [prediction, setPrediction] = useState<{
    disease: string;
    confidence: number;
    treatment: string;
  } | null>(null);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setPrediction(null);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    setPrediction(null); // Clear previous prediction

    const formData = new FormData();
    formData.append("file", selectedImage);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/predict-disease",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setPrediction({
        disease: data.prediction_class,
        confidence: data.confidence,
        treatment: data.remedy,
      });
    } catch (error) {
      console.error("Error analyzing plant health:", error);
      // Optionally, set an error state to display to the user
      setPrediction({
        disease: "Error",
        confidence: 0,
        treatment: "Failed to analyze plant health. Please try again.",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-4 space-y-4">
      <PageHeader title="Plant Health Analysis" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Image Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-green-500" />
              Upload Plant Image
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="plant-image">Select Plant Image</Label>
              <Input
                id="plant-image"
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="cursor-pointer"
              />
            </div>

            {previewUrl && (
              <div className="relative aspect-square w-full overflow-hidden rounded-lg border">
                <img
                  src={previewUrl}
                  alt="Plant preview"
                  className="object-cover w-full h-full"
                />
              </div>
            )}

            <Button
              onClick={handleAnalyze}
              disabled={!selectedImage || isAnalyzing}
              className="w-full"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Analyze Plant Health
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-green-500" />
              Analysis Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            {prediction ? (
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800">
                  <h3 className="font-medium text-green-800 dark:text-green-300">
                    Detected Disease: {prediction.disease}
                  </h3>
                  <p className="text-sm text-green-700 dark:text-green-400 mt-1">
                    Confidence: {(prediction.confidence * 100).toFixed(1)}%
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Recommended Treatment:</h4>
                  <p className="text-sm text-muted-foreground">
                    {prediction.treatment}
                  </p>
                </div>
              </div>
            ) : (
              <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                Upload and analyze a plant image to see results
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
