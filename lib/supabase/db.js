import { createClient } from "./client";
import {
    initialWorkspace,
    initialWorkspaces,
    initialStoreBlocks,
    initialProducts,
    initialCourses,
    initialBookingServices,
    initialCoachingOffers,
    initialEmailSubscribers,
    initialEmailCampaigns,
    initialCommunities,
    initialCommunityPosts,
    initialInstagramRules,
    initialOrders,
} from "./mock-db";

function isConfigured() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    return !!(url && key && !url.includes("your-project-id") && !key.includes("your-supabase"));
}

function getSafeClient() {
    try {
        if (!isConfigured()) return null;
        return createClient();
    } catch {
        return null;
    }
}

// In-memory fallback caches so local edits update instantly even before DB seeding
let cacheWorkspace = { ...initialWorkspace };
let cacheStoreBlocks = [...initialStoreBlocks];
let cacheProducts = [...initialProducts];
let cacheCourses = [...initialCourses];
let cacheBookingServices = [...initialBookingServices];
let cacheCoachingOffers = [...initialCoachingOffers];
let cacheSubscribers = [...initialEmailSubscribers];
let cacheCampaigns = [...initialEmailCampaigns];
let cachePosts = [...initialCommunityPosts];
let cacheInstagramRules = [...initialInstagramRules];
let cacheOrders = [...initialOrders];

// STORAGE: PROTECTED ASSET & COVER IMAGE UPLOADS
// ============================================================================
export async function uploadAssetFile(file, bucket = "product-assets") {
    if (!file) return null;
    
    // In browser environment, upload via /api/upload
    if (typeof window !== "undefined") {
        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("bucket", bucket);

            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                const data = await res.json();
                if (data.success) {
                    return {
                        fileName: data.fileName || file.name,
                        fileSize: data.fileSize || file.size,
                        fileUrl: data.url,
                    };
                }
            }
        } catch (err) {
            console.warn("[Storage] /api/upload failed, trying direct client:", err);
        }
    }

    const supabase = getSafeClient();
    const cleanFileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    if (supabase) {
        try {
            const { data, error } = await supabase.storage
                .from(bucket)
                .upload(cleanFileName, file, { cacheControl: "3600", upsert: true });
            if (data && !error) {
                const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(cleanFileName);
                return {
                    fileName: file.name,
                    fileSize: file.size,
                    fileUrl: urlData?.publicUrl || cleanFileName,
                };
            }
        } catch (err) {
            console.warn("[Storage] Supabase uploadAssetFile fallback:", err);
        }
    }
    return {
        fileName: file.name,
        fileSize: file.size,
        fileUrl: `/uploads/${cleanFileName}`,
    };
}

export async function uploadCoverImage(file) {
    return uploadAssetFile(file, "product-images");
}

// ============================================================================
// 1. WORKSPACES & PROFILES CRUD (Persistent Across Refresh)
// ============================================================================
export function getAllWorkspaces() {
    return initialWorkspaces;
}

export function getWorkspaceById(workspaceId) {
    if (!workspaceId) return initialWorkspace;
    const found = initialWorkspaces.find((w) => w.id === workspaceId);
    return found || initialWorkspace;
}

export async function getWorkspace(identifier = "rajnish") {
    // Check if identifier matches a known workspace by id or username
    const localMatch = initialWorkspaces.find(
        (w) => w.username === identifier || w.id === identifier
    );

    // 1. Try Supabase
    const supabase = getSafeClient();
    if (supabase) {
        try {
            const queryField = identifier.startsWith("ws-") ? "id" : "username";
            const { data, error } = await supabase
                .from("creator_workspaces")
                .select("*")
                .eq(queryField, identifier)
                .single();
            if (data && !error) {
                cacheWorkspace = data;
                if (typeof window !== "undefined") {
                    localStorage.setItem(`outsyra_ws_${data.username}`, JSON.stringify(data));
                }
                return data;
            }
        } catch (err) {
            console.warn("[DB] Supabase getWorkspace fallback:", err);
        }
    }

    // 2. Try Server API Sync
    if (typeof window !== "undefined") {
        try {
            const res = await fetch(`/api/workspace/sync?username=${encodeURIComponent(identifier)}`);
            if (res.ok) {
                const data = await res.json();
                if (data.workspace) {
                    cacheWorkspace = data.workspace;
                    localStorage.setItem(`outsyra_ws_${data.workspace.username || identifier}`, JSON.stringify(data.workspace));
                    return data.workspace;
                }
            }
        } catch (err) {
            console.warn("[DB] /api/workspace/sync fetch fallback:", err);
        }

        // 3. Try LocalStorage
        try {
            const saved = localStorage.getItem(`outsyra_ws_${identifier}`);
            if (saved) {
                const parsed = JSON.parse(saved);
                cacheWorkspace = parsed;
                return parsed;
            }
        } catch (e) {
            console.warn("[DB] localStorage parse fallback:", e);
        }
    }

    return localMatch || cacheWorkspace;
}

