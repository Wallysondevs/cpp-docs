# std::lock_guard&lt;Mutex&gt;::~lock_guard

```cpp
~lock_guard();  // (desde C++11)
```

  
Libera a posse do mutex possuído.

Efetivamente chama m.unlock() onde `m` é o mutex passado para o construtor de `lock_guard`.