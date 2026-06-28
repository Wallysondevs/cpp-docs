# std::generator&lt;Ref,V,Allocator&gt;::promise_type::get_return_object

```cpp
std::generator get_return_object() noexcept;  // (desde C++23)
```

  
Retorna um objeto [generator](<#/doc/coroutine/generator>) cujo membro [`_coroutine__`](<#/doc/coroutine/generator>) é obtido através da expressão [std::coroutine_handle](<#/doc/coroutine/coroutine_handle>)<promise_type>::from_promise(*this), e cujo membro [`_active__`](<#/doc/coroutine/generator>) aponta para uma pilha vazia. 

### Parâmetros

(nenhum) 

### Valor de retorno

O objeto [generator](<#/doc/coroutine/generator>). 