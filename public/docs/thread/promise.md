# std::promise

Definido no cabeçalho `[<future>](<#/doc/header/future>)`

```c
template< class R > class promise;
template< class R > class promise<R&>;
template<> class promise<void>;
```

1) Modelo base.

2) Especialização não-void, usada para comunicar objetos entre threads.

3) Especialização void, usada para comunicar eventos sem estado.

O template de classe `std::promise` fornece uma facilidade para armazenar um valor ou uma exceção que é posteriormente adquirida assincronamente através de um objeto [std::future](<#/doc/thread/future>) criado pelo objeto `std::promise`. Note que o objeto `std::promise` é destinado a ser usado apenas uma vez.

Cada promise está associada a um _estado compartilhado_ , que contém algumas informações de estado e um _resultado_ que pode ainda não ter sido avaliado, avaliado para um valor (possivelmente void) ou avaliado para uma exceção. Uma promise pode fazer três coisas com o estado compartilhado:

  * _tornar pronto_ : a promise armazena o resultado ou a exceção no estado compartilhado. Marca o estado como pronto e desbloqueia qualquer thread esperando por um future associado ao estado compartilhado.
  * _liberar_ : a promise desiste de sua referência ao estado compartilhado. Se esta foi a última referência, o estado compartilhado é destruído. A menos que este tenha sido um estado compartilhado criado por [std::async](<#/doc/thread/async>) que ainda não está pronto, esta operação não bloqueia.
  * _abandonar_ : a promise armazena a exceção do tipo [std::future_error](<#/doc/thread/future_error>) com o código de erro [std::future_errc::broken_promise](<#/doc/thread/future_errc>), torna o estado compartilhado _pronto_ e, em seguida, o _libera_.

A promise é a extremidade de "envio" do canal de comunicação promise-future: a operação que armazena um valor no estado compartilhado _sincroniza-se com_ (conforme definido em [std::memory_order](<#/doc/atomic/memory_order>)) o retorno bem-sucedido de qualquer função que esteja esperando no estado compartilhado (como [std::future::get](<#/doc/thread/future/get>)). O acesso concorrente ao mesmo estado compartilhado pode entrar em conflito de outra forma: por exemplo, múltiplos chamadores de [std::shared_future::get](<#/doc/thread/shared_future/get>) devem ser todos somente leitura ou fornecer sincronização externa.

### Funções membro

[ (construtor)](<#/doc/thread/promise/promise>) | constrói o objeto promise
(função membro pública)
[ (destrutor)](<#/doc/thread/promise/~promise>) | destrói o objeto promise
(função membro pública)
[ operator=](<#/>) | atribui o estado compartilhado
(função membro pública)
[ swap](<#/doc/thread/promise/swap>) | troca dois objetos promise
(função membro pública)

##### Obtendo o resultado

[ get_future](<#/doc/thread/promise/get_future>) | retorna um [`future`](<#/doc/thread/future>) associado ao resultado prometido
(função membro pública)

##### Definindo o resultado

[ set_value](<#/doc/thread/promise/set_value>) | define o resultado para um valor específico
(função membro pública)
[ set_value_at_thread_exit](<#/doc/thread/promise/set_value_at_thread_exit>) | define o resultado para um valor específico, entregando a notificação apenas na saída da thread
(função membro pública)
[ set_exception](<#/doc/thread/promise/set_exception>) | define o resultado para indicar uma exceção
(função membro pública)
[ set_exception_at_thread_exit](<#/doc/thread/promise/set_exception_at_thread_exit>) | define o resultado para indicar uma exceção, entregando a notificação apenas na saída da thread
(função membro pública)

### Funções não-membro

[ std::swap(std::promise)](<#/doc/thread/promise/swap2>)(C++11) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(template de função)

### Classes auxiliares

[ std::uses_allocator<std::promise>](<#/doc/thread/promise/uses_allocator>)(C++11) | especializa o trait de tipo [std::uses_allocator](<#/doc/memory/uses_allocator>)
(especialização de template de classe)

### Exemplo

Este exemplo mostra como `promise<int>` pode ser usado como sinais entre threads.

Execute este código
```cpp
    #include <chrono>
    #include <future>
    #include <iostream>
    #include <numeric>
    #include <thread>
    #include <vector>
    
    void accumulate(std::vector<int>::iterator first,
                    std::vector<int>::iterator last,
                    std::promise<int> accumulate_promise)
    {
        int sum = std::accumulate(first, last, 0);
        accumulate_promise.set_value(sum); // Notifica o future
    }
    
    void do_work(std::promise<void> barrier)
    {
        std::this_thread::sleep_for(std::chrono::seconds(1));
        barrier.set_value();
    }
    
    int main()
    {
        // Demonstra o uso de promise<int> para transmitir um resultado entre threads.
        std::vector<int> numbers = {1, 2, 3, 4, 5, 6};
        std::promise<int> accumulate_promise;
        std::future<int> accumulate_future = accumulate_promise.get_future();
        std::thread work_thread(accumulate, numbers.begin(), numbers.end(),
                                std::move(accumulate_promise));
    
        // future::get() esperará até que o future tenha um resultado válido e o recuperará.
        // Chamar wait() antes de get() não é necessário
        // accumulate_future.wait(); // espera pelo resultado
        std::cout << "result=" << accumulate_future.get() << '\n';
        work_thread.join(); // espera pela conclusão da thread
    
        // Demonstra o uso de promise<void> para sinalizar o estado entre threads.
        std::promise<void> barrier;
        std::future<void> barrier_future = barrier.get_future();
        std::thread new_work_thread(do_work, std::move(barrier));
        barrier_future.wait();
        new_work_thread.join();
    }
```

Saída:
```
    result=21
```