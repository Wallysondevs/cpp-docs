# std::mul_sat

Definido no cabeçalho `[<numeric>](<#/doc/header/numeric>)`

```c
template< class T >
constexpr T mul_sat( T x, T y ) noexcept;
```

Calcula a multiplicação [saturante](<https://en.wikipedia.org/wiki/Saturation_arithmetic> "enwiki:Saturation arithmetic") x × y. Esta operação (ao contrário das [operações aritméticas em inteiros](<#/doc/language/operator_arithmetic>) embutidas) se comporta como se fosse uma operação matemática com um range _infinito_. Seja `_q_` o resultado de tal operação. Retorna:

* `_q_`, se `_q_` for representável como um valor do tipo `T`. Caso contrário,
* o maior ou menor valor do tipo `T`, o que estiver mais próximo de `_q_`.

Esta sobrecarga participa da resolução de sobrecarga apenas se `T` for um [tipo inteiro](<#/doc/language/types>), ou seja: signed char, short, int, long, long long, um tipo inteiro assinado estendido, ou uma versão unsigned de tais tipos. Em particular, `T` não deve ser (possivelmente cv-qualified) bool, char, wchar_t, char8_t, char16_t, e char32_t, pois esses tipos não são destinados para aritmética.

### Parâmetros

- **x, y** — valores inteiros

### Valor de retorno

x × y saturado.

### Notas

Ao contrário dos operadores aritméticos embutidos em inteiros, a [promoção integral](<#/doc/language/implicit_cast>) não se aplica aos argumentos x e y.

Se dois argumentos de tipos diferentes forem passados, a chamada falha na compilação, ou seja, o comportamento relativo à [dedução de argumento de template](<#/doc/language/template_argument_deduction>) é o mesmo que para [std::min](<#/doc/algorithm/min>) ou [std::max](<#/doc/algorithm/max>).

A maioria das arquiteturas de hardware modernas possui suporte eficiente para aritmética de saturação em vetores SIMD, incluindo SSE2 para x86 e NEON para ARM.

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_saturation_arithmetic`](<#/doc/feature_test>) | [`202311L`](<#/>) | (C++26) | Aritmética de saturação

### Possível implementação

Veja [libstdc++ (gcc)](<https://github.com/gcc-mirror/gcc/tree/master/libstdc%2B%2B-v3/include/bits/sat_arith.h#L42>).

### Exemplo

Pode ser visualizado no [Compiler Explorer](<https://godbolt.org/z/T58GEKPM6>).

Execute este código
```cpp
    #include <climits>
    #include <numeric>
    
    static_assert
    (""
        && (std::mul_sat<int>(2, 3) == 6) // not saturated
        && (std::mul_sat<int>(INT_MAX / 2, 3) == INT_MAX) // saturated
        && (std::mul_sat<int>(-2, 3) == -6) // not saturated
        && (std::mul_sat<int>(INT_MIN / -2, -3) == INT_MIN) // saturated
        && (std::mul_sat<unsigned>(2, 3) == 6) // not saturated
        && (std::mul_sat<unsigned>(UINT_MAX / 2, 3) == UINT_MAX) // saturated
    );
    
    int main() {}
```

### Veja também

[ add_sat](<#/doc/numeric/add_sat>)(C++26) | operação de adição saturante em dois inteiros
(function template)
[ sub_sat](<#/doc/numeric/sub_sat>)(C++26) | operação de subtração saturante em dois inteiros
(function template)
[ div_sat](<#/doc/numeric/div_sat>)(C++26) | operação de divisão saturante em dois inteiros
(function template)
[ saturate_cast](<#/doc/numeric/saturate_cast>)(C++26) | retorna um valor inteiro limitado ao range de outro tipo inteiro
(function template)
[ clamp](<#/doc/algorithm/clamp>)(C++17) | limita um valor entre um par de valores de limite
(function template)
[ in_range](<#/doc/utility/in_range>)(C++20) | verifica se um valor inteiro está no range de um dado tipo inteiro
(function template)
[ min](<#/doc/types/numeric_limits/min>)[static] | retorna o menor valor finito do tipo não-ponto-flutuante dado, ou o menor valor normal positivo do tipo ponto-flutuante dado
(public static member function of `std::numeric_limits<T>`)
[ max](<#/doc/types/numeric_limits/max>)[static] | retorna o maior valor finito do tipo dado
(public static member function of `std::numeric_limits<T>`)

### Links externos

1. | [Uma implementação sem ramificações de aritmética de saturação](<http://locklessinc.com/articles/sat_arithmetic/>) — Locklessinc.com, 2012
---|---
2. | [C++ Weekly - Ep 459 - C++26's Saturating Math Operations](<https://youtu.be/XNMnQOFrEIY>) — Youtube.com, 2024-12-16