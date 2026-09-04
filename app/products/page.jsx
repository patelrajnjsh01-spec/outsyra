"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
    Plus,
    Search,
    Download,
    Eye,
    Trash2,
    Edit3,
    UploadCloud,
    Check,
    CheckCircle2,
    FileText,
    FileArchive,
    Video,
    Music,
    X,
    Loader2,
    Image as ImageIcon,
    Database,
    DollarSign,
    ShoppingBag,
    Layers,
    Sparkles,
    ExternalLink,
    Filter,
    RefreshCw,
    AlertCircle,
    Info,
} from "lucide-react";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    uploadAssetFile,
    uploadCoverImage,
} from "@/lib/supabase/db";

// Curated preset cover images for quick selection
const COVER_PRESETS = [
    {
        id: "preset-1",
        name: "Minimalist Editorial",
        url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80",
        category: "ebook",
    },
    {
        id: "preset-2",
        name: "Notion & Tech Workspace",
        url: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop&q=80",
        category: "template",
    },
    {
        id: "preset-3",
        name: "Neon Creator Studio",
        url: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop&q=80",
        category: "video",
    },
    {
        id: "preset-4",
        name: "Cyber Dark Abstract",
        url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
        category: "template",
    },
    {
        id: "preset-5",
        name: "Audio & Podcast Gear",
        url: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&auto=format&fit=crop&q=80",
        category: "audio",
    },
    {
        id: "preset-6",
        name: "Design Masterclass",
        url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80",
        category: "ebook",
    },
];

import { useWorkspace } from "@/components/providers/WorkspaceProvider";

