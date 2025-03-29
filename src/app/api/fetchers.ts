export async function getTransactions() {
    try {
        const res = await fetch("https://mocki.io/v1/20750350-0eb9-4985-a2cf-49cab293cb2d", {
            next: { revalidate: 3600 },
        });

        if (!res.ok) {
            throw new Error("Error al obtener las transacciones");
        }

        const data = await res.json();
        return data; 
    } catch (error) {
        console.error("Error fetching transactions:", error);
        return null; // Retorna null en caso de error
    }
}



