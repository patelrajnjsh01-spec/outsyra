import fs from "fs";
import path from "path";
import { createAdminSupabaseClient } from "../supabase/admin.js";
import { initialProducts } from "../supabase/mock-db.js";

const DATA_DIR = path.join(process.cwd(), "data");
const PRODUCTS_FILE = path.join(DATA_DIR, "products.json");

function isSupabaseConfigured() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    return Boolean(url && key && !url.includes("your-project-id") && !key.includes("your-supabase"));
}

function ensureLocalStore() {
    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(PRODUCTS_FILE)) {
        fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(initialProducts, null, 2), "utf8");
    }
}

function readLocalProducts() {
    ensureLocalStore();
    try {
        const content = fs.readFileSync(PRODUCTS_FILE, "utf8");
        return JSON.parse(content || "[]");
    } catch (err) {
        console.error("[ProductsDB] Failed to read local products store:", err);
        return [...initialProducts];
    }
}

function writeLocalProducts(products) {
    ensureLocalStore();
    try {
        fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), "utf8");
        return true;
    } catch (err) {
        console.error("[ProductsDB] Failed to write local products store:", err);
        return false;
    }
}

/**
 * Fetch all digital products for a workspace from PostgreSQL or local persistent store.
 */
export async function getDbProducts(workspaceId = "ws-rajnish-001") {
    if (isSupabaseConfigured()) {
        try {
            const supabase = createAdminSupabaseClient();
            let query = supabase.from("products").select("*");
            if (workspaceId) {
                query = query.eq("workspace_id", workspaceId);
            }
            const { data, error } = await query.order("created_at", { ascending: false });
            if (!error && Array.isArray(data) && data.length > 0) {
                return data;
            }
            if (error) {
                console.warn("[ProductsDB] Supabase query error, falling back to persistent store:", error.message);
            }
        } catch (err) {
            console.warn("[ProductsDB] Supabase connection error:", err.message);
        }
    }

    const localProducts = readLocalProducts();
    if (workspaceId) {
        return localProducts.filter((p) => p.workspace_id === workspaceId);
    }
    return localProducts;
}

/**
 * Fetch a single product by ID
 */
export async function getDbProductById(productId) {
    if (!productId) return null;
    if (isSupabaseConfigured()) {
        try {
            const supabase = createAdminSupabaseClient();
            const { data, error } = await supabase
                .from("products")
                .select("*")
                .eq("id", productId)
                .maybeSingle();
            if (!error && data) return data;
        } catch (err) {
            console.warn("[ProductsDB] Supabase getProductById error:", err.message);
        }
    }

    const localProducts = readLocalProducts();
    return localProducts.find((p) => p.id === productId || p.slug === productId) || null;
}

/**
 * Create a new digital product in PostgreSQL / persistent store
 */
export async function createDbProduct(workspaceId, productData) {
    const defaultWorkspace = workspaceId || productData.workspace_id || "ws-rajnish-001";
    const cleanSlug =
        productData.slug ||
        (productData.name || "product")
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");

    const newProduct = {
        id: productData.id || `prod_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
        workspace_id: defaultWorkspace,
        name: productData.name?.trim() || "Untitled Digital Product",
        slug: cleanSlug,
        description: productData.description || "",
        price: parseFloat(productData.price) || 0,
        currency: productData.currency || "USD",
        cover_image:
            productData.cover_image ||
            "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80",
        category: productData.category || "ebook",
        status: productData.status || "published",
        file_url: productData.file_url || "",
        file_name: productData.file_name || "",
        file_size: parseInt(productData.file_size, 10) || 0,
        total_sales: parseInt(productData.total_sales, 10) || 0,
        seo_title: productData.seo_title || productData.name || "",
        seo_description: productData.seo_description || productData.description || "",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured()) {
        try {
            const supabase = createAdminSupabaseClient();
            const { data, error } = await supabase.from("products").insert([newProduct]).select().single();
            if (!error && data) {
                const local = readLocalProducts();
                writeLocalProducts([data, ...local.filter((p) => p.id !== data.id)]);
                return data;
            }
            if (error) {
                console.warn("[ProductsDB] Supabase insert error:", error.message);
            }
        } catch (err) {
            console.warn("[ProductsDB] Supabase createProduct error:", err.message);
        }
    }

    const localProducts = readLocalProducts();
    const updated = [newProduct, ...localProducts.filter((p) => p.id !== newProduct.id)];
    writeLocalProducts(updated);
    return newProduct;
}

/**
 * Update an existing product
 */
export async function updateDbProduct(productId, updates) {
    if (!productId) throw new Error("Product ID is required for update.");

    const sanitizedUpdates = {
        ...updates,
        updated_at: new Date().toISOString(),
    };
    if (sanitizedUpdates.price !== undefined) {
        sanitizedUpdates.price = parseFloat(sanitizedUpdates.price) || 0;
    }
    if (sanitizedUpdates.file_size !== undefined) {
        sanitizedUpdates.file_size = parseInt(sanitizedUpdates.file_size, 10) || 0;
    }

    if (isSupabaseConfigured()) {
        try {
            const supabase = createAdminSupabaseClient();
            const { data, error } = await supabase
                .from("products")
                .update(sanitizedUpdates)
                .eq("id", productId)
                .select()
                .single();
            if (!error && data) {
                const local = readLocalProducts();
                writeLocalProducts(local.map((p) => (p.id === productId ? { ...p, ...data } : p)));
                return data;
            }
            if (error) {
                console.warn("[ProductsDB] Supabase update error:", error.message);
            }
        } catch (err) {
            console.warn("[ProductsDB] Supabase updateProduct error:", err.message);
        }
    }

    const local = readLocalProducts();
    const existingIndex = local.findIndex((p) => p.id === productId);
    if (existingIndex === -1) {
        throw new Error(`Product with ID "${productId}" not found.`);
    }

    const updated = {
        ...local[existingIndex],
        ...sanitizedUpdates,
    };
    local[existingIndex] = updated;
    writeLocalProducts(local);
    return updated;
}

/**
 * Delete a product
 */
export async function deleteDbProduct(productId) {
    if (!productId) return false;

    if (isSupabaseConfigured()) {
        try {
            const supabase = createAdminSupabaseClient();
            const { error } = await supabase.from("products").delete().eq("id", productId);
            if (error) {
                console.warn("[ProductsDB] Supabase delete error:", error.message);
            }
        } catch (err) {
            console.warn("[ProductsDB] Supabase deleteProduct error:", err.message);
        }
    }

    const local = readLocalProducts();
    const filtered = local.filter((p) => p.id !== productId);
    writeLocalProducts(filtered);
    return true;
}
