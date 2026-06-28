# std::exponential_distribution

Definido no cabeçalho `[<random>](<#/doc/header/random>)`

```c
template< class RealType = double >
class exponential_distribution;
```

Produz valores de ponto flutuante não negativos aleatórios \\(\small x\\)x, distribuídos de acordo com a função de densidade de probabilidade:

    \\(\small P(x|\lambda) = \lambda e^{-\lambda x}\\)P(x|λ) = λe-λx

O valor obtido é o tempo/distância até o próximo evento aleatório se os eventos aleatórios ocorrerem a uma taxa constante \\(\small\lambda\\)λ por unidade de tempo/distância. Por exemplo, esta distribuição descreve o tempo entre os cliques de um contador Geiger ou a distância entre mutações pontuais em uma fita de DNA.

Esta é a contraparte contínua de [std::geometric_distribution](<#/doc/numeric/random/geometric_distribution>).

`std::exponential_distribution` satisfaz [RandomNumberDistribution](<#/doc/named_req/RandomNumberDistribution>).

### Parâmetros de template

- **RealType** — O tipo de resultado gerado pelo gerador. O efeito é indefinido se este não for um de float, double ou long double.

### Tipos de membro

Tipo de membro | Definição
---|---
`result_type` (desde C++11) | RealType
`param_type` (desde C++11) | o tipo do conjunto de parâmetros, veja [RandomNumberDistribution](<#/doc/named_req/RandomNumberDistribution>).

### Funções membro

[ (constructor)](<#/doc/numeric/random/exponential_distribution/exponential_distribution>)(desde C++11) | constrói uma nova distribuição
(função membro pública)
[ reset](<#/doc/numeric/random/exponential_distribution/reset>)(desde C++11) | redefine o estado interno da distribuição
(função membro pública)

##### Geração

[ operator()](<#/>)(desde C++11) | gera o próximo número aleatório na distribuição
(função membro pública)

##### Características

[ lambda](<#/doc/numeric/random/exponential_distribution/lambda>)(desde C++11) | retorna o parâmetro _lambda_ da distribuição (taxa de eventos)
(função membro pública)
[ param](<#/doc/numeric/random/exponential_distribution/param>)(desde C++11) | obtém ou define o objeto de parâmetro da distribuição
(função membro pública)
[ min](<#/doc/numeric/random/exponential_distribution/min>)(desde C++11) | retorna o valor mínimo potencialmente gerado
(função membro pública)
[ max](<#/doc/numeric/random/exponential_distribution/max>)(desde C++11) | retorna o valor máximo potencialmente gerado
(função membro pública)

### Funções não-membro

[ operator==operator!=](<#/doc/numeric/random/exponential_distribution/operator_cmp>)(desde C++11)(desde C++11)(removido em C++20) | compara dois objetos de distribuição
(função)
[ operator<&lt;operator&gt;>](<#/doc/numeric/random/exponential_distribution/operator_ltltgtgt>)(desde C++11) | realiza entrada e saída de stream em distribuição de números pseudoaleatórios
(template de função)

### Notas

Algumas implementações podem ocasionalmente retornar infinito se `RealType` for float. Este é o [problema LWG 2524](<https://cplusplus.github.io/LWG/issue2524>).

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
    
        // if particles decay once per second on average,
        // how much time, in seconds, until the next one?
        std::exponential_distribution<> d(1);
    
        std::map<int, int> hist;
        for (int n = 0; n != 10000; ++n)
            ++hist[2 * d(gen)];
    
        for (auto const& [x, y] : hist)
            std::cout << std::fixed << std::setprecision(1)
                      << x / 2.0 << '-' << (x + 1) / 2.0 << ' '
                      << std::string(y / 200, '*') << '\n';
    }
```

Saída possível:
```
    0.0-0.5 *******************
    0.5-1.0 ***********
    1.0-1.5 *******
    1.5-2.0 ****
    2.0-2.5 **
    2.5-3.0 *
    3.0-3.5
    3.5-4.0
```

### Links externos

[Weisstein, Eric W. "Exponential Distribution."](<https://mathworld.wolfram.com/ExponentialDistribution.html>) De MathWorld — Um Recurso Web da Wolfram.
---