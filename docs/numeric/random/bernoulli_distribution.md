# std::bernoulli_distribution

Definido no cabeçalho `[<random>](<#/doc/header/random>)`

```c
class bernoulli_distribution;
```

Produz valores booleanos aleatórios, de acordo com a função de probabilidade discreta. A probabilidade de true é

    P(b|p) =⎧  
⎨  
⎩p, if b is true  
1 − p, if b is false

`std::bernoulli_distribution` satisfaz [RandomNumberDistribution](<#/doc/named_req/RandomNumberDistribution>).

### Tipos Membro

Tipo Membro | Definição
---|---
`result_type` (C++11) | bool
`param_type` (C++11) | o tipo do conjunto de parâmetros, veja [RandomNumberDistribution](<#/doc/named_req/RandomNumberDistribution>).

### Funções Membro

[ (construtor)](<#/doc/numeric/random/bernoulli_distribution/bernoulli_distribution>)(C++11) | constrói uma nova distribuição
(função membro pública)
[ reset](<#/doc/numeric/random/bernoulli_distribution/reset>)(C++11) | reinicia o estado interno da distribuição
(função membro pública)

##### Geração

[ operator()](<#/>)(C++11) | gera o próximo número aleatório na distribuição
(função membro pública)

##### Características

[ p](<#/doc/numeric/random/bernoulli_distribution/p>)(C++11) | retorna o parâmetro _p_ da distribuição (probabilidade de gerar true)
(função membro pública)
[ param](<#/doc/numeric/random/bernoulli_distribution/param>)(C++11) | obtém ou define o objeto de parâmetro da distribuição
(função membro pública)
[ min](<#/doc/numeric/random/bernoulli_distribution/min>)(C++11) | retorna o valor mínimo potencialmente gerado
(função membro pública)
[ max](<#/doc/numeric/random/bernoulli_distribution/max>)(C++11) | retorna o valor máximo potencialmente gerado
(função membro pública)

### Funções Não-Membro

[ operator==operator!=](<#/doc/numeric/random/bernoulli_distribution/operator_cmp>)(C++11)(C++11)(removido em C++20) | compara dois objetos de distribuição
(função)
[ operator<&lt;operator&gt;>](<#/doc/numeric/random/bernoulli_distribution/operator_ltltgtgt>)(C++11) | realiza entrada e saída de stream em distribuição de números pseudoaleatórios
(template de função)

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
        // give "true" 1/4 of the time
        // give "false" 3/4 of the time
        std::bernoulli_distribution d(0.25);
    
        std::map<bool, int> hist;
        for (int n = 0; n < 10000; ++n)
            ++hist[d(gen)];
    
        std::cout << std::boolalpha;
        for (auto const& [key, value] : hist)
            std::cout << std::setw(5) << key << ' '
                      << std::string(value / 500, '*') << '\n';
    }
```

Saída possível:
```
    false ***************
     true ****
```

### Links externos

[Weisstein, Eric W. "Bernoulli Distribution."](<https://mathworld.wolfram.com/BernoulliDistribution.html>) De MathWorld — Um Recurso Web da Wolfram.
---