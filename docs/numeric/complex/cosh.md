# std::cosh(std::complex)

Definido no header `[<complex>](<#/doc/header/complex>)`

```cpp
template< class T >
complex<T> cosh( const complex<T>& z );  // (desde C++11)
```

  
Calcula o cosseno hiperbólico complexo de um valor complexo z. 

### Parâmetros

z  |  \-  |  valor complexo   
  
### Valor de retorno

Se nenhum erro ocorrer, o cosseno hiperbólico complexo de z é retornado. 

### Tratamento de erros e valores especiais

Erros são reportados de forma consistente com [math_errhandling](<#/doc/numeric/math/math_errhandling>). 

Se a implementação suporta aritmética de ponto flutuante IEEE, 

  * [std::cosh](<#/doc/numeric/math/cosh>)([std::conj](<#/doc/numeric/complex/conj>)(z)) == [std::conj](<#/doc/numeric/complex/conj>)([std::cosh](<#/doc/numeric/math/cosh>)(z))
  * [std::cosh](<#/doc/numeric/math/cosh>)(z) == [std::cosh](<#/doc/numeric/math/cosh>)(-z)
  * Se z é `(+0,+0)`, o resultado é `(1,+0)`
  * Se z é `(+0,+∞)`, o resultado é `(NaN,±0)` (o sinal da parte imaginária é não especificado) e [FE_INVALID](<#/doc/numeric/fenv/FE_exceptions>) é levantado 
  * Se z é `(+0,NaN)`, o resultado é `(NaN,±0)` (o sinal da parte imaginária é não especificado) 
  * Se z é `(x,+∞)` (para qualquer x finito não-zero), o resultado é `(NaN,NaN)` e [FE_INVALID](<#/doc/numeric/fenv/FE_exceptions>) é levantado 
  * Se z é `(x,NaN)` (para qualquer x finito não-zero), o resultado é `(NaN,NaN)` e [FE_INVALID](<#/doc/numeric/fenv/FE_exceptions>) pode ser levantado 
  * Se z é `(+∞,+0)`, o resultado é `(+∞,+0)`
  * Se z é `(+∞,y)` (para qualquer y finito não-zero), o resultado é `+∞cis(y)`
  * Se z é `(+∞,+∞)`, o resultado é `(±∞,NaN)` (o sinal da parte real é não especificado) e [FE_INVALID](<#/doc/numeric/fenv/FE_exceptions>) é levantado 
  * Se z é `(+∞,NaN)`, o resultado é `(+∞,NaN)`
  * Se z é `(NaN,+0)`, o resultado é `(NaN,±0)` (o sinal da parte imaginária é não especificado) 
  * Se z é `(NaN,+y)` (para qualquer y finito não-zero), o resultado é `(NaN,NaN)` e [FE_INVALID](<#/doc/numeric/fenv/FE_exceptions>) pode ser levantado 
  * Se z é `(NaN,NaN)`, o resultado é `(NaN,NaN)`

onde cis(y) é cos(y) + i sin(y). 

### Notas

A definição matemática do cosseno hiperbólico é cosh z = ez  
+e-z  
  
---  
2  
. 

O cosseno hiperbólico é uma função inteira no plano complexo e não possui cortes de ramo. É periódico em relação à componente imaginária, com período 2πi. 

### Exemplos

Execute este código
```cpp
    #include <cmath>
    #include <complex>
    #include <iostream>
     
    int main()
    {   
        std::cout << std::fixed;
        std::complex<double> z(1.0, 0.0); // comporta-se como cosh real ao longo da linha real
        std::cout << "cosh" << z << " = " << std::cosh(z)
                  << " (cosh(1) = " << std::cosh(1) << ")\n";
     
        std::complex<double> z2(0.0, 1.0); // comporta-se como cosseno real ao longo da linha imaginária
        std::cout << "cosh" << z2 << " = " << std::cosh(z2)
                  << " ( cos(1) = " << std::cos(1) << ")\n";
    }
```

Saída: 
```
    cosh(1.000000,0.000000) = (1.543081,0.000000) (cosh(1) = 1.543081)
    cosh(0.000000,1.000000) = (0.540302,0.000000) ( cos(1) = 0.540302)
```

### Veja também

[ sinh(std::complex)](<#/doc/numeric/complex/sinh>) |  calcula o seno hiperbólico de um número complexo (\\({\small\sinh{z}}\\)sinh(z))   
(function template)  
[ tanh(std::complex)](<#/doc/numeric/complex/tanh>) |  calcula a tangente hiperbólica de um número complexo (\\({\small\tanh{z}}\\)tanh(z))   
(function template)  
[ acosh(std::complex)](<#/doc/numeric/complex/acosh>)(C++11) |  calcula o cosseno hiperbólico inverso de um número complexo (\\({\small\operatorname{arcosh}{z}}\\)arcosh(z))   
(function template)  
[ coshcoshfcoshl](<#/doc/numeric/math/cosh>)(C++11)(C++11) |  calcula o cosseno hiperbólico (\\({\small\cosh{x}}\\)cosh(x))   
(function)  
[ cosh(std::valarray)](<#/doc/numeric/valarray/cosh>) |  aplica a função [std::cosh](<#/doc/numeric/math/cosh>) a cada elemento de valarray   
(function template)  
[Documentação C](<#/>) para ccosh