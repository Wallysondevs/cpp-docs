# std::future&lt;T&gt;::operator=

```cpp
future& operator=( future&& other ) noexcept;  // (1) (desde C++11)
future& operator=( const future& other ) = delete;  // (2) (desde C++11)
```

Atribui o conteúdo de outro objeto future.

1) Libera qualquer estado compartilhado e move-atribui o conteúdo de other para *this. Após a atribuição, other.valid() == false e [this->valid()](<#/doc/thread/future/valid>) produzirá o mesmo valor que other.valid() antes da atribuição.

2) [std::future](<#/doc/thread/future>) não é [CopyAssignable](<#/doc/named_req/CopyAssignable>).

### Parâmetros

- **other** — um `std::future` que transferirá o estado para *this

### Valor de retorno

*this