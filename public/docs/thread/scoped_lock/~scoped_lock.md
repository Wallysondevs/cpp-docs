# std::scoped_lock&lt;MutexTypes...&gt;::~scoped_lock

```cpp
~scoped_lock();  // (desde C++17)
```

Libera a posse dos mutexes possuídos.

Efetivamente chama `unlock()` em cada mutex do pacote de mutexes passado para o construtor de `scoped_lock`.