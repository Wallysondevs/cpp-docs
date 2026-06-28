# FP_NORMAL, FP_SUBNORMAL, FP_ZERO, FP_INFINITE, FP_NAN

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
#define FP_NORMAL /* implementation defined */
#define FP_SUBNORMAL /* implementation defined */
#define FP_ZERO /* implementation defined */
#define FP_INFINITE /* implementation defined */
#define FP_NAN /* implementation defined */
```

As macros `FP_NORMAL`, `FP_SUBNORMAL`, `FP_ZERO`, `FP_INFINITE`, `FP_NAN` representam cada uma uma categoria distinta de números de ponto flutuante. Todas elas se expandem para uma expressão constante inteira.

Constante | Explicação
---|---
`FP_NORMAL` | indica que o valor é _normal_, ou seja, não é um infinito, subnormal, não-número ou zero
`FP_SUBNORMAL` | indica que o valor é _subnormal_
`FP_ZERO` | indica que o valor é zero positivo ou negativo
`FP_INFINITE` | indica que o valor não é representável pelo tipo subjacente (infinito positivo ou negativo)
`FP_NAN` | indica que o valor é um não-número (NaN)

### Exemplo

Run this code
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

Output:
```
    1.0/0.0 is Inf
    0.0/0.0 is NaN
    DBL_MIN/2 is subnormal
    -0.0 is zero
    1.0 is normal
```

### Veja também

[ fpclassify](<#/doc/numeric/math/fpclassify>)(desde C++11) | categoriza o valor de ponto flutuante fornecido
(função)
[C documentation](<#/>) for FP_categories