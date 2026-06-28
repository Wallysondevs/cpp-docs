# Geração de números pseudoaleatórios

A biblioteca de números aleatórios fornece classes que geram números aleatórios e pseudoaleatórios. Essas classes incluem:

*   Geradores uniformes de bits aleatórios (URBGs), que incluem tanto *random number engines*, que são geradores de números pseudoaleatórios que geram sequências de inteiros com uma distribuição uniforme, quanto geradores de números aleatórios verdadeiros (se disponíveis).
*   Distribuições de números aleatórios (por exemplo, [uniforme](<#/doc/numeric/random/uniform_int_distribution>), [normal](<#/doc/numeric/random/normal_distribution>), ou [distribuições de Poisson](<#/doc/numeric/random/poisson_distribution>)) que convertem a saída de URBGs em várias distribuições estatísticas.

URBGs e distribuições são projetados para serem usados juntos para produzir valores aleatórios. Todos os *random number engines* podem ser especificamente semeados, serializados e desserializados para uso com simuladores repetíveis.

### Geradores uniformes de bits aleatórios

Um *uniform random bit generator* é um *function object* que retorna valores inteiros sem sinal, de modo que cada valor no intervalo de resultados possíveis tenha (idealmente) igual probabilidade de ser retornado.

Todos os *uniform random bit generators* atendem aos requisitos de [UniformRandomBitGenerator](<#/doc/named_req/UniformRandomBitGenerator>). C++20 também define um *concept* [`uniform_random_bit_generator`](<#/doc/numeric/random/UniformRandomBitGenerator>).

Definido no header `[<random>](<#/doc/header/random>)`
---
[ uniform_random_bit_generator](<#/doc/numeric/random/UniformRandomBitGenerator>)(desde C++20) | especifica que um tipo se qualifica como um *uniform random bit generator*
(concept)

### Random number engines

Um *random number engine* (comumente abreviado para *engine*) é um *uniform random bit generator* que gera números pseudoaleatórios usando dados de semente como fonte de entropia.

A qualquer momento, um *engine* `e` do tipo `E` possui um estado `e`i para algum inteiro não negativo `i`. Após a construção, `e` possui um estado inicial `e`0, que é determinado pelos parâmetros do *engine* e por uma semente inicial (ou sequência de sementes).

As seguintes propriedades são sempre definidas para qualquer tipo de *engine* `E`:

*   O *tamanho* do estado de `E` em múltiplos do tamanho de `E::result_type` (ou seja, (sizeof `e`i) / sizeof(E::result_type)).
*   O *algoritmo de transição* TA pelo qual o estado `e`i de `e` é avançado para seu estado sucessor `e`i+1 (ou seja, TA(`e`i) == `e`i+1).
*   O *algoritmo de geração* GA pelo qual o estado de `e` é mapeado para um valor do tipo `E::result_type`, o resultado é um número pseudoaleatório.

Uma sequência de números pseudoaleatórios pode ser gerada chamando TA e GA alternadamente.

A *standard library* fornece as implementações de três classes diferentes de algoritmos de geração de números pseudoaleatórios como *class templates*, para que os algoritmos possam ser personalizados. A escolha de qual *engine* usar envolve uma série de *trade-offs*:

*   O [linear congruential engine](<#/doc/numeric/random/linear_congruential_engine>) é moderadamente rápido e tem um requisito de armazenamento de estado muito pequeno.
*   O [Mersenne twister engine](<#/doc/numeric/random/mersenne_twister_engine>) é mais lento e tem maiores requisitos de armazenamento de estado, mas com os parâmetros certos possui a sequência não repetitiva mais longa com as características espectrais mais desejáveis (para uma dada definição de desejável).
*   O [subtract with carry engine](<#/doc/numeric/random/subtract_with_carry_engine>) é muito rápido mesmo em processadores sem conjuntos de instruções aritméticas avançadas, à custa de maior armazenamento de estado e, às vezes, características espectrais menos desejáveis.

*   O [Philox engine](<#/doc/numeric/random/philox_engine>) é um [gerador de números aleatórios baseado em contador](<https://en.wikipedia.org/wiki/counter-based_random_number_generator> "enwiki:counter-based random number generator"). Ele tem um estado pequeno e um longo período (não inferior a 2^130) e é destinado ao uso em simulações de Monte-Carlo que exigem geração de números aleatórios massivamente paralela. É facilmente vetorizado e paralelizado e é implementado em bibliotecas otimizadas para GPU.

| (desde C++26)

Nenhum desses *random number engines* é [criptograficamente seguro](<https://en.wikipedia.org/wiki/Cryptographically_secure_pseudorandom_number_generator> "enwiki:Cryptographically secure pseudorandom number generator"). Assim como em qualquer operação segura, uma biblioteca de criptografia deve ser usada para esse fim (por exemplo, [OpenSSL `RAND_bytes`](<https://www.openssl.org/docs/manmaster/man3/RAND_bytes.html>)).

Todos os tipos instanciados a partir desses *templates* atendem aos requisitos de [RandomNumberEngine](<#/doc/named_req/RandomNumberEngine>).

Definido no header `[<random>](<#/doc/header/random>)`
---
[ linear_congruential_engine](<#/doc/numeric/random/linear_congruential_engine>)(desde C++11) | implementa o algoritmo [linear congruential](<https://en.wikipedia.org/wiki/Linear_congruential_generator> "enwiki:Linear congruential generator")
(class template)
[ mersenne_twister_engine](<#/doc/numeric/random/mersenne_twister_engine>)(desde C++11) | implementa o algoritmo [Mersenne twister](<https://en.wikipedia.org/wiki/Mersenne_twister> "enwiki:Mersenne twister")
(class template)
[ subtract_with_carry_engine](<#/doc/numeric/random/subtract_with_carry_engine>)(desde C++11) | implementa um algoritmo *subtract-with-carry* ([Fibonacci atrasado](<https://en.wikipedia.org/wiki/Lagged_Fibonacci_generator> "enwiki:Lagged Fibonacci generator"))
(class template)
[ philox_engine](<#/doc/numeric/random/philox_engine>)(desde C++26) | um gerador paralelizado baseado em contador
(class template)

### Adaptadores de random number engine

Adaptadores de *random number engine* geram números pseudoaleatórios usando outro *random number engine* como fonte de entropia. Eles são geralmente usados para alterar as características espectrais do *engine* subjacente.

Definido no header `[<random>](<#/doc/header/random>)`
---
[ discard_block_engine](<#/doc/numeric/random/discard_block_engine>)(desde C++11) | descarta parte da saída de um *random number engine*
(class template)
[ independent_bits_engine](<#/doc/numeric/random/independent_bits_engine>)(desde C++11) | empacota a saída de um *random number engine* em blocos de um número especificado de bits
(class template)
[ shuffle_order_engine](<#/doc/numeric/random/shuffle_order_engine>)(desde C++11) | entrega a saída de um *random number engine* em uma ordem diferente
(class template)

### Geradores de números aleatórios predefinidos

Vários algoritmos populares específicos são predefinidos.

Definido no header `[<random>](<#/doc/header/random>)`
---
Tipo | Definição
---|---
`minstd_rand0` (desde C++11) | [std::linear_congruential_engine](<#/doc/numeric/random/linear_congruential_engine>)<[std::uint_fast32_t](<#/doc/types/integer>),
` `16807, 0, 2147483647>
Descoberto em 1969 por Lewis, Goodman e Miller, adotado como "Padrão mínimo" em 1988 por Park e Miller
`minstd_rand` (desde C++11) | [std::linear_congruential_engine](<#/doc/numeric/random/linear_congruential_engine>)<[std::uint_fast32_t](<#/doc/types/integer>),
` `48271, 0, 2147483647>
"Padrão mínimo" mais recente, recomendado por Park, Miller e Stockmeyer em 1993
`mt19937` (desde C++11) | [std::mersenne_twister_engine](<#/doc/numeric/random/mersenne_twister_engine>)<[std::uint_fast32_t](<#/doc/types/integer>),
` `32, 624, 397, 31,
` `0x9908b0df, 11,
` `0xffffffff, 7,
` `0x9d2c5680, 15,
` `0xefc60000, 18, 1812433253>
Mersenne Twister de 32 bits por Matsumoto e Nishimura, 1998
`mt19937_64` (desde C++11) | [std::mersenne_twister_engine](<#/doc/numeric/random/mersenne_twister_engine>)<[std::uint_fast64_t](<#/doc/types/integer>),
` `64, 312, 156, 31,
` `0xb5026f5aa96619e9, 29,
` `0x5555555555555555, 17,
` `0x71d67fffeda60000, 37,
` `0xfff7eee000000000, 43,
` `6364136223846793005>
Mersenne Twister de 64 bits por Matsumoto e Nishimura, 2000
`ranlux24_base` (desde C++11) | [std::subtract_with_carry_engine](<#/doc/numeric/random/subtract_with_carry_engine>)<[std::uint_fast32_t](<#/doc/types/integer>), 24, 10, 24>
---|---
`ranlux48_base` (desde C++11) | [std::subtract_with_carry_engine](<#/doc/numeric/random/subtract_with_carry_engine>)<[std::uint_fast64_t](<#/doc/types/integer>), 48, 5, 12>
`ranlux24` (desde C++11) | [std::discard_block_engine](<#/doc/numeric/random/discard_block_engine>)<[std::ranlux24_base](<#/doc/numeric/random/subtract_with_carry_engine>), 223, 23>
Gerador RANLUX de 24 bits por Martin Lüscher e Fred James, 1994
`ranlux48` (desde C++11) | [std::discard_block_engine](<#/doc/numeric/random/discard_block_engine>)<[std::ranlux48_base](<#/doc/numeric/random/subtract_with_carry_engine>), 389, 11>
Gerador RANLUX de 48 bits por Martin Lüscher e Fred James, 1994
`knuth_b` (desde C++11) | [std::shuffle_order_engine](<#/doc/numeric/random/shuffle_order_engine>)<[std::minstd_rand0](<#/doc/numeric/random/linear_congruential_engine>), 256>
---|---
`philox4x32` (desde C++26) | [std::philox_engine](<#/doc/numeric/random/philox_engine>)<[std::uint_fast32_t](<#/doc/types/integer>), 32, 4, 10,
` `0xD2511F53, 0x9E3779B9,
` `0xCD9E8D57, 0xBB67AE85>
`philox4x64` (desde C++26) | [std::philox_engine](<#/doc/numeric/random/philox_engine>)<[std::uint_fast64_t](<#/doc/types/integer>), 64, 4, 10,
` `0xD2E7470EE14C6C93, 0x9E3779B97F4A7C15,
` `0xCA5A826395121157, 0xBB67AE8584CAA73B>
`default_random_engine` (desde C++11) | _definido pela implementação_

### Números aleatórios não determinísticos

[std::random_device](<#/doc/numeric/random/random_device>) é um *uniform random bit generator* não determinístico, embora as implementações possam implementar [std::random_device](<#/doc/numeric/random/random_device>) usando um *pseudo-random number engine* se não houver suporte para geração de números aleatórios não determinísticos.

[ random_device](<#/doc/numeric/random/random_device>)(desde C++11) | gerador de números aleatórios não determinístico usando fonte de entropia de hardware
(class)

### Distribuições de números aleatórios

Uma distribuição de números aleatórios pós-processa a saída de um URBG de tal forma que a saída resultante é distribuída de acordo com uma função de densidade de probabilidade estatística definida.

As distribuições de números aleatórios satisfazem [RandomNumberDistribution](<#/doc/named_req/RandomNumberDistribution>).

Definido no header `[<random>](<#/doc/header/random>)`
---

##### Distribuições uniformes

[ uniform_int_distribution](<#/doc/numeric/random/uniform_int_distribution>)(desde C++11) | produz valores inteiros uniformemente distribuídos em um intervalo
(class template)
[ uniform_real_distribution](<#/doc/numeric/random/uniform_real_distribution>)(desde C++11) | produz valores reais uniformemente distribuídos em um intervalo
(class template)

##### Distribuições de Bernoulli

[ bernoulli_distribution](<#/doc/numeric/random/bernoulli_distribution>)(desde C++11) | produz valores booleanos em uma [distribuição de Bernoulli](<https://en.wikipedia.org/wiki/Bernoulli_distribution> "enwiki:Bernoulli distribution")
(class)
[ binomial_distribution](<#/doc/numeric/random/binomial_distribution>)(desde C++11) | produz valores inteiros em uma [distribuição binomial](<https://en.wikipedia.org/wiki/Binomial_distribution> "enwiki:Binomial distribution")
(class template)
[ negative_binomial_distribution](<#/doc/numeric/random/negative_binomial_distribution>)(desde C++11) | produz valores inteiros em uma [distribuição binomial negativa](<https://en.wikipedia.org/wiki/Negative_binomial_distribution> "enwiki:Negative binomial distribution")
(class template)
[ geometric_distribution](<#/doc/numeric/random/geometric_distribution>)(desde C++11) | produz valores inteiros em uma [distribuição geométrica](<https://en.wikipedia.org/wiki/Geometric_distribution> "enwiki:Geometric distribution")
(class template)

##### Distribuições de Poisson

[ poisson_distribution](<#/doc/numeric/random/poisson_distribution>)(desde C++11) | produz valores inteiros em uma [distribuição de Poisson](<https://en.wikipedia.org/wiki/Poisson_distribution> "enwiki:Poisson distribution")
(class template)
[ exponential_distribution](<#/doc/numeric/random/exponential_distribution>)(desde C++11) | produz valores reais em uma [distribuição exponencial](<https://en.wikipedia.org/wiki/Exponential_distribution> "enwiki:Exponential distribution")
(class template)
[ gamma_distribution](<#/doc/numeric/random/gamma_distribution>)(desde C++11) | produz valores reais em uma [distribuição gama](<https://en.wikipedia.org/wiki/Gamma_distribution> "enwiki:Gamma distribution")
(class template)
[ weibull_distribution](<#/doc/numeric/random/weibull_distribution>)(desde C++11) | produz valores reais em uma [distribuição de Weibull](<https://en.wikipedia.org/wiki/Weibull_distribution> "enwiki:Weibull distribution")
(class template)
[ extreme_value_distribution](<#/doc/numeric/random/extreme_value_distribution>)(desde C++11) | produz valores reais em uma [distribuição de valor extremo](<https://en.wikipedia.org/wiki/Generalized_extreme_value_distribution> "enwiki:Generalized extreme value distribution")
(class template)

##### Distribuições normais

[ normal_distribution](<#/doc/numeric/random/normal_distribution>)(desde C++11) | produz valores reais em uma [distribuição normal padrão (Gaussiana)](<https://en.wikipedia.org/wiki/Normal_distribution> "enwiki:Normal distribution")
(class template)
[ lognormal_distribution](<#/doc/numeric/random/lognormal_distribution>)(desde C++11) | produz valores reais em uma [distribuição log-normal](<https://en.wikipedia.org/wiki/Lognormal_distribution> "enwiki:Lognormal distribution")
(class template)
[ chi_squared_distribution](<#/doc/numeric/random/chi_squared_distribution>)(desde C++11) | produz valores reais em uma [distribuição qui-quadrado](<https://en.wikipedia.org/wiki/Chi-squared_distribution> "enwiki:Chi-squared distribution")
(class template)
[ cauchy_distribution](<#/doc/numeric/random/cauchy_distribution>)(desde C++11) | produz valores reais em uma [distribuição de Cauchy](<https://en.wikipedia.org/wiki/Cauchy_distribution> "enwiki:Cauchy distribution")
(class template)
[ fisher_f_distribution](<#/doc/numeric/random/fisher_f_distribution>)(desde C++11) | produz valores reais em uma [distribuição F de Fisher](<https://en.wikipedia.org/wiki/F-distribution> "enwiki:F-distribution")
(class template)
[ student_t_distribution](<#/doc/numeric/random/student_t_distribution>)(desde C++11) | produz valores reais em uma [distribuição t de Student](<https://en.wikipedia.org/wiki/Student%27s_t-distribution> "enwiki:Student's t-distribution")
(class template)

##### Distribuições de amostragem

[ discrete_distribution](<#/doc/numeric/random/discrete_distribution>)(desde C++11) | produz valores inteiros em uma distribuição discreta
(class template)
[ piecewise_constant_distribution](<#/doc/numeric/random/piecewise_constant_distribution>)(desde C++11) | produz valores reais distribuídos em subintervalos constantes
(class template)
[ piecewise_linear_distribution](<#/doc/numeric/random/piecewise_linear_distribution>)(desde C++11) | produz valores reais distribuídos em subintervalos definidos
(class template)

### Utilitários

Definido no header `[<random>](<#/doc/header/random>)`
---
[ generate_canonical](<#/doc/numeric/random/generate_canonical>)(desde C++11) | distribui uniformemente valores reais de uma dada precisão no intervalo `[`​0​`, `1`)`
(function template)
[ seed_seq](<#/doc/numeric/random/seed_seq>)(desde C++11) | gerador de sequência de sementes embaralhadas de propósito geral que elimina viés
(class)

### Algoritmos de números aleatórios

Definido no header `[<random>](<#/doc/header/random>)`
---
[ ranges::generate_random](<#/doc/algorithm/ranges/generate_random>)(desde C++26) | preenche um *range* com números aleatórios de um *uniform random bit generator*
(algorithm function object)

### Biblioteca C de números aleatórios

Além dos *engines* e distribuições descritos acima, as funções e constantes da biblioteca C de números aleatórios também estão disponíveis, embora não sejam recomendadas:

Definido no header `[<cstdlib>](<#/doc/header/cstdlib>)`
---
[ rand](<#/doc/numeric/random/rand>) | gera um número pseudoaleatório
(function)
[ srand](<#/doc/numeric/random/srand>) | semeia o gerador de números pseudoaleatórios
(function)
[ RAND_MAX](<#/doc/numeric/random/RAND_MAX>) | valor máximo possível gerado por [std::rand](<#/doc/numeric/random/rand>)
(macro constant)

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
        // Semeia com um valor aleatório real, se disponível
        std::random_device r;
    
        // Escolhe uma média aleatória entre 1 e 6
        std::default_random_engine e1(r());
        std::uniform_int_distribution<int> uniform_dist(1, 6);
        int mean = uniform_dist(e1);
        std::cout << "Média escolhida aleatoriamente: " << mean << '\n';
    
        // Gera uma distribuição normal em torno dessa média
        std::seed_seq seed2{r(), r(), r(), r(), r(), r(), r(), r()};
        std::mt19937 e2(seed2);
        std::normal_distribution<> normal_dist(mean, 2);
    
        std::map<int, int> hist;
        for (int n = 0; n != 10000; ++n)
            ++hist[std::round(normal_dist(e2))];
    
        std::cout << "Distribuição normal em torno de " << mean << ":\n"
                  << std::fixed << std::setprecision(1);
        for (auto [x, y] : hist)
            std::cout << std::setw(2) << x << ' ' << std::string(y / 200, '*') << '\n';
    }
```

Saída possível:
```
    Randomly-chosen mean: 4
    Normal distribution around 4:
    -4
    -3
    -2
    -1
     0 *
     1 ***
     2 ******
     3 ********
     4 *********
     5 ********
     6 ******
     7 ***
     8 *
     9
    10
    11
    12
```

### Veja também

[Documentação C](<#/>) para Geração de números pseudoaleatórios
---