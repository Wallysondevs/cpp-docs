# std::counting_semaphore&lt;LeastMaxValue&gt;::~counting_semaphore

```cpp
~counting_semaphore();  // (desde C++20)
```

  
Destrói o objeto `counting_semaphore`.

### Notas

É seguro invocar o destrutor apenas se todas as threads tiverem sido notificadas. O programador deve garantir que nenhuma thread tente esperar por *this uma vez que o destrutor tenha sido iniciado. O destrutor não notifica e nem libera nenhuma thread em espera.