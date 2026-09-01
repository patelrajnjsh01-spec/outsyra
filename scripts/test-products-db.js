import { getDbProducts, createDbProduct, updateDbProduct, deleteDbProduct, getDbProductById } from "../lib/services/products-db.js";

async function runTests() {
    console.log("=== Testing PostgreSQL / Persistent Products Database Service ===");

    // 1. Fetch initial products
    const initial = await getDbProducts("ws-rajnish-001");
    console.log(`✓ Fetched initial products count: ${initial.length}`);

    // 2. Create a new digital product
    const testProduct = await createDbProduct("ws-rajnish-001", {
        name: "Test Automated Course & Asset",
        description: "A test digital product created to verify database persistence and image upload support.",
        price: 49.99,
        currency: "USD",
        category: "template",
        cover_image: "/uploads/test-cover-image.png",
        file_name: "test-asset.zip",
        file_size: 5242880,
        file_url: "/uploads/test-asset.zip",
    });
    console.log(`✓ Created test product with ID: ${testProduct.id}, Title: "${testProduct.name}"`);

    // 3. Fetch the created product by ID
    const fetched = await getDbProductById(testProduct.id);
    if (!fetched || fetched.name !== "Test Automated Course & Asset") {
        throw new Error("Failed to retrieve created product by ID");
    }
    console.log(`✓ Verified getDbProductById for ${fetched.id}`);

    // 4. Update the product
    const updated = await updateDbProduct(testProduct.id, {
        price: 59.99,
        name: "Updated Test Digital Product",
    });
    if (updated.price !== 59.99 || updated.name !== "Updated Test Digital Product") {
        throw new Error("Product update did not reflect updated price/name");
    }
    console.log(`✓ Updated test product: new price $${updated.price}`);

    // 5. Delete the test product
    await deleteDbProduct(testProduct.id);
    const postDelete = await getDbProductById(testProduct.id);
    if (postDelete) {
        throw new Error("Product still exists after deletion");
    }
    console.log(`✓ Deleted test product successfully`);

    console.log("\n=== ALL DATABASE TESTS PASSED! ===");
}

runTests().catch((err) => {
    console.error("Test failed:", err);
    process.exit(1);
});
