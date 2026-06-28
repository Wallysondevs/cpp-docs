# std::normal_distribution

Definido no cabeçalho `[<random>](<#/doc/header/random>)`

```c
template< class RealType = double >
class normal_distribution;
```

Gera números aleatórios de acordo com a [distribuição de números aleatórios Normal (ou Gaussiana)](<https://en.wikipedia.org/wiki/Normal_distribution> "enwiki:Normal distribution"). É definida como:

     \\(\small{f(x;\mu,\sigma)}=\frac{1}{\sigma\sqrt{2\pi} }\exp{(-\frac{1}{2}{(\frac{x-\mu}{\sigma})}^2)}\\)f(x; μ,σ) = 1
---
σ√2π
exp⎛
⎜
⎝-1
---
2
⎛
⎜
⎝x-μ
---
σ
⎞
⎟
⎠2
⎞
⎟
⎠

Aqui \\(\small\mu\\)μ é a [Média](<https://en.wikipedia.org/wiki/Mean> "enwiki:Mean") e \\(\small\sigma\\)σ é o [Desvio padrão](<https://en.wikipedia.org/wiki/Standard_deviation> "enwiki:Standard deviation") (_stddev_).

[`std::normal_distribution`](<#/doc/numeric/random/normal_distribution>) satisfaz todos os requisitos de [RandomNumberDistribution](<#/doc/named_req/RandomNumberDistribution>).

### Parâmetros de template

- **RealType** — O tipo de resultado gerado pelo gerador. O efeito é indefinido se este não for um dos tipos float, double ou long double.

### Tipos de membro

Tipo de membro | Definição
---|---
`result_type` (C++11) | RealType
`param_type` (C++11) | o tipo do conjunto de parâmetros, veja [RandomNumberDistribution](<#/doc/named_req/RandomNumberDistribution>).

### Funções membro

[ (construtor)](<#/doc/numeric/random/normal_distribution/normal_distribution>)(desde C++11) | constrói uma nova distribuição
(função membro pública)
[ reset](<#/doc/numeric/random/normal_distribution/reset>)(desde C++11) | reinicia o estado interno da distribuição
(função membro pública)

##### Geração

[ operator()](<#/>)(desde C++11) | gera o próximo número aleatório na distribuição
(função membro pública)

##### Características

[ meanstddev](<#/doc/numeric/random/normal_distribution/params>)(desde C++11) | retorna os parâmetros da distribuição
(função membro pública)
[ param](<#/doc/numeric/random/normal_distribution/param>)(desde C++11) | obtém ou define o objeto de parâmetro da distribuição
(função membro pública)
[ min](<#/doc/numeric/random/normal_distribution/min>)(desde C++11) | retorna o valor mínimo potencialmente gerado
(função membro pública)
[ max](<#/doc/numeric/random/normal_distribution/max>)(desde C++11) | retorna o valor máximo potencialmente gerado
(função membro pública)

### Funções não-membro

[ operator==operator!=](<#/doc/numeric/random/normal_distribution/operator_cmp>)(desde C++11)(desde C++11)(removido em C++20) | compara dois objetos de distribuição
(função)
[ operator<&lt;operator&gt;>](<#/doc/numeric/random/normal_distribution/operator_ltltgtgt>)(desde C++11) | realiza entrada e saída de stream em distribuição de números pseudoaleatórios
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
        std::random_device rd{};
        std::mt19937 gen{rd()};
    
        // Values near the mean are the most likely. Standard deviation
        // affects the dispersion of generated values from the mean.
        std::normal_distribution d{5.0, 2.0};
    
        // Draw a sample from the normal distribution and round it to an integer.
        auto random_int = [&d, &gen]{ return std::lround(d(gen)); };
    
        std::map<long, unsigned> histogram{};
        for (auto n{10000}; n; --n)
            ++histogram[random_int()];
    
        for (const auto [k, v] : histogram)
            std::cout << std::setw(2) << k << ' ' << std::string(v / 200, '*') << '\n';
    }
```

Saída possível:
```
    -1
     0
     1 *
     2 ***
     3 *****
     4 ********
     5 *********
     6 *********
     7 ******
     8 ***
     9 *
    10
    11
```

### Links externos

1. | [Weisstein, Eric W. "Normal Distribution."](<https://mathworld.wolfram.com/NormalDistribution.html>) De MathWorld — Um Recurso Web da Wolfram.
---|---
2. | [Distribuição normal](<https://en.wikipedia.org/wiki/Normal_distribution> "enwiki:Normal distribution") — Da Wikipédia.