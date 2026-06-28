# std::generator&lt;Ref,V,Allocator&gt;::promise_type::initial_suspend

```cpp
std::suspend_always initial_suspend() const noexcept;  // (desde C++23)
```

  
Informa que [`std::generator`](<#/doc/coroutine/generator>) sempre inicia de forma preguiçosa (em estado suspenso).

Equivalente a return [std::suspend_always](<#/doc/coroutine/suspend_always>){};.

### Valor de retorno

Um objeto [awaitable](<#/doc/coroutine/suspend_always>).