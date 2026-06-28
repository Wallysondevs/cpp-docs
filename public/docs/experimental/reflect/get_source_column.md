# std::experimental::reflect::get_source_column

Definido no cabeçalho `[<experimental/reflect>](<#/doc/header/experimental/reflect>)`

```c
template< Object T >
struct get_source_column;
```

  
Fornece a constante membro `value` igual ao valor definido pela implementação que representa algum deslocamento do início da linha da declaração da entidade ou nome de tipo (typedef-name) refletido por `T`. 

### Modelo de variável auxiliar 

template< class T >  
constexpr auto get_source_column_v = get_source_column&lt;T&gt;::value; |  |  (reflection TS)  

  
## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] |  o valor definido pela implementação que representa algum deslocamento do início da linha da declaração da entidade ou nome de tipo (typedef-name) refletido por `T`   
(constante membro estática pública)  
  
### Funções membro

operator std::uint_least32_t |  converte o objeto para [std::uint_least32_t](<#/doc/types/integer>), retorna `value`   
(função membro pública)  
operator()(C++14) |  retorna `value`   
(função membro pública)  
  
### Tipos membro

Tipo  |  Definição   
---|---
`value_type` |  [std::uint_least32_t](<#/doc/types/integer>)  
`type` |  [std::integral_constant](<#/doc/types/integral_constant>)<[std::uint_least32_t](<#/doc/types/integer>), value>  
  
### Exemplo

| Esta seção está incompleta  
Razão: exemplos   
  
### Veja também

[ column](<#/doc/utility/source_location/column>) |  retorna o número da coluna representado por este objeto   
(função membro pública de `std::source_location`)  