# std::bit_xor&lt;void&gt;

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```c
template<>
class bit_xor<void>;
```

  
[std::bit_xor](<#/doc/utility/functional/bit_xor>)&lt;void&gt; é uma especialização de std::bit_xor com tipo de parâmetro e de retorno deduzidos. 

### Tipos aninhados

Tipo aninhado  |  Definição   
---|---
`is_transparent` |  [não especificado](<#/doc/utility/functional>)  
  
### Funções membro

** operator()** |  aplica `operator^` a lhs e rhs   
(função membro pública)  
  
##  std::bit_xor&lt;void&gt;::operator()

template< class T, class U >  
constexpr auto operator()( T&& lhs, U&& rhs ) const  
-> decltype([std::forward](<#/doc/utility/forward>)&lt;T&gt;(lhs) ^ [std::forward](<#/doc/utility/forward>)&lt;U&gt;(rhs));

  
Retorna o resultado de [std::forward](<#/doc/utility/forward>)&lt;T&gt;(lhs) ^ [std::forward](<#/doc/utility/forward>)&lt;U&gt;(rhs). 

###  Parâmetros

lhs, rhs  |  \-  |  valores para XOR bit a bit   
  
###  Valor de retorno

[std::forward](<#/doc/utility/forward>)&lt;T&gt;(lhs) ^ [std::forward](<#/doc/utility/forward>)&lt;U&gt;(rhs). 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   