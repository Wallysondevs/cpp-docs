# std::expected&lt;T,E&gt;::value_or

```cpp
Modelo primário
template< class U >
constexpr T value_or( U&& default_value ) const&;  // (1) (desde C++23)
template< class U >
constexpr T value_or( U&& default_value ) &&;  // (2) (desde C++23)
```

  
Retorna o valor esperado se ele existir, caso contrário, retorna default_value.

A especialização parcial para void não possui essas funções membro.

1) Se [std::is_copy_constructible_v](<#/doc/types/is_copy_constructible>)&lt;T&gt; ou [std::is_convertible_v](<#/doc/types/is_convertible>)<U, T> for falso, o programa é malformado.

2) Se [std::is_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;T&gt; ou [std::is_convertible_v](<#/doc/types/is_convertible>)<U, T> for falso, o programa é malformado.

### Parâmetros

default_value  |  \-  |  o valor a ser usado caso *this não contenha um valor esperado   
  
### Valor de retorno

1) has_value() ? **this : static_cast&lt;T&gt;([std::forward](<#/doc/utility/forward>)&lt;U&gt;(default_value))

2) has_value() ? std::move(**this) : static_cast&lt;T&gt;([std::forward](<#/doc/utility/forward>)&lt;U&gt;(default_value))

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ value](<#/doc/utility/expected/value>) |  retorna o valor esperado   
(função membro pública)  