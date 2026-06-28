# std::minus&lt;void&gt;

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```c
template<>
class minus<void>;
```

  
[std::minus](<#/doc/utility/functional/minus>)&lt;void&gt; é uma especialização de [std::minus](<#/doc/utility/functional/minus>) com tipo de parâmetro e de retorno deduzidos. 

### Tipos de Membro

Tipo  |  Definição   
---|---
`is_transparent` |  [não especificado](<#/doc/utility/functional>)  
  
### Funções Membro

** operator()** |  retorna a diferença de dois argumentos   
(função membro pública)  
  
##  std::minus&lt;void&gt;::operator()

template< class T, class U >  
constexpr auto operator()( T&& lhs, U&& rhs ) const  
-> decltype([std::forward](<#/doc/utility/forward>)&lt;T&gt;(lhs) - [std::forward](<#/doc/utility/forward>)&lt;U&gt;(rhs));

  
Retorna a diferença de lhs e rhs. 

###  Parâmetros

lhs, rhs  |  \-  |  valores a subtrair   
  
###  Valor de retorno

[std::forward](<#/doc/utility/forward>)&lt;T&gt;(lhs) - [std::forward](<#/doc/utility/forward>)&lt;U&gt;(rhs). 

### Exemplo

Execute este código
```cpp 
    #include <complex>
    #include <functional>
    #include <iostream>
    
    int main()
    {
        auto complex_minus = std::minus<void>{}; // "void" pode ser omitido
        constexpr std::complex<int> z(4, 2);
        std::cout << complex_minus(z, 1) << '\n';
        std::cout << (z - 1) << '\n';
    }
```

Saída: 
```
    (3,2)
    (3,2)
```