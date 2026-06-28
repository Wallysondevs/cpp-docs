# std::piecewise_constant_distribution

Definido no cabeçalho `[<random>](<#/doc/header/random>)`

```c
template< class RealType = double >
class piecewise_constant_distribution;
```

`std::piecewise_constant_distribution` produz números de ponto flutuante aleatórios, que são uniformemente distribuídos dentro de cada um dos vários subintervalos [bi, bi+1), cada um com seu próprio peso wi. O conjunto de limites de intervalo e o conjunto de pesos são os parâmetros desta distribuição.

A densidade de probabilidade para qualquer bi ≤ x <bi+1 é wi
---
S (bi+1 \- bi)
, onde S é a soma de todos os pesos.

[`std::piecewise_constant_distribution`](<#/doc/numeric/random/piecewise_constant_distribution>) satisfaz todos os requisitos de [RandomNumberDistribution](<#/doc/named_req/RandomNumberDistribution>).

### Parâmetros de template

RealType | \- | O tipo de resultado gerado pelo gerador. O efeito é indefinido se este não for um de float, double ou long double.

### Tipos de membro

Tipo de membro | Definição
---|---
`result_type` (C++11) | RealType
`param_type` (C++11) | o tipo do conjunto de parâmetros, veja [RandomNumberDistribution](<#/doc/named_req/RandomNumberDistribution>).

### Funções membro

[ (construtor)](<#/doc/numeric/random/piecewise_constant_distribution/piecewise_constant_distribution>)(C++11) | constrói uma nova distribuição
(função membro pública)
[ reset](<#/doc/numeric/random/piecewise_constant_distribution/reset>)(C++11) | reinicia o estado interno da distribuição
(função membro pública)

##### Geração

[ operator()](<#/>)(C++11) | gera o próximo número aleatório na distribuição
(função membro pública)

##### Características

[ intervalsdensities](<#/doc/numeric/random/piecewise_constant_distribution/params>) | retorna os parâmetros da distribuição
(função membro pública)
[ param](<#/doc/numeric/random/piecewise_constant_distribution/param>)(C++11) | obtém ou define o objeto de parâmetro da distribuição
(função membro pública)
[ min](<#/doc/numeric/random/piecewise_constant_distribution/min>)(C++11) | retorna o valor mínimo potencialmente gerado
(função membro pública)
[ max](<#/doc/numeric/random/piecewise_constant_distribution/max>)(C++11) | retorna o valor máximo potencialmente gerado
(função membro pública)

### Funções não-membro

[ operator==operator!=](<#/doc/numeric/random/piecewise_constant_distribution/operator_cmp>)(C++11)(C++11)(removido em C++20) | compara dois objetos de distribuição
(função)
[ operator<&lt;operator&gt;>](<#/doc/numeric/random/piecewise_constant_distribution/operator_ltltgtgt>)(C++11) | realiza entrada e saída de stream em distribuição de números pseudoaleatórios
(modelo de função)

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <map>
    #include <random>
    #include <string>
    
    int main()
    {
        std::random_device rd;
        std::mt19937 gen(rd());
        // 50% of the time, generate a random number between 0 and 1
        // 50% of the time, generate a random number between 10 and 15
        std::vector<double> i {0, 1, 10, 15};
        std::vector<double> w {1, 0, 1};
        std::piecewise_constant_distribution<> d(i.begin(), i.end(), w.begin());
    
        std::map<int, int> hist;
        for (int n {}; n < 1e4; ++n)
            ++hist[d(gen)];
    
        for (std::cout << std::hex << std::uppercase; auto [x, y] : hist)
            std::cout << x << ' ' << std::string(y / 100, '*') << '\n';
    }
```

Saída possível:
```
    0 **************************************************
    A **********
    B *********
    C *********
    D **********
    E *********
```

### Referências

  * Padrão C++23 (ISO/IEC 14882:2024):

    

  * 28.5.9.6.2 Class template piecewise_constant_distribution [rand.dist.samp.pconst] (p: 1421-1422)

  * Padrão C++20 (ISO/IEC 14882:2020):

    

  * 29.6.9.6.2 Class template piecewise_constant_distribution [rand.dist.samp.pconst] (p: 1207-1208)

  * Padrão C++17 (ISO/IEC 14882:2017):

    

  * 29.6.8.6.2 Class template piecewise_constant_distribution [rand.dist.samp.pconst] (p: 1098-1100)

  * Padrão C++14 (ISO/IEC 14882:2014):

    

  * 26.5.8.6.2 Class template piecewise_constant_distribution [rand.dist.samp.pconst] (p: 962-964)

  * Padrão C++11 (ISO/IEC 14882:2011):

    

  * 26.5.8.6.2 Class template piecewise_constant_distribution [rand.dist.samp.pconst] (p: 955-957)