export async function updateWorkspace(workspaceId, updates) {
    cacheWorkspace = {
        ...cacheWorkspace,
        ...updates,
        theme_config: {
            ...(cacheWorkspace.theme_config || {}),
            ...(updates.theme_config || {}),
        },
    };

    // 1. Persist to LocalStorage for instant hydration
    if (typeof window !== "undefined") {
        try {
            localStorage.setItem(`outsyra_ws_${cacheWorkspace.username || "rajnish"}`, JSON.stringify(cacheWorkspace));
        } catch (e) {
            console.warn("[DB] localStorage write error:", e);
        }
    }

    // 2. Persist to Server API
    if (typeof window !== "undefined") {
        try {
            fetch("/api/workspace/sync", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ workspaceUpdates: updates }),
            }).catch((err) => console.warn("[DB] sync API POST error:", err));
        } catch (err) {
            console.warn("[DB] sync API fetch error:", err);
        }
    }

    // 3. Persist to Supabase
    const supabase = getSafeClient();
    if (supabase) {
        try {
            const { data, error } = await supabase
                .from("creator_workspaces")
                .update(updates)
                .eq("id", workspaceId)
                .select()
                .single();
            if (data && !error) {
                cacheWorkspace = { ...cacheWorkspace, ...data };
                return data;
            }
        } catch (err) {
            console.warn("[DB] Supabase updateWorkspace fallback:", err);
        }
    }

    return cacheWorkspace;
}

// ============================================================================
// 2. STORE BLOCKS CRUD (Link-in-Bio Customizer Persistent Across Refresh)
// ============================================================================
export async function getStoreBlocks(workspaceId = "ws-rajnish-001") {
    // 1. Try Supabase
    const supabase = getSafeClient();
    if (supabase) {
        try {
            const { data, error } = await supabase
                .from("store_blocks")
                .select("*")
                .order("order_index", { ascending: true });
            if (data && data.length > 0 && !error) {
                cacheStoreBlocks = data;
                if (typeof window !== "undefined") {
                    localStorage.setItem(`outsyra_blocks_${workspaceId}`, JSON.stringify(data));
                }
                return data;
            }
        } catch (err) {
            console.warn("[DB] Supabase getStoreBlocks fallback:", err);
        }
    }

    // 2. Try Server API Sync
    if (typeof window !== "undefined") {
        try {
            const res = await fetch(`/api/workspace/sync?workspace_id=${encodeURIComponent(workspaceId)}`);
            if (res.ok) {
                const data = await res.json();
                if (data.blocks && data.blocks.length > 0) {
                    cacheStoreBlocks = data.blocks;
                    localStorage.setItem(`outsyra_blocks_${workspaceId}`, JSON.stringify(data.blocks));
                    return data.blocks;
                }
            }
        } catch (err) {
            console.warn("[DB] /api/workspace/sync blocks fetch fallback:", err);
        }

        // 3. Try LocalStorage
        try {
            const saved = localStorage.getItem(`outsyra_blocks_${workspaceId}`);
            if (saved) {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    cacheStoreBlocks = parsed;
                    return parsed;
                }
            }
        } catch (e) {
            console.warn("[DB] localStorage blocks parse fallback:", e);
        }
    }

    return cacheStoreBlocks;
}

