# std::expected&lt;T,E&gt;::~expected

```cpp
constexpr ~expected();  // (desde C++23)
```

  
### Destrutor do template principal

Destrói o valor contido: 

  * Se [`has_value()`](<#/doc/utility/expected/operator_bool>) for true, destrói o valor esperado. 
  * Caso contrário, destrói o valor inesperado. 

Este destrutor é trivial se [std::is_trivially_destructible_v](<#/doc/types/is_destructible>)&lt;T&gt; e [std::is_trivially_destructible_v](<#/doc/types/is_destructible>)&lt;E&gt; forem ambos true. 

### Destrutor da especialização parcial void

Se [`has_value()`](<#/doc/utility/expected/operator_bool>) for false, destrói o valor inesperado. 

Este destrutor é trivial se [std::is_trivially_destructible_v](<#/doc/types/is_destructible>)&lt;E&gt; for true. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   