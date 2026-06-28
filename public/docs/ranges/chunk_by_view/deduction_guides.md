# Guias de dedução para std::ranges::chunk_by_view

```cpp
template< class R, class Pred >
chunk_by_view( R&&, Pred ) -> chunk_by_view<views::all_t<R>, Pred>;  // (desde C++23)
```

  
O [guia de dedução](<#/doc/language/ctad>) é fornecido para std::ranges::chunk_by_view para permitir a dedução a partir de [`range`](<#/doc/ranges/range>) e função predicado. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   