# std::plus&lt;void&gt;

Definido no header `[<functional>](<#/doc/header/functional>)`

```cpp
template<>
class plus<void>;  // (desde C++14)
```

  
[std::plus](<#/doc/utility/functional/plus>)&lt;void&gt; é uma especialização de [std::plus](<#/doc/utility/functional/plus>) com tipo de parâmetro e de retorno deduzidos. 

### Tipos Membro

Tipo  |  Definição   
---|---
`is_transparent` |  [não especificado](<#/doc/utility/functional>)  
  
### Funções Membro

** operator()** |  retorna a soma de dois argumentos   
(função membro pública)  
  
##  std::plus&lt;void&gt;::operator()

template< class T, class U >  
constexpr auto operator()( T&& lhs, U&& rhs ) const  
-> decltype([std::forward](<#/doc/utility/forward>)&lt;T&gt;(lhs) + [std::forward](<#/doc/utility/forward>)&lt;U&gt;(rhs));

  
Retorna a soma de lhs e rhs. 

###  Parâmetros

lhs, rhs  |  \-  |  valores a somar   
  
###  Valor de retorno

[std::forward](<#/doc/utility/forward>)&lt;T&gt;(lhs) + [std::forward](<#/doc/utility/forward>)&lt;U&gt;(rhs). 

### Exemplo

Execute este código
```cpp
    #include <functional>
    #include <iostream>
     
    int main()
    {
        auto string_plus = std::plus<void>{}; // “void” can be omitted
        std::string a = "Hello ";
        const char* b = "world";
        std::cout << string_plus(a, b) << '\n';
    }
```

Saída: 
```
    Hello world
```