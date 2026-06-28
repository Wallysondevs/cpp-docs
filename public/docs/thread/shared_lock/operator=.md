# std::shared_lock&lt;Mutex&gt;::operator=

```cpp
shared_lock& operator=( shared_lock&& other ) noexcept;  // (desde C++14)
```

  
Operador de atribuição por movimento. Substitui o conteúdo com o de `other` usando *move semantics*.

Se, antes desta chamada, `*this` tiver um *mutex* associado (([mutex()](<#/doc/thread/shared_lock/mutex>) retornar um ponteiro não nulo) e tiver adquirido sua posse (`owns()` retornar `true`), o *mutex* é desbloqueado chamando [unlock_shared()](<#/doc/thread/shared_mutex/unlock_shared>).

Após esta chamada, `other` não tem *mutex* associado.

### Parâmetros

other  |  \-  |  outro `shared_lock` para substituir o estado   
  
### Valor de retorno

`*this`