# std::modf, std::modff, std::modfl

Definido no cabeçalho `[<cmath>](<#/doc/header/cmath>)`

```c
float modf ( float num, float* iptr );
double modf ( double num, double* iptr );
long double modf ( long double num, long double* iptr );
constexpr /* floating-point-type */
modf ( /* floating-point-type */ num,
/* floating-point-type */* iptr );
float modff( float num, float* iptr );
(constexpr desde C++23)
long double modfl( long double num, long double* iptr );
(constexpr desde C++23)
Sobrecargas adicionais (desde C++11)
Definido no cabeçalho `<cmath>`
template< class Integer >
double modf ( Integer num, double* iptr );
```

  
1-3) Decompõe o valor de ponto flutuante `num` fornecido em partes integral e fracionária, cada uma com o mesmo tipo e sinal que `num`. A parte integral (em formato de ponto flutuante) é armazenada no objeto apontado por `iptr`. A biblioteca fornece sobrecargas de `std::modf` para todos os tipos de ponto flutuante cv-não qualificados como o tipo do parâmetro `num` e o tipo apontado por `iptr`.(desde C++23)

A) Sobrecargas adicionais são fornecidas para todos os tipos inteiros, que são tratados como `double`. | (desde C++11)  
  
### Parâmetros

num  |  \-  |  valor de ponto flutuante ou inteiro   
---|---|---
iptr  |  \-  |  ponteiro para o valor de ponto flutuante onde a parte integral será armazenada   
  
### Valor de retorno

Se nenhum erro ocorrer, retorna a parte fracionária de `num` com o mesmo sinal que `num`. A parte integral é colocada no valor apontado por `iptr`. 

A soma do valor retornado e do valor armazenado em `*iptr` resulta em `num` (permitindo arredondamento). 

### Tratamento de erros

Esta função não está sujeita a nenhum erro especificado em [math_errhandling](<#/doc/numeric/math/math_errhandling>). 

Se a implementação suporta aritmética de ponto flutuante IEEE (IEC 60559), 

  * Se `num` for ±0, ±0 é retornado, e ±0 é armazenado em `*iptr`. 
  * Se `num` for ±∞, ±0 é retornado, e ±∞ é armazenado em `*iptr`. 
  * Se `num` for NaN, NaN é retornado, e NaN é armazenado em `*iptr`. 
  * O valor retornado é exato, [o modo de arredondamento atual](<#/doc/numeric/fenv/FE_round>) é ignorado. 

### Observações

Esta função se comporta como se fosse implementada da seguinte forma: 
```cpp
    double modf(double num, double* iptr)
    {
    #pragma STDC FENV_ACCESS ON
        int save_round = std::fegetround();
        std::fesetround(FE_TOWARDZERO);
        *iptr = std::nearbyint(num);
        std::fesetround(save_round);
        return std::copysign(std::isinf(num) ? 0.0 : num - (*iptr), num);
    }
```

As sobrecargas adicionais não são obrigadas a ser fornecidas exatamente como em (A). Elas apenas precisam ser suficientes para garantir que, para seu argumento `num` de tipo inteiro, `std::modf(num, iptr)` tenha o mesmo efeito que `std::modf(static_cast<double>(num), iptr)`. 

### Exemplo

Compara diferentes funções de decomposição de ponto flutuante:

Execute este código
```cpp
    #include <cmath>
    #include <iostream>
    #include <limits>
    
    int main()
    {
        double f = 123.45;
        std::cout << "Given the number " << f << " or " << std::hexfloat
                  << f << std::defaultfloat << " in hex,\n";
    
        double f3;
        double f2 = std::modf(f, &f3);
        std::cout << "modf() makes " << f3 << " + " << f2 << '\n';
    
        int i;
        f2 = std::frexp(f, &i);
        std::cout << "frexp() makes " << f2 << " * 2^" << i << '\n';
    
        i = std::ilogb(f);
        std::cout << "logb()/ilogb() make " << f / std::scalbn(1.0, i) << " * "
                  << std::numeric_limits<double>::radix
                  << "^" << std::ilogb(f) << '\n';
    
        // special values
        f2 = std::modf(-0.0, &f3);
        std::cout << "modf(-0) makes " << f3 << " + " << f2 << '\n';
        f2 = std::modf(-INFINITY, &f3);
        std::cout << "modf(-Inf) makes " << f3 << " + " << f2 << '\n';
    }
```

Saída possível: 
```
    Given the number 123.45 or 0x1.edccccccccccdp+6 in hex,
    modf() makes 123 + 0.45
    frexp() makes 0.964453 * 2^7
    logb()/ilogb() make 1.92891 * 2^6
    modf(-0) makes -0 + -0
    modf(-Inf) makes -INF + -0
```

### Ver também

[ trunctruncftruncl](<#/doc/numeric/math/trunc>)(C++11)(C++11)(C++11) |  inteiro mais próximo não maior em magnitude que o valor fornecido   
(função)  
[Documentação C](<#/>) para modf