export async function addStoreBlock(workspaceId, blockData) {
    const newBlock = {
        id: `block-${Date.now()}`,
        workspace_id: workspaceId || "ws-rajnish-001",
        order_index: cacheStoreBlocks.length,
        is_visible: true,
        ...blockData,
    };
    cacheStoreBlocks.push(newBlock);

    if (typeof window !== "undefined") {
        try {
            localStorage.setItem(`outsyra_blocks_${workspaceId}`, JSON.stringify(cacheStoreBlocks));
            fetch("/api/workspace/sync", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ blocks: cacheStoreBlocks }),
            }).catch((e) => console.warn(e));
        } catch (e) {
            console.warn(e);
        }
    }

    const supabase = getSafeClient();
    if (supabase) {
        try {
            const { data, error } = await supabase
                .from("store_blocks")
                .insert([newBlock])
                .select()
                .single();
            if (data && !error) return data;
        } catch (err) {
            console.warn("[DB] Supabase addStoreBlock fallback:", err);
        }
    }
    return newBlock;
}

export async function updateStoreBlock(blockId, updates) {
    cacheStoreBlocks = cacheStoreBlocks.map((b) => (b.id === blockId ? { ...b, ...updates } : b));

    if (typeof window !== "undefined") {
        try {
            localStorage.setItem("outsyra_blocks_ws-rajnish-001", JSON.stringify(cacheStoreBlocks));
            fetch("/api/workspace/sync", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ blocks: cacheStoreBlocks }),
            }).catch((e) => console.warn(e));
        } catch (e) {
            console.warn(e);
        }
    }

    const supabase = getSafeClient();
    if (supabase) {
        try {
            const { data, error } = await supabase
                .from("store_blocks")
                .update(updates)
                .eq("id", blockId)
                .select()
                .single();
            if (data && !error) return data;
        } catch (err) {
            console.warn("[DB] Supabase updateStoreBlock fallback:", err);
        }
    }
    return cacheStoreBlocks.find((b) => b.id === blockId);
}

export async function deleteStoreBlock(blockId) {
    cacheStoreBlocks = cacheStoreBlocks.filter((b) => b.id !== blockId);

    if (typeof window !== "undefined") {
        try {
            localStorage.setItem("outsyra_blocks_ws-rajnish-001", JSON.stringify(cacheStoreBlocks));
            fetch("/api/workspace/sync", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ blocks: cacheStoreBlocks }),
            }).catch((e) => console.warn(e));
        } catch (e) {
            console.warn(e);
        }
    }

    const supabase = getSafeClient();
    if (supabase) {
        try {
            await supabase.from("store_blocks").delete().eq("id", blockId);
        } catch (err) {
            console.warn("[DB] Supabase deleteStoreBlock fallback:", err);
        }
    }
    return true;
}

export async function reorderStoreBlocks(workspaceId, orderedBlocks) {
    const indexed = orderedBlocks.map((b, i) => ({ ...b, order_index: i }));
    cacheStoreBlocks = [...indexed];

    if (typeof window !== "undefined") {
        try {
            localStorage.setItem(`outsyra_blocks_${workspaceId}`, JSON.stringify(cacheStoreBlocks));
            fetch("/api/workspace/sync", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ blocks: cacheStoreBlocks }),
            }).catch((e) => console.warn(e));
        } catch (e) {
            console.warn(e);
        }
    }

    const supabase = getSafeClient();
    if (supabase) {
        try {
            for (let i = 0; i < indexed.length; i++) {
                await supabase
                    .from("store_blocks")
                    .update({ order_index: i })
                    .eq("id", indexed[i].id);
            }
        } catch (err) {
            console.warn("[DB] Supabase reorderStoreBlocks fallback:", err);
        }
    }
    return cacheStoreBlocks;
}

export async function replaceStoreBlocks(workspaceId, newBlocks) {
    const indexed = newBlocks.map((b, i) => ({ ...b, order_index: i }));
    cacheStoreBlocks = [...indexed];

    if (typeof window !== "undefined") {
        try {
            localStorage.setItem(`outsyra_blocks_${workspaceId}`, JSON.stringify(cacheStoreBlocks));
            fetch("/api/workspace/sync", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ blocks: cacheStoreBlocks }),
            }).catch((e) => console.warn(e));
        } catch (e) {
            console.warn(e);
        }
    }

    const supabase = getSafeClient();
    if (supabase) {
        try {
            await supabase.from("store_blocks").delete().eq("workspace_id", workspaceId);
            if (indexed.length > 0) {
                await supabase.from("store_blocks").insert(indexed);
            }
        } catch (err) {
            console.warn("[DB] Supabase replaceStoreBlocks fallback:", err);
        }
    }
    return cacheStoreBlocks;
}

