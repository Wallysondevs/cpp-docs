# Cabeçalho da biblioteca padrão &lt;future&gt; (C++11)

Este cabeçalho faz parte da biblioteca de [suporte a threads](<#/doc/atomic>).

### Classes

---
[ promise](<#/doc/thread/promise>)(C++11) | armazena um valor para recuperação assíncrona
(modelo de classe)
[ packaged_task](<#/doc/thread/packaged_task>)(C++11) | empacota uma função para armazenar seu valor de retorno para recuperação assíncrona
(modelo de classe)
[ future](<#/doc/thread/future>)(C++11) | aguarda por um valor que é definido assincronamente
(modelo de classe)
[ shared_future](<#/doc/thread/shared_future>)(C++11) | aguarda por um valor (possivelmente referenciado por outros futures) que é definido assincronamente
(modelo de classe)
[ launch](<#/doc/thread/launch>)(C++11) | especifica a política de lançamento para [std::async](<#/doc/thread/async>)
(enum)
[ future_status](<#/doc/thread/future_status>)(C++11) | especifica os resultados de esperas com tempo limite realizadas em [std::future](<#/doc/thread/future>) e [std::shared_future](<#/doc/thread/shared_future>)
(enum)
[ future_error](<#/doc/thread/future_error>)(C++11) | reporta um erro relacionado a futures ou promises
(classe)
[ future_errc](<#/doc/thread/future_errc>)(C++11) | identifica os códigos de erro de future
(enum)
[ std::uses_allocator<std::promise>](<#/doc/thread/promise/uses_allocator>)(C++11) | especializa o type trait [std::uses_allocator](<#/doc/memory/uses_allocator>)
(especialização de modelo de classe)
[ std::uses_allocator<std::packaged_task>](<#/doc/thread/packaged_task/uses_allocator>)(C++11) (até C++17) | especializa o type trait [std::uses_allocator](<#/doc/memory/uses_allocator>)
(especialização de modelo de classe)

### Funções

[ async](<#/doc/thread/async>)(C++11) | executa uma função assincronamente (potencialmente em uma nova thread) e retorna um [std::future](<#/doc/thread/future>) que conterá o resultado
(modelo de função)
[ future_category](<#/doc/thread/future_category>)(C++11) | identifica a categoria de erro de future
(função)
[ std::swap(std::promise)](<#/doc/thread/promise/swap2>)(C++11) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(modelo de função)
[ std::swap(std::packaged_task)](<#/doc/thread/packaged_task/swap2>)(C++11) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(modelo de função)

### Sinopse
```cpp
    namespace std {
      enum class future_errc {
        broken_promise = /* implementation-defined */,
        future_already_retrieved = /* implementation-defined */,
        promise_already_satisfied = /* implementation-defined */,
        no_state = /* implementation-defined */
      };
    
      enum class launch : /* unspecified */ {
        async = /* unspecified */,
        deferred = /* unspecified */,
        /* implementation-defined */
      };
    
      enum class future_status {
        ready,
        timeout,
        deferred
      };
    
      template<> struct is_error_code_enum<future_errc> : public true_type { };
      error_code make_error_code(future_errc e) noexcept;
      error_condition make_error_condition(future_errc e) noexcept;
    
      const error_category& future_category() noexcept;
    
      class future_error;
    
      template<class R> class promise;
      template<class R> class promise<R&>;
      template<> class promise<void>;
    
      template<class R>
        void swap(promise<R>& x, promise<R>& y) noexcept;
    
      template<class R, class Alloc>
        struct uses_allocator<promise<R>, Alloc>;
    
      template<class R> class future;
      template<class R> class future<R&>;
      template<> class future<void>;
    
      template<class R> class shared_future;
      template<class R> class shared_future<R&>;
      template<> class shared_future<void>;
    
      template<class> class packaged_task;  // not defined
      template<class R, class... ArgTypes>
        class packaged_task<R(ArgTypes...)>;
    
      template<class R, class... ArgTypes>
        void swap(packaged_task<R(ArgTypes...)>&, packaged_task<R(ArgTypes...)>&) noexcept;
    
      template<class F, class... Args>
        future<invoke_result_t<decay_t<F>, decay_t<Args>...>>
          async(F&& f, Args&&... args);
      template<class F, class... Args>
        future<invoke_result_t<decay_t<F>, decay_t<Args>...>>
          async(launch policy, F&& f, Args&&... args);
    }
```

#### Classe [std::future_error](<#/doc/thread/future_error>)
```cpp
    namespace std {
      class future_error : public logic_error {
      public:
        explicit future_error(future_errc e);
    
        const error_code& code() const noexcept;
        const char*       what() const noexcept;
    
      private:
        error_code ec_;             // exposition only
      };
    }
```

#### Modelo de classe [std::promise](<#/doc/thread/promise>)
```cpp
    namespace std {
      template<class R>
      class promise {
      public:
        promise();
        template<class Allocator>
          promise(allocator_arg_t, const Allocator& a);
        promise(promise&& rhs) noexcept;
        promise(const promise&) = delete;
        ~promise();
    
        // atribuição
        promise& operator=(promise&& rhs) noexcept;
        promise& operator=(const promise&) = delete;
        void swap(promise& other) noexcept;
    
        // recuperando o resultado
        future<R> get_future();
    
        // definindo o resultado
        void set_value(/* see description */);
        void set_exception(exception_ptr p);
    
        // definindo o resultado com notificação adiada
        void set_value_at_thread_exit(/* see description */);
        void set_exception_at_thread_exit(exception_ptr p);
      };
    
      template<class R>
        void swap(promise<R>& x, promise<R>& y) noexcept;
    
      template<class R, class Alloc>
        struct uses_allocator<promise<R>, Alloc>;
    }
```

#### Modelo de classe [std::future](<#/doc/thread/future>)
```cpp
    namespace std {
      template<class R>
      class future {
      public:
        future() noexcept;
        future(future&&) noexcept;
        future(const future&) = delete;
        ~future();
        future& operator=(const future&) = delete;
        future& operator=(future&&) noexcept;
        shared_future<R> share() noexcept;
    
        // recuperando o valor
        /* see description */ get();
    
        // funções para verificar o estado
        bool valid() const noexcept;
    
        void wait() const;
        template<class Rep, class Period>
          future_status wait_for(const chrono::duration<Rep, Period>& rel_time) const;
        template<class Clock, class Duration>
          future_status wait_until(const chrono::time_point<Clock, Duration>& abs_time) const;
      };
    }
```

#### Modelo de classe [std::shared_future](<#/doc/thread/shared_future>)
```cpp
    namespace std {
      template<class R>
      class shared_future {
      public:
        shared_future() noexcept;
        shared_future(const shared_future& rhs) noexcept;
        shared_future(future<R>&&) noexcept;
        shared_future(shared_future&& rhs) noexcept;
        ~shared_future();
        shared_future& operator=(const shared_future& rhs) noexcept;
        shared_future& operator=(shared_future&& rhs) noexcept;
    
        // recuperando o valor
        /* see description */ get() const;
    
        // funções para verificar o estado
        bool valid() const noexcept;
    
        void wait() const;
        template<class Rep, class Period>
          future_status wait_for(const chrono::duration<Rep, Period>& rel_time) const;
        template<class Clock, class Duration>
          future_status wait_until(const chrono::time_point<Clock, Duration>& abs_time) const;
      };
    }
```

#### Modelo de classe [std::packaged_task](<#/doc/thread/packaged_task>)
```cpp
    namespace std {
      template<class> class packaged_task;  // não definido
    
      template<class R, class... ArgTypes>
      class packaged_task<R(ArgTypes...)> {
      public:
        // construção e destruição
        packaged_task() noexcept;
        template<class F>
          explicit packaged_task(F&& f);
        ~packaged_task();
    
        // sem cópia
        packaged_task(const packaged_task&) = delete;
        packaged_task& operator=(const packaged_task&) = delete;
    
        // suporte a move
        packaged_task(packaged_task&& rhs) noexcept;
        packaged_task& operator=(packaged_task&& rhs) noexcept;
        void swap(packaged_task& other) noexcept;
    
        bool valid() const noexcept;
    
        // recuperação do resultado
        future<R> get_future();
    
        // execução
        void operator()(ArgTypes... );
        void make_ready_at_thread_exit(ArgTypes...);
    
        void reset();
      };
    
      template<class R, class... ArgTypes>
      packaged_task(R (*)(ArgTypes...)) -> packaged_task<R(ArgTypes...)>;
    
      template<class F> packaged_task(F) -> packaged_task</* see description */>;
    
      template<class R, class... ArgTypes>
        void swap(packaged_task<R(ArgTypes...)>& x, packaged_task<R(ArgTypes...)>& y) noexcept;
    }
```