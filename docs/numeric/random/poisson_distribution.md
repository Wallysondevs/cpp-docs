# std::poisson_distribution

Definido no cabeçalho `[<random>](<#/doc/header/random>)`

```c
template< class IntType = int >
class poisson_distribution;
```

Produz valores inteiros não negativos aleatórios i, distribuídos de acordo com a função de probabilidade discreta:

    \\(P(i | \mu) = \frac{e^{-\mu}\mu^i}{i!}\\)P(i|μ) = e-μ
·μi

---
i!

O valor obtido é a probabilidade de exatamente i ocorrências de um evento aleatório se o número esperado, _médio_, de suas ocorrências sob as mesmas condições (no mesmo intervalo de tempo/espaço) for μ.

`std::poisson_distribution` satisfaz [RandomNumberDistribution](<#/doc/named_req/RandomNumberDistribution>).

### Parâmetros de template

- **IntType** — O tipo de resultado gerado pelo gerador. O efeito é indefinido se este não for um de short, int, long, long long, unsigned short, unsigned int, unsigned long, ou unsigned long long.

### Tipos de membro

Tipo de membro | Definição
---|---
`result_type` (C++11) | `IntType`
`param_type` (C++11) | o tipo do conjunto de parâmetros, veja [RandomNumberDistribution](<#/doc/named_req/RandomNumberDistribution>).

### Funções membro

[ (construtor)](<#/doc/numeric/random/poisson_distribution/poisson_distribution>)(C++11) | constrói uma nova distribuição
(função membro pública)
[ reset](<#/doc/numeric/random/poisson_distribution/reset>)(C++11) | reinicia o estado interno da distribuição
(função membro pública)

##### Geração

[ operator()](<#/>)(C++11) | gera o próximo número aleatório na distribuição
(função membro pública)

##### Características

[ mean](<#/doc/numeric/random/poisson_distribution/mean>)(C++11) | retorna o parâmetro de distribuição _médio_ (número médio de ocorrências do evento)
(função membro pública)
[ param](<#/doc/numeric/random/poisson_distribution/param>)(C++11) | obtém ou define o objeto de parâmetro da distribuição
(função membro pública)
[ min](<#/doc/numeric/random/poisson_distribution/min>)(C++11) | retorna o valor mínimo potencialmente gerado
(função membro pública)
[ max](<#/doc/numeric/random/poisson_distribution/max>)(C++11) | retorna o valor máximo potencialmente gerado
(função membro pública)

### Funções não-membro

[ operator==operator!=](<#/doc/numeric/random/poisson_distribution/operator_cmp>)(C++11)(C++11)(removido em C++20) | compara dois objetos de distribuição
(função)
[ operator<&lt;operator&gt;>](<#/doc/numeric/random/poisson_distribution/operator_ltltgtgt>)(C++11) | realiza entrada e saída de stream em distribuição de números pseudoaleatórios
(modelo de função)

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
        std::mt19937 gen(rd());
    
        // If an event occurs 4 times a minute on average, how
        // often is it that it occurs n times in one minute?
        std::poisson_distribution<> d(4);
    
        std::map<int, int> hist;
        for (int n = 0; n != 10000; ++n)
            ++hist[d(gen)];
    
        for (auto [x, y] : hist)
            std::cout << std::hex << x << ' '
                      << std::string(y / 100, '*') << '\n';
    }
```

Saída possível:
```
    0 *
    1 *******
    2 **************
    3 *******************
    4 *******************
    5 ***************
    6 **********
    7 *****
    8 **
    9 *
    a
    b
    c
    d
```

### Links externos

[Weisstein, Eric W. "Poisson Distribution."](<https://mathworld.wolfram.com/PoissonDistribution.html>) De MathWorld — Um Recurso Web da Wolfram.
---