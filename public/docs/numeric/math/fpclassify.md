# std::fpclassify

```cpp
Definido no header `<cmath>`
  // (1)
int fpclassify( float num );
int fpclassify( double num );
int fpclassify( long double num );  // (desde C++11)
(ate C++23)
constexpr int fpclassify( /* floating-point-type */ num );  // (desde C++23)
Sobrecargas adicionais
Definido no header `<cmath>`
```

```cpp
template< class Integer >
int fpclassify( Integer num );  // (desde C++11)
(constexpr desde C++23)
```

1) Categoriza o valor de ponto flutuante num nas seguintes categorias: zero, subnormal, normal, infinito, NAN, ou categoria definida pela implementação. A biblioteca fornece sobrecargas de `std::fpclassify` para todos os tipos de ponto flutuante cv-unqualified como o tipo do parâmetro num.(desde C++23)

A) Sobrecargas adicionais são fornecidas para todos os tipos inteiros, que são tratados como double.

### Parâmetros

- **num** — valor de ponto flutuante ou inteiro

### Valor de retorno

um de [FP_INFINITE](<#/doc/numeric/math/FP_categories>), [FP_NAN](<#/doc/numeric/math/FP_categories>), [FP_NORMAL](<#/doc/numeric/math/FP_categories>), [FP_SUBNORMAL](<#/doc/numeric/math/FP_categories>), [FP_ZERO](<#/doc/numeric/math/FP_categories>) ou tipo definido pela implementação, especificando a categoria de num.

### Notas

As sobrecargas adicionais não são obrigadas a ser fornecidas exatamente como (A). Elas apenas precisam ser suficientes para garantir que, para seu argumento num de tipo inteiro, std::fpclassify(num) tenha o mesmo efeito que std::fpclassify(static_cast&lt;double&gt;(num)).

### Exemplo

Execute este código
```cpp
    #include <cfloat>
    #include <cmath>
    #include <iostream>
     
    auto show_classification(double x)
    {
        switch (std::fpclassify(x))
        {
            case FP_INFINITE:
                return "Inf";
            case FP_NAN:
                return "NaN";
            case FP_NORMAL:
                return "normal";
            case FP_SUBNORMAL:
                return "subnormal";
            case FP_ZERO:
                return "zero";
            default:
                return "unknown";
        }
    }
     
    int main()
    {
        std::cout << "1.0/0.0 is " << show_classification(1 / 0.0) << '\n'
                  << "0.0/0.0 is " << show_classification(0.0 / 0.0) << '\n'
                  << "DBL_MIN/2 is " << show_classification(DBL_MIN / 2) << '\n'
                  << "-0.0 is " << show_classification(-0.0) << '\n'
                  << "1.0 is " << show_classification(1.0) << '\n';
    }
```

Saída:
```
    1.0/0.0 is Inf
    0.0/0.0 is NaN
    DBL_MIN/2 is subnormal
    -0.0 is zero
    1.0 is normal
```

### Ver também

[ isfinite](<#/doc/numeric/math/isfinite>)(C++11) | verifica se o número dado tem valor finito
(função)
[ isinf](<#/doc/numeric/math/isinf>)(C++11) | verifica se o número dado é infinito
(função)
[ isnan](<#/doc/numeric/math/isnan>)(C++11) | verifica se o número dado é NaN
(função)
[ isnormal](<#/doc/numeric/math/isnormal>)(C++11) | verifica se o número dado é normal
(função)
[ numeric_limits](<#/doc/types/numeric_limits>) | fornece uma interface para consultar propriedades de todos os tipos numéricos fundamentais
(modelo de classe)
[C documentation](<#/>) para fpclassify