# std::atan2, std::atan2f, std::atan2l

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
float atan2 ( float y, float x );
double atan2 ( double y, double x );
long double atan2 ( long double y, long double x );
/*floating-point-type*/
atan2 ( /*floating-point-type*/ y,
/*floating-point-type*/ x );
(constexpr desde C++26)
float atan2f( float y, float x );
(constexpr desde C++26)
long double atan2l( long double y, long double x );
(constexpr desde C++26)
Sobrecarga SIMD (desde C++26)
Definido no cabeçalho `<simd>`
template< class V0, class V1 >
constexpr /*math-common-simd-t*/<V0, V1>
atan2 ( const V0& v_y, const V1& v_x );
Sobrecargas adicionais (desde C++11)
Definido no cabeçalho `<cmath>`
template< class Integer >
double atan2 ( Integer y, Integer x );
```

1-3) Calcula o arco tangente de y / x usando os sinais dos argumentos para determinar o quadrante correto. A biblioteca fornece sobrecargas de `std::atan2` para todos os tipos de ponto flutuante cv-unqualified como o tipo dos parâmetros. (desde C++23)

S) A sobrecarga SIMD executa um `std::atan2` elemento a elemento em v_y e v_x.

    (Veja [`_math-common-simd-t_`](<#/doc/numeric/simd>) para sua definição.)
| (desde C++26)
---|---
A) Sobrecargas adicionais são fornecidas para todos os tipos inteiros, que são tratados como double. | (desde C++11)

### Parâmetros

- **y, x** — valores de ponto flutuante ou inteiros

### Valor de retorno

Se nenhum erro ocorrer, o arco tangente de y / x (arctan(y
---
x
)) no intervalo [-π, +π] radianos, é retornado.

argumento y

Valor de retorno

argumento x

Se ocorrer um erro de domínio, um valor definido pela implementação é retornado (NaN onde suportado).

Se ocorrer um erro de range devido a underflow, o resultado correto (após arredondamento) é retornado.

### Tratamento de erros

Erros são reportados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>).

Erro de domínio pode ocorrer se x e y forem ambos zero.

Se a implementação suporta aritmética de ponto flutuante IEEE (IEC 60559),

  * Se x e y forem ambos zero, erro de domínio _não_ ocorre.
  * Se x e y forem ambos zero, erro de range também não ocorre.
  * Se y for zero, erro de polo não ocorre.
  * Se y for ±0 e x for negativo ou -0, ±π é retornado.
  * Se y for ±0 e x for positivo ou +0, ±0 é retornado.
  * Se y for ±∞ e x for finito, ±π/2 é retornado.
  * Se y for ±∞ e x for -∞, ±3π/4 é retornado.
  * Se y for ±∞ e x for +∞, ±π/4 é retornado.
  * Se x for ±0 e y for negativo, -π/2 é retornado.
  * Se x for ±0 e y for positivo, +π/2 é retornado.
  * Se x for -∞ e y for finito e positivo, +π é retornado.
  * Se x for -∞ e y for finito e negativo, -π é retornado.
  * Se x for +∞ e y for finito e positivo, +0 é retornado.
  * Se x for +∞ e y for finito e negativo, -0 é retornado.
  * Se x for NaN ou y for NaN, NaN é retornado.

### Notas

std::atan2(y, x) é equivalente a [std::arg](<#/doc/numeric/complex/arg>)([std::complex](<#/doc/numeric/complex>)<[std::common_type_t](<#/doc/types/common_type>)<decltype(x), decltype(y)>>(x, y)).

[POSIX especifica](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/atan2.html>) que, em caso de underflow, o valor y / x é retornado, e se isso não for suportado, um valor definido pela implementação não maior que [DBL_MIN](<#/doc/types/climits>), [FLT_MIN](<#/doc/types/climits>), e [LDBL_MIN](<#/doc/types/climits>) é retornado.

As sobrecargas adicionais não são obrigadas a ser fornecidas exatamente como (A). Elas só precisam ser suficientes para garantir que, para seu primeiro argumento num1 e segundo argumento num2:

  * Se num1 ou num2 tiver o tipo long double, então std::atan2(num1, num2) tem o mesmo efeito que std::atan2(static_cast&lt;long double&gt;(num1),
static_cast&lt;long double&gt;(num2)).
  * Caso contrário, se num1 e/ou num2 tiver o tipo double ou um tipo inteiro, então std::atan2(num1, num2) tem o mesmo efeito que std::atan2(static_cast&lt;double&gt;(num1),
static_cast&lt;double&gt;(num2)).
  * Caso contrário, se num1 ou num2 tiver o tipo float, então std::atan2(num1, num2) tem o mesmo efeito que std::atan2(static_cast&lt;float&gt;(num1),
static_cast&lt;float&gt;(num2)).

| (até C++23)
Se num1 e num2 tiverem tipos aritméticos, então std::atan2(num1, num2) tem o mesmo efeito que std::atan2(static_cast</*common-floating-point-type*/>(num1),
static_cast</*common-floating-point-type*/>(num2)), onde /*common-floating-point-type*/ é o tipo de ponto flutuante com o maior [rank de conversão de ponto flutuante](<#/doc/language/usual_arithmetic_conversions>) e maior [subrank de conversão de ponto flutuante](<#/doc/language/usual_arithmetic_conversions>) entre os tipos de num1 e num2, argumentos de tipo inteiro são considerados como tendo o mesmo rank de conversão de ponto flutuante que double. Se nenhum tipo de ponto flutuante com o maior rank e subrank existir, então a [resolução de sobrecarga](<#/doc/language/overload_resolution>) não resulta em um candidato utilizável das sobrecargas fornecidas. | (desde C++23)

### Exemplo

Execute este código
```cpp
    #include <cmath>
    #include <iostream>
    
    void print_coordinates(int x, int y)
    {
        std::cout << std::showpos
                  << "(x:" << x << ", y:" << y << ") cartesian is "
                  << "(r:" << std::hypot(x, y)
                  << ", phi:" << std::atan2(y, x) << ") polar\n";
    }
    
    int main()
    {
        // normal usage: the signs of the two arguments determine the quadrant
        print_coordinates(+1, +1); // atan2( 1,  1) =  +pi/4, Quad I
        print_coordinates(-1, +1); // atan2( 1, -1) = +3pi/4, Quad II
        print_coordinates(-1, -1); // atan2(-1, -1) = -3pi/4, Quad III
        print_coordinates(+1, -1); // atan2(-1,  1) =  -pi/4, Quad IV
    
        // special values
        std::cout << std::noshowpos
                  << "atan2(0, 0) = " << atan2(0, 0) << '\n'
                  << "atan2(0,-0) = " << atan2(0, -0.0) << '\n'
                  << "atan2(7, 0) = " << atan2(7, 0) << '\n'
                  << "atan2(7,-0) = " << atan2(7, -0.0) << '\n';
    }
