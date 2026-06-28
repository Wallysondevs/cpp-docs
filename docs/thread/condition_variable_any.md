# std::condition_variable_any

Definido no cabeçalho `[<condition_variable>](<#/doc/header/condition_variable>)`

```c
class condition_variable_any;
```

A classe `condition_variable_any` é uma generalização de [std::condition_variable](<#/doc/thread/condition_variable>). Enquanto [std::condition_variable](<#/doc/thread/condition_variable>) funciona apenas com [std::unique_lock](<#/doc/thread/unique_lock>)<[std::mutex](<#/doc/thread/mutex>)>, `condition_variable_any` pode operar com qualquer lock que atenda aos requisitos [BasicLockable](<#/doc/named_req/BasicLockable>).

Veja [std::condition_variable](<#/doc/thread/condition_variable>) para a descrição da semântica das condition variables.

A classe `std::condition_variable_any` é um [StandardLayoutType](<#/doc/named_req/StandardLayoutType>). Ela não é [CopyConstructible](<#/doc/named_req/CopyConstructible>), [MoveConstructible](<#/doc/named_req/MoveConstructible>), [CopyAssignable](<#/doc/named_req/CopyAssignable>), nem [MoveAssignable](<#/doc/named_req/MoveAssignable>).

Se o lock for [std::unique_lock](<#/doc/thread/unique_lock>)<[std::mutex](<#/doc/thread/mutex>)>, [std::condition_variable](<#/doc/thread/condition_variable>) pode oferecer melhor desempenho.

### Funções membro

[ (construtor)](<#/doc/thread/condition_variable_any/condition_variable_any>) | constrói o objeto
(função membro pública)
[ (destrutor)](<#/doc/thread/condition_variable_any/~condition_variable_any>) | destrói o objeto
(função membro pública)
operator=[deleted] | não é atribuível por cópia
(função membro pública)

##### Notificação

[ notify_one](<#/doc/thread/condition_variable_any/notify_one>) | notifica uma thread em espera
(função membro pública)
[ notify_all](<#/doc/thread/condition_variable_any/notify_all>) | notifica todas as threads em espera
(função membro pública)

##### Espera

[ wait](<#/doc/thread/condition_variable_any/wait>) | bloqueia a thread atual até que a condition variable seja despertada
(função membro pública)
[ wait_for](<#/doc/thread/condition_variable_any/wait_for>) | bloqueia a thread atual até que a condition variable seja despertada ou após a duração de timeout especificada
(função membro pública)
[ wait_until](<#/doc/thread/condition_variable_any/wait_until>) | bloqueia a thread atual até que a condition variable seja despertada ou até que o ponto no tempo especificado seja atingido
(função membro pública)

### Notas

`std::condition_variable_any` pode ser usada com [std::shared_lock](<#/doc/thread/shared_lock>) para esperar em um [std::shared_mutex](<#/doc/thread/shared_mutex>) no modo de propriedade compartilhada.

Um possível uso para `std::condition_variable_any` com tipos [Lockable](<#/doc/named_req/Lockable>) personalizados é fornecer esperas interrompíveis convenientes: a operação de lock personalizada bloquearia o mutex associado conforme esperado, e também realizaria a configuração necessária para notificar esta condition variable quando o sinal de interrupção for recebido.[1](<#/doc/thread/condition_variable_any>)

### Veja também

[ condition_variable](<#/doc/thread/condition_variable>)(C++11) | fornece uma condition variable associada a um [std::unique_lock](<#/doc/thread/unique_lock>)
(classe)

### Links externos

1. [↑](<#/doc/thread/condition_variable_any>) Anthony Williams (2012, 1st ed./ 2019, 2nd ed.), “C++ Concurrency in Action”, 9.2.4 “Interrupting a wait on `std::condition_variable_any`”.

---