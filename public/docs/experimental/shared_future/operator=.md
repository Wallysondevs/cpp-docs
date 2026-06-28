# std::experimental::shared_future&lt;T&gt;::operator=

```cpp
std::experimental::shared_future<T>& operator=( const std::experimental::shared_future<T>& other );  // (1)
std::experimental::shared_future<T>& operator=( std::experimental::shared_future<T>&& other ) noexcept;  // (2)
```

  
Atribui o conteúdo de outro objeto `std::experimental::shared_future`.

1) Libera qualquer estado compartilhado e atribui o conteúdo de `other` a `*this`. Após a atribuição, `this->valid() == other.valid()`.

2) Libera qualquer estado compartilhado e move-atribui o conteúdo de `other` a `*this`. Após a atribuição, `other.valid() == false` e `this->valid()` produzirá o mesmo valor que `other.valid()` antes da atribuição.

### Parâmetros

other  |  \-  |  um objeto `std::experimental::shared_future` do qual atribuir   
  
### Valor de retorno

`*this`