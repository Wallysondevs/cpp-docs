# std::shared_lock&lt;Mutex&gt;::operator bool

```cpp
explicit operator bool() const noexcept;  // (desde C++14)
```

  
Verifica se *this possui um mutex bloqueado ou não. Efetivamente chama [owns_lock()](<#/doc/thread/shared_lock/owns_lock>). 

### Parâmetros

(nenhum) 

### Valor de retorno

true se *this tiver um mutex associado e tiver adquirido a posse compartilhada dele, false caso contrário. 

### Veja também

[ owns_lock](<#/doc/thread/shared_lock/owns_lock>) |  testa se o lock possui seu mutex associado   
(função membro pública)  