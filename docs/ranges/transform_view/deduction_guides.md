# Guias de dedução para std::ranges::transform_view

```cpp
template< class R, class F >
transform_view( R&&, F ) -> transform_view<views::all_t<R>, F>;  // (desde C++20)
```

  
O [guia de dedução](<#/doc/language/ctad>) é fornecido para [std::ranges::transform_view](<#/doc/ranges/transform_view>) para permitir a dedução a partir de [`range`](<#/doc/ranges/range>) e função de transformação. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   