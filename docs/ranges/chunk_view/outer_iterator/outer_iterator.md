# std::ranges::chunk_view&lt;V&gt;::outer-iterator::outer-iterator

```cpp
/*outer-iterator*/( /*outer-iterator*/&& other ) = default;  // (1) (desde C++23)
private:
constexpr explicit /*outer-iterator*/( chunk_view& parent );  // (2) (apenas para exposição*)
```

  
Constrói um iterador. 

1) Construtor de movimento. Inicializa por movimento o ponteiro subjacente [`_parent__`](<#/doc/ranges/chunk_view/outer_iterator>) com other.`_parent__`.

2) Um construtor privado que é usado por [`chunk_view::begin`](<#/doc/ranges/chunk_view/begin>). Este construtor não é acessível aos usuários. Inicializa [`_parent__`](<#/doc/ranges/chunk_view/outer_iterator>) com [std::addressof](<#/doc/memory/addressof>)(parent).

### Parâmetros

other  |  \-  |  um [iterator](<#/doc/ranges/chunk_view/outer_iterator>)  
---|---|---
parent  |  \-  |  o objeto ranges::chunk_view envolvente   
  
### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Ver também

[ operator=](<#/>)(C++23) |  atribui por movimento outro iterator   
(função membro pública)  