export default function ProductsPage() {
    const { workspace } = useWorkspace();
    const activeWorkspaceId = workspace?.id || "ws-rajnish-001";
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    // Modal State
    const [modalOpen, setModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null); // null = Create mode, Object = Edit mode
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toastMessage, setToastMessage] = useState(null);

    // Form State
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("29.00");
    const [category, setCategory] = useState("ebook");
    const [status, setStatus] = useState("published");

    // Cover Image State
    const [coverImage, setCoverImage] = useState(
        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80"
    );
    const [coverImageTab, setCoverImageTab] = useState("upload"); // "upload" | "presets" | "url"
    const [isUploadingCover, setIsUploadingCover] = useState(false);
    const [coverUploadSuccess, setCoverUploadSuccess] = useState(false);

    // Asset File State
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState("exclusive_guide_2026.pdf");
    const [fileSize, setFileSize] = useState(12500000);
    const [fileUrl, setFileUrl] = useState("");
    const [isDraggingFile, setIsDraggingFile] = useState(false);
    const [isUploadingFile, setIsUploadingFile] = useState(false);
    const [fileUploadSuccess, setFileUploadSuccess] = useState(false);

    // Delete Confirmation Modal
    const [deleteConfirmId, setDeleteConfirmId] = useState(null);

    const fileInputRef = useRef(null);
    const coverInputRef = useRef(null);

    const showToast = (message, type = "success") => {
        setToastMessage({ text: message, type });
        setTimeout(() => setToastMessage(null), 4000);
    };

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const data = await getProducts(activeWorkspaceId);
            setProducts(data || []);
        } catch (err) {
            console.error("Failed to fetch products", err);
            showToast("Failed to fetch products from database", "error");
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [activeWorkspaceId]);

    const handleRefresh = () => {
        setRefreshing(true);
        fetchProducts();
    };

    function formatBytes(bytes, decimals = 1) {
        if (!bytes) return "0 Bytes";
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    }

    const resetForm = () => {
        setEditingProduct(null);
        setName("");
        setDescription("");
        setPrice("29.00");
        setCategory("ebook");
        setStatus("published");
        setCoverImage(
            "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80"
        );
        setSelectedFile(null);
        setFileName("exclusive_guide_2026.pdf");
        setFileSize(12500000);
        setFileUrl("");
        setCoverUploadSuccess(false);
        setFileUploadSuccess(false);
        setCoverImageTab("upload");
    };

    const openCreateModal = () => {
        resetForm();
        setModalOpen(true);
    };

    const openEditModal = (product) => {
        setEditingProduct(product);
        setName(product.name || "");
        setDescription(product.description || "");
        setPrice(product.price ? product.price.toString() : "0");
        setCategory(product.category || "ebook");
        setStatus(product.status || "published");
        setCoverImage(product.cover_image || "");
        setFileName(product.file_name || "");
        setFileSize(product.file_size || 0);
        setFileUrl(product.file_url || "");
        setSelectedFile(null);
        setCoverUploadSuccess(true);
        setFileUploadSuccess(Boolean(product.file_url));
        setModalOpen(true);
    };

    // Handle Cover Image Upload
    async function processCoverImage(file) {
        if (!file) return;
        setIsUploadingCover(true);
        try {
            const uploaded = await uploadCoverImage(file);
            if (uploaded?.fileUrl) {
                setCoverImage(uploaded.fileUrl);
                setCoverUploadSuccess(true);
                showToast("Cover image uploaded successfully!");
            }
        } catch (err) {
            console.error("Cover image upload failed:", err);
            showToast("Cover image upload failed", "error");
        } finally {
            setIsUploadingCover(false);
        }
    }

    // Handle Asset File Upload
    async function processAssetFile(file) {
        if (!file) return;
        setIsUploadingFile(true);
        setSelectedFile(file);
        setFileName(file.name);
        setFileSize(file.size);

        // Auto-detect category
        const ext = file.name.split(".").pop().toLowerCase();
        if (["pdf", "epub", "mobi"].includes(ext)) {
            setCategory("ebook");
        } else if (["zip", "rar", "tar", "7z"].includes(ext)) {
            setCategory("template");
        } else if (["mp4", "mov", "avi", "mkv"].includes(ext)) {
            setCategory("video");
        } else if (["mp3", "wav", "aac", "ogg"].includes(ext)) {
            setCategory("audio");
        }

        try {
            const uploaded = await uploadAssetFile(file);
            if (uploaded?.fileUrl) {
                setFileUrl(uploaded.fileUrl);
            }
            setFileUploadSuccess(true);
            showToast("Asset file uploaded & attached!");
        } catch (err) {
            console.error("File upload error", err);
            showToast("Asset upload failed", "error");
        } finally {
            setIsUploadingFile(false);
        }
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const payload = {
            name,
            slug: name.toLowerCase().replace(/[^a-z0-9]/g, "-"),
            description,
            price: parseFloat(price) || 0,
            currency: "USD",
            category,
            status,
            cover_image:
                coverImage ||
                "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80",
            file_name: fileName,
            file_size: fileSize,
            file_url: fileUrl,
        };

        try {
            if (editingProduct) {
                // Update Product in DB
                const updated = await updateProduct(editingProduct.id, payload);
                setProducts(products.map((p) => (p.id === editingProduct.id ? { ...p, ...updated } : p)));
                showToast(`"${name}" updated successfully in PostgreSQL database!`);
            } else {
                // Create Product in DB
                const newProd = await addProduct(activeWorkspaceId, {
                    ...payload,
                    total_sales: 0,
                });
                setProducts([newProd, ...products]);
                showToast(`"${name}" saved to PostgreSQL database!`);
            }
            setModalOpen(false);
            resetForm();
        } catch (err) {
            console.error("Failed to save product:", err);
            showToast("Error saving product to database", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteProduct = async (id) => {
        try {
            await deleteProduct(id);
            setProducts(products.filter((p) => p.id !== id));
            setDeleteConfirmId(null);
            showToast("Product deleted from PostgreSQL database!");
        } catch (err) {
            console.error("Failed to delete product:", err);
            showToast("Error deleting product", "error");
        }
    };

    // Filter and search logic
    const filteredProducts = products.filter((p) => {
        const matchesCategory =
            selectedCategory === "all" ||
            p.category?.toLowerCase() === selectedCategory.toLowerCase() ||
            (selectedCategory === "pdf" && p.category === "ebook");

        const matchesSearch =
            p.name?.toLowerCase().includes(search.toLowerCase()) ||
            p.description?.toLowerCase().includes(search.toLowerCase()) ||
            p.category?.toLowerCase().includes(search.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    // Metrics
    const totalProductsCount = products.length;
    const totalSalesCount = products.reduce((acc, p) => acc + (p.total_sales || 0), 0);
    const totalRevenue = products.reduce(
        (acc, p) => acc + (p.total_sales || 0) * (p.price || 0),
        0
    );

    return (
        <div className="flex-1 flex flex-col bg-background text-foreground transition-colors duration-200">
            <DashboardHeader
                title="Digital Product Store (PostgreSQL)"
                subtitle="Manage your downloadable ebooks, templates, guides, and digital assets stored in PostgreSQL."
            />

            {/* Toast Notification */}
            {toastMessage && (
                <div className="fixed top-20 right-6 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
                    <div
                        className={`flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl border backdrop-blur-md text-xs font-medium ${
                            toastMessage.type === "error"
                                ? "bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400"
                                : "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                        }`}
                    >
                        {toastMessage.type === "error" ? (
                            <AlertCircle className="h-4 w-4 shrink-0" />
                        ) : (
                            <CheckCircle2 className="h-4 w-4 shrink-0" />
                        )}
                        <span>{toastMessage.text}</span>
                    </div>
                </div>
            )}

            <main className="p-6 md:p-8 space-y-6 max-w-7xl">
                {/* Stats Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card className="glass-card p-4 rounded-2xl border border-zinc-200 dark:border-white/5 flex items-center justify-between">
                        <div>
                            <p className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                                Total Products
                            </p>
                            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mt-1">
                                {totalProductsCount}
                            </h3>
                        </div>
                        <div className="h-11 w-11 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                            <ShoppingBag className="h-5 w-5" />
                        </div>
                    </Card>

                    <Card className="glass-card p-4 rounded-2xl border border-zinc-200 dark:border-white/5 flex items-center justify-between">
                        <div>
                            <p className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                                Gross Sales Revenue
                            </p>
                            <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                                ${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </h3>
                        </div>
                        <div className="h-11 w-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                            <DollarSign className="h-5 w-5" />
                        </div>
                    </Card>

                    <Card className="glass-card p-4 rounded-2xl border border-zinc-200 dark:border-white/5 flex items-center justify-between">
                        <div>
                            <p className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                                Total Downloads Sold
                            </p>
                            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mt-1">
                                {totalSalesCount}
                            </h3>
                        </div>
                        <div className="h-11 w-11 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
                            <Download className="h-5 w-5" />
                        </div>
                    </Card>

                    <Card className="glass-card p-4 rounded-2xl border border-zinc-200 dark:border-white/5 flex items-center justify-between">
                        <div>
                            <p className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                                Database Engine
                            </p>
                            <div className="flex items-center gap-1.5 mt-1">
                                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-sm font-bold text-zinc-900 dark:text-white">
                                    PostgreSQL Live
                                </span>
                            </div>
                        </div>
                        <div className="h-11 w-11 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                            <Database className="h-5 w-5" />
                        </div>
                    </Card>
                </div>

                {/* Filters & Action Bar */}
                <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                            <Input
                                placeholder="Search products by title or description..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-10 h-10 text-xs rounded-xl"
                            />
                        </div>

                        {/* Category filter pills */}
                        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                            {[
                                { id: "all", label: "All" },
                                { id: "ebook", label: "Ebooks" },
                                { id: "template", label: "Templates" },
                                { id: "video", label: "Videos" },
                                { id: "audio", label: "Audio" },
                            ].map((cat) => (
                                <button
                                    key={cat.id}
                                    type="button"
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                                        selectedCategory === cat.id
                                            ? "bg-indigo-600 text-white shadow-sm"
                                            : "bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white border border-zinc-200 dark:border-white/5"
                                    }`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleRefresh}
                            disabled={refreshing}
                            className="h-10 text-xs gap-1.5 border-zinc-200 dark:border-white/10"
                            title="Refresh products from database"
                        >
                            <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? "animate-spin text-indigo-500" : ""}`} />
                            <span className="hidden sm:inline">Refresh</span>
                        </Button>
                        <Button
                            variant="gradient"
                            onClick={openCreateModal}
                            className="h-10 gap-2 text-xs font-bold shadow-md"
                        >
                            <Plus className="h-4 w-4" />
                            Create Digital Product
                        </Button>
                    </div>
                </div>

                {/* Product Grid */}
                {loading ? (
                    <div className="py-20 flex flex-col items-center justify-center gap-3 text-zinc-500">
                        <Loader2 className="h-8 w-8 text-indigo-500 animate-spin" />
                        <p className="text-xs font-medium">Connecting to PostgreSQL & loading digital products...</p>
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="py-16 text-center rounded-3xl border border-dashed border-zinc-200 dark:border-white/10 p-8 space-y-4">
                        <div className="h-14 w-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto">
                            <ShoppingBag className="h-7 w-7" />
                        </div>
                        <div className="space-y-1 max-w-sm mx-auto">
                            <h4 className="font-bold text-zinc-900 dark:text-white text-base">
                                No digital products found
                            </h4>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                {search
                                    ? `No products matching "${search}". Try searching for another keyword.`
                                    : "You haven't added any digital products yet. Create your first product with cover image and downloadable file."}
                            </p>
                        </div>
                        <Button variant="gradient" size="sm" onClick={openCreateModal} className="gap-2 text-xs">
                            <Plus className="h-4 w-4" />
                            Create Digital Product
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProducts.map((product) => (
                            <Card
                                key={product.id}
                                className="glass-card border-zinc-200 dark:border-white/10 overflow-hidden flex flex-col justify-between group hover:border-indigo-500/40 transition-all duration-300 shadow-sm hover:shadow-xl rounded-3xl"
                            >
                                <div>
                                    {/* Cover Image Container */}
                                    <div className="relative h-48 w-full bg-zinc-100 dark:bg-zinc-900 overflow-hidden">
                                        <img
                                            src={product.cover_image}
                                            alt={product.name}
                                            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            onError={(e) => {
                                                e.target.src =
                                                    "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80";
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                                        <div className="absolute top-3 left-3 flex items-center gap-1.5">
                                            <Badge
                                                variant="default"
                                                className="text-[10px] uppercase font-bold tracking-wider bg-white/90 dark:bg-black/70 backdrop-blur-md text-zinc-900 dark:text-white border-none shadow-sm"
                                            >
                                                {product.category}
                                            </Badge>
                                            {product.status === "draft" && (
                                                <Badge variant="outline" className="text-[10px] bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30">
                                                    Draft
                                                </Badge>
                                            )}
                                        </div>

                                        <div className="absolute top-3 right-3">
                                            <Badge
                                                variant="success"
                                                className="text-xs font-bold bg-emerald-500 text-white shadow-lg border-none px-2.5 py-1"
                                            >
                                                ${product.price?.toFixed(2)}
                                            </Badge>
                                        </div>
                                    </div>

                                    {/* Content Section */}
                                    <div className="p-6 space-y-3">
                                        <h3 className="font-bold text-zinc-900 dark:text-white text-base leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors line-clamp-1">
                                            {product.name}
                                        </h3>
                                        <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed min-h-[32px]">
                                            {product.description || "No description provided."}
                                        </p>

                                        {/* File Metadata */}
                                        <div className="pt-3 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 border-t border-zinc-100 dark:border-white/5">
                                            <span className="flex items-center gap-1.5 font-medium text-zinc-700 dark:text-zinc-300">
                                                <Download className="h-3.5 w-3.5 text-indigo-500" />
                                                {product.total_sales || 0} sales (
                                                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                                                    ${((product.total_sales || 0) * (product.price || 0)).toLocaleString()}
                                                </span>
                                                )
                                            </span>
                                            <span className="text-[11px] font-mono text-zinc-400 truncate max-w-[130px]" title={product.file_name}>
                                                {product.file_name || "asset.pdf"}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions Footer */}
                                <div className="p-4 bg-zinc-50/80 dark:bg-zinc-950/60 border-t border-zinc-200/60 dark:border-white/5 flex items-center justify-between gap-2">
                                    <Link href={`/checkout/${product.id}`} target="_blank">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="text-xs text-indigo-600 dark:text-indigo-300 border-indigo-500/20 gap-1.5 hover:bg-indigo-500/10 rounded-xl"
                                        >
                                            <Eye className="h-3.5 w-3.5" />
                                            <span>Checkout Page</span>
                                        </Button>
                                    </Link>
                                    <div className="flex items-center gap-1">
                                        <a
                                            href={`/api/products/${product.id}/download`}
                                            target="_blank"
                                            className="p-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-xl hover:bg-zinc-200/60 dark:hover:bg-white/5 transition-colors"
                                            title="Download Protected Asset"
                                        >
                                            <Download className="h-4 w-4" />
                                        </a>
                                        <button
                                            type="button"
                                            onClick={() => openEditModal(product)}
                                            className="p-2 text-zinc-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-300 rounded-xl hover:bg-indigo-500/10 transition-colors cursor-pointer"
                                            title="Edit Product"
                                        >
                                            <Edit3 className="h-4 w-4" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setDeleteConfirmId(product.id)}
                                            className="p-2 text-rose-500 hover:text-rose-600 dark:hover:text-rose-300 rounded-xl hover:bg-rose-500/10 transition-colors cursor-pointer"
                                            title="Delete Product from PostgreSQL"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </main>

            {/* CREATE / EDIT PRODUCT MODAL */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black/70 dark:bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
                    <div className="glass-card p-6 md:p-8 rounded-3xl border border-zinc-200 dark:border-white/10 max-w-2xl w-full space-y-5 animate-in fade-in zoom-in-95 max-h-[92vh] overflow-y-auto shadow-2xl">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-white/5 pb-4">
                            <div>
                                <h3 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                                    {editingProduct ? "Edit Digital Product" : "Create Digital Product"}
                                    <Badge variant="default" className="text-[10px] bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20">
                                        PostgreSQL
                                    </Badge>
                                </h3>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                                    {editingProduct
                                        ? "Update your product info, cover image, and pricing live in PostgreSQL."
                                        : "Upload your cover thumbnail & asset file to store directly in PostgreSQL."}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setModalOpen(false)}
                                className="h-8 w-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5 text-sm cursor-pointer transition-colors"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Modal Form */}
                        <form onSubmit={handleFormSubmit} className="space-y-5">
                            {/* 1. Basic Info */}
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                                        Product Title *
                                    </label>
                                    <Input
                                        required
                                        placeholder="e.g. 100+ High Converting Email Templates"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="h-10 text-xs rounded-xl"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    <div>
                                        <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                                            Price (USD) *
                                        </label>
                                        <Input
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            required
                                            placeholder="29.00"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                            className="h-10 text-xs rounded-xl font-mono font-bold"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                                            Category
                                        </label>
                                        <select
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            className="w-full h-10 rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 px-3 text-xs text-zinc-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                        >
                                            <option value="ebook">Ebook (PDF/EPUB)</option>
                                            <option value="template">Template (ZIP/Notion)</option>
                                            <option value="video">Video Masterclass (MP4)</option>
                                            <option value="audio">Audio / Podcast (MP3)</option>
                                            <option value="zip">Asset Pack (ZIP/7Z)</option>
                                            <option value="pdf">Checklist / PDF Sheet</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                                            Publish Status
                                        </label>
                                        <select
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                            className="w-full h-10 rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 px-3 text-xs text-zinc-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                        >
                                            <option value="published">Published (Live)</option>
                                            <option value="draft">Draft (Hidden)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* 2. COVER IMAGE UPLOADER SECTION */}
                            <div className="space-y-2 p-4 rounded-2xl bg-zinc-50/70 dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/5">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <ImageIcon className="h-4 w-4 text-indigo-500" />
                                        <label className="text-xs font-bold text-zinc-900 dark:text-white">
                                            Product Cover Image / Thumbnail
                                        </label>
                                    </div>
                                    <div className="flex gap-1">
                                        <button
                                            type="button"
                                            onClick={() => setCoverImageTab("upload")}
                                            className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-colors cursor-pointer ${
                                                coverImageTab === "upload"
                                                    ? "bg-indigo-600 text-white"
                                                    : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                                            }`}
                                        >
                                            Upload File
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setCoverImageTab("presets")}
                                            className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-colors cursor-pointer ${
                                                coverImageTab === "presets"
                                                    ? "bg-indigo-600 text-white"
                                                    : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                                            }`}
                                        >
                                            Presets
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setCoverImageTab("url")}
                                            className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-colors cursor-pointer ${
                                                coverImageTab === "url"
                                                    ? "bg-indigo-600 text-white"
                                                    : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                                            }`}
                                        >
                                            Image URL
                                        </button>
                                    </div>
                                </div>

                                {coverImageTab === "upload" && (
                                    <div className="space-y-3 pt-1">
                                        <input
                                            type="file"
                                            ref={coverInputRef}
                                            accept="image/*"
                                            onChange={(e) => {
                                                if (e.target.files && e.target.files[0]) {
                                                    processCoverImage(e.target.files[0]);
                                                }
                                            }}
                                            className="hidden"
                                        />

                                        <div className="flex flex-col sm:flex-row items-center gap-4">
                                            {/* Preview box */}
                                            <div className="relative h-28 w-44 rounded-xl overflow-hidden bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 shrink-0 shadow-sm">
                                                {coverImage ? (
                                                    <img
                                                        src={coverImage}
                                                        alt="Cover Preview"
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="h-full w-full flex items-center justify-center text-zinc-400 text-xs">
                                                        No Image
                                                    </div>
                                                )}
                                                {isUploadingCover && (
                                                    <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center gap-1 text-white">
                                                        <Loader2 className="h-5 w-5 animate-spin text-indigo-400" />
                                                        <span className="text-[10px] font-semibold">Uploading...</span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Upload controls */}
                                            <div className="flex-1 space-y-2 text-left w-full">
                                                <div
                                                    onClick={() => coverInputRef.current?.click()}
                                                    className="p-4 rounded-xl border border-dashed border-zinc-300 dark:border-white/15 hover:border-indigo-500 bg-white/50 dark:bg-zinc-900/50 text-center cursor-pointer transition-colors"
                                                >
                                                    <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                                                        Click to select or drop cover image
                                                    </p>
                                                    <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                                                        Supports PNG, JPG, WEBP up to 10MB (16:9 recommended)
                                                    </p>
                                                </div>
                                                {coverImage && (
                                                    <p className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                                                        <CheckCircle2 className="h-3 w-3" /> Image linked & ready
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {coverImageTab === "presets" && (
                                    <div className="pt-2">
                                        <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mb-2">
                                            Click any curated thumbnail preset below to use as your cover:
                                        </p>
                                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                                            {COVER_PRESETS.map((preset) => (
                                                <div
                                                    key={preset.id}
                                                    onClick={() => {
                                                        setCoverImage(preset.url);
                                                        setCoverUploadSuccess(true);
                                                    }}
                                                    className={`relative h-16 rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                                                        coverImage === preset.url
                                                            ? "border-indigo-500 scale-105 shadow-md ring-2 ring-indigo-500/20"
                                                            : "border-transparent opacity-80 hover:opacity-100"
                                                    }`}
                                                >
                                                    <img
                                                        src={preset.url}
                                                        alt={preset.name}
                                                        className="h-full w-full object-cover"
                                                    />
                                                    {coverImage === preset.url && (
                                                        <div className="absolute inset-0 bg-indigo-600/30 flex items-center justify-center text-white">
                                                            <Check className="h-4 w-4" />
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {coverImageTab === "url" && (
                                    <div className="pt-2 space-y-2">
                                        <Input
                                            placeholder="Paste image URL (https://...)"
                                            value={coverImage}
                                            onChange={(e) => setCoverImage(e.target.value)}
                                            className="h-9 text-xs rounded-xl"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* 3. PROTECTED ASSET FILE UPLOADER */}
                            <div className="space-y-1.5">
                                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                                    Protected Asset File (Customer Download) *
                                </label>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files[0]) {
                                            processAssetFile(e.target.files[0]);
                                        }
                                    }}
                                    className="hidden"
                                />
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    onDragOver={(e) => {
                                        e.preventDefault();
                                        setIsDraggingFile(true);
                                    }}
                                    onDragLeave={(e) => {
                                        e.preventDefault();
                                        setIsDraggingFile(false);
                                    }}
                                    onDrop={(e) => {
                                        e.preventDefault();
                                        setIsDraggingFile(false);
                                        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                                            processAssetFile(e.dataTransfer.files[0]);
                                        }
                                    }}
                                    className={`rounded-2xl border-2 border-dashed p-5 text-center cursor-pointer transition-all ${
                                        isDraggingFile
                                            ? "border-indigo-400 bg-indigo-500/10 scale-[1.01]"
                                            : selectedFile || fileUploadSuccess
                                            ? "border-emerald-500/40 bg-emerald-500/5 hover:border-emerald-500/60"
                                            : "border-zinc-300 dark:border-white/15 bg-zinc-50/50 dark:bg-zinc-900/40 hover:border-indigo-500/50 hover:bg-zinc-100 dark:hover:bg-zinc-900/70"
                                    }`}
                                >
                                    {isUploadingFile ? (
                                        <div className="py-2 flex flex-col items-center gap-2">
                                            <Loader2 className="h-6 w-6 text-indigo-500 animate-spin" />
                                            <p className="text-xs font-semibold text-zinc-900 dark:text-white">
                                                Uploading & Encrypting Asset File...
                                            </p>
                                        </div>
                                    ) : selectedFile || fileUploadSuccess ? (
                                        <div className="flex items-center justify-between p-3 rounded-xl bg-white/80 dark:bg-zinc-900/80 border border-zinc-200 dark:border-white/5">
                                            <div className="flex items-center gap-3 text-left min-w-0 flex-1">
                                                <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 flex-shrink-0">
                                                    {category === "ebook" && <FileText className="h-5 w-5" />}
                                                    {category === "template" && <FileArchive className="h-5 w-5" />}
                                                    {category === "video" && <Video className="h-5 w-5" />}
                                                    {category === "audio" && <Music className="h-5 w-5" />}
                                                    {!["ebook", "template", "video", "audio"].includes(category) && (
                                                        <Check className="h-5 w-5" />
                                                    )}
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-xs font-bold text-zinc-900 dark:text-white truncate">
                                                        {fileName}
                                                    </p>
                                                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono mt-0.5">
                                                        {formatBytes(fileSize)} • Protected Storage
                                                    </p>
                                                </div>
                                            </div>
                                            <Badge variant="success" className="text-[10px] ml-2 shrink-0">
                                                Attached ✓
                                            </Badge>
                                        </div>
                                    ) : (
                                        <div className="py-1 space-y-1">
                                            <div className="h-10 w-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto">
                                                <UploadCloud className="h-5 w-5" />
                                            </div>
                                            <p className="text-xs font-bold text-zinc-900 dark:text-white">
                                                Click to browse or drag & drop asset file
                                            </p>
                                            <p className="text-[10px] text-zinc-500 dark:text-zinc-400">
                                                Supports PDF, ZIP, MP4, MP3 up to 500MB
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* 4. Description */}
                            <div>
                                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                                    Product Description *
                                </label>
                                <textarea
                                    rows={3}
                                    required
                                    className="w-full rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900/60 p-3 text-xs text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                    placeholder="Explain what value customers get upon downloading this product..."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 pt-2 border-t border-zinc-200 dark:border-white/5">
                                <Button
                                    variant="outline"
                                    type="button"
                                    className="w-1/3 text-xs rounded-xl"
                                    onClick={() => setModalOpen(false)}
                                    disabled={isSubmitting}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="gradient"
                                    type="submit"
                                    className="w-2/3 text-xs font-bold rounded-xl gap-2"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            <span>Saving to PostgreSQL...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Database className="h-4 w-4" />
                                            <span>{editingProduct ? "Update Product in PostgreSQL" : "Save Product to PostgreSQL"}</span>
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* DELETE CONFIRMATION MODAL */}
            {deleteConfirmId && (
                <div className="fixed inset-0 bg-black/70 dark:bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
                    <div className="glass-card p-6 rounded-3xl border border-rose-500/20 max-w-sm w-full space-y-4 shadow-2xl text-center">
                        <div className="h-12 w-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 flex items-center justify-center mx-auto">
                            <Trash2 className="h-6 w-6" />
                        </div>
                        <div className="space-y-1">
                            <h4 className="font-bold text-zinc-900 dark:text-white text-base">
                                Delete Product?
                            </h4>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                This will permanently remove the product from PostgreSQL database and cancel active checkout links.
                            </p>
                        </div>
                        <div className="flex gap-3 pt-2">
                            <Button
                                variant="outline"
                                size="sm"
                                className="w-1/2 text-xs rounded-xl"
                                onClick={() => setDeleteConfirmId(null)}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="destructive"
                                size="sm"
                                className="w-1/2 text-xs rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold"
                                onClick={() => handleDeleteProduct(deleteConfirmId)}
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
