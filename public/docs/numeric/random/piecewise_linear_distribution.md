# std::piecewise_linear_distribution

Definido no cabeçalho `[<random>](<#/doc/header/random>)`

```c
template< class RealType = double >
class piecewise_linear_distribution;
```

`std::piecewise_linear_distribution` produz números de ponto flutuante aleatórios, que são distribuídos de acordo com uma função de densidade de probabilidade linear dentro de cada um dos vários subintervalos \\(\small{[b_i, b_{i+1})}\\)[bi, bi+1). A distribuição é tal que a densidade de probabilidade em cada limite de intervalo é exatamente o valor predefinido \\(\small{p_i}\\)pi.

A densidade de probabilidade para qualquer \\(\small{ b_i \le x < b_{i+1} }\\)bi≤x<bi+1 é \\(\small{p_i\frac{b_{i+1}-x}{b_{i+1}-b_i} + p_{i+1}\frac{x-b_i}{b_{i+1}-b_i} }\\)pibi+1-x
---
bi+1-bi
\+ pi+1x-bi
---
bi+1-bi
, onde as densidades de probabilidade nos limites do intervalo \\(\small{p_k}\\)pk são calculadas como \\(\small{w_k/S}\\)wk/S onde \\(\small{S}\\)S é a soma de todos os \\(\small{\frac{1}{2}(w_k + w_{k+1})(b_{k+1} - b_k)}\\)1
---
2
(wk+wk+1)(bk+1−bk).

O conjunto de limites de intervalo \\(\small{b_i}\\)bi e o conjunto de pesos nos limites \\(\small{w_i}\\)wi são os parâmetros desta distribuição.

[`std::piecewise_linear_distribution`](<#/doc/numeric/random/piecewise_linear_distribution>) satisfaz todos os requisitos de [RandomNumberDistribution](<#/doc/named_req/RandomNumberDistribution>).

### Parâmetros de template

- **RealType** — O tipo de resultado gerado pelo gerador. O efeito é indefinido se este não for um de float, double ou long double.

### Tipos de membro

Tipo de membro | Definição
---|---
`result_type` (C++11) | RealType
`param_type` (C++11) | o tipo do conjunto de parâmetros, veja [RandomNumberDistribution](<#/doc/named_req/RandomNumberDistribution>).

### Funções membro

[ (construtor)](<#/doc/numeric/random/piecewise_linear_distribution/piecewise_linear_distribution>)(C++11) | constrói uma nova distribuição
(função membro pública)
[ reset](<#/doc/numeric/random/piecewise_linear_distribution/reset>)(C++11) | reinicia o estado interno da distribuição
(função membro pública)

##### Geração

[ operator()](<#/>)(C++11) | gera o próximo número aleatório na distribuição
(função membro pública)

##### Características

[ intervalsdensities](<#/doc/numeric/random/piecewise_linear_distribution/params>)(C++11) | retorna os parâmetros da distribuição
(função membro pública)
[ param](<#/doc/numeric/random/piecewise_linear_distribution/param>)(C++11) | obtém ou define o objeto de parâmetro da distribuição
(função membro pública)
[ min](<#/doc/numeric/random/piecewise_linear_distribution/min>)(C++11) | retorna o valor mínimo potencialmente gerado
(função membro pública)
[ max](<#/doc/numeric/random/piecewise_linear_distribution/max>)(C++11) | retorna o valor máximo potencialmente gerado
(função membro pública)

### Funções não-membro

[ operator==operator!=](<#/doc/numeric/random/piecewise_linear_distribution/operator_cmp>)(C++11)(C++11)(removido em C++20) | compara dois objetos de distribuição
(função)
[ operator<&lt;operator&gt;>](<#/doc/numeric/random/piecewise_linear_distribution/operator_ltltgtgt>)(C++11) | realiza entrada e saída de stream em distribuição de números pseudoaleatórios
(template de função)

### Exemplo

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
        std::mt19937 gen{rd()};
        // increase the probability from 0 to 5
        // remain flat from 5 to 10
        // decrease from 10 to 15 at the same rate
        std::vector<double> i{0, 5, 10, 15};
        std::vector<double> w{0, 1, 1, 0};
        std::piecewise_linear_distribution<> d{i.begin(), i.end(), w.begin()};
    
        std::map<int, int> hist;
        for (int n{}; n < 1e4; ++n)
            ++hist[d(gen)];
    
        for (auto [x, y] : hist)
            std::cout << std::setw(2) << std::setfill('0') << x
                      << ' ' << std::string(y / 100, '*') << '\n';
    }
```

Saída possível:
```
    00 *
    01 ***
    02 ****
    03 ******
    04 *********
    05 *********
    06 *********
    07 **********
    08 *********
    09 **********
    10 *********
    11 *******
    12 ****
    13 ***
    14 *
```