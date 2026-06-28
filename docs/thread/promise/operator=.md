# std::promise&lt;R&gt;::operator=

```cpp
promise& operator=( promise&& other ) noexcept; // (1) (desde C++11)
promise& operator=( const promise& rhs ) = delete; // (2) (desde C++11)
```

Atribui o conteúdo.

1) Operador de atribuição por movimento. Primeiro, abandona o estado compartilhado (como em ~promise()), então atribui o estado compartilhado de `other` como se executasse [std::promise](<#/doc/thread/promise>)(std::move(other)).swap(*this).

2) `promise` não é atribuível por cópia.

### Parâmetros

| other | - | outra `promise` da qual adquirir o estado |

### Valor de retorno

`*this`
