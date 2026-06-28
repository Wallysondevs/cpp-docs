# std::lognormal_distribution

Definido no cabeçalho `[<random>](<#/doc/header/random>)`

```c
template< class RealType = double >
class lognormal_distribution;
```

A distribuição de números aleatórios `lognormal_distribution` produz números aleatórios x > 0 de acordo com uma [distribuição Log-normal](<https://en.wikipedia.org/wiki/Log-normal_distribution> "enwiki:Log-normal distribution"):

    \\({\small f(x;m,s) = \frac{1}{sx\sqrt{2\pi} } \exp{(-\frac{ {(\ln{x} - m)}^{2} }{2{s}^{2} })} }\\)f(x; m,s) = 1
---
sx√2 π
exp⎛
⎜
⎝\- (ln x - m)2

---
2s2

⎞
⎟
⎠

Os parâmetros m e s são, respectivamente, a média e o desvio padrão do logaritmo natural de x.

[`std::lognormal_distribution`](<#/doc/numeric/random/lognormal_distribution>) satisfaz todos os requisitos de [RandomNumberDistribution](<#/doc/named_req/RandomNumberDistribution>).

### Parâmetros de template

- **RealType** — O tipo de resultado gerado pelo gerador. O efeito é indefinido se este não for um de float, double, ou long double.

### Tipos de membro

Tipo de membro | Definição
---|---
`result_type` (C++11) | RealType
`param_type` (C++11) | o tipo do conjunto de parâmetros, veja [RandomNumberDistribution](<#/doc/named_req/RandomNumberDistribution>).

### Funções membro

[ (construtor)](<#/doc/numeric/random/lognormal_distribution/lognormal_distribution>)(C++11) | constrói uma nova distribuição
(função membro pública)
[ reset](<#/doc/numeric/random/lognormal_distribution/reset>)(C++11) | reinicia o estado interno da distribuição
(função membro pública)

##### Geração

[ operator()](<#/>)(C++11) | gera o próximo número aleatório na distribuição
(função membro pública)

##### Características

[ ms](<#/doc/numeric/random/lognormal_distribution/params>)(C++11) | retorna os parâmetros da distribuição
(função membro pública)
[ param](<#/doc/numeric/random/lognormal_distribution/param>)(C++11) | obtém ou define o objeto de parâmetro da distribuição
(função membro pública)
[ min](<#/doc/numeric/random/lognormal_distribution/min>)(C++11) | retorna o valor mínimo potencialmente gerado
(função membro pública)
[ max](<#/doc/numeric/random/lognormal_distribution/max>)(C++11) | retorna o valor máximo potencialmente gerado
(função membro pública)

### Funções não-membro

[ operator==operator!=](<#/doc/numeric/random/lognormal_distribution/operator_cmp>)(C++11)(C++11)(removido em C++20) | compara dois objetos de distribuição
(função)
[ operator<&lt;operator&gt;>](<#/doc/numeric/random/lognormal_distribution/operator_ltltgtgt>)(C++11) | realiza entrada e saída de stream em distribuição de números pseudoaleatórios
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
    
        std::lognormal_distribution<> d(1.6, 0.25);
    
        std::map<int, int> hist;
        for (int n = 0; n < 1e4; ++n)
            ++hist[std::round(d(gen))];
    
        for (std::cout << std::fixed << std::setprecision(1); auto [x, y] : hist)
            std::cout << std::hex << x << ' ' << std::string(y / 200, '*') << '\n';
    }
```

Saída possível:
```
    2
    3 ***
    4 *************
    5 ***************
    6 *********
    7 ****
    8 *
    9
    a
    b
    c
```

### Links externos

[Weisstein, Eric W. "Log Normal Distribution."](<https://mathworld.wolfram.com/LogNormalDistribution.html>) De MathWorld — Um Recurso Web da Wolfram.
---