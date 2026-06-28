# std::unique_lock&lt;Mutex&gt;::~unique_lock

```cpp
~unique_lock();  // (desde C++11)
```

  
Destrói o lock. Se *this tiver um mutex associado e tiver adquirido a propriedade dele, o mutex é desbloqueado. 