// ============================================================================
// 3. DIGITAL PRODUCTS CRUD
// ============================================================================
export async function getProducts(workspaceId = "ws-rajnish-001") {
    if (typeof window !== "undefined") {
        try {
            const res = await fetch(`/api/products?workspace_id=${encodeURIComponent(workspaceId)}`);
            if (res.ok) {
                const data = await res.json();
                if (data.success && Array.isArray(data.products)) {
                    cacheProducts = data.products;
                    return data.products;
                }
            }
        } catch (err) {
            console.warn("[DB] /api/products GET error:", err);
        }
    }

    const supabase = getSafeClient();
    if (supabase) {
        try {
            const { data, error } = await supabase
                .from("products")
                .select("*")
                .order("created_at", { ascending: false });
            if (data && data.length > 0 && !error) return data;
        } catch (err) {
            console.warn("[DB] Supabase getProducts fallback:", err);
        }
    }
    return cacheProducts;
}

export async function addProduct(workspaceId, productData) {
    if (typeof window !== "undefined") {
        try {
            const res = await fetch("/api/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ workspace_id: workspaceId || "ws-rajnish-001", ...productData }),
            });
            if (res.ok) {
                const data = await res.json();
                if (data.success && data.product) {
                    cacheProducts = [data.product, ...cacheProducts.filter((p) => p.id !== data.product.id)];
                    return data.product;
                }
            }
        } catch (err) {
            console.warn("[DB] /api/products POST error:", err);
        }
    }

    const newProduct = {
        id: `prod-${Date.now()}`,
        workspace_id: workspaceId || "ws-rajnish-001",
        total_sales: 0,
        status: "published",
        created_at: new Date().toISOString(),
        ...productData,
    };
    const supabase = getSafeClient();
    if (supabase) {
        try {
            const { data, error } = await supabase
                .from("products")
                .insert([newProduct])
                .select()
                .single();
            if (data && !error) {
                cacheProducts.unshift(data);
                return data;
            }
        } catch (err) {
            console.warn("[DB] Supabase addProduct fallback:", err);
        }
    }
    cacheProducts.unshift(newProduct);
    return newProduct;
}

export async function updateProduct(productId, updates) {
    if (typeof window !== "undefined") {
        try {
            const res = await fetch(`/api/products/${encodeURIComponent(productId)}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updates),
            });
            if (res.ok) {
                const data = await res.json();
                if (data.success && data.product) {
                    cacheProducts = cacheProducts.map((p) => (p.id === productId ? { ...p, ...data.product } : p));
                    return data.product;
                }
            }
        } catch (err) {
            console.warn("[DB] /api/products PUT error:", err);
        }
    }

    const supabase = getSafeClient();
    if (supabase) {
        try {
            const { data, error } = await supabase
                .from("products")
                .update(updates)
                .eq("id", productId)
                .select()
                .single();
            if (data && !error) {
                cacheProducts = cacheProducts.map((p) => (p.id === productId ? { ...p, ...data } : p));
                return data;
            }
        } catch (err) {
            console.warn("[DB] Supabase updateProduct fallback:", err);
        }
    }
    cacheProducts = cacheProducts.map((p) => (p.id === productId ? { ...p, ...updates } : p));
    return cacheProducts.find((p) => p.id === productId);
}

export async function deleteProduct(productId) {
    if (typeof window !== "undefined") {
        try {
            const res = await fetch(`/api/products/${encodeURIComponent(productId)}`, {
                method: "DELETE",
            });
            if (res.ok) {
                cacheProducts = cacheProducts.filter((p) => p.id !== productId);
                return true;
            }
        } catch (err) {
            console.warn("[DB] /api/products DELETE error:", err);
        }
    }

    const supabase = getSafeClient();
    if (supabase) {
        try {
            await supabase.from("products").delete().eq("id", productId);
        } catch (err) {
            console.warn("[DB] Supabase deleteProduct fallback:", err);
        }
    }
    cacheProducts = cacheProducts.filter((p) => p.id !== productId);
    return true;
}

// ============================================================================
// 4. COURSES & LMS CRUD
// ============================================================================
export async function getCourses(workspaceId = "ws-rajnish-001") {
    const supabase = getSafeClient();
    if (supabase) {
        try {
            const { data, error } = await supabase
                .from("courses")
                .select("*")
                .order("created_at", { ascending: false });
            if (data && data.length > 0 && !error) return data;
        } catch (err) {
            console.warn("[DB] Supabase getCourses fallback:", err);
        }
    }
    return cacheCourses;
}

export async function addCourse(workspaceId, courseData) {
    const newCourse = {
        id: `course-${Date.now()}`,
        workspace_id: workspaceId || "ws-rajnish-001",
        total_students: 0,
        status: "published",
        modules: [],
        created_at: new Date().toISOString(),
        ...courseData,
    };
    const supabase = getSafeClient();
    if (supabase) {
        try {
            const { data, error } = await supabase
                .from("courses")
                .insert([newCourse])
                .select()
                .single();
            if (data && !error) {
                cacheCourses.unshift(data);
                return data;
            }
        } catch (err) {
            console.warn("[DB] Supabase addCourse fallback:", err);
        }
    }
    cacheCourses.unshift(newCourse);
    return newCourse;
}

export async function deleteCourse(courseId) {
    const supabase = getSafeClient();
    if (supabase) {
        try {
            await supabase.from("courses").delete().eq("id", courseId);
        } catch (err) {
            console.warn("[DB] Supabase deleteCourse fallback:", err);
        }
    }
    cacheCourses = cacheCourses.filter((c) => c.id !== courseId);
    return true;
}

// ============================================================================
// 5. COACHING PROGRAMS CRUD
// ============================================================================
export async function getCoachingOffers(workspaceId = "ws-rajnish-001") {
    const supabase = getSafeClient();
    if (supabase) {
        try {
            const { data, error } = await supabase
                .from("coaching_offers")
                .select("*")
                .order("created_at", { ascending: false });
            if (data && data.length > 0 && !error) return data;
        } catch (err) {
            console.warn("[DB] Supabase getCoachingOffers fallback:", err);
        }
    }
    return cacheCoachingOffers;
}

export async function addCoachingOffer(workspaceId, offerData) {
    const newOffer = {
        id: `coach-${Date.now()}`,
        workspace_id: workspaceId || "ws-rajnish-001",
        is_active: true,
        created_at: new Date().toISOString(),
        ...offerData,
    };
    const supabase = getSafeClient();
    if (supabase) {
        try {
            const { data, error } = await supabase
                .from("coaching_offers")
                .insert([newOffer])
                .select()
                .single();
            if (data && !error) {
                cacheCoachingOffers.unshift(data);
                return data;
            }
        } catch (err) {
            console.warn("[DB] Supabase addCoachingOffer fallback:", err);
        }
    }
    cacheCoachingOffers.unshift(newOffer);
    return newOffer;
}

export async function deleteCoachingOffer(offerId) {
    const supabase = getSafeClient();
    if (supabase) {
        try {
            await supabase.from("coaching_offers").delete().eq("id", offerId);
        } catch (err) {
            console.warn("[DB] Supabase deleteCoachingOffer fallback:", err);
        }
    }
    cacheCoachingOffers = cacheCoachingOffers.filter((c) => c.id !== offerId);
    return true;
}

// ============================================================================
// 6. BOOKINGS & APPOINTMENTS CRUD
// ============================================================================
export async function getBookingServices(workspaceId = "ws-rajnish-001") {
    const supabase = getSafeClient();
    if (supabase) {
        try {
            const { data, error } = await supabase
                .from("booking_services")
                .select("*");
            if (data && data.length > 0 && !error) return data;
        } catch (err) {
            console.warn("[DB] Supabase getBookingServices fallback:", err);
        }
    }
    return cacheBookingServices;
}

export async function addBookingService(workspaceId, serviceData) {
    const newService = {
        id: `svc-${Date.now()}`,
        workspace_id: workspaceId || "ws-rajnish-001",
        is_active: true,
        ...serviceData,
    };
    const supabase = getSafeClient();
    if (supabase) {
        try {
            const { data, error } = await supabase
                .from("booking_services")
                .insert([newService])
                .select()
                .single();
            if (data && !error) {
                cacheBookingServices.push(data);
                return data;
            }
        } catch (err) {
            console.warn("[DB] Supabase addBookingService fallback:", err);
        }
    }
    cacheBookingServices.push(newService);
    return newService;
}

// ============================================================================
// 7. EMAIL SUBSCRIBERS & CAMPAIGNS CRUD
// ============================================================================
export async function getEmailSubscribers(workspaceId = "ws-rajnish-001") {
    const supabase = getSafeClient();
    if (supabase) {
        try {
            const { data, error } = await supabase
                .from("email_subscribers")
                .select("*")
                .order("created_at", { ascending: false });
            if (data && data.length > 0 && !error) return data;
        } catch (err) {
            console.warn("[DB] Supabase getEmailSubscribers fallback:", err);
        }
    }
    return cacheSubscribers;
}

export async function addEmailSubscriber(workspaceId, subscriberData) {
    const newSub = {
        id: `sub-${Date.now()}`,
        workspace_id: workspaceId || "ws-rajnish-001",
        status: "active",
        created_at: new Date().toISOString(),
        ...subscriberData,
    };
    const supabase = getSafeClient();
    if (supabase) {
        try {
            const { data, error } = await supabase
                .from("email_subscribers")
                .insert([newSub])
                .select()
                .single();
            if (data && !error) {
                cacheSubscribers.unshift(data);
                return data;
            }
        } catch (err) {
            console.warn("[DB] Supabase addEmailSubscriber fallback:", err);
        }
    }
    cacheSubscribers.unshift(newSub);
    return newSub;
}

export async function getEmailCampaigns(workspaceId = "ws-rajnish-001") {
    const supabase = getSafeClient();
    if (supabase) {
        try {
            const { data, error } = await supabase
                .from("email_campaigns")
                .select("*")
                .order("created_at", { ascending: false });
            if (data && data.length > 0 && !error) return data;
        } catch (err) {
            console.warn("[DB] Supabase getEmailCampaigns fallback:", err);
        }
    }
    return cacheCampaigns;
}

export async function createEmailCampaign(workspaceId, campaignData) {
    const newCamp = {
        id: `camp-${Date.now()}`,
        workspace_id: workspaceId || "ws-rajnish-001",
        recipients_count: cacheSubscribers.length,
        status: "sent",
        open_rate: 0,
        click_rate: 0,
        sent_at: new Date().toISOString(),
        ...campaignData,
    };
    const supabase = getSafeClient();
    if (supabase) {
        try {
            const { data, error } = await supabase
                .from("email_campaigns")
                .insert([newCamp])
                .select()
                .single();
            if (data && !error) {
                cacheCampaigns.unshift(data);
                return data;
            }
        } catch (err) {
            console.warn("[DB] Supabase createEmailCampaign fallback:", err);
        }
    }
    cacheCampaigns.unshift(newCamp);
    return newCamp;
}

// ============================================================================
// 8. COMMUNITY POSTS, LIKES & COMMENTS CRUD
// ============================================================================
export async function getCommunityPosts(communityId = "comm-001") {
    const supabase = getSafeClient();
    if (supabase) {
        try {
            const { data, error } = await supabase
                .from("community_posts")
                .select("*")
                .order("created_at", { ascending: false });
            if (data && data.length > 0 && !error) return data;
        } catch (err) {
            console.warn("[DB] Supabase getCommunityPosts fallback:", err);
        }
    }
    return cachePosts;
}

export async function createCommunityPost(communityId, postData) {
    const newPost = {
        id: `post-${Date.now()}`,
        community_id: communityId || "comm-001",
        author_name: "Rajnish Sharma",
        author_avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
        likes_count: 0,
        comments_count: 0,
        comments: [],
        created_at: new Date().toISOString(),
        ...postData,
    };
    const supabase = getSafeClient();
    if (supabase) {
        try {
            const { data, error } = await supabase
                .from("community_posts")
                .insert([newPost])
                .select()
                .single();
            if (data && !error) {
                cachePosts.unshift(data);
                return data;
            }
        } catch (err) {
            console.warn("[DB] Supabase createCommunityPost fallback:", err);
        }
    }
    cachePosts.unshift(newPost);
    return newPost;
}

export async function toggleLikeCommunityPost(postId) {
    cachePosts = cachePosts.map((p) => {
        if (p.id === postId) {
            const isLiked = p.is_liked || false;
            return {
                ...p,
                is_liked: !isLiked,
                likes_count: isLiked ? Math.max(0, p.likes_count - 1) : p.likes_count + 1,
            };
        }
        return p;
    });
    return cachePosts.find((p) => p.id === postId);
}

// ============================================================================
// 9. INSTAGRAM AUTOMATION RULES CRUD
// ============================================================================
export async function getInstagramRules(workspaceId = "ws-rajnish-001") {
    const supabase = getSafeClient();
    if (supabase) {
        try {
            const { data, error } = await supabase
                .from("instagram_automations")
                .select("*")
                .order("created_at", { ascending: false });
            if (data && data.length > 0 && !error) return data;
        } catch (err) {
            console.warn("[DB] Supabase getInstagramRules fallback:", err);
        }
    }
    return cacheInstagramRules;
}

export async function createInstagramRule(workspaceId, ruleData) {
    const newRule = {
        id: `ig-rule-${Date.now()}`,
        workspace_id: workspaceId || "ws-rajnish-001",
        is_active: true,
        trigger_count: 0,
        created_at: new Date().toISOString(),
        ...ruleData,
    };
    const supabase = getSafeClient();
    if (supabase) {
        try {
            const { data, error } = await supabase
                .from("instagram_automations")
                .insert([newRule])
                .select()
                .single();
            if (data && !error) {
                cacheInstagramRules.unshift(data);
                return data;
            }
        } catch (err) {
            console.warn("[DB] Supabase createInstagramRule fallback:", err);
        }
    }
    cacheInstagramRules.unshift(newRule);
    return newRule;
}

export async function toggleInstagramRule(ruleId) {
    cacheInstagramRules = cacheInstagramRules.map((r) =>
        r.id === ruleId ? { ...r, is_active: !r.is_active } : r
    );
    const updated = cacheInstagramRules.find((r) => r.id === ruleId);
    const supabase = getSafeClient();
    if (supabase && updated) {
        try {
            await supabase
                .from("instagram_automations")
                .update({ is_active: updated.is_active })
                .eq("id", ruleId);
        } catch (err) {
            console.warn("[DB] Supabase toggleInstagramRule fallback:", err);
        }
    }
    return updated;
}

export async function deleteInstagramRule(ruleId) {
    cacheInstagramRules = cacheInstagramRules.filter((r) => r.id !== ruleId);
    const supabase = getSafeClient();
    if (supabase) {
        try {
            await supabase.from("instagram_automations").delete().eq("id", ruleId);
        } catch (err) {
            console.warn("[DB] Supabase deleteInstagramRule fallback:", err);
        }
    }
    return true;
}

// ============================================================================
// 10. ORDERS & REVENUE CRUD
// ============================================================================
export async function getOrders(workspaceId = "ws-rajnish-001") {
    const supabase = getSafeClient();
    if (supabase) {
        try {
            const { data, error } = await supabase
                .from("orders")
                .select("*")
                .order("created_at", { ascending: false });
            if (data && data.length > 0 && !error) return data;
        } catch (err) {
            console.warn("[DB] Supabase getOrders fallback:", err);
        }
    }
    return cacheOrders;
}

export async function createOrder(orderData) {
    const newOrder = {
        id: `ord-${Date.now()}`,
        status: "completed",
        created_at: new Date().toISOString(),
        ...orderData,
    };
    const supabase = getSafeClient();
    if (supabase) {
        try {
            const { data, error } = await supabase
                .from("orders")
                .insert([newOrder])
                .select()
                .single();
            if (data && !error) {
                cacheOrders.unshift(data);
                return data;
            }
        } catch (err) {
            console.warn("[DB] Supabase createOrder fallback:", err);
        }
    }
    cacheOrders.unshift(newOrder);
    return newOrder;
}
