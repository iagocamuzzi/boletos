export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { numero, mensagem } = req.body;
        try {
            const response = await fetch('https://apihttp.disparopro.com.br:8433/mt', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer 32c7568bbc8d079ea71d1dd1fa45a202dbcc20bb`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify([
                    {
                        numero,
                        servico: "short",
                        mensagem,
                        parceiro_id: "5034e65a0c",
                        codificacao: "0"
                    }
                ])
            });

            if (response.ok) {
                const data = await response.json();
                res.status(200).json({ message: 'SMS enviado com sucesso', data });
            } else {
                const errorData = await response.json();
                res.status(response.status).json({ message: 'Erro ao enviar SMS', errorData });
            }
        } catch (error) {
            res.status(500).json({ message: 'Erro no servidor', error });
        }
    } else {
        res.status(405).json({ message: 'Método não permitido' });
    }
}
