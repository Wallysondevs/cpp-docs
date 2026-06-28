# Guias de dedução para std::ranges::zip_transform_view

```cpp
template< class F, class... Rs >
zip_transform_view( F, Rs&&... ) -> zip_transform_view<F, views::all_t<Rs>...>;  // (desde C++23)
```

  
O [guia de dedução](<#/doc/language/ctad>) é fornecido para std::ranges::zip_transform_view para permitir a dedução a partir da função de transformação e dos [`range`s](<#/doc/ranges/range>). 

### Exemplo

| Esta seção está incompleta  
Razão: exemplo   