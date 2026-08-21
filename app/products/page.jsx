"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from "react";
import Link from "next/link";
import { Plus, Search, Download, Eye, Trash2, UploadCloud, } from "lucide-react";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { initialProducts } from "@/lib/supabase/mock-db";
export default function ProductsPage() {
    const [products, setProducts] = useState(initialProducts);
    const [search, setSearch] = useState("");
    const [createModal, setCreateModal] = useState(false);
    // New Product Form State
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("29.00");
    const [category, setCategory] = useState("ebook");
    const [fileName, setFileName] = useState("exclusive_guide_2026.pdf");
    const filteredProducts = products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
    const handleCreateProduct = (e) => {
        e.preventDefault();
        const newProd = {
            id: `prod-${Date.now()}`,
            workspace_id: "ws-rajnish-001",
            name,
            slug: name.toLowerCase().replace(/[^a-z0-9]/g, "-"),
            description,
            price: parseFloat(price) || 0,
            currency: "USD",
            category,
            status: "published",
            file_name: fileName,
            file_size: 12500000,
            total_sales: 0,
            cover_image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        };
        setProducts([newProd, ...products]);
        setCreateModal(false);
        setName("");
        setDescription("");
    };
    const deleteProduct = (id) => {
        setProducts(products.filter((p) => p.id !== id));
    };
    return (_jsxs("div", { className: "flex-1 flex flex-col", children: [_jsx(DashboardHeader, { title: "Digital Product Store", subtitle: "Manage your downloadable ebooks, templates, guides, and digital assets." }), _jsxs("main", { className: "p-6 md:p-8 space-y-6 max-w-7xl", children: [_jsxs("div", { className: "flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4", children: [_jsxs("div", { className: "relative flex-1 max-w-md", children: [_jsx(Search, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" }), _jsx(Input, { placeholder: "Search products by title...", value: search, onChange: (e) => setSearch(e.target.value), className: "pl-10" })] }), _jsxs(Button, { variant: "gradient", onClick: () => setCreateModal(true), className: "gap-2 text-xs", children: [_jsx(Plus, { className: "h-4 w-4" }), "Create Digital Product"] })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: filteredProducts.map((product) => (_jsxs(Card, { className: "glass-panel border-white/5 overflow-hidden flex flex-col justify-between group hover:border-indigo-500/30 transition-all", children: [_jsxs("div", { children: [_jsxs("div", { className: "relative h-44 w-full bg-zinc-900 overflow-hidden", children: [_jsx("img", { src: product.cover_image, alt: product.name, className: "h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" }), _jsx("div", { className: "absolute top-3 left-3 flex gap-1.5", children: _jsx(Badge, { variant: "default", className: "text-[10px] uppercase bg-black/60 backdrop-blur-md", children: product.category }) }), _jsx("div", { className: "absolute top-3 right-3", children: _jsxs(Badge, { variant: "success", className: "text-[10px] bg-emerald-950/80 text-emerald-400 border-emerald-500/30", children: ["$", product.price.toFixed(2)] }) })] }), _jsxs("div", { className: "p-6 space-y-2", children: [_jsx("h3", { className: "font-bold text-white text-base leading-snug group-hover:text-indigo-300 transition-colors", children: product.name }), _jsx("p", { className: "text-xs text-zinc-400 line-clamp-2 leading-relaxed", children: product.description }), _jsxs("div", { className: "pt-2 flex items-center justify-between text-xs text-zinc-500 border-t border-white/5", children: [_jsxs("span", { className: "flex items-center gap-1 text-zinc-400", children: [_jsx(Download, { className: "h-3.5 w-3.5" }), product.total_sales, " sales ($", (product.total_sales * product.price).toLocaleString(), ")"] }), _jsx("span", { className: "text-[11px] font-mono", children: product.file_name })] })] })] }), _jsxs("div", { className: "p-4 bg-zinc-950/60 border-t border-white/5 flex items-center justify-between gap-2", children: [_jsx(Link, { href: `/checkout/${product.id}`, target: "_blank", children: _jsxs(Button, { variant: "outline", size: "sm", className: "text-xs text-indigo-300 border-indigo-500/20 gap-1.5", children: [_jsx(Eye, { className: "h-3.5 w-3.5" }), "Checkout Page"] }) }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx("a", { href: `/api/products/${product.id}/download`, target: "_blank", className: "p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors", title: "Download Protected Asset (Signed URL)", children: _jsx(Download, { className: "h-4 w-4" }) }), _jsx("button", { onClick: () => deleteProduct(product.id), className: "p-2 text-rose-400 hover:text-rose-300 rounded-lg hover:bg-rose-500/10 transition-colors", children: _jsx(Trash2, { className: "h-4 w-4" }) })] })] })] }, product.id))) })] }), createModal && (_jsx("div", { className: "fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4", children: _jsxs("div", { className: "glass-panel p-6 md:p-8 rounded-3xl border border-white/10 max-w-xl w-full space-y-5 animate-in fade-in zoom-in-95", children: [_jsx("div", { className: "flex items-center justify-between border-b border-white/5 pb-4", children: _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-bold text-white", children: "Create Digital Product" }), _jsx("p", { className: "text-xs text-zinc-400", children: "Set up instant download files and automated Stripe/Razorpay delivery." })] }) }), _jsxs("form", { onSubmit: handleCreateProduct, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-zinc-300 mb-1.5", children: "Product Title" }), _jsx(Input, { required: true, placeholder: "e.g. 100+ High Converting Email Templates", value: name, onChange: (e) => setName(e.target.value) })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-zinc-300 mb-1.5", children: "Price (USD)" }), _jsx(Input, { type: "number", step: "0.01", required: true, placeholder: "29.00", value: price, onChange: (e) => setPrice(e.target.value) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-zinc-300 mb-1.5", children: "Category" }), _jsxs("select", { value: category, onChange: (e) => setCategory(e.target.value), className: "w-full h-11 rounded-xl border border-white/10 bg-zinc-900/60 px-3 text-xs text-white", children: [_jsx("option", { value: "ebook", children: "Ebook (PDF)" }), _jsx("option", { value: "template", children: "Template (ZIP/Notion)" }), _jsx("option", { value: "video", children: "Video Masterclass" }), _jsx("option", { value: "audio", children: "Audio / Podcast" }), _jsx("option", { value: "zip", children: "Asset Pack (ZIP)" })] })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-zinc-300 mb-1.5", children: "Description" }), _jsx("textarea", { rows: 3, required: true, className: "w-full rounded-xl border border-white/10 bg-zinc-900/60 p-3 text-xs text-zinc-100 placeholder:text-zinc-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none", placeholder: "Explain what the customer will achieve with this download...", value: description, onChange: (e) => setDescription(e.target.value) })] }), _jsxs("div", { className: "rounded-2xl border-2 border-dashed border-white/10 p-4 text-center bg-zinc-900/40 hover:border-indigo-500/40 transition-colors", children: [_jsx(UploadCloud, { className: "h-6 w-6 text-indigo-400 mx-auto mb-1.5" }), _jsx("p", { className: "text-xs font-medium text-white", children: "Upload Protected Asset File" }), _jsx("p", { className: "text-[11px] text-zinc-500 mt-0.5", children: "Files are stored securely. Customers only receive temporary signed URLs." }), _jsx(Input, { type: "text", value: fileName, onChange: (e) => setFileName(e.target.value), className: "mt-3 text-xs font-mono h-9 text-center bg-zinc-950/80", placeholder: "Attached File Name" })] }), _jsxs("div", { className: "flex gap-3 pt-2", children: [_jsx(Button, { variant: "outline", type: "button", className: "w-1/3", onClick: () => setCreateModal(false), children: "Cancel" }), _jsx(Button, { variant: "gradient", type: "submit", className: "w-2/3", children: "Publish to Store" })] })] })] }) }))] }));
}
