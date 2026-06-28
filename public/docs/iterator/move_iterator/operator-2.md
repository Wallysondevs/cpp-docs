# operator-(std::move_iterator&lt;Iter&gt;, std::move_sentinel)

```cpp
template< std::sized_sentinel_for<Iter> S >
friend constexpr std::iter_difference_t<Iter>
operator-( const std::move_sentinel<S>& s, const move_iterator& i );  // (1) (desde C++20)
template< std::sized_sentinel_for<Iter> S >
friend constexpr std::iter_difference_t<Iter>
operator-( const move_iterator& i, const std::move_sentinel<S>& s );  // (2) (desde C++20)
```

  
Retorna a distância entre um `move_iterator` e um `move_sentinel`.

Esses function templates não são visíveis para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) comum, e só podem ser encontrados por [argument-dependent lookup](<#/doc/language/adl>) quando [std::move_iterator](<#/doc/iterator/move_iterator>)&lt;Iter&gt; é uma classe associada dos argumentos.

### Parâmetros

i  |  \-  |  [std::move_iterator](<#/doc/iterator/move_iterator>)&lt;Iter&gt;  
---|---|---
s  |  \-  |  [std::move_sentinel](<#/doc/iterator/move_sentinel>)&lt;S&gt;, onde `S` modela [std::sized_sentinel_for](<#/doc/iterator/sized_sentinel_for>)&lt;Iter&gt;  
  
### Valor de retorno

1) s.base() - i.base()

2) i.base() - s.base()

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Ver também

[ operator-](<#/doc/iterator/move_iterator/operator->)(C++11) | calcula a distância entre dois adaptadores de iterator   
(modelo de função)  