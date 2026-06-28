# std::swap(std::packaged_task)

```cpp
template< class Function, class... Args >
void swap( packaged_task<Function(Args...)> &lhs,
packaged_task<Function(Args...)> &rhs ) noexcept;  // (desde C++11)
```

  
Especializa o algoritmo [std::swap](<#/doc/utility/swap>) para [std::packaged_task](<#/doc/thread/packaged_task>). Troca o estado de `lhs` com o de `rhs`. Efetivamente chama `lhs.swap(rhs)`. 

### Parâmetros

lhs, rhs  |  \-  |  packaged tasks cujos estados devem ser trocados   
  
### Valor de retorno

(nenhum) 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ swap](<#/doc/thread/packaged_task/swap>) |  troca dois objetos task   
(função membro pública)  