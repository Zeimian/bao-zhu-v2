"use client";

import { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Card } from "@/components/ui/card";
import { Upload, FileText, Loader2 } from "lucide-react";

// 动态导入 pdfjs-dist (仅在客户端)
let pdfjsLib: any = null;

interface ClientPdfUploaderProps {
  onTextExtracted: (text: string) => void;
}

export default function ClientPdfUploader({ onTextExtracted }: ClientPdfUploaderProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileName, setFileName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isReady, setIsReady] = useState(false);

  // 在客户端加载 pdfjs-dist
  useEffect(() => {
    const loadPdfJs = async () => {
      if (typeof window !== "undefined" && !pdfjsLib) {
        pdfjsLib = await import("pdfjs-dist");
        pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`;
        setIsReady(true);
      }
    };
    loadPdfJs();
  }, []);

  const extractTextFromPdf = async (file: File) => {
    if (!pdfjsLib) {
      setError("PDF 库尚未加载完成，请稍后再试");
      return;
    }
    setIsProcessing(true);
    setError("");
    setFileName(file.name);

    try {
      // 读取文件为 ArrayBuffer
      const arrayBuffer = await file.arrayBuffer();
      
      // 加载 PDF 文档
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      
      let fullText = "";
      
      // 遍历所有页面
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        
        // 提取文本
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(" ");
        
        fullText += pageText + "\n\n";
      }
      
      // 回调返回提取的文本
      onTextExtracted(fullText.trim());
      
    } catch (err) {
      console.error("PDF 解析错误:", err);
      setError("PDF 解析失败，请确保文件格式正确");
    } finally {
      setIsProcessing(false);
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      extractTextFromPdf(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
  });

  return (
    <div className="space-y-4">
      {!isReady ? (
        <Card className="border-2 border-dashed p-8 text-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">正在加载 PDF 解析器...</p>
          </div>
        </Card>
      ) : (
        <Card
          {...getRootProps()}
          className={`
            border-2 border-dashed p-8 text-center cursor-pointer
            transition-colors duration-200
            ${isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"}
            ${isProcessing ? "pointer-events-none opacity-50" : "hover:border-primary/50"}
          `}
        >
          <input {...getInputProps()} />
          
          <div className="flex flex-col items-center gap-4">
            {isProcessing ? (
              <>
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">正在解析 PDF...</p>
              </>
            ) : (
              <>
                <Upload className="h-12 w-12 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">
                    {isDragActive ? "放开以上传文件" : "拖拽 PDF 文件到这里，或点击选择"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    支持 PDF 格式，客户端解析
                  </p>
                </div>
              </>
            )}
          </div>
        </Card>
      )}

      {fileName && !isProcessing && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <FileText className="h-4 w-4" />
          <span>已上传: {fileName}</span>
        </div>
      )}

      {error && (
        <div className="text-sm text-destructive">
          {error}
        </div>
      )}
    </div>
  );
}
