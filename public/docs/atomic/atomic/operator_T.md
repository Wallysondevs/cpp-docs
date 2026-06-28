# std::atomic&lt;T&gt;::operator T

```cpp
operator T() const noexcept;  // (1) (desde C++11)
operator T() const volatile noexcept;  // (2) (desde C++11)
```

  
Carrega atomicamente e retorna o valor atual da variável atômica. Equivalente a `load()`.

É descontinuado se [std::atomic](<#/doc/atomic/atomic>)&lt;T&gt;::is_always_lock_free for `false` e a sobrecarga (2) participar da resolução de sobrecarga. | (desde C++20)  
  
### Parâmetros

(nenhum)

### Valor de retorno

O valor atual da variável atômica.

### Veja também

[ load](<#/doc/atomic/atomic/load>) | obtém atomicamente o valor do objeto atômico   
(função membro pública)  