# std::sub_sat

Definido no cabeçalho `[<numeric>](<#/doc/header/numeric>)`

```c
template< class T >
constexpr T sub_sat( T x, T y ) noexcept;
```

Calcula a [subtração com saturação](<https://en.wikipedia.org/wiki/Saturation_arithmetic> "enwiki:Saturation arithmetic") x - y. Esta operação (ao contrário das [operações aritméticas em inteiros](<#/doc/language/operator_arithmetic>) embutidas) comporta-se como se fosse uma operação matemática com um intervalo _infinito_. Seja `_q_` o resultado de tal operação. Retorna:

*   `_q_`, se `_q_` for representável como um valor do tipo `T`. Caso contrário,
*   o maior ou menor valor do tipo `T`, o que estiver mais próximo de `_q_`.

Esta sobrecarga participa da resolução de sobrecarga apenas se `T` for um [tipo inteiro](<#/doc/language/types>), ou seja: signed char, short, int, long, long long, um tipo inteiro assinado estendido, ou uma versão sem sinal de tais tipos. Em particular, `T` não deve ser (possivelmente cv-qualified) bool, char, wchar_t, char8_t, char16_t, e char32_t, pois esses tipos não são destinados para aritmética.

### Parâmetros

- **x, y** — valores inteiros

### Valor de retorno

x - y saturado.

### Observações

Ao contrário dos operadores aritméticos embutidos em inteiros, a [promoção integral](<#/doc/language/implicit_cast>) não se aplica aos argumentos x e y.

Se dois argumentos de tipos diferentes forem passados, a chamada falha na compilação, ou seja, o comportamento em relação à [dedução de argumento de template](<#/doc/language/template_argument_deduction>) é o mesmo que para [std::min](<#/doc/algorithm/min>) ou [std::max](<#/doc/algorithm/max>).

A maioria das arquiteturas de hardware modernas possui suporte eficiente para aritmética de saturação em vetores SIMD, incluindo SSE2 para x86 e NEON para ARM.

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_saturation_arithmetic`](<#/doc/feature_test>) | [`202311L`](<#/>) | (C++26) | Aritmética de saturação

### Implementação possível

Veja [libstdc++ (gcc)](<https://github.com/gcc-mirror/gcc/tree/master/libstdc%2B%2B-v3/include/bits/sat_arith.h#L42>).

### Exemplo

Pode ser visualizado no [Compiler Explorer](<https://godbolt.org/z/WfP56eeK6>)

Execute este código
```cpp
    #include <climits>
    #include <numeric>
    
    static_assert
    (""
        && (std::sub_sat<int>(INT_MIN + 4, 3) == INT_MIN + 1) // não saturado
        && (std::sub_sat<int>(INT_MIN + 4, 5) == INT_MIN) // saturado
        && (std::sub_sat<int>(INT_MAX - 4, -3) == INT_MAX - 1) // não saturado
        && (std::sub_sat<int>(INT_MAX - 4, -5) == INT_MAX) // saturado
        && (std::sub_sat<unsigned>(4, 3) == 1) // não saturado
        && (std::sub_sat<unsigned>(4, 5) == 0) // saturado
    );
    
    int main() {}
```

### Veja também

[ add_sat](<#/doc/numeric/add_sat>)(C++26) | operação de adição com saturação em dois inteiros
(modelo de função)
[ mul_sat](<#/doc/numeric/mul_sat>)(C++26) | operação de multiplicação com saturação em dois inteiros
(modelo de função)
[ div_sat](<#/doc/numeric/div_sat>)(C++26) | operação de divisão com saturação em dois inteiros
(modelo de função)
[ saturate_cast](<#/doc/numeric/saturate_cast>)(C++26) | retorna um valor inteiro limitado ao intervalo de outro tipo inteiro
(modelo de função)
[ clamp](<#/doc/algorithm/clamp>)(C++17) | limita um valor entre um par de valores de limite
(modelo de função)
[ in_range](<#/doc/utility/in_range>)(C++20) | verifica se um valor inteiro está no intervalo de um determinado tipo inteiro
(modelo de função)
[ min](<#/doc/types/numeric_limits/min>)[static] | retorna o menor valor finito do tipo não-ponto-flutuante fornecido, ou o menor valor normal positivo do tipo ponto-flutuante fornecido
(função membro estática pública de `std::numeric_limits<T>`)
[ max](<#/doc/types/numeric_limits/max>)[static] | retorna o maior valor finito do tipo fornecido
(função membro estática pública de `std::numeric_limits<T>`)

### Links externos

1\. | [Uma implementação de aritmética de saturação sem ramificação](<http://locklessinc.com/articles/sat_arithmetic/>) — Locklessinc.com, 2012
---|---
2\. | [C++ Weekly - Ep 459 - C++26's Saturating Math Operations](<https://youtu.be/XNMnQOFrEIY>) — Youtube.com, 2024-12-16