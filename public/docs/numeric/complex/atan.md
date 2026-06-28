# std::atan(std::complex)

Definido no cabeçalho `[<complex>](<#/doc/header/complex>)`

```c
template< class T >
complex<T> atan( const complex<T>& z );
```

  
Calcula a arcotangente complexa de um valor complexo z. O corte de ramo existe fora do intervalo [−i, +i] ao longo do eixo imaginário. 

### Parâmetros

z  |  \-  |  valor complexo   
  
### Valor de retorno

Se nenhum erro ocorrer, a arcotangente complexa de z é retornada, no intervalo de uma faixa ilimitada ao longo do eixo imaginário e no intervalo [−π/2, +π/2] ao longo do eixo real. 

Erros e casos especiais são tratados como se a operação fosse implementada por -i *` `[`std::atanh`](<#/doc/numeric/complex/atanh>)`(i * z), onde `i` é a unidade imaginária. 

### Notas

A tangente inversa (ou arcotangente) é uma função multivalorada e requer um corte de ramo no plano complexo. O corte de ramo é convencionalmente colocado nos segmentos de linha (-∞i,-i) e (+i,+∞i) do eixo imaginário. 

A definição matemática do valor principal da tangente inversa é atan z = -1  
---  
2  
i [ln(1 - iz) - ln (1 + iz)]. 

### Exemplo

Execute este código
```cpp 
    #include <cmath>
    #include <complex>
    #include <iostream>
     
    int main()
    {
        std::cout << std::fixed;
        std::complex<double> z1(0.0, 2.0);
        std::cout << "atan" << z1 << " = " << std::atan(z1) << '\n';
     
        std::complex<double> z2(-0.0, 2.0);
        std::cout << "atan" << z2 << " (the other side of the cut) = "
                  << std::atan(z2) << '\n';
     
        std::complex<double> z3(0.0, INFINITY);
        std::cout << "2 * atan" << z3 << " = " << 2.0 * std::atan(z3) << '\n';
    }
```

Saída: 
```
    atan(0.000000,2.000000) = (1.570796,0.549306)
    atan(-0.000000,2.000000) (the other side of the cut) = (-1.570796,0.549306)
    2 * atan(0.000000,inf) = (3.141593,0.000000)
```

### Veja também

[ asin(std::complex)](<#/doc/numeric/complex/asin>)(desde C++11) | calcula o arco seno de um número complexo (\\({\small\arcsin{z}}\\)arcsin(z))   
(modelo de função)  
[ acos(std::complex)](<#/doc/numeric/complex/acos>)(desde C++11) | calcula o arco cosseno de um número complexo (\\({\small\arccos{z}}\\)arccos(z))   
(modelo de função)  
[ tan(std::complex)](<#/doc/numeric/complex/tan>) | calcula a tangente de um número complexo (\\({\small\tan{z}}\\)tan(z))   
(modelo de função)  
[ atanatanfatanl](<#/doc/numeric/math/atan>)(desde C++11)(desde C++11) | calcula a arcotangente (\\({\small\arctan{x}}\\)arctan(x))   
(função)  
[ atan(std::valarray)](<#/doc/numeric/valarray/atan>) | aplica a função [std::atan](<#/doc/numeric/math/atan>) a cada elemento de valarray   
(modelo de função)  
[documentação C](<#/>) para catan