import product from './product.json';

export default function handler(req, res) {
    if (req.method === 'GET') {
        //CREATE A COPY OF PRODUCTS WITHOUT THE HASHES AND FILENAMES
        const productNoHashes = product.map(product => {
            const { hash, filename, ...rest } = product;
            return rest;
        });

        res.status(200).json(productNoHashes)
    } else {
        res.status(405).send(`Method ${req.method} not allowed`);
    }
}