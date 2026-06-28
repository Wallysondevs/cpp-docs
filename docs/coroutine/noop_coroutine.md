# std::noop_coroutine

Definido no cabeçalho `[<coroutine>](<#/doc/header/coroutine>)`

```c
std::noop_coroutine_handle noop_coroutine() noexcept;
```

Retorna um coroutine handle que se refere a uma coroutine no-op.

Se já houver um estado de coroutine de uma coroutine no-op, é não especificado se uma chamada subsequente a `noop_coroutine` retorna um coroutine handle obtido anteriormente, ou um coroutine handle que se refere a um novo estado de coroutine de uma coroutine no-op.

### Parâmetros

(nenhum)

### Valor de retorno

Um [std::noop_coroutine_handle](<#/doc/coroutine/coroutine_handle>) que se refere a uma coroutine no-op.

### Observações

Os valores de retorno de diferentes chamadas a `noop_coroutine` podem ou não ser iguais na comparação.

`noop_coroutine` pode apenas retornar um `noop_coroutine_handle` que se refere a um objeto de estado de coroutine sem iniciar uma coroutine.

### Exemplo

Execute este código
```cpp
    #include <coroutine>
    #include <iostream>
    #include <utility>
    
    template<class T>
    struct task
    {
        struct promise_type
        {
            auto get_return_object()
            {
                return task(std::coroutine_handle<promise_type>::from_promise(*this));
            }
            std::suspend_always initial_suspend() { return {}; }
            struct final_awaiter
            {
                bool await_ready() noexcept { return false; }
                void await_resume() noexcept {}
                std::coroutine_handle<>
                    await_suspend(std::coroutine_handle<promise_type> h) noexcept
                {
                    // final_awaiter::await_suspend é chamado quando a execução da
                    // coroutine atual (referida por 'h') está prestes a terminar.
                    // Se a coroutine atual foi retomada por outra coroutine via
                    // co_await get_task(), um handle para essa coroutine foi armazenado
                    // como h.promise().previous. Nesse caso, retorne o handle para retomar
                    // a coroutine anterior.
                    // Caso contrário, retorne noop_coroutine(), cuja retomada não faz nada.
    
                    if (auto previous = h.promise().previous; previous)
                        return previous;
                    else
                        return std::noop_coroutine();
                }
            };
            final_awaiter final_suspend() noexcept { return {}; }
            void unhandled_exception() { throw; }
            void return_value(T value) { result = std::move(value); }
    
            T result;
            std::coroutine_handle<> previous;
        };
    
        task(std::coroutine_handle<promise_type> h) : coro(h) {}
        task(task&& t) = delete;
        ~task() { coro.destroy(); }
    
        struct awaiter
        {
            bool await_ready() { return false; }
            T await_resume() { return std::move(coro.promise().result); }
            auto await_suspend(std::coroutine_handle<> h)
            {
                coro.promise().previous = h;
                return coro;
            }
            std::coroutine_handle<promise_type> coro;
        };
        awaiter operator co_await() { return awaiter{coro}; }
        T operator()()
        {
            coro.resume();
            return std::move(coro.promise().result);
        }
    
    private:
        std::coroutine_handle<promise_type> coro;
    };
    
    task<int> get_random()
    {
        std::cout << "in get_random()\n";
        co_return 4;
    }
    
    task<int> test()
    {
        task<int> v = get_random();
        task<int> u = get_random();
        std::cout << "in test()\n";
        int x = (co_await v + co_await u);
        co_return x;
    }
    
    int main()
    {
        task<int> t = test();
        int result = t();
        std::cout << result << '\n';
    }
```

Saída:
```
    in test()
    in get_random()
    in get_random()
    8
```

### Veja também

[ noop_coroutine_promise](<#/doc/coroutine/noop_coroutine_promise>)(C++20) | usado para coroutines sem efeitos observáveis
(classe)
[ noop_coroutine_handle](<#/doc/coroutine/coroutine_handle>)(C++20) | [std::coroutine_handle](<#/doc/coroutine/coroutine_handle>)<[std::noop_coroutine_promise](<#/doc/coroutine/noop_coroutine_promise>)>, destinado a se referir a uma coroutine no-op
(typedef)