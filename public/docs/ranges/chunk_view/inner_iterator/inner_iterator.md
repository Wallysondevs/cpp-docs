# std::ranges::chunk_view&lt;V&gt;::inner-iterator::inner-iterator

```cpp
/*inner-iterator*/( /*inner-iterator*/&& other ) = default;  // (1) (desde C++23)
private:
constexpr explicit /*inner-iterator*/( chunk_view& parent );  // (2) (apenas para exposição*)
```

  
Constrói um iterator. 

1) Um construtor de movimento que inicializa por movimento o ponteiro subjacente [`_parent__`](<#/doc/ranges/chunk_view/inner_iterator>) com other.`_parent__`.

2) Um construtor privado que é usado por [`chunk_view::begin`](<#/doc/ranges/chunk_view/begin>). Este construtor não é acessível aos usuários. Inicializa [`_parent__`](<#/doc/ranges/chunk_view/inner_iterator>) com [std::addressof](<#/doc/memory/addressof>)(parent).

### Parâmetros

other  |  \-  |  um [iterator](<#/doc/ranges/chunk_view/inner_iterator>)  
---|---|---
parent  |  \-  |  o objeto ranges::chunk_view envolvente   
  
### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ operator=](<#/>)(C++23) |  atribui por movimento outro iterator   
(função membro pública)  