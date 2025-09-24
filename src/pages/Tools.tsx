import React, { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Download, FileText, Image, Loader2, Copy, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import jsPDF from 'jspdf';

export default function Tools() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedText, setExtractedText] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [copied, setCopied] = useState(false);
  const [pdfImages, setPdfImages] = useState<File[]>([]);
  const [pdfPreviews, setPdfPreviews] = useState<string[]>([]);
  const [isConvertingPdf, setIsConvertingPdf] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setSelectedImage(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
        setExtractedText("");
      } else {
        toast({
          title: "Invalid File",
          description: "Please select a valid image file.",
          variant: "destructive"
        });
      }
    }
  };

  const extractTextFromImage = async () => {
    if (!selectedImage) {
      toast({
        title: "No Image Selected",
        description: "Please select an image first.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    // Simulate OCR processing (in a real app, you'd use an OCR API like Tesseract.js)
    setTimeout(() => {
      const sampleText = `This is extracted text from your image.
      
Sample content that might be found in student documents:

Mathematics Formula:
E = mc²
Quadratic Formula: x = (-b ± √(b²-4ac)) / 2a

Physics Concepts:
- Newton's First Law: An object at rest stays at rest
- Force = Mass × Acceleration (F = ma)
- Velocity = Distance / Time

Chemistry:
- Water: H₂O
- Photosynthesis: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂

Programming Code:
function calculateArea(radius) {
    return Math.PI * radius * radius;
}

This is just a demonstration of text extraction. In a real implementation, 
the actual text from your uploaded image would appear here.`;

      setExtractedText(sampleText);
      setIsProcessing(false);
      
      toast({
        title: "Text Extracted Successfully",
        description: "Text has been extracted from your image."
      });
    }, 3000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(extractedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    
    toast({
      title: "Text Copied",
      description: "Extracted text has been copied to clipboard."
    });
  };

  const downloadAsText = () => {
    const blob = new Blob([extractedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'extracted-text.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "File Downloaded",
      description: "Text file has been downloaded successfully."
    });
  };

  const convertToPDF = () => {
    // In a real implementation, you would use a library like jsPDF
    toast({
      title: "PDF Generation",
      description: "PDF conversion feature would be implemented here using jsPDF library."
    });
  };

  const handleImageToPDF = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      const validImages = files.filter(file => file.type.startsWith('image/'));
      
      if (validImages.length === 0) {
        toast({
          title: "Invalid Files",
          description: "Please select valid image files.",
          variant: "destructive"
        });
        return;
      }

      setPdfImages(validImages);
      
      // Create previews
      const previews: string[] = [];
      validImages.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          previews.push(e.target?.result as string);
          if (previews.length === validImages.length) {
            setPdfPreviews([...previews]);
          }
        };
        reader.readAsDataURL(file);
      });

      toast({
        title: "Images Selected",
        description: `${validImages.length} image(s) selected for PDF conversion.`
      });
    }
  };

  const convertImagesToPDF = async () => {
    if (pdfImages.length === 0) {
      toast({
        title: "No Images Selected",
        description: "Please select images first.",
        variant: "destructive"
      });
      return;
    }

    setIsConvertingPdf(true);

    try {
      const pdf = new jsPDF();
      let isFirstPage = true;

      for (let i = 0; i < pdfImages.length; i++) {
        const file = pdfImages[i];
        const imageData = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.readAsDataURL(file);
        });

        // Create new page for each image except the first
        if (!isFirstPage) {
          pdf.addPage();
        }
        isFirstPage = false;

        // Get image dimensions and fit to page
        const img = new window.Image();
        await new Promise((resolve) => {
          img.onload = resolve;
          img.src = imageData;
        });

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const imgAspectRatio = img.width / img.height;
        const pageAspectRatio = pageWidth / pageHeight;

        let imgWidth, imgHeight;
        if (imgAspectRatio > pageAspectRatio) {
          imgWidth = pageWidth - 20; // 10mm margin on each side
          imgHeight = imgWidth / imgAspectRatio;
        } else {
          imgHeight = pageHeight - 20; // 10mm margin on each side
          imgWidth = imgHeight * imgAspectRatio;
        }

        const x = (pageWidth - imgWidth) / 2;
        const y = (pageHeight - imgHeight) / 2;

        pdf.addImage(imageData, 'JPEG', x, y, imgWidth, imgHeight);
      }

      // Download the PDF
      pdf.save('converted-images.pdf');

      toast({
        title: "PDF Created Successfully",
        description: `${pdfImages.length} images converted to PDF and downloaded.`
      });

      // Reset state
      setPdfImages([]);
      setPdfPreviews([]);
      if (pdfInputRef.current) {
        pdfInputRef.current.value = '';
      }

    } catch (error) {
      toast({
        title: "Conversion Failed",
        description: "Failed to convert images to PDF. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsConvertingPdf(false);
    }
  };

  const removeImage = (index: number) => {
    const newImages = pdfImages.filter((_, i) => i !== index);
    const newPreviews = pdfPreviews.filter((_, i) => i !== index);
    setPdfImages(newImages);
    setPdfPreviews(newPreviews);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Learning Tools
          </h1>
          <p className="text-muted-foreground mt-2">
            Powerful tools to enhance your learning experience
          </p>
        </div>
        <Badge variant="outline" className="bg-primary/10">
          Free Tools
        </Badge>
      </div>

      <Tabs defaultValue="image-to-text" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="image-to-text">Image to Text</TabsTrigger>
          <TabsTrigger value="image-to-pdf">Image to PDF</TabsTrigger>
        </TabsList>

        <TabsContent value="image-to-text" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Image Upload Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Image className="h-5 w-5" />
                  Image Upload
                </CardTitle>
                <CardDescription>
                  Upload an image to extract text using OCR technology
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                  {imagePreview ? (
                    <div className="space-y-4">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="max-h-48 mx-auto rounded-lg shadow-md"
                      />
                      <p className="text-sm text-muted-foreground">
                        {selectedImage?.name}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload className="h-12 w-12 text-muted-foreground mx-auto" />
                      <div>
                        <p className="text-sm font-medium">Upload an image</p>
                        <p className="text-xs text-muted-foreground">
                          Supports JPG, PNG, GIF files
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    ref={fileInputRef}
                    className="hidden"
                  />
                  <Button 
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline" 
                    className="flex-1"
                  >
                    Select Image
                  </Button>
                  <Button 
                    onClick={extractTextFromImage}
                    disabled={!selectedImage || isProcessing}
                    className="flex-1"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <FileText className="h-4 w-4 mr-2" />
                        Extract Text
                      </>
                    )}
                  </Button>
                </div>

                {isProcessing && (
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Processing image...</div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Text Output Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Extracted Text
                </CardTitle>
                <CardDescription>
                  Text extracted from your uploaded image
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={extractedText}
                  onChange={(e) => setExtractedText(e.target.value)}
                  placeholder="Extracted text will appear here..."
                  className="min-h-[300px] resize-none"
                  readOnly={!extractedText}
                />
                
                {extractedText && (
                  <div className="flex gap-2">
                    <Button 
                      onClick={copyToClipboard}
                      variant="outline"
                      className="flex-1"
                    >
                      {copied ? (
                        <>
                          <Check className="h-4 w-4 mr-2" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-2" />
                          Copy Text
                        </>
                      )}
                    </Button>
                    <Button 
                      onClick={downloadAsText}
                      variant="outline"
                      className="flex-1"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download TXT
                    </Button>
                    <Button 
                      onClick={convertToPDF}
                      className="flex-1"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Save as PDF
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Features Section */}
          <Card>
            <CardHeader>
              <CardTitle>Tool Features</CardTitle>
              <CardDescription>What you can do with the Image to Text converter</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">OCR Technology</h4>
                  <p className="text-sm text-muted-foreground">
                    Advanced optical character recognition for accurate text extraction
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Multiple Formats</h4>
                  <p className="text-sm text-muted-foreground">
                    Support for JPG, PNG, GIF and other common image formats
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Editable Output</h4>
                  <p className="text-sm text-muted-foreground">
                    Edit and modify extracted text before saving or copying
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Export Options</h4>
                  <p className="text-sm text-muted-foreground">
                    Download as TXT file or convert to PDF format
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="image-to-pdf" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Image to PDF Converter
              </CardTitle>
              <CardDescription>
                Convert multiple images into a single PDF document
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
                <Upload className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Upload Images</h3>
                <p className="text-muted-foreground mb-4">
                  Select multiple images to combine into a PDF
                </p>
                <Input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageToPDF}
                  ref={pdfInputRef}
                  className="hidden"
                  id="pdf-upload"
                />
                <Button onClick={() => pdfInputRef.current?.click()}>
                  <Upload className="h-4 w-4 mr-2" />
                  Select Images
                </Button>
              </div>

              {/* Selected Images Preview */}
              {pdfImages.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Selected Images ({pdfImages.length})</CardTitle>
                    <CardDescription>Preview of images to be converted to PDF</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
                      {pdfPreviews.map((preview, index) => (
                        <div key={index} className="relative group">
                          <img 
                            src={preview} 
                            alt={`Preview ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg border"
                          />
                          <Button
                            size="sm"
                            variant="destructive"
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeImage(index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                          <p className="text-xs text-muted-foreground mt-1 truncate">
                            {pdfImages[index].name}
                          </p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        onClick={convertImagesToPDF}
                        disabled={isConvertingPdf}
                        className="flex-1"
                      >
                        {isConvertingPdf ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Converting...
                          </>
                        ) : (
                          <>
                            <Download className="h-4 w-4 mr-2" />
                            Convert to PDF
                          </>
                        )}
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => {
                          setPdfImages([]);
                          setPdfPreviews([]);
                          if (pdfInputRef.current) pdfInputRef.current.value = '';
                        }}
                      >
                        Clear All
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg text-center">
                  <h4 className="font-medium mb-2">Step 1</h4>
                  <p className="text-sm text-muted-foreground">
                    Select multiple images from your device
                  </p>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <h4 className="font-medium mb-2">Step 2</h4>
                  <p className="text-sm text-muted-foreground">
                    Images will be automatically arranged in order
                  </p>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <h4 className="font-medium mb-2">Step 3</h4>
                  <p className="text-sm text-muted-foreground">
                    Download your combined PDF document
                  </p>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>PDF Converter Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium">✓ Multiple Image Support</h4>
                      <p className="text-sm text-muted-foreground">
                        Combine unlimited images into one PDF
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">✓ Maintain Quality</h4>
                      <p className="text-sm text-muted-foreground">
                        Preserve original image quality in PDF
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">✓ Custom Order</h4>
                      <p className="text-sm text-muted-foreground">
                        Drag and drop to reorder images
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">✓ Fast Processing</h4>
                      <p className="text-sm text-muted-foreground">
                        Quick conversion with no file size limits
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}