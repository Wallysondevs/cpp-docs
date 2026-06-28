# std::uniform_int_distribution

Definido no cabeçalho `[<random>](<#/doc/header/random>)`

```c
template< class IntType = int >
class uniform_int_distribution;
```

Produz valores inteiros aleatórios \\(\small i\\)i, uniformemente distribuídos no intervalo fechado \\(\small[a, b]\\)[a, b], ou seja, distribuídos de acordo com a função de probabilidade discreta

    \\({\small P(i|a,b) =}\frac{1}{b - a + 1}\\)P(i|a,b) = 1
---
b − a + 1
.

`std::uniform_int_distribution` satisfaz todos os requisitos de [RandomNumberDistribution](<#/doc/named_req/RandomNumberDistribution>).

### Parâmetros de template

- **IntType** — O tipo de resultado gerado pelo gerador. O efeito é indefinido se este não for um dos tipos short, int, long, long long, unsigned short, unsigned int, unsigned long, ou unsigned long long.

### Tipos de membro

Tipo de membro | Definição
---|---
`result_type` (C++11) | IntType
`param_type` (C++11) | o tipo do conjunto de parâmetros, veja [RandomNumberDistribution](<#/doc/named_req/RandomNumberDistribution>).

### Funções membro

[ (construtor)](<#/doc/numeric/random/uniform_int_distribution/uniform_int_distribution>)(C++11) | constrói uma nova distribuição
(função membro pública)
[ reset](<#/doc/numeric/random/uniform_int_distribution/reset>)(C++11) | reinicia o estado interno da distribuição
(função membro pública)

##### Geração

[ operator()](<#/>)(C++11) | gera o próximo número aleatório na distribuição
(função membro pública)

##### Características

[ ab](<#/doc/numeric/random/uniform_int_distribution/params>)(C++11) | retorna os parâmetros da distribuição
(função membro pública)
[ param](<#/doc/numeric/random/uniform_int_distribution/param>)(C++11) | obtém ou define o objeto de parâmetro da distribuição
(função membro pública)
[ min](<#/doc/numeric/random/uniform_int_distribution/min>)(C++11) | retorna o valor mínimo potencialmente gerado
(função membro pública)
[ max](<#/doc/numeric/random/uniform_int_distribution/max>)(C++11) | retorna o valor máximo potencialmente gerado
(função membro pública)

### Funções não-membro

[ operator==operator!=](<#/doc/numeric/random/uniform_int_distribution/operator_cmp>)(C++11)(C++11)(removido em C++20) | compara dois objetos de distribuição
(função)
[ operator<&lt;operator&gt;>](<#/doc/numeric/random/uniform_int_distribution/operator_ltltgtgt>)(C++11) | realiza entrada e saída de stream em distribuição de números pseudoaleatórios
(modelo de função)

### Exemplo

Este programa simula o lançamento de [dados](<https://en.wikipedia.org/wiki/dice> "enwiki:dice") de 6 lados.

Execute este código
```cpp
    #include <iostream>
    #include <random>
    
    int main()
    {
        std::random_device rd;  // uma fonte de semente para o motor de números aleatórios
        std::mt19937 gen(rd()); // mersenne_twister_engine semeado com rd()
        std::uniform_int_distribution<> distrib(1, 6);
    
        // Usa distrib para transformar o unsigned int aleatório
        // gerado por gen em um int no intervalo [1, 6]
        for (int n = 0; n != 10; ++n)
            std::cout << distrib(gen) << ' ';
        std::cout << '\n';
    }
```

Saída possível:
```
    1 1 6 5 2 2 5 5 6 2
```