# INFINITY

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
#define INFINITY /*implementation defined*/
```

Se a implementação suporta infinitos de ponto flutuante, a macro `INFINITY` se expande para uma expressão constante do tipo float que avalia para infinito positivo ou não-assinado.

Se a implementação não suporta infinitos de ponto flutuante, a macro `INFINITY` se expande para um valor positivo que é garantido que cause um overflow em um float em tempo de compilação, e o uso desta macro gera um aviso do compilador.

### Veja também

[ isinf](<#/doc/numeric/math/isinf>)(C++11) | verifica se o número dado é infinito
(função)
[ HUGE_VALFHUGE_VALHUGE_VALL](<#/doc/numeric/math/HUGE_VAL>)(C++11)(C++11) | indica o valor de overflow para float, double e long double, respectivamente
(macro constante)
[ has_infinity](<#/doc/types/numeric_limits/has_infinity>)[static] | identifica tipos de ponto flutuante que podem representar o valor especial "infinito positivo"
(membro constante estático público de `std::numeric_limits<T>`)
[ infinity](<#/doc/types/numeric_limits/infinity>)[static] | retorna o valor de infinito positivo do tipo de ponto flutuante dado
(função membro estática pública de `std::numeric_limits<T>`)
[documentação C](<#/>) para INFINITY