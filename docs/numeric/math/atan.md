# std::atan, std::atanf, std::atanl

Definido no cabeçalho `<cmath>`

```c
float atan ( float num );
double atan ( double num );
long double atan ( long double num );
/*floating-point-type*/
atan ( /*floating-point-type*/ num );
(constexpr desde C++26)
float atanf( float num );
(constexpr desde C++26)
long double atanl( long double num );
(constexpr desde C++26)
Sobrecarga SIMD (desde C++26)
Definido no cabeçalho `<simd>`
template< /*math-floating-point*/ V >
constexpr /*deduced-simd-t*/<V>
atan ( const V& v_num );
Sobrecargas adicionais (desde C++11)
Definido no cabeçalho `<cmath>`
template< class Integer >
double atan ( Integer num );
```

  
1-3) Calcula o valor principal do arco tangente de num. A biblioteca fornece sobrecargas de `std::atan` para todos os tipos de ponto flutuante cv-unqualified como o tipo do parâmetro.(desde C++23)

S) A sobrecarga SIMD executa um `std::atan` elemento a elemento em v_num.

    

    (Veja [`_math-floating-point_`](<#/doc/numeric/simd>) e [`_deduced-simd-t_`](<#/doc/numeric/simd>) para suas definições.)
| (desde C++26)  
---|---
A) Sobrecargas adicionais são fornecidas para todos os tipos inteiros, que são tratados como double. | (desde C++11)  
  
### Parâmetros

num  |  \-  |  valor de ponto flutuante ou inteiro   
  
### Valor de retorno

Se nenhum erro ocorrer, o arco tangente de num (arctan(num)) no intervalo [- π  
---  
2  
, +π  
---  
2  
] radianos, é retornado. 

Se ocorrer um erro de range devido a underflow, o resultado correto (após arredondamento) é retornado. 

### Tratamento de erros

Erros são reportados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>). 

Se a implementação suporta aritmética de ponto flutuante IEEE (IEC 60559), 

  * Se o argumento é ±0, ele é retornado sem modificação. 
  * Se o argumento é +∞, +π/2 é retornado. 
  * Se o argumento é -∞, -π/2 é retornado. 
  * Se o argumento é NaN, NaN é retornado. 

### Notas

[POSIX especifica](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/atan.html>) que em caso de underflow, num é retornado sem modificação, e se isso não for suportado, um valor definido pela implementação não maior que [`DBL_MIN`](<#/doc/types/climits>), [FLT_MIN](<#/doc/types/climits>), e [LDBL_MIN](<#/doc/types/climits>) é retornado. 

As sobrecargas adicionais não são exigidas para serem fornecidas exatamente como (A). Elas apenas precisam ser suficientes para garantir que, para seu argumento num de tipo inteiro, std::atan(num) tenha o mesmo efeito que std::atan(static_cast&lt;double&gt;(num)). 

### Exemplo

Execute este código
```
    #include <cmath>
    #include <iostream>
     
    int main()
    {
        std::cout << "atan(1) = " << std::atan(1) << '\n'
                  << "4*atan(1) = " << 4 * std::atan(1) << '\n';
     
        // special values
        std::cout << "atan(Inf) = " << std::atan(INFINITY) << '\n'
                  << "2*atan(Inf) = " << 2 * std::atan(INFINITY) << '\n'
                  << "atan(-0.0) = " << std::atan(-0.0) << '\n'
                  << "atan(+0.0) = " << std::atan(0) << '\n';
    }
```

Saída: 
```
    atan(1) = 0.785398
    4*atan(1) = 3.14159
    atan(Inf) = 1.5708
    2*atan(Inf) = 3.14159
    atan(-0.0) = -0
    atan(+0.0) = 0
```

### Veja também

[ asinasinfasinl](<#/doc/numeric/math/asin>)(C++11)(C++11) |  calcula arco seno (\\({\small\arcsin{x}}\\)arcsin(x))   
(função)  
[ acosacosfacosl](<#/doc/numeric/math/acos>)(C++11)(C++11) |  calcula arco cosseno (\\({\small\arccos{x}}\\)arccos(x))   
(função)  
[ atan2atan2fatan2l](<#/doc/numeric/math/atan2>)(C++11)(C++11) |  arco tangente, usando sinais para determinar quadrantes   
(função)  
[ tantanftanl](<#/doc/numeric/math/tan>)(C++11)(C++11) |  calcula tangente (\\({\small\tan{x}}\\)tan(x))   
(função)  
[ atan(std::complex)](<#/doc/numeric/complex/atan>)(C++11) |  calcula arco tangente de um número complexo (\\({\small\arctan{z}}\\)arctan(z))   
(modelo de função)  
[ atan(std::valarray)](<#/doc/numeric/valarray/atan>) |  aplica a função **std::atan** a cada elemento de valarray   
(modelo de função)  
[documentação C](<#/>) para atan