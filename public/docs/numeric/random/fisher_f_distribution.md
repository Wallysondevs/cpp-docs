# std::fisher_f_distribution

Definido no cabeçalho `[<random>](<#/doc/header/random>)`

```c
template< class RealType = double >
class fisher_f_distribution;
```

Produz números aleatórios de acordo com a [distribuição F](<https://en.wikipedia.org/wiki/F-distribution> "enwiki:F-distribution"):

    \\(P(x;m,n)=\frac{\Gamma{(\frac{m+n}{2})} }{\Gamma{(\frac{m}{2})}\Gamma{(\frac{n}{2})} }{(\frac{m}{n})}^{\frac{m}{2} }x^{\frac{m}{2}-1}{(1+\frac{m}{n}x)}^{-\frac{m+n}{2} }\\)P(x;m,n) = Γ((m+n)/2)
---
Γ(m/2) Γ(n/2)
(m/n)m/2
x(m/2)-1
(1+mx
---
n
)-(m+n)/2

\\(\small m\\)m e \\(\small n\\)n são os [graus de liberdade](<https://en.wikipedia.org/wiki/degrees_of_freedom_\(statistics\)> "enwiki:degrees of freedom \(statistics\)").

[`std::fisher_f_distribution`](<#/doc/numeric/random/fisher_f_distribution>) satisfaz todos os requisitos de [RandomNumberDistribution](<#/doc/named_req/RandomNumberDistribution>).

### Parâmetros de template

- **RealType** — O tipo de resultado gerado pelo gerador. O efeito é indefinido se este não for um de float, double ou long double.

### Tipos de membro

Tipo de membro | Definição
---|---
`result_type` (C++11) | RealType
`param_type` (C++11) | o tipo do conjunto de parâmetros, veja [RandomNumberDistribution](<#/doc/named_req/RandomNumberDistribution>).

### Funções membro

[ (construtor)](<#/doc/numeric/random/fisher_f_distribution/fisher_f_distribution>)(C++11) | constrói uma nova distribuição
(função membro pública)
[ reset](<#/doc/numeric/random/fisher_f_distribution/reset>)(C++11) | redefine o estado interno da distribuição
(função membro pública)

##### Geração

[ operator()](<#/>)(C++11) | gera o próximo número aleatório na distribuição
(função membro pública)

##### Características

[ mn](<#/doc/numeric/random/fisher_f_distribution/params>)(C++11) | retorna os parâmetros da distribuição
(função membro pública)
[ param](<#/doc/numeric/random/fisher_f_distribution/param>)(C++11) | obtém ou define o objeto de parâmetro da distribuição
(função membro pública)
[ min](<#/doc/numeric/random/fisher_f_distribution/min>)(C++11) | retorna o valor mínimo potencialmente gerado
(função membro pública)
[ max](<#/doc/numeric/random/fisher_f_distribution/max>)(C++11) | retorna o valor máximo potencialmente gerado
(função membro pública)

### Funções não-membro

[ operator==operator!=](<#/doc/numeric/random/fisher_f_distribution/operator_cmp>)(C++11)(C++11)(removido em C++20) | compara dois objetos de distribuição
(função)
[ operator<&lt;operator&gt;>](<#/doc/numeric/random/fisher_f_distribution/operator_ltltgtgt>)(C++11) | realiza entrada e saída de stream em distribuição de números pseudoaleatórios
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
    
        auto fisher = &gen
        {
            std::fisher_f_distribution<float> d{d1 /* m */, d2 /* n */};
    
            const int norm = 1'00'00;
            const float cutoff = 0.002f;
    
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
    
            std::cout << "d₁ = " << d1 << ", d₂ = " << d2 << ":\n";
            for (draw_vbars<4, 3>(bars); int n : indices)
                std::cout << std::setw(2) << n << "  ";
            std::cout << "\n\n";
        };
    
        fisher(/* d₁ = */ 1.0f, /* d₂ = */ 5.0f);
        fisher(/* d₁ = */ 15.0f, /* d₂ = */ 10.f);
        fisher(/* d₁ = */ 100.0f, /* d₂ = */ 3.0f);
    }
```

Saída possível:
```
    d₁ = 1, d₂ = 5:
    ███                                                     ┬ 0.4956
    ███                                                     │
    ███ ▇▇▇                                                 │
    ███ ███ ▇▇▇ ▄▄▄ ▂▂▂ ▂▂▂ ▁▁▁ ▁▁▁ ▁▁▁ ▁▁▁ ▁▁▁ ▁▁▁ ▁▁▁ ▁▁▁ ┴ 0.0021
     0   1   2   3   4   5   6   7   8   9  10  11  12  14
    
    d₁ = 15, d₂ = 10:
        ███                     ┬ 0.6252
        ███                     │
        ███ ▂▂▂                 │
    ▆▆▆ ███ ███ ▃▃▃ ▁▁▁ ▁▁▁ ▁▁▁ ┴ 0.0023
     0   1   2   3   4   5   6
    
    d₁ = 100, d₂ = 3:
        ███                                                             ┬ 0.4589
        ███                                                             │
    ▁▁▁ ███ ▅▅▅                                                         │
    ███ ███ ███ ▆▆▆ ▃▃▃ ▂▂▂ ▂▂▂ ▁▁▁ ▁▁▁ ▁▁▁ ▁▁▁ ▁▁▁ ▁▁▁ ▁▁▁ ▁▁▁ ▁▁▁ ▁▁▁ ┴ 0.0021
     0   1   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16
```

### Links externos

[Weisstein, Eric W. "F-Distribution."](<https://mathworld.wolfram.com/F-Distribution.html>) De MathWorld — Um Recurso Web da Wolfram.
---