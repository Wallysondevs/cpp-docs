# std::gamma_distribution

Definido no cabeçalho `[<random>](<#/doc/header/random>)`

```c
template< class RealType = double >
class gamma_distribution;
```

Produz valores de ponto flutuante positivos aleatórios x, distribuídos de acordo com a função de densidade de probabilidade:

    \\(\mathsf{p}(x\mid\alpha,\beta) = \frac{e^{-x/\beta} }{\beta^\alpha\cdot\Gamma(\alpha)}\cdot x^{\alpha-1} \\)P(x|α,β) = e-x/β
  
---  
βα  
· Γ(α)  
· xα-1  

onde α é conhecido como o parâmetro de _forma_ e β é conhecido como o parâmetro de _escala_. O parâmetro de forma é por vezes denotado pela letra k e o parâmetro de escala é por vezes denotado pela letra θ.

Para α de ponto flutuante, o valor obtido é a soma de α variáveis aleatórias independentes distribuídas exponencialmente, cada uma das quais tem uma média de β.

`std::gamma_distribution` satisfaz [RandomNumberDistribution](<#/doc/named_req/RandomNumberDistribution>).

### Parâmetros de template

- **RealType** — O tipo de resultado gerado pelo gerador. O efeito é indefinido se este não for um de float, double, ou long double.
  
### Tipos de membro

Tipo de membro | Definição
---|---
`result_type` (C++11) | RealType
`param_type` (C++11) | o tipo do conjunto de parâmetros, veja [RandomNumberDistribution](<#/doc/named_req/RandomNumberDistribution>).
  
### Funções membro

[ (construtor)](<#/doc/numeric/random/gamma_distribution/gamma_distribution>)(C++11) | constrói uma nova distribuição
(função membro pública)
[ reset](<#/doc/numeric/random/gamma_distribution/reset>)(C++11) | reinicia o estado interno da distribuição
(função membro pública)
  
##### Geração
  
[ operator()](<#/>)(C++11) | gera o próximo número aleatório na distribuição
(função membro pública)
  
##### Características
  
[ alphabeta](<#/doc/numeric/random/gamma_distribution/params>)(C++11) | retorna os parâmetros da distribuição
(função membro pública)
[ param](<#/doc/numeric/random/gamma_distribution/param>)(C++11) | obtém ou define o objeto de parâmetro da distribuição
(função membro pública)
[ min](<#/doc/numeric/random/gamma_distribution/min>)(C++11) | retorna o valor mínimo potencialmente gerado
(função membro pública)
[ max](<#/doc/numeric/random/gamma_distribution/max>)(C++11) | retorna o valor máximo potencialmente gerado
(função membro pública)
  
### Funções não-membro

[ operator==operator!=](<#/doc/numeric/random/gamma_distribution/operator_cmp>)(C++11)(C++11)(removido em C++20) | compara dois objetos de distribuição
(função)
[ operator<&lt;operator&gt;>](<#/doc/numeric/random/gamma_distribution/operator_ltltgtgt>)(C++11) | realiza entrada e saída de stream em distribuição de números pseudoaleatórios
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
    
        // A gamma distribution with alpha = 1, and beta = 2
        // approximates an exponential distribution.
        std::gamma_distribution<> d(1, 2);
    
        std::map<int, int> hist;
        for (int n = 0; n != 10000; ++n)
            ++hist[2 * d(gen)];
    
        for (auto const& [x, y] : hist)
            if (y / 100.0 > 0.5)
                std::cout << std::fixed << std::setprecision(1)
                          << x / 2.0 << '-' << (x + 1) / 2.0 << ' '
                          << std::string(y / 100, '*') << '\n';
    }
```

Saída possível:
```
    0.0-0.5 **********************
    0.5-1.0 ****************
    1.0-1.5 *************
    1.5-2.0 **********
    2.0-2.5 ********
    2.5-3.0 ******
    3.0-3.5 *****
    3.5-4.0 ****
    4.0-4.5 ***
    4.5-5.0 **
    5.0-5.5 **
    5.5-6.0 *
    6.0-6.5 *
    6.5-7.0
    7.0-7.5
    7.5-8.0
```

### Links externos

[Weisstein, Eric W. "Gamma Distribution."](<https://mathworld.wolfram.com/GammaDistribution.html>) De MathWorld — Um Recurso Web da Wolfram.
---