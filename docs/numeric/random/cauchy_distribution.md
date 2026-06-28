# std::cauchy_distribution

Definido no cabeçalho `[<random>](<#/doc/header/random>)`

```c
template< class RealType = double >
class cauchy_distribution;
```

Produz números aleatórios de acordo com uma [distribuição de Cauchy](<https://en.wikipedia.org/wiki/Cauchy_distribution> "enwiki:Cauchy distribution") (também chamada de distribuição de Lorentz):

    \\({\small f(x;a,b)={(b\pi{[1+{(\frac{x-a}{b})}^{2}]} })}^{-1}\\)f(x; a,b) = ⎛
⎜
⎝bπ ⎡
⎢
⎣1 + ⎛
⎜
⎝x - a
---
b
⎞
⎟
⎠2
⎤
⎥
⎦⎞
⎟
⎠-1

`std::cauchy_distribution` satisfaz todos os requisitos de [RandomNumberDistribution](<#/doc/named_req/RandomNumberDistribution>).

### Parâmetros de template

- **RealType** — O tipo de resultado gerado pelo gerador. O efeito é indefinido se este não for um dos tipos float, double ou long double.

### Tipos de membro

Tipo de membro | Definição
---|---
`result_type` (C++11) | RealType
`param_type` (C++11) | o tipo do conjunto de parâmetros, veja [RandomNumberDistribution](<#/doc/named_req/RandomNumberDistribution>).

### Funções membro

[ (construtor)](<#/doc/numeric/random/cauchy_distribution/cauchy_distribution>)(C++11) | constrói uma nova distribuição
(função membro pública)
[ reset](<#/doc/numeric/random/cauchy_distribution/reset>)(C++11) | reinicia o estado interno da distribuição
(função membro pública)

##### Geração

[ operator()](<#/>)(C++11) | gera o próximo número aleatório na distribuição
(função membro pública)

##### Características

[ ab](<#/doc/numeric/random/cauchy_distribution/params>)(C++11) | retorna os parâmetros da distribuição
(função membro pública)
[ param](<#/doc/numeric/random/cauchy_distribution/param>)(C++11) | obtém ou define o objeto de parâmetro da distribuição
(função membro pública)
[ min](<#/doc/numeric/random/cauchy_distribution/min>)(C++11) | retorna o valor mínimo potencialmente gerado
(função membro pública)
[ max](<#/doc/numeric/random/cauchy_distribution/max>)(C++11) | retorna o valor máximo potencialmente gerado
(função membro pública)

### Funções não-membro

[ operator==operator!=](<#/doc/numeric/random/cauchy_distribution/operator_cmp>)(C++11)(C++11)(removido em C++20) | compara dois objetos de distribuição
(função)
[ operator<&lt;operator&gt;>](<#/doc/numeric/random/cauchy_distribution/operator_ltltgtgt>)(C++11) | realiza entrada e saída de stream em distribuição de números pseudoaleatórios
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
        static_assert(0 < Height && 0 < BarWidth && 0 <= Padding && 0 <= Offset);
    
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
    
        auto cauchy = &gen
        {
            std::cauchy_distribution<float> d{x0 /* a */, 𝛾 /* b */};
    
            const int norm = 1'00'00;
            const float cutoff = 0.005f;
    
            std::map<int, int> hist{};
            for (int n = 0; n != norm; ++n)
                ++hist[std::round(d(gen))];
    
            std::vector<float> bars;
            std::vector<int> indices;
            for (auto const& [n, p] : hist)
                if (float x = p * (1.0 / norm); cutoff < x)
                {
                    bars.push_back(x);
                    indices.push_back(n);
                }
    
            std::cout << "x₀ = " << x0 << ", 𝛾 = " << 𝛾 << ":\n";
            draw_vbars<4,3>(bars);
            for (int n : indices)
                std::cout << std::setw(2) << n << "  ";
            std::cout << "\n\n";
        };
    
        cauchy(/* x₀ = */ -2.0f, /* 𝛾 = */ 0.50f);
        cauchy(/* x₀ = */ +0.0f, /* 𝛾 = */ 1.25f);
    }
```

Saída possível:
```
    x₀ = -2, 𝛾 = 0.5:
                        ███                     ┬ 0.5006
                        ███                     │
                    ▂▂▂ ███ ▁▁▁                 │
    ▁▁▁ ▁▁▁ ▁▁▁ ▃▃▃ ███ ███ ███ ▂▂▂ ▁▁▁ ▁▁▁ ▁▁▁ ┴ 0.0076
    -7  -6  -5  -4  -3  -2  -1   0   1   2   3
    
    x₀ = 0, 𝛾 = 1.25:
                                    ███                                 ┬ 0.2539
                                ▅▅▅ ███ ▃▃▃                             │
                            ▁▁▁ ███ ███ ███ ▁▁▁                         │
    ▁▁▁ ▁▁▁ ▁▁▁ ▁▁▁ ▃▃▃ ▅▅▅ ███ ███ ███ ███ ███ ▅▅▅ ▃▃▃ ▂▂▂ ▁▁▁ ▁▁▁ ▁▁▁ ┴ 0.0058
    -8  -7  -6  -5  -4  -3  -2  -1   0   1   2   3   4   5   6   7   9
```

### Links externos

[Weisstein, Eric W. "Cauchy Distribution."](<https://mathworld.wolfram.com/CauchyDistribution.html>) De MathWorld — Um Recurso Web da Wolfram.
---