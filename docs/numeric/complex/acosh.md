# std::acosh(std::complex)

Definido no cabeçalho `[<complex>](<#/doc/header/complex>)`

```c
template< class T >
complex<T> acosh( const complex<T>& z );
```

Calcula o cosseno hiperbólico de arco complexo de um valor complexo z com corte de ramo em valores menores que 1 ao longo do eixo real.

### Parâmetros

- **z** — valor complexo

### Valor de retorno

Se nenhum erro ocorrer, o cosseno hiperbólico de arco complexo de z é retornado, no intervalo de uma semi-faixa de valores não negativos ao longo do eixo real e no intervalo [−iπ; +iπ] ao longo do eixo imaginário.

### Tratamento de erros e valores especiais

Erros são reportados de forma consistente com [math_errhandling](<#/doc/numeric/math/math_errhandling>).

Se a implementação suporta aritmética de ponto flutuante IEEE,

  * [std::acosh](<#/doc/numeric/math/acosh>)([std::conj](<#/doc/numeric/complex/conj>)(z)) == [std::conj](<#/doc/numeric/complex/conj>)([std::acosh](<#/doc/numeric/math/acosh>)(z)).
  * Se z for `(±0,+0)`, o resultado é `(+0,π/2)`.
  * Se z for `(x,+∞)` (para qualquer x finito), o resultado é `(+∞,π/2)`.
  * Se z for `(x,NaN)` (para qualquer[1](<#/doc/numeric/complex/acosh>) x finito), o resultado é `(NaN,NaN)` e [FE_INVALID](<#/doc/numeric/fenv/FE_exceptions>) pode ser levantado.
  * Se z for `(-∞,y)` (para qualquer y finito positivo), o resultado é `(+∞,π)`.
  * Se z for `(+∞,y)` (para qualquer y finito positivo), o resultado é `(+∞,+0)`.
  * Se z for `(-∞,+∞)`, o resultado é `(+∞,3π/4)`.
  * Se z for `(±∞,NaN)`, o resultado é `(+∞,NaN)`.
  * Se z for `(NaN,y)` (para qualquer y finito), o resultado é `(NaN,NaN)` e [FE_INVALID](<#/doc/numeric/fenv/FE_exceptions>) pode ser levantado.
  * Se z for `(NaN,+∞)`, o resultado é `(+∞,NaN)`.
  * Se z for `(NaN,NaN)`, o resultado é `(NaN,NaN)`.

  1. [↑](<#/doc/numeric/complex/acosh>) conforme [C11 DR471](<https://open-std.org/JTC1/SC22/WG14/www/docs/n1892.htm#dr_471>), isso se aplica apenas para x diferente de zero. Se z for `(0,NaN)`, o resultado deve ser `(NaN,π/2)`.

### Notas

Embora o padrão C++ nomeie esta função como "cosseno hiperbólico de arco complexo", as funções inversas das funções hiperbólicas são as funções de área. Seu argumento é a área de um setor hiperbólico, não um arco. O nome correto é "cosseno hiperbólico inverso complexo" e, menos comum, "cosseno hiperbólico de área complexo".

O cosseno hiperbólico inverso é uma função multivalorada e requer um corte de ramo no plano complexo. O corte de ramo é convencionalmente colocado no segmento de linha (-∞,+1) do eixo real.

A definição matemática do valor principal do cosseno hiperbólico inverso é acosh z = ln(z + √z+1 √z-1).

Para qualquer z, acosh(z) = √z-1
---
√1-z
acos(z), ou simplesmente i acos(z) na metade superior do plano complexo.

### Exemplo

Execute este código
```cpp
    #include <complex>
    #include <iostream>
    
    int main()
    {
        std::cout << std::fixed;
        std::complex<double> z1(0.5, 0);
        std::cout << "acosh" << z1 << " = " << std::acosh(z1) << '\n';
    
        std::complex<double> z2(0.5, -0.0);
        std::cout << "acosh" << z2 << " (o outro lado do corte) = "
                  << std::acosh(z2) << '\n';
    
        // no semiplano superior, acosh = i acos 
        std::complex<double> z3(1, 1), i(0, 1);
        std::cout << "acosh" << z3 << " = " << std::acosh(z3) << '\n'
                  << "i*acos" << z3 << " = " << i*std::acos(z3) << '\n';
    }
```

Saída:
```
    acosh(0.500000,0.000000) = (0.000000,-1.047198)
    acosh(0.500000,-0.000000) (the other side of the cut) = (0.000000,1.047198)
    acosh(1.000000,1.000000) = (1.061275,0.904557)
    i*acos(1.000000,1.000000) = (1.061275,0.904557)
```

### Veja também

[ acos(std::complex)](<#/doc/numeric/complex/acos>)(C++11) | calcula o cosseno de arco de um número complexo (\\({\small\arccos{z}}\\)arccos(z))
(modelo de função)
[ asinh(std::complex)](<#/doc/numeric/complex/asinh>)(C++11) | calcula o seno hiperbólico de área de um número complexo (\\({\small\operatorname{arsinh}{z}}\\)arsinh(z))
(modelo de função)
[ atanh(std::complex)](<#/doc/numeric/complex/atanh>)(C++11) | calcula a tangente hiperbólica de área de um número complexo (\\({\small\operatorname{artanh}{z}}\\)artanh(z))
(modelo de função)
[ cosh(std::complex)](<#/doc/numeric/complex/cosh>) | calcula o cosseno hiperbólico de um número complexo (\\({\small\cosh{z}}\\)cosh(z))
(modelo de função)
[ acoshacoshfacoshl](<#/doc/numeric/math/acosh>)(C++11)(C++11)(C++11) | calcula o cosseno hiperbólico inverso (\\({\small\operatorname{arcosh}{x}}\\)arcosh(x))
(função)
[Documentação C](<#/>) para cacosh