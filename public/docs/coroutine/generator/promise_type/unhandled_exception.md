# std::generator&lt;Ref,V,Allocator&gt;::promise_type::unhandled_exception

```cpp
void unhandled_exception();  // (desde C++23)
```

  
Seja x um objeto [generator](<#/doc/coroutine/generator>).

Se um [handle](<#/doc/coroutine/generator>) referindo-se à coroutine cujo [promise object](<#/doc/coroutine/generator/promise_type>) é *this estiver no topo de *`_[active_](<#/doc/coroutine/generator>)_` de x:

  * Se o handle referindo-se à coroutine cujo promise object é *this for o único elemento de *x.active_, equivalente a throw;.
  * Caso contrário, atribui [std::current_exception()](<#/doc/error/current_exception>) a `_[except_](<#/doc/coroutine/generator/promise_type>)_`.

Caso contrário, o comportamento é indefinido.

### Exceções

Pode lançar.