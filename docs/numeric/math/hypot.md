# std::hypot, std::hypotf, std::hypotl

```cpp
Definido no header `<cmath>`
  // (1)
float hypot ( float x, float y );
double hypot ( double x, double y );
long double hypot ( long double x, long double y );  // (desde C++11)
(até C++23)
/*floating-point-type*/
hypot ( /*floating-point-type*/ x,
/*floating-point-type*/ y );  // (desde C++23)
(constexpr desde C++26)
float hypotf( float x, float y );  // (2) (desde C++11)
(constexpr desde C++26)
long double hypotl( long double x, long double y );  // (3) (desde C++11)
(constexpr desde C++26)
  // (4)
float hypot ( float x, float y, float z );
double hypot ( double x, double y, double z );
long double hypot ( long double x, long double z, long double z );  // (desde C++17)
(até C++23)
/*floating-point-type*/
hypot ( /*floating-point-type*/ x,
/*floating-point-type*/ y,
/*floating-point-type*/ z );  // (desde C++23)
(constexpr desde C++26)
Sobrecargas adicionais
Definido no header `<cmath>`
```

```cpp
template< class Arithmetic1, Arithmetic2 >
/*common-floating-point-type*/
hypot ( Arithmetic1 x, Arithmetic2 y );  // (desde C++11)
(constexpr desde C++26)
template< class Arithmetic1, Arithmetic2, Arithmetic3 >
/*common-floating-point-type*/
hypot ( Arithmetic1 x, Arithmetic2 y, Arithmetic3 z );  // (desde C++17)
```

  
1-3) Calcula a raiz quadrada da soma dos quadrados de x e y, sem overflow ou underflow indevidos em estágios intermediários do cálculo. A biblioteca fornece sobrecargas de `std::hypot` para todos os tipos de ponto flutuante cv-unqualified como o tipo dos parâmetros x e y.(desde C++23)

4) Calcula a raiz quadrada da soma dos quadrados de x, y e z, sem overflow ou underflow indevidos em estágios intermediários do cálculo. A biblioteca fornece sobrecargas de `std::hypot` para todos os tipos de ponto flutuante cv-unqualified como o tipo dos parâmetros x, y e z.(desde C++23)

A,B) Sobrecargas adicionais são fornecidas para todas as outras combinações de tipos aritméticos.

O valor calculado pela versão de dois argumentos desta função é o comprimento da hipotenusa de um triângulo retângulo com lados de comprimento x e y, ou a distância do ponto `(x,y)` da origem `(0,0)`, ou a magnitude de um número complexo `x+_i_ y`. 

O valor calculado pela versão de três argumentos desta função é a distância do ponto `(x,y,z)` da origem `(0,0,0)`. 

### Parâmetros

x, y, z  |  \-  |  valores de ponto flutuante ou inteiros   
  
### Valor de retorno

1-3,A) Se nenhum erro ocorrer, a hipotenusa de um triângulo retângulo, \\(\scriptsize{\sqrt{x^2+y^2} }\\)√x2  
+y2  
, é retornada.

4,B) Se nenhum erro ocorrer, a distância da origem no espaço 3D, \\(\scriptsize{\sqrt{x^2+y^2+z^2} }\\)√x2  
+y2  
+z2  
, é retornada.

Se ocorrer um erro de range devido a overflow, [+HUGE_VAL](<#/doc/numeric/math/HUGE_VAL>), `+HUGE_VALF`, ou `+HUGE_VALL` é retornado. 

Se ocorrer um erro de range devido a underflow, o resultado correto (após arredondamento) é retornado. 

### Tratamento de erros

Os erros são reportados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>). 

Se a implementação suporta aritmética de ponto flutuante IEEE (IEC 60559), 

  * std::hypot(x, y), std::hypot(y, x) e std::hypot(x, -y) são equivalentes. 
  * se um dos argumentos for ±0, std::hypot(x, y) é equivalente a [std::fabs](<#/doc/numeric/math/fabs>) chamado com o argumento não-zero. 
  * se um dos argumentos for ±∞, std::hypot(x, y) retorna +∞ mesmo que o outro argumento seja NaN. 
  * caso contrário, se qualquer um dos argumentos for NaN, NaN é retornado. 

### Notas

Implementações geralmente garantem precisão de menos de 1 [ulp](<https://en.wikipedia.org/wiki/Unit_in_the_last_place> "enwiki:Unit in the Last Place") (Unit in the Last Place — Unidade de Menor Precisão): [GNU](<https://sourceware.org/git/?p=glibc.git;a=blob_plain;f=sysdeps/ieee754/dbl-64/e_hypot.c>), [BSD](<https://www.freebsd.org/cgi/cvsweb.cgi/src/lib/msun/src/e_hypot.c>). 

std::hypot(x, y) é equivalente a std::abs([std::complex](<#/doc/numeric/complex>)&lt;double&gt;(x, y)). 

[POSIX especifica](<https://pubs.opengroup.org/onlinepubs/9799919799/functions/hypot.html>) que o underflow pode ocorrer apenas quando ambos os argumentos são subnormais e o resultado correto também é subnormal (isso proíbe implementações ingênuas). 

A distância entre dois pontos `(x1, y1, z1)` e `(x2, y2, z2)` no espaço 3D pode ser calculada usando a sobrecarga de 3 argumentos de `std::hypot` como std::hypot(x2 - x1, y2 - y1, z2 - z1).  | (desde C++17)  
  
As sobrecargas adicionais não são obrigadas a ser fornecidas exatamente como (A,B). Elas apenas precisam ser suficientes para garantir que para seu primeiro argumento num1, segundo argumento num2 e o terceiro argumento opcional num3: 

  * Se num1, num2 ou num3 tiver o tipo long double, então 

    

  * std::hypot(num1, num2) tem o mesmo efeito que std::hypot(static_cast&lt;long double&gt;(num1),  
static_cast&lt;long double&gt;(num2)), e 
  * std::hypot(num1, num2, num3) tem o mesmo efeito que std::hypot(static_cast&lt;long double&gt;(num1),  
static_cast&lt;long double&gt;(num2),  
static_cast&lt;long double&gt;(num3)). 

  * Caso contrário, se num1, num2 e/ou num3 tiver o tipo double ou um tipo inteiro, então 

    

  * std::hypot(num1, num2) tem o mesmo efeito que std::hypot(static_cast&lt;double&gt;(num1),  
static_cast&lt;double&gt;(num2)), e 
  * std::hypot(num1, num2, num3) tem o mesmo efeito que std::hypot(static_cast&lt;double&gt;(num1),  
static_cast&lt;double&gt;(num2),  
static_cast&lt;double&gt;(num3)). 

  * Caso contrário, se num1, num2 ou num3 tiver o tipo float, então 

    

  * std::hypot(num1, num2) tem o mesmo efeito que std::hypot(static_cast&lt;float&gt;(num1),  
static_cast&lt;float&gt;(num2)), e 
  * std::hypot(num1, num2, num3) tem o mesmo efeito que std::hypot(static_cast&lt;float&gt;(num1),  
static_cast&lt;float&gt;(num2),  
static_cast&lt;float&gt;(num3)). 

| (até C++23)  
Se num1, num2 e num3 tiverem tipos aritméticos, então 

  * std::hypot(num1, num2) tem o mesmo efeito que std::hypot(static_cast</*common-floating-point-type*/>(num1),  
static_cast</*common-floating-point-type*/>(num2)), e 
  * std::hypot(num1, num2, num3) tem o mesmo efeito que std::hypot(static_cast</*common-floating-point-type*/>(num1),  
static_cast</*common-floating-point-type*/>(num2),  
static_cast</*common-floating-point-type*/>(num3)), 

onde /*common-floating-point-type*/ é o tipo de ponto flutuante com o maior [rank de conversão de ponto flutuante](<#/doc/language/usual_arithmetic_conversions>) e maior [subrank de conversão de ponto flutuante](<#/doc/language/usual_arithmetic_conversions>) entre os tipos de num1, num2 e num3, argumentos de tipo inteiro são considerados como tendo o mesmo rank de conversão de ponto flutuante que double. Se nenhum tipo de ponto flutuante com o maior rank e subrank existir, então a [resolução de sobrecarga](<#/doc/language/overload_resolution>) não resulta em um candidato utilizável das sobrecargas fornecidas.  | (desde C++23)  
---|---|---|---
[Macro de teste de recurso](<#/doc/utility/feature_test>) | Valor | Padrão | Recurso   
[`__cpp_lib_hypot`](<#/doc/feature_test>) | [`201603L`](<#/>) | (C++17) | Sobrecarga de 3 argumentos de `std::hypot` (4,B)  
  
### Exemplo

Execute este código
```cpp
    #include <cerrno>
    #include <cfenv>
    #include <cfloat>
    #include <cmath>
    #include <cstring>
    #include <iostream>
    
    // #pragma STDC FENV_ACCESS ON
    
    struct Point3D { float x, y, z; };
    
    int main()
    {
        // typical usage
        std::cout << "(1,1) cartesian is (" << std::hypot(1, 1)
                  << ',' << std::atan2(1,1) << ") polar\n";
    
        Point3D a{3.14, 2.71, 9.87}, b{1.14, 5.71, 3.87};
        // C++17 has 3-argument hypot overload:
        std::cout << "distance(a,b) = "
                  << std::hypot(a.x - b.x, a.y - b.y, a.z - b.z) << '\n';
    
        // special values
        std::cout << "hypot(NAN,INFINITY) = " << std::hypot(NAN, INFINITY) << '\n';
    
        // error handling
        errno = 0;
        std::feclearexcept(FE_ALL_EXCEPT);
        std::cout << "hypot(DBL_MAX,DBL_MAX) = " << std::hypot(DBL_MAX, DBL_MAX) << '\n';
    
        if (errno == ERANGE)
            std::cout << "    errno = ERANGE " << std::strerror(errno) << '\n';
        if (std::fetestexcept(FE_OVERFLOW))
            std::cout << "    FE_OVERFLOW raised\n";
    }
```

Saída: 
```
    (1,1) cartesian is (1.41421,0.785398) polar
    distance(a,b) = 7
    hypot(NAN,INFINITY) = inf
    hypot(DBL_MAX,DBL_MAX) = inf
        errno = ERANGE Numerical result out of range
        FE_OVERFLOW raised
```

### Veja também

[ powpowfpowl](<#/doc/numeric/math/pow>)(C++11)(C++11) |  eleva um número à potência dada (\\(\small{x^y}\\)xy)   
(função)  
[ sqrtsqrtfsqrtl](<#/doc/numeric/math/sqrt>)(C++11)(C++11) |  calcula a raiz quadrada (\\(\small{\sqrt{x}}\\)√x)   
(função)  
[ cbrtcbrtfcbrtl](<#/doc/numeric/math/cbrt>)(C++11)(C++11)(C++11) |  calcula a raiz cúbica (\\(\small{\sqrt[3]{x}}\\)3√x)   
(função)  
[ abs(std::complex)](<#/doc/numeric/complex/abs>) |  retorna a magnitude de um número complexo   
(modelo de função)  
[Documentação C](<#/>) para hypot