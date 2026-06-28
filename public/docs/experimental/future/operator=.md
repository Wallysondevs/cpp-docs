# std::experimental::future&lt;T&gt;::operator=

```cpp
std::experimental::future<T>& operator=( std::experimental::future<T>&& other ) noexcept;  // (1)
std::experimental::future<T>& operator=( const std::experimental::future<T>& other ) = delete;  // (2)
```

  
Atribui o conteúdo de outro objeto future.

1) Libera qualquer estado compartilhado e move-atribui o conteúdo de `other` para `*this`. Após a atribuição, `other.valid() == false` e `[this->valid()](<#/doc/thread/future/valid>)` produzirá o mesmo valor que `other.valid()` antes da atribuição.

2) `std::experimental::future` não é [CopyAssignable](<#/doc/named_req/CopyAssignable>).

### Parâmetros

other  |  \-  |  um `std::experimental::future` que transferirá o estado para `*this`  
  
### Valor de retorno

`*this`