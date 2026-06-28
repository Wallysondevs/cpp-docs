# std::chi_squared_distribution

Definido no cabeçalho `[<random>](<#/doc/header/random>)`

```c
template< class RealType = double >
class chi_squared_distribution;
```

A `chi_squared_distribution` produz números aleatórios \\(\small x>0\\)x>0 de acordo com a [distribuição Qui-quadrado](<https://en.wikipedia.org/wiki/Chi-squared_distribution> "enwiki:Chi-squared distribution"):

    \\({\small f(x;n) = }\frac{x^{(n/2)-1}\exp{(-x/2)} }{\Gamma{(n/2)}2^{n/2} }\\)f(x;n) = x(n/2)-1
_e_ -x/2
---
Γ(n/2) 2n/2

\\(\small\Gamma\\)Γ é a [função Gamma](<https://en.wikipedia.org/wiki/Gamma_function> "enwiki:Gamma function") (Veja também [std::tgamma](<#/doc/numeric/math/tgamma>)) e \\(\small n\\)n são os [graus de liberdade](<https://en.wikipedia.org/wiki/Degrees_of_freedom_\(statistics\)> "enwiki:Degrees of freedom \(statistics\)") (padrão 1).

[`std::chi_squared_distribution`](<#/doc/numeric/random/chi_squared_distribution>) satisfaz todos os requisitos de [RandomNumberDistribution](<#/doc/named_req/RandomNumberDistribution>).

### Parâmetros de template

- **RealType** — O tipo de resultado gerado pelo gerador. O efeito é indefinido se este não for um de float, double ou long double.

### Tipos de membros

Tipo de membro | Definição
---|---
`result_type` (C++11) | RealType
`param_type` (C++11) | o tipo do conjunto de parâmetros, veja [RandomNumberDistribution](<#/doc/named_req/RandomNumberDistribution>).

### Funções membro

[ (construtor)](<#/doc/numeric/random/chi_squared_distribution/chi_squared_distribution>)(C++11) | constrói uma nova distribuição
(função membro pública)
[ reset](<#/doc/numeric/random/chi_squared_distribution/reset>)(C++11) | redefine o estado interno da distribuição
(função membro pública)

##### Geração

[ operator()](<#/>)(C++11) | gera o próximo número aleatório na distribuição
(função membro pública)

##### Características

[ n](<#/doc/numeric/random/chi_squared_distribution/n>)(C++11) | retorna o parâmetro de distribuição de graus de liberdade (\\(\small n\\)n)
(função membro pública)
[ param](<#/doc/numeric/random/chi_squared_distribution/param>)(C++11) | obtém ou define o objeto de parâmetro de distribuição
(função membro pública)
[ min](<#/doc/numeric/random/chi_squared_distribution/min>)(C++11) | retorna o valor mínimo potencialmente gerado
(função membro pública)
[ max](<#/doc/numeric/random/chi_squared_distribution/max>)(C++11) | retorna o valor máximo potencialmente gerado
(função membro pública)

### Funções não-membro

[ operator==operator!=](<#/doc/numeric/random/chi_squared_distribution/operator_cmp>)(C++11)(C++11)(removido em C++20) | compara dois objetos de distribuição
(função)
[ operator<&lt;operator&gt;>](<#/doc/numeric/random/chi_squared_distribution/operator_ltltgtgt>)(C++11) | realiza entrada e saída de stream em distribuição de números pseudoaleatórios
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
    
        auto χ2 = &gen
        {
            std::chi_squared_distribution<float> d{dof /* n */};
    
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
    
            std::cout << "dof = " << dof << ":\n";
    
            for (draw_vbars<4, 3>(bars); int n : indices)
                std::cout << std::setw(2) << n << "  ";
            std::cout << "\n\n";
        };
    
        for (float dof : {1.f, 2.f, 3.f, 4.f, 6.f, 9.f})
            χ2(dof);
    }
```

Saída possível:
```
    dof = 1:
    ███                                 ┬ 0.5271
    ███                                 │
    ███ ███                             │
    ███ ███ ▇▇▇ ▃▃▃ ▂▂▂ ▁▁▁ ▁▁▁ ▁▁▁ ▁▁▁ ┴ 0.003
     0   1   2   3   4   5   6   7   8
    
    dof = 2:
        ███                                     ┬ 0.3169
    ▆▆▆ ███ ▃▃▃                                 │
    ███ ███ ███ ▄▄▄                             │
    ███ ███ ███ ███ ▇▇▇ ▄▄▄ ▃▃▃ ▂▂▂ ▁▁▁ ▁▁▁ ▁▁▁ ┴ 0.004
     0   1   2   3   4   5   6   7   8   9  10
    
    dof = 3:
        ███ ▃▃▃                                         ┬ 0.2439
        ███ ███ ▄▄▄                                     │
    ▃▃▃ ███ ███ ███ ▇▇▇ ▁▁▁                             │
    ███ ███ ███ ███ ███ ███ ▆▆▆ ▄▄▄ ▃▃▃ ▂▂▂ ▁▁▁ ▁▁▁ ▁▁▁ ┴ 0.0033
     0   1   2   3   4   5   6   7   8   9  10  11  12
    
    dof = 4:
        ▂▂▂ ███ ▃▃▃                                                 ┬ 0.1864
        ███ ███ ███ ███ ▂▂▂                                         │
        ███ ███ ███ ███ ███ ▅▅▅ ▁▁▁                                 │
    ▅▅▅ ███ ███ ███ ███ ███ ███ ███ ▆▆▆ ▄▄▄ ▃▃▃ ▂▂▂ ▂▂▂ ▁▁▁ ▁▁▁ ▁▁▁ ┴ 0.0026
     0   1   2   3   4   5   6   7   8   9  10  11  12  13  14  15
    
    dof = 6:
                ▅▅▅ ▇▇▇ ███ ▂▂▂                                                 ┬ 0.1351
            ▅▅▅ ███ ███ ███ ███ ▇▇▇ ▁▁▁                                         │
        ▁▁▁ ███ ███ ███ ███ ███ ███ ███ ▅▅▅ ▂▂▂                                 │
    ▁▁▁ ███ ███ ███ ███ ███ ███ ███ ███ ███ ███ ███ ▅▅▅ ▄▄▄ ▃▃▃ ▂▂▂ ▁▁▁ ▁▁▁ ▁▁▁ ┴ 0.0031
     0   1   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16  17  18
    
    dof = 9:
                ▅▅▅ ▇▇▇ ███ ███ ▄▄▄ ▂▂▂                                                 ┬ 0.1044
            ▃▃▃ ███ ███ ███ ███ ███ ███ ▅▅▅ ▁▁▁                                         │
        ▄▄▄ ███ ███ ███ ███ ███ ███ ███ ███ ███ ▆▆▆ ▃▃▃                                 │
    ▄▄▄ ███ ███ ███ ███ ███ ███ ███ ███ ███ ███ ███ ███ ███ ▆▆▆ ▄▄▄ ▃▃▃ ▂▂▂ ▁▁▁ ▁▁▁ ▁▁▁ ┴ 0.0034
     2   3   4   5   6   7   8   9  10  11  12  13  14  15  16  17  18  19  20  21  22
```

### Links externos

1. | [Weisstein, Eric W. "Chi-Squared Distribution."](<https://mathworld.wolfram.com/Chi-SquaredDistribution.html>) Do MathWorld — Um Recurso Web da Wolfram.
---|---
2. | [Chi-squared distribution](<https://en.wikipedia.org/wiki/Chi-squared_distribution> "enwiki:Chi-squared distribution") — Da Wikipedia.