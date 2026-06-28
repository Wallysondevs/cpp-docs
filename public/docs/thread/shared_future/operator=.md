# std::shared_future&lt;T&gt;::operator=

```cpp
  // (1)
shared_future& operator=( const shared_future& other );  // (desde C++11)
(até C++17)
shared_future& operator=( const shared_future& other ) noexcept;  // (desde C++17)
shared_future& operator=( shared_future&& other ) noexcept;  // (2) (desde C++11)
```

  
Atribui o conteúdo de outro `shared_future`.

1) Libera qualquer estado compartilhado e atribui o conteúdo de other a *this. Após a atribuição, this->valid() == other.valid().

2) Libera qualquer estado compartilhado e atribui por movimento o conteúdo de other a *this. Após a atribuição, other.valid() == false e [this->valid()](<#/doc/thread/shared_future/valid>) produzirá o mesmo valor que other.valid() antes da atribuição.

### Parâmetros

other  |  \-  |  um `std::shared_future` que transferirá o estado para *this  
  
### Valor de retorno

*this