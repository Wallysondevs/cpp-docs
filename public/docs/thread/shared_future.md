# std::shared_future

Definido no cabeçalho `[<future>](<#/doc/header/future>)`

```c
template< class T > class shared_future;
template< class T > class shared_future<T&>;
template<> class shared_future<void>;
```

O template de classe `std::shared_future` fornece um mecanismo para acessar o resultado de operações assíncronas, similar a [std::future](<#/doc/thread/future>), exceto que múltiplas threads podem esperar pelo mesmo estado compartilhado. Ao contrário de [std::future](<#/doc/thread/future>), que é apenas movível (portanto, apenas uma instância pode se referir a qualquer resultado assíncrono particular), `std::shared_future` é copiável e múltiplos objetos shared future podem se referir ao mesmo estado compartilhado.

O acesso ao mesmo estado compartilhado a partir de múltiplas threads é seguro se cada thread o fizer através de sua própria cópia de um objeto `shared_future`.

### Funções membro

[ (construtor)](<#/doc/thread/shared_future/shared_future>) | constrói o objeto future
(função membro pública)
[ (destrutor)](<#/doc/thread/shared_future/~shared_future>) | destrói o objeto future
(função membro pública)
[ operator=](<#/>) | atribui o conteúdo
(função membro pública)

##### Obtendo o resultado

[ get](<#/doc/thread/shared_future/get>) | retorna o resultado
(função membro pública)

##### Estado

[ valid](<#/doc/thread/shared_future/valid>) | verifica se o future possui um estado compartilhado
(função membro pública)
[ wait](<#/doc/thread/shared_future/wait>) | espera o resultado ficar disponível
(função membro pública)
[ wait_for](<#/doc/thread/shared_future/wait_for>) | espera pelo resultado, retorna se não estiver disponível pela duração de timeout especificada
(função membro pública)
[ wait_until](<#/doc/thread/shared_future/wait_until>) | espera pelo resultado, retorna se não estiver disponível até que o ponto no tempo especificado tenha sido atingido
(função membro pública)

### Exemplo

Um `shared_future` pode ser usado para sinalizar múltiplas threads simultaneamente, similar a [std::condition_variable::notify_all()](<#/doc/thread/condition_variable/notify_all>).

Execute este código
```cpp
    #include <chrono>
    #include <future>
    #include <iostream>
    
    int main()
    {   
        std::promise<void> ready_promise, t1_ready_promise, t2_ready_promise;
        std::shared_future<void> ready_future(ready_promise.get_future());
    
        std::chrono::time_point<std::chrono::high_resolution_clock> start;
    
        auto fun1 = &, ready_future -> std::chrono::duration<double, std::milli> 
        {
            t1_ready_promise.set_value();
            ready_future.wait(); // waits for the signal from main()
            return std::chrono::high_resolution_clock::now() - start;
        };
    
    
        auto fun2 = &, ready_future -> std::chrono::duration<double, std::milli> 
        {
            t2_ready_promise.set_value();
            ready_future.wait(); // waits for the signal from main()
            return std::chrono::high_resolution_clock::now() - start;
        };
    
        auto fut1 = t1_ready_promise.get_future();
        auto fut2 = t2_ready_promise.get_future();
    
        auto result1 = std::async(std::launch::async, fun1);
        auto result2 = std::async(std::launch::async, fun2);
    
        // wait for the threads to become ready
        fut1.wait();
        fut2.wait();
    
        // the threads are ready, start the clock
        start = std::chrono::high_resolution_clock::now();
    
        // signal the threads to go
        ready_promise.set_value();
    
        std::cout << "Thread 1 received the signal "
                  << result1.get().count() << " ms after start\n"
                  << "Thread 2 received the signal "
                  << result2.get().count() << " ms after start\n";
    }
```

Saída possível:
```
    Thread 1 received the signal 0.072 ms after start
    Thread 2 received the signal 0.041 ms after start
```

### Veja também

[ async](<#/doc/thread/async>)(C++11) | executa uma função assincronamente (potencialmente em uma nova thread) e retorna um [std::future](<#/doc/thread/future>) que irá conter o resultado
(template de função)
[ future](<#/doc/thread/future>)(C++11) | espera por um valor que é definido assincronamente
(template de classe)