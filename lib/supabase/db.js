import { createClient } from "./client";
import {
    initialWorkspace,
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

// ============================================================================
// 1. WORKSPACES & PROFILES CRUD
// ============================================================================
export async function getWorkspace(username = "rajnish") {
    const supabase = getSafeClient();
    if (supabase) {
        try {
            const { data, error } = await supabase
                .from("creator_workspaces")
                .select("*")
                .eq("username", username)
                .single();
            if (data && !error) return data;
        } catch (err) {
            console.warn("[DB] Supabase getWorkspace fallback:", err);
        }
    }
    return cacheWorkspace;
}

export async function updateWorkspace(workspaceId, updates) {
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
    cacheWorkspace = { ...cacheWorkspace, ...updates };
    return cacheWorkspace;
}

// ============================================================================
// 2. STORE BLOCKS CRUD (Link-in-Bio Customizer)
// ============================================================================
export async function getStoreBlocks(workspaceId = "ws-rajnish-001") {
    const supabase = getSafeClient();
    if (supabase) {
        try {
            const { data, error } = await supabase
                .from("store_blocks")
                .select("*")
                .order("order_index", { ascending: true });
            if (data && data.length > 0 && !error) return data;
        } catch (err) {
            console.warn("[DB] Supabase getStoreBlocks fallback:", err);
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
    const supabase = getSafeClient();
    if (supabase) {
        try {
            const { data, error } = await supabase
                .from("store_blocks")
                .insert([newBlock])
                .select()
                .single();
            if (data && !error) {
                cacheStoreBlocks.push(data);
                return data;
            }
        } catch (err) {
            console.warn("[DB] Supabase addStoreBlock fallback:", err);
        }
    }
    cacheStoreBlocks.push(newBlock);
    return newBlock;
}

export async function updateStoreBlock(blockId, updates) {
    const supabase = getSafeClient();
    if (supabase) {
        try {
            const { data, error } = await supabase
                .from("store_blocks")
                .update(updates)
                .eq("id", blockId)
                .select()
                .single();
            if (data && !error) {
                cacheStoreBlocks = cacheStoreBlocks.map((b) => (b.id === blockId ? { ...b, ...data } : b));
                return data;
            }
        } catch (err) {
            console.warn("[DB] Supabase updateStoreBlock fallback:", err);
        }
    }
    cacheStoreBlocks = cacheStoreBlocks.map((b) => (b.id === blockId ? { ...b, ...updates } : b));
    return cacheStoreBlocks.find((b) => b.id === blockId);
}

export async function deleteStoreBlock(blockId) {
    const supabase = getSafeClient();
    if (supabase) {
        try {
            await supabase.from("store_blocks").delete().eq("id", blockId);
        } catch (err) {
            console.warn("[DB] Supabase deleteStoreBlock fallback:", err);
        }
    }
    cacheStoreBlocks = cacheStoreBlocks.filter((b) => b.id !== blockId);
    return true;
}

export async function reorderStoreBlocks(workspaceId, orderedBlocks) {
    cacheStoreBlocks = [...orderedBlocks];
    const supabase = getSafeClient();
    if (supabase) {
        try {
            for (let i = 0; i < orderedBlocks.length; i++) {
                await supabase
                    .from("store_blocks")
                    .update({ order_index: i })
                    .eq("id", orderedBlocks[i].id);
            }
        } catch (err) {
            console.warn("[DB] Supabase reorderStoreBlocks fallback:", err);
        }
    }
    return cacheStoreBlocks;
}

// ============================================================================
// 3. DIGITAL PRODUCTS CRUD
// ============================================================================
export async function getProducts(workspaceId = "ws-rajnish-001") {
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