```

Saída:
```
    (x:+1, y:+1) cartesian is (r:1.41421, phi:0.785398) polar
    (x:-1, y:+1) cartesian is (r:1.41421, phi:2.35619) polar
    (x:-1, y:-1) cartesian is (r:1.41421, phi:-2.35619) polar
    (x:+1, y:-1) cartesian is (r:1.41421, phi:-0.785398) polar
    atan2(0, 0) = 0
    atan2(0,-0) = 3.14159
    atan2(7, 0) = 1.5708
    atan2(7,-0) = 1.5708
```

### Veja também

[ asinasinfasinl](<#/doc/numeric/math/asin>)(C++11)(C++11) | calcula arco seno (\\({\small\arcsin{x}}\\)arcsin(x))
(função)
[ acosacosfacosl](<#/doc/numeric/math/acos>)(C++11)(C++11) | calcula arco cosseno (\\({\small\arccos{x}}\\)arccos(x))
(função)
[ atanatanfatanl](<#/doc/numeric/math/atan>)(C++11)(C++11) | calcula arco tangente (\\({\small\arctan{x}}\\)arctan(x))
(função)
[ arg](<#/doc/numeric/complex/arg>) | retorna o ângulo de fase
(modelo de função)
[ atan2(std::valarray)](<#/doc/numeric/valarray/atan2>) | aplica a função **std::atan2** a um valarray e um valor
(modelo de função)
[Documentação C](<#/>) para atan2