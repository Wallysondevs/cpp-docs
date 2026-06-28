# std::coroutine_traits

Definido no cabeçalho `[<coroutine>](<#/doc/header/coroutine>)`

```c
template< class R, class... Args >
struct coroutine_traits;
```

Determina o tipo de promise a partir do tipo de retorno e dos tipos de parâmetro de uma coroutine. A implementação da standard library fornece um tipo membro `promise_type` publicamente acessível, o mesmo que `R::promise_type`, se o qualified-id for válido e denotar um tipo. Caso contrário, não possui tal membro.

[Especializações definidas pelo programa](<#/doc/language/type-id>) de `coroutine_traits` devem definir um tipo aninhado `promise_type` publicamente acessível, caso contrário o programa é malformado.

### Parâmetros de template

- **R** — tipo de retorno da coroutine
- **Args** — tipos de parâmetro da coroutine, incluindo o [parâmetro de objeto implícito](<#/doc/language/member_functions>) se a coroutine for uma função membro não estática

### Tipos aninhados

Nome | Definição
---|---
`promise_type` | `R::promise_type` se for válido, ou fornecido por especializações definidas pelo programa

### Possível implementação
```cpp
    namespace detail {
    template<class, class...>
    struct coroutine_traits_base {};
    
    template<class R, class... Args>
    requires requires { typename R::promise_type; }
    struct coroutine_traits_base <R, Args...>
    {
        using promise_type = R::promise_type;
    };
    }
    
    template<class R, class... Args>
    struct coroutine_traits : detail::coroutine_traits_base<R, Args...> {};
```

---

### Notas

Se a coroutine for uma função membro não estática, então o primeiro tipo em `Args...` é o tipo do parâmetro de objeto implícito, e o restante são os tipos de parâmetro da função (se houver).

Se `std::coroutine_traits<R, Args...>::promise_type` não existir ou não for um tipo de classe, a definição da coroutine correspondente é malformada.

Usuários podem definir especializações explícitas ou parciais de `coroutine_traits` dependentes de tipos definidos pelo programa para evitar modificação nos tipos de retorno.

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <coroutine>
    #include <exception>
    #include <future>
    #include <iostream>
    #include <thread>
    #include <type_traits>
    
    // A program-defined type on which the coroutine_traits specializations below depend
    struct as_coroutine {};
    
    // Enable the use of std::future<T> as a coroutine type
    // by using a std::promise<T> as the promise type.
    template<typename T, typename... Args>
        requires(!std::is_void_v<T> && !std::is_reference_v<T>)
    struct std::coroutine_traits<std::future<T>, as_coroutine, Args...>
    {
        struct promise_type : std::promise<T>
        {
            std::future<T> get_return_object() noexcept
            {
                return this->get_future();
            }
    
            std::suspend_never initial_suspend() const noexcept { return {}; }
            std::suspend_never final_suspend() const noexcept { return {}; }
    
            void return_value(const T& value)
                noexcept(std::is_nothrow_copy_constructible_v<T>)
            {
                this->set_value(value);
            }
    
            void return_value(T&& value) noexcept(std::is_nothrow_move_constructible_v<T>)
            {
                this->set_value(std::move(value));
            }
    
            void unhandled_exception() noexcept
            {
                this->set_exception(std::current_exception());
            }
        };
    };
    
    // Same for std::future<void>.
    template<typename... Args>
    struct std::coroutine_traits<std::future<void>, as_coroutine, Args...>
    {
        struct promise_type : std::promise<void>
        {
            std::future<void> get_return_object() noexcept
            {
                return this->get_future();
            }
    
            std::suspend_never initial_suspend() const noexcept { return {}; }
            std::suspend_never final_suspend() const noexcept { return {}; }
    
            void return_void() noexcept
            {
                this->set_value();
            }
    
            void unhandled_exception() noexcept
            {
                this->set_exception(std::current_exception());
            }
        };
    };
    
    // Allow co_await'ing std::future<T> and std::future<void>
    // by naively spawning a new thread for each co_await.
    template<typename T>
    auto operator co_await(std::future<T> future) noexcept
        requires(!std::is_reference_v<T>)
    {
        struct awaiter : std::future<T>
        {
            bool await_ready() const noexcept
            {
                using namespace std::chrono_literals;
                return this->wait_for(0s) != std::future_status::timeout;
            }
    
            void await_suspend(std::coroutine_handle<> cont) const
            {
                std::thread([this, cont]
                {
                    this->wait();
                    cont();
                }).detach();
            }
    
            T await_resume() { return this->get(); }
        };
    
        return awaiter { std::move(future) };
    }
    
    // Utilize the infrastructure we have established.
    std::future<int> compute(as_coroutine)
    {
        int a = co_await std::async([] { return 6; });
        int b = co_await std::async([] { return 7; });
        co_return a * b;
    }
    
    std::future<void> fail(as_coroutine)
    {
        throw std::runtime_error("bleah");
        co_return;
    }
    
    int main()
    {
        std::cout << compute({}).get() << '\n';
    
        try
        {
            fail({}).get();
        }
        catch (const std::runtime_error& e)
        {
            std::cout << "error: " << e.what() << '\n';
        }
    }
```

Saída:
```
    42
    error: bleah
```