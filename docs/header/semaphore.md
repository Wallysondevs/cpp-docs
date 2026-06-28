# Cabeçalho da biblioteca padrão &lt;semaphore&gt; (C++20)

Este cabeçalho faz parte da biblioteca de [suporte a threads](<#/doc/atomic>).

### Classes

---
[ counting_semaphore](<#/doc/thread/counting_semaphore>)(C++20) | semáforo que modela uma contagem de recursos não negativa
(modelo de classe)
[ binary_semaphore](<#/doc/thread/counting_semaphore>)(C++20) | semáforo que possui apenas dois estados
(typedef)

### Sinopse
```cpp
    namespace std {
      template<ptrdiff_t LeastMaxValue = /* implementation-defined */>
        class counting_semaphore;
    
      using binary_semaphore = counting_semaphore<1>;
    }
```

#### Modelo de classe [std::counting_semaphore](<#/doc/thread/counting_semaphore>)
```cpp
    namespace std {
      template<ptrdiff_t LeastMaxValue = /* implementation-defined */>
      class counting_semaphore {
      public:
        static constexpr ptrdiff_t max() noexcept;
    
        constexpr explicit counting_semaphore(ptrdiff_t desired);
        ~counting_semaphore();
    
        counting_semaphore(const counting_semaphore&) = delete;
        counting_semaphore& operator=(const counting_semaphore&) = delete;
    
        void release(ptrdiff_t update = 1);
        void acquire();
        bool try_acquire() noexcept;
        template<class Rep, class Period>
          bool try_acquire_for(const chrono::duration<Rep, Period>& rel_time);
        template<class Clock, class Duration>
          bool try_acquire_until(const chrono::time_point<Clock, Duration>& abs_time);
    
      private:
        ptrdiff_t counter;          // exposition only
      };
    }
```