# Biblioteca numérica

A biblioteca numérica C++ inclui funções e tipos matemáticos comuns, bem como arrays numéricos otimizados e suporte para geração de números aleatórios.

## Funções e tipos matemáticos

### [Funções matemáticas comuns](<#/doc/numeric/math>)

O header [`<cmath>`](<#/doc/header/cmath>) fornece [funções matemáticas da biblioteca padrão C](<#/doc/numeric/math>) como [std::fabs](<#/doc/numeric/math/fabs>), [std::sqrt](<#/doc/numeric/math/sqrt>), e [std::sin](<#/doc/numeric/math/sin>).

### [Funções matemáticas especiais](<#/doc/numeric/special_functions>) (desde C++17)

O header [`<cmath>`](<#/doc/header/cmath>) também fornece várias funções matemáticas especiais como [std::beta](<#/doc/numeric/special_functions/beta>), [std::hermite](<#/doc/numeric/special_functions/hermite>), e [std::cyl_bessel_i](<#/doc/numeric/special_functions/cyl_bessel_i>).

### [Constantes matemáticas](<#/doc/numeric/constants>) (desde C++20)

O header [`<numbers>`](<#/doc/header/numbers>) fornece várias constantes matemáticas, como [std::numbers::pi](<#/doc/numeric/constants>) ou [std::numbers::sqrt2](<#/doc/numeric/constants>).

### [Algoritmos básicos de álgebra linear](<#/doc/numeric/linalg>) (desde C++26)

O header [`<linalg>`](<#/doc/header/linalg>) fornece algoritmos básicos de álgebra linear que são baseados em BLAS.

### [Tipos de paralelismo de dados](<#/doc/numeric/simd>) (desde C++26)

O header [`<simd>`](<#/doc/header/simd>) fornece tipos portáteis para declarar explicitamente o paralelismo de dados e estruturar dados para um acesso SIMD mais eficiente.

### Aritmética de números complexos

Definido no header `[<complex>](<#/doc/header/complex>)`
---
[ complex](<#/doc/numeric/complex>) | um tipo de número complexo
(modelo de classe)

### Arrays numéricos

Definido no header `[<valarray>](<#/doc/header/valarray>)`
---
[ valarray](<#/doc/numeric/valarray>) | arrays numéricos, máscaras de array e fatias de array
(modelo de classe)

## Algoritmos numéricos

O header [`<numeric>`](<#/doc/header/numeric>) fornece os algoritmos numéricos abaixo:

### Operações de fatoração (desde C++17)

Definido no header `[<numeric>](<#/doc/header/numeric>)`
---
[ gcd](<#/doc/numeric/gcd>)(C++17) | calcula o maior divisor comum de dois inteiros
(modelo de função)
[ lcm](<#/doc/numeric/lcm>)(C++17) | calcula o mínimo múltiplo comum de dois inteiros
(modelo de função)

### Operações de interpolação (C++20)

Definido no header `[<numeric>](<#/doc/header/numeric>)`
---
[ midpoint](<#/doc/numeric/midpoint>)(C++20) | ponto médio entre dois números ou ponteiros
(modelo de função)
Definido no header `[<cmath>](<#/doc/header/cmath>)`

```cpp
 lerp(C++20)
(função)
```

### Aritmética de saturação (desde C++26)

Definido no header `[<numeric>](<#/doc/header/numeric>)`
---
[ add_sat](<#/doc/numeric/add_sat>)(C++26) | operação de adição com saturação em dois inteiros
(modelo de função)
[ sub_sat](<#/doc/numeric/sub_sat>)(C++26) | operação de subtração com saturação em dois inteiros
(modelo de função)
[ mul_sat](<#/doc/numeric/mul_sat>)(C++26) | operação de multiplicação com saturação em dois inteiros
(modelo de função)
[ div_sat](<#/doc/numeric/div_sat>)(C++26) | operação de divisão com saturação em dois inteiros
(modelo de função)
[ saturate_cast](<#/doc/numeric/saturate_cast>)(C++26) | retorna um valor inteiro limitado ao range de outro tipo inteiro
(modelo de função)

### Operações numéricas

Definido no header `[<numeric>](<#/doc/header/numeric>)`
---
[ iota](<#/doc/algorithm/iota>)(C++11) | preenche um range com incrementos sucessivos do valor inicial
(modelo de função)
[ ranges::iota](<#/doc/algorithm/ranges/iota>)(C++23) | preenche um range com incrementos sucessivos do valor inicial
(objeto de função de algoritmo)
[ accumulate](<#/doc/algorithm/accumulate>) | soma ou "dobra" (folds) um range de elementos
(modelo de função)
[ reduce](<#/doc/algorithm/reduce>)(C++17) | similar a [std::accumulate](<#/doc/algorithm/accumulate>), mas fora de ordem
(modelo de função)
[ transform_reduce](<#/doc/algorithm/transform_reduce>)(C++17) | aplica um invocável, então reduz fora de ordem
(modelo de função)
[ inner_product](<#/doc/algorithm/inner_product>) | calcula o produto interno de dois ranges de elementos
(modelo de função)
[ adjacent_difference](<#/doc/algorithm/adjacent_difference>) | calcula as diferenças entre elementos adjacentes em um range
(modelo de função)
[ partial_sum](<#/doc/algorithm/partial_sum>) | calcula a soma parcial de um range de elementos
(modelo de função)
[ inclusive_scan](<#/doc/algorithm/inclusive_scan>)(C++17) | similar a [std::partial_sum](<#/doc/algorithm/partial_sum>), inclui o i-ésimo elemento de entrada na i-ésima soma
(modelo de função)
[ exclusive_scan](<#/doc/algorithm/exclusive_scan>)(C++17) | similar a [std::partial_sum](<#/doc/algorithm/partial_sum>), exclui o i-ésimo elemento de entrada da i-ésima soma
(modelo de função)
[ transform_inclusive_scan](<#/doc/algorithm/transform_inclusive_scan>)(C++17) | aplica um invocável, então calcula o scan inclusivo
(modelo de função)
[ transform_exclusive_scan](<#/doc/algorithm/transform_exclusive_scan>)(C++17) | aplica um invocável, então calcula o scan exclusivo
(modelo de função)

## Diversos

### [Geração de números pseudoaleatórios](<#/doc/numeric/random>)

O header [`<random>`](<#/doc/header/random>) define [geradores de números pseudoaleatórios e distribuições numéricas](<#/doc/numeric/random>). O header [`<cstdlib>`](<#/doc/header/cstdlib>) também inclui geração de números aleatórios no estilo C via [std::srand](<#/doc/numeric/random/srand>) e [std::rand](<#/doc/numeric/random/rand>).

### [Ambiente de ponto flutuante](<#/doc/numeric/fenv>) (desde C++11)

O header [`<cfenv>`](<#/doc/header/cfenv>) define [flags e funções relacionadas a estados excepcionais de ponto flutuante](<#/doc/numeric/fenv>), como overflow e divisão por zero.

### [Manipulação de bits](<#/doc/utility/bit>) (desde C++20)

O header [`<bit>`](<#/doc/header/bit>) fornece vários modelos de função para acessar, manipular e processar bits individuais e sequências de bits. A ordem de bytes ([endianness](<#/doc/types/endian>)) de tipos escalares pode ser inspecionada através da facilidade [std::endian](<#/doc/types/endian>).

### Veja também

[Documentação C](<#/>) para Numéricos
---