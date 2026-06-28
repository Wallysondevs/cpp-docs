# Cabeçalho da biblioteca padrão &lt;latch&gt; (C++20)

Este cabeçalho faz parte da biblioteca de [suporte a threads](<#/doc/atomic>).

### Classes

---
[ latch](<#/doc/thread/latch>)(C++20) | barreira de thread de uso único
(classe)

### Sinopse
```cpp
    namespace std {
      class latch;
    }
```

#### Classe [std::latch](<#/doc/thread/latch>)
```cpp
    namespace std {
      class latch {
      public:
        static constexpr ptrdiff_t max() noexcept;
    
        constexpr explicit latch(ptrdiff_t expected);
        ~latch();
    
        latch(const latch&) = delete;
        latch& operator=(const latch&) = delete;
    
        void count_down(ptrdiff_t update = 1);
        bool try_wait() const noexcept;
        void wait() const;
        void arrive_and_wait(ptrdiff_t update = 1);
    
      private:
        ptrdiff_t counter;  // exposition only
      };
    }
```