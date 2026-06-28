# std::fmax, std::fmaxf, std::fmaxl

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
float fmax ( float x, float y );
double fmax ( double x, double y );
long double fmax ( long double x, long double y );
constexpr /*floating-point-type*/
fmax ( /*floating-point-type*/ x,
/*floating-point-type*/ y );
float fmaxf( float x, float y );
(constexpr desde C++23)
long double fmaxl( long double x, long double y );
(constexpr desde C++23)
Sobrecarga SIMD (desde C++26)
Definido no cabeçalho `<simd>`
template< class V0, class V1 >
constexpr /*math-common-simd-t*/<V0, V1>
fmax ( const V0& v_x, const V1& v_y );
Sobrecargas adicionais (desde C++11)
Definido no cabeçalho `<cmath>`
template< class Integer >
double fmax ( Integer x, Integer y );
```

  
1-3) Retorna o maior de dois argumentos de ponto flutuante, tratando NaNs como dados ausentes (entre um NaN e um valor numérico, o valor numérico é escolhido). A biblioteca fornece sobrecargas de `std::fmax` para todos os tipos de ponto flutuante cv-não qualificados como o tipo dos parâmetros.(desde C++23)

S) A sobrecarga SIMD executa um `std::fmax` elemento a elemento em v_x e v_y.

    

    (Veja [`_math-common-simd-t_`](<#/doc/numeric/simd>) para sua definição.)
| (desde C++26)  
---|---
A) Sobrecargas adicionais são fornecidas para todos os tipos inteiros, que são tratados como double. | (desde C++11)  
  
### Parâmetros

x, y  |  \-  |  valores de ponto flutuante ou inteiros   
  
### Valor de retorno

Se bem-sucedido, retorna o maior de dois valores de ponto flutuante. O valor retornado é exato e não depende de nenhum modo de arredondamento. 

### Tratamento de erros

Esta função não está sujeita a nenhuma das condições de erro especificadas em [math_errhandling](<#/doc/numeric/math/math_errhandling>). 

Se a implementação suporta aritmética de ponto flutuante IEEE (IEC 60559), 

  * Se um dos dois argumentos for NaN, o valor do outro argumento é retornado. 
  * Somente se ambos os argumentos forem NaN, NaN é retornado. 

### Observações

Esta função não é obrigada a ser sensível ao sinal de zero, embora algumas implementações adicionalmente imponham que se um argumento é +0 e o outro é -0, então +0 é retornado. 

As sobrecargas adicionais não são obrigadas a ser fornecidas exatamente como (A). Elas só precisam ser suficientes para garantir que para seu primeiro argumento num1 e segundo argumento num2: 

  * Se num1 ou num2 tiver o tipo long double, então std::fmax(num1, num2) tem o mesmo efeito que std::fmax(static_cast&lt;long double&gt;(num1),  
static_cast&lt;long double&gt;(num2)). 
  * Caso contrário, se num1 e/ou num2 tiver o tipo double ou um tipo inteiro, então std::fmax(num1, num2) tem o mesmo efeito que std::fmax(static_cast&lt;double&gt;(num1),  
static_cast&lt;double&gt;(num2)). 
  * Caso contrário, se num1 ou num2 tiver o tipo float, então std::fmax(num1, num2) tem o mesmo efeito que std::fmax(static_cast&lt;float&gt;(num1),  
static_cast&lt;float&gt;(num2)). 

| (até C++23)  
Se num1 e num2 tiverem tipos aritméticos, então std::fmax(num1, num2) tem o mesmo efeito que std::fmax(static_cast</*common-floating-point-type*/>(num1),  
static_cast</*common-floating-point-type*/>(num2)), onde /*common-floating-point-type*/ é o tipo de ponto flutuante com o maior [rank de conversão de ponto flutuante](<#/doc/language/usual_arithmetic_conversions>) e maior [subrank de conversão de ponto flutuante](<#/doc/language/usual_arithmetic_conversions>) entre os tipos de num1 e num2, argumentos de tipo inteiro são considerados como tendo o mesmo rank de conversão de ponto flutuante que double. Se nenhum tipo de ponto flutuante com o maior rank e subrank existir, então a [resolução de sobrecarga](<#/doc/language/overload_resolution>) não resulta em um candidato utilizável das sobrecargas fornecidas.  | (desde C++23)  
  
### Exemplo

Execute este código
```cpp
    #include <cmath>
    #include <iostream>
     
    int main()
    {
        std::cout << "fmax(2,1)    = " << std::fmax(2, 1) << '\n'
                  << "fmax(-Inf,0) = " << std::fmax(-INFINITY, 0) << '\n'
                  << "fmax(NaN,-1) = " << std::fmax(NAN, -1) << '\n';
    }
```

Saída: 
```
    fmax(2,1)    = 2
    fmax(-Inf,0) = 0
    fmax(NaN,-1) = -1
```

### Veja também

[ isgreater](<#/doc/numeric/math/isgreater>)(C++11) |  verifica se o primeiro argumento de ponto flutuante é maior que o segundo   
(função)  
[ fminfminffminl](<#/doc/numeric/math/fmin>)(C++11)(C++11)(C++11) |  o menor de dois valores de ponto flutuante   
(função)  
[ max](<#/doc/algorithm/max>) |  retorna o maior dos valores dados   
(modelo de função)  
[ max_element](<#/doc/algorithm/max_element>) |  retorna o maior elemento em um range   
(modelo de função)  
[ minmax](<#/doc/algorithm/minmax>)(C++11) |  retorna o menor e o maior de dois elementos   
(modelo de função)  
[ minmax_element](<#/doc/algorithm/minmax_element>)(C++11) |  retorna os menores e os maiores elementos em um range   
(modelo de função)  
[Documentação C](<#/>) para fmax