# std::isless

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
bool isless( float x, float y );
bool isless( double x, double y );
bool isless( long double x, long double y );
(até C++23)
constexpr bool isless( /* floating-point-type */ x,
/* floating-point-type */ y );
Sobrecargas adicionais
Definido no cabeçalho `<cmath>`
template< class Arithmetic1, class Arithmetic2 >
bool isless( Arithmetic1 x, Arithmetic2 y );
(constexpr desde C++23)
```

1) Determina se o número de ponto flutuante x é menor que o número de ponto flutuante y, sem definir exceções de ponto flutuante. A biblioteca fornece sobrecargas para todos os tipos de ponto flutuante cv-unqualified como o tipo dos parâmetros x e y. (desde C++23)

A) Sobrecargas adicionais são fornecidas para todas as outras combinações de tipos aritméticos.

### Parâmetros

- **x, y** — valores de ponto flutuante ou inteiros

### Valor de retorno

true se x < y, false caso contrário.

### Notas

O operador< embutido para números de ponto flutuante pode levantar [FE_INVALID](<#/doc/numeric/fenv/FE_exceptions>) se um ou ambos os argumentos forem NaN. Esta função é uma versão "silenciosa" do operador<.

As sobrecargas adicionais não são obrigadas a ser fornecidas exatamente como (A). Elas apenas precisam ser suficientes para garantir que, para seu primeiro argumento num1 e segundo argumento num2:

*   Se num1 ou num2 tiver o tipo long double, então std::isless(num1, num2) tem o mesmo efeito que std::isless(static_cast&lt;long double&gt;(num1),
    static_cast<long double>(num2)).
*   Caso contrário, se num1 e/ou num2 tiver o tipo double ou um tipo inteiro, então std::isless(num1, num2) tem o mesmo efeito que std::isless(static_cast&lt;double&gt;(num1),
    static_cast<double>(num2)).
*   Caso contrário, se num1 ou num2 tiver o tipo float, então std::isless(num1, num2) tem o mesmo efeito que std::isless(static_cast&lt;float&gt;(num1),
    static_cast<float>(num2)).

| (até C++23)
Se num1 e num2 tiverem tipos aritméticos, então std::isless(num1, num2) tem o mesmo efeito que std::isless(static_cast</*common-floating-point-type*/>(num1),
static_cast</*common-floating-point-type*/>(num2)), onde /*common-floating-point-type*/ é o tipo de ponto flutuante com o maior [rank de conversão de ponto flutuante](<#/doc/language/usual_arithmetic_conversions>) e maior [subrank de conversão de ponto flutuante](<#/doc/language/usual_arithmetic_conversions>) entre os tipos de num1 e num2, argumentos de tipo inteiro são considerados como tendo o mesmo rank de conversão de ponto flutuante que double. Se nenhum tipo de ponto flutuante com o maior rank e subrank existir, então a [resolução de sobrecarga](<#/doc/language/overload_resolution>) não resulta em um candidato utilizável das sobrecargas fornecidas. | (desde C++23)

### Veja também

[ less](<#/doc/utility/functional/less>) | objeto de função que implementa x < y
(class template)
[ isgreater](<#/doc/numeric/math/isgreater>)(C++11) | verifica se o primeiro argumento de ponto flutuante é maior que o segundo
(função)
[documentação C](<#/>) para isless