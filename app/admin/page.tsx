"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ClientPdfUploader from "./_components/ClientPdfUploader";
import { Sparkles, Save, FileText } from "lucide-react";

export default function AdminPage() {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    imageUrl: "",
    sopContent: "",
    description: "",
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // 处理 PDF 文本提取
  const handleTextExtracted = (text: string) => {
    setFormData((prev) => ({
      ...prev,
      sopContent: text,
    }));
  };

  // 自动生成 slug
  const handleNameChange = (name: string) => {
    const slug = name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-");
    
    setFormData((prev) => ({
      ...prev,
      name,
      slug,
    }));
  };

  // AI 分析（暂时模拟，Phase 4 会实现）
  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    // TODO: Phase 4 会实现 AI 分析
    setTimeout(() => {
      setIsAnalyzing(false);
      alert("AI 分析功能将在 Phase 4 实现");
    }, 1000);
  };

  // 保存产品（暂时模拟，Phase 4 会实现）
  const handleSave = async () => {
    setIsSaving(true);
    // TODO: Phase 4 会实现保存功能
    setTimeout(() => {
      setIsSaving(false);
      alert("保存功能将在 Phase 4 实现");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* 页面标题 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">后台管理</h1>
            <p className="text-muted-foreground mt-1">
              上传 SOP 文档，AI 智能解析营养成分
            </p>
          </div>
          <Badge variant="secondary" className="text-sm">
            Phase 3
          </Badge>
        </div>

        {/* 主表单 */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* 左侧：基本信息 */}
          <Card>
            <CardHeader>
              <CardTitle>基本信息</CardTitle>
              <CardDescription>填写产品的基本信息</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">产品名称 *</Label>
                <Input
                  id="name"
                  placeholder="例如：牛油果奶昔"
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">URL 标识符 (Slug) *</Label>
                <Input
                  id="slug"
                  placeholder="自动生成"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, slug: e.target.value }))
                  }
                />
                <p className="text-xs text-muted-foreground">
                  用于 URL，例如：/product/avocado-shake
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageUrl">产品图片 URL</Label>
                <Input
                  id="imageUrl"
                  placeholder="https://example.com/image.jpg"
                  value={formData.imageUrl}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, imageUrl: e.target.value }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">产品简介</Label>
                <Textarea
                  id="description"
                  placeholder="AI 将自动生成，也可手动填写"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, description: e.target.value }))
                  }
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* 右侧：PDF 上传 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                SOP 文档上传
              </CardTitle>
              <CardDescription>
                上传 PDF 格式的 SOP 文档，自动提取文本
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ClientPdfUploader onTextExtracted={handleTextExtracted} />
            </CardContent>
          </Card>
        </div>

        {/* SOP 文本内容 */}
        <Card>
          <CardHeader>
            <CardTitle>SOP 文本内容</CardTitle>
            <CardDescription>
              从 PDF 提取的文本，或手动输入
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="SOP 文本内容将显示在这里..."
              value={formData.sopContent}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, sopContent: e.target.value }))
              }
              rows={12}
              className="font-mono text-sm"
            />
          </CardContent>
        </Card>

        {/* 操作按钮 */}
        <div className="flex gap-4 justify-end">
          <Button
            variant="outline"
            size="lg"
            onClick={handleAnalyze}
            disabled={!formData.sopContent || isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                分析中...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                AI 分析
              </>
            )}
          </Button>

          <Button
            size="lg"
            onClick={handleSave}
            disabled={!formData.name || !formData.slug || isSaving}
          >
            {isSaving ? (
              <>
                <Save className="mr-2 h-4 w-4 animate-spin" />
                保存中...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                保存产品
              </>
            )}
          </Button>
        </div>

        {/* 提示信息 */}
        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground space-y-2">
              <p className="font-medium">💡 使用提示：</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>上传 PDF 文件后，系统会自动提取文本内容</li>
                <li>点击「AI 分析」按钮，智能提取营养成分（Phase 4 实现）</li>
                <li>确认信息无误后，点击「保存产品」入库</li>
                <li>所有 PDF 解析均在浏览器端完成，无需服务器支持</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
