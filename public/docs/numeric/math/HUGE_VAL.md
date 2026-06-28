# HUGE_VALF, HUGE_VAL, HUGE_VALL

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
#define HUGE_VALF /* implementation defined */
#define HUGE_VAL /* implementation defined */
#define HUGE_VALL /* implementation defined */
```

As macros HUGE_VALF, HUGE_VAL e HUGE_VALL expandem para expressões constantes de ponto flutuante positivas que se comparam igualmente aos valores retornados por funções e operadores de ponto flutuante em caso de estouro (overflow) (veja [math_errhandling](<#/doc/numeric/math/math_errhandling>)).

Constante | Explicação
---|---
`HUGE_VALF` | Expande para uma expressão float positiva que indica estouro (overflow)
`HUGE_VAL` | Expande para uma expressão double positiva que indica estouro (overflow), não necessariamente representável como um float
`HUGE_VALL` | Expande para uma expressão long double positiva que indica estouro (overflow), não necessariamente representável como um float ou double

Em implementações que suportam infinitos de ponto flutuante, estas macros sempre expandem para os infinitos positivos de float, double e long double, respectivamente.

### Notas

Em implementações que não suportam infinitos de ponto flutuante, estas macros expandem para o número finito máximo de seus respectivos tipos.

C++98 adicionou sobrecargas float e long double de funções matemáticas. Há um problema de que as sobrecargas float não podem retornar HUGE_VAL para indicar estouro (overflow) porque esta macro não é garantida como representável como um float.

[LWG issue 357](<https://cplusplus.github.io/LWG/issue357>) foi levantado para abordar este problema. O LWG descobriu que C99 tem o mesmo problema (sobrecargas float e long double também foram adicionadas em C99), e C99 introduziu novas macros HUGE_VALF e HUGE_VALL para resolver o problema. Portanto, o problema foi encerrado e a resolução C99 foi adotada em C++11.

### Veja também

[ INFINITY](<#/doc/numeric/math/INFINITY>)(C++11) | avalia para infinito positivo ou o valor garantido para causar estouro (overflow) em um float
(macro constante)
[C documentation](<#/>) para HUGE_VAL