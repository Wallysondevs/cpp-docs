# Guias de dedução para std::ranges::zip_view

```cpp
template< class... Rs >
zip_view( Rs&&... ) -> zip_view<views::all_t<Rs>...>;  // (desde C++23)
```

  
O [guia de dedução](<#/doc/language/ctad>) é fornecido para std::ranges::zip_view para permitir a dedução a partir de [`range`s](<#/doc/ranges/range>). 

### Exemplo

| Esta seção está incompleta  
Razão: exemplo   