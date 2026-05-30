import Product from "../models/product.js";

export const getRecommendations = async (req, res) => {
    try {
        // In a real scenario, this would send data to a RapidMiner Server endpoint 
        // using axios to get predictive recommendations.
        // Simulated RapidMiner recommendation logic:
        const randomProducts = await Product.aggregate([{ $sample: { size: 4 } }]);
        
        const recommendations = randomProducts.map(p => ({
            _id: p._id,
            name: p.name,
            price: p.price,
            image: p.image,
            recommendationScore: (Math.random() * (0.99 - 0.75) + 0.75).toFixed(2) // Mock RapidMiner confidence score
        }));

        res.json(recommendations);
    } catch (error) {
        res.status(500).json({ message: "Failed to generate recommendations" });
    }
};