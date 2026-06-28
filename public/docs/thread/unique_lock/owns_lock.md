# std::unique_lock&lt;Mutex&gt;::owns_lock

```cpp
bool owns_lock() const noexcept;  // (desde C++11)
```

  
Verifica se *this possui um mutex bloqueado ou não.

### Parâmetros

(nenhum)

### Valor de retorno

`true` se *this possui um mutex associado e adquiriu sua propriedade, `false` caso contrário.

### Veja também

[ operator bool](<#/doc/thread/unique_lock/operator_bool>) | testa se o lock possui (i.e., bloqueou) seu mutex associado
(função membro pública)  