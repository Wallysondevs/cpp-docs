# std::negative_binomial_distribution

Definido no cabeçalho `[<random>](<#/doc/header/random>)`

```c
template< class IntType = int >
class negative_binomial_distribution;
```

  
Produz valores inteiros não negativos aleatórios i, distribuídos de acordo com a função de probabilidade discreta: 

    \\(P(i|k, p) = \binom{k + i - 1}{i} \cdot p^k \cdot (1 - p)^i\\)P(i|k,p) =⎛  
⎜  
⎝k + i − 1  
i⎞  
⎟  
⎠ · pk  
· (1 − p)i  

O valor representa o número de falhas em uma série de tentativas independentes de sim/não (cada uma bem-sucedida com probabilidade p), antes que exatamente k sucessos ocorram. 

`std::negative_binomial_distribution` satisfaz [RandomNumberDistribution](<#/doc/named_req/RandomNumberDistribution>). 

### Parâmetros de template

IntType  |  \-  |  O tipo de resultado gerado pelo gerador. O efeito é indefinido se este não for um dos tipos short, int, long, long long, unsigned short, unsigned int, unsigned long, ou unsigned long long.   
  
### Tipos de membro

Tipo de membro  |  Definição   
---|---
`result_type` (C++11) |  IntType  
`param_type` (C++11) |  o tipo do conjunto de parâmetros, veja [RandomNumberDistribution](<#/doc/named_req/RandomNumberDistribution>).   
  
### Funções membro

[ (construtor)](<#/doc/numeric/random/negative_binomial_distribution/negative_binomial_distribution>)(C++11) |  constrói uma nova distribuição   
(função membro pública)  
[ reset](<#/doc/numeric/random/negative_binomial_distribution/reset>)(C++11) |  redefine o estado interno da distribuição   
(função membro pública)  
  
#####  Geração   
  
[ operator()](<#/>)(C++11) |  gera o próximo número aleatório na distribuição   
(função membro pública)  
  
#####  Características   
  
[ pk](<#/doc/numeric/random/negative_binomial_distribution/params>)(C++11) |  retorna os parâmetros da distribuição   
(função membro pública)  
[ param](<#/doc/numeric/random/negative_binomial_distribution/param>)(C++11) |  obtém ou define o objeto de parâmetro da distribuição   
(função membro pública)  
[ min](<#/doc/numeric/random/negative_binomial_distribution/min>)(C++11) |  retorna o valor mínimo potencialmente gerado   
(função membro pública)  
[ max](<#/doc/numeric/random/negative_binomial_distribution/max>)(C++11) |  retorna o valor máximo potencialmente gerado   
(função membro pública)  
  
### Funções não-membro

[ operator==operator!=](<#/doc/numeric/random/negative_binomial_distribution/operator_cmp>)(C++11)(C++11)(removido em C++20) |  compara dois objetos de distribuição   
(função)  
[ operator<&lt;operator&gt;>](<#/doc/numeric/random/negative_binomial_distribution/operator_ltltgtgt>)(C++11) |  realiza entrada e saída de stream em distribuição de números pseudoaleatórios   
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
        // Pat goes door-to-door selling cookies
        // At each house, there's a 75% chance that she sells one box
        // how many times will she be turned away before selling 5 boxes?
        std::negative_binomial_distribution<> d(5, 0.75);
    
        std::map<int, int> hist;
        for (int n = 0; n != 10000; ++n)
            ++hist[d(gen)];
    
        for (auto [x, y] : hist)
            std::cout << std::hex << x << ' ' << std::string(y / 100, '*') << '\n';
    }
```

Saída possível: 
```
    0 ***********************
    1 *****************************
    2 **********************
    3 *************
    4 ******
    5 ***
    6 *
    7
    8
    9
    a
    b
```

### Links externos

[Weisstein, Eric W. "Negative Binomial Distribution."](<https://mathworld.wolfram.com/NegativeBinomialDistribution.html>) De MathWorld — Um Recurso Web da Wolfram.   
---