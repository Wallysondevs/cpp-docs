# std::shared_future&lt;T&gt;::shared_future

```cpp
shared_future() noexcept;  // (1) (desde C++11)
  // (2)
shared_future( const shared_future& other );  // (desde C++11)
(ate C++17)
shared_future( const shared_future& other ) noexcept;  // (desde C++17)
shared_future( std::future<T>&& other ) noexcept;  // (3) (desde C++11)
shared_future( shared_future&& other ) noexcept;  // (4) (desde C++11)
```

Constrói um novo `shared_future`.

1) Construtor padrão. Constrói um shared future vazio, que não se refere a um estado compartilhado, ou seja, valid() == false.

2) Constrói um shared future que se refere ao mesmo estado compartilhado, se houver, que `other`.

3,4) Transfere o estado compartilhado mantido por `other` para `*this`. Após a construção, `other.valid() == false`, e `this->valid()` retorna o mesmo valor que `other.valid()` teria retornado antes da construção.

### Parâmetros

- **other** — outro objeto future para inicializar