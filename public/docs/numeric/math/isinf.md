# std::isinf

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
bool isinf( float num );
bool isinf( double num );
bool isinf( long double num );
(até C++23)
constexpr bool isinf( /*floating-point-type*/ num );
Sobrecarga SIMD (desde C++26)
Definido no cabeçalho `<simd>`
template< /*math-floating-point*/ V >
constexpr typename /*deduced-simd-t*/<V>::mask_type
isinf ( const V& v_num );
Sobrecargas adicionais
Definido no cabeçalho `<cmath>`
template< class Integer >
bool isinf( Integer num );
(constexpr desde C++23)
```

1) Determina se o número de ponto flutuante `num` fornecido é um infinito positivo ou negativo. A biblioteca fornece sobrecargas para todos os tipos de ponto flutuante cv-unqualified como o tipo do parâmetro `num`. (desde C++23)

S) A sobrecarga SIMD executa um `std::isinf` elemento a elemento em `v_num`.

(Veja [`_math-floating-point_`](<#/doc/numeric/simd>) e [`_deduced-simd-t_`](<#/doc/numeric/simd>) para suas definições.)
| (desde C++26)

A) Sobrecargas adicionais são fornecidas para todos os tipos inteiros, que são tratados como double.

### Parâmetros

- **num** — valor de ponto flutuante ou inteiro
- **v_num** — um objeto data-parallel da especialização `std::basic_simd` onde seu tipo de elemento é um tipo de ponto flutuante

### Valor de retorno

1) `true` se `num` for infinito, `false` caso contrário.

S) Um objeto de máscara data-parallel onde o i-ésimo elemento é igual a `true` se `v_num[i]` for infinito ou `false` caso contrário para todo `i` no intervalo `[`​0​`, `v_num.size()`)`.

### Notas

[GCC](<https://gcc.gnu.org/wiki/FloatingPointMath>) e [Clang](<https://clang.llvm.org/docs/UsersManual.html#controlling-floating-point-behavior>) suportam uma opção `-ffinite-math` (adicionalmente implicada por `-ffast-math`), que permite ao compilador respectivo assumir a não existência de valores especiais de ponto flutuante IEEE-754 como NaN, infinito ou zero negativo. Em outras palavras, `std::isinf` é assumido como sempre retornando `false` sob esta opção.

As sobrecargas adicionais não são obrigadas a ser fornecidas exatamente como (A). Elas só precisam ser suficientes para garantir que, para seu argumento `num` de tipo inteiro, `std::isinf(num)` tenha o mesmo efeito que `std::isinf(static_cast<double>(num))`.

### Exemplo

Execute este código
```cpp
    #include <cfloat>
    #include <cmath>
    #include <iostream>
    #include <limits>
    
    int main()
    {
        const double max = std::numeric_limits<double>::max();
        const double inf = std::numeric_limits<double>::infinity();
    
        std::cout << std::boolalpha
                  << "isinf(NaN) = " << std::isinf(NAN) << '\n'
                  << "isinf(Inf) = " << std::isinf(INFINITY) << '\n'
                  << "isinf(max) = " << std::isinf(max) << '\n'
                  << "isinf(inf) = " << std::isinf(inf) << '\n'
                  << "isinf(0.0) = " << std::isinf(0.0) << '\n'
                  << "isinf(exp(800)) = " << std::isinf(std::exp(800)) << '\n'
                  << "isinf(DBL_MIN/2.0) = " << std::isinf(DBL_MIN / 2.0) << '\n';
    }
```

Saída:
```
    isinf(NaN) = false
    isinf(Inf) = true
    isinf(max) = false
    isinf(inf) = true
    isinf(0.0) = false
    isinf(exp(800)) = true
    isinf(DBL_MIN/2.0) = false
```

### Veja também

[ fpclassify](<#/doc/numeric/math/fpclassify>)(desde C++11) | categoriza o valor de ponto flutuante fornecido
(função)
[ isfinite](<#/doc/numeric/math/isfinite>)(desde C++11) | verifica se o número fornecido tem valor finito
(função)
[ isnan](<#/doc/numeric/math/isnan>)(desde C++11) | verifica se o número fornecido é NaN
(função)
[ isnormal](<#/doc/numeric/math/isnormal>)(desde C++11) | verifica se o número fornecido é normal
(função)
[Documentação C](<#/>) para isinf