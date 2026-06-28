# std::future&lt;T&gt;::future

```cpp
future() noexcept;  // (1) (desde C++11)
future( future&& other ) noexcept;  // (2) (desde C++11)
future( const future& other ) = delete;  // (3) (desde C++11)
```

Constrói um objeto `std::future`.

1) Construtor padrão. Constrói um `std::future` sem estado compartilhado. Após a construção, [valid()](<#/doc/thread/future/valid>) == false.

2) Construtor de movimento. Constrói um `std::future` com o estado compartilhado de `other` usando *move semantics*. Após a construção, `other.valid()` == false.

3) `std::future` não é [CopyConstructible](<#/doc/named_req/CopyConstructible>).

### Parâmetros

- **other** — outro `std::future` do qual adquirir o estado compartilhado