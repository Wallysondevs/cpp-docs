# std::weibull_distribution

Definido no cabeçalho `[<random>](<#/doc/header/random>)`

```c
template< class RealType = double >
class weibull_distribution;
```

A `weibull_distribution` atende aos requisitos de uma [RandomNumberDistribution](<#/doc/named_req/RandomNumberDistribution>) e produz números aleatórios de acordo com a [distribuição de Weibull](<https://en.wikipedia.org/wiki/Weibull_distribution> "enwiki:Weibull distribution"):

    \\(\small{f(x;a,b)=\frac{a}{b}{(\frac{x}{b})}^{a-1}\exp{(-{(\frac{x}{b})}^{a})} }\\)f(x;a,b) = a
---
b
⎛
⎜
⎝x
---
b
⎞
⎟
⎠a-1
exp⎛
⎜
⎝-⎛
⎜
⎝x
---
b
⎞
⎟
⎠a
⎞
⎟
⎠

a é o [parâmetro de forma](<https://en.wikipedia.org/wiki/shape_parameter> "enwiki:shape parameter") e b o [parâmetro de escala](<https://en.wikipedia.org/wiki/scale_parameter> "enwiki:scale parameter").

[`std::weibull_distribution`](<#/doc/numeric/random/weibull_distribution>) satisfaz [RandomNumberDistribution](<#/doc/named_req/RandomNumberDistribution>).

### Parâmetros de template

- **RealType** — O tipo de resultado gerado pelo gerador. O efeito é indefinido se este não for um de float, double ou long double.

### Tipos de membro

Tipo de membro | Definição
---|---
`result_type` (C++11) | RealType
`param_type` (C++11) | o tipo do conjunto de parâmetros, veja [RandomNumberDistribution](<#/doc/named_req/RandomNumberDistribution>).

### Funções membro

[ (construtor)](<#/doc/numeric/random/weibull_distribution/weibull_distribution>)(C++11) | constrói uma nova distribuição
(função membro pública)
[ reset](<#/doc/numeric/random/weibull_distribution/reset>)(C++11) | redefine o estado interno da distribuição
(função membro pública)

##### Geração

[ operator()](<#/>)(C++11) | gera o próximo número aleatório na distribuição
(função membro pública)

##### Características

[ ab](<#/doc/numeric/random/weibull_distribution/params>)(C++11) | retorna os parâmetros da distribuição
(função membro pública)
[ param](<#/doc/numeric/random/weibull_distribution/param>)(C++11) | obtém ou define o objeto de parâmetro da distribuição
(função membro pública)
[ min](<#/doc/numeric/random/weibull_distribution/min>)(C++11) | retorna o valor mínimo potencialmente gerado
(função membro pública)
[ max](<#/doc/numeric/random/weibull_distribution/max>)(C++11) | retorna o valor máximo potencialmente gerado
(função membro pública)

### Funções não-membro

[ operator==operator!=](<#/doc/numeric/random/weibull_distribution/operator_cmp>)(C++11)(C++11)(removido em C++20) | compara dois objetos de distribuição
(função)
[ operator<&lt;operator&gt;>](<#/doc/numeric/random/weibull_distribution/operator_ltltgtgt>)(C++11) | realiza entrada e saída de stream em distribuição de números pseudoaleatórios
(modelo de função)

### Exemplo

Execute este código
```cpp
    #include <cmath>
    #include <iomanip>
    #include <iostream>
    #include <map>
    #include <random>
    #include <string>
    
    int main()
    {
        std::random_device rd;
        std::mt19937 gen(rd());
    
        std::weibull_distribution<> d;
    
        std::map<int, int> hist;
        for (int n = 0; n != 10000; ++n)
            ++hist[std::round(d(gen))];
    
        std::cout << std::fixed << std::setprecision(1) << std::hex;
        for (auto [x, y] : hist)
            std::cout << x << ' ' << std::string(y / 200, '*') << '\n';
    }
```

Saída possível:
```
    0 *******************
    1 *******************
    2 ******
    3 **
    4
    5
    6
    7
    8
```

### Links externos

1. | [Weisstein, Eric W. "Weibull Distribution."](<https://mathworld.wolfram.com/WeibullDistribution.html>) De MathWorld — Um Recurso Web da Wolfram.
---|---
2. | [Distribuição de Weibull](<https://en.wikipedia.org/wiki/Weibull_distribution> "enwiki:Weibull distribution") — Da Wikipédia.