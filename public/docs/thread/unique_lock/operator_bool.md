# std::unique_lock&lt;Mutex&gt;::operator bool

```cpp
explicit operator bool() const noexcept;  // (desde C++11)
```

  
Verifica se *this possui um mutex bloqueado ou não. Efetivamente chama [owns_lock()](<#/doc/thread/unique_lock/owns_lock>). 

### Parâmetros

(nenhum) 

### Valor de retorno

`true` se *this tiver um mutex associado e tiver adquirido sua posse, `false` caso contrário. 

### Veja também

[ owns_lock](<#/doc/thread/unique_lock/owns_lock>) | testa se o lock possui (i.e., bloqueou) seu mutex associado   
(função membro pública)  