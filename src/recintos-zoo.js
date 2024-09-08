class RecintosZoo {
    analisaRecintos(animal, quantidade) {
        const animaisDisponiveis = {
            "LEAO":{tamanho:3, biomaAdequado:["savana"]},
            "LEOPARDO":{tamanho:2,biomaAdequado:["savana"]},
            "CROCODILO":{tamanho:3,biomaAdequado:["rio"]},
            "MACACO":{tamanho:1, biomaAdequado:["savana","floresta"]},
            "GAZELA":{tamanho:2,biomaAdequado:["savana"]},
            "HIPOPOTAMO":{tamanho:4, biomaAdequado:["savana","rio"]}
        }
    
        const recintos = [
            {numero: 1, bioma: "savana", tamanhoTotal:10, animaisExistentes:[{especie:"MACACO", quantidade:3}] },
            {numero: 2, bioma: "floresta", tamanhoTotal:5, animaisExistentes:[] },
            {numero: 3, bioma: "savana e rio", tamanhoTotal:7, animaisExistentes:[{especie:"GAZELA", quantidade:1}] },
            {numero: 4, bioma: "rio", tamanhoTotal:8, animaisExistentes:[] },
            {numero: 5, bioma: "savana", tamanhoTotal:9, animaisExistentes:[{especie:"LEAO", quantidade:1}] }
        ];
        if(!this.animaisDisponiveis[animal]) return "Animal inválido";

        if(quantidade !== 'number'|| quantidade <=0) return "Quantidade inválida";

        const {tamanho: tamanho, bioma: biomaAdequado} = this.animaisDisponiveis[animal];
        const tamanhoTotalNecessário = quantidade * tamanho;
        const recintosViaveis = [];

        for(const recinto of recintos){
            const biomaRecinto = recinto.bioma;
            const animaisExistentes = recinto.animaisExistentes;
            const tamanhoTotal = recinto.tamanhoTotal;

            const biomaAdequado = biomasAdequdos.some(bioma => biomaRecinto.includes(bioma));
            if (!biomaAdequado) continue;

            let tamanhoOcupado = 0;
            let especiesDiferentes = false;
            let carnivoros = false;

            for(const {especie, quantidade: quantidadeExistente} of animaisExistentes) {
                const {tamanho: tamanhoEspecie} = this.animaisDisponiveis[especie];
                tamanhoOcupado += tamanhoEspecie * quantidadeExistente;
                if(["LEAO","CROCODILO","LEOPARDO"].includes(especie)) {
                    carnivoros = true;
                }
                if(especie !== animal){
                    especiesDiferentes = true;
                }
            }

            if(especiesDiferentes) {
                tamanhoOcupado += 1;
            }

            if(carnivoros && !["LEAO","CROCODILO","LEOPARDO"].includes(animal)) continue;

            if(["LEAO","CROCODILO","LEOPARDO"].includes(animal) && especiesDiferentes) continue;

            if(animal === "HIPOPOTAMO" && especiesDiferentes && biomaRecinto !== "savana e rio") continue;

            const espacoDisponivel = tamanhoTotal - tamanhoOcupado;

            if(espacoDisponivel >= tamanhoTotal){
                recintosViaveis.push(`Recinto numero ${recinto.numero} (espaço livre: ${espacoDisponivel - tamanhoTotalNecessário}) total: ${tamanhoTotal}`);
            }
        }

        if(recintosViaveis.length == 0) return "Não há recinto viável";

        recintosViaveis.sort((a,b)=> a.numero - b.numero);
        return recintosViaveis;

    }

}

export { RecintosZoo as RecintosZoo };
