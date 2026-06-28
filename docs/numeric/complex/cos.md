# std::cos(std::complex)

Definido no cabeçalho `[<complex>](<#/doc/header/complex>)`

```c
template< class T >
complex<T> cos( const complex<T>& z );
```

Calcula o cosseno complexo de um valor complexo z.

### Parâmetros

- **z** — valor complexo

### Valor de retorno

Se nenhum erro ocorrer, o cosseno complexo de z é retornado.

Erros e casos especiais são tratados como se a operação fosse implementada por `[std::cosh](<#/doc/numeric/complex/cosh>)(i * z)`, onde `i` é a unidade imaginária.

### Observações

O cosseno é uma função inteira no plano complexo e não possui cortes de ramo.

A definição matemática do cosseno é cos z = eiz
+e-iz

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
        std::complex<double> z(1.0, 0.0); // behaves like real cosine along the real line
        std::cout << "cos" << z << " = " << std::cos(z)
                  << " ( cos(1) = " << std::cos(1) << ")\n";
    
        std::complex<double> z2(0.0, 1.0); // behaves like real cosh along the imaginary line
        std::cout << "cos" << z2 << " = " << std::cos(z2)
                  << " (cosh(1) = " << std::cosh(1) << ")\n";
    }
```

Saída:
```
    cos(1.000000,0.000000) = (0.540302,-0.000000) ( cos(1) = 0.540302)
    cos(0.000000,1.000000) = (1.543081,-0.000000) (cosh(1) = 1.543081)
```

### Veja também

[ sin(std::complex)](<#/doc/numeric/complex/sin>) | calcula o seno de um número complexo (\\({\small\sin{z}}\\)sin(z))
(modelo de função)
[ tan(std::complex)](<#/doc/numeric/complex/tan>) | calcula a tangente de um número complexo (\\({\small\tan{z}}\\)tan(z))
(modelo de função)
[ acos(std::complex)](<#/doc/numeric/complex/acos>)(desde C++11) | calcula o arco cosseno de um número complexo (\\({\small\arccos{z}}\\)arccos(z))
(modelo de função)
[ coscosfcosl](<#/doc/numeric/math/cos>)(desde C++11)(desde C++11) | calcula o cosseno (\\({\small\cos{x}}\\)cos(x))
(função)
[ cos(std::valarray)](<#/doc/numeric/valarray/cos>) | aplica a função [std::cos](<#/doc/numeric/math/cos>) a cada elemento de valarray
(modelo de função)
[documentação C](<#/>) para ccos