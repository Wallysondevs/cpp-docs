# std::isunordered

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
bool isunordered( float x, float y );
bool isunordered( double x, double y );
bool isunordered( long double x, long double y );
(até C++23)
constexpr bool isunordered( /* floating-point-type */ x,
/* floating-point-type */ y );
Sobrecargas adicionais
Definido no cabeçalho `<cmath>`
template< class Arithmetic1, class Arithmetic2 >
bool isunordered( Arithmetic1 x, Arithmetic2 y );
(constexpr desde C++23)
```

1) Determina se os números de ponto flutuante x e y são não ordenados, isto é, um ou ambos são NaN e, portanto, não podem ser comparados significativamente entre si. A biblioteca fornece sobrecargas para todos os tipos de ponto flutuante cv-unqualified como o tipo dos parâmetros x e y. (desde C++23)

A) Sobrecargas adicionais são fornecidas para todas as outras combinações de tipos aritméticos.

### Parâmetros

- **x, y** — valores de ponto flutuante ou inteiros

### Valor de retorno

true se x ou y for NaN, false caso contrário.

### Observações

As sobrecargas adicionais não precisam ser fornecidas exatamente como (A). Elas só precisam ser suficientes para garantir que, para o primeiro argumento num1 e o segundo argumento num2:

*   Se num1 ou num2 tiver o tipo long double, então std::isunordered(num1, num2) tem o mesmo efeito que std::isunordered(static_cast&lt;long double&gt;(num1),
    static_cast<long double>(num2)).
*   Caso contrário, se num1 e/ou num2 tiver o tipo double ou um tipo inteiro, então std::isunordered(num1, num2) tem o mesmo efeito que std::isunordered(static_cast&lt;double&gt;(num1),
    static_cast<double>(num2)).
*   Caso contrário, se num1 ou num2 tiver o tipo float, então std::isunordered(num1, num2) tem o mesmo efeito que std::isunordered(static_cast&lt;float&gt;(num1),
    static_cast<float>(num2)).

| (até C++23)
Se num1 e num2 tiverem tipos aritméticos, então std::isunordered(num1, num2) tem o mesmo efeito que std::isunordered(static_cast</*common-floating-point-type*/>(num1),
static_cast</*common-floating-point-type*/>(num2)), onde /*common-floating-point-type*/ é o tipo de ponto flutuante com a maior [classificação de conversão de ponto flutuante](<#/doc/language/usual_arithmetic_conversions>) e a maior [subclassificação de conversão de ponto flutuante](<#/doc/language/usual_arithmetic_conversions>) entre os tipos de num1 e num2, argumentos de tipo inteiro são considerados como tendo a mesma classificação de conversão de ponto flutuante que double. Se nenhum tipo de ponto flutuante com a maior classificação e subclassificação existir, então a [resolução de sobrecarga](<#/doc/language/overload_resolution>) não resulta em um candidato utilizável das sobrecargas fornecidas. | (desde C++23)

### Exemplo

Execute este código
```cpp
    #include <cmath>
    #include <iostream>
     
    #define SHOW_UNORDERED(x, y) \
        std::cout << std::boolalpha << "isunordered(" \
                  << #x << ", " << #y << "): " \
                  << std::isunordered(x, y) << '\n'
     
    int main()
    {
        SHOW_UNORDERED(10, 01);
        SHOW_UNORDERED(INFINITY, NAN);
        SHOW_UNORDERED(INFINITY, INFINITY);
        SHOW_UNORDERED(NAN, NAN);
    }
```

Saída:
```
    isunordered(10, 01): false
    isunordered(INFINITY, NAN): true
    isunordered(INFINITY, INFINITY): false
    isunordered(NAN, NAN): true
```

### Veja também

[ fpclassify](<#/doc/numeric/math/fpclassify>)(C++11) | categoriza o valor de ponto flutuante fornecido
(função)
[ isnan](<#/doc/numeric/math/isnan>)(C++11) | verifica se o número fornecido é NaN
(função)
[Documentação C](<#/>) para isunordered