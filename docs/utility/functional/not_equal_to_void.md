# std::not_equal_to&lt;void&gt;

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```c
template<>
class not_equal_to<void>;
```

  
[std::not_equal_to](<#/doc/utility/functional/not_equal_to>)&lt;void&gt; é uma especialização de [std::not_equal_to](<#/doc/utility/functional/not_equal_to>) com tipo de parâmetro e de retorno deduzidos. 

### Tipos aninhados

Tipo aninhado  |  Definição   
---|---
`is_transparent` |  [não especificado](<#/doc/utility/functional>)  
  
### Funções membro

** operator()** |  testa se os dois argumentos não se comparam como iguais   
(função membro pública)  
  
##  std::not_equal_to&lt;void&gt;::operator()

template< class T, class U >  
constexpr auto operator()( T&& lhs, U&& rhs ) const  
-> decltype([std::forward](<#/doc/utility/forward>)&lt;T&gt;(lhs) != [std::forward](<#/doc/utility/forward>)&lt;U&gt;(rhs));

  
Retorna o resultado da comparação de não-igualdade entre lhs e rhs. 

###  Parâmetros

lhs, rhs  |  \-  |  valores a comparar   
  
###  Valor de retorno

[std::forward](<#/doc/utility/forward>)&lt;T&gt;(lhs) != [std::forward](<#/doc/utility/forward>)&lt;U&gt;(rhs). 

### Exemplo

Execute este código
```cpp
    #include <functional>
     
    int main()
    {
        constexpr int p = 0, q = 8;
        std::not_equal_to<> not_equal{};
        static_assert(!not_equal(p, p));
        static_assert(not_equal(p, q));
    }
```