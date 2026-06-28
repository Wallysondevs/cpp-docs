# std::expected&lt;T,E&gt;::error_or

```cpp
template< class G = E >
constexpr E error_or( G&& default_value ) const&;  // (1) (desde C++23)
template< class G = E >
constexpr E error_or( G&& default_value ) &&;  // (2) (desde C++23)
```

  
Retorna o valor inesperado se ele existir, caso contrário, retorna default_value. 

1) Se [std::is_copy_constructible_v](<#/doc/types/is_copy_constructible>)&lt;E&gt; ou [std::is_convertible_v](<#/doc/types/is_convertible>)<G, E> for falso, o programa é malformado.

2) Se [std::is_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;E&gt; ou [std::is_convertible_v](<#/doc/types/is_convertible>)<G, E> for falso, o programa é malformado.

### Parâmetros

default_value  |  \-  |  o valor a ser usado caso *this não contenha um valor inesperado   
Requisitos de tipo   
  
### Valor de retorno

1) has_value() ? [std::forward](<#/doc/utility/forward>)&lt;G&gt;(default_value) : error()

2) has_value() ? [std::forward](<#/doc/utility/forward>)&lt;G&gt;(default_value) : std::move(error())

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ error](<#/doc/utility/expected/error>) |  retorna o valor inesperado   
(função membro pública)  