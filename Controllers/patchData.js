const {
    db,
    bucket
} = require('../Services/firebase')

const patchData = (collectionName) => {
    return async (req, res) => {
        const dataId = req.params.id;

        try {
            const modification = req.body;

            const docRef = db.collection(collectionName).doc(dataId);
            const doc = await docRef.get();

            if (!doc.exists) {
                return res.status(404).send(`${collectionName} não encontrado`);
            }

            const oldData = doc.data();
            const oldImageUrls = oldData.images || [];
            const updates = {};

            // Atualiza os campos que foram enviados no corpo da requisição
            for (const key in modification) {
                if (modification[key] !== undefined) {
                    updates[key] = modification[key];
                }
            }

            // Lógica para substituir, adicionar ou deletar uma imagem
            if (modification.index !== undefined) {
                const indexToModify = modification.index;

                if (indexToModify < 0 || indexToModify >= oldImageUrls.length) {
                    return res.status(400).send('Índice da imagem inválido');
                }

                const oldImageUrl = oldImageUrls[indexToModify]; // URL da imagem antiga

                // Se for para deletar
                if (modification.action === 'delete') {
                    // Verifica se a imagem é do bucket do Firebase
                    if (oldImageUrl.includes('storage.googleapis.com')) {
                        const oldFileName = oldImageUrl.split('/').pop();
                        const oldFile = bucket.file(oldFileName);
                        await oldFile.delete(); // Deleta o arquivo do Storage
                        console.log(`Imagem deletada: ${oldFileName}`);
                    } else {
                        console.log('Imagem externa, não deletar do Firebase');
                    }

                    // Remove a imagem do array
                    oldImageUrls.splice(indexToModify, 1);
                } else {
                    // Se for para substituir
                    const newImageUrl = modification.images[0];

                    // Se for uma substituição, deletamos a antiga primeiro
                    if (oldImageUrl.includes('storage.googleapis.com')) {
                        const oldFileName = oldImageUrl.split('/').pop();
                        const oldFile = bucket.file(oldFileName);
                        await oldFile.delete(); // Deleta a imagem antiga do Storage
                        console.log(`Imagem antiga deletada: ${oldFileName}`);
                    }

                    oldImageUrls[indexToModify] = newImageUrl; // Substitui a URL da imagem
                }
            } else if (modification.images) {
                // Adiciona nova imagem ao array
                const newImageUrl = modification.images[0];
                oldImageUrls.push(newImageUrl); // Adiciona ao array existente
            }

            // Remover o campo 'action' antes de salvar no Firestore
            delete updates.action; // Garante que 'action' não seja salvo

            // Atualiza no Firestore
            updates.images = oldImageUrls; // Atualiza o array de imagens
            await docRef.update(updates);

            res.status(200).send(`${collectionName} com o ID ${dataId} atualizado com sucesso`);
        } catch (error) {
            console.error(error);
            res.status(500).send(`Erro ao editar ${collectionName} com ID ${dataId}: ${error.message}`);
        }
    }
}

module.exports = patchData