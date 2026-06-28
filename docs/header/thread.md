# Cabeçalho da biblioteca padrão &lt;thread&gt; (C++11)

Este cabeçalho faz parte da biblioteca de [suporte a threads](<#/doc/atomic>).

### Inclusões

---
[ &lt;compare&gt;](<#/doc/header/compare>)(C++20) | Suporte ao [operador de comparação de três vias](<#/doc/language/operator_comparison>)

### Namespaces

`this_thread` | fornece funções que acessam a thread de execução atual

### Classes

[ thread](<#/doc/thread/thread>)(C++11) | gerencia uma thread separada
(classe)
[ jthread](<#/doc/thread/jthread>)(C++20) | [std::thread](<#/doc/thread/thread>) com suporte para auto-joining e cancelamento
(classe)
[ std::hash<std::thread::id>](<#/doc/thread/thread/id/hash>) | especializa [std::hash](<#/doc/utility/hash>)
(especialização de template de classe)

### Funções

[ std::swap(std::thread)](<#/doc/thread/thread/swap2>)(C++11) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(função)
[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/thread/thread/id/operator_cmp>)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(C++20) | compara dois objetos `thread::id`
(função)
[ operator<<](<#/doc/thread/thread/id/operator_ltlt>) | serializa um objeto `thread::id`
(template de função)
Definido no namespace `std::this_thread`

```cpp
 yield(C++11)
(função)
 get_id(C++11)
(função)
 sleep_for(C++11)
(função)
 sleep_until(C++11)
(função)
```

### Sinopse
```cpp
    #include <compare>
    
    namespace std {
      // class thread
      class thread;
    
      void swap(thread& x, thread& y) noexcept;
    
      // class jthread
      class jthread;
    
      // namespace this_thread
      namespace this_thread {
        thread::id get_id() noexcept;
    
        void yield() noexcept;
        template<class Clock, class Duration>
        void sleep_until(const chrono::time_point<Clock, Duration>& abs_time);
        template<class Rep, class Period>
        void sleep_for(const chrono::duration<Rep, Period>& rel_time);
      }
    }
```

#### Classe [std::thread](<#/doc/thread/thread>)
```cpp
    namespace std {
      class thread
      {
      public:
        // class thread::id
        class id;
        using native_handle_type = /* implementation-defined */;
    
        // construct/copy/destroy
        thread() noexcept;
        template<class F, class... Args>
        explicit thread(F&& f, Args&&... args);
        ~thread();
        thread(const thread&) = delete;
        thread(thread&&) noexcept;
        thread& operator=(const thread&) = delete;
        thread& operator=(thread&&) noexcept;
    
        // members
        void swap(thread&) noexcept;
        bool joinable() const noexcept;
        void join();
        void detach();
        id get_id() const noexcept;
        native_handle_type native_handle();
    
        // static members
        static unsigned int hardware_concurrency() noexcept;
      };
    }
```

#### Classe [std::jthread](<#/doc/thread/jthread>)
```cpp
    namespace std {
      class jthread
      {
      public:
        // types
        using id                 = thread::id;
        using native_handle_type = thread::native_handle_type;
    
        // constructors, move, and assignment
        jthread() noexcept;
        template<class F, class... Args>
        explicit jthread(F&& f, Args&&... args);
        ~jthread();
        jthread(const jthread&) = delete;
        jthread(jthread&&) noexcept;
        jthread& operator=(const jthread&) = delete;
        jthread& operator=(jthread&&) noexcept;
    
        // members
        void swap(jthread&) noexcept;
        bool joinable() const noexcept;
        void join();
        void detach();
        id get_id() const noexcept;
        native_handle_type native_handle();
    
        // stop token handling
        stop_source get_stop_source() noexcept;
        stop_token get_stop_token() const noexcept;
        bool request_stop() noexcept;
    
        // specialized algorithms
        friend void swap(jthread& lhs, jthread& rhs) noexcept;
    
        // static members
        static unsigned int hardware_concurrency() noexcept;
    
      private:
        stop_source ssource; // exposition only
      };
    }
```

#### Classe [std::thread::id](<#/doc/thread/thread/id>)
```cpp
    namespace std {
      class thread::id
      {
      public:
        id() noexcept;
      };
    
      bool operator==(thread::id x, thread::id y) noexcept;
      strong_ordering operator<=>(thread::id x, thread::id y) noexcept;
    
      template<class CharT, class Traits>
      basic_ostream<CharT, Traits>& operator<<(basic_ostream<CharT, Traits>& out,
                                               thread::id id);
    
      template<class CharT>
      struct formatter<thread::id, CharT>;
    
      // hash support
      template<class T>
      struct hash;
      template<>
      struct hash<thread::id>;
    }
```