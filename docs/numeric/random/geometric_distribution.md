# std::geometric_distribution

Definido no header `[<random>](<#/doc/header/random>)`

```cpp
template< class IntType = int >
class geometric_distribution;  // (desde C++11)
```

Produz valores inteiros não negativos aleatórios i, distribuídos de acordo com a função de probabilidade discreta:

    \\(P(i|p) = p \cdot (1-p)^i\\)P(i|p) = p · (1 − p)i

O valor representa o número de falhas em uma série de tentativas independentes de sim/não (cada uma bem-sucedida com probabilidade p), antes que exatamente 1 sucesso ocorra.

`std::geometric_distribution<>(p)` é exatamente equivalente a [std::negative_binomial_distribution](<#/doc/numeric/random/negative_binomial_distribution>)<>(1, p). É também a contraparte discreta de [std::exponential_distribution](<#/doc/numeric/random/exponential_distribution>).

`std::geometric_distribution` satisfaz [RandomNumberDistribution](<#/doc/named_req/RandomNumberDistribution>).

### Parâmetros de template

- **IntType** — O tipo de resultado gerado pelo gerador. O efeito é indefinido se este não for um dos tipos short, int, long, long long, unsigned short, unsigned int, unsigned long, ou unsigned long long.

### Tipos de membro

Tipo de membro | Definição
---|---
`result_type` (C++11) | IntType
`param_type` (C++11) | o tipo do conjunto de parâmetros, veja [RandomNumberDistribution](<#/doc/named_req/RandomNumberDistribution>).

### Funções membro

[ (construtor)](<#/doc/numeric/random/geometric_distribution/geometric_distribution>)(C++11) | constrói uma nova distribuição
(função membro pública)
[ reset](<#/doc/numeric/random/geometric_distribution/reset>)(C++11) | reinicia o estado interno da distribuição
(função membro pública)

##### Geração

[ operator()](<#/>)(C++11) | gera o próximo número aleatório na distribuição
(função membro pública)

##### Características

[ p](<#/doc/numeric/random/geometric_distribution/p>)(C++11) | retorna o parâmetro _p_ da distribuição (probabilidade de uma tentativa gerar verdadeiro)
(função membro pública)
[ param](<#/doc/numeric/random/geometric_distribution/param>)(C++11) | obtém ou define o objeto de parâmetro da distribuição
(função membro pública)
[ min](<#/doc/numeric/random/geometric_distribution/min>)(C++11) | retorna o valor mínimo potencialmente gerado
(função membro pública)
[ max](<#/doc/numeric/random/geometric_distribution/max>)(C++11) | retorna o valor máximo potencialmente gerado
(função membro pública)

### Funções não-membro

[ operator==operator!=](<#/doc/numeric/random/geometric_distribution/operator_cmp>)(C++11)(C++11)(removido em C++20) | compara dois objetos de distribuição
(função)
[ operator<&lt;operator&gt;>](<#/doc/numeric/random/geometric_distribution/operator_ltltgtgt>)(C++11) | realiza entrada e saída de stream em distribuição de números pseudoaleatórios
(template de função)

### Exemplo

`std::geometric_distribution<>(0.5)` é o padrão e representa o número de lançamentos de moeda necessários para obter cara.

Execute este código
```cpp
    #include <iomanip>
    #include <iostream>
    #include <map>
    #include <random>
    #include <string>
    
    int main()
    {
        std::random_device rd;
        std::mt19937 gen(rd());
    
        std::geometric_distribution<> d;
            // same as 
            // std::negative_binomial_distribution<> d(1, 0.5):
    
        std::map<int, int> hist;
        for (int n = 0; n != 10000; ++n)
            ++hist[d(gen)];
    
        for (auto [x, y] : hist)
        {
            const char c = x < 10 ? x + '0' : x - 10 + 'a';
            std::cout << c << ' ' << std::string(y / 100, '*') << '\n';
        }
    }
```

Saída possível:
```
    0 *************************************************
    1 *************************
    2 ************
    3 ******
    4 **
    5 *
    6
    7
    8
    9
```

### Links externos

[Weisstein, Eric W. "Geometric Distribution."](<https://mathworld.wolfram.com/GeometricDistribution.html>) De MathWorld — Um Recurso Web da Wolfram.
---