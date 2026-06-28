# std::barrier&lt;CompletionFunction&gt;::~barrier

```cpp
~barrier();  // (desde C++20)
```

  
Destrói a `barrier`. 

### Observações

É seguro invocar o destrutor apenas se todas as threads tiverem sido notificadas. O programador deve garantir que nenhuma thread tente esperar por *this uma vez que o destrutor tenha sido iniciado. O destrutor não notifica e libera nenhuma thread em espera. 