# std::shared_lock&lt;Mutex&gt;::~shared_lock

```cpp
~shared_lock();  // (desde C++14)
```

  
Destrói o lock.

Se `*this` possui um mutex associado (([mutex()](<#/doc/thread/shared_lock/mutex>) retorna um ponteiro não nulo) e adquiriu a posse dele (owns() retorna true), o mutex é desbloqueado chamando [unlock_shared()](<#/doc/thread/shared_mutex/unlock_shared>).