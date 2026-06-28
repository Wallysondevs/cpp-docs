# std::extreme_value_distribution

Definido no cabeçalho `[<random>](<#/doc/header/random>)`

```c
template< class RealType = double >
class extreme_value_distribution;
```

Produz números aleatórios de acordo com a [distribuição de valores extremos generalizada](<https://en.wikipedia.org/wiki/Generalized_extreme_value_distribution> "enwiki:Generalized extreme value distribution") (também conhecida como Gumbel Tipo I, log-Weibull, Fisher-Tippett Tipo I):

    \\({\small p(x;a,b) = \frac{1}{b} \exp{(\frac{a-x}{b}-\exp{(\frac{a-x}{b})})} }\\)p(x;a,b) = 1
---
b
exp⎛
⎜
⎝a-x
---
b
\- exp⎛
⎜
⎝a-x
---
b
⎞
⎟
⎠⎞
⎟
⎠

`std::extreme_value_distribution` satisfaz todos os requisitos de [RandomNumberDistribution](<#/doc/named_req/RandomNumberDistribution>).

### Parâmetros de template

- **RealType** — O tipo de resultado gerado pelo gerador. O efeito é indefinido se este não for um dos tipos float, double ou long double.

### Tipos de membros

Tipo de membro | Definição
---|---
`result_type` (C++11) | RealType
`param_type` (C++11) | o tipo do conjunto de parâmetros, veja [RandomNumberDistribution](<#/doc/named_req/RandomNumberDistribution>).

### Funções membro

[ (construtor)](<#/doc/numeric/random/extreme_value_distribution/extreme_value_distribution>)(C++11) | constrói uma nova distribuição
(função membro pública)
[ reset](<#/doc/numeric/random/extreme_value_distribution/reset>)(C++11) | redefine o estado interno da distribuição
(função membro pública)

##### Geração

[ operator()](<#/>)(C++11) | gera o próximo número aleatório na distribuição
(função membro pública)

##### Características

[ ab](<#/doc/numeric/random/extreme_value_distribution/params>)(C++11) | retorna os parâmetros da distribuição
(função membro pública)
[ param](<#/doc/numeric/random/extreme_value_distribution/param>)(C++11) | obtém ou define o objeto de parâmetro da distribuição
(função membro pública)
[ min](<#/doc/numeric/random/extreme_value_distribution/min>)(C++11) | retorna o valor mínimo potencialmente gerado
(função membro pública)
[ max](<#/doc/numeric/random/extreme_value_distribution/max>)(C++11) | retorna o valor máximo potencialmente gerado
(função membro pública)

### Funções não-membro

[ operator==operator!=](<#/doc/numeric/random/extreme_value_distribution/operator_cmp>)(C++11)(C++11)(removido em C++20) | compara dois objetos de distribuição
(função)
[ operator<&lt;operator&gt;>](<#/doc/numeric/random/extreme_value_distribution/operator_ltltgtgt>)(C++11) | realiza entrada e saída de stream em distribuição de números pseudoaleatórios
(modelo de função)

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <cmath>
    #include <iomanip>
    #include <iostream>
    #include <map>
    #include <random>
    #include <vector>
    
    template<int Height = 5, int BarWidth = 1, int Padding = 1, int Offset = 0, class Seq>
    void draw_vbars(Seq&& s, const bool DrawMinMax = true)
    {
        static_assert(0 < Height and 0 < BarWidth and 0 <= Padding and 0 <= Offset);
    
        auto cout_n = 
        {
            while (n-- > 0)
                std::cout << v;
        };
    
        const auto [min, max] = std::minmax_element(std::cbegin(s), std::cend(s));
    
        std::vector<std::div_t> qr;
        for (typedef decltype(*std::cbegin(s)) V; V e : s)
            qr.push_back(std::div(std::lerp(V(0), 8 * Height,
                                            (e - *min) / (*max - *min)), 8));
    
        for (auto h{Height}; h-- > 0; cout_n('\n'))
        {
            cout_n(' ', Offset);
    
            for (auto dv : qr)
            {
                const auto q{dv.quot}, r{dv.rem};
                unsigned char d[]{0xe2, 0x96, 0x88, 0}; // Full Block: '█'
                q < h ? d[0] = ' ', d[1] = 0 : q == h ? d[2] -= (7 - r) : 0;
                cout_n(d, BarWidth), cout_n(' ', Padding);
            }
    
            if (DrawMinMax && Height > 1)
                Height - 1 == h ? std::cout << "┬ " << *max:
                              h ? std::cout << "│ "
                                : std::cout << "┴ " << *min;
        }
    }
    
    int main()
    {
        std::random_device rd{};
        std::mt19937 gen{rd()};
    
        std::extreme_value_distribution<> d{-1.618f, 1.618f};
    
        const int norm = 10'000;
        const float cutoff = 0.000'3f;
    
        std::map<int, int> hist{};
        for (int n = 0; n != norm; ++n)
            ++hist[std::round(d(gen))];
    
        std::vector<float> bars;
        std::vector<int> indices;
        for (const auto& [n, p] : hist)
            if (const float x = p * (1.0f / norm); x > cutoff)
            {
                bars.push_back(x);
                indices.push_back(n);
            }
    
        draw_vbars<8,4>(bars);
    
        for (int n : indices)
            std::cout << ' ' << std::setw(2) << n << "  ";
        std::cout << '\n';
    }
```

Saída possível:
```
                   ████ ▅▅▅▅                                                        ┬ 0.2186
                   ████ ████                                                        │
              ▁▁▁▁ ████ ████ ▇▇▇▇                                                   │
              ████ ████ ████ ████                                                   │
              ████ ████ ████ ████ ▆▆▆▆                                              │
              ████ ████ ████ ████ ████ ▁▁▁▁                                         │
         ▄▄▄▄ ████ ████ ████ ████ ████ ████ ▃▃▃▃                                    │
    ▁▁▁▁ ████ ████ ████ ████ ████ ████ ████ ████ ▆▆▆▆ ▃▃▃▃ ▂▂▂▂ ▁▁▁▁ ▁▁▁▁ ▁▁▁▁ ▁▁▁▁ ┴ 0.0005
     -5   -4   -3   -2   -1    0    1    2    3    4    5    6    7    8    9   10
```

### Links externos

[Weisstein, Eric W. "Extreme Value Distribution."](<https://mathworld.wolfram.com/ExtremeValueDistribution.html>) De MathWorld — Um Recurso Web da Wolfram.
---