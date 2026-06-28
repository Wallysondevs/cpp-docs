# std::ranges::slide_view&lt;V&gt;::sentinel::sentinel

```cpp
/*sentinel*/() = default;  // (1) (desde C++23)
private:
constexpr /*sentinel*/( ranges::sentinel_t<V> end );  // (2) (apenas para exposição*)
```

  
Constrói um [sentinel](<#/doc/ranges/slide_view/sentinel>). 

1) Construtor padrão. [Inicializa por valor](<#/doc/language/value_initialization>) o sentinel subjacente [`_end__`](<#/doc/ranges/slide_view/sentinel>) com [ranges::sentinel_t](<#/doc/ranges/iterator_t>)&lt;V&gt;().

2) Um construtor privado que é usado por slide_view::end. Este construtor não é acessível aos usuários. Inicializa [`_end__`](<#/doc/ranges/slide_view/sentinel>) com end.

### Parâmetros

end  |  \-  |  um sentinel   
  
### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   