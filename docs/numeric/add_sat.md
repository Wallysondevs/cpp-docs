# std::add_sat

Definido no header `[<numeric>](<#/doc/header/numeric>)`

```cpp
template< class T >
constexpr T add_sat( T x, T y ) noexcept;  // (desde C++26)
```

Calcula a adição [saturante](<https://en.wikipedia.org/wiki/Saturation_arithmetic> "enwiki:Saturation arithmetic") x + y. Esta operação (ao contrário das [operações aritméticas em inteiros](<#/doc/language/operator_arithmetic>) embutidas) comporta-se como se fosse uma operação matemática com um range _infinito_. Seja `_q_` o resultado de tal operação. Retorna:

* `_q_`, se `_q_` for representável como um valor do tipo `T`. Caso contrário,
* o maior ou menor valor do tipo `T`, o que estiver mais próximo de `_q_`.

Esta sobrecarga participa da resolução de sobrecarga apenas se `T` for um [tipo inteiro](<#/doc/language/types>), ou seja: signed char, short, int, long, long long, um tipo inteiro assinado estendido, ou uma versão unsigned de tais tipos. Em particular, `T` não deve ser (possivelmente cv-qualified) bool, char, wchar_t, char8_t, char16_t, e char32_t, pois esses tipos não são destinados para aritmética.

### Parâmetros

- **x, y** — valores inteiros

### Valor de retorno

x + y saturado.

### Notas

Ao contrário dos operadores aritméticos embutidos em inteiros, a [promoção integral](<#/doc/language/implicit_cast>) não se aplica aos argumentos x e y.

Se dois argumentos de tipos diferentes forem passados, a chamada falha na compilação, ou seja, o comportamento relativo à [dedução de argumentos de template](<#/doc/language/template_argument_deduction>) é o mesmo que para [std::min](<#/doc/algorithm/min>) ou [std::max](<#/doc/algorithm/max>).

A maioria das arquiteturas de hardware modernas possui suporte eficiente para aritmética de saturação em vetores SIMD, incluindo SSE2 para x86 e NEON para ARM.

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_saturation_arithmetic`](<#/doc/feature_test>) | [`202311L`](<#/>) | (C++26) | Aritmética de saturação

### Possível implementação

Veja [libstdc++ (gcc)](<https://github.com/gcc-mirror/gcc/tree/master/libstdc%2B%2B-v3/include/bits/sat_arith.h#L42>).

### Exemplo

Pode ser visualizado no [Compiler Explorer](<https://godbolt.org/z/G6o9ajz6d>).

Execute este código
```cpp
    #include <climits>
    #include <limits>
    #include <numeric>
    
    static_assert(CHAR_BIT == 8);
    static_assert(UCHAR_MAX == 255);
    
    int main()
    {
        constexpr int a = std::add_sat(3, 4); // no saturation occurs, T = int
        static_assert(a == 7);
    
        constexpr unsigned char b = std::add_sat<unsigned char>(UCHAR_MAX, 4); // saturated
        static_assert(b == UCHAR_MAX);
    
        constexpr unsigned char c = std::add_sat(UCHAR_MAX, 4); // not saturated, T = int
            // add_sat(int, int) returns int tmp == 259,
            // then assignment truncates 259 % 256 == 3
        static_assert(c == 3);
    
    //  unsigned char d = std::add_sat(252, c); // Error: inconsistent deductions for T
    
        constexpr unsigned char e = std::add_sat<unsigned char>(251, a); // saturated
        static_assert(e == UCHAR_MAX);
            // 251 is of type T = unsigned char, `a` is converted to unsigned char value;
            // might yield an int -> unsigned char conversion warning for `a`
    
        constexpr signed char f = std::add_sat<signed char>(-123, -3); // not saturated
        static_assert(f == -126);
    
        constexpr signed char g = std::add_sat<signed char>(-123, -13); // saturated
        static_assert(g == std::numeric_limits<signed char>::min()); // g == -128
    }
```

### Veja também

[ sub_sat](<#/doc/numeric/sub_sat>)(C++26) | operação de subtração saturante em dois inteiros
(modelo de função)
[ mul_sat](<#/doc/numeric/mul_sat>)(C++26) | operação de multiplicação saturante em dois inteiros
(modelo de função)
[ div_sat](<#/doc/numeric/div_sat>)(C++26) | operação de divisão saturante em dois inteiros
(modelo de função)
[ saturate_cast](<#/doc/numeric/saturate_cast>)(C++26) | retorna um valor inteiro limitado ao range de outro tipo inteiro
(modelo de função)
[ clamp](<#/doc/algorithm/clamp>)(C++17) | limita um valor entre um par de valores de limite
(modelo de função)
[ in_range](<#/doc/utility/in_range>)(C++20) | verifica se um valor inteiro está no range de um dado tipo inteiro
(modelo de função)
[ min](<#/doc/types/numeric_limits/min>)[static] | retorna o menor valor finito do tipo não-ponto-flutuante dado, ou o menor valor normal positivo do tipo ponto-flutuante dado
(função membro estática pública de `std::numeric_limits<T>`)
[ max](<#/doc/types/numeric_limits/max>)[static] | retorna o maior valor finito do tipo dado
(função membro estática pública de `std::numeric_limits<T>`)

### Links externos

1\. | [Uma implementação de aritmética de saturação sem ramificações](<http://locklessinc.com/articles/sat_arithmetic/>) — Locklessinc.com, 2012
---|---
2\. | [C++ Weekly - Ep 459 - C++26's Saturating Math Operations](<https://youtu.be/XNMnQOFrEIY>) — Youtube.com, 2024-12-16