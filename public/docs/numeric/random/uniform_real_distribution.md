# std::uniform_real_distribution

Definido no cabeçalho `[<random>](<#/doc/header/random>)`

```c
template< class RealType = double >
class uniform_real_distribution;
```

Produz valores de ponto flutuante aleatórios \\(\small x\\)x, uniformemente distribuídos no intervalo \\(\small [a, b)\\)[a, b), ou seja, distribuídos de acordo com a função densidade de probabilidade:

    \\({\small P(x|a,b) =} \frac{1}{b-a}\\)P(x|a,b) = 1
---
b − a
.

`std::uniform_real_distribution` satisfaz todos os requisitos de [RandomNumberDistribution](<#/doc/named_req/RandomNumberDistribution>).

### Parâmetros de template

- **RealType** — O tipo de resultado gerado pelo gerador. O efeito é indefinido se este não for um de float, double ou long double.

### Tipos de membro

Tipo de membro | Definição
---|---
`result_type`(C++11) | RealType
`param_type` (C++11) | o tipo do conjunto de parâmetros, veja [RandomNumberDistribution](<#/doc/named_req/RandomNumberDistribution>).

### Funções membro

[ (constructor)](<#/doc/numeric/random/uniform_real_distribution/uniform_real_distribution>)(C++11) | constrói uma nova distribuição
(função membro pública)
[ reset](<#/doc/numeric/random/uniform_real_distribution/reset>)(C++11) | reinicia o estado interno da distribuição
(função membro pública)

##### Geração

[ operator()](<#/>)(C++11) | gera o próximo número aleatório na distribuição
(função membro pública)

##### Características

[ ab](<#/doc/numeric/random/uniform_real_distribution/params>)(C++11) | retorna os parâmetros da distribuição
(função membro pública)
[ param](<#/doc/numeric/random/uniform_real_distribution/param>)(C++11) | obtém ou define o objeto de parâmetro da distribuição
(função membro pública)
[ min](<#/doc/numeric/random/uniform_real_distribution/min>)(C++11) | retorna o valor mínimo potencialmente gerado
(função membro pública)
[ max](<#/doc/numeric/random/uniform_real_distribution/max>)(C++11) | retorna o valor máximo potencialmente gerado
(função membro pública)

### Funções não-membro

[ operator==operator!=](<#/doc/numeric/random/uniform_real_distribution/operator_cmp>)(C++11)(C++11)(removido em C++20) | compara dois objetos de distribuição
(função)
[ operator<&lt;operator&gt;>](<#/doc/numeric/random/uniform_real_distribution/operator_ltltgtgt>)(C++11) | realiza entrada e saída de stream em distribuição de números pseudoaleatórios
(template de função)

### Notas

É difícil criar uma distribuição sobre o intervalo fechado \\(\small[a, b]\\)[a, b] a partir desta distribuição. Usar [std::nextafter](<#/doc/numeric/math/nextafter>)(b, [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;RealType&gt;::max()) como o segundo parâmetro nem sempre funciona devido a erros de arredondamento.

A maioria das implementações existentes possui um bug onde elas podem ocasionalmente retornar \\(\small b\\)b ([GCC #63176](<https://gcc.gnu.org/bugzilla/show_bug.cgi?id=63176>) [LLVM #18767](<https://llvm.org/bugs/show_bug.cgi?id=18767>) [MSVC STL #1074](<https://github.com/microsoft/STL/issues/1074>)). Originalmente, pensava-se que isso só acontecia quando `RealType` é float e quando o problema [LWG issue 2524](<https://cplusplus.github.io/LWG/issue2524>) está presente, mas desde então foi demonstrado que [nenhum dos dois é necessário para acionar o bug](<https://hal.science/hal-03282794v4/file/rand-in-range.pdf>).

### Exemplo

Imprime 10 números aleatórios entre 1 e 2.

Execute este código
```cpp
    #include <iostream>
    #include <random>
     
    int main()
    {
        std::random_device rd;  // Será usado para obter uma semente para o motor de números aleatórios
        std::mt19937 gen(rd()); // mersenne_twister_engine padrão semeado com rd()
        std::uniform_real_distribution<> dis(1.0, 2.0);
        for (int n = 0; n < 10; ++n)
            // Use dis para transformar o unsigned int aleatório gerado por gen em um 
            // double em [1, 2). Cada chamada para dis(gen) gera um novo double aleatório.
            std::cout << dis(gen) << ' ';
        std::cout << '\n';
    }
```

Saída possível:
```
    1.80829 1.15391 1.18483 1.38969 1.36094 1.0648 1.97798 1.27984 1.68261 1.57326
```

### Links externos

[Gerando números de ponto flutuante aleatórios a partir de um intervalo](<https://hal.science/hal-03282794v4/file/rand-in-range.pdf>) — © 2022. Frédéric Goualard, Université de Nantes.
---