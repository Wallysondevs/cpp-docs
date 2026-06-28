# std::ranges::join_view&lt;V&gt;::iterator&lt;Const&gt;::operator*,-&gt;

```cpp
constexpr decltype(auto) operator*() const;  // (1) (desde C++20)
constexpr InnerIter operator->() const
requires /*has-arrow*/<InnerIter> && std::copyable<InnerIter>;  // (2) (desde C++20)
```

  
Retorna o elemento para o qual o iterator subjacente [`_inner__`](<#/doc/ranges/join_view/iterator>) aponta.

1) Equivalente a return *inner_;.

2) Equivalente a return inner_;.

### Parâmetros

(nenhum) 

### Valor de retorno

O elemento atual. 

### Exemplo

| Esta seção está incompleta  
Razão: sem exemplo   