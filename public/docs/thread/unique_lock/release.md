# std::unique_lock&lt;Mutex&gt;::release

```cpp
mutex_type* release() noexcept;  // (desde C++11)
```

  
Quebra a associação do mutex associado, se houver, e *this.

Nenhum lock é destravado. Se *this possuía a propriedade do mutex associado antes da chamada, o chamador é agora responsável por destravar o mutex.

### Parâmetros

(nenhum)

### Valor de retorno

Ponteiro para o mutex associado ou um ponteiro nulo se não havia mutex associado.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ unlock](<#/doc/thread/unique_lock/unlock>) | destrava (isto é, libera a propriedade de) o mutex associado   
(função membro pública)  