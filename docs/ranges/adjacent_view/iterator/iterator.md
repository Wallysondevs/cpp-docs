```cpp
# std::ranges::adjacent_view<V,N>::iterator<Const>::iterator

/*iterator*/() = default; |  (1)  |  (desde C++23)  
---|---|---  
constexpr /*iterator*/( /*iterator*/<!Const> i )  
requires Const &&  
ranges::convertible_to<ranges::iterator_t<V>, ranges::iterator_t<Base>>; |  (2)  |  (desde C++23)  
| |   
  
Constrói um iterator. 

1) Construtor padrão. Inicializa por valor o array subjacente de iterators `_current__` para `_Base_`, como se por std::array<ranges::iterator_t<Base>, N>().

2) Conversão de /*iterator*/<false> para /*iterator*/<true>. Constrói por move o membro subjacente `_current__`.

Este iterator também possui dois construtores privados que são usados por ranges::adjacent_view::begin e ranges::adjacent_view::end. Esses construtores não são acessíveis aos usuários. 

### Parâmetros

i  |  \-  |  um /*iterator*/<false>  
---|---|---  
  
### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
---|---
```