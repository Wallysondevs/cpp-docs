# std::divides&lt;void&gt;

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```c
template<>
class divides<void>;
```

  
[std::divides](<#/doc/utility/functional/divides>)&lt;void&gt; é uma especialização de [std::divides](<#/doc/utility/functional/divides>) com tipo de parâmetro e de retorno deduzidos. 

### Tipos Membro

Tipo  |  Definição   
---|---
`is_transparent` |  [não especificado](<#/doc/utility/functional>)  
  
### Funções Membro

** operator()** |  retorna o quociente de dois argumentos   
(função membro pública)  
  
##  std::divides&lt;void&gt;::operator()

template< class T, class U >  
constexpr auto operator()( T&& lhs, U&& rhs ) const  
-> decltype([std::forward](<#/doc/utility/forward>)&lt;T&gt;(lhs) / [std::forward](<#/doc/utility/forward>)&lt;U&gt;(rhs));

  
Retorna o quociente de lhs e rhs. 

###  Parâmetros

lhs, rhs  |  \-  |  valores a dividir   
  
###  Valor de retorno

[std::forward](<#/doc/utility/forward>)&lt;T&gt;(lhs) / [std::forward](<#/doc/utility/forward>)&lt;U&gt;(rhs). 

### Exemplo

Execute este código
```
    #include <complex>
    #include <functional>
    #include <iostream>
     
    int main()
    {
        auto complex_divides = std::divides<void>{}; // “void” pode ser omitido
        constexpr std::complex z1{8.0, 4.0}, z2{1.0, 2.0};
     
        std::cout << std::showpos
                  << complex_divides(z1, z2) << ' ' << z1 / z2 << '\n'
                  << complex_divides(z1, 5.) << ' ' << z1 / 5. << '\n'
                  << complex_divides(6., z2) << ' ' << 6. / z2 << '\n';
    }
```

Saída: 
```
    (+3.2,-2.4) (+3.2,-2.4)
    (+1.6,+0.8) (+1.6,+0.8)
    (+1.2,-2.4) (+1.2,-2.4)
```