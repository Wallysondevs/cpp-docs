# std::binomial_distribution

Definido no cabeçalho `[<random>](<#/doc/header/random>)`

```c
template< class IntType = int >
class binomial_distribution;
```

Produz valores inteiros não negativos aleatórios i, distribuídos de acordo com a função de probabilidade discreta:

    \\(P(i|t,p) = \binom{t}{i} \cdot p^i \cdot (1-p)^{t-i}\\)P(i|t,p) =⎛
⎜
⎝t
i⎞
⎟
⎠ · pi
· (1 − p)t−i

O valor obtido é o número de sucessos em uma sequência de t experimentos de sim/não, cada um dos quais é bem-sucedido com probabilidade p.

`std::binomial_distribution` satisfaz [RandomNumberDistribution](<#/doc/named_req/RandomNumberDistribution>).

### Parâmetros de template

- **IntType** — O tipo de resultado gerado pelo gerador. O efeito é indefinido se este não for um dos short, int, long, long long, unsigned short, unsigned int, unsigned long, ou unsigned long long.

### Tipos de membro

Tipo de membro | Definição
---|---
`result_type` (C++11) | IntType
`param_type` (C++11) | o tipo do conjunto de parâmetros, veja [RandomNumberDistribution](<#/doc/named_req/RandomNumberDistribution>).

### Funções membro

[ (construtor)](<#/doc/numeric/random/binomial_distribution/binomial_distribution>)(C++11) | constrói uma nova distribuição
(função membro pública)
[ reset](<#/doc/numeric/random/binomial_distribution/reset>)(C++11) | redefine o estado interno da distribuição
(função membro pública)

##### Geração

[ operator()](<#/>)(C++11) | gera o próximo número aleatório na distribuição
(função membro pública)

##### Características

[ p](<#/doc/numeric/random/binomial_distribution/params>)(C++11) | retorna os parâmetros da distribuição
(função membro pública)
[ param](<#/doc/numeric/random/binomial_distribution/param>)(C++11) | obtém ou define o objeto de parâmetro da distribuição
(função membro pública)
[ min](<#/doc/numeric/random/binomial_distribution/min>)(C++11) | retorna o valor mínimo potencialmente gerado
(função membro pública)
[ max](<#/doc/numeric/random/binomial_distribution/max>)(C++11) | retorna o valor máximo potencialmente gerado
(função membro pública)

### Funções não-membro

[ operator==operator!=](<#/doc/numeric/random/binomial_distribution/operator_cmp>)(C++11)(C++11)(removido em C++20) | compara dois objetos de distribuição
(função)
[ operator<&lt;operator&gt;>](<#/doc/numeric/random/binomial_distribution/operator_ltltgtgt>)(C++11) | realiza entrada e saída de stream em distribuição de números pseudoaleatórios
(modelo de função)

### Exemplo

Gráfico da distribuição binomial com probabilidade de sucesso de cada tentativa exatamente 0.5, ilustrando a relação com o triângulo de Pascal (as probabilidades de que nenhuma, 1, 2, 3, ou todas as quatro das 4 tentativas sejam bem-sucedidas neste caso são 1:4:6:4:1).

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
        // perform 4 trials, each succeeds 1 in 2 times
        std::binomial_distribution<> d(4, 0.5);
    
        std::map<int, int> hist;
        for (int n = 0; n != 10000; ++n)
            ++hist[d(gen)];
    
        for (auto const& [x, y] : hist)
            std::cout << x << ' ' << std::string(y / 100, '*') << '\n';
    }
```

Saída possível:
```
    0 ******
    1 ************************
    2 *************************************
    3 *************************
    4 ******
```

### Links externos

[Weisstein, Eric W. "Binomial Distribution."](<https://mathworld.wolfram.com/BinomialDistribution.html>) Do MathWorld — Um Recurso Web da Wolfram.
---