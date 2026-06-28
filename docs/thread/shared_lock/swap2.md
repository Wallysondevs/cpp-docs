# std::swap(std::shared_lock)

```cpp
template< class Mutex >
void swap( shared_lock<Mutex>& lhs,
shared_lock<Mutex>& rhs ) noexcept;  // (desde C++14)
```

  
Especializa o algoritmo [std::swap](<#/doc/utility/swap>) para [std::shared_lock](<#/doc/thread/shared_lock>). Troca o estado de `lhs` com o de `rhs`. Efetivamente chama `lhs.swap(rhs)`. 

### Parâmetros

lhs, rhs  |  \-  |  wrappers de lock cujos estados devem ser trocados   
  
### Valor de retorno

(nenhum) 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ swap](<#/doc/thread/shared_lock/swap>) |  troca os membros de dados com outro `shared_lock`   
(função membro pública)  