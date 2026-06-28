# std::isgreater

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
bool isgreater( float x, float y );
bool isgreater( double x, double y );
bool isgreater( long double x, long double y );
(até C++23)
constexpr bool isgreater( /* floating-point-type */ x,
/* floating-point-type */ y );
Sobrecargas adicionais
Definido no cabeçalho `<cmath>`
template< class Arithmetic1, class Arithmetic2 >
bool isgreater( Arithmetic1 x, Arithmetic2 y );
(constexpr desde C++23)
```

  
1) Determina se o número de ponto flutuante x é maior que o número de ponto flutuante y, sem definir exceções de ponto flutuante. A biblioteca fornece sobrecargas para todos os tipos de ponto flutuante cv-unqualified como o tipo dos parâmetros x e y.(desde C++23)

A) Sobrecargas adicionais são fornecidas para todas as outras combinações de tipos aritméticos.

### Parâmetros

x, y  |  \-  |  valores de ponto flutuante ou inteiros   
  
### Valor de retorno

true se x > y, false caso contrário. 

### Observações

O operador `>` embutido para números de ponto flutuante pode definir [FE_INVALID](<#/doc/numeric/fenv/FE_exceptions>) se um ou ambos os argumentos forem NaN. Esta função é uma versão "silenciosa" do operador `>`. 

As sobrecargas adicionais não são obrigadas a ser fornecidas exatamente como em (A). Elas só precisam ser suficientes para garantir que, para o primeiro argumento num1 e o segundo argumento num2: 

  * Se num1 ou num2 tiver o tipo long double, então std::isgreater(num1, num2) tem o mesmo efeito que std::isgreater(static_cast&lt;long double&gt;(num1),  
static_cast&lt;long double&gt;(num2)). 
  * Caso contrário, se num1 e/ou num2 tiver o tipo double ou um tipo inteiro, então std::isgreater(num1, num2) tem o mesmo efeito que std::isgreater(static_cast&lt;double&gt;(num1),  
static_cast&lt;double&gt;(num2)). 
  * Caso contrário, se num1 ou num2 tiver o tipo float, então std::isgreater(num1, num2) tem o mesmo efeito que std::isgreater(static_cast&lt;float&gt;(num1),  
static_cast&lt;float&gt;(num2)). 

| (até C++23)  
Se num1 e num2 tiverem tipos aritméticos, então std::isgreater(num1, num2) tem o mesmo efeito que std::isgreater(static_cast</*common-floating-point-type*/>(num1),  
static_cast</*common-floating-point-type*/>(num2)), onde /*common-floating-point-type*/ é o tipo de ponto flutuante com o maior [rank de conversão de ponto flutuante](<#/doc/language/usual_arithmetic_conversions>) e maior [subrank de conversão de ponto flutuante](<#/doc/language/usual_arithmetic_conversions>) entre os tipos de num1 e num2, argumentos de tipo inteiro são considerados como tendo o mesmo rank de conversão de ponto flutuante que double. Se nenhum tipo de ponto flutuante com o maior rank e subrank existir, então a [resolução de sobrecarga](<#/doc/language/overload_resolution>) não resulta em um candidato utilizável a partir das sobrecargas fornecidas.  | (desde C++23)  
  
### Veja também

[ greater](<#/doc/utility/functional/greater>) |  objeto de função que implementa x > y   
(modelo de classe)  
[ isless](<#/doc/numeric/math/isless>)(C++11) |  verifica se o primeiro argumento de ponto flutuante é menor que o segundo   
(função)  
[documentação C](<#/>) para isgreater