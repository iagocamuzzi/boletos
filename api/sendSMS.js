import unirest from "unirest";

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { numero, mensagem } = req.body;

        // Configurando a requisição para a API do DisparoPRO
        const request = unirest("POST", "https://apihttp.disparopro.com.br:8433/mt");

        request.headers({
            "content-type": "application/json",
            "authorization": "Bearer 32c7568bbc8d079ea71d1dd1fa45a202dbcc20bb"
        });

        request.type("json");
        request.send([
            {
                "numero": numero,
                "servico": "short",
                "mensagem": mensagem,
                "parceiro_id": "5034e65a0c",
                "codificacao": "0"
            }
        ]);

        // Tratamento da resposta da API
        request.end(function (response) {
            if (response.error) {
                console.error(response.error);
                res.status(500).json({ message: 'Erro ao enviar SMS', error: response.error });
            } else {
                console.log(response.body);
                res.status(200).json({ message: 'SMS enviado com sucesso', data: response.body });
            }
        });
    } else {
        res.status(405).json({ message: 'Método não permitido' });
    }
}
