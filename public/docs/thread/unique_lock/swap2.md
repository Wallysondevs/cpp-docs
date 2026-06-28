# std::swap(std::unique_lock)

```cpp
template< class Mutex >
void swap( unique_lock<Mutex>& lhs,
unique_lock<Mutex>& rhs ) noexcept;  // (desde C++11)
```

  
Especializa o algoritmo [std::swap](<#/doc/utility/swap>) para [std::unique_lock](<#/doc/thread/unique_lock>). Troca o estado de lhs com o de rhs. Efetivamente chama lhs.swap(rhs). 

### Parâmetros

lhs, rhs  |  \-  |  wrappers de lock cujos estados devem ser trocados   
  
### Valor de retorno

(nenhum) 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ swap](<#/doc/thread/unique_lock/swap>) |  troca o estado com outro [std::unique_lock](<#/doc/thread/unique_lock>)   
(função membro pública)  