# std::div_sat

Definido no cabeçalho `[<numeric>](<#/doc/header/numeric>)`

```c
template< class T >
constexpr T div_sat( T x, T y ) noexcept;
```

Calcula a divisão [de saturação](<https://en.wikipedia.org/wiki/Saturation_arithmetic> "enwiki:Saturation arithmetic") x / y. Se `T` é um tipo inteiro com sinal, x é o menor (mais negativo) valor de `T`, e y == -1, retorna o maior valor de `T`; caso contrário, retorna x / y.

y não deve ser ​0​, caso contrário o comportamento é indefinido. A chamada de função não é uma [expressão constante central](<#/doc/language/constant_expression>) se ocorrer comportamento indefinido.

Esta sobrecarga participa da resolução de sobrecarga apenas se `T` for um [tipo inteiro](<#/doc/language/types>), ou seja: signed char, short, int, long, long long, um tipo inteiro com sinal estendido, ou uma versão sem sinal de tais tipos. Em particular, `T` não deve ser (possivelmente cv-qualificado) bool, char, wchar_t, char8_t, char16_t, e char32_t, pois esses tipos não são destinados para aritmética.

### Parâmetros

- **x, y** — valores inteiros

### Valor de retorno

x / y saturado.

### Observações

Ao contrário dos operadores aritméticos embutidos em inteiros, a [promoção integral](<#/doc/language/implicit_cast>) não se aplica aos argumentos x e y.

Se dois argumentos de tipos diferentes forem passados, a chamada falha na compilação, ou seja, o comportamento relativo à [dedução de argumento de template](<#/doc/language/template_argument_deduction>) é o mesmo que para [std::min](<#/doc/algorithm/min>) ou [std::max](<#/doc/algorithm/max>).

A maioria das arquiteturas de hardware modernas possui suporte eficiente para aritmética de saturação em vetores SIMD, incluindo SSE2 para x86 e NEON para ARM.

Macro de teste de funcionalidade | Valor | Std | Funcionalidade
---|---|---|---
[`__cpp_lib_saturation_arithmetic`](<#/doc/feature_test>) | [`202311L`](<#/>) | (C++26) | Aritmética de saturação

### Possível implementação
```cpp
    namespace detail {
    template<class T>
    concept standard_or_extended_integral =
         std::is_integral_v<T> &&
        !std::is_same_v<std::remove_cv_t<T>, bool> &&
        !std::is_same_v<std::remove_cv_t<T>, char> &&
        !std::is_same_v<std::remove_cv_t<T>, char8_t> &&
        !std::is_same_v<std::remove_cv_t<T>, char16_t> &&
        !std::is_same_v<std::remove_cv_t<T>, char32_t> &&
        !std::is_same_v<std::remove_cv_t<T>, wchar_t>;
    } // namespace detail
    
    template<detail::standard_or_extended_integral T>
    constexpr T div_sat( T x, T y ) noexcept
    {
        if constexpr (std::is_signed_v<T>)
            if (x == std::numeric_limits<T>::min() && y == -1)
                return std::numeric_limits<T>::max();
        return x / y;
    }
```

---

### Exemplo

Pode ser visualizado no [Compiler Explorer](<https://godbolt.org/z/vvsTa6e3j>).

Execute este código
```cpp
    #include <climits>
    #include <numeric>
    
    static_assert
    (""
        && (std::div_sat<int>(6, 3) == 2) // not saturated
        && (std::div_sat<int>(INT_MIN, -1) == INT_MAX) // saturated
        && (std::div_sat<unsigned>(6, 3) == 2) // not saturated
    );
    
    int main() {}
```

### Ver também

[ add_sat](<#/doc/numeric/add_sat>)(C++26) | operação de adição de saturação em dois inteiros
(modelo de função)
[ sub_sat](<#/doc/numeric/sub_sat>)(C++26) | operação de subtração de saturação em dois inteiros
(modelo de função)
[ mul_sat](<#/doc/numeric/mul_sat>)(C++26) | operação de multiplicação de saturação em dois inteiros
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

1. | [Uma implementação sem ramificações de aritmética de saturação](<http://locklessinc.com/articles/sat_arithmetic/>) — Locklessinc.com, 2012
---|---
2. | [C++ Weekly - Ep 459 - C++26's Saturating Math Operations](<https://youtu.be/XNMnQOFrEIY>) — Youtube.com, 2024-12-16