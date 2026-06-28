# Cabeçalho da biblioteca padrão &lt;barrier&gt; (C++20)

Este cabeçalho faz parte da biblioteca de [suporte a threads](<#/doc/atomic>).

### Classes

---
[ barrier](<#/doc/thread/barrier>)(C++20) | barreira de thread reutilizável
(modelo de classe)

### Sinopse
```cpp
    namespace std {
      template<class CompletionFunction = /* see description */>
        class barrier;
    }
```

#### Modelo de classe [std::barrier](<#/doc/thread/barrier>)
```cpp
    namespace std {
      template<class CompletionFunction = /* see description */>
      class barrier {
      public:
        using arrival_token =  /* see description */;
    
        static constexpr ptrdiff_t max() noexcept;
    
        constexpr explicit barrier(ptrdiff_t expected,
                                   CompletionFunction f = CompletionFunction());
        ~barrier();
    
        barrier(const barrier&) = delete;
        barrier& operator=(const barrier&) = delete;
    
        arrival_token arrive(ptrdiff_t update = 1);
        void wait(arrival_token&& arrival) const;
    
        void arrive_and_wait();
        void arrive_and_drop();
    
      private:
        CompletionFunction completion;      // exposition only
      };
    }
```