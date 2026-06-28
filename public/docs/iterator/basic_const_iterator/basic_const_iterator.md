# std::basic_const_iterator&lt;Iter&gt;::basic_const_iterator

```cpp
basic_const_iterator() requires std::default_initializable<Iter> = default;  // (1) (desde C++23)
constexpr basic_const_iterator( Iter x );  // (2) (desde C++23)
template< std::convertible_to<Iter> U >
constexpr basic_const_iterator( basic_const_iterator<U> other );  // (3) (desde C++23)
template< /*different-from*/<basic_const_iterator> T >
requires std::convertible_to<T, Iter>
constexpr basic_const_iterator( T&& x );  // (4) (desde C++23)
```

  
Constrói um novo adaptador de iterator.

1) Construtor padrão. O iterator subjacente é inicializado por valor.

2) O iterator subjacente é inicializado com std::move(x).

3) O iterator subjacente é inicializado com o de other.

4) O iterator subjacente é inicializado com [std::forward](<#/doc/utility/forward>)&lt;T&gt;(x).

### Parâmetros

x  |  \-  |  iterator a ser adaptado   
---|---|---
other  |  \-  |  adaptador de iterator a ser copiado   
  
### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ operator=](<https://en.cppreference.com/mwiki/index.php?title=cpp/iterator/basic_const_iterator/operator%3D&action=edit&redlink=1> "cpp/iterator/basic const iterator/operator= \(page does not exist\)") |  atribui outro adaptador de iterator   
(função membro pública)  