# std::sin(std::complex)

Definido no cabeçalho `[<complex>](<#/doc/header/complex>)`

```c
template< class T >
complex<T> sin( const complex<T>& z );
```

Calcula o seno complexo de um valor complexo z.

### Parâmetros

- **z** — valor complexo

### Valor de retorno

Se nenhum erro ocorrer, o seno complexo de z é retornado.

Erros e casos especiais são tratados como se a operação fosse implementada por -i *` `[`std::sinh`](<#/doc/numeric/complex/sinh>)`(i * z), onde `i` é a unidade imaginária.

### Observações

O seno é uma função inteira no plano complexo e não possui cortes de ramo.

A definição matemática do seno é sin z = eiz
-e-iz
---
2i
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
        std::complex<double> z(1.0, 0.0); // comporta-se como o seno real ao longo da linha real
        std::cout << "sin" << z << " = " << std::sin(z)
                  << " ( sin(1) = " << std::sin(1) << ")\n";
     
        std::complex<double> z2(0.0, 1.0); // comporta-se como o sinh ao longo da linha imaginária
        std::cout << "sin" << z2 << " = " << std::sin(z2)
                  << " (sinh(1) = " << std::sinh(1) << ")\n";
    }
```

Saída:
```
    sin(1.000000,0.000000) = (0.841471,0.000000) ( sin(1) = 0.841471)
    sin(0.000000,1.000000) = (0.000000,1.175201) (sinh(1) = 1.175201)
```

### Veja também

[ cos(std::complex)](<#/doc/numeric/complex/cos>) | calcula o cosseno de um número complexo (\\({\small\cos{z}}\\)cos(z))
(modelo de função)
[ tan(std::complex)](<#/doc/numeric/complex/tan>) | calcula a tangente de um número complexo (\\({\small\tan{z}}\\)tan(z))
(modelo de função)
[ asin(std::complex)](<#/doc/numeric/complex/asin>)(desde C++11) | calcula o arco seno de um número complexo (\\({\small\arcsin{z}}\\)arcsin(z))
(modelo de função)
[ sinsinfsinl](<#/doc/numeric/math/sin>)(desde C++11)(desde C++11) | calcula o seno (\\({\small\sin{x}}\\)sin(x))
(função)
[ sin(std::valarray)](<#/doc/numeric/valarray/sin>) | aplica a função [std::sin](<#/doc/numeric/math/sin>) a cada elemento de valarray
(modelo de função)
[Documentação C](<#/>) para csin