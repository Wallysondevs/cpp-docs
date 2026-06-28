# std::log10(std::complex)

Definido no cabeçalho `[<complex>](<#/doc/header/complex>)`

```c
template< class T >
std::complex<T> log10( const std::complex<T>& z );
```

Calcula o logaritmo comum (base 10) complexo de um valor complexo z com um corte de ramo ao longo do eixo real negativo.

O comportamento desta função é equivalente a `[std::log](<#/doc/numeric/complex/log>)(z) / [std::log](<#/doc/numeric/math/log>)(T(10))`.

### Parâmetros

- **z** — valor complexo

### Valor de retorno

Logaritmo comum complexo de z.

### Exemplo

Execute este código
```cpp
    #include <cmath>
    #include <complex>
    #include <iostream>
    
    int main()
    {
        std::complex<double> z(0.0, 1.0); // r = 0, θ = pi / 2
        std::cout << "2 * log10" << z << " = " << 2.0 * std::log10(z) << '\n';
    
        std::complex<double> z2(sqrt(2.0) / 2, sqrt(2.0) / 2); // r = 1, θ = pi / 4
        std::cout << "4 * log10" << z2 << " = " << 4.0 * std::log10(z2) << '\n';
    
        std::complex<double> z3(-100.0, 0.0); // r = 100, θ = pi
        std::cout << "log10" << z3 << " = " << std::log10(z3) << '\n';
        std::complex<double> z4(-100.0, -0.0); // the other side of the cut
        std::cout << "log10" << z4 << " = " << std::log10(z4) << " "
                     "(the other side of the cut)\n"
                     "(note: pi / log(10) = " << std::acos(-1.0) / std::log(10.0) << ")\n";
    }
```

Saída possível:
```
    2 * log10(0,1) = (0,1.36438)
    4 * log10(0.707107,0.707107) = (0,1.36438)
    log10(-100,0) = (2,1.36438)
    log10(-100,-0) = (2,-1.36438) (the other side of the cut)
    (note: pi / log(10) = 1.36438)
```

### Veja também

[ log(std::complex)](<#/doc/numeric/complex/log>) | logaritmo natural complexo com os cortes de ramo ao longo do eixo real negativo
(function template)
[ log10log10flog10l](<#/doc/numeric/math/log10>)(C++11)(C++11) | calcula o logaritmo comum (base 10) (\\({\small\log_{10}{x}}\\)log10(x))
(function)
[ log10(std::valarray)](<#/doc/numeric/valarray/log10>) | aplica a função [std::log10](<#/doc/numeric/math/log10>) a cada elemento de valarray
(function template)