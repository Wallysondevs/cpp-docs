# std::packaged_task&lt;R(Args...)&gt;::make_ready_at_thread_exit

```cpp
void make_ready_at_thread_exit( ArgTypes... args );  // (desde C++11)
```

  
Chama a tarefa armazenada como se por [`_INVOKE <R>_`](<#/doc/utility/functional>)(f, args...), onde f é a tarefa armazenada. O valor de retorno da tarefa ou qualquer exceção lançada por ela é armazenado no estado compartilhado de *this.

O estado compartilhado só é disponibilizado depois que a thread atual é encerrada e todos os objetos com duração de armazenamento thread-local são destruídos.

### Parâmetros

args  |  \-  |  os parâmetros a serem passados na invocação da tarefa armazenada   
  
### Valor de retorno

(nenhum) 

### Exceções

[std::future_error](<#/doc/thread/future_error>) nas seguintes condições de erro: 

  * A tarefa armazenada já foi invocada. A categoria de erro é definida como `promise_already_satisfied`. 
  * *this não possui estado compartilhado. A categoria de erro é definida como [`no_state`](<#/doc/thread/future_errc>). 

### Exemplo

Execute este código
```cpp 
    #include <chrono>
    #include <functional>
    #include <future>
    #include <iostream>
    #include <memory>
    #include <thread>
    #include <utility>
    
    struct ProgramState
    {
        std::packaged_task<void()> task;
        std::future<void> future;
        std::thread worker;
    };
    
    static void worker(std::shared_ptr<ProgramState> state)
    {
        state->task.make_ready_at_thread_exit(); // execute task right away
    
        auto status = state->future.wait_for(std::chrono::seconds(0));
        if (status == std::future_status::timeout)
            std::cout << "worker: future is not ready yet\n";
        else
            std::cout << "worker: future is ready\n";
    
        std::cout << "worker: exit\n";
    }
    
    static std::shared_ptr<ProgramState> create_state()
    {
        auto state = std::make_shared<ProgramState>();
        state->task = std::packaged_task<void()>{[]
        {
            std::cout << "task: executed\n";
        }};
        state->future = state->task.get_future();
        state->worker = std::thread{worker, state};
        return state;
    }
    
    int main()
    {
        auto state = create_state();
    
        state->worker.join();
        std::cout << "main: worker finished\n";
    
        auto status = state->future.wait_for(std::chrono::seconds(0));
        if (status == std::future_status::timeout)
            std::cout << "main: future is not ready yet\n";
        else
            std::cout << "main: future is ready\n";
    }
```

Saída: 
```
    task: executed
    worker: future is not ready yet
    worker: exit
    main: worker finished
    main: future is ready
```

### Veja também

[ operator()](<#/>) |  executa a função   
(função membro pública)  