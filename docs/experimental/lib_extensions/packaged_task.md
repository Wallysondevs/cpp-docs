# std::experimental::packaged_task (TS de fundamentos da biblioteca)

_Esta página trata da versão modificada de [std::packaged_task](<#/doc/thread/packaged_task>) com suporte a alocador com type-erasure, fornecida pelos TSes de Fundamentos da Biblioteca. Para a versão de `packaged_task` fornecida pelo TS de concorrência que suporta as melhorias de `std::future` feitas por esse TS, veja [`std::experimental::concurrency_v1::packaged_task`](<#/doc/experimental/concurrency/packaged_task>)._  
  
Definido no cabeçalho `[<experimental/future>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/future&action=edit&redlink=1> "cpp/header/experimental/future \(page does not exist\)")`

```c
template< class > class packaged_task; //não definido
template< class R, class ...Args >
class packaged_task<R(Args...)>;
```

  
`std::experimental::fundamentals_v1::packaged_task` (e `std::experimental::fundamentals_v2::packaged_task`) é uma versão modificada de [std::packaged_task](<#/doc/thread/packaged_task>) fornecida pelo TS de fundamentos da biblioteca com suporte para alocadores com type-erasure. 

### Tipos de membros 

Tipo de membro  |  Definição   
---|---
`allocator_type` |  [std::experimental::erased_type](<#/doc/experimental/erased_type>)  
  
### Funções membro 

[ (construtor)](<#/doc/experimental/lib_extensions/packaged_task/packaged_task>) |  constrói o objeto task   
(função membro pública)  
[ get_memory_resource](<#/doc/experimental/lib_extensions/packaged_task/get_memory_resource>) |  recupera um ponteiro para o recurso de memória usado por este objeto para alocar memória   
(função membro pública)  
  
### Função não-membro 

[ std::experimental::swap(std::experimental::packaged_task)](<#/doc/experimental/lib_extensions/packaged_task/swap2>) |  especializa o algoritmo `swap`   
(modelo de função)  
  
### Classes auxiliares

[ std::uses_allocator<std::experimental::packaged_task>](<#/doc/experimental/lib_extensions/packaged_task/uses_allocator>) |  especializa o trait de tipo [std::uses_allocator](<#/doc/memory/uses_allocator>)   
(especialização de modelo de classe)  
  
## Membros idênticos a std::packaged_task 

### Funções membro

[ (destrutor)](<#/doc/thread/packaged_task/~packaged_task>) |  destrói o objeto task   
(função membro pública de `std::packaged_task<R(Args...)>`)  
[ operator=](<#/>) |  move o objeto task   
(função membro pública de `std::packaged_task<R(Args...)>`)  
[ valid](<#/doc/thread/packaged_task/valid>) |  verifica se o objeto task possui uma função válida   
(função membro pública de `std::packaged_task<R(Args...)>`)  
[ swap](<#/doc/thread/packaged_task/swap>) |  troca dois objetos task   
(função membro pública de `std::packaged_task<R(Args...)>`)  
  
##### Obtendo o resultado   
  
[ get_future](<#/doc/thread/packaged_task/get_future>) |  retorna um [std::future](<#/doc/thread/future>) associado ao resultado prometido   
(função membro pública de `std::packaged_task<R(Args...)>`)  
  
##### Execução   
  
[ operator()](<#/>) |  executa a função   
(função membro pública de `std::packaged_task<R(Args...)>`)  
[ make_ready_at_thread_exit](<#/doc/thread/packaged_task/make_ready_at_thread_exit>) |  executa a função garantindo que o resultado esteja pronto somente quando a thread atual sair   
(função membro pública de `std::packaged_task<R(Args...)>`)  
[ reset](<#/doc/thread/packaged_task/reset>) |  redefine o estado, abandonando quaisquer resultados armazenados de execuções anteriores   
(função membro pública de `std::packaged_task<R(Args...)>`)