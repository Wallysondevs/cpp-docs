# std::tan(std::complex)

Definido no cabeçalho `[<complex>](<#/doc/header/complex>)`

```c
template< class T >
complex<T> tan( const complex<T>& z );
```

Calcula a tangente complexa de um valor complexo z.

### Parâmetros

- **z** — valor complexo

### Valor de retorno

Se nenhum erro ocorrer, a tangente complexa de z é retornada.

Erros e casos especiais são tratados como se a operação fosse implementada por -i *` `[`std::tanh`](<#/doc/numeric/complex/tanh>)`(i * z), onde `i` é a unidade imaginária.

### Notas

A tangente é uma função analítica no plano complexo e não possui cortes de ramo. É periódica em relação à componente real, com período πi, e possui polos de primeira ordem ao longo da linha real, nas coordenadas (π(1/2 + n), 0). No entanto, nenhuma representação comum de ponto flutuante é capaz de representar π/2 exatamente, portanto, não há valor do argumento para o qual ocorra um erro de polo.

A definição matemática da tangente é tan z = i(e-iz
-eiz
)
---
e-iz
+eiz
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
        std::complex<double> z(1.0, 0.0); // behaves like real tangent along the real line
        std::cout << "tan" << z << " = " << std::tan(z)
                  << " ( tan(1) = " << std::tan(1) << ")\n";
    
        std::complex<double> z2(0.0, 1.0); // behaves like tanh along the imaginary line
        std::cout << "tan" << z2 << " = " << std::tan(z2)
                  << " (tanh(1) = " << std::tanh(1) << ")\n";
    }
```

Saída:
```
    tan(1.000000,0.000000) = (1.557408,0.000000) ( tan(1) = 1.557408)
    tan(0.000000,1.000000) = (0.000000,0.761594) (tanh(1) = 0.761594)
```

### Veja também

[ sin(std::complex)](<#/doc/numeric/complex/sin>) | calcula o seno de um número complexo (\\({\small\sin{z}}\\)sin(z))
(modelo de função)
[ cos(std::complex)](<#/doc/numeric/complex/cos>) | calcula o cosseno de um número complexo (\\({\small\cos{z}}\\)cos(z))
(modelo de função)
[ atan(std::complex)](<#/doc/numeric/complex/atan>)(C++11) | calcula o arco tangente de um número complexo (\\({\small\arctan{z}}\\)arctan(z))
(modelo de função)
[ tantanftanl](<#/doc/numeric/math/tan>)(C++11)(C++11) | calcula a tangente (\\({\small\tan{x}}\\)tan(x))
(função)
[ tan(std::valarray)](<#/doc/numeric/valarray/tan>) | aplica a função [std::tan](<#/doc/numeric/math/tan>) a cada elemento de valarray
(modelo de função)
[Documentação C](<#/>) para ctan