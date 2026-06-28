# std::experimental::promise (TS de Fundamentos da Biblioteca)

_Esta página trata da versão modificada de [std::promise](<#/doc/thread/promise>) com suporte a alocadores com type-erasure, fornecida pelos TSes de Fundamentos da Biblioteca. Para a versão de `promise` fornecida pelo TS de concorrência que suporta as melhorias de `std::future` feitas por esse TS, veja [`std::experimental::concurrency_v1::promise`](<#/doc/experimental/concurrency/promise>)._  
  
Definido no header `[<experimental/future>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/future&action=edit&redlink=1> "cpp/header/experimental/future \(page does not exist\)")`

```cpp
template< class R > class promise;  // (1)
template< class R > class promise<R&>;  // (2)
template<> class promise<void>;  // (3)
```

  
`std::experimental::fundamentals_v1::promise` (e `std::experimental::fundamentals_v2::promise`) é uma versão modificada de [std::promise](<#/doc/thread/promise>) fornecida pelo TS de fundamentos da biblioteca com suporte para alocadores com type-erasure. 

### Tipos Membro 

Tipo Membro  |  Definição   
---|---
`allocator_type` |  [std::experimental::erased_type](<#/doc/experimental/erased_type>)  
  
### Funções Membro 

[ (construtor)](<#/doc/experimental/lib_extensions/promise/promise>) |  constrói o objeto promise   
(função membro pública)  
[ get_memory_resource](<#/doc/experimental/lib_extensions/promise/get_memory_resource>) |  recupera um ponteiro para o recurso de memória usado por este objeto para alocar memória   
(função membro pública)  
  
### Função Não-Membro 

[ std::experimental::swap(std::experimental::promise)](<#/doc/experimental/lib_extensions/promise/swap2>) |  especializa o algoritmo `swap`   
(modelo de função)  
  
### Classes Auxiliares

[ std::uses_allocator<std::experimental::promise>](<#/doc/experimental/lib_extensions/promise/uses_allocator>) |  especializa o type trait [std::uses_allocator](<#/doc/memory/uses_allocator>)   
(especialização de modelo de classe)  
  
## Membros idênticos a std::promise 

### Funções Membro

[ (destrutor)](<#/doc/thread/promise/~promise>) |  destrói o objeto promise   
(função membro pública de `std::promise<R>`)  
[ operator=](<#/>) |  atribui o estado compartilhado   
(função membro pública de `std::promise<R>`)  
[ swap](<#/doc/thread/promise/swap>) |  troca dois objetos promise   
(função membro pública de `std::promise<R>`)  
  
##### Obtendo o resultado   
  
[ get_future](<#/doc/thread/promise/get_future>) |  retorna um [`future`](<#/doc/thread/future>) associado ao resultado prometido   
(função membro pública de `std::promise<R>`)  
  
##### Definindo o resultado   
  
[ set_value](<#/doc/thread/promise/set_value>) |  define o resultado para um valor específico   
(função membro pública de `std::promise<R>`)  
[ set_value_at_thread_exit](<#/doc/thread/promise/set_value_at_thread_exit>) |  define o resultado para um valor específico, entregando a notificação apenas na saída da thread   
(função membro pública de `std::promise<R>`)  
[ set_exception](<#/doc/thread/promise/set_exception>) |  define o resultado para indicar uma exceção   
(função membro pública de `std::promise<R>`)  
[ set_exception_at_thread_exit](<#/doc/thread/promise/set_exception_at_thread_exit>) |  define o resultado para indicar uma exceção, entregando a notificação apenas na saída da thread   
(função membro pública de `std::promise<R>`)