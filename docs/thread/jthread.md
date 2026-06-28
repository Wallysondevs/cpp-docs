# std::jthread

Definido no cabeçalho `[<thread>](<#/doc/header/thread>)`

```c
class jthread;
```

A classe `jthread` representa [um único thread de execução](<https://en.wikipedia.org/wiki/Thread_\(computing\)> "enwiki:Thread \(computing\)"). Ela tem o mesmo comportamento geral que [std::thread](<#/doc/thread/thread>), exceto que `jthread` automaticamente faz join na destruição, e pode ser cancelada/parada em certas situações.

Threads iniciam a execução imediatamente após a construção do objeto thread associado (sujeito a quaisquer atrasos de agendamento do SO), começando na função de nível superior fornecida como um [argumento do construtor](<#/doc/thread/jthread/jthread>). O valor de retorno da função de nível superior é ignorado e, se ela terminar lançando uma exceção, [std::terminate](<#/doc/error/terminate>) é chamado. A função de nível superior pode comunicar seu valor de retorno ou uma exceção ao chamador via [std::promise](<#/doc/thread/promise>) ou modificando variáveis compartilhadas (o que pode exigir sincronização, veja [std::mutex](<#/doc/thread/mutex>) e [std::atomic](<#/doc/atomic/atomic>)).

Ao contrário de [std::thread](<#/doc/thread/thread>), a `jthread` logicamente mantém um membro privado interno do tipo `std::stop_source`, que mantém um estado de parada compartilhado. O construtor de `jthread` aceita uma função que recebe um [std::stop_token](<#/doc/thread/stop_token>) como seu primeiro argumento, que será passado pela `jthread` a partir de seu [std::stop_source](<#/doc/thread/stop_source>) interno. Isso permite que a função verifique se uma parada foi solicitada durante sua execução e retorne caso tenha sido.

Objetos `std::jthread` também podem estar no estado que não representa nenhum thread (após construção padrão, move from, detach ou join), e um thread de execução pode não estar associado a nenhum objeto `jthread` (após detach).

Nenhum par de objetos `std::jthread` pode representar o mesmo thread de execução; `std::jthread` não é [CopyConstructible](<#/doc/named_req/CopyConstructible>) ou [CopyAssignable](<#/doc/named_req/CopyAssignable>), embora seja [MoveConstructible](<#/doc/named_req/MoveConstructible>) e [MoveAssignable](<#/doc/named_req/MoveAssignable>).

### Tipos de membro

Tipo de membro | Definição
---|---
`id` | [`std::thread::id`](<#/doc/thread/thread/id>)
`native_handle_type` (opcional*) | [`std::thread::native_handle_type`](<#/doc/thread/thread>)

### Funções membro

[ (construtor)](<#/doc/thread/jthread/jthread>) | constrói um novo objeto `jthread`
(função membro pública)
[ (destrutor)](<#/doc/thread/jthread/~jthread>) | se o thread for joinable, então uma parada é solicitada e o thread faz join
(função membro pública)
[ operator=](<#/>) | move o objeto `jthread`
(função membro pública)

##### Observadores

[ joinable](<#/doc/thread/jthread/joinable>) | verifica se o thread é joinable, ou seja, potencialmente em execução em contexto paralelo
(função membro pública)
[ get_id](<#/doc/thread/jthread/get_id>) | retorna o _id_ do thread
(função membro pública)
[ native_handle](<#/doc/thread/jthread/native_handle>) | retorna o handle de thread subjacente definido pela implementação
(função membro pública)
[ hardware_concurrency](<#/doc/thread/jthread/hardware_concurrency>)[static] | retorna o número de threads concorrentes suportados pela implementação
(função membro estática pública)

##### Operações

[ join](<#/doc/thread/jthread/join>) | espera o thread finalizar sua execução
(função membro pública)
[ detach](<#/doc/thread/jthread/detach>) | permite que o thread execute independentemente do handle do thread
(função membro pública)
[ swap](<#/doc/thread/jthread/swap>) | troca dois objetos jthread
(função membro pública)

##### Manipulação de stop token

[ get_stop_source](<#/doc/thread/jthread/get_stop_source>) | retorna um objeto `stop_source` associado ao estado de parada compartilhado do thread
(função membro pública)
[ get_stop_token](<#/doc/thread/jthread/get_stop_token>) | retorna um `stop_token` associado ao estado de parada compartilhado do thread
(função membro pública)
[ request_stop](<#/doc/thread/jthread/request_stop>) | solicita a parada da execução via o estado de parada compartilhado do thread
(função membro pública)

### Funções não-membro

[ swap(std::jthread)](<#/doc/thread/jthread/swap2>)(C++20) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(função)

### Notas

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_jthread`](<#/doc/feature_test>) | [`201911L`](<#/>) | (C++20) | [Stop token](<#/doc/thread/stop_token>) e [thread com join automático](<#/doc/thread/jthread>)

### Veja também

[ thread](<#/doc/thread/thread>)(C++11) | gerencia um thread separado
(classe)