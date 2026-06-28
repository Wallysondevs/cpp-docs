# Guias de dedução para std::ranges::join_view

```cpp
template<class R>
explicit join_view(R&&) -> join_view<views::all_t<R>>;  // (desde C++20)
```

  
O [guia de dedução](<#/doc/language/ctad>) é fornecido para std::ranges::join_view para permitir a dedução a partir de [`range`](<#/doc/ranges/range>). 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   