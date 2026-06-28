# NAN

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
#define NAN /*implementation defined*/
```

A macro `NAN` se expande para uma expressão constante do tipo float que avalia para um valor quiet not-a-number (QNaN). Se a implementação não suportar QNaNs, esta macro constante não é definida.

### Notas

Existem muitos valores NaN diferentes, diferenciados por seus payloads e seus bits de sinal. O conteúdo do payload e o bit de sinal do NaN gerado pela macro `NAN` são definidos pela implementação.

### Veja também

[ nannanfnanl](<#/doc/numeric/math/nan.2>)(C++11)(C++11)(C++11) | not-a-number (NaN)
(função)
[ isnan](<#/doc/numeric/math/isnan>)(C++11) | verifica se o número dado é NaN
(função)
[ has_quiet_NaN](<#/doc/types/numeric_limits/has_quiet_NaN>)[static] | identifica tipos de ponto flutuante que podem representar o valor especial "quiet not-a-number" (NaN)
(membro constante estático público de `std::numeric_limits<T>`)
[ has_signaling_NaN](<#/doc/types/numeric_limits/has_signaling_NaN>)[static] | identifica tipos de ponto flutuante que podem representar o valor especial "signaling not-a-number" (NaN)
(membro constante estático público de `std::numeric_limits<T>`)
[ quiet_NaN](<#/doc/types/numeric_limits/quiet_NaN>)[static] | retorna um valor quiet NaN do tipo de ponto flutuante dado
(função membro estática pública de `std::numeric_limits<T>`)
[ signaling_NaN](<#/doc/types/numeric_limits/signaling_NaN>)[static] | retorna um valor signaling NaN do tipo de ponto flutuante dado
(função membro estática pública de `std::numeric_limits<T>`)
[Documentação C](<#/>) para NAN