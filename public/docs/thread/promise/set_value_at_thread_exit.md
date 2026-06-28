# std::promise&lt;R&gt;::set_value_at_thread_exit

```cpp
Modelo principal
void set_value_at_thread_exit( const R& value );  // (1) (desde C++11)
void set_value_at_thread_exit( R&& value );  // (2) (desde C++11)
Especializações de std::promise<R&>
void set_value_at_thread_exit( R& value );  // (3) (desde C++11)
Especialização de std::promise<void>
void set_value_at_thread_exit();  // (4) (desde C++11)
```

  
Armazena o valor no estado compartilhado sem tornar o estado pronto imediatamente. O estado é tornado pronto quando a thread atual é encerrada, depois que todas as variáveis com duração de armazenamento thread-local forem destruídas.

A operação se comporta como se [set_value](<#/doc/thread/promise/set_value>), [set_exception](<#/doc/thread/promise/set_exception>), `set_value_at_thread_exit`, e [set_exception_at_thread_exit](<#/doc/thread/promise/set_exception_at_thread_exit>) adquirissem um único mutex associado ao objeto promise enquanto atualizam o objeto promise.

Chamadas a esta função não introduzem condições de corrida (data races) com chamadas a [get_future](<#/doc/thread/promise/get_future>) (portanto, elas não precisam se sincronizar entre si).

### Parâmetros

value  |  \-  |  valor a ser armazenado no estado compartilhado   
  
### Valor de retorno

(nenhum)

### Exceções

[std::future_error](<#/doc/thread/future_error>) nas seguintes condições:

  * *this não possui estado compartilhado. O código de erro é definido como [`no_state`](<#/doc/thread/future_errc>).
  * O estado compartilhado já armazena um valor ou exceção. O código de erro é definido como [`promise_already_satisfied`](<#/doc/thread/future_errc>).

Adicionalmente:

1) Qualquer exceção lançada pelo construtor selecionado para copiar um objeto do tipo `R`.

2) Qualquer exceção lançada pelo construtor selecionado para mover um objeto do tipo `R`.

### Exemplo

Run this code
```cpp
    #include <future>
    #include <iostream>
    #include <thread>
    
    int main()
    {
        using namespace std::chrono_literals;
        std::promise<int> p;
        std::future<int> f = p.get_future();
        std::thread([&p]
        {
            std::this_thread::sleep_for(1s);
            p.set_value_at_thread_exit(9);
        }).detach();
    
        std::cout << "Waiting... " << std::flush;
        f.wait();
        std::cout << "Done!\nResult is: " << f.get() << '\n';
    }
```

Saída:
```
    Waiting... Done!
    Result is: 9
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 2098](<https://cplusplus.github.io/LWG/issue2098>) | C++11  | não estava claro quais exceções são exigidas a serem lançadas  | tornado claro   
  
### Veja também

[ set_value](<#/doc/thread/promise/set_value>) | define o resultado para um valor específico   
(função membro pública)  
[ set_exception_at_thread_exit](<#/doc/thread/promise/set_exception_at_thread_exit>) | define o resultado para indicar uma exceção, entregando a notificação apenas na saída da thread   
(função membro pública)