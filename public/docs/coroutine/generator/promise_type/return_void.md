# std::generator&lt;Ref,V,Allocator&gt;::promise_type::return_void

```cpp
void return_void() const noexcept {}  // (desde C++23)
```

  
Nenhuma operação. Uma corrotina fornecida pelo usuário que usa o [generator](<#/doc/coroutine/generator>) não pode emitir um valor através do operador co_return ou ao atingir o fim do corpo da corrotina.