# std::student_t_distribution

Definido no cabeçalho `[<random>](<#/doc/header/random>)`

```c
template< class RealType = double >
class student_t_distribution;
```

Produz valores de ponto flutuante aleatórios x, distribuídos de acordo com a função densidade de probabilidade:

    \\(p(x|n) = \frac{1}{\sqrt{n\pi} } \cdot \frac{\Gamma(\frac{n+1}{2})}{\Gamma(\frac{n}{2})} \cdot (1+\frac{x^2}{n})^{-\frac{n+1}{2} } \\)p(x|n) = 1
---
√nπ
· Γ(| n+1
---
2
)
Γ(| n
---
2
)
· ⎛
⎜
⎝1+x2

---
n
⎞
⎟
⎠ -n+1
---
2

onde n é conhecido como o número de _graus de liberdade_. Esta distribuição é usada ao estimar a _média_ de um valor normalmente distribuído desconhecido, dados n + 1 medições independentes, cada uma com erros aditivos de desvio padrão desconhecido, como em medições físicas. Ou, alternativamente, ao estimar a média desconhecida de uma distribuição normal com desvio padrão desconhecido, dados n + 1 amostras.

[`std::student_t_distribution`](<#/doc/numeric/random/student_t_distribution>) satisfaz todos os requisitos de [RandomNumberDistribution](<#/doc/named_req/RandomNumberDistribution>).

### Parâmetros de template

- **RealType** — O tipo de resultado gerado pelo gerador. O efeito é indefinido se este não for um de float, double ou long double.

### Tipos de membro

Tipo de membro | Definição
---|---
`result_type` (C++11) | RealType
`param_type` (C++11) | o tipo do conjunto de parâmetros, veja [RandomNumberDistribution](<#/doc/named_req/RandomNumberDistribution>).

### Funções membro

[ (constructor)](<#/doc/numeric/random/student_t_distribution/student_t_distribution>)(C++11) | constrói uma nova distribuição
(função membro pública)
[ reset](<#/doc/numeric/random/student_t_distribution/reset>)(C++11) | reinicia o estado interno da distribuição
(função membro pública)

##### Geração

[ operator()](<#/>)(C++11) | gera o próximo número aleatório na distribuição
(função membro pública)

##### Características

[ n](<#/doc/numeric/random/student_t_distribution/n>) | retorna o parâmetro _n_ da distribuição (graus de liberdade)
(função membro pública)
[ param](<#/doc/numeric/random/student_t_distribution/param>)(C++11) | obtém ou define o objeto de parâmetro da distribuição
(função membro pública)
[ min](<#/doc/numeric/random/student_t_distribution/min>)(C++11) | retorna o valor mínimo potencialmente gerado
(função membro pública)
[ max](<#/doc/numeric/random/student_t_distribution/max>)(C++11) | retorna o valor máximo potencialmente gerado
(função membro pública)

### Funções não-membro

[ operator==operator!=](<#/doc/numeric/random/student_t_distribution/operator_cmp>)(C++11)(C++11)(removido em C++20) | compara dois objetos de distribuição
(função)
[ operator<&lt;operator&gt;>](<#/doc/numeric/random/student_t_distribution/operator_ltltgtgt>)(C++11) | realiza entrada e saída de stream em distribuição de números pseudoaleatórios
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
    
        std::student_t_distribution<> d{10.0f};
    
        const int norm = 10'000;
        const float cutoff = 0.000'3f;
    
        std::map<int, int> hist{};
        for (int n = 0; n != norm; ++n)
            ++hist[std::round(d(gen))];
    
        std::vector<float> bars;
        std::vector<int> indices;
        for (const auto& [n, p] : hist)
            if (float x = p * (1.0f / norm); cutoff < x)
            {
                bars.push_back(x);
                indices.push_back(n);
            }
    
        for (draw_vbars<8, 5>(bars); const int n : indices)
            std::cout << " " << std::setw(2) << n << "   ";
        std::cout << '\n';
    }
```

Saída possível:
```
                            █████                               ┬ 0.3753
                            █████                               │
                      ▁▁▁▁▁ █████                               │
                      █████ █████ ▆▆▆▆▆                         │
                      █████ █████ █████                         │
                      █████ █████ █████                         │
                ▄▄▄▄▄ █████ █████ █████ ▄▄▄▄▄                   │
    ▁▁▁▁▁ ▃▃▃▃▃ █████ █████ █████ █████ █████ ▃▃▃▃▃ ▁▁▁▁▁ ▁▁▁▁▁ ┴ 0.0049
     -4    -3    -2    -1     0     1     2     3     4     5
```

### Links externos

[Weisstein, Eric W. "Student's t-Distribution."](<https://mathworld.wolfram.com/Studentst-Distribution.html>) De MathWorld — Um Recurso Web da Wolfram.
---