# std::thread

Definido no cabeçalho `[<thread>](<#/doc/header/thread>)`

```c
class thread;
```

A classe `thread` representa [um único thread de execução](<https://en.wikipedia.org/wiki/Thread_\(computing\)> "enwiki:Thread \(computing\)"). Threads permitem que múltiplas funções sejam executadas concorrentemente.

Threads iniciam a execução imediatamente após a construção do objeto thread associado (sujeito a quaisquer atrasos de agendamento do sistema operacional), começando na função de nível superior fornecida como um [argumento do construtor](<#/doc/thread/thread/thread>). O valor de retorno da função de nível superior é ignorado e, se ela terminar lançando uma exceção, [std::terminate](<#/doc/error/terminate>) é chamado. A função de nível superior pode comunicar seu valor de retorno ou uma exceção ao chamador via [std::promise](<#/doc/thread/promise>) ou modificando variáveis compartilhadas (o que pode exigir sincronização, veja [std::mutex](<#/doc/thread/mutex>) e [std::atomic](<#/doc/atomic/atomic>)).

Objetos `std::thread` também podem estar no estado que não representa nenhum thread (após construção padrão, move from, [detach](<#/doc/thread/thread/detach>), ou [join](<#/doc/thread/thread/join>)), e um thread de execução pode não estar associado a nenhum objeto `thread` (após [detach](<#/doc/thread/thread/detach>)).

Nenhum par de objetos `std::thread` pode representar o mesmo thread de execução; `std::thread` não é [CopyConstructible](<#/doc/named_req/CopyConstructible>) nem [CopyAssignable](<#/doc/named_req/CopyAssignable>), embora seja [MoveConstructible](<#/doc/named_req/MoveConstructible>) e [MoveAssignable](<#/doc/named_req/MoveAssignable>).

### Tipos Membro

Tipo Membro | Definição
---|---
`native_handle_type` (opcional*) | definido pela implementação

### Classes Membro

[ id](<#/doc/thread/thread/id>) | representa o _id_ de um thread
(classe membro pública)

### Funções Membro

[ (construtor)](<#/doc/thread/thread/thread>) | constrói um novo objeto `thread`
(função membro pública)
[ (destrutor)](<#/doc/thread/thread/~thread>) | destrói o objeto thread, o thread subjacente deve ser unido (joined) ou desanexado (detached)
(função membro pública)
[ operator=](<#/>) | move o objeto thread
(função membro pública)

##### Observadores

[ joinable](<#/doc/thread/thread/joinable>) | verifica se o thread é joinable, ou seja, potencialmente executando em contexto paralelo
(função membro pública)
[ get_id](<#/doc/thread/thread/get_id>) | retorna o _id_ do thread
(função membro pública)
[ native_handle](<#/doc/thread/thread/native_handle>) | retorna o handle de thread subjacente definido pela implementação
(função membro pública)
[ hardware_concurrency](<#/doc/thread/thread/hardware_concurrency>)[static] | retorna o número de threads concorrentes suportados pela implementação
(função membro estática pública)

##### Operações

[ join](<#/doc/thread/thread/join>) | aguarda o thread finalizar sua execução
(função membro pública)
[ detach](<#/doc/thread/thread/detach>) | permite que o thread execute independentemente do handle de thread
(função membro pública)
[ swap](<#/doc/thread/thread/swap>) | troca dois objetos thread
(função membro pública)

### Funções Não-Membro

[ std::swap(std::thread)](<#/doc/thread/thread/swap2>)(C++11) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(função)

### Veja também

[ jthread](<#/doc/thread/jthread>)(C++20) | **std::thread** com suporte para auto-joining e cancelamento
(classe)