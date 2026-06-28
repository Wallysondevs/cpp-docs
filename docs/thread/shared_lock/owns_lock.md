# std::shared_lock&lt;Mutex&gt;::owns_lock

```cpp
bool owns_lock() const noexcept;  // (desde C++14)
```

  
Verifica se *this possui um mutex bloqueado ou não.

### Parâmetros

(nenhum)

### Valor de retorno

true se *this tiver um mutex associado e tiver adquirido a posse compartilhada dele, false caso contrário.

### Veja também

[ operator bool](<#/doc/thread/shared_lock/operator_bool>) |  testa se o lock possui seu mutex associado   
(função membro pública)  