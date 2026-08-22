"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Search, Download, Eye, Trash2, UploadCloud, Check } from "lucide-react";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getProducts, addProduct, deleteProduct } from "@/lib/supabase/db";

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [createModal, setCreateModal] = useState(false);
    const [loading, setLoading] = useState(true);

    // Form State
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("29.00");
    const [category, setCategory] = useState("ebook");
    const [fileName, setFileName] = useState("exclusive_guide_2026.pdf");

    useEffect(() => {
        async function fetchProducts() {
            try {
                const data = await getProducts("ws-rajnish-001");
                setProducts(data || []);
            } catch (err) {
                console.error("Failed to fetch products", err);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);

    const filteredProducts = products.filter((p) =>
        p.name?.toLowerCase().includes(search.toLowerCase())
    );

    const handleCreateProduct = async (e) => {
        e.preventDefault();
        const newProd = await addProduct("ws-rajnish-001", {
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
        });
        setProducts([newProd, ...products]);
        setCreateModal(false);
        setName("");
        setDescription("");
    };

    const handleDeleteProduct = async (id) => {
        setProducts(products.filter((p) => p.id !== id));
        await deleteProduct(id);
    };

    return (
        <div className="flex-1 flex flex-col">
            <DashboardHeader
                title="Digital Product Store (PostgreSQL)"
                subtitle="Manage your downloadable ebooks, templates, guides, and digital assets stored in Supabase."
            />
            <main className="p-6 md:p-8 space-y-6 max-w-7xl">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                        <Input
                            placeholder="Search products by title..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <Button variant="gradient" onClick={() => setCreateModal(true)} className="gap-2 text-xs">
                        <Plus className="h-4 w-4" />
                        Create Digital Product
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                        <Card
                            key={product.id}
                            className="glass-panel border-white/5 overflow-hidden flex flex-col justify-between group hover:border-indigo-500/30 transition-all"
                        >
                            <div>
                                <div className="relative h-44 w-full bg-zinc-900 overflow-hidden">
                                    <img
                                        src={product.cover_image}
                                        alt={product.name}
                                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute top-3 left-3 flex gap-1.5">
                                        <Badge variant="default" className="text-[10px] uppercase bg-black/60 backdrop-blur-md">
                                            {product.category}
                                        </Badge>
                                    </div>
                                    <div className="absolute top-3 right-3">
                                        <Badge
                                            variant="success"
                                            className="text-[10px] bg-emerald-950/80 text-emerald-400 border-emerald-500/30"
                                        >
                                            ${product.price?.toFixed(2)}
                                        </Badge>
                                    </div>
                                </div>
                                <div className="p-6 space-y-2">
                                    <h3 className="font-bold text-white text-base leading-snug group-hover:text-indigo-300 transition-colors">
                                        {product.name}
                                    </h3>
                                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                                        {product.description}
                                    </p>
                                    <div className="pt-2 flex items-center justify-between text-xs text-zinc-500 border-t border-white/5">
                                        <span className="flex items-center gap-1 text-zinc-400">
                                            <Download className="h-3.5 w-3.5" />
                                            {product.total_sales || 0} sales ($
                                            {((product.total_sales || 0) * (product.price || 0)).toLocaleString()})
                                        </span>
                                        <span className="text-[11px] font-mono">{product.file_name}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 bg-zinc-950/60 border-t border-white/5 flex items-center justify-between gap-2">
                                <Link href={`/checkout/${product.id}`} target="_blank">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="text-xs text-indigo-300 border-indigo-500/20 gap-1.5"
                                    >
                                        <Eye className="h-3.5 w-3.5" />
                                        Checkout Page
                                    </Button>
                                </Link>
                                <div className="flex items-center gap-1">
                                    <a
                                        href={`/api/products/${product.id}/download`}
                                        target="_blank"
                                        className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                                        title="Download Protected Asset"
                                    >
                                        <Download className="h-4 w-4" />
                                    </a>
                                    <button
                                        onClick={() => handleDeleteProduct(product.id)}
                                        className="p-2 text-rose-400 hover:text-rose-300 rounded-lg hover:bg-rose-500/10 transition-colors"
                                        title="Delete Product from Database"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </main>

            {createModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/10 max-w-xl w-full space-y-5 animate-in fade-in zoom-in-95">
                        <div className="flex items-center justify-between border-b border-white/5 pb-4">
                            <div>
                                <h3 className="text-lg font-bold text-white">Create Digital Product</h3>
                                <p className="text-xs text-zinc-400">
                                    Saved directly to your Supabase PostgreSQL products table.
                                </p>
                            </div>
                        </div>
                        <form onSubmit={handleCreateProduct} className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-zinc-300 mb-1.5">Product Title</label>
                                <Input
                                    required
                                    placeholder="e.g. 100+ High Converting Email Templates"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-zinc-300 mb-1.5">Price (USD)</label>
                                    <Input
                                        type="number"
                                        step="0.01"
                                        required
                                        placeholder="29.00"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-zinc-300 mb-1.5">Category</label>
                                    <select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="w-full h-11 rounded-xl border border-white/10 bg-zinc-900/60 px-3 text-xs text-white"
                                    >
                                        <option value="ebook">Ebook (PDF)</option>
                                        <option value="template">Template (ZIP/Notion)</option>
                                        <option value="video">Video Masterclass</option>
                                        <option value="audio">Audio / Podcast</option>
                                        <option value="zip">Asset Pack (ZIP)</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-zinc-300 mb-1.5">Description</label>
                                <textarea
                                    rows={3}
                                    required
                                    className="w-full rounded-xl border border-white/10 bg-zinc-900/60 p-3 text-xs text-zinc-100 placeholder:text-zinc-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                    placeholder="Explain what the customer will achieve with this download..."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div className="rounded-2xl border-2 border-dashed border-white/10 p-4 text-center bg-zinc-900/40 hover:border-indigo-500/40 transition-colors">
                                <UploadCloud className="h-6 w-6 text-indigo-400 mx-auto mb-1.5" />
                                <p className="text-xs font-medium text-white">Upload Protected Asset File</p>
                                <p className="text-[11px] text-zinc-500 mt-0.5">
                                    Files are stored securely with signed URL generation.
                                </p>
                                <Input
                                    type="text"
                                    value={fileName}
                                    onChange={(e) => setFileName(e.target.value)}
                                    className="mt-3 text-xs font-mono h-9 text-center bg-zinc-950/80"
                                    placeholder="Attached File Name"
                                />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <Button variant="outline" type="button" className="w-1/3" onClick={() => setCreateModal(false)}>
                                    Cancel
                                </Button>
                                <Button variant="gradient" type="submit" className="w-2/3">
                                    Save to Supabase
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
