# std::isnan

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
bool isnan( float num );
bool isnan( double num );
bool isnan( long double num );
(até C++23)
constexpr bool isnan( /*floating-point-type*/ num );
Sobrecarga SIMD (desde C++26)
Definido no cabeçalho `<simd>`
template< /*math-floating-point*/ V >
constexpr typename /*deduced-simd-t*/<V>::mask_type
isnan ( const V& v_num );
Sobrecargas adicionais
Definido no cabeçalho `<cmath>`
template< class Integer >
bool isnan( Integer num );
(constexpr desde C++23)
```

1) Determina se o número de ponto flutuante `num` fornecido é um valor "não é um número" (NaN). A biblioteca fornece sobrecargas para todos os tipos de ponto flutuante cv-unqualified como o tipo do parâmetro `num`.(desde C++23)

S) A sobrecarga SIMD executa um `std::isnan` elemento a elemento em `v_num`.

(Veja [`_math-floating-point_`](<#/doc/numeric/simd>) e [`_deduced-simd-t_`](<#/doc/numeric/simd>) para suas definições.)
| (desde C++26)

A) Sobrecargas adicionais são fornecidas para todos os tipos inteiros, que são tratados como `double`.

### Parâmetros

- **num** — valor de ponto flutuante ou inteiro
- **v_num** — um objeto data-parallel da especialização `std::basic_simd` onde seu tipo de elemento é um tipo de ponto flutuante

### Valor de retorno

1) `true` se `num` for um NaN, `false` caso contrário.

S) Um objeto de máscara data-parallel onde o i-ésimo elemento é igual a `true` se `v_num[i]` for um NaN ou `false` caso contrário para todo `i` no intervalo `[`​0​`, `v_num.size()`)`.

### Notas

Existem muitos valores NaN diferentes com diferentes bits de sinal e payloads, veja [std::nan](<#/doc/numeric/math/nan.2>) e [std::numeric_limits::quiet_NaN](<#/doc/types/numeric_limits/quiet_NaN>).

Valores NaN nunca se comparam como iguais a si mesmos ou a outros valores NaN. Copiar um NaN não é exigido, pelo IEEE-754, para preservar sua representação de bits (sinal e [payload](<#/doc/numeric/math/nan.2>)), embora a maioria das implementações o faça.

Outra maneira de testar se um valor de ponto flutuante é NaN é compará-lo consigo mesmo: `bool is_nan(double x) { return x != x; }`.

[GCC](<https://gcc.gnu.org/wiki/FloatingPointMath>) e [Clang](<https://clang.llvm.org/docs/UsersManual.html#controlling-floating-point-behavior>) suportam uma opção `-ffinite-math` (adicionalmente implicada por `-ffast-math`), que permite ao respectivo compilador assumir a não existência de valores especiais de ponto flutuante IEEE-754 como NaN, infinito ou zero negativo. Em outras palavras, `std::isnan` é assumido como sempre retornando `false` sob esta opção.

As sobrecargas adicionais não são exigidas para serem fornecidas exatamente como (A). Elas apenas precisam ser suficientes para garantir que, para seu argumento `num` de tipo inteiro, `std::isnan(num)` tenha o mesmo efeito que `std::isnan(static_cast<double>(num))`.

### Exemplo

Execute este código
```cpp
    #include <cfloat>
    #include <cmath>
    #include <iostream>
    
    int main()
    {
        std::cout << std::boolalpha
                  << "isnan(NaN) = " << std::isnan(NAN) << '\n'
                  << "isnan(Inf) = " << std::isnan(INFINITY) << '\n'
                  << "isnan(0.0) = " << std::isnan(0.0) << '\n'
                  << "isnan(DBL_MIN/2.0) = " << std::isnan(DBL_MIN / 2.0) << '\n'
                  << "isnan(0.0 / 0.0)   = " << std::isnan(0.0 / 0.0) << '\n'
                  << "isnan(Inf - Inf)   = " << std::isnan(INFINITY - INFINITY) << '\n';
    }
```

Saída:
```
    isnan(NaN) = true
    isnan(Inf) = false
    isnan(0.0) = false
    isnan(DBL_MIN/2.0) = false
    isnan(0.0 / 0.0)   = true
    isnan(Inf - Inf)   = true
```

### Veja também

[ nannanfnanl](<#/doc/numeric/math/nan.2>)(C++11)(C++11)(C++11) | não é um número (NaN)
(função)
[ fpclassify](<#/doc/numeric/math/fpclassify>)(C++11) | categoriza o valor de ponto flutuante fornecido
(função)
[ isfinite](<#/doc/numeric/math/isfinite>)(C++11) | verifica se o número fornecido tem valor finito
(função)
[ isinf](<#/doc/numeric/math/isinf>)(C++11) | verifica se o número fornecido é infinito
(função)
[ isnormal](<#/doc/numeric/math/isnormal>)(C++11) | verifica se o número fornecido é normal
(função)
[ isunordered](<#/doc/numeric/math/isunordered>)(C++11) | verifica se dois valores de ponto flutuante são não ordenados
(função)
[Documentação C](<#/>) para isnan