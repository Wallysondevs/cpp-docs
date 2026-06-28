# std::asin(std::complex)

Definido no cabeçalho `[<complex>](<#/doc/header/complex>)`

```c
template< class T >
std::complex<T> asin( const std::complex<T>& z );
```

Calcula o arco seno complexo de um valor complexo z. O corte de ramo existe fora do intervalo [−1, +1] ao longo do eixo real.

### Parâmetros

- **z** — valor complexo

### Valor de retorno

Se nenhum erro ocorrer, o arco seno complexo de z é retornado, no intervalo de uma faixa ilimitada ao longo do eixo imaginário e no intervalo [−π/2, +π/2] ao longo do eixo real.

Erros e casos especiais são tratados como se a operação fosse implementada por `-i * [std::asinh](<#/doc/numeric/complex/asinh>)(i * z)`, onde `i` é a unidade imaginária.

### Notas

O seno inverso (ou arco seno) é uma função multivalorada e requer um corte de ramo no plano complexo. O corte de ramo é convencionalmente colocado nos segmentos de linha (-∞,-1) e (1,∞) do eixo real.

A definição matemática do valor principal do arco seno é \\(\small \arcsin z = -{\rm i}\ln({\rm i}z+\sqrt{1-z^2})\\)arcsin z = -_i_ ln(_i_ z + √1-z2
).

Para qualquer z, \\(\small{ \arcsin(z) = \arccos(-z) - \frac{\pi}{2} }\\)asin(z) = acos(-z) - π
---
2
.

### Exemplo

Execute este código
```cpp
    #include <cmath>
    #include <complex>
    #include <iostream>
    
    int main()
    {
        std::cout << std::fixed;
        std::complex<double> z1(-2.0, 0.0);
        std::cout << "asin" << z1 << " = " << std::asin(z1) << '\n';
    
        std::complex<double> z2(-2.0, -0.0);
        std::cout << "asin" << z2 << " (the other side of the cut) = "
                  << std::asin(z2) << '\n';
    
        // for any z, asin(z) = acos(−z) − pi / 2
        const double pi = std::acos(-1);
        std::complex<double> z3 = std::acos(z2) - pi / 2;
        std::cout << "sin(acos" << z2 << " - pi / 2) = " << std::sin(z3) << '\n';
    }
```

Saída:
```
    asin(-2.000000,0.000000) = (-1.570796,1.316958)
    asin(-2.000000,-0.000000) (the other side of the cut) = (-1.570796,-1.316958)
    sin(acos(-2.000000,-0.000000) - pi / 2) = (2.000000,0.000000)
```

### Veja também

[ acos(std::complex)](<#/doc/numeric/complex/acos>)(C++11) | calcula o arco cosseno de um número complexo (\\({\small\arccos{z}}\\)arccos(z))
(modelo de função)
[ atan(std::complex)](<#/doc/numeric/complex/atan>)(C++11) | calcula o arco tangente de um número complexo (\\({\small\arctan{z}}\\)arctan(z))
(modelo de função)
[ sin(std::complex)](<#/doc/numeric/complex/sin>) | calcula o seno de um número complexo (\\({\small\sin{z}}\\)sin(z))
(modelo de função)
[ asinasinfasinl](<#/doc/numeric/math/asin>)(C++11)(C++11) | calcula o arco seno (\\({\small\arcsin{x}}\\)arcsin(x))
(função)
[ asin(std::valarray)](<#/doc/numeric/valarray/asin>) | aplica a função [std::asin](<#/doc/numeric/math/asin>) a cada elemento de valarray
(modelo de função)
[Documentação C](<#/>) para casin