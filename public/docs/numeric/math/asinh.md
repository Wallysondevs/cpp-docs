# std::asinh, std::asinhf, std::asinhl

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
float asinh ( float num );
double asinh ( double num );
long double asinh ( long double num );
/*floating-point-type*/
asinh ( /*floating-point-type*/ num );
(constexpr desde C++26)
float asinhf( float num );
(constexpr desde C++26)
long double asinhl( long double num );
(constexpr desde C++26)
Sobrecarga SIMD (desde C++26)
Definido no cabeçalho `<simd>`
template< /*math-floating-point*/ V >
constexpr /*deduced-simd-t*/<V>
asinh ( const V& v_num );
Sobrecargas adicionais (desde C++11)
Definido no cabeçalho `<cmath>`
template< class Integer >
double asinh ( Integer num );
```

  
1-3) Calcula o seno hiperbólico inverso de num. A biblioteca fornece sobrecargas de `std::asinh` para todos os tipos de ponto flutuante não qualificados por cv como o tipo do parâmetro. (desde C++23)

S) A sobrecarga SIMD executa um `std::asinh` elemento a elemento em `v_num`.

    

    (Veja [`_math-floating-point_`](<#/doc/numeric/simd>) e [`_deduced-simd-t_`](<#/doc/numeric/simd>) para suas definições.)
| (desde C++26)  
---|---
A) Sobrecargas adicionais são fornecidas para todos os tipos inteiros, que são tratados como double. | (desde C++11)  
  
### Parâmetros

num  |  \-  |  valor de ponto flutuante ou inteiro   
  
### Valor de retorno

Se nenhum erro ocorrer, o seno hiperbólico inverso de num (sinh-1  
(num), ou arsinh(num)), é retornado. 

Se ocorrer um erro de range devido a underflow, o resultado correto (após arredondamento) é retornado. 

### Tratamento de erros

Erros são reportados conforme especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>). 

Se a implementação suportar aritmética de ponto flutuante IEEE (IEC 60559), 

  * se o argumento for ±0 ou ±∞, ele é retornado sem modificação. 
  * se o argumento for NaN, NaN é retornado. 

### Notas

Embora o padrão C (ao qual C++ se refere para esta função) nomeie esta função como "seno hiperbólico de arco", as funções inversas das funções hiperbólicas são as funções de área. Seu argumento é a área de um setor hiperbólico, não um arco. O nome correto é "seno hiperbólico inverso" (usado por POSIX) ou "seno hiperbólico de área". 

As sobrecargas adicionais não são obrigadas a ser fornecidas exatamente como (A). Elas só precisam ser suficientes para garantir que, para seu argumento `num` de tipo inteiro, `std::asinh(num)` tenha o mesmo efeito que `std::asinh(static_cast<double>(num))`. 

### Exemplos

Execute este código
```cpp
    #include <cmath>
    #include <iostream>
     
    int main()
    {
        std::cout << "asinh(1) = " << std::asinh(1) << '\n'
                  << "asinh(-1) = " << std::asinh(-1) << '\n';
     
        // special values
        std::cout << "asinh(+0) = " << std::asinh(+0.0) << '\n'
                  << "asinh(-0) = " <<  std::asinh(-0.0) << '\n';
    }
```

Saída: 
```
    asinh(1) = 0.881374
    asinh(-1) = -0.881374
    asinh(+0) = 0
    asinh(-0) = -0
```

### Veja também

[ acoshacoshfacoshl](<#/doc/numeric/math/acosh>)(C++11)(C++11)(C++11) |  calcula o cosseno hiperbólico inverso (\\({\small\operatorname{arcosh}{x}}\\)arcosh(x))   
(função)  
[ atanhatanhfatanhl](<#/doc/numeric/math/atanh>)(C++11)(C++11)(C++11) |  calcula a tangente hiperbólica inversa (\\({\small\operatorname{artanh}{x}}\\)artanh(x))   
(função)  
[ sinhsinhfsinhl](<#/doc/numeric/math/sinh>)(C++11)(C++11) |  calcula o seno hiperbólico (\\({\small\sinh{x}}\\)sinh(x))   
(função)  
[ asinh(std::complex)](<#/doc/numeric/complex/asinh>)(C++11) |  calcula o seno hiperbólico de área de um número complexo (\\({\small\operatorname{arsinh}{z}}\\)arsinh(z))   
(modelo de função)  
[Documentação C](<#/>) para asinh  
  
### Links externos

[Weisstein, Eric W. "Seno Hiperbólico Inverso."](<https://mathworld.wolfram.com/InverseHyperbolicSine.html>) De MathWorld — Um Recurso Web da Wolfram.   
---