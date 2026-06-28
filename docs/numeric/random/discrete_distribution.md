# std::discrete_distribution

Definido no cabeçalho `[<random>](<#/doc/header/random>)`

```c
template< class IntType = int >
class discrete_distribution;
```

`std::discrete_distribution` produz inteiros aleatórios no intervalo `[`​0​`, `n`)`, onde a probabilidade de cada inteiro individual `i` é definida como wi/S, ou seja, o _peso_ do `i`-ésimo inteiro dividido pela soma de todos os `n` pesos.

`std::discrete_distribution` satisfaz todos os requisitos de [RandomNumberDistribution](<#/doc/named_req/RandomNumberDistribution>).

### Parâmetros de template

- **IntType** — O tipo de resultado gerado pelo gerador. O efeito é indefinido se este não for um dos tipos short, int, long, long long, unsigned short, unsigned int, unsigned long, ou unsigned long long.

### Tipos de membro

Tipo de membro | Definição
---|---
`result_type` (C++11) | IntType
`param_type` (C++11) | o tipo do conjunto de parâmetros, veja [RandomNumberDistribution](<#/doc/named_req/RandomNumberDistribution>).

### Funções membro

[ (construtor)](<#/doc/numeric/random/discrete_distribution/discrete_distribution>)(C++11) | constrói uma nova distribuição
(função membro pública)
[ reset](<#/doc/numeric/random/discrete_distribution/reset>)(C++11) | redefine o estado interno da distribuição
(função membro pública)

##### Geração

[ operator()](<#/>)(C++11) | gera o próximo número aleatório na distribuição
(função membro pública)

##### Características

[ probabilities](<#/doc/numeric/random/discrete_distribution/probabilities>) | obtém a lista de probabilidades
(função membro pública)
[ param](<#/doc/numeric/random/discrete_distribution/param>)(C++11) | obtém ou define o objeto de parâmetro da distribuição
(função membro pública)
[ min](<#/doc/numeric/random/discrete_distribution/min>)(C++11) | retorna o valor mínimo potencialmente gerado
(função membro pública)
[ max](<#/doc/numeric/random/discrete_distribution/max>)(C++11) | retorna o valor máximo potencialmente gerado
(função membro pública)

### Funções não-membro

[ operator==operator!=](<#/doc/numeric/random/discrete_distribution/operator_cmp>)(C++11)(C++11)(removido em C++20) | compara dois objetos de distribuição
(função)
[ operator<&lt;operator&gt;>](<#/doc/numeric/random/discrete_distribution/operator_ltltgtgt>)(C++11) | realiza entrada e saída de stream em distribuição de números pseudoaleatórios
(modelo de função)

### Exemplo

Execute este código
```cpp
    #include <iomanip>
    #include <iostream>
    #include <map>
    #include <random>
    
    int main()
    {
        std::random_device rd;
        std::mt19937 gen(rd());
        std::discrete_distribution<> d({40, 10, 10, 40});
        std::map<int, int> map;
    
        for (int n = 0; n < 1e4; ++n)
            ++map[d(gen)];
    
        for (const auto& [num, count] : map)
            std::cout << num << " generated " << std::setw(4) << count << " times\n";
    }
```

Saída possível:
```
    0 generated 4037 times
    1 generated  962 times
    2 generated 1030 times
    3 generated 3971 